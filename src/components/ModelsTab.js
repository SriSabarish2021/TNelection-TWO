import React from 'react';
import { MODELS } from '../data';

function Pill({ children, type }) {
  const styles = {
    best:    { bg: 'rgba(232,75,58,0.15)',  color: '#E84B3A',  border: 'rgba(232,75,58,0.3)' },
    trained: { bg: 'rgba(16,185,129,0.12)', color: '#10B981',  border: 'rgba(16,185,129,0.3)' },
  };
  const s = styles[type] || styles.trained;
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
      background: s.bg, color: s.color,
      border: `1px solid ${s.border}`,
      borderRadius: '4px', padding: '2px 8px',
    }}>{children}</span>
  );
}

const XGBOOST_PARAMS = [
  { label: 'learning_rate',  value: '0.03' },
  { label: 'max_depth',      value: '4' },
  { label: 'n_estimators',   value: '200' },
  { label: 'subsample',      value: '0.8' },
  { label: 'Best CV AUC',    value: '1.0000' },
  { label: 'Tuned Test AUC', value: '1.0000' },
];

export default function ModelsTab() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>
      {/* Models table */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        marginBottom: '28px',
        animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both',
        overflowX: 'auto',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px',
        }}>ALL MODELS — CV AUC AND TEST ACCURACY</div>

        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '520px' }}>
          <thead>
            <tr>
              {['Model', 'CV AUC', 'Test AUC', 'Test Acc', 'Status'].map(h => (
                <th key={h} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: 'var(--text3)', fontWeight: 400,
                  padding: '0 0 12px 0', textAlign: 'left',
                  borderBottom: '1px solid var(--border)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m, i) => (
              <tr key={m.name} style={{
                background: m.best ? 'rgba(232,75,58,0.04)' : 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => !m.best && (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
              onMouseLeave={e => !m.best && (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px',
                  fontWeight: m.best ? 600 : 400,
                  color: m.best ? 'var(--text1)' : 'var(--text2)',
                  padding: '14px 0', borderBottom: i < MODELS.length - 1 ? '1px solid var(--border)' : 'none',
                }}>{m.name}</td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text2)', padding: '14px 0', borderBottom: i < MODELS.length - 1 ? '1px solid var(--border)' : 'none' }}>{m.cv}</td>
                <td style={{ padding: '14px 0', borderBottom: i < MODELS.length - 1 ? '1px solid var(--border)' : 'none' }}><Pill type="best">{m.testAuc}</Pill></td>
                <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text2)', padding: '14px 0', borderBottom: i < MODELS.length - 1 ? '1px solid var(--border)' : 'none' }}>{m.testAcc}</td>
                <td style={{ padding: '14px 0', borderBottom: i < MODELS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <Pill type={m.best ? 'best' : 'trained'}>{m.best ? 'Best Single' : m.name.includes('Ensemble') ? 'Voting' : 'Trained'}</Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* XGBoost hyperparams */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        marginBottom: '28px',
        animation: 'fadeUp 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px',
        }}>XGBOOST BEST HYPERPARAMETERS</div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px',
        }}>
          {XGBOOST_PARAMS.map(p => (
            <div key={p.label} style={{
              background: 'var(--bg3)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 18px',
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {p.label}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--text1)' }}>
                {p.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caveat box */}
      <div style={{
        background: 'rgba(245,158,11,0.06)',
        border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px 28px',
        animation: 'fadeUp 0.5s 0.15s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#F59E0B',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px',
        }}>⚠ WHY AUC = 1.0 EVERYWHERE?</div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text2)', lineHeight: 1.7 }}>
          With only ~101 synthetic rows and very strong label-leaking features (<code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#F59E0B' }}>vote_share</code>, <code style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#F59E0B' }}>welfare_scheme</code>), all models achieve perfect separation.
          This is a <strong style={{ color: 'var(--text1)' }}>data artifact</strong>, not a sign the model generalises well to real elections.
          Real-world accuracy will be substantially lower. Replace synthetic data with actual ECI/TCPD CSVs to get meaningful metrics.
        </p>
      </div>
    </div>
  );
}
