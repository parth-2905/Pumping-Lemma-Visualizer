import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, FastForward, Info, CheckCircle2, XCircle, ChevronRight, X, FileText, LayoutGrid } from 'lucide-react';
import { pump, decompose } from '../hooks/usePumpingLemma';
import { ProofSteps } from './DemoTool';

// Mini Pumping Card
function PumpingCard({ x, y, z, i, language, customCode, onExpand }) {
  const pumped = pump(x, y, z, i);
  const isValid = language.id === 'custom'
    ? language.validate(pumped, customCode)
    : language.validate(pumped);

  return (
    <motion.div
      layout
      style={{
        padding: '16px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: `1px solid ${isValid ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'}`,
        display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Decomposition
        </div>
        <div style={{
          fontSize: '0.65rem', fontWeight: 900, color: isValid ? '#4ade80' : '#f87171',
          padding: '2px 8px', borderRadius: 4, background: isValid ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'
        }}>
          {isValid ? 'ACCEPTED' : 'CONTRADICTION'}
        </div>
      </div>

      <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>
        <span style={{ color: '#3b82f6' }}>{x}</span>
        <span style={{ color: '#F59768', background: 'rgba(245,151,104,0.1)', padding: '0 2px' }}>{y.repeat(i)}</span>
        <span style={{ color: '#8b5cf6' }}>{z}</span>
      </div>

      <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', width: '100%' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.7rem', color: '#52525b' }}>
          i = {i} → Length: {pumped.length}
        </div>
        <button
          onClick={onExpand}
          style={{
            fontSize: '0.65rem', color: '#F59768', background: 'transparent', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 700
          }}
        >
          <FileText size={12} /> View Proof
        </button>
      </div>
    </motion.div>
  );
}

export default function MultiPumpingVisual({
  report,
  language,
  customCode,
  inputString,
  pumpingLength
}) {
  const [globalI, setGlobalI] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [detailedCard, setDetailedCard] = useState(null);

  // Smart Sampling Logic
  const sampledDecompositions = useMemo(() => {
    if (report.length <= 6) return report;
    const indices = [
      0,
      Math.floor(report.length / 5),
      Math.floor((report.length * 2) / 5),
      Math.floor((report.length * 3) / 5),
      Math.floor((report.length * 4) / 5),
      report.length - 1
    ];
    return Array.from(new Set(indices)).map(idx => report[idx]);
  }, [report]);

  // Auto-playback effect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setGlobalI(prev => (prev + 1) % 6);
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const failuresAtCurrentI = sampledDecompositions.filter(d => {
    const pumpedStr = pump(d.x, d.y, d.z, globalI);
    return !(language.id === 'custom' ? language.validate(pumpedStr, customCode) : language.validate(pumpedStr));
  }).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Top Controls */}
      <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ width: 44, height: 44, borderRadius: '50%', background: '#F59768', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px rgba(245,151,104,0.3)' }}
          >
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>Synchronized Pumping</div>
            <div style={{ fontSize: '0.75rem', color: '#71717a' }}>Adjusting 'i' for all parallel splits</div>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: '0.8rem', color: '#fff', fontWeight: 700, width: 40 }}>i = {globalI}</span>
          <input
            type="range" min="0" max="5" value={globalI}
            onChange={e => { setGlobalI(Number(e.target.value)); setIsPlaying(false); }}
            style={{ flex: 1, accentColor: '#F59768' }}
          />
        </div>
      </div>

      {/* Insight Banner */}
      <div style={{
        padding: '16px 24px', borderRadius: 12,
        background: failuresAtCurrentI > 0 ? 'rgba(239,68,68,0.05)' : 'rgba(34,197,94,0.05)',
        border: `1px solid ${failuresAtCurrentI > 0 ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)'}`,
        display: 'flex', alignItems: 'center', gap: 12
      }}>
        <Info size={18} color={failuresAtCurrentI > 0 ? '#f87171' : '#4ade80'} />
        <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>
          {failuresAtCurrentI > 0
            ? `Failure detected: The language is NOT regular (${failuresAtCurrentI} contradictions at i = ${globalI}).`
            : `No contradictions at i = ${globalI}: We can't say if the language is regular or not.`}
        </div>
      </div>

      {/* Grid of Pumping Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16
      }}>
        {sampledDecompositions.map((d) => (
          <PumpingCard
            key={d.id}
            x={d.x} y={d.y} z={d.z}
            i={globalI}
            language={language}
            customCode={customCode}
            onExpand={() => setDetailedCard(d)}
          />
        ))}
      </div>

      {/* Outcome Summary Table */}
      <div style={{ marginTop: 20 }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fff', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
          <LayoutGrid size={18} color="#F59768" />
          Full Outcome Matrix (i = 0 to 5)
        </h3>
        <div style={{ overflowX: 'auto', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.03)', color: '#71717a' }}>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Split (#)</th>
                <th style={{ padding: '12px 16px', fontWeight: 700 }}>Segments (x|y|z)</th>
                {[0, 1, 2, 3, 4, 5].map(v => (
                  <th key={v} style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'center', color: v === globalI ? '#F59768' : 'inherit' }}>
                    i = {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampledDecompositions.map((d, dIdx) => (
                <tr key={d.id} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', color: '#a1a1aa', fontWeight: 700 }}>{dIdx + 1}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', color: '#fff' }}>
                    <span style={{ color: '#3b82f6' }}>{d.x}</span>|<span style={{ color: '#F59768' }}>{d.y}</span>|<span style={{ color: '#8b5cf6' }}>{d.z}</span>
                  </td>
                  {[0, 1, 2, 3, 4, 5].map(v => {
                    const p = pump(d.x, d.y, d.z, v);
                    const valid = language.id === 'custom' ? language.validate(p, customCode) : language.validate(p);
                    return (
                      <td key={v} style={{ padding: '12px 16px', textAlign: 'center', background: v === globalI ? 'rgba(245,151,104,0.03)' : 'transparent' }}>
                        {valid
                          ? <span style={{ color: '#4ade80' }}>✅</span>
                          : <span style={{ color: '#f87171' }}>❌</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Expansion Modal */}
      <AnimatePresence>
        {detailedCard && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1100,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24, background: 'rgba(2, 6, 10, 0.9)',
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              style={{
                width: '100%', maxWidth: 640, maxHeight: '85vh',
                background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, color: '#fff', fontSize: '1rem', fontWeight: 800 }}>Formal Proof Breakdown</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#71717a', fontFamily: 'monospace' }}>
                    Split: <span style={{ color: '#3b82f6' }}>{detailedCard.x}</span>|<span style={{ color: '#F59768' }}>{detailedCard.y}</span>|<span style={{ color: '#8b5cf6' }}>{detailedCard.z}</span>
                  </p>
                </div>
                <button
                  onClick={() => setDetailedCard(null)}
                  style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={18} />
                </button>
              </div>
              <div style={{ padding: 28, overflowY: 'auto' }}>
                <ProofSteps
                  x={detailedCard.x} y={detailedCard.y} z={detailedCard.z}
                  iValue={globalI}
                  pumpingLength={pumpingLength}
                  isOriginalValid={language.id === 'custom' ? language.validate(inputString, customCode) : language.validate(inputString)}
                  isPumpedValid={language.id === 'custom' ? language.validate(pump(detailedCard.x, detailedCard.y, detailedCard.z, globalI), customCode) : language.validate(pump(detailedCard.x, detailedCard.y, detailedCard.z, globalI))}
                  constraint1={(detailedCard.x.length + detailedCard.y.length) <= pumpingLength}
                  constraint2={detailedCard.y.length >= 1}
                  language={language}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tip */}
      <div style={{ fontSize: '0.85rem', color: '#71717a', fontStyle: 'italic', background: 'rgba(255,255,255,0.01)', padding: '16px', borderRadius: 10, border: '1px dashed rgba(255,255,255,0.05)' }}>
        Note: The matrix above shows the outcome for every possible pumping constant. Hover over the headers to compare across different lengths.
      </div>
    </div>
  );
}
