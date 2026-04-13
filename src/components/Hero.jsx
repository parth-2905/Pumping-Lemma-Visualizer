import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Cpu, Layers, Binary } from 'lucide-react';

// -------- Animated Circuit Chip Visual ----------
function ChipVisual() {
  return (
    <div style={{ position: 'relative', width: 420, height: 420, maxWidth: '100%' }} className="float">
      {/* Outer ring */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: '50%',
        border: '1px solid rgba(245,151,104,0.15)',
        animation: 'spin-slow 20s linear infinite',
      }} />
      <div style={{
        position: 'absolute', inset: 20, borderRadius: '50%',
        border: '1px dashed rgba(59,130,246,0.2)',
        animation: 'spin-slow 14s linear infinite reverse',
      }} />

      {/* Center chip */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 200, height: 200,
        borderRadius: 28,
        background: 'linear-gradient(145deg, rgba(15,23,42,0.9), rgba(5,10,25,0.95))',
        border: '2px solid rgba(245,151,104,0.4)',
        boxShadow: '0 0 80px rgba(245,151,104,0.2), inset 0 0 40px rgba(245,151,104,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 8,
      }}>
        {/* Grid pattern inside chip */}
        <svg width="160" height="160" viewBox="0 0 160 160" style={{ position: 'absolute', opacity: 0.25 }}>
          {Array.from({ length: 5 }).map((_, i) =>
            Array.from({ length: 5 }).map((_, j) => (
              <rect
                key={`${i}-${j}`}
                x={16 + j * 26}
                y={16 + i * 26}
                width={18}
                height={18}
                rx={3}
                fill="rgba(245,151,104,0.5)"
              />
            ))
          )}
          {/* Cross lines */}
          <line x1="80" y1="10" x2="80" y2="150" stroke="rgba(245,151,104,0.4)" strokeWidth="1" />
          <line x1="10" y1="80" x2="150" y2="80" stroke="rgba(245,151,104,0.4)" strokeWidth="1" />
        </svg>

        <Cpu size={40} color="#F59768" style={{ filter: 'drop-shadow(0 0 12px rgba(245,151,104,0.8))' }} />
        <span style={{
          fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
          color: 'rgba(245,151,104,0.9)', textTransform: 'uppercase',
        }}>TAFL Engine</span>
      </div>

      {/* Circuit traces */}
      <svg style={{ position: 'absolute', inset: 0 }} width="420" height="420" viewBox="0 0 420 420">
        {/* Trace lines */}
        <path d="M210 50 L210 110" stroke="rgba(245,151,104,0.5)" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="60" strokeDashoffset="0"
          style={{ animation: 'circuit-trace 3s ease-in-out infinite' }} />
        <path d="M210 370 L210 310" stroke="rgba(245,151,104,0.5)" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="60" strokeDashoffset="0"
          style={{ animation: 'circuit-trace 3s ease-in-out 0.5s infinite' }} />
        <path d="M50 210 L110 210" stroke="rgba(59,130,246,0.5)" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="60" strokeDashoffset="0"
          style={{ animation: 'circuit-trace 3s ease-in-out 1s infinite' }} />
        <path d="M370 210 L310 210" stroke="rgba(59,130,246,0.5)" strokeWidth="2" strokeLinecap="round"
          strokeDasharray="60" strokeDashoffset="0"
          style={{ animation: 'circuit-trace 3s ease-in-out 1.5s infinite' }} />
        {/* Diagonal traces */}
        <path d="M90 90 L155 155" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray="90" strokeDashoffset="90"
          style={{ animation: 'circuit-trace 4s ease-in-out 0.3s infinite' }} />
        <path d="M330 90 L265 155" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray="90" strokeDashoffset="90"
          style={{ animation: 'circuit-trace 4s ease-in-out 0.8s infinite' }} />
        <path d="M90 330 L155 265" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray="90" strokeDashoffset="90"
          style={{ animation: 'circuit-trace 4s ease-in-out 1.3s infinite' }} />
        <path d="M330 330 L265 265" stroke="rgba(6,182,212,0.4)" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray="90" strokeDashoffset="90"
          style={{ animation: 'circuit-trace 4s ease-in-out 1.8s infinite' }} />
      </svg>

      {/* Corner nodes */}
      {[
        { top: 30, left: 190, color: '#F59768' },
        { bottom: 30, left: 190, color: '#F59768' },
        { top: 190, left: 30, color: '#3b82f6' },
        { top: 190, right: 30, color: '#3b82f6' },
        { top: 68, left: 68, color: '#8b5cf6' },
        { top: 68, right: 68, color: '#8b5cf6' },
        { bottom: 68, left: 68, color: '#06b6d4' },
        { bottom: 68, right: 68, color: '#06b6d4' },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 10, height: 10,
            borderRadius: '50%',
            background: pos.color,
            boxShadow: `0 0 10px ${pos.color}`,
            animation: `pulse-glow ${1.5 + i * 0.3}s ease-in-out infinite`,
            ...pos,
          }}
        />
      ))}

      {/* Floating labels */}
      {[
        { label: 'DFA', angle: 45, radius: 170, color: '#F59768' },
        { label: 'NFA', angle: 135, radius: 170, color: '#3b82f6' },
        { label: 'CFG', angle: 225, radius: 170, color: '#8b5cf6' },
        { label: 'PDA', angle: 315, radius: 170, color: '#06b6d4' },
      ].map(({ label, angle, radius, color }) => {
        const rad = (angle * Math.PI) / 180;
        const x = 210 + radius * Math.cos(rad) - 16;
        const y = 210 + radius * Math.sin(rad) - 10;
        return (
          <div key={label} style={{
            position: 'absolute', left: x, top: y,
            padding: '4px 10px', borderRadius: 20,
            background: `rgba(0,0,0,0.6)`,
            border: `1px solid ${color}40`,
            color, fontSize: '0.7rem', fontWeight: 700,
            letterSpacing: '0.05em',
            boxShadow: `0 0 12px ${color}30`,
          }}>
            {label}
          </div>
        );
      })}
    </div>
  );
}

