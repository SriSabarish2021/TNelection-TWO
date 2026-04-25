import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px',
      marginTop: '40px',
      background: 'var(--bg2)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--text1)', letterSpacing: '0.05em' }}>
            TN <span style={{ color: '#E84B3A' }}>2026</span> ELECTION PREDICTOR
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', marginTop: '4px' }}>
            ML MODEL · SYNTHETIC DATA · FOR EDUCATIONAL USE ONLY
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', textAlign: 'right', lineHeight: 1.6 }}>
          <div>Ensemble · XGBoost · Random Forest</div>
          <div>Training: 1977–2021 · 8 parties</div>
          <div style={{ fontFamily: 'var(--font-tamil)', fontSize: '13px', color: 'var(--text2)', marginTop: '4px' }}>
            தேர்தல் முன்கணிப்பு<br/>
            Not an official forecast · Educational purpose only<br/>
            Copyright ©️ by Sri Sabarish 
          </div>
        </div>
      </div>
    </footer>
  );
}
