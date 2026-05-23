import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquareHeart, Smile, Trash2, ShieldAlert, BadgeCheck } from 'lucide-react';
import { FamilyMessage } from '../types';

export default function MessageBoard() {
  const [messages, setMessages] = useState<FamilyMessage[]>(() => {
    const saved = localStorage.getItem('anand_dubai_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse messages', e);
      }
    }
    // Deeply heartwarming preloaded messages from family
    return [
      {
        id: 'mom',
        author: 'Maa (Mom) ❤️',
        relation: 'The Lifeline',
        message: 'Drink plenty of water Anand! I know Deira and Marina can get very hot. Do not skip breakfast, eat dinner on time, and call me every single day without fail. I slipped home-cooked mango pickle in your blue suitcase - do not share it with anyone!',
        date: 'May 1, 2026',
        sticker: '🍯',
        bgColor: 'from-rose-500/10 to-orange-500/10'
      },
      {
        id: 'dad',
        author: 'Papa (Dad) 👨',
        relation: 'Your Backbone',
        message: 'A massive milestone, Son! Moving to Dubai is a proof of your hard work, grit, and vision. Learn the local rules, stay focused on your goals, build powerful networks, and remember we are always here backing you up. Extremely proud of you, Anand!',
        date: 'May 1, 2026',
        sticker: '👑',
        bgColor: 'from-amber-500/10 to-yellow-500/10'
      },
      {
        id: 'bro',
        author: 'Your Brother Codepartner (Me!) 🤝',
        relation: 'The Co-Pilot',
        message: 'Habibi Anand Bro! You actually did it! Who is going to review my manual merge conflicts now? Living in Jumeirah is a major glow-up, but remember to send home that massive box of luxury dates and gold leaf chocolate from Dubai Mall. Hustle hard, stay humble, and build our dream!',
        date: 'May 23, 2026',
        sticker: '🚀',
        bgColor: 'from-cyan-500/10 to-indigo-500/10'
      },
      {
        id: 'sis',
        author: 'Didi & Family 🌸',
        relation: 'Sister Group',
        message: 'Congratulations Anand! We can’t wait to come over during winters to shopping centers and ride those luxury yachts! Go explore the world, stay safe, and eat lots of Al-Ustad kababs. Wishing you endless blessings on this amazing new adventure!',
        date: 'May 2, 2026',
        sticker: '🏙️',
        bgColor: 'from-purple-500/10 to-pink-500/10'
      }
    ];
  });

  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [sticker, setSticker] = useState('🐪');
  const [themeColor, setThemeColor] = useState('cyan');

  useEffect(() => {
    localStorage.setItem('anand_dubai_messages', JSON.stringify(messages));
  }, [messages]);

  const stickers = ['🐪', '🚀', '🏙️', '☕', '👑', '🤝', '❤️', '💸', '✨', '🌴'];

  const postMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    let bgGrad = 'from-cyan-500/15 to-indigo-500/15';
    if (themeColor === 'orange') bgGrad = 'from-rose-500/15 to-orange-500/15';
    if (themeColor === 'gold') bgGrad = 'from-amber-500/15 to-yellow-500/15';
    if (themeColor === 'purple') bgGrad = 'from-purple-500/15 to-pink-500/15';
    if (themeColor === 'emerald') bgGrad = 'from-emerald-500/15 to-teal-500/15';

    const newMsg: FamilyMessage = {
      id: Date.now().toString(),
      author: author.trim(),
      relation: relation.trim() || 'Relative',
      message: message.trim(),
      date: new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
      sticker,
      bgColor: bgGrad
    };

    setMessages(prev => [newMsg, ...prev]);
    setAuthor('');
    setRelation('');
    setMessage('');
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-[2.5rem] my-8 relative overflow-hidden" id="messages-section">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full filter blur-2xl pointer-events-none" />
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#22d3ee] uppercase font-bold flex items-center gap-1.5 mb-1">
            <MessageSquareHeart className="w-4 h-4 text-cyan-400" /> Brotherly Love Capsule
          </span>
          <h2 className="text-2xl font-display font-bold text-white">Welcoming Blessings Billboard</h2>
          <p className="text-xs text-zinc-400">Heartwarming messages dropped by your key cheerleaders, mom, dad, sibling, and family coordinators.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* POST-A-MESSAGE FORM: LEFT/TOP (col-span-4) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl bg-black/40 border border-white/10">
          <form onSubmit={postMessage} className="space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <Smile className="w-4 h-4" /> Seal a Welcome Message
            </h3>

            <div>
              <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Your Name / Title</label>
              <input
                type="text"
                required
                placeholder="e.g., Uncle Shashi 👔"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400/80 transition"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Relation / Role</label>
              <input
                type="text"
                placeholder="e.g., Loving Uncle"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400/80 transition"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Select Custom Sticker Emoji</label>
              <div className="flex flex-wrap gap-1.5">
                {stickers.map((stk) => (
                  <button
                    type="button"
                    key={stk}
                    onClick={() => setSticker(stk)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs border transition cursor-pointer select-none ${
                      stk === sticker 
                        ? 'bg-cyan-500/10 border-cyan-500/80 scale-105 font-bold shadow-md' 
                        : 'bg-white/[0.01] border-white/5 hover:bg-white/5'
                    }`}
                  >
                    {stk}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Aesthetic Aura Preset</label>
              <div className="grid grid-cols-5 gap-1.5">
                {['cyan', 'orange', 'gold', 'purple', 'emerald'].map((col) => (
                  <button
                    type="button"
                    key={col}
                    onClick={() => setThemeColor(col)}
                    className={`text-[9px] font-mono py-1 rounded-lg border uppercase tracking-wider transition font-medium cursor-pointer ${
                      col === themeColor
                        ? 'bg-cyan-400 text-black border-cyan-400 scale-105'
                        : 'bg-white/[0.01] border-white/5 text-zinc-400'
                    }`}
                  >
                    {col.substring(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Message Body</label>
              <textarea
                required
                rows={5}
                placeholder="Write your advice, blessings, request for gifts, or welcoming words here for Anand Bro..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400/80 transition leading-relaxed font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-teal-400 text-black rounded-xl py-2 font-mono text-xs font-bold uppercase tracking-widest hover:scale-[1.01] transition-transform shadow-[0_4px_14px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 inline mr-1" /> Seal Capsule Message
            </button>
          </form>
        </div>

        {/* MESSAGES WALL DISPLAY: RIGHT (col-span-8) */}
        <div className="lg:col-span-7 space-y-4 max-h-[500px] overflow-y-auto pr-2" id="family-billboard">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                key={msg.id}
                className={`glass-panel p-5 rounded-2xl bg-gradient-to-br ${msg.bgColor} border border-white/5 relative group hover:border-white/20 transition-all duration-300 shadow-md`}
              >
                {/* Floating top right sticker emoji */}
                <div className="absolute top-4 right-4 text-2xl filter drop-shadow select-none animate-bounce" style={{ animationDuration: '4s' }}>
                  {msg.sticker}
                </div>

                <div className="flex items-center gap-3.5 pb-3 border-b border-white/5">
                  <span className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center font-display font-bold text-white text-xs border border-white/5 shadow-inner">
                    {msg.author.charAt(0)}
                  </span>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white tracking-wide">{msg.author}</span>
                      <BadgeCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    </div>
                    
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block mt-0.5 leading-none">
                      {msg.relation} · {msg.date}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed font-sans mt-3 whitespace-pre-line max-h-[120px] overflow-y-auto pr-1">
                  {msg.message}
                </p>

                {/* DELETE ADMIN COMMAND */}
                <div className="flex justify-end pt-3 mt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => removeMessage(msg.id)}
                    className="text-[9px] font-mono font-semibold text-zinc-600 hover:text-red-400 transition cursor-pointer flex items-center gap-1"
                    title="Delete message from board"
                  >
                    <Trash2 className="w-3 h-3" /> DELETE
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {messages.length === 0 && (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
              <p className="text-zinc-500 font-mono text-xs">The Digital Welcome Board is currently blank.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
