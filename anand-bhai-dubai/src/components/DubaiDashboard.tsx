import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sun, Flame, DollarSign, RefreshCw, Volume2, VolumeX, Sparkles, MapPin, Wind } from 'lucide-react';

interface DubaiDashboardProps {
  userName?: string;
}

export default function DubaiDashboard({ userName = "Anand Bro" }: DubaiDashboardProps) {
  const [dubaiTime, setDubaiTime] = useState('');
  const [dubaiDate, setDubaiDate] = useState('');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [aedInput, setAedInput] = useState('100');
  const [inrRate] = useState(22.72); // Approx rate for AED to INR
  const [usdRate] = useState(0.272); // AED to USD
  const [hustleFactor, setHustleFactor] = useState(72);
  const [ambientSound, setAmbientSound] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Update Dubai Time (UTC +4)
  useEffect(() => {
    const timer = setInterval(() => {
      const optionsTime: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      
      const optionsDate: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        weekday: 'long'
      };

      const now = new Date();
      setDubaiTime(now.toLocaleTimeString('en-US', optionsTime));
      setDubaiDate(now.toLocaleTimeString('en-US', optionsDate).split(',')[0] + ', ' + now.toLocaleDateString('en-US', optionsDate));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const convertedValueINR = (parseFloat(aedInput || '0') * inrRate).toFixed(2);
  const convertedValueUSD = (parseFloat(aedInput || '0') * usdRate).toFixed(2);

  const ambientTracks = [
    { id: 'breeze', name: 'Marina Yacht Breeze', desc: 'Soothe the mind with wave whispers', icon: Wind },
    { id: 'fountain', name: 'Dubai Fountain Waltz', desc: 'Ambient dynamic orchestral sweeps', icon: Sparkles },
    { id: 'desert', name: 'Golden Sands Lounge', desc: 'Warm desert wind & luxury beats', icon: Sun },
  ];

  const toggleSound = (trackId: string) => {
    if (ambientSound === trackId && isPlaying) {
      setIsPlaying(false);
      setAmbientSound(null);
    } else {
      setAmbientSound(trackId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
      
      {/* CARD 1: LIVE DUBAI TIME & CHRONICLES */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[280px] group shadow-xl"
        id="dashboard-time"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full filter blur-2xl group-hover:bg-amber-500/20 transition-all duration-500" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">Live in Dubai</span>
          </div>
          <Clock className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '40s' }} />
        </div>

        <div className="my-4">
          <span className="text-4xl sm:text-5xl font-display font-light text-white tracking-widest block tabular-nums select-none filter drop-shadow">
            {dubaiTime || '12:00:00 PM'}
          </span>
          <span className="text-xs font-mono text-zinc-400 mt-2 block tracking-wide">
            {dubaiDate || 'Loading Gulf Date...'}
          </span>
        </div>

        <div className="flex items-center justify-between glass-panel px-3 py-2 rounded-xl text-xs bg-white/[0.02]">
          <span className="text-zinc-500 tracking-wide font-medium flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" /> Ground Zero:
          </span>
          <span className="text-amber-400 font-mono font-bold tracking-wider uppercase">Jumeirah, Dubai UAE</span>
        </div>
      </motion.div>

      {/* CARD 2: GULF WEATHER SYNCED */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[280px] group shadow-xl"
        id="dashboard-weather"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full filter blur-2xl group-hover:bg-rose-500/20 transition-all duration-500" />
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest text-rose-400 uppercase">Ambient Climate</span>
          <Sun className="w-5 h-5 text-rose-400 animate-pulse" />
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-200 to-rose-400">
              {tempUnit === 'C' ? '39' : '102'}
            </span>
            <span className="text-xl font-display text-zinc-300 font-medium">
              °{tempUnit}
            </span>
            <button 
              onClick={() => setTempUnit(u => u === 'C' ? 'F' : 'C')}
              className="ml-auto w-8 h-8 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 flex items-center justify-center transition-colors text-white"
              title="Convert unit"
            >
              <RefreshCw className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
            </button>
          </div>
          <span className="text-xs font-mono text-amber-500 mt-2 block uppercase tracking-wider">
            ☀️ Extremely Sunny & Radiant · 12% Humidity
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-xs mt-2">
          <div className="glass-panel py-2 rounded-xl bg-white/[0.01]">
            <span className="text-zinc-500 block mb-1">UV Index</span>
            <span className="font-mono text-zinc-200 font-bold">11 (Violet Ultra)</span>
          </div>
          <div className="glass-panel py-2 rounded-xl bg-white/[0.01]">
            <span className="text-zinc-500 block mb-1">Desert Breeze</span>
            <span className="font-mono text-zinc-200 font-bold">14 km/h ENE</span>
          </div>
        </div>
      </motion.div>

      {/* CARD 3: THE AED COIN CONVERTER */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[280px] group shadow-xl"
        id="dashboard-converter"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full filter blur-2xl group-hover:bg-sky-500/20 transition-all duration-500" />
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest text-sky-400 uppercase">Hustler Exchange</span>
          <DollarSign className="w-4 h-4 text-sky-400" />
        </div>

        <div className="my-3 space-y-3">
          <div>
            <label className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase block mb-1">Dirhams (AED)</label>
            <div className="relative">
              <input 
                type="number" 
                value={aedInput}
                onChange={(e) => setAedInput(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-white font-mono text-lg focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/60 transition"
              />
              <span className="absolute right-3 top-2.5 font-mono text-xs text-sky-400 font-bold">AED</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase block mb-0.5">Rupee Sync (₹)</span>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl py-1.5 px-3 text-center">
                <span className="font-mono text-white text-sm font-semibold">₹{convertedValueINR}</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-400 tracking-wider uppercase block mb-0.5">Dollar Sync ($)</span>
              <div className="bg-white/[0.02] border border-white/5 rounded-xl py-1.5 px-3 text-center">
                <span className="font-mono text-white text-sm font-semibold">${convertedValueUSD}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-[10px] font-mono text-zinc-600 text-center uppercase tracking-widest">
          Rate: 1 AED ≈ ₹{inrRate} · Live sync active
        </div>
      </motion.div>

      {/* CARD 4: DUBAI ENERGY & COFFEE HUSTLE */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[250px] lg:col-span-2 group shadow-xl"
        id="dashboard-adaptability"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full filter blur-3xl group-hover:bg-indigo-500/10 transition-all duration-500" />
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase">Anand's Dubai Hustle Meter</span>
          <Flame className="w-5 h-5 text-indigo-400 animate-pulse" />
        </div>

        <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-4xl font-display font-black text-white">{hustleFactor}%</span>
            <span className="text-xs font-mono text-indigo-300 mt-1 uppercase tracking-wider">Adaptability Quotient</span>
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Coffee Intake (Dubai Cafes)</span>
                <span className="text-indigo-400 font-bold">4 / 5 Cups</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Survival to Summer Heat</span>
                <span className="text-indigo-400 font-bold">Heat resistant level 3</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-500 to-amber-400 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-zinc-400">Dubai Local Slang Mastery</span>
                <span className="text-indigo-400 font-bold">90% Professional Habib</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center md:justify-start gap-4">
          <button 
            onClick={() => setHustleFactor(f => Math.min(100, f + 5))}
            className="text-[10px] font-mono tracking-wider font-semibold border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-xl transition cursor-pointer"
          >
            🔥 Boost Dubai Energy
          </button>
          <button 
            onClick={() => setHustleFactor(72)}
            className="text-[10px] font-mono tracking-wider font-medium text-zinc-500 hover:text-zinc-300 transition"
          >
            Reset Meter
          </button>
        </div>
      </motion.div>

      {/* CARD 5: AMBIENT LOUNGE CONTROLLER */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="glass-panel p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[250px] group shadow-xl"
        id="dashboard-soundscape"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full filter blur-2xl group-hover:bg-teal-500/20 transition-all duration-500" />
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono tracking-widest text-teal-400 uppercase">Jumeirah Soundboard</span>
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-teal-400 animate-bounce" />
          ) : (
            <VolumeX className="w-4 h-4 text-zinc-500" />
          )}
        </div>

        <div className="my-2 space-y-2.5">
          {ambientTracks.map((track) => {
            const TrackIcon = track.icon;
            const active = ambientSound === track.id && isPlaying;
            return (
              <button
                key={track.id}
                onClick={() => toggleSound(track.id)}
                className={`w-full text-left flex items-center justify-between p-2 rounded-xl transition border cursor-pointer ${
                  active 
                    ? 'bg-teal-500/10 border-teal-500/30 text-teal-300' 
                    : 'bg-white/[0.01] border-white/5 hover:bg-white/5 hover:border-white/10 text-zinc-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`p-1.5 rounded-lg ${active ? 'bg-teal-500/20 text-teal-300' : 'bg-white/5 text-zinc-400 group-hover:bg-zinc-800'}`}>
                    <TrackIcon className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-xs font-medium block">{track.name}</span>
                    <span className="text-[10px] text-zinc-500 block leading-tight">{track.desc}</span>
                  </div>
                </div>
                {active && (
                  <div className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 bg-teal-400 h-2 animate-pulse" />
                    <span className="w-0.5 bg-teal-400 h-3 animate-pulse" style={{ animationDelay: '0.1s' }} />
                    <span className="w-0.5 bg-teal-400 h-1.5 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-[10px] font-mono text-zinc-500 text-center leading-normal">
          {isPlaying ? `Streaming simulated soundscape: ${ambientSound}...` : 'Select soundscape for focus mode'}
        </div>
      </motion.div>

    </div>
  );
}
