import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export class LinkedInWrappedAgent {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are a LinkedIn profile analyst and career wrapped generator. When a user gives you a LinkedIn URL, you ALWAYS follow this exact sequence: first call scrape_linkedin, then analyze_profile with the result, then generate_wrapped_html with all three inputs, then save_wrapped. Never skip steps. Be enthusiastic about professionals' work. If the profile is private or doesn't exist, say so clearly."
    });
    
    this.transport = new StdioClientTransport({
      command: "node",
      args: [path.join(process.cwd(), "mcp_server.js")],
    });
    
    this.client = new Client(
      { name: "linkedin-wrapped-agent", version: "1.0.0" },
      { capabilities: {} }
    );
  }

  async run(linkedinUrl) {
    await this.client.connect(this.transport);
    
    try {
      // Step 1: Scrape
      console.log(`[Agent] Scraping: ${linkedinUrl}`);
      const scrapeResult = await this.client.callTool({
        name: "scrape_linkedin",
        arguments: { url: linkedinUrl }
      });
      const profileData = JSON.parse(scrapeResult.content[0].text);

      // Step 2: Analyze
      console.log(`[Agent] Analyzing profile...`);
      const analyzeResult = await this.client.callTool({
        name: "analyze_profile",
        arguments: { profile_data: profileData }
      });
      const analysis = JSON.parse(analyzeResult.content[0].text);

      // Step 3: Generate HTML
      console.log(`[Agent] Generating wrapped HTML...`);
      const htmlResult = await this.client.callTool({
        name: "generate_wrapped_html",
        arguments: { profile_data: profileData, analysis }
      });
      const html = htmlResult.content[0].text;

      // Step 4: Save
      const username = linkedinUrl.split('/').filter(Boolean).pop();
      console.log(`[Agent] Saving wrapped for ${username}...`);
      const saveResult = await this.client.callTool({
        name: "save_wrapped",
        arguments: { username, html }
      });

      return {
        analysis,
        shareUrl: saveResult.content[0].text
      };
    } finally {
      // Note: In a real stdio transport, closing the transport might kill the server process
      // await this.transport.close();
    }
  }
}

export const linkedin_wrapped_agent = new LinkedInWrappedAgent();
