import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Compass, ShieldAlert, Award, ChevronDown, ChevronUp, CheckCircle, HelpCircle } from 'lucide-react';
import { SurvivalTip } from '../types';

export default function SurvivalGuide() {
  const [activeTab, setActiveTab] = useState<'arabic_101' | 'laws_etiquette' | 'dubai_hacks'>('arabic_101');
  const [openSlangId, setOpenSlangId] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const arabicPhrases: SurvivalTip[] = [
    { id: '1', phrase: 'Marhaban (مرحباً)', meaning: 'Hello / Welcome', pronunciation: 'mar-ha-ban', context: 'Standard warm hello used everywhere. Extremely pleasant to state to taxi drivers or building receptionists.', category: 'arabic_101' },
    { id: '2', phrase: 'Shukran (شكراً)', meaning: 'Thank you', pronunciation: 'shook-ran', context: 'Sincere appreciation. Keep this handy in supermarkets, cafes, or after service encounters.', category: 'arabic_101' },
    { id: '3', phrase: 'Habibi / Habibti (حبيبي)', meaning: 'My Beloved / My Friend', pronunciation: 'ha-bee-bee (male) / ha-beeb-tee (female)', context: 'Informal friendly address. Do not use for formal or official authorities, but perfect for colleagues or shopkeepers.', category: 'arabic_101' },
    { id: '4', phrase: 'Yalla! (يلا)', meaning: 'Let’s go! / Hurry up!', pronunciation: 'yal-lah', context: 'Dynamic push. Frequently paired with "Habibi" ("Yalla Habibi!") when packing up or heading to a meeting.', category: 'arabic_101' },
    { id: '5', phrase: 'Inshallah (إن شاء الله)', meaning: 'If God wills / Hopefully', pronunciation: 'in-shal-lah', context: 'The universal reply for future plans (e.g., "See you on Sunday" - "Inshallah!"). Represents hopeful alignment.', category: 'arabic_101' },
    { id: '6', phrase: 'Ma’asalaamah (مع السلامة)', meaning: 'Goodbye / Go with peace', pronunciation: 'ma-as-sa-laa-mah', context: 'Standard departure statement to leave a warm final impression.', category: 'arabic_101' },
  ];

  const regulations = [
    { title: "Metro Fines & Chewing Gum", text: "Do NOT eat, drink, or chew gum inside any public transport. The fine for simple gum chewing on metro cars can be 100-200 AED! Always finish coffee outside the station gating.", icon: ShieldAlert, severity: "High Warning" },
    { title: "Public Displays of Affection", text: "Mild holding hands is generally fine in premium districts (Marina, Downtown), but avoid major kissing or physical intimacy in public squares to avoid offending families.", icon: Compass, severity: "Moderate Etiquette" },
    { title: "Working Week Configuration", text: "Dubai operates on a standard Monday - Friday corporate week. However, Friday represents a half-day or holy day where government offices often close at 12 PM. Sundays are full rest days.", icon: Award, severity: "Lifestyle Sync" },
    { title: "Photography Restraints", text: "Avoid taking direct clear pictures of local women or strangers without asking for verbal consent. Taking photos of government or restricted military sites carries strict penalties.", icon: ShieldAlert, severity: "High Warning" }
  ];

  const dubaiHacks = [
    { title: "The Silver vs Gold Nol Card Choice", text: "As a premier resident, secure the Gold Nol Card! It allows boarding the luxurious Gold Class front-cabin of the metro, giving beautiful panorama views and peaceful space during heavy peak crowd hours.", point: "Transit Hack" },
    { title: "Download the 'Careem' Super App", text: "Careem is the crucial lifeline for Dubai. Use it to hail 'Hala Taxis' (the local government public cabs which are significantly cheaper than VIP Limousines) and order quick takeout.", point: "Digital Lifeline" },
    { title: "Survive the Summer temperatures", text: "During the 45°C summer peaks (June-Sept), utilize the subterranean chilled walkway networks in Dubai Mall. Avoid standard outdoor walks from 11 AM to 4 PM. Shift grocery shopping to late evenings (10 PM - midnight, when shops are booming!).", point: "Heat Prep" },
    { title: "Explore Al-Karama & Old Deira", text: "For ultra-affordable luxury spices, specialized tailoring, and authentic Indian/Persian eateries, visit Old Dubai on a weekend afternoon. It has immense historic soul opposite modern glass towers.", point: "Cultural Gold" }
  ];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-[2rem] my-8 relative overflow-hidden" id="survival-guide-card">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full filter blur-2xl pointer-events-none" />
      
      {/* HEADER */}
      <div className="border-b border-white/10 pb-6 mb-6">
        <span className="text-xs font-mono tracking-widest text-[#a855f7] uppercase font-bold flex items-center gap-1.5 mb-1 animate-pulse">
          <BookOpen className="w-4 h-4 text-purple-400" /> Jumeirah Wisdoms
        </span>
        <h2 className="text-2xl font-display font-bold text-white">Anand Bro's Dubai Survival Deck</h2>
        <p className="text-xs text-zinc-400">Actionable local guidance, cultural rules, and Arabic lingo to thrive like a native citizen.</p>
      </div>

      {/* SWAPPING TABS */}
      <div className="flex gap-2.5 mb-8" id="guide-tabs">
        <button
          onClick={() => setActiveTab('arabic_101')}
          className={`px-4 py-2 rounded-2xl text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'arabic_101'
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
              : 'bg-white/[0.01] border-white/5 text-zinc-400 hover:bg-white/5'
          }`}
        >
          <span>🗣️ Arabic 101 Flip</span>
        </button>

        <button
          onClick={() => setActiveTab('laws_etiquette')}
          className={`px-4 py-2 rounded-2xl text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'laws_etiquette'
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
              : 'bg-white/[0.01] border-white/5 text-zinc-400 hover:bg-white/5'
          }`}
        >
          <span>⚖️ Laws & Etiquette</span>
        </button>

        <button
          onClick={() => setActiveTab('dubai_hacks')}
          className={`px-4 py-2 rounded-2xl text-xs font-mono transition-all border cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'dubai_hacks'
              ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
              : 'bg-white/[0.01] border-white/5 text-zinc-400 hover:bg-white/5'
          }`}
        >
          <span>💡 Citizen Hacks</span>
        </button>
      </div>

      {/* CONTENT DECKS */}
      <div id="guide-content" className="min-h-[280px]">
        
        {/* TAB 1: ARABIC 101 WORD CARD DECK */}
        {activeTab === 'arabic_101' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {arabicPhrases.map((slug) => {
              const isOpen = openSlangId === slug.id;
              return (
                <div 
                  key={slug.id}
                  onClick={() => setOpenSlangId(isOpen ? null : slug.id)}
                  className={`glass-panel p-5 rounded-2xl cursor-pointer select-none transition-all duration-300 border h-[150px] flex flex-col justify-between overflow-hidden relative group ${
                    isOpen 
                      ? 'border-purple-500/50 bg-purple-500/5 shadow-[0_0_20px_rgba(168,85,247,0.1)]' 
                      : 'border-white/5 hover:border-purple-500/20 hover:bg-white/[0.03]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {!isOpen ? (
                      <motion.div
                        key="front"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-xl font-display font-bold text-white group-hover:text-purple-300 transition-colors">
                            {slug.phrase}
                          </span>
                          <span className="text-[10px] font-mono block text-purple-400 mt-1 uppercase tracking-widest">
                            Pronunciation: {slug.pronunciation}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 block text-right mt-2">
                          Click to Flip ↺
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="back"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-xs font-mono uppercase tracking-widest text-[#a855f7] block font-bold">Meaning: {slug.meaning}</span>
                          <p className="text-xs text-zinc-300 leading-relaxed mt-2.5">
                            {slug.context}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-purple-400 block text-right font-medium">
                          Active Flip
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: LAW & ETIQUETTE ADVICE */}
        {activeTab === 'laws_etiquette' && (
          <div className="space-y-3.5">
            {regulations.map((item, index) => {
              const isFaqOpen = expandedFAQ === index;
              return (
                <div 
                  key={index}
                  className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                >
                  <button 
                    onClick={() => setExpandedFAQ(isFaqOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left cursor-pointer text-white"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`p-2 rounded-xl ${item.severity.includes('High') ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        <item.icon className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="text-sm font-medium tracking-wide block">{item.title}</span>
                        <span className={`text-[10px] font-mono ${item.severity.includes('High') ? 'text-red-400' : 'text-amber-400'}`}>
                          {item.severity}
                        </span>
                      </div>
                    </div>
                    {isFaqOpen ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                  </button>

                  <AnimatePresence>
                    {isFaqOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-3 pl-12 border-l border-white/5"
                      >
                        <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                          {item.text}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: HACKS */}
        {activeTab === 'dubai_hacks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dubaiHacks.map((hack, id) => (
              <motion.div
                key={id} 
                whileHover={{ scale: 1.01 }}
                className="glass-panel p-5 rounded-2xl border border-white/5 relative flex flex-col justify-between"
              >
                <div className="absolute top-3 right-3 shrink-0">
                  <span className="font-mono text-[9px] font-extrabold text-[#a855f7] bg-purple-500/10 px-2.5 py-1 rounded-full uppercase tracking-widest">
                    {hack.point}
                  </span>
                </div>

                <div className="pr-12">
                  <span className="text-sm font-semibold text-white tracking-wide block mb-2">{hack.title}</span>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {hack.text}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 pt-3 border-t border-white/5 text-[10px] text-emerald-400 font-mono">
                  <CheckCircle className="w-3.5 h-3.5" /> High Impact Hack
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
