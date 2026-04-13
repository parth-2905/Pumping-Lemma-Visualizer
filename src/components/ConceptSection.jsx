import { motion } from 'framer-motion';
import { HelpCircle, Target, Sigma, Code2 } from 'lucide-react';

export default function ConceptSection() {
  return (
    <section id="concepts" className="section" style={{ position: 'relative' }}>
      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .bento-card {
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(255,255,255,0.04);
        }
        .bento-span-2 {
          grid-column: span 2;
        }
        .bento-row-2 {
          grid-row: span 2;
        }
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          .bento-span-2 {
            grid-column: span 1;
          }
          .bento-row-2 {
            grid-row: span 1;
          }
        }
      `}</style>
      <div style={{
        position: 'absolute', width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,151,104,0.06) 0%, transparent 70%)',
        bottom: 0, left: '-20%', pointerEvents: 'none', filter: 'blur(50px)',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          {/* Theory badge removed */}
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Understanding the <span className="gradient-text-orange">Pumping Lemma</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
            A rigorous yet approachable breakdown of the theorem, its proof strategy, and its limitations.
          </p>
        </motion.div>

        {/* BENTO GRID */}
        <div className="bento-grid">
          
          {/* Card 1: What is the Pumping Lemma? (Span 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bento-card bento-span-2"
            style={{ 
              background: 'linear-gradient(135deg, #0F172A 0%, #020617 100%)', 
              padding: '40px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 24
            }}
          >
            <div style={{ flex: '1 1 300px' }}>
              <HelpCircle size={28} color="#3b82f6" style={{ marginBottom: 20 }} />
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#f8fafc', marginBottom: 16 }}>
                What Is the Pumping Lemma?
              </h3>
              <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>
                The <strong style={{color:'#fff'}}>Pumping Lemma</strong> is a fundamental theorem used to prove that certain languages are <em>not</em> regular. It establishes that any sufficiently long string in a regular language can be heavily "pumped" (repeated) in its middle section and still remain valid.
              </p>
            </div>
            <div style={{ width: 160, height: 160, background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(59,130,246,0.1)', borderRadius: '50%' }}>
               <div style={{ width: 80, height: 80, border: '2px dashed rgba(59,130,246,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4 }}>
                  <div style={{ color: '#3b82f6', fontWeight: 800, fontSize: '1.2rem' }}>xyz</div>
               </div>
            </div>
          </motion.div>

          {/* Card 2: Formal Definition (Vertical Span 2) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="bento-card bento-row-2"
            style={{ 
              background: 'linear-gradient(180deg, #2D1A16 0%, #150D0B 100%)', 
              padding: '40px', display: 'flex', flexDirection: 'column', border: '1px solid rgba(249,115,22,0.1)'
            }}
          >
            <div style={{ flex: 1 }}>
              <Sigma size={28} color="#f97316" style={{ marginBottom: 20 }} />
              <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                Formal Definition
              </h3>
              <p style={{ color: '#fed7aa', opacity: 0.8, lineHeight: 1.7, fontSize: '0.9rem', marginBottom: 32 }}>
                If L is a regular language, then ∃ p ≥ 1 such that ∀ s ∈ L with |s| ≥ p, ∃ x, y, z with s = xyz such that:
              </p>
            </div>
            
            {/* Logic Box Grid */}
            <div style={{ display: 'flex', gap: 12 }}>
               <div style={{ background: 'rgba(249,115,22,0.1)', padding: '16px', borderRadius: 12, flex: 1, textAlign: 'center', border: '1px solid rgba(249,115,22,0.2)' }}>
                  <div style={{ color: '#fdba74', fontWeight: 800, fontSize: '1.1rem', marginBottom: 4 }}>|xy| ≤ p</div>
                  <div style={{ fontSize: '0.7rem', color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Limit</div>
               </div>
               <div style={{ background: 'rgba(249,115,22,0.1)', padding: '16px', borderRadius: 12, flex: 1, textAlign: 'center', border: '1px solid rgba(249,115,22,0.2)' }}>
                  <div style={{ color: '#fdba74', fontWeight: 800, fontSize: '1.1rem', marginBottom: 4 }}>|y| ≥ 1</div>
                  <div style={{ fontSize: '0.7rem', color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Non-empty</div>
               </div>
            </div>
            <div style={{ background: 'rgba(249,115,22,0.05)', padding: '16px', borderRadius: 12, marginTop: 12, textAlign: 'center', border: '1px solid rgba(249,115,22,0.15)' }}>
               <div style={{ color: '#fdba74', fontWeight: 800, fontSize: '1rem', marginBottom: 4 }}>∀ i ≥ 0 : xyⁱz ∈ L</div>
               <div style={{ fontSize: '0.7rem', color: '#fb923c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pumped string remains valid</div>
            </div>
          </motion.div>

          {/* Card 3: When Does It Fail? (IDE Code Block) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="bento-card"
            style={{ 
              background: '#0B0D14', 
              padding: '32px', display: 'flex', flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
               <Code2 size={24} color="#8b5cf6" />
               <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f1f5f9' }}>Proof Strategy</h3>
            </div>
            <div style={{ 
               background: '#07080A', borderRadius: 12, padding: '20px', 
               fontFamily: 'monospace', fontSize: '0.8rem', lineHeight: 1.8,
               border: '1px solid rgba(139,92,246,0.15)', flex: 1, position: 'relative', overflow: 'hidden'
            }}>
               <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at bottom right, rgba(139,92,246,0.1), transparent)', pointerEvents: 'none' }} />
               <div style={{ color: '#64748b' }}>1 &nbsp;&nbsp;<span style={{ color: '#c6a0f6' }}>async function</span> <span style={{ color: '#8b5cf6' }}>disproveRegular</span>(L) {'{'}</div>
               <div style={{ color: '#64748b' }}>2 &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#c6a0f6' }}>const</span> p = <span style={{ color: '#8b5cf6' }}>assumeRegular</span>(L);</div>
               <div style={{ color: '#64748b' }}>3 &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#c6a0f6' }}>const</span> s = <span style={{ color: '#8b5cf6' }}>selectString</span>(p);</div>
               <div style={{ color: '#64748b' }}>4 </div>
               <div style={{ color: '#64748b' }}>5 &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#f97316' }}>for every</span> (xyz <span style={{ color: '#f97316' }}>of</span> s) {'{'}</div>
               <div style={{ color: '#64748b' }}>6 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#c6a0f6' }}>const</span> i = <span style={{ color: '#8b5cf6' }}>findInvalidPump</span>();</div>
               <div style={{ color: '#64748b' }}>7 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#f97316' }}>if</span> (xyⁱz ∉ L) <span style={{ color: '#ef4444' }}>return</span> <span style={{ color: '#facc15' }}>true</span>;</div>
               <div style={{ color: '#64748b' }}>8 &nbsp;&nbsp;&nbsp;&nbsp;{'}'}</div>
               <div style={{ color: '#64748b' }}>9 &nbsp;&nbsp;{'}'}</div>
            </div>
          </motion.div>

          {/* Card 4: Why Does It Matter? */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="bento-card"
            style={{ 
              background: 'linear-gradient(135deg, #1C1C22 0%, #13151A 100%)', 
              padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative'
            }}
          >
            <div style={{ 
               position: 'absolute', right: '-15%', bottom: '-25%', 
               fontSize: '200px', fontWeight: 900, 
               color: 'rgba(255,255,255,0.02)', lineHeight: 1, pointerEvents: 'none' 
            }}>M</div>
            
            <div style={{ zIndex: 1, textAlign: 'center' }}>
               <Target size={32} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
               <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#E6E6E6', marginBottom: 12, lineHeight: 1.2 }}>
                  Finite Memory Limit
               </h3>
               <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  Automata cannot count arbitrarily. If a language demands infinite memory configuration, it fails the lemma.
               </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
