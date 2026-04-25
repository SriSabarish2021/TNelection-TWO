import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';
import { FEATURES, CORR } from '../data';

const corrColor = (r) => {
  if (r > 0.6) return '#E84B3A';
  if (r > 0.3) return '#F97316';
  if (r > 0)   return '#F59E0B';
  return '#6B7280';
};

export default function FeaturesTab() {
  const maxScore = FEATURES[0].score;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>
      {/* Feature importance grid */}
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)',
        letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px',
        animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both',
      }}>RANDOM FOREST — TOP 10 FEATURE IMPORTANCES</div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '12px',
        marginBottom: '48px',
        animation: 'fadeUp 0.5s 0.05s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        {FEATURES.map((f, i) => {
          const pct = (f.score / maxScore * 100);
          const hue = Math.floor(i / FEATURES.length * 60); // warm range
          const barColor = i === 0 ? '#E84B3A' : i < 3 ? '#F97316' : i < 6 ? '#F59E0B' : '#6B7280';
          return (
            <div key={f.name} style={{
              background: 'var(--surface)',
              border: `1px solid var(--border)`,
              borderRadius: 'var(--radius-lg)',
              padding: '18px 20px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = barColor;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', marginBottom: '6px' }}>
                #{i + 1}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, color: 'var(--text1)', marginBottom: '12px', lineHeight: 1.4, minHeight: '36px' }}>
                {f.name}
              </div>
              <div style={{ height: '4px', background: 'var(--bg3)', borderRadius: '2px', overflow: 'hidden', marginBottom: '8px' }}>
                <div style={{
                  height: '100%',
                  width: `${pct}%`,
                  background: barColor,
                  borderRadius: '2px',
                }}/>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: barColor }}>
                {f.score.toFixed(4)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Correlation chart */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        animation: 'fadeUp 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px',
        }}>CORRELATION WITH WINNING — POINT-BISERIAL r</div>

        {CORR.map(item => (
          <div key={item.name} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text2)', fontWeight: 400 }}>
                {item.name}
              </span>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '18px',
                color: corrColor(item.r),
              }}>
                {item.r > 0 ? '+' : ''}{item.r.toFixed(4)}
              </span>
            </div>
            <div style={{
              height: '8px',
              background: 'var(--bg3)',
              borderRadius: '4px',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                height: '100%',
                width: `${Math.abs(item.r) * 100}%`,
                background: corrColor(item.r),
                borderRadius: '4px',
                transition: 'width 1s cubic-bezier(0.22,1,0.36,1)',
                marginLeft: item.r < 0 ? 'auto' : '0',
              }}/>
            </div>
          </div>
        ))}

        <div style={{
          marginTop: '20px',
          padding: '14px 16px',
          background: 'rgba(245,158,11,0.06)',
          border: '1px solid rgba(245,158,11,0.2)',
          borderRadius: 'var(--radius-md)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--text2)',
          lineHeight: 1.6,
        }}>
          Welfare schemes and media coverage show the strongest correlation (r ≈ 0.84) with winning, followed by vote share and seat share.
        </div>
      </div>
    </div>
  );
}
