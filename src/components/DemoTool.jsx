import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronRight, AlertCircle, CheckCircle2, XCircle, Info, Zap, X, Cpu, Activity, LayoutGrid } from 'lucide-react';
import { usePumpingLemma, LANGUAGES, decompose, pump, evaluateAllDecompositions } from '../hooks/usePumpingLemma';
import AdversarialEngine from './AdversarialEngine';
import MultiPumpingVisual from './MultiPumpingVisual';

// -------- String Block Visual --------
function StringVisual({ x, y, z, pumped, iValue, inputString }) {
  const renderSegment = (chars, type, label) => {
    if (chars.length === 0) return null;
    const colorMap = { x: '#3b82f6', y: '#F59768', z: '#8b5cf6' };
    const bgMap = { x: 'rgba(59,130,246,0.2)', y: 'rgba(245,151,104,0.2)', z: 'rgba(139,92,246,0.2)' };
    const borderMap = { x: 'rgba(59,130,246,0.5)', y: 'rgba(245,151,104,0.5)', z: 'rgba(139,92,246,0.5)' };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {chars.split('').map((ch, i) => (
            <motion.div
              key={`${type}-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              style={{
                minWidth: 32, height: 36, borderRadius: 6,
                background: bgMap[type],
                border: `1px solid ${borderMap[type]}`,
                color: colorMap[type],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem',
                padding: '0 4px',
              }}
            >
              {ch}
            </motion.div>
          ))}
        </div>
        <div style={{
          fontSize: '0.72rem', fontWeight: 700, color: colorMap[type],
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>
          {label}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Original decomposition */}
      <div style={{ marginBottom: 28 }}>
        <div style={{
          fontSize: '0.8rem', color: 'var(--text-muted)',
          fontWeight: 600, marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>
          Decomposition: s = xyz
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, flexWrap: 'wrap' }}>
          {renderSegment(x, 'x', 'x')}
          {y.length > 0 && (
            <>
              <div style={{ color: 'var(--text-muted)', paddingTop: 8 }}>|</div>
              {renderSegment(y, 'y', `y (|y|=${y.length})`)}
              <div style={{ color: 'var(--text-muted)', paddingTop: 8 }}>|</div>
            </>
          )}
          {renderSegment(z, 'z', 'z')}
          {(!x && !y && !z) && (
            <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.85rem', paddingTop: 8 }}>
              Enter a string to decompose
            </div>
          )}
        </div>
      </div>

      {/* Pumped string */}
      <div>
        <div style={{
          fontSize: '0.8rem', color: 'var(--text-muted)',
          fontWeight: 600, marginBottom: 12, letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>
          Pumped: xy<sup style={{ fontSize: '0.6rem' }}>{iValue}</sup>z = "{pumped}"
        </div>
        <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {/* x chars */}
          {x.split('').map((ch, i) => (
            <motion.div key={`px-${i}`} layout style={{
              minWidth: 32, height: 36, borderRadius: 6,
              background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.4)',
              color: '#93c5fd', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem', padding: '0 4px',
            }}>{ch}</motion.div>
          ))}
          {/* y^i chars */}
          {y.repeat(iValue).split('').map((ch, i) => (
            <motion.div
              key={`py-${iValue}-${i}`} layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: i * 0.02 }}
              style={{
                minWidth: 32, height: 36, borderRadius: 6,
                background: 'rgba(245,151,104,0.2)', border: '1px solid rgba(245,151,104,0.5)',
                color: '#fdba74', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem', padding: '0 4px',
              }}
            >{ch}</motion.div>
          ))}
          {/* z chars */}
          {z.split('').map((ch, i) => (
            <motion.div key={`pz-${i}`} layout style={{
              minWidth: 32, height: 36, borderRadius: 6,
              background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.4)',
              color: '#c4b5fd', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem', padding: '0 4px',
            }}>{ch}</motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -------- Constraint Badge --------
function ConstraintBadge({ ok, label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 14px', borderRadius: 8,
      background: ok ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
      border: `1px solid ${ok ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
    }}>
      {ok
        ? <CheckCircle2 size={14} color="#4ade80" />
        : <AlertCircle size={14} color="#f87171" />
      }
      <span style={{
        fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 600,
        color: ok ? '#4ade80' : '#f87171',
      }}>
        {label}
      </span>
    </div>
  );
}

// -------- Guided Proof Step Card --------
function ProofStepCard({ step, x, y, z, iValue, pumped, language, pumpingLength, isOriginalValid, isPumpedValid, constraint1, constraint2, setIValue }) {
  const steps = [
    {
      title: 'Assume L is Regular',
      subtitle: 'The Starting Hypothesis',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.6 }}>
            To prove a language is <strong>not regular</strong>, we first assume the opposite. 
            If L is regular, it must satisfy the Pumping Lemma for some constant p.
          </p>
          <div style={{ padding: '24px', borderRadius: 16, background: 'rgba(245,151,104,0.05)', border: '1px solid rgba(245,151,104,0.1)' }}>
            <div style={{ fontSize: '0.8rem', color: '#F59768', fontWeight: 800, marginBottom: 8, textTransform: 'uppercase' }}>Current Assumption</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              Assume L = {"{ "}{language.label.replace('L = { ', '').replace(' }', '')}{" }"} is a Regular Language.
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Pick a String s ∈ L',
      subtitle: 'Condition: |s| ≥ p',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.6 }}>
            We must choose a specific string s from the language such that its length is at least the pumping length p.
          </p>
          <div style={{ background: '#0B0F19', padding: '24px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 12, fontWeight: 700 }}>CHOSEN STRING (s)</div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 20 }}>
              {(x+y+z).split('').map((ch, i) => (
                <div key={i} style={{ width: 32, height: 36, borderRadius: 6, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'monospace', fontWeight: 700 }}>{ch}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <ConstraintBadge ok={isOriginalValid} label="In Language" />
              <ConstraintBadge ok={(x+y+z).length >= pumpingLength} label={`|s| = ${(x+y+z).length} ≥ p = ${pumpingLength}`} />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Decompose s = xyz',
      subtitle: 'The Adversarial Split',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.6 }}>
            The string is split into three parts: x, y, and z. 
            The pumping part (y) must be non-empty and |xy| must be within the first p characters.
          </p>
          <StringVisual x={x} y={y} z={z} pumped={x+y+z} iValue={1} inputString={x+y+z} />
          <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
            <ConstraintBadge ok={constraint1} label={`|xy| = ${x.length + y.length} ≤ p`} />
            <ConstraintBadge ok={constraint2} label="|y| ≥ 1" />
          </div>
        </div>
      )
    },
    {
      title: 'Pump xyⁱz',
      subtitle: 'Generating New Strings',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Now, we "pump" the middle part y by repeating it i times. 
            If L is regular, every resulting string must still be in L.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#F59768' }}>i = {iValue}</span>
                <input 
                  type="range" min="0" max="5" value={iValue} 
                  onChange={e => setIValue(Number(e.target.value))} 
                  style={{ flex: 1, accentColor: '#F59768' }}
                />
             </div>
             <StringVisual x={x} y={y} z={z} pumped={pumped} iValue={iValue} inputString={x+y+z} />
          </div>
        </div>
      )
    },
    {
      title: 'Verify Membership',
      subtitle: 'The Contradiction Check',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.6 }}>
            We check if the pumped string "{pumped}" belongs to our original language definition. 
            If it doesn't, we've found a contradiction.
          </p>
          <div style={{ 
            padding: '28px', borderRadius: 20, textAlign: 'center',
            background: isPumpedValid ? 'rgba(34,197,94,0.05)' : 'rgba(239,68,68,0.05)',
            border: `1px solid ${isPumpedValid ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{isPumpedValid ? <CheckCircle2 size={48} color="#4ade80" style={{ margin: '0 auto' }} /> : <XCircle size={48} color="#f87171" style={{ margin: '0 auto' }} />}</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: isPumpedValid ? '#4ade80' : '#f87171', marginBottom: 8 }}>
              {isPumpedValid ? 'Accepted' : 'Contradiction Found!'}
            </div>
            <p style={{ fontSize: '0.9rem', color: '#a1a1aa', margin: 0 }}>
              {isPumpedValid 
                ? "The resulting string is still in L for this i. This specific split doesn't prove non-regularity."
                : `The string "${pumped}" is NOT in L. Our initial assumption was WRONG.`}
            </p>
          </div>
          {!isPumpedValid && (
            <div style={{ padding: '16px', borderRadius: 12, background: 'rgba(245,151,104,0.1)', border: '1px solid rgba(245,151,104,0.2)', color: '#F59768', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>
               Verdict: The language is NOT Regular.
            </div>
          )}
        </div>
      )
    }
  ];

  const currentStep = steps[step];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ marginBottom: 10 }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>{currentStep.title}</h3>
        <p style={{ fontSize: '0.9rem', color: '#F59768', fontWeight: 700, margin: '4px 0 0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{currentStep.subtitle}</p>
      </div>
      {currentStep.content}
    </div>
  );
}

// -------- Step Proof Panel --------
export function ProofSteps({ x, y, z, iValue, pumpingLength, isOriginalValid, isPumpedValid, constraint1, constraint2, language }) {
  const steps = [
    {
      num: 1,
      label: 'Assume L is regular',
      done: true,
      detail: `We claim ${language.label} is not regular. Assume for contradiction that it is.`,
      ok: true,
    },
    {
      num: 2,
      label: `Initial Condition: |s| ≥ p = ${pumpingLength}`,
      done: true,
      detail: `We pick string s ∈ L. Its length must be ≥ ${pumpingLength}. Here |s| = ${x.length + y.length + z.length}.`,
      ok: isOriginalValid && (x.length + y.length + z.length) >= pumpingLength,
    },
    {
      num: 3,
      label: `Decompose s = ${x || '?'}|${y || '?'}|${z || '?'}`,
      done: !!y,
      detail: `|xy| = ${x.length + y.length} ≤ ${pumpingLength}? ${constraint1 ? '✓' : '✗'}   |y| = ${y.length} ≥ 1? ${constraint2 ? '✓' : '✗'}`,
      ok: constraint1 && constraint2,
    },
    {
      num: 4,
      label: `Pump: xy${iValue === 1 ? '' : iValue}z = "${x}${y.repeat(iValue)}${z}"`,
      done: iValue !== 1,
      detail: `Pumped string when i = ${iValue}.`,
      ok: true,
    },
    {
      num: 5,
      label: `Check: xy${iValue}z ∈ L?`,
      done: true,
      detail: isPumpedValid
        ? `✅ We can't say if the language is regular or not.`
        : `❌ Contradiction discovered! The language is NOT regular.`,
      ok: !isPumpedValid,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {steps.map((step, i) => (
        <motion.div
          key={`${language.id}-${step.num}`}
          initial={{ opacity: 0, scale: 0.85, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 24,
            delay: i * 0.08
          }}
          style={{
            display: 'flex', gap: 14,
            padding: '16px 18px', borderRadius: 12,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
            border: `1px solid rgba(255,255,255,0.04)`,
            boxShadow: '0 4px 20px -2px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            background: step.ok ? 'rgba(245,151,104,0.2)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${step.ok ? 'rgba(245,151,104,0.4)' : 'rgba(255,255,255,0.1)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.7rem', fontWeight: 800,
            color: step.ok ? '#F59768' : 'var(--text-muted)',
          }}>
            {step.num}
          </div>
          <div>
            <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f1f5f9', marginBottom: 4, fontFamily: 'monospace' }}>
              {step.label}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {step.detail}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// -------- Main DemoTool --------
export default function DemoTool() {
  const {
    languageId, setLanguageId,
    inputString, setInputString,
    pumpingLength, setPumpingLength,
    yStart, setYStart,
    yEnd, setYEnd,
    iValue, setIValue,
    customValidatorCode, setCustomValidatorCode,
    customDescription, setCustomDescription,
    customAlphabet, setCustomAlphabet,
    language,
    x, y, z, pumped,
    isOriginalValid, isPumpedValid,
    constraint1, constraint2, hasMinimumLength, xyLen, yLen,
    loadExample,
    LANGUAGES: langs,
  } = usePumpingLemma();

  const [activeTab, setActiveTab] = useState('visual');
  const [showModal, setShowModal] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState('guided'); // guided, sequencer or adversarial
  const [sequenceStep, setSequenceStep] = useState(5); // 5 means not running or finished
  const [guidedStep, setGuidedStep] = useState(0); // 0 to 4 for Guided Proof mode
  const [sequenceValidations, setSequenceValidations] = useState([]);
  const strLen = inputString.length;

  // Reset states when modal is closed
  useEffect(() => {
    if (!showModal) {
      setGuidedStep(0);
      setIValue(2);
      setSequenceStep(-1);
      setSequenceValidations([]);
    }
  }, [showModal, setIValue]);

  // Manual Pumping Sequencer logic
  const handleSequencerNext = () => {
    if (sequenceStep < 5) {
      // Record validation for current iValue
      const currentValidation = { i: iValue, valid: isPumpedValid, str: pumped };
      setSequenceValidations(prev => {
        // Avoid duplicates if user went back and forward
        const filtered = prev.filter(v => v.i !== iValue);
        return [...filtered, currentValidation].sort((a, b) => a.i - b.i);
      });

      if (sequenceStep < 4) {
        const nextI = sequenceStep + 1;
        setIValue(nextI);
        setSequenceStep(nextI);
      } else {
        setSequenceStep(5);
      }
    }
  };

  const handleSequencerPrev = () => {
    if (sequenceStep > 0 && sequenceStep <= 5) {
      const prevStep = sequenceStep - 1;
      setSequenceStep(prevStep);
      setIValue(prevStep);
    } else if (sequenceStep === 0) {
      // Do nothing or go back to setup? Keep it simple for now.
    }
  };

  // Apply constraints when string/p changes
  useEffect(() => {
    const safeYStart = Math.min(yStart, Math.max(0, Math.min(pumpingLength - 1, strLen - 1)));
    const safeYEnd = Math.min(yEnd, Math.max(safeYStart, Math.min(pumpingLength - 1, strLen - 1)));
    if (safeYStart !== yStart) setYStart(safeYStart);
    if (safeYEnd !== yEnd) setYEnd(safeYEnd);
  }, [inputString, pumpingLength]);

  const handleLanguageChange = (id) => {
    loadExample(id);
  };

  const handleReset = () => {
    loadExample(languageId);
    setIValue(2);
  };

  return (
    <>
      <section id="demo" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', width: 800, height: 600, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(245,151,104,0.07) 0%, transparent 65%)',
          top: '30%', left: '50%', transform: 'translateX(-50%)',
          pointerEvents: 'none', filter: 'blur(60px)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16,
            }}>
              Try it <span className="gradient-text-orange">Live</span>
            </h2>
            <p style={{
              color: 'var(--text-secondary)', fontSize: '1rem',
              maxWidth: 520, margin: '0 auto', lineHeight: 1.7,
            }}>
              Select a language, enter a string, pick your decomposition, and pump.
              See the proof unfold in real time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              borderRadius: 24,
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
          >
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '16px 28px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 12,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex', gap: 7 }}>
                  {['#ef4444', '#f59e0b', '#22c55e'].map(c => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.8 }} />
                  ))}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  pumping-lemma-visualizer
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', alignSelf: 'center', marginRight: 4 }}>Examples:</span>
                {langs.map(l => (
                  <button
                    key={l.id}
                    onClick={() => handleLanguageChange(l.id)}
                    style={{
                      padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem',
                      background: languageId === l.id ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)',
                      border: `0.6px solid ${languageId === l.id ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      color: languageId === l.id ? '#ffffff' : 'var(--text-muted)',
                      transition: 'all 0.2s',
                      fontFamily: 'monospace'
                    }}
                  >
                    {l.id === 'anbn' ? <>a<sup>n</sup>b<sup>n</sup></> :
                     l.id === 'astar' ? <>a<sup>n</sup></> :
                     l.id === 'palindrome' ? <>ww<sup>R</sup></> :
                     l.id === 'anbncn' ? <>a<sup>n</sup>b<sup>n</sup>c<sup>n</sup></> :
                     l.label.split('=')[1] || l.id}
                  </button>
                ))}
                <button
                  onClick={handleReset}
                  style={{
                    padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.75rem',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4,
                  }}
                >
                  <RotateCcw size={12} /> Reset
                </button>
              </div>
            </div>

            <div style={{ margin: '0 auto', maxWidth: 640, padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <label style={{ fontSize: '0.72rem', color: '#E6E6E6', fontWeight: 600, display: 'block', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Language</label>
                  <select
                    value={languageId}
                    onChange={e => handleLanguageChange(e.target.value)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#0B0F19', border: '1px solid rgba(255,255,255,0.06)', color: '#E6E6E6', outline: 'none' }}
                  >
                    {langs.map(l => (
                      <option key={l.id} value={l.id}>{l.label}</option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <label style={{ fontSize: '0.72rem', color: '#E6E6E6', fontWeight: 600, display: 'block', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Pumping Length P</label>
                  <input
                    type="number" min="1" value={pumpingLength}
                    onChange={e => setPumpingLength(Math.max(1, Number(e.target.value)))}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#0B0F19', border: '1px solid rgba(255,255,255,0.06)', color: '#E6E6E6', outline: 'none' }}
                  />
                </div>
              </div>

              {languageId === 'custom' && (
                <div style={{ padding: '24px', borderRadius: 12, border: '1px dashed rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.01)' }}>
                  <label style={{ fontSize: '0.72rem', color: '#E6E6E6', fontWeight: 600, display: 'block', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Define Formal Language</label>
                  <input
                    value={customDescription}
                    onChange={e => setCustomDescription(e.target.value)}
                    placeholder="e.g. a^n b^{2n}"
                    style={{ width: '100%', padding: '16px 20px', borderRadius: 8, background: '#0B0F19', border: '1px solid rgba(250,204,21,0.2)', color: '#FACC15', fontFamily: 'monospace', outline: 'none' }}
                  />
                </div>
              )}

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 2, minWidth: 200 }}>
                  <label style={{ fontSize: '0.72rem', color: '#E6E6E6', fontWeight: 600, display: 'block', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Input String S</label>
                  <input
                    type="text" value={inputString}
                    onChange={e => setInputString(e.target.value)}
                    style={{ 
                      width: '100%', padding: '12px 16px', borderRadius: 8, background: '#0B0F19', 
                      border: `1px solid ${!isOriginalValid || !hasMinimumLength ? 'rgba(239,68,68,0.7)' : 'rgba(255,255,255,0.06)'}`, 
                      color: !isOriginalValid || !hasMinimumLength ? '#fca5a5' : '#E6E6E6', 
                      fontFamily: 'monospace', outline: 'none',
                      transition: 'border-color 0.2s',
                    }}
                  />
                  
                  <AnimatePresence>
                    {(!isOriginalValid || !hasMinimumLength) && inputString.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ 
                          padding: '12px 16px', borderRadius: 8, background: 'rgba(239,68,68,0.1)', 
                          border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', gap: 10 
                        }}>
                          <AlertCircle size={16} color="#f87171" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '0.8rem', color: '#fca5a5', fontWeight: 500 }}>
                            {!isOriginalValid 
                              ? `Warning: "${inputString}" does not belong to the selected language.` 
                              : `Warning: String length (${inputString.length}) must be at least P (${pumpingLength}).`
                            }
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <label style={{ fontSize: '0.72rem', color: '#E6E6E6', fontWeight: 600, display: 'block', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Y Starts Index</label>
                  <input
                    type="number" min="0" value={yStart}
                    onChange={e => setYStart(Math.max(0, Number(e.target.value)))}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#0B0F19', border: '1px solid rgba(255,255,255,0.06)', color: '#E6E6E6', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <label style={{ fontSize: '0.72rem', color: '#E6E6E6', fontWeight: 600, display: 'block', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Length of Y</label>
                  <input
                    type="number" min="1" value={yLen}
                    onChange={e => setYEnd(yStart + Math.max(1, Number(e.target.value)) - 1)}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: 8, background: '#0B0F19', border: '1px solid rgba(255,255,255,0.05)', color: '#E6E6E6', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <ConstraintBadge ok={hasMinimumLength} label={`|s| ≥ ${pumpingLength}`} />
                <ConstraintBadge ok={constraint1} label={`|xy| ≤ ${pumpingLength}`} />
                <ConstraintBadge ok={constraint2} label={`|y| ≥ 1`} />
              </div>

              <div style={{ padding: '24px 32px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                  <label style={{ fontSize: '0.76rem', color: '#E6E6E6', fontWeight: 600, textTransform: 'uppercase' }}>Preview Pump I = {iValue}</label>
                  <input type="range" min="0" max="5" value={iValue} onChange={e => setIValue(Number(e.target.value))} style={{ flex: 1, accentColor: '#FACC15' }} />
                </div>
              </div>

              <button
                disabled={!isOriginalValid || !hasMinimumLength}
                onClick={() => {
                  setGuidedStep(0);
                  setIValue(0); // Start both modes at the beginning
                  setSequenceStep(0);
                  setSequenceValidations([]);
                  setShowModal(true);
                }}
                style={{
                  padding: '16px 24px', borderRadius: 12, fontWeight: 700, cursor: (!isOriginalValid || !hasMinimumLength) ? 'not-allowed' : 'pointer',
                  background: (!isOriginalValid || !hasMinimumLength) ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${(!isOriginalValid || !hasMinimumLength) ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.15)'}`,
                  color: (!isOriginalValid || !hasMinimumLength) ? 'rgba(255,255,255,0.3)' : '#f8fafc',
                }}
              >
                LAUNCH VISUALIZATION
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 10, 0.9)', backdropFilter: 'blur(10px)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }}
              style={{ position: 'relative', width: '100%', maxWidth: 760, maxHeight: '90vh', background: '#0a0a0c', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, display: 'flex', flexDirection: 'column', overflow: 'hidden', zIndex: 1 }}
            >
              <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
                    {activeModalTab === 'guided' ? 'Guided Proof' : activeModalTab === 'sequencer' ? 'Live Evaluation' : 'Analytics'}
                  </h3>
                  <button onClick={() => setShowModal(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '50%', width: 34, height: 34, color: '#fff', cursor: 'pointer' }}><X size={16} /></button>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['guided', 'sequencer', 'adversarial', 'multi'].map(id => (
                    <button key={id} onClick={() => setActiveModalTab(id)} style={{ padding: '8px 16px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700, background: activeModalTab === id ? 'rgba(245,151,104,0.1)' : 'transparent', border: '1px solid ' + (activeModalTab === id ? 'rgba(245,151,104,0.3)' : 'rgba(255,255,255,0.05)'), color: activeModalTab === id ? '#F59768' : '#71717a', cursor: 'pointer' }}>{id.toUpperCase()}</button>
                  ))}
                </div>
              </div>

              <div style={{ padding: '32px 36px', overflowY: 'auto', flex: 1 }}>
                {activeModalTab === 'guided' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 32, flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px 20px', borderRadius: 12 }}>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {[0, 1, 2, 3, 4].map(idx => (<div key={idx} style={{ width: 30, height: 4, borderRadius: 2, background: idx <= guidedStep ? '#F59768' : 'rgba(255,255,255,0.1)' }} />))}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#F59768' }}>Step {guidedStep + 1} of 5</span>
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.div key={guidedStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <ProofStepCard step={guidedStep} x={x} y={y} z={z} iValue={iValue} pumped={pumped} language={language} pumpingLength={pumpingLength} isOriginalValid={isOriginalValid} isPumpedValid={isPumpedValid} constraint1={constraint1} constraint2={constraint2} setIValue={setIValue} />
                      </motion.div>
                    </AnimatePresence>
                    <div style={{ marginTop: 'auto', padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
                      <button onClick={() => setGuidedStep(s => Math.max(0, s-1))} disabled={guidedStep === 0} style={{ padding: '10px 24px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', color: '#fff', cursor: 'pointer' }}>PREV</button>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button onClick={() => { setGuidedStep(0); setIValue(2); }} style={{ padding: '10px 24px', borderRadius: 12, background: 'rgba(245,151,104,0.1)', color: '#F59768', cursor: 'pointer' }}>RESET</button>
                        <button onClick={() => setGuidedStep(s => Math.min(4, s+1))} disabled={guidedStep === 4} style={{ padding: '10px 28px', borderRadius: 12, background: guidedStep === 4 ? 'rgba(255,255,255,0.03)' : '#F59768', color: '#fff', cursor: 'pointer' }}>{guidedStep === 4 ? 'FINISH' : 'NEXT'}</button>
                      </div>
                    </div>
                  </div>
                ) : activeModalTab === 'sequencer' ? (
                  <>
                    {sequenceStep < 5 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px 20px', borderRadius: 12 }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F59768', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                            Step 4: Pumping Evaluation (i = {sequenceStep})
                          </span>
                          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#71717a' }}>
                            {sequenceValidations.length} of 5 cases tested
                          </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
                          <StringVisual x={x} y={y} z={z} pumped={pumped} iValue={iValue} inputString={inputString} />
                          
                          <div style={{ width: '100%', maxWidth: 540, background: '#0B0F19', padding: '24px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                            <div style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 10 }}>
                              Evaluation Log
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                              {sequenceValidations.map((v, i) => (
                                <motion.div 
                                  initial={{ opacity: 0, x: -10 }} 
                                  animate={{ opacity: 1, x: 0 }}
                                  key={i} 
                                  style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}
                                >
                                  <span style={{ color: '#a1a1aa' }}>i = {v.i}: <span style={{ fontFamily: 'monospace', color: '#fff' }}>"{v.str}"</span></span>
                                  <span style={{ fontWeight: 700, color: v.valid ? '#4ade80' : '#f87171' }}>{v.valid ? '[ ACCEPTED ]' : '[ CONTRADICTION ]'}</span>
                                </motion.div>
                              ))}
                              {sequenceValidations.every(v => v.i !== sequenceStep) && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#FACC15' }}>
                                  <span>i = {sequenceStep}: <span style={{ fontFamily: 'monospace' }}>"{pumped}"</span></span>
                                  <span style={{ fontWeight: 700 }}>[ EVALUATING... ]</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div style={{ marginTop: 'auto', padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between' }}>
                          <button 
                            onClick={handleSequencerPrev} 
                            disabled={sequenceStep === 0} 
                            style={{ padding: '10px 24px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', color: '#fff', cursor: sequenceStep === 0 ? 'not-allowed' : 'pointer' }}
                          >
                            PREVIOUS
                          </button>
                          <button 
                            onClick={handleSequencerNext} 
                            style={{ padding: '10px 28px', borderRadius: 12, background: '#F59768', color: '#fff', cursor: 'pointer', fontWeight: 700 }}
                          >
                            {sequenceStep === 4 ? 'VIEW FINAL REPORT' : 'TEST NEXT CASE (i++)'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <ProofSteps x={x} y={y} z={z} iValue={iValue} pumpingLength={pumpingLength} isOriginalValid={isOriginalValid} isPumpedValid={isPumpedValid} constraint1={constraint1} constraint2={constraint2} language={language} />
                        <div style={{
                          marginTop: 24, padding: '16px 20px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 14,
                          background: sequenceValidations.some(v => !v.valid) ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)',
                          border: `1px solid ${sequenceValidations.some(v => !v.valid) ? 'rgba(239,68,68,0.25)' : 'rgba(34,197,94,0.25)'}`,
                        }}>
                          <div style={{ fontSize: '1.5rem' }}>{sequenceValidations.some(v => !v.valid) ? '❌' : '✅'}</div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: sequenceValidations.some(v => !v.valid) ? '#f87171' : '#4ade80', marginBottom: 4 }}>
                              Final Status: {sequenceValidations.some(v => !v.valid) ? 'The language is NOT regular.' : "Inconclusive: we can't say if the language is regular or not."}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </>
                ) : activeModalTab === 'adversarial' ? (
                  <AdversarialEngine inputString={inputString} pumpingLength={pumpingLength} language={language} customCode={customValidatorCode} onSelectDecomposition={(s, e) => { setYStart(s); setYEnd(e); setActiveModalTab('sequencer'); setSequenceStep(0); setIValue(0); setSequenceValidations([]); }} />
                ) : (
                  <MultiPumpingVisual report={evaluateAllDecompositions(inputString, pumpingLength, language, customValidatorCode).report} language={language} customCode={customValidatorCode} />
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
