import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Cell,
} from 'recharts';
import { HISTORY, WIN_RATES } from '../data';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border2)',
      borderRadius: '8px', padding: '12px 16px',
      fontFamily: 'var(--font-mono)', fontSize: '11px',
    }}>
      <div style={{ color: 'var(--text1)', fontWeight: 500, marginBottom: '8px' }}>{label}</div>
      {payload.map(p => (
        <div key={p.name} style={{ color: p.color, marginBottom: '4px' }}>
          {p.name}: {p.value}%
        </div>
      ))}
    </div>
  );
};

const CAVEAT_ITEMS = [
  { num: '01', text: 'Synthetic data — no real per-constituency ECI dataset is embedded. Features are simulated from reported aggregate figures.' },
  { num: '02', text: 'Small sample — only 11 election cycles × 15 parties ≈ 120 rows. ML models overfit easily.' },
  { num: '03', text: 'TVK uncertainty — zero electoral history. Inputs are analyst estimates only.' },
  { num: '04', text: 'No coalition math — model predicts probability of a party leading, not seat-by-seat arithmetic.' },
];

export default function HistoryTab() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>
      {/* History bar chart */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        marginBottom: '28px',
        animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px',
        }}>HISTORICAL TN ELECTION VOTE SHARE — 1977 TO 2021</div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
          {[['DMK', '#E84B3A'], ['AIADMK', '#3B82F6']].map(([name, color]) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: color }}/>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text2)' }}>{name}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>
            ★ = Election winner
          </div>
        </div>

        <div style={{ height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={HISTORY} margin={{ top: 10, right: 0, bottom: 0, left: -20 }} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fill: '#556070', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#556070', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `${v}%`}
                domain={[0, 50]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
              <Bar dataKey="dmk"    name="DMK"    fill="#E84B3A" radius={[3,3,0,0]} />
              <Bar dataKey="aiadmk" name="AIADMK" fill="#3B82F6" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Winner timeline */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {HISTORY.map(h => (
            <div key={h.year} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              background: 'var(--bg3)',
              border: `1px solid ${h.winner === 'DMK' ? 'rgba(232,75,58,0.3)' : 'rgba(59,130,246,0.3)'}`,
              borderRadius: 'var(--radius-sm)',
              padding: '6px 10px',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>{h.year}</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 500,
                color: h.winner === 'DMK' ? '#E84B3A' : '#3B82F6',
              }}>★ {h.winner}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Win rate chart */}
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
        }}>HISTORICAL WIN RATE BY PARTY (1977–2021)</div>

        {WIN_RATES.map((item) => (
          <div key={item.party} style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: item.rate > 0 ? 'var(--text1)' : 'var(--text3)' }}>
                {item.party}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: item.rate > 0 ? item.color : 'var(--text3)' }}>
                {(item.rate * 100).toFixed(0)}%
              </span>
            </div>
            <div style={{ height: '8px', background: 'var(--bg3)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${item.rate * 100 / 0.545 * 100}%`,
                background: item.rate > 0 ? item.color : 'transparent',
                borderRadius: '4px',
                transition: 'width 1s cubic-bezier(0.22,1,0.36,1)',
              }}/>
            </div>
          </div>
        ))}
      </div>

      {/* Caveats */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        animation: 'fadeUp 0.5s 0.15s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px',
        }}>IMPORTANT CAVEATS</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {CAVEAT_ITEMS.map(c => (
            <div key={c.num} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '28px', color: 'var(--text3)',
                lineHeight: 1, flexShrink: 0, width: '32px',
              }}>{c.num}</span>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '14px',
                color: 'var(--text2)', lineHeight: 1.7, paddingTop: '4px',
              }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
