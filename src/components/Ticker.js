import React from 'react';

const items = [
  "ML MODEL · ENSEMBLE · XGBOOST · RANDOM FOREST",
  "TRAINING DATA: 1977–2021 · 11 ELECTION CYCLES",
  "PREDICTED WINNER: DMK · WIN PROBABILITY: 49.48%",
  "RUNNER-UP: AIADMK · 34.18% PROBABILITY",
  "TVK DEBUT ELECTION · ANALYST ESTIMATES ONLY",
  "MODEL AUC: 1.0000 · NOTE: SYNTHETIC DATA",
  "234 ASSEMBLY CONSTITUENCIES · TAMIL NADU",
  "தேர்தல் 2026 · ELECTION PREDICTION DASHBOARD",
];

export default function Ticker() {
  const repeated = [...items, ...items];
  return (
    <div style={{
      background: '#E84B3A',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      borderBottom: '1px solid rgba(255,255,255,0.15)',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{
        display: 'inline-block',
        animation: 'ticker 40s linear infinite',
        padding: '8px 0',
      }}>
        {repeated.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: '#fff',
            marginRight: '60px',
          }}>
            ◆ {item}
          </span>
        ))}
      </div>
    </div>
  );
}