// -------- Typing animation for hero ---------
function TypingText({ texts }) {
  return (
    <span className="gradient-text-orange" style={{ fontStyle: 'normal' }}>
      Interactive Visualization
    </span>
  );
}

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
      }}
    >
      {/* Background glows */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,151,104,0.12) 0%, transparent 70%)',
        top: '10%', left: '-10%',
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute',
        width: 500, height: 500,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
        bottom: '10%', right: '-10%',
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />

      {/* Grid dot overlay */}
      <div className="grid-dots" style={{ position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center',
        }}>
          {/* Left – Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="badge badge-orange" style={{ marginBottom: 24, display: 'inline-flex' }}>
                <Binary size={12} />
                FORMAL LANGUAGE ANALYSIS TOOL
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: 12,
                color: '#EAEAEA',
                position: 'relative',
                textShadow: '0 4px 32px rgba(255, 255, 255, 0.12)',
              }}
            >
              <div style={{
                position: 'absolute',
                top: '50%', left: '30%',
                transform: 'translate(-50%, -50%)',
                width: '120%', height: '120%',
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.03) 0%, transparent 60%)',
                pointerEvents: 'none',
                zIndex: -1,
                filter: 'blur(20px)',
              }} />
              Understanding
              <br />
              <span style={{ position: 'relative', zIndex: 1, color: '#E6E6E6' }}>Pumping Lemma</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              style={{
                fontSize: '1.15rem',
                color: '#A0A0A8', /* Matches the light grey requirement */
                lineHeight: 1.75,
                marginBottom: 36,
                maxWidth: 480,
                fontWeight: 400,
                position: 'relative',
              }}
            >
              We combine the rigor of theoretical computer science with interactive visualization, enabling you to explore how strings behave under repetition and validate whether a language is truly regular.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
            >
              <a href="#demo" className="btn-primary" id="hero-try-tool">
                Try the Visualizer <ArrowRight size={16} />
              </a>
              <a href="#concepts" className="btn-secondary" id="hero-explore">
                <BookOpen size={16} /> Explore Concepts
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{ display: 'flex', gap: 36, marginTop: 52 }}
            >
              {[
                { num: 'Regular Languages', label: 'Verified' },
                { num: 'Zero Assumptions', label: 'Proof-Based' },
                { num: '100% Interactive', label: 'Visual Learning' },
              ].map(stat => (
                <div key={stat.label} style={{ flex: '1 1 min-content' }}>
                  <div className="gradient-text-orange" style={{ fontSize: '1.25rem', fontWeight: 800, whiteSpace: 'nowrap' }}>
                    {stat.num}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#A0A0A8', fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right – Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <ChipVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div style={{
          width: 1.5, height: 40,
          background: 'linear-gradient(to bottom, rgba(245,151,104,0.6), transparent)',
          animation: 'pulse-glow 2s ease-in-out infinite',
        }} />
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
        }
      `}</style>
    </section>
  );
}
