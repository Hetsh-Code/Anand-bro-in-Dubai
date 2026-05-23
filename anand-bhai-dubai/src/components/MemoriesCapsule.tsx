import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Calendar, Trash2, Heart, Plus, MapPin, Film, Info, RefreshCw } from 'lucide-react';
import { Memory } from '../types';

export default function MemoriesCapsule() {
  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem('anand_dubai_memories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse memories', e);
      }
    }
    // Hardcoded warm brotherly childhood and transition milestones
    return [
      { 
        id: 'farewell', 
        title: 'The Final Airport Chai Hug ☕', 
        description: 'Tasting extra sweet but nostalgic chai at the airport cafe right before you stepped through security. You promised to call as soon as you touch down in terminal 3!', 
        date: 'May 1, 2026', 
        category: 'Nostalgia', 
        imageUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&auto=format&fit=crop&q=80',
        color: '#fb923c', 
        rotation: -4 
      },
      { 
        id: 'first_deploy', 
        title: 'Our First Collaborative Deploy 💻', 
        description: 'Pulling that consecutive all-nighter, downing cold drip coffee and red-bulls contextually, only for the build to pass at 5 AM! That’s when I knew you were destined for worldwide success.', 
        date: 'Nov 12, 2024', 
        category: 'Hustle', 
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80', 
        color: '#38bdf8', 
        rotation: 3 
      },
      { 
        id: 'childhood', 
        title: 'Childhood Terraces & Kite Fights 🪁', 
        description: 'Competing for the strongest glass thread during windy Sunday summers. Regardless of who cut whose kite, we always celebrated with cold mango lassi afterwards.', 
        date: 'August 14, 2015', 
        category: 'Childhood', 
        imageUrl: 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?w=500&auto=format&fit=crop&q=80', 
        color: '#ec4899', 
        rotation: -2 
      },
      { 
        id: 'dubai_first_day', 
        title: 'Anand Bro Touches the Burj Khalifa 🏙️', 
        description: 'Seeing your selfie standing beneath that massive silver tower, with the midday sun reflecting in the glass panels. Standard iconic start to a legendary Dubai chapter!', 
        date: 'May 3, 2026', 
        category: 'Milestones', 
        imageUrl: '/src/assets/images/dubai_glass_bg_1779505805901.png', 
        color: '#eab308', 
        rotation: 5 
      }
    ];
  });

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Nostalgia');
  const [color, setColor] = useState('#fb923c');
  const [imageUrl, setImageUrl] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  useEffect(() => {
    localStorage.setItem('anand_dubai_memories', JSON.stringify(memories));
  }, [memories]);

  const addMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Fallback placeholder image if URL empty
    const finalImg = imageUrl.trim() || `https://picsum.photos/seed/${Date.now()}/500/350`;

    const newMem: Memory = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
      category,
      imageUrl: finalImg,
      color,
      rotation: Math.floor(Math.random() * 8) - 4 // random rotation -4 to +4
    };

    setMemories(prev => [newMem, ...prev]);
    setTitle('');
    setDescription('');
    setImageUrl('');
    setShowAddForm(false);
  };

  const removeMemory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemories(prev => prev.filter(m => m.id !== id));
    if (selectedMemory?.id === id) setSelectedMemory(null);
  };

  const selectPreloadSample = (src: string) => {
    setImageUrl(src);
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-[2.5rem] my-8 relative overflow-hidden" id="memories-section">
      <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <span className="text-xs font-mono tracking-widest text-rose-400 uppercase font-bold flex items-center gap-1.5 mb-1">
            <Film className="w-4 h-4 text-rose-400" /> Digital Time Capsule
          </span>
          <h2 className="text-2xl font-display font-bold text-white">Brotherhood Memory Lane</h2>
          <p className="text-xs text-zinc-400">Hover, click to enlarge, and cherish special memories we shared prior to your Dubai launch.</p>
        </div>

        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            window.location.hash = "#add-memory-button";
          }}
          className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 rounded-2xl border border-rose-500/20 text-xs font-mono tracking-wider font-semibold cursor-pointer transition flex items-center gap-1.5 shadow-lg"
          id="add-memory-button"
        >
          <Plus className="w-4 h-4 text-rose-300" /> Add Memory Card
        </button>
      </div>

      {/* FORM TO ADD MEMORY */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            className="overflow-hidden mb-8"
          >
            <form onSubmit={addMemory} className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-rose-400 font-bold">Write Sibling Polaroid Card</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Memory Title</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g., Midnight Biryani Feast 🍛" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-400/80 transition"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Description / Inner Note</label>
                    <textarea 
                      required
                      rows={3}
                      placeholder="Recall details: the specific jokes, who ordered the food, what song was playing in the background..." 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-400/80 transition"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Nostalgic Image URL (Optional)</label>
                    <input 
                      type="url" 
                      placeholder="https://images.unsplash.com/... or leave blank for a surprise" 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-rose-400/80 transition font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Category tag</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white font-mono uppercase tracking-wide focus:outline-none"
                      >
                        <option value="Nostalgia">🍂 Nostalgia</option>
                        <option value="Hustle">💻 Hustle</option>
                        <option value="Childhood">🧸 Childhood</option>
                        <option value="Milestones">🏙️ Milestones</option>
                        <option value="InsideJoke">🤫 Inside Joke</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Aesthetic Mood Border</label>
                      <select
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white font-mono uppercase tracking-wide focus:outline-none"
                      >
                        <option value="#fb923c">Peach Amber</option>
                        <option value="#38bdf8">Sky Blue</option>
                        <option value="#ec4899">Cosmic Pink</option>
                        <option value="#eab308">Premium Gold</option>
                        <option value="#10b981">Jumeirah Emerald</option>
                      </select>
                    </div>
                  </div>

                  {/* Preset Background Loader */}
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 block mb-1">PRESET HIGH-END BACKDROPS:</span>
                    <div className="flex gap-2">
                      <button 
                        type="button" 
                        onClick={() => selectPreloadSample('/src/assets/images/burj_sunset_vector_1779505824965.png')}
                        className="text-[9px] font-mono px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-amber-400 border border-white/5"
                      >
                        🌅 Burj Sunset
                      </button>
                      <button 
                        type="button" 
                        onClick={() => selectPreloadSample('/src/assets/images/dubai_glass_bg_1779505805901.png')}
                        className="text-[9px] font-mono px-2 py-1 rounded bg-zinc-800 text-zinc-300 hover:text-cyan-400 border border-white/5"
                      >
                        🔮 Dubai Glass Sphere
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-xs font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-gradient-to-r from-rose-500 to-amber-500 hover:scale-[1.01] text-black font-mono text-xs tracking-wider font-extrabold uppercase rounded-xl cursor-pointer shadow-lg"
                >
                  Publish to Capsule
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DRAGGABLE / ROTATABLE POLAROIDS DISPLAY GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4" id="polaroids-grid">
        {memories.map((mem) => (
          <motion.div
            key={mem.id}
            whileHover={{ 
              scale: 1.04, 
              rotate: 0,
              zIndex: 50,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
            }}
            style={{ 
              rotate: mem.rotation, 
              borderColor: `${mem.color}40`,
            }}
            onClick={() => setSelectedMemory(mem)}
            className="glass-panel p-4 pb-6 rounded-2xl bg-[#090d1a] border cursor-pointer group shadow-xl relative transition-shadow duration-500 select-none flex flex-col justify-between"
          >
            {/* STICKER */}
            <div className="absolute -top-3 left-[calc(50%-20px)] w-10 h-6 bg-white/20 backdrop-blur-md rounded-md z-10 border border-white/25 border-b-white/5 transform rotate-1 flex items-center justify-center">
              <span className="text-[10px] font-serif text-white/60">📌</span>
            </div>

            {/* Polaroid frame border glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent rounded-2xl pointer-events-none" />

            {/* Photo inside Frame */}
            <div className="rounded-lg aspect-[4/3] overflow-hidden relative bg-slate-950 mb-4 border border-white/5">
              {mem.imageUrl ? (
                <img 
                  src={mem.imageUrl} 
                  alt={mem.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter group-hover:contrast-125"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center p-4 text-center">
                  <Camera className="w-6 h-6 text-zinc-600 mb-1" />
                </div>
              )}
              {/* Category label */}
              <div className="absolute top-2.5 left-2.5 z-10">
                <span className="text-[8px] font-mono tracking-wider font-bold text-black uppercase py-0.5 px-2 bg-white/90 backdrop-blur rounded-sm">
                  {mem.category}
                </span>
              </div>
            </div>

            {/* Polaroid Footer */}
            <div className="space-y-2 mt-auto">
              <div>
                <h3 className="text-xs font-semibold text-white tracking-wide font-display group-hover:text-amber-300 transition-colors leading-tight">
                  {mem.title}
                </h3>
                <span className="text-[9px] font-mono text-zinc-500 block uppercase mt-0.5 mt-1">
                  📅 {mem.date}
                </span>
              </div>

              <p className="text-[11px] text-zinc-400 line-clamp-3 leading-relaxed mt-1 font-sans">
                {mem.description}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-between pt-3.5 border-t border-white/5 mt-3 text-[10px] font-mono text-zinc-500 select-none">
              <span className="text-[10px] text-rose-400/80 hover:text-rose-400 transition flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500/10 hover:fill-rose-500 transition-colors" /> Sibling Love
              </span>
              <button
                onClick={(e) => removeMemory(mem.id, e)}
                className="hover:text-red-400 p-1 rounded hover:bg-white/5 transition opacity-0 group-hover:opacity-100 cursor-pointer"
                title="Burn polaroid card"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FULL-SIZE MEMORY PREVIEW MODAL */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-panel-heavy p-6 rounded-[2.5rem] w-full max-w-2xl relative border border-white/20 shadow-2xl overflow-hidden text-zinc-100"
            >
              {/* Decorative side light */}
              <div 
                className="absolute top-0 right-0 h-48 w-48 rounded-full filter blur-[100px]"
                style={{ backgroundColor: `${selectedMemory.color}25` }}
              />

              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center font-bold text-sm text-zinc-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="rounded-2xl overflow-hidden max-h-[300px] border border-white/10">
                  <img 
                    src={selectedMemory.imageUrl || "https://picsum.photos/500/350"} 
                    alt={selectedMemory.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-rose-500/20 text-rose-300 font-mono text-[9px] font-bold uppercase tracking-widest rounded-full">
                      🔑 {selectedMemory.category}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5 uppercase font-medium">
                      <Calendar className="w-3 h-3" /> {selectedMemory.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-black text-white leading-tight">
                    {selectedMemory.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed font-sans max-h-[160px] overflow-y-auto pr-1">
                    {selectedMemory.description}
                  </p>

                  <div className="flex gap-4 pt-4 border-t border-white/5 text-[10px] font-mono">
                    <div className="text-amber-400 font-bold uppercase flex items-center gap-1">
                      👑 Sibling Relocation Code
                    </div>
                    <div className="text-zinc-500 uppercase">
                      ID: {selectedMemory.id}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
