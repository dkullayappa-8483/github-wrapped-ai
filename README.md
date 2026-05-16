# GitHub Wrapped AI 🚀

A cinematic, AI-powered "Spotify Wrapped" experience for your GitHub profile. 
Built with Next.js, Tailwind CSS, Google Gemini, and the GitHub API.

## Project Structure

This project is divided into two parts:

- `/frontend`: The Next.js React application (UI and animations).
- `/backend`: The Node.js Express server (fetches GitHub data and generates AI summaries).

## How to Run Locally

### 1. Backend Setup
Navigate to the backend folder:
```bash
cd backend
npm install
```

Create a `.env` file in the backend folder and add your API keys:
```env
GEMINI_API_KEY=your_gemini_key_here
GITHUB_TOKEN=your_github_personal_access_token_here
```

Start the backend server:
```bash
npm run dev
```
The backend will run on `http://localhost:8080`.

### 2. Frontend Setup
Open a new terminal and navigate to the frontend folder:
```bash
cd frontend
npm install
```

Start the Next.js development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:3000`.

## Export & Share
Enter any GitHub username, view the cinematic slides, and click **Save High-Res Card** on the final slide to download an image of your stats!
