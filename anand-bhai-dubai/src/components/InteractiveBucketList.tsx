import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, Trash2, Award, ClipboardList, Zap, Filter } from 'lucide-react';
import { BucketItem } from '../types';

export default function InteractiveBucketList() {
  const [items, setItems] = useState<BucketItem[]>(() => {
    const saved = localStorage.getItem('anand_dubai_bucket');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse bucket list', e);
      }
    }
    return [
      { id: '1', text: 'Visit Burj Khalifa Top Deck at Golden Hour', done: false, points: 50, category: 'exploration' },
      { id: '2', text: 'Drift across sand dunes in an upscale SUV Desert Safari', done: false, points: 40, category: 'exploration' },
      { id: '3', text: 'Savor legendary kababs at Al Ustad Special Kabab', done: false, points: 25, category: 'food' },
      { id: '4', text: 'Ride the futuristic Dubai Metro inside the private Gold Class cabin', done: false, points: 20, category: 'local_life' },
      { id: '5', text: 'Survive a midday summer temperature of 45°C without running inside', done: false, points: 60, category: 'challenges' },
      { id: '6', text: 'Learn to speak 5 Arabic greeting dialects with the locals', done: false, points: 30, category: 'challenges' },
      { id: '7', text: 'Fly high on a luxury speed boat in Dubai Marina', done: false, points: 45, category: 'local_life' },
      { id: '8', text: 'Sample a 24-karat gold leaf cappuccino at a deluxe hotel lounge', done: false, points: 35, category: 'food' },
    ];
  });

  const [activeTab, setActiveTab] = useState<'all' | 'exploration' | 'local_life' | 'challenges' | 'food'>('all');
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState<'exploration' | 'local_life' | 'challenges' | 'food'>('exploration');
  const [newPoints, setNewPoints] = useState(30);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('anand_dubai_bucket', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newItem: BucketItem = {
      id: Date.now().toString(),
      text: newText.trim(),
      done: false,
      points: Number(newPoints),
      category: newCategory
    };

    setItems(prev => [newItem, ...prev]);
    setNewText('');
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const completedCount = items.filter(i => i.done).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  // Calculate score
  const totalPointsEarned = items.filter(i => i.done).reduce((acc, current) => acc + current.points, 0);
  const potentialPoints = items.reduce((acc, current) => acc + current.points, 0);

  const filteredItems = items.filter(i => activeTab === 'all' || i.category === activeTab);

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-[2rem] my-8 relative overflow-hidden" id="bucket-list-card">
      <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-bold flex items-center gap-1.5 mb-1">
            <ClipboardList className="w-4 h-4" /> Odyssey Checklist
          </span>
          <h2 className="text-2xl font-display font-bold text-white">Anand Bro's Dubai Bucket List</h2>
          <p className="text-xs text-zinc-400">Add, complete, and tally your grand exploits across the Gulf!</p>
        </div>

        {/* PROGRESS PILL */}
        <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 py-2.5 px-4 rounded-2xl">
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="transparent" />
              <circle cx="24" cy="24" r="20" stroke="#0ea5e9" strokeWidth="3.5" fill="transparent"
                strokeDasharray={2 * Math.PI * 20}
                strokeDashoffset={2 * Math.PI * 20 * (1 - progressPercent / 100)}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <span className="absolute text-xs font-mono font-bold tracking-tighter text-white">{progressPercent}%</span>
          </div>

          <div>
            <div className="flex items-center gap-1 text-xs font-mono text-amber-400 font-bold">
              <Award className="w-3.5 h-3.5" />
              <span>{totalPointsEarned} / {potentialPoints} pts</span>
            </div>
            <span className="text-[10px] uppercase font-mono text-zinc-500 block">Adaptation Tier: {totalPointsEarned > 200 ? '👑 Ultimate Sheikh' : totalPointsEarned > 80 ? '🌟 Habitual Resident' : '🐣 Fresh off flight'}</span>
          </div>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 mb-6" id="bucket-filters">
        {(['all', 'exploration', 'local_life', 'challenges', 'food'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all border cursor-pointer ${
              activeTab === tab
                ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/20 border-sky-400/30 text-white shadow-[0_4px_12px_rgba(14,165,233,0.15)]'
                : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/5 text-zinc-400'
            }`}
          >
            {tab.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* CHECKLIST LIST */}
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2" id="bucket-items-container">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition duration-300 cursor-pointer ${
                item.done 
                  ? 'bg-cyan-950/10 border-cyan-500/20 text-zinc-500' 
                  : 'bg-white/[0.02] border-white/5 hover:border-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-3.5 flex-1 select-none">
                <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                  item.done 
                    ? 'bg-cyan-500 border-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]' 
                    : 'border-white/20'
                }`}>
                  {item.done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <div className="flex-1">
                  <span className={`text-sm tracking-wide ${item.done ? 'line-through opacity-50 font-light' : 'font-medium text-zinc-200'}`}>
                    {item.text}
                  </span>
                  
                  <div className="flex gap-2 mt-1">
                    <span className="text-[9px] uppercase tracking-widest font-mono font-medium px-2 py-0.5 rounded-md bg-white/5 text-zinc-500">
                      {item.category.replace('_', ' ')}
                    </span>
                    <span className="text-[9px] font-mono text-amber-500/80 flex items-center gap-0.5 font-semibold">
                      <Zap className="w-2.5 h-2.5" />
                      {item.points} pts
                    </span>
                  </div>
                </div>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                className="p-2 hover:bg-red-500/10 rounded-xl text-zinc-500 hover:text-red-400 transition cursor-pointer"
                title="Remove goal"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 border border-dashed border-white/5 rounded-2xl">
            <p className="text-zinc-500 font-mono text-xs">No checklist items under this category.</p>
          </div>
        )}
      </div>

      {/* ADD BRAND NEW TASK CONTAINER */}
      <form onSubmit={addItem} className="mt-6 border-t border-white/10 pt-6 grid grid-cols-1 md:grid-cols-12 gap-3" id="add-bucket-form">
        <div className="md:col-span-6">
          <input
            type="text"
            required
            placeholder="Add Anand's custom Dubai milestone (e.g., Skydive from the Palm)..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 md:col-span-4">
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as any)}
            className="bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase tracking-wider font-mono focus:outline-none focus:border-cyan-500/80"
          >
            <option value="exploration">Exploration</option>
            <option value="local_life">Local Life</option>
            <option value="challenges">Challenges</option>
            <option value="food">Eats & Cafe</option>
          </select>

          <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-2 rounded-xl">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Points:</span>
            <input
              type="number"
              min="10"
              max="100"
              required
              value={newPoints}
              onChange={(e) => setNewPoints(Number(e.target.value))}
              className="w-full bg-transparent font-mono text-zinc-200 text-xs focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="md:col-span-2 w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-black hover:scale-[1.01] transition-transform font-mono text-[11px] tracking-widest font-extrabold uppercase rounded-xl py-2 flex.items-center justify-center gap-1 cursor-pointer shadow-[0_4px_14px_rgba(14,165,233,0.3)]"
        >
          <Plus className="w-4 h-4 text-black inline-block leading-none align-middle mr-1" /> Add Goal
        </button>
      </form>
    </div>
  );
}
