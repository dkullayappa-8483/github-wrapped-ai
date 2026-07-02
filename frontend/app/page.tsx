"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { toPng } from "html-to-image";
import { 
  Download, 
  Loader2, 
  Link as LinkIcon, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Code, 
  Target, 
  TrendingUp, 
  Users, 
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  Layout,
  Star
} from "lucide-react";

const GithubIconSVG = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// --- UI Components ---

const Badge = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
    <Sparkles size={14} className="text-blue-400" />
    <span className="text-xs font-semibold tracking-wider text-blue-100 uppercase">{children}</span>
  </div>
);

const FloatingCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 1, ease: "easeOut" }}
    className={`glass-morphism p-6 rounded-2xl animate-float ${className}`}
  >
    {children}
  </motion.div>
);

const BackgroundEffects = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none noise-bg">
    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-blob" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
    <div className="absolute top-[30%] left-[40%] w-[40%] h-[40%] bg-pink-600/5 rounded-full blur-[100px] animate-blob animation-delay-4000" />
  </div>
);

const SectionHeading = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-5xl font-bold mb-4">{title}</h2>
    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">{subtitle}</p>
  </div>
);

// --- Sections ---

const HeroSection = ({ url, setUrl, fetchWrapped, loading, error }: any) => {
  return (
    <section className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
      <div className="z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Badge>AI-Powered Career Insights</Badge>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
            GitHub <br/>
            <span className="text-gradient">Wrapped</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Transform your coding journey into a cinematic AI experience.
          </p>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-xl mx-auto relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-1000 group-hover:duration-300"></div>
          <div className="relative glass-morphism p-2 rounded-2xl flex flex-col md:flex-row gap-2 hover:bg-white/[0.02] transition-colors shadow-inner">
            <div className="relative flex-1">
              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="github.com/torvalds"
                className="w-full bg-transparent pl-12 pr-4 py-4 rounded-xl text-white outline-none placeholder:text-gray-600 font-medium"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              onClick={fetchWrapped}
              disabled={loading || !url}
              className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all flex items-center justify-center gap-2 group/btn shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] cursor-pointer border border-white/20"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  Reveal <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-red-500 text-sm font-semibold bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-2xl inline-block max-w-xl"
          >
            ⚠️ {error}
          </motion.div>
        )}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <FloatingCard className="absolute top-[20%] left-[10%] hidden lg:block" delay={0.4}>
          <Target className="text-blue-400 mb-2" size={24} />
          <p className="text-xs font-mono text-gray-400">Skills Growth</p>
          <p className="text-lg font-bold">+42% YoY</p>
        </FloatingCard>
        <FloatingCard className="absolute bottom-[25%] left-[15%] hidden lg:block animation-delay-2000" delay={0.6}>
          <TrendingUp className="text-purple-400 mb-2" size={24} />
          <p className="text-xs font-mono text-gray-400">Impact Score</p>
          <p className="text-lg font-bold">98/100</p>
        </FloatingCard>
        <FloatingCard className="absolute top-[25%] right-[10%] hidden lg:block animation-delay-4000" delay={0.8}>
          <BrainCircuit className="text-pink-400 mb-2" size={24} />
          <p className="text-xs font-mono text-gray-400">AI Personality</p>
          <p className="text-lg font-bold">Thought Leader</p>
        </FloatingCard>
        <FloatingCard className="absolute bottom-[20%] right-[15%] hidden lg:block" delay={1}>
          <Users className="text-indigo-400 mb-2" size={24} />
          <p className="text-xs font-mono text-gray-400">Network Reach</p>
          <p className="text-lg font-bold">Top 1%</p>
        </FloatingCard>
      </div>
    </section>
  );
};

