<div align="center">
  <img src="https://img.icons8.com/nolan/128/github.png" alt="GitHub Logo">
  <h1>GitHub Wrapped AI 🚀</h1>
  <p><strong>A cinematic, AI-powered "Spotify Wrapped" experience for developers.</strong></p>
</div>

<br/>

GitHub Wrapped AI transforms any standard GitHub profile into a highly visual, animated, and brutally honest (or highly flattering) "Wrapped" presentation. By combining raw GitHub data with Google's Gemini AI, this application analyzes a developer's coding habits, most-used languages, and repository metrics to generate a personalized "Developer Persona" and a custom AI roast/boast.

## ✨ Features

- **Cinematic UI/UX:** Built with Framer Motion and Tailwind CSS, featuring smooth slide transitions, glowing glass-morphism cards, and responsive mobile-first design.
- **Deep GitHub Analysis:** Uses the GitHub REST API to securely fetch real-time public developer data (repositories, followers, languages).
- **AI-Powered Insights:** Leverages Google's `gemini-1.5-flash` model to analyze coding statistics and dynamically generate an accurate "Professional Aura", a "Skill Architecture" radar chart, and a personalized roast.
- **Export & Share:** Uses modern browser rendering to let users download a beautiful, high-resolution PNG summary card formatted perfectly for Twitter, LinkedIn, and Instagram.

## 🛠️ Tech Stack

- **Frontend:** React 19, Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Recharts
- **Backend:** Node.js, Express.js, node-fetch
- **AI Integration:** Google Generative AI (Gemini 1.5)
- **Deployment:** Fully containerized and deployed on Google Cloud Run

## 🚀 How to Run Locally

This project is divided into two parts: `/frontend` and `/backend`.

### 1. Backend Setup
Navigate to the backend folder and install dependencies:
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
Open a new terminal, navigate to the frontend folder, and install dependencies:
```bash
cd frontend
npm install
```

Start the Next.js development server:
```bash
npm run dev
```
The frontend will run on `http://localhost:3000`.

## 📸 Export & Share
Enter any GitHub username, sit back, and enjoy the cinematic slides. Don't forget to click **Save High-Res Card** on the final slide to download an image of your stats to share with the world!
