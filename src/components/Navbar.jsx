import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Demo', href: '#demo' },
  { label: 'Concepts', href: '#concepts' },
  { label: 'Use Cases', href: '#usecases' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <nav
        style={{
          borderRadius: 50,
          padding: '6px 20px 6px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.6)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo (RefractWeb Style Pill) */}
        <a href="#" style={{
          background: 'linear-gradient(180deg, #d97706, #c2410c)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)',
          padding: '8px 24px',
          borderRadius: 50,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '1rem',
          color: '#ffffff',
          letterSpacing: '-0.02em',
          transition: 'all 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
        >
          PumpingLemma
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="hidden md:flex">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                color: 'rgba(241,245,249,0.5)',
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                padding: '6px 12px',
                borderRadius: 20,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.target.style.color = '#f1f5f9'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { e.target.style.color = 'rgba(241,245,249,0.5)'; e.target.style.background = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
