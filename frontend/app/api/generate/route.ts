import { NextResponse } from 'next/server';

interface Repo {
  name: string;
  description: string;
  stargazers_count: number;
  language?: string | null;
}

interface ProfileData {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  created_at: string;
  top_language: string;
  recent_repos: { name: string; description: string; stars: number }[];
}

/**
 * Service: Fetch GitHub Data
 */
async function fetchGitHubData(username: string): Promise<ProfileData> {
  console.log(`[Scraper] Fetching GitHub: ${username}`);
  
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'GitHub-Wrapped-AI-NextJS'
  };
  
  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, { 
      headers, 
      signal: AbortSignal.timeout(10000) 
    });
    
    if (!userRes.ok) {
      if (userRes.status === 404) throw new Error("GitHub user not found.");
      if (userRes.status === 403) throw new Error("GitHub API rate limit exceeded. Please wait or add a GITHUB_TOKEN.");
      throw new Error(`GitHub API returned ${userRes.status}`);
    }
    
    const user = await userRes.json();

    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { 
      headers, 
      signal: AbortSignal.timeout(10000) 
    });
    const repos: Repo[] = reposRes.ok ? await reposRes.json() : [];

    // Calculate top languages
    const languages: Record<string, number> = {};
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const topLanguage = Object.keys(languages).sort((a, b) => languages[b] - languages[a])[0] || "Markdown";

    // Build raw data object
    return {
      login: user.login,
      name: user.name || user.login,
      bio: user.bio || "No bio available",
      public_repos: user.public_repos,
      followers: user.followers,
      created_at: user.created_at,
      top_language: topLanguage,
      recent_repos: repos.slice(0, 8).map(r => ({ 
        name: r.name, 
        description: r.description || "No description provided", 
        stars: r.stargazers_count 
      }))
    };

  } catch (err: any) {
    console.error("[Scraper] Error:", err.message);
    throw new Error(err.message || "Failed to fetch GitHub data.");
  }
}

/**
 * Service: Analyze with Gemini
 */
async function analyzeProfile(profileData: ProfileData) {
  console.log("[AI] Starting analysis...");
  
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
    console.warn("[AI] Valid GEMINI_API_KEY missing. Returning demo analysis.");
    return {
      career_stats: { total_repos: 15, followers: 215000, strongest_language: "C" },
      ai_personality: { title: "The Kernel God", description: "You don't just write code; you invent the tools that everyone else uses to write code. Uncompromising, brilliant, and legendary." },
      career_aura: ["Legendary", "Low-Level", "Architect"],
      skill_radar: [
        { skill_category: "Systems", score_out_of_100: 100 },
        { skill_category: "Version Control", score_out_of_100: 100 },
        { skill_category: "Web Dev", score_out_of_100: 10 },
        { skill_category: "DevOps", score_out_of_100: 95 },
        { skill_category: "Patience", score_out_of_100: 5 }
      ],
      career_timeline: [
        { year: "2011", event: "Joined GitHub officially" },
        { year: "2015", event: "Merged the unmergeable" },
        { year: "2024", event: "Still rejecting your PRs" }
      ],
      suggested_next_moves: ["Take a vacation", "Rewrite Linux in Rust"],
      roast_or_boast: "Your code runs the world. Literally. But seriously, who hurt you when you designed Git?"
    };
  }

  const prompt = `
    Analyze this GitHub developer profile data and generate a fun, slightly roasty 'GitHub Wrapped' summary.
    Return ONLY a raw JSON object (no markdown):
    {
      "career_stats": { "total_repos": number, "followers": number, "strongest_language": string },
      "ai_personality": { "title": string, "description": string },
      "career_aura": ["string", "string", "string"],
      "skill_radar": [{ "skill_category": string, "score_out_of_100": number }],
      "career_timeline": [{ "year": string, "event": string }],
      "suggested_next_moves": ["string", "string"],
      "roast_or_boast": "string"
    }
    
    Data: ${JSON.stringify(profileData)}
  `;

  try {
    let response: Response | null = null;
    const models = ['gemini-2.5-flash', 'gemini-3.5-flash', 'gemini-2.0-flash'];
    
    for (const model of models) {
      try {
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          }),
          signal: AbortSignal.timeout(15000)
        });

        if (response.ok) break;
        
        const status = response.status;
        console.warn(`[AI] Model ${model} returned ${status}, trying next...`);
        if (status !== 503 && status !== 429) break;
      } catch (e: any) {
        console.error(`[AI] Error calling model ${model}:`, e.message);
      }
    }

    if (!response || !response.ok) {
      const errText = response ? await response.text() : "No response from Gemini API models";
      throw new Error("Google API Error: " + errText);
    }

    const json = await response.json();
    let text = json.candidates[0].content.parts[0].text;
    text = text.replace(/\`\`\`json|\`\`\`/g, "").trim();
    return JSON.parse(text);

  } catch (err: any) {
    console.error("[AI] Raw Fetch Error:", err.message);
    throw new Error("AI analysis failed to complete due to model availability. Please check your Gemini API key.");
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username } = body;
    
    if (!username) {
      return NextResponse.json(
        { success: false, error: "GitHub Username is required" },
        { status: 400 }
      );
    }

    const rawData = await fetchGitHubData(username);
    const analysis = await analyzeProfile(rawData);
    
    return NextResponse.json({
      success: true,
      analysis: analysis
    });
  } catch (error: any) {
    console.error("[Route Error]", error.message);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || "An unexpected system error occurred." 
      },
      { status: 500 }
    );
  }
}
