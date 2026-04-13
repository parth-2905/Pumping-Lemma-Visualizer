import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const techStack = [
  { name: 'React 19', description: 'UI Framework', color: '#61dafb', symbol: '⚛' },
  { name: 'Vite 8', description: 'Build Tool', color: '#a259ff', symbol: '⚡' },
  { name: 'Framer Motion', description: 'Animations', color: '#ff6b6b', symbol: '◐' },
  { name: 'Tailwind CSS', description: 'Styling', color: '#38bdf8', symbol: '🎨' },
  { name: 'Lucide Icons', description: 'Iconography', color: '#F59768', symbol: '◈' },
  { name: 'Pure JS Logic', description: 'Lemma Engine', color: '#4ade80', symbol: '∑' },
];

export function TechStack() {
  return (
    <section id="techstack" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span className="badge badge-blue" style={{ marginBottom: 16, display: 'inline-flex' }}>
            Tech Stack
          </span>
          <h2 style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
            fontWeight: 800, letterSpacing: '-0.03em',
          }}>
            Built with <span className="gradient-text-blue">Modern Tools</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: 16,
        }}>
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glow-card"
              style={{ padding: 24, textAlign: 'center' }}
            >
              <div style={{
                fontSize: '2rem', marginBottom: 12,
                filter: `drop-shadow(0 0 8px ${tech.color}60)`,
              }}>
                {tech.symbol}
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: tech.color, marginBottom: 4 }}>
                {tech.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {tech.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '56px 0 40px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 48,
          marginBottom: 48,
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: 'linear-gradient(135deg, #F59768, #C4734D)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 16px rgba(245,151,104,0.4)',
              }}>
                <Zap size={18} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#f1f5f9' }}>
                Pumping<span className="gradient-text-orange">Lemma</span>
              </span>
            </div>
            <p style={{
              color: 'var(--text-muted)', fontSize: '0.88rem',
              lineHeight: 1.75, maxWidth: 300,
            }}>
              An interactive educational tool for understanding the Pumping Lemma for Regular Languages in automata theory.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: 16, color: '#f1f5f9', fontSize: '0.9rem' }}>
              Navigate
            </h4>
            {['Features', 'Demo Tool', 'Concepts', 'Use Cases'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '')}`}
                style={{
                  display: 'block', color: 'var(--text-muted)',
                  textDecoration: 'none', fontSize: '0.875rem',
                  marginBottom: 10, transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = '#F59768'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >
                {link}
              </a>
            ))}
          </div>

        </div>

        {/* Footer content removed */}
      </div>
    </footer>
  );
}
