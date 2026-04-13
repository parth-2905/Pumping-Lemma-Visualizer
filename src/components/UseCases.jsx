import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookMarked, Eye, Lightbulb, Trophy, Code2, ChevronLeft, ChevronRight } from 'lucide-react';

const useCases = [
  {
    icon: GraduationCap,
    title: 'Automata Theory Students',
    description: 'Struggling with formal proofs? Visualize every step and build powerful intuition for regular versus non-regular languages.',
    color: '#3b82f6', // Bright Blue
    gradient: 'linear-gradient(180deg, #1e3a8a 0%, #172554 100%)',
    tag: 'STUDENT LEARNING',
  },
  {
    icon: BookMarked,
    title: 'Exam Preparation',
    description: 'Practice the strict pumping lemma proof structure with instant feedback on all your decomposition attempts.',
    color: '#f97316', // Orange
    gradient: 'linear-gradient(180deg, #7c2d12 0%, #431407 100%)',
    tag: 'PRACTICE TOOL',
  },
  {
    icon: Eye,
    title: 'Visual Learners',
    description: 'Abstract string theory becomes concrete. Watch complex repetition logic transform into smoothly animated visual layouts.',
    color: '#8b5cf6', // Purple
    gradient: 'linear-gradient(180deg, #4c1d95 0%, #2e1065 100%)',
    tag: 'ANIMATION',
  },
  {
    icon: Lightbulb,
    title: 'Curious Minds',
    description: 'Explore the fundamental limits of computation. Discover exactly what patterns a finite automaton inherently cannot recognize.',
    color: '#10b981', // Emerald
    gradient: 'linear-gradient(180deg, #065f46 0%, #022c22 100%)',
    tag: 'EXPLORATION',
  },
  {
    icon: Trophy,
    title: 'Teaching & Demos',
    description: 'Professors and TAs can use this as a live classroom tool to interactively map strict formal proofs.',
    color: '#ec4899', // Pink
    gradient: 'linear-gradient(180deg, #831843 0%, #4c0519 100%)',
    tag: 'CLASSROOM',
  },
  {
    icon: Code2,
    title: 'CS Researchers',
    description: 'Quickly test whether a language is potentially non-regular before dedicating hours to writing exhaustive formal proofs.',
    color: '#eab308', // Yellow
    gradient: 'linear-gradient(180deg, #713f12 0%, #422006 100%)',
    tag: 'COMPUTATION',
  },
];

