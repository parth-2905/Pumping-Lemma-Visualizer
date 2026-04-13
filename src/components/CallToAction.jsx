import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Rocket } from 'lucide-react';

export default function CallToAction() {
  return (
    <section id="cta" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            borderRadius: 28,
            padding: 'clamp(48px, 8vw, 88px) clamp(32px, 6vw, 80px)',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(59,130,246,0.08) 50%, rgba(139,92,246,0.1) 100%)',
            border: '1px solid rgba(249,115,22,0.2)',
            textAlign: 'center',
          }}
        >
          {/* Decorative glows */}
          <div style={{
            position: 'absolute', width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)',
            top: '-100px', left: '-60px',
            pointerEvents: 'none', filter: 'blur(30px)',
          }} />
          <div style={{
            position: 'absolute', width: 400, height: 400, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            bottom: '-100px', right: '-60px',
            pointerEvents: 'none', filter: 'blur(30px)',
          }} />

          {/* Grid overlay */}
          <div className="grid-dots" style={{
            position: 'absolute', inset: 0, opacity: 0.3, borderRadius: 28, pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="badge badge-orange" style={{ marginBottom: 24, display: 'inline-flex' }}>
                <Rocket size={12} />
                Ready to Learn?
              </span>
            </motion.div>

            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              marginBottom: 20,
              lineHeight: 1.1,
            }}>
              Ready to <span className="gradient-text-orange">Master</span> Automata?
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              maxWidth: 500,
              margin: '0 auto 40px',
              lineHeight: 1.75,
            }}>
              Join thousands of students who have made the leap from confusion to clarity with our interactive tool.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a
                href="#demo"
                className="btn-primary"
                id="cta-launch-tool"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ fontSize: '1rem', padding: '16px 32px' }}
              >
                <Rocket size={18} /> Launch Tool
              </motion.a>
              <motion.a
                href="#concepts"
                className="btn-secondary"
                id="cta-view-examples"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ fontSize: '1rem', padding: '16px 32px' }}
              >
                <BookOpen size={18} /> View Examples
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
