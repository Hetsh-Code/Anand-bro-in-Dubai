import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Calendar, MapPin, Heart, Sparkles, Navigation, Globe } from 'lucide-react';

export default function WelcomeHero() {
  const [relocationDate, setRelocationDate] = useState('2026-05-01');
  const [stats, setStats] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [cheer, setCheer] = useState("Welcome to your Golden Chapter, Anand Bro!");

  const cheersList = [
    "Welcome to your Golden Chapter, Anand Bro!",
    "Habibi! Dubai looks spectacular with you in it! ✨",
    "Keep Hustling, Keep Shining. Sky is the limit! 🚀",
    "Dubai Marina nights are waiting for your success stories!",
    "A brand new playground for the coder extra-ordinaire!"
  ];

  const cycleCheer = () => {
    const currentIndex = cheersList.indexOf(cheer);
    const nextIndex = (currentIndex + 1) % cheersList.length;
    setCheer(cheersList[nextIndex]);
  };

  useEffect(() => {
    const calculateTime = () => {
      const departure = new Date(`${relocationDate}T00:00:00`);
      const now = new Date();
      const diffMs = now.getTime() - departure.getTime();

      if (diffMs > 0) {
        const totalSecs = Math.floor(diffMs / 1000);
        const days = Math.floor(totalSecs / 86400);
        const hours = Math.floor((totalSecs % 86400) / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;
        setStats({ days, hours, mins, secs });
      } else {
        setStats({ days: 0, hours: 0, mins: 0, secs: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [relocationDate]);

  return (
    <div className="relative mb-12" id="welcome-hero-section">
      {/* Background Graphic Grid */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#0ea5e9] to-[#fb923c] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="glass-panel p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-white/10 md:grid md:grid-cols-12 md:gap-8 items-center bg-gradient-to-br from-white/[0.03] to-slate-900/60">
        
        {/* Abstract Golden Light Backdrop in Hero */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-500/10 rounded-full filter blur-[80px]" />
        
        {/* HERO COPY: LEFT */}
        <div className="md:col-span-7 space-y-6 z-10 relative">
          
          <div className="flex flex-wrap items-center gap-2">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3.5 py-1.5 rounded-full glass-panel bg-white/5 border-white/15 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300 font-mono text-[10px] tracking-widest uppercase font-bold flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              Odyssey Dashboard
            </motion.div>
            
            <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-medium">
              Relocation Milestone v1.0
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-none">
              Habibi, Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-rose-400">
                DUBAI
              </span>
            </h1>

            {/* Clickable Heart Greeting Line */}
            <motion.p 
              key={cheer}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={cycleCheer}
              className="text-lg text-zinc-300 font-medium tracking-wide flex items-center gap-2 cursor-pointer hover:text-white transition duration-200"
            >
              <span>{cheer}</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </motion.p>
          </div>

          <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
            This space is created to celebrate your incredible move to the city of dreams! Your courage to explore and innovate shines brighter than the desert sun. Click anywhere on the dashboard to interact, browse memories, explore survival cards, or add custom goals!
          </p>

          {/* LANDING TICKER SHOWING DURATION OF DUBAI RESIDENCY */}
          <div className="p-5 rounded-2xl glass-panel bg-zinc-950/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 font-medium tracking-wider uppercase flex items-center gap-1.5">
                <Plane className="w-4 h-4 text-sky-400 animate-bounce" />
                Dubai Residence Clock
              </span>
              <button 
                onClick={() => setIsInputOpen(!isInputOpen)}
                className="text-[10px] font-mono tracking-widest text-[#0ea5e9] hover:underline"
              >
                {isInputOpen ? 'Done' : 'Change Arrival Date'}
              </button>
            </div>

            <AnimatePresence>
              {isInputOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden pb-2"
                >
                  <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Set Landing Date</label>
                  <input 
                    type="date" 
                    value={relocationDate}
                    onChange={(e) => setRelocationDate(e.target.value)}
                    className="bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white/[0.01] rounded-xl p-2 border border-white/5">
                <span className="block text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">{stats.days}</span>
                <span className="text-[9px] font-mono text-zinc-500 tracking-wider block uppercase">Days</span>
              </div>
              <div className="bg-white/[0.01] rounded-xl p-2 border border-white/5">
                <span className="block text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">{stats.hours}</span>
                <span className="text-[9px] font-mono text-zinc-500 tracking-wider block uppercase">Hours</span>
              </div>
              <div className="bg-white/[0.01] rounded-xl p-2 border border-white/5">
                <span className="block text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">{stats.mins}</span>
                <span className="text-[9px] font-mono text-zinc-500 tracking-wider block uppercase">Mins</span>
              </div>
              <div className="bg-white/[0.01] rounded-xl p-2 border border-white/5">
                <span className="block text-2xl sm:text-3xl font-display font-bold text-white tracking-tight text-amber-400">{stats.secs}</span>
                <span className="text-[9px] font-mono text-zinc-500 tracking-wider block uppercase">Secs</span>
              </div>
            </div>
            
            <p className="text-[10px] font-mono text-zinc-500 text-center uppercase tracking-wider">
              Calculated from arrival on: {new Date(relocationDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        {/* HERO ILLUSTRATION: RIGHT */}
        <div className="md:col-span-5 mt-8 md:mt-0 relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-slate-950/80 p-1 group">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent z-10" />
          
          <img 
            src="/src/assets/images/burj_sunset_vector_1779505824965.png" 
            alt="Burj Khalifa Sunset" 
            className="w-full h-[280px] sm:h-[350px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />

          <div className="absolute bottom-5 left-5 right-5 z-20 space-y-1">
            <span className="px-2 py-0.5 rounded bg-amber-500/80 text-black font-mono text-[9px] font-extrabold uppercase tracking-widest">
              Gilded Dubai Sky
            </span>
            <div className="flex items-center gap-1.5 text-white font-display text-sm font-semibold tracking-wide">
              <span>Burj Khalifa at Sunset</span>
              <Navigation className="w-3.5 h-3.5 text-amber-300" />
            </div>
            <p className="text-[10px] text-zinc-400 leading-normal">
              Representing your stellar new heights in the Emirates skyline.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
