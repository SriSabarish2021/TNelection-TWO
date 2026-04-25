import React from 'react';

const TABS = [
  { id: 'predictions', label: 'Predictions' },
  { id: 'parties',     label: 'Party Detail' },
  { id: 'features',    label: 'Feature Importance' },
  { id: 'models',      label: 'Model Performance' },
  { id: 'history',     label: 'Historical Wins' },
];

export default function NavTabs({ active, onChange }) {
  return (
    <nav style={{
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg2)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 32px',
        display: 'flex',
        gap: '0',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '16px',
              fontWeight: active === tab.id ? 600 : 400,
              padding: '16px 20px',
              border: 'none',
              background: 'none',
              color: active === tab.id ? 'var(--text1)' : 'var(--text3)',
              cursor: 'pointer',
              borderBottom: active === tab.id ? '2px solid #E84B3A' : '2px solid transparent',
              marginBottom: '-1px',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s, border-color 0.2s',
              letterSpacing: '0.01em',
            }}
            onMouseEnter={e => { if (active !== tab.id) e.target.style.color = 'var(--text2)'; }}
            onMouseLeave={e => { if (active !== tab.id) e.target.style.color = 'var(--text3)'; }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
