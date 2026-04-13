import { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import DemoTool from './components/DemoTool';
import ConceptSection from './components/ConceptSection';
import UseCases from './components/UseCases';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Premium Frosty Glass Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        background: '#02060A', /* Deep midnight blue/black */
      }}>
        {/* Left deep purple glow */}
        <div style={{
          position: 'absolute',
          top: '-15%',
          left: '-15%',
          width: '70%',
          height: '110%',
          background: 'radial-gradient(ellipse at center, rgba(46, 20, 60, 0.6) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }} />
        {/* Right warm brown/purple tint */}
        <div style={{
          position: 'absolute',
          top: '5%',
          right: '-10%',
          width: '65%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, rgba(80, 40, 30, 0.4) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }} />
        {/* Blending smooth overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          backgroundColor: 'rgba(15, 15, 20, 0.1)',
        }} />
      </div>

      <Navbar />
      <main>
        <Hero />
        <ConceptSection />
        <Features />
        <DemoTool />
        <UseCases />
      </main>
      <Footer />
    </div>
  );
}
