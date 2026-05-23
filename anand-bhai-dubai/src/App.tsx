import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Compass, MessageSquareHeart, Film, ClipboardList, Award, Send, Volume2, Flame } from 'lucide-react';
import BackgroundBubbles from './components/BackgroundBubbles';
import WelcomeHero from './components/WelcomeHero';
import DubaiDashboard from './components/DubaiDashboard';
import MemoriesCapsule from './components/MemoriesCapsule';
import InteractiveBucketList from './components/InteractiveBucketList';
import SurvivalGuide from './components/SurvivalGuide';
import MessageBoard from './components/MessageBoard';

export default function App() {
  const [activeSection, setActiveSection] = useState('welcome');
  const [showQuoteBubble, setShowQuoteBubble] = useState(false);
  const [currentQuote, setCurrentQuote] = useState("Habibi! No force in the world can stop a determined coder in Dubai. Yalla!");

  const localQuotes = [
    "Habibi! No force in the world can stop a determined coder in Dubai. Yalla!",
    "No matter how high the Dubai towers scale, our child memories remain higher. 🏙️",
    "Stay hydrated Anand! 45 degrees Celsius means you require electrolyte packs in your backpack.",
    "The Friday government half-day means Sunday is your strategic planning playground.",
    "Every line of successful code written in our homeland terrace led directly to this Dubai launch pad.",
    "When you feel lost standing beneath the Burj Khalifa, look up—it’s just a larger compiled stack! 💻",
    "Eat some warm hummous, grab a Nol gold seat, and appreciate how far you have marched."
  ];

  const cycleQuote = () => {
    const currentIndex = localQuotes.indexOf(currentQuote);
    const nextIndex = (currentIndex + 1) % localQuotes.length;
    setCurrentQuote(localQuotes[nextIndex]);
    setShowQuoteBubble(true);
  };

  const scrollToSection = (id: string, secName: string) => {
    setActiveSection(secName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* Dynamic Animated Liquid Wallpaper */}
      <BackgroundBubbles />

      {/* FIXED GLASS HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-zinc-950/25 backdrop-blur-md border-b border-white/[0.05] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 via-amber-300 to-rose-400 flex items-center justify-center font-display font-extrabold text-black text-sm shadow-md shadow-cyan-500/20">
              A
            </span>
            <div>
              <span className="font-display font-bold text-sm text-white tracking-wide block">
                Anand Bro's Dubai Voyage
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 block uppercase">
                Digital Farewell Capsule · UAE
              </span>
            </div>
          </div>

          {/* Quick Smooth Navigation links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/[0.02] border border-white/5 px-2.5 py-1.5 rounded-full text-xs font-mono">
            <button 
              onClick={() => scrollToSection('welcome-hero-section', 'welcome')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${activeSection === 'welcome' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Odyssey
            </button>
            <button 
              onClick={() => scrollToSection('dashboard-time', 'stats')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${activeSection === 'stats' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Stats Hub
            </button>
            <button 
              onClick={() => scrollToSection('memories-section', 'memories')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${activeSection === 'memories' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Memories Lanes
            </button>
            <button 
              onClick={() => scrollToSection('bucket-list-card', 'bucket')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${activeSection === 'bucket' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Bucket List
            </button>
            <button 
              onClick={() => scrollToSection('survival-guide-card', 'survival')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${activeSection === 'survival' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Survivals
            </button>
            <button 
              onClick={() => scrollToSection('messages-section', 'messages')}
              className={`px-3 py-1 rounded-full transition cursor-pointer ${activeSection === 'messages' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              Billboard
            </button>
          </nav>

          <button 
            onClick={cycleQuote}
            className="px-3.5 py-1.5 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 rounded-full border border-cyan-400/20 text-[10px] font-mono tracking-widest font-bold uppercase transition flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Hustle Slang
          </button>
        </div>
      </header>

      {/* CORE CONTAINER */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 z-10 w-full relative">
        
        {/* SECTION 1: Welcome & Landing Tickers */}
        <section id="welcome-section">
          <WelcomeHero />
        </section>

        {/* SECTION 2: Live Dubai stats board */}
        <section id="stats-section" className="space-y-4">
          <div className="border-l-2 border-amber-500 pl-4 mb-4">
            <h2 className="text-xl font-display font-medium text-white tracking-wide">Live Gulf Command Center</h2>
            <p className="text-xs text-zinc-500 font-mono">Realtime calculations and adaptation progress metrics</p>
          </div>
          <DubaiDashboard />
        </section>

        {/* SECTION 3: Sibling Memory Lanes */}
        <section>
          <MemoriesCapsule />
        </section>

        {/* SECTION 4: Stateful Interactive Dubai Checklist */}
        <section>
          <InteractiveBucketList />
        </section>

        {/* SECTION 5: Survival slangs and tips */}
        <section>
          <SurvivalGuide />
        </section>

        {/* SECTION 6: Family Billboard Messages */}
        <section>
          <MessageBoard />
        </section>

      </main>

      {/* INTERACTIVE HUSTLE FLOAT BUBBLE FOR ANAND BRO */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">
        <AnimatePresence>
          {showQuoteBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-zinc-950/90 border border-white/15 backdrop-blur-xl p-4 rounded-2xl w-72 shadow-xl pointer-events-auto text-xs space-y-2 relative"
            >
              <div className="absolute -bottom-1.5 right-6 w-3.5 h-3.5 bg-zinc-950 border-r border-b border-white/15 transform rotate-45" />
              
              <div className="flex items-center justify-between text-cyan-400 font-mono text-[9px] font-extrabold uppercase tracking-widest pb-1 border-b border-white/5">
                <span>Codepartner Slangs</span>
                <button 
                  onClick={() => setShowQuoteBubble(false)}
                  className="hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-zinc-200 leading-normal italic">
                "{currentQuote}"
              </p>

              <div className="text-[8px] font-mono text-zinc-500 uppercase text-right">
                Your brotherly back-end assistant
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={cycleQuote}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 text-black flex items-center justify-center shadow-lg pointer-events-auto hover:scale-110 active:scale-95 transition cursor-pointer relative group flex-shrink-0"
          title="Ask brother for adaptation slangs!"
        >
          {/* Subtle pulse ring */}
          <span className="absolute inset-0 rounded-full bg-cyan-400/30 animate-ping group-hover:animate-none opacity-75" />
          <Heart className="w-5 h-5 text-black hover:fill-black text-black" />
        </button>
      </div>

      {/* FOOTER */}
      <footer className="bg-zinc-950/45 border-t border-white/[0.04] py-8 text-center z-10 relative mt-16 font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="text-zinc-500 font-medium">
            Designed with absolute premium digital liquid glassmorphism & brotherly love for Anand Bro 🌐
          </p>
          <p className="opacity-60 text-zinc-600">
            Dubai Odyssey Residency Terminal v1.1 © 2026. Made by your co-pilot.
          </p>
        </div>
      </footer>
    </div>
  );
}