export default function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % useCases.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };
  
  return (
    <section id="usecases" className="section" style={{ position: 'relative', overflow: 'hidden', padding: '120px 0', background: '#02060A' }}>
      
      {/* Dynamic Background Fog mapped to current card */}
      <motion.div 
        animate={{ background: `radial-gradient(ellipse at 70% 50%, ${useCases[activeIndex].color}15 0%, transparent 60%)` }}
        transition={{ duration: 1 }}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1300 }}>
         
         <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', 
            gap: 60,
            alignItems: 'center',
         }}>
            <style>{`
              @media (max-width: 900px) {
                #usecases .container > div {
                   grid-template-columns: 1fr !important;
                   text-align: center;
                   gap: 40px !important;
                }
                .usecases-controls {
                   justify-content: center;
                }
                .usecases-poster {
                   height: 400px !important;
                }
              }
            `}</style>
            
            {/* LEFT COLUMN: Stacked Poster Cards */}
            <div style={{ position: 'relative', height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="usecases-poster">
               
               <AnimatePresence>
                 {useCases.map((uc, i) => {
                    const delta = i - activeIndex;

                    // Hide completely passed cards or deeply buried cards
                    if (delta < 0 || delta > 3) return null;

                    // Calculate 3D stacking physics mimicking RefractWeb
                    const scale = 1 - delta * 0.06;
                    const yOffset = delta * 15; 
                    const xOffset = -delta * 10;
                    const rotate = delta === 0 ? 0 : delta % 2 === 0 ? delta * 2 : -delta * 2.5;
                    const zIndex = 10 - delta;
                    const opacity = 1 - delta * 0.2;

                    return (
                       <motion.div
                         key={uc.title}
                         initial={{ opacity: 0, y: 100, x: 50, scale: 0.8 }}
                         animate={{ opacity, y: yOffset, x: xOffset, scale, rotate, zIndex }}
                         exit={{ opacity: 0, y: -60, x: -60, scale: 1.1, rotate: -10 }}
                         transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                         onClick={() => setActiveIndex(i)}
                         style={{
                            position: 'absolute',
                            width: '90%',
                            maxWidth: 440,
                            height: '100%',
                            maxHeight: 560,
                            background: uc.gradient,
                            borderRadius: 24,
                            boxShadow: delta === 0 
                               ? `0 30px 60px ${uc.color}30, 0 0 0 1px rgba(255,255,255,0.15), inset 0 20px 40px rgba(255,255,255,0.05)` 
                               : '0 10px 30px rgba(0,0,0,0.6), inset 0 10px 20px rgba(255,255,255,0.02)',
                            padding: 40,
                            display: 'flex',
                            flexDirection: 'column',
                            color: '#fff',
                            cursor: delta === 0 ? 'default' : 'pointer',
                            overflow: 'hidden',
                            transformOrigin: 'bottom center'
                         }}
                       >
                         {/* Header internal design */}
                         <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.7)' }}>
                               DESIGNED FOR:<br/>
                               <span style={{ color: '#fff' }}>VISUAL LEARNER</span>
                            </div>
                            <div style={{ padding: 12, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)' }}>
                               <uc.icon size={20} color={uc.color} />
                            </div>
                         </div>

                         {/* Huge Abstract Center Graphic */}
                         <div style={{ 
                            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                            opacity: 0.9, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))'
                         }}>
                            <uc.icon size={220} strokeWidth={1} color="#ffffff" style={{ opacity: 0.8 }} />
                         </div>

                         {/* Bottom Internal Text */}
                         <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', color: uc.color, marginBottom: 8, textTransform: 'uppercase' }}>
                               {uc.tag}
                            </div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                               {uc.title}
                            </div>
                         </div>
                       </motion.div>
                    );
                 })}
               </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: Dynamic Typography & Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               
               <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                     <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.15em', color: '#3b82f6', textTransform: 'uppercase' }}>
                           LEARNER PROFILE
                        </span>
                        <span style={{ fontSize: '0.65rem', color: '#52525b', fontWeight: 700, padding: '4px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 20 }}>
                           {useCases[activeIndex].tag}
                        </span>
                     </div>
                     
                     <h2 style={{ fontSize: 'clamp(3rem, 4vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#fff', marginBottom: 20 }}>
                        {useCases[activeIndex].title}
                     </h2>
                     
                     <p style={{ fontSize: '0.95rem', color: '#a1a1aa', lineHeight: 1.6, maxWidth: 460, marginBottom: 40 }}>
                        {useCases[activeIndex].description}
                     </p>
                  </motion.div>
               </AnimatePresence>

               {/* Custom Pagination Tracker - Exact Dashboard Spec */}
               <div className="usecases-controls" style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 40 }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                     {useCases.map((_, idx) => (
                        <div 
                           key={idx}
                           onClick={() => setActiveIndex(idx)}
                           style={{ 
                              width: idx === activeIndex ? 30 : 16, 
                              height: 2, 
                              background: idx === activeIndex ? '#3b82f6' : '#27272a', /* Dashboard strict colors */
                              borderRadius: 4,
                              cursor: 'pointer',
                              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                           }}
                        />
                     ))}
                  </div>
                   <div style={{ fontSize: '0.75rem', color: '#52525b', fontWeight: 600, letterSpacing: '0.1em' }}>
                      0{activeIndex + 1} / 0{useCases.length}
                   </div>

                   {/* Navigation Buttons */}
                   <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
                      <motion.button
                         whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.06)' }}
                         whileTap={{ scale: 0.9 }}
                         onClick={goPrev}
                         style={{
                            width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)',
                            background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'border-color 0.2s'
                         }}
                         aria-label="Previous profile"
                      >
                         <ChevronLeft size={18} />
                      </motion.button>
                      <motion.button
                         whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.06)' }}
                         whileTap={{ scale: 0.9 }}
                         onClick={goNext}
                         style={{
                            width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)',
                            background: 'transparent', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'border-color 0.2s'
                         }}
                         aria-label="Next profile"
                      >
                         <ChevronRight size={18} />
                      </motion.button>
                   </div>
                </div>

            </div>

         </div>
      </div>
    </section>
  );
}
