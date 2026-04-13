import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Cpu, ListFilter, Search } from 'lucide-react';
import { evaluateAllDecompositions } from '../hooks/usePumpingLemma';

export default function AdversarialEngine({ inputString, pumpingLength, language, customCode, onSelectDecomposition }) {
  const [filter, setFilter] = useState('all'); // all, survived, failed
  const [search, setSearch] = useState('');

  const result = useMemo(() => {
    return evaluateAllDecompositions(inputString, pumpingLength, language, customCode);
  }, [inputString, pumpingLength, language, customCode]);

  const filteredReport = useMemo(() => {
    return result.report.filter(d => {
      const matchFilter =
        filter === 'all' ? true :
          filter === 'survived' ? d.survived :
            !d.survived;

      const matchSearch =
        d.id.includes(search) ||
        d.y.includes(search);

      return matchFilter && matchSearch;
    });
  }, [result, filter, search]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '0 4px' }}>

      {/* Summary Dashboard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16
      }}>
        <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#a1a1aa', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>Total Decompositions</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>{result.total}</div>
        </div>
        <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#4ade80', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>Surviving Strategies</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#4ade80' }}>{result.successful}</div>
        </div>
        <div style={{ padding: '20px', borderRadius: 16, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#f87171', textTransform: 'uppercase', marginBottom: 8, fontWeight: 700 }}>Contradictions Found</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f87171' }}>{result.failed}</div>
        </div>
      </div>

      {/* Global Verdict */}
      <div style={{
        padding: '24px',
        borderRadius: 16,
        background: result.failed > 0 ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)',
        border: `1px solid ${result.failed > 0 ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)'}`,
        display: 'flex', alignItems: 'center', gap: 20
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: result.failed > 0 ? 'rgba(239,68,68,0.2)' : 'rgba(34,197,94,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: result.failed > 0 ? '#f87171' : '#4ade80'
        }}>
          {result.failed > 0 ? <ShieldAlert size={28} /> : <ShieldCheck size={28} />}
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff', marginBottom: 4 }}>
            {result.failed > 0
              ? "The language is NOT regular"
              : "Proof is Inconclusive: we can't say if the language is regular or not."}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>
            {result.failed > 0
              ? "A contradiction was discovered in at least one decomposition. Conclusion: Non-Regularity detected."
              : "All tested decompositions successfully satisfy the pumping lemma logic. No definitive conclusion can be made about regularity."}
          </div>
        </div>
      </div>

      {/* List Explorer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0B0F19', padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.05)', flex: 1, minWidth: 200 }}>
            <Search size={14} color="#52525b" />
            <input
              placeholder="Search by index or segment..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.85rem', outline: 'none', width: '100%' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'survived', label: 'Survivor' },
              { id: 'failed', label: 'Failed' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  padding: '6px 14px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer',
                  background: filter === f.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: '1px solid ' + (filter === f.id ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'),
                  color: filter === f.id ? '#fff' : '#71717a'
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          maxHeight: 400,
          overflowY: 'auto',
          paddingRight: 6
        }}>
          {filteredReport.map((d, i) => (
            <motion.div
              layout
              key={d.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => onSelectDecomposition(d.yStart, d.yEnd)}
              style={{
                padding: '16px 20px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid ' + (d.survived ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)'),
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              whileHover={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.1)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.03)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#71717a', fontWeight: 800
                }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 700, fontFamily: 'monospace', marginBottom: 4 }}>
                    <span style={{ color: '#3b82f6' }}>{d.x}</span>
                    <span style={{ color: '#F59768', background: 'rgba(245,151,104,0.1)', padding: '2px 4px', borderRadius: 4 }}>{d.y}</span>
                    <span style={{ color: '#8b5cf6' }}>{d.z}</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: d.survived ? '#4ade80' : '#f87171', fontWeight: 600 }}>
                    {d.reason}
                  </div>
                </div>
              </div>
              <div style={{
                color: d.survived ? '#4ade80' : '#f87171',
                padding: '4px 10px', borderRadius: 20, background: d.survived ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)', fontSize: '0.65rem', fontWeight: 800
              }}>
                {d.survived ? 'SURVIVOR' : 'FAILED'}
              </div>
            </motion.div>
          ))}
          {filteredReport.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: '#52525b', fontSize: '0.9rem' }}>
              No strategy matches current filters.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