const HowItWorks = () => (
  <section className="py-32 px-6 relative z-10">
    <SectionHeading 
      title="How It Works" 
      subtitle="The perfect blend of data engineering and creative AI analysis." 
    />
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
      {[
        { step: "01", title: "Connect", desc: "Paste your GitHub profile URL. We respect your privacy and only use public data.", icon: <LinkIcon /> },
        { step: "02", title: "Analyze", desc: "Our Gemini-powered engine processes your repositories and coding style.", icon: <BrainCircuit /> },
        { step: "03", title: "Wrapped", desc: "Get a cinematic recap and a shareable card to celebrate your growth.", icon: <Sparkles /> }
      ].map((item, i) => (
        <div key={i} className="glass-morphism p-8 rounded-3xl border-t-2 border-t-blue-500/30 group hover:bg-white/5 transition-all">
          <div className="text-blue-500 font-black text-4xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity">{item.step}</div>
          <div className="mb-4 text-blue-400">{item.icon}</div>
          <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
          <p className="text-gray-400 leading-relaxed font-light">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

const Features = () => (
  <section className="py-32 px-6 bg-white/[0.02]">
    <SectionHeading 
      title="Deep Analytics" 
      subtitle="Uncover the hidden patterns in your professional narrative." 
    />
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { title: "Skill Radar", desc: "A 360-degree view of your core competencies.", icon: <Target className="text-blue-400" /> },
        { title: "AI Persona", desc: "Discover your professional brand personality.", icon: <Users className="text-purple-400" /> },
        { title: "Career Aura", desc: "A visual representation of your vibe and energy.", icon: <Sparkles className="text-pink-400" /> },
        { title: "Next Path", desc: "Strategic advice based on your trajectory.", icon: <TrendingUp className="text-orange-400" /> }
      ].map((feat, i) => (
        <div key={i} className="glass-morphism p-6 rounded-2xl hover:scale-[1.02] transition-transform cursor-default">
          <div className="mb-4">{feat.icon}</div>
          <h4 className="text-lg font-bold mb-2">{feat.title}</h4>
          <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

// --- Wrapped UI Components (Unchanged logic, upgraded style) ---

const SlideWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col items-center justify-center min-h-[70vh] w-full text-center px-4 md:px-8 py-10 md:py-0"
  >
    {children}
  </motion.div>
);

const TypingText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [text]);

  return <p className="text-lg md:text-xl font-light text-gray-300 leading-relaxed tracking-wide">{displayedText}</p>;
};

// --- Main App ---

export default function WrappedApp() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState("Initializing AI...");
  const [data, setData] = useState<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const loadingSteps = [
    "Connecting to GitHub...",
    "Scanning repositories...",
    "Analyzing experience...",
    "Generating career aura...",
    "Consulting Gemini 1.5 Flash...",
    "Building your Wrapped..."
  ];

  const fetchWrapped = async () => {
    if (!url) return;
    setLoading(true);
    setError(null);
    
    let step = 0;
    const interval = setInterval(() => {
      setLoadingStatus(loadingSteps[step % loadingSteps.length]);
      step++;
    }, 1500);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: url.split('/').pop()?.trim() || url }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error);
      
      setData(json.analysis);
      setCurrentSlide(0);
      window.scrollTo(0, 0);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An unexpected error occurred.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const downloadCard = async () => {
    const card = document.getElementById("share-card");
    if (card) {
      try {
        const dataUrl = await toPng(card, { backgroundColor: '#000', pixelRatio: 2 });
        const link = document.createElement("a");
        link.download = `github-wrapped.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to generate image', err);
      }
    }
  };

  if (!data && loading) {
    return (
      <div className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden">
        <BackgroundEffects />
        <div className="relative z-10 text-center space-y-8">
           <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 animate-ping"></div>
              <div className="relative h-full w-full rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                 <Loader2 className="animate-spin text-white" size={40} />
              </div>
           </div>
           <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight text-white animate-pulse">{loadingStatus}</h2>
              <div className="w-64 h-1.5 bg-white/5 rounded-full mx-auto overflow-hidden">
                 <motion.div 
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-full h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_10px_#3b82f6]"
                 />
              </div>
           </div>
           <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.4em]">Proprietary AI Analysis Engine v2.4</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <BackgroundEffects />
        
        {/* Navigation Bar */}
        <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-xl bg-black/80 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/20 text-black">
              <GithubIconSVG size={24} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight hidden sm:block">GitHub Wrapped</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => document.getElementById('hero')?.scrollIntoView({behavior: 'smooth'})} className="text-sm font-medium text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-105">Start</button>
            <button className="hidden md:block text-sm font-medium text-gray-400 hover:text-white transition-all cursor-pointer hover:scale-105">Features</button>
            <a href="https://github.com" target="_blank" className="p-2 rounded-full hover:bg-white/5 transition-all cursor-pointer hover:scale-110 hover:text-white">
              <Code size={20} className="text-gray-400" />
            </a>
          </div>
        </nav>

        <main id="hero">
          <HeroSection 
            url={url} 
            setUrl={setUrl} 
            fetchWrapped={fetchWrapped} 
            loading={loading} 
            error={error}
          />
          <HowItWorks />
          <Features />

          {/* CTA Section */}
          <section className="py-40 px-6 text-center relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
             <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-black mb-8">Ready to see your <br/><span className="text-gradient">GitHub Story?</span></h2>
                <p className="text-gray-400 text-xl mb-12 font-light">Join 10k+ developers who have uncovered their AI persona.</p>
                <button 
                  onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                  className="px-12 py-5 rounded-2xl bg-white text-black font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-white/10"
                >
                  Get Started Now
                </button>
             </div>
          </section>
        </main>

        <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-600 text-sm font-light">
          <p>© 2026 GitHub Wrapped AI. Powered by Google Gemini 1.5 Flash.</p>
        </footer>
      </div>
    );
  }

  // --- Wrapped Cinematic Experience ---

  const slides = [
    // Slide 1: Intro
    <SlideWrapper key="intro">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        <span className="text-blue-500 font-mono tracking-[0.4em] uppercase text-xs font-bold bg-blue-500/10 px-4 py-1 rounded-full">Initiating Sequence</span>
        <h2 className="text-8xl md:text-[12rem] font-black text-white/[0.03] absolute inset-0 flex items-center justify-center pointer-events-none -z-10 select-none">2026</h2>
        <h1 className="text-5xl md:text-8xl font-black text-white max-w-4xl mx-auto leading-tight tracking-tighter">
          Welcome to your <br/>
          <span className="text-gradient">GitHub Wrapped.</span>
        </h1>
        <p className="text-gray-400 text-xl md:text-2xl font-light max-w-xl mx-auto italic">Exploring your coding universe...</p>
        <button 
          onClick={() => setCurrentSlide(1)}
          className="mt-8 px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] animate-pulse inline-flex items-center gap-2"
        >
          Begin Experience <ChevronRight size={20} />
        </button>
      </motion.div>
    </SlideWrapper>,

    // Slide 2: Aura & Personality
    <SlideWrapper key="aura">
      <span className="text-purple-400 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-6">The Essence</span>
      <h2 className="text-4xl md:text-5xl font-black mb-12">Professional Aura</h2>
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12 md:mb-20">
        {data.career_aura.map((aura: string, i: number) => (
          <motion.div
            key={aura}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="px-6 py-2 md:px-10 md:py-4 rounded-full glass-morphism border-white/20 text-white font-bold tracking-wide hover:bg-white/20 transition-all cursor-pointer hover:scale-110 hover:-translate-y-1 text-sm md:text-lg shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)]"
          >
            {aura}
          </motion.div>
        ))}
      </div>
      <div className="max-w-2xl glass-morphism p-6 md:p-10 rounded-3xl md:rounded-[40px] relative overflow-hidden group border-l-8 border-l-blue-500">
        <h3 className="text-3xl font-black mb-6 text-white text-left tracking-tight">{data.ai_personality.title}</h3>
        <div className="text-left">
           <TypingText text={data.ai_personality.description} />
        </div>
      </div>
    </SlideWrapper>,

    // Slide 3: Skill Radar
    <SlideWrapper key="radar">
      <span className="text-green-400 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-6">Core Systems</span>
      <h2 className="text-4xl md:text-5xl font-black mb-10">Skill Architecture</h2>
      <div className="w-full max-w-2xl h-[350px] md:h-[500px] glass-morphism p-4 md:p-10 rounded-[30px] md:rounded-[50px] relative">
        <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none"></div>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.skill_radar}>
            <PolarGrid stroke="#222" />
            <PolarAngleAxis dataKey="skill_category" tick={{ fill: "#666", fontSize: 12, fontWeight: 700 }} />
            <Radar
              name="Skills"
              dataKey="score_out_of_100"
              stroke="#3B82F6"
              fill="url(#radarGradient)"
              fillOpacity={0.7}
            />
            <defs>
              <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </SlideWrapper>,

    // Slide 4: Timeline
    <SlideWrapper key="timeline">
       <span className="text-orange-400 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-6">The Journey</span>
       <h2 className="text-4xl md:text-5xl font-black mb-16">Professional Odyssey</h2>
       <div className="w-full max-w-4xl space-y-8 md:space-y-12 relative">
          <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-white/10 hidden md:block" />
          {data.career_timeline?.map((item: any, i: number) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.3 }}
               className="relative md:pl-16 flex flex-col md:flex-row gap-4 items-start md:items-center"
             >
                <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center font-black text-black z-10 shrink-0 shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                   {item.year.slice(-2)}
                </div>
                <div className="glass-morphism p-6 rounded-2xl flex-1 text-left group hover:bg-white/10 transition-all hover:scale-[1.02] cursor-pointer hover:shadow-[0_0_30px_rgba(249,115,22,0.2)] border border-white/5 hover:border-orange-500/30">
                   <p className="text-orange-400 font-black text-lg mb-1">{item.year}</p>
                   <p className="text-white text-xl font-medium">{item.event}</p>
                </div>
             </motion.div>
          ))}
       </div>
    </SlideWrapper>,

    // Slide 5: AI Roast or Boast
    <SlideWrapper key="roast">
      <span className="text-red-400 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-6">The Verdict</span>
      <h2 className="text-4xl md:text-5xl font-black mb-12">The Roast or Boast</h2>
      <div className="max-w-3xl relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-orange-500 blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative glass-morphism p-6 md:p-12 rounded-[30px] md:rounded-[50px] border-2 border-white/5">
             <p className="text-2xl md:text-4xl font-black text-white italic leading-tight">
                "{data.roast_or_boast}"
             </p>
          </div>
      </div>
    </SlideWrapper>,

    // Slide 6: Share Card
    <SlideWrapper key="share">
      <span className="text-pink-400 font-mono tracking-[0.4em] uppercase text-xs font-bold mb-6">The Genesis</span>
      <h2 className="text-4xl md:text-5xl font-black mb-10">Export Summary</h2>
      
      <div 
        id="share-card"
        className="w-full max-w-[400px] min-h-[500px] h-auto bg-[#000] p-8 md:p-12 rounded-[40px] md:rounded-[50px] border border-white/10 flex flex-col items-center justify-between text-white relative overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)] mx-auto"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
        
        <div className="z-10 w-full flex justify-between items-center mb-6">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-black text-2xl shadow-xl">W</div>
          <div className="text-right">
             <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black">2026 Wrapped</p>
             <p className="text-[10px] text-blue-400 font-mono opacity-60">ID://GENESIS_01</p>
          </div>
        </div>

        <div className="z-10 text-center w-full px-2">
          <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-black rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl shadow-2xl border border-white/20">
            💻
          </div>
          <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight text-white">{data.ai_personality.title}</h3>
          <div className="h-1.5 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mb-6 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          <p className="text-base text-gray-200 font-medium italic leading-relaxed px-2 bg-black/20 p-4 rounded-2xl border border-white/5">
            "{data.roast_or_boast}"
          </p>
        </div>

        <div className="z-10 w-full mt-8">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 backdrop-blur-md p-4 rounded-[20px] border border-blue-500/30">
              <p className="text-2xl md:text-3xl font-black text-white tracking-tighter">{data.career_stats.total_repos}</p>
              <p className="text-[11px] text-blue-300 uppercase font-black tracking-widest mt-1">Repositories</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-900/10 backdrop-blur-md p-4 rounded-[20px] border border-purple-500/30">
              <p className="text-2xl md:text-3xl font-black text-white tracking-tighter overflow-hidden text-ellipsis whitespace-nowrap" title={data.career_stats.strongest_language}>{data.career_stats.strongest_language}</p>
              <p className="text-[11px] text-purple-300 uppercase font-black tracking-widest mt-1">Top Language</p>
            </div>
          </div>
        </div>

        <div className="z-10 mt-8 pt-8 border-t border-white/10 w-full text-center">
          <p className="text-[10px] font-mono opacity-20 tracking-[0.4em] uppercase font-bold text-white">GitHub Wrapped AI x Gemini</p>
        </div>
      </div>

      <button
        onClick={downloadCard}
        className="mt-12 flex items-center gap-3 px-10 py-5 rounded-[24px] bg-white text-black font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-white/20 active:scale-95 group"
      >
        <Download size={24} className="group-hover:translate-y-0.5 transition-transform" />
        Save High-Res Card
      </button>
    </SlideWrapper>,
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden overflow-y-auto relative font-sans">
      <BackgroundEffects />
      
      <main className="relative z-10 max-w-7xl mx-auto min-h-screen flex flex-col">
        {/* Experience Header */}
        <header className="p-8 flex justify-between items-center backdrop-blur-sm z-50">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-black">
              <GithubIconSVG size={18} strokeWidth={2.5} />
            </div>
            <span className="font-black tracking-tighter text-lg">WRAPPED.AI</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setData(null)}
                className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full cursor-pointer border border-white/10 hover:border-white/30"
            >
                End Session
            </button>
          </div>
        </header>

        <div className="flex-1 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            {slides[currentSlide]}
          </AnimatePresence>
        </div>

        {/* Experience Controls */}
        <div className="p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
          <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-700 ease-[0.16, 1, 0.3, 1] cursor-pointer hover:scale-110 ${
                  i === currentSlide ? 'bg-gradient-to-r from-blue-500 to-purple-600 w-16 shadow-[0_0_15px_rgba(59,130,246,0.8)]' : i < currentSlide ? 'bg-white/40 w-10 hover:bg-white/60' : 'bg-white/10 w-10 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
          
          <div className="flex items-center gap-8 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-2xl">
            <button 
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-0 transition-all active:scale-90 cursor-pointer"
            >
              <ChevronLeft size={28} />
            </button>
            
            <div className="text-lg font-black font-mono tracking-tighter tabular-nums flex items-baseline gap-1">
              <span className="text-white text-2xl">0{currentSlide + 1}</span>
              <span className="text-white/20">/</span>
              <span className="text-white/40">0{slides.length}</span>
            </div>

            <button 
              onClick={() => setCurrentSlide(s => Math.min(slides.length - 1, s + 1))}
              disabled={currentSlide === slides.length - 1}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-0 transition-all active:scale-90 cursor-pointer"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
