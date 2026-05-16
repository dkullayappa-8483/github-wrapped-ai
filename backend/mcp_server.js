import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const server = new Server(
  {
    name: "linkedin-wrapped-tools",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "scrape_linkedin",
        description: "Fetch public LinkedIn profile data using Proxycurl",
        inputSchema: {
          type: "object",
          properties: {
            url: { type: "string", description: "The LinkedIn profile URL" },
          },
          required: ["url"],
        },
      },
      {
        name: "analyze_profile",
        description: "Analyze LinkedIn data using AI for Career Wrapped insights",
        inputSchema: {
          type: "object",
          properties: {
            profile_data: { type: "object" },
          },
          required: ["profile_data"],
        },
      },
      {
        name: "generate_wrapped_html",
        description: "Generate a cinematic HTML card for the user",
        inputSchema: {
          type: "object",
          properties: {
            profile_data: { type: "object" },
            analysis: { type: "object" },
          },
          required: ["profile_data", "analysis"],
        },
      },
      {
        name: "save_wrapped",
        description: "Save the generated wrapped experience to static storage",
        inputSchema: {
          type: "object",
          properties: {
            username: { type: "string" },
            html: { type: "string" },
          },
          required: ["username", "html"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "scrape_linkedin": {
      if (!process.env.RAPIDAPI_KEY) throw new Error("Missing RAPIDAPI_KEY");
      const response = await fetch(`https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile?linkedin_url=${encodeURIComponent(args.url)}&include_skills=true`, {
        headers: { 
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'fresh-linkedin-profile-data.p.rapidapi.com'
        }
      });
      if (!response.ok) throw new Error("Failed to scrape LinkedIn profile");
      const data = await response.json();
      return { content: [{ type: "text", text: JSON.stringify(data) }] };
    }

    case "analyze_profile": {
      const prompt = `
        Analyze this LinkedIn profile data and generate a fun, highly personalized 'Career Wrapped' summary. 
        Data includes experiences, education, skills, and headline.
        Return ONLY a valid JSON object:
        {
          "career_stats": { "skills_added": number, "total_roles": number, "strongest_field": string },
          "ai_personality": { "title": string, "description": string },
          "career_aura": ["string", "string", "string"],
          "skill_radar": [{ "skill_category": string, "score_out_of_100": number }],
          "career_timeline": [{ "year": string, "event": string }],
          "suggested_next_moves": ["string", "string"],
          "roast_or_boast": "string"
        }
        
        Profile Data: ${JSON.stringify(args.profile_data)}
      `;
      const result = await model.generateContent(prompt);
      const text = (await result.response).text().replace(/```json|```/g, "").trim();
      return { content: [{ type: "text", text }] };
    }

    case "generate_wrapped_html": {
        // Minimal boilerplate HTML for the card
        const html = `<div class="card"><h1>${args.analysis.ai_personality.title}</h1><p>${args.analysis.roast_or_boast}</p></div>`;
        return { content: [{ type: "text", text: html }] };
    }

    case "save_wrapped": {
        const filePath = path.join(process.cwd(), "static", "wrapped", `${args.username}.html`);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, args.html);
        return { content: [{ type: "text", text: `/static/wrapped/${args.username}.html` }] };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
