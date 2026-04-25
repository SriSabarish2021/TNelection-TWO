import React from 'react';

export default function Header() {
  return (
    <header style={{
      position: 'relative',
      overflow: 'hidden',
      padding: '60px 32px 48px',
      borderBottom: '1px solid var(--border2)',
    }}>
      {/* Geometric background decoration */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(232,75,58,0.18) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}>
        {/* Big number backdrop */}
        <div style={{
          position: 'absolute', top: '50%', right: '-20px',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(160px, 20vw, 320px)',
          color: 'rgba(255,255,255,0.025)',
          lineHeight: 1, userSelect: 'none',
          letterSpacing: '-0.02em',
        }}>2026</div>
        {/* Grid lines */}
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.04 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
        {/* Scan line */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(232,75,58,0.4), transparent)',
          animation: 'scanline 6s linear infinite',
          pointerEvents: 'none',
        }}/>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top label row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '20px', flexWrap: 'wrap',
        }}>
          <div style={{
            background: '#E84B3A',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            padding: '4px 10px',
            borderRadius: '3px',
          }}>LIVE MODEL</div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text3)',
            letterSpacing: '0.1em',
          }}>ENSEMBLE · XGBOOST · RANDOM FOREST · 1977–2021</div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%',
              background: '#10B981',
              animation: 'dotPulse 2s ease-in-out infinite',
            }}/>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#10B981' }}>
              MODEL READY
            </span>
          </div>
        </div>

        {/* Main title */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(42px, 7vw, 88px)',
          letterSpacing: '0.02em',
          lineHeight: 0.95,
          color: 'var(--text1)',
          marginBottom: '12px',
          animation: 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          TAMIL NADU{' '}
          <span style={{
            color: '#E84B3A',
            WebkitTextStroke: '0px',
          }}>2026</span>
          <br />
          <span style={{
            fontFamily: 'var(--font-tamil)',
            fontWeight: 400,
            fontSize: '0.48em',
            color: 'var(--text2)',
            letterSpacing: '0.05em',
          }}>தேர்தல் முன்கணிப்பு</span>
        </h1>

        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '15px',
          color: 'var(--text2)',
          fontWeight: 400,
          maxWidth: '560px',
          lineHeight: 1.6,
          animation: 'fadeUp 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          Machine learning win-probability dashboard for the Tamil Nadu Assembly Election.
          Trained on historical data from 1977–2021 across 8 major parties.
        </p>

        {/* Stat pills */}
        <div style={{
          display: 'flex', gap: '10px', marginTop: '28px', flexWrap: 'wrap',
          animation: 'fadeUp 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          {[
            { val: '234', label: 'Constituencies' },
            { val: '8',   label: 'Parties Modelled' },
            { val: '11',  label: 'Election Cycles' },
            { val: '1.00',label: 'Test AUC' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 18px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                color: 'var(--text1)',
                lineHeight: 1,
              }}>{s.val}</span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                color: 'var(--text3)',
                letterSpacing: '0.08em',
                marginTop: '3px',
              }}>{s.label.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
