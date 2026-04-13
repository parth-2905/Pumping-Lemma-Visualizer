import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Features() {
   const trackRef = useRef(null);
   const [scrollProgress, setScrollProgress] = useState(0);

   // Monitor scroll physics to update exactly matching the image's bottom progress bar
   const handleScroll = () => {
      if (trackRef.current) {
         const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
         const maxScroll = scrollWidth - clientWidth;
         if (maxScroll > 0) {
            setScrollProgress((scrollLeft / maxScroll) * 100);
         } else {
            setScrollProgress(0);
         }
      }
   };

   useEffect(() => {
      handleScroll(); // Initialize
      window.addEventListener('resize', handleScroll);
      return () => window.removeEventListener('resize', handleScroll);
   }, []);

   const scrollByAmount = (amount) => {
      if (trackRef.current) {
         trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      }
   };

   return (
      <section id="features" className="section" style={{ background: '#02060A', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>

         <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 5%', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#f1f5f9', marginBottom: 60, letterSpacing: '-0.03em' }}>
               Everything You Need to <span className="gradient-text-orange">Master</span> the Lemma
            </h2>
         </div>

         {/* HORIZONTAL CAROUSEL TRACK (Strict 3-Card Bound) */}
         <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 5%' }}>
            <div
               ref={trackRef}
               onScroll={handleScroll}
               className="carousel-hide-scroll"
               style={{
                  display: 'flex',
                  gap: 32,
                  paddingBottom: '40px',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',   /* Firefox */
                  msOverflowStyle: 'none',  /* IE */
                  WebkitOverflowScrolling: 'touch',
               }}
            >
               <style>{`
            .carousel-hide-scroll::-webkit-scrollbar { display: none; }
            .feature-card {
              scroll-snap-align: start;
              flex: 0 0 calc((100% - 64px) / 3);
              display: flex;
              flex-direction: column;
              gap: 24px;
              cursor: grab;
            }
            @media (max-width: 1100px) {
              .feature-card { flex: 0 0 calc((100% - 32px) / 2); }
            }
            @media (max-width: 768px) {
              .feature-card { flex: 0 0 100%; }
            }
          `}</style>

               {/* --- CARD 1: String Decomposition (Aether style) --- */}
               <div className="feature-card">
                  <div style={{
                     height: 440, borderRadius: 24, overflow: 'hidden', position: 'relative',
                     background: '#FDFDFD', display: 'flex', flexDirection: 'column'
                  }}>
                     <div style={{ padding: '40px 40px 0', flex: 1, zIndex: 1, color: '#111827' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: 40, color: '#6b7280' }}>
                           <span>Architecture</span>
                           <span>Decomposition</span>
                        </div>
                        <h3 style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.4rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.04em' }}>
                           Grammar That<br />Inspires<br />& Restricts
                        </h3>
                     </div>
                     <div style={{
                        height: '60%', width: '100%', position: 'absolute', bottom: -50,
                        background: 'linear-gradient(180deg, rgba(236,72,153,0) 0%, rgba(244,114,182,0.6) 100%)',
                        filter: 'blur(10px)', transform: 'scale(1.1)'
                     }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
                     <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 12 }}>
                           String Decomposition
                        </h4>
                        <p style={{ color: '#888C95', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 360 }}>
                           Input any string and language definition. The computational engine automatically isolates structural segments satisfying global constraints.
                        </p>
                     </div>
                     <div style={{ fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginTop: 4 }}>
                        Core Feature
                     </div>
                  </div>
               </div>

               {/* --- CARD 2: Pumping Visualizer (Sentinel style) --- */}
               <div className="feature-card">
                  <div style={{
                     height: 440, borderRadius: 24, overflow: 'hidden', position: 'relative',
                     background: '#131416', border: '1px solid rgba(255,255,255,0.03)', display: 'flex', flexDirection: 'column'
                  }}>
                     <div style={{ padding: '40px', flex: 1, zIndex: 1, color: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.04em' }}>
                           <span style={{ color: '#38bdf8' }}>∑</span> Automata
                        </div>
                        <div style={{ display: 'flex', gap: 12 }}>
                           <div style={{ width: 8, height: 8, background: '#fff', borderRadius: '50%' }} />
                           <div style={{ width: 8, height: 8, background: '#fff', borderRadius: '50%' }} />
                           <div style={{ width: 8, height: 8, background: '#fff', borderRadius: '50%' }} />
                        </div>
                     </div>

                     <div style={{ padding: '0 40px 40px', display: 'flex', gap: 40, alignItems: 'flex-end', justifyContent: 'space-between' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.5, letterSpacing: '-0.02em' }}>
                           Structural Growth.<br />Visual Iteration.<br />Dynamic Injection.<br />String Transformation.
                        </div>
                        <div style={{
                           width: 140, height: 140, flexShrink: 0,
                           background: 'linear-gradient(45deg, #1e293b, #0f172a)',
                           display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 4, padding: 4,
                           borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden'
                        }}>
                           <div style={{ background: '#334155', borderRadius: 6, gridColumn: 'span 2' }}></div>
                           <div style={{ background: '#334155', borderRadius: 6 }}></div>
                           <div style={{ background: '#334155', borderRadius: 6, opacity: 0.5 }}></div>
                        </div>
                     </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
                     <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 12 }}>
                           Pump Animator
                        </h4>
                        <p style={{ color: '#888C95', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 360 }}>
                           Watch the infinite injection loop in real-time. Drag the iteration index to witness mathematically precise string distortion logic.
                        </p>
                     </div>
                     <div style={{ fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginTop: 4 }}>
                        Animation
                     </div>
                  </div>
               </div>

               {/* --- CARD 3: Language Validation (Cortex style) --- */}
               <div className="feature-card">
                  <div style={{
                     height: 440, borderRadius: 24, overflow: 'hidden', position: 'relative',
                     background: '#0B0706', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(255,255,255,0.02)'
                  }}>
                     <div style={{ padding: '60px 40px 0', textAlign: 'center', zIndex: 1, color: '#f8fafc' }}>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 16 }}>
                           Regularity,<br />Validated via Engine
                        </h3>
                        <p style={{ color: '#a8a29e', fontSize: '0.8rem', maxWidth: 280, margin: '0 auto', lineHeight: 1.6 }}>
                           We verify structural logic infinitely. Unmask non-regularity with a hyper-fast boolean evaluator.
                        </p>
                     </div>

                     {/* Glowing Orb imitating the 3D donut */}
                     <div style={{
                        position: 'absolute', bottom: -60,
                        width: 320, height: 320, borderRadius: '50%',
                        background: 'radial-gradient(circle at 35% 35%, #fed7aa 0%, #f97316 20%, #ea580c 45%, rgba(120,20,20,0.9) 80%, #000 100%)',
                        boxShadow: '0 20px 80px rgba(249,115,22,0.3)',
                        border: '1px solid rgba(255,255,255,0.05)',
                     }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
                     <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 12 }}>
                           Rule Validator
                        </h4>
                        <p style={{ color: '#888C95', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 360 }}>
                           Every augmented string undergoes rigorous engine scrutiny. Identify strictly where structural constraints crack under iteration.
                        </p>
                     </div>
                     <div style={{ fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginTop: 4 }}>
                        Smart Check
                     </div>
                  </div>
               </div>

               {/* --- CARD 4: Educational Walkthrough --- */}
               <div className="feature-card">
                  <div style={{
                     height: 440, borderRadius: 24, overflow: 'hidden', position: 'relative',
                     background: '#041727', border: '1px solid rgba(6,182,212,0.1)', display: 'flex', flexDirection: 'column'
                  }}>
                     <div style={{ padding: '50px 40px', flex: 1, zIndex: 1, color: '#f8fafc' }}>
                        <div style={{ display: 'inline-flex', padding: '6px 14px', borderRadius: 20, border: '1px solid rgba(6,182,212,0.3)', color: '#22d3ee', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: 32 }}>
                           THEORY SYSTEM
                        </div>
                        <h3 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                           A Guiding Light<br />For Contradiction
                        </h3>
                     </div>
                     <div style={{
                        position: 'absolute', bottom: -50, right: -50,
                        width: 300, height: 300, background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 60%)',
                        border: '1px dashed rgba(6,182,212,0.1)', borderRadius: '50%'
                     }} />
                     <div style={{
                        position: 'absolute', bottom: 20, right: 20,
                        width: 200, height: 200, background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
                        border: '1px dashed rgba(6,182,212,0.2)', borderRadius: '50%'
                     }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
                     <div style={{ flex: 1 }}>
                        <h4 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 12 }}>
                           Proof Explanation
                        </h4>
                        <p style={{ color: '#888C95', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 360 }}>
                           Follow the complete contradiction walkthrough. Each mathematical boundary is annotated with strict beginner-friendly guidance.
                        </p>
                     </div>
                     <div style={{ fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginTop: 4 }}>
                        Education
                     </div>
                  </div>
               </div>

            </div> {/* End of Track Container */}
         </div> {/* End of Carousel Bound Wrapper */}

         {/* BOTTOM NAVIGATION FOOTER */}
         <div style={{ maxWidth: 1400, margin: '0 auto', padding: '10px 5% 0', display: 'flex', alignItems: 'center', gap: 40 }}>
            {/* Custom Progress Bar */}
            <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.08)', position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
               <motion.div
                  style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: '#F59768', borderRadius: 4 }}
                  animate={{ width: `${Math.max(2, scrollProgress)}%` }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
               />
            </div>
            {/* Circular Chevron Controls */}
            <div style={{ display: 'flex', gap: 16 }}>
               <button
                  onClick={() => scrollByAmount(-800)}
                  style={{
                     width: 46, height: 46, borderRadius: '50%', background: '#131416',
                     border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                     cursor: 'pointer', transition: 'all 0.2s', outline: 'none'
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#222429'}
                  onMouseOut={e => e.currentTarget.style.background = '#131416'}
                  aria-label="Previous Project"
               >
                  <ChevronLeft size={20} color="#f8fafc" />
               </button>
               <button
                  onClick={() => scrollByAmount(800)}
                  style={{
                     width: 46, height: 46, borderRadius: '50%', background: '#131416',
                     border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                     cursor: 'pointer', transition: 'all 0.2s', outline: 'none'
                  }}
                  onMouseOver={e => e.currentTarget.style.background = '#222429'}
                  onMouseOut={e => e.currentTarget.style.background = '#131416'}
                  aria-label="Next Project"
               >
                  <ChevronRight size={20} color="#f8fafc" />
               </button>
            </div>
         </div>

      </section>
   );
}
