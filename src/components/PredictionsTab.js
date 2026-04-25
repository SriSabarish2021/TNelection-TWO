import React, { useEffect, useRef, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { PARTIES } from '../data';

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
        background: accent || 'var(--accent)',
      }}/>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text3)', letterSpacing: '0.1em', marginBottom: '8px', textTransform: 'uppercase' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: accent || 'var(--text1)', lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text3)', marginTop: '6px' }}>{sub}</div>}
    </div>
  );
}

function AnimatedBar({ party, maxPct, delay, onSelect }) {
  const [width, setWidth] = useState(0);
  const target = (party.pct / maxPct * 100);

  useEffect(() => {
    const t = setTimeout(() => setWidth(target), delay);
    return () => clearTimeout(t);
  }, [target, delay]);

  return (
    <div
      onClick={onSelect}
      style={{ cursor: 'pointer', marginBottom: '14px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: party.color, flexShrink: 0 }}/>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--text1)' }}>
            {party.name}
          </span>
          {party.name === 'DMK' && (
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '10px',
              background: 'rgba(232,75,58,0.15)', color: '#E84B3A',
              border: '1px solid rgba(232,75,58,0.3)',
              borderRadius: '4px', padding: '1px 7px',
            }}>★ WINNER</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: party.color }}>
            {party.pct.toFixed(1)}%
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text3)' }}>
            ~{party.vote}% vote share
          </span>
        </div>
      </div>
      <div style={{
        height: '10px',
        background: 'var(--bg3)',
        borderRadius: '5px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          width: `${width}%`,
          background: `linear-gradient(90deg, ${party.color}cc, ${party.color})`,
          borderRadius: '5px',
          transition: 'width 1s cubic-bezier(0.22, 1, 0.36, 1)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 60%, rgba(255,255,255,0.15))',
          }}/>
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div style={{
      background: 'var(--bg2)', border: '1px solid var(--border2)',
      borderRadius: 'var(--radius-md)', padding: '10px 14px',
      fontFamily: 'var(--font-mono)', fontSize: '12px',
    }}>
      <div style={{ color: p.payload.color, fontWeight: 500, marginBottom: '4px' }}>{p.name}</div>
      <div style={{ color: 'var(--text1)' }}>{p.value.toFixed(2)}% probability</div>
    </div>
  );
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.04) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 500 }}>
      {name}
    </text>
  );
};

export default function PredictionsTab({ onPartySelect }) {
  const maxPct = PARTIES[0].pct;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>
      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '48px',
        animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <StatCard label="Predicted Winner" value="DMK" sub="Dravida Munnetra Kazhagam" accent="#E84B3A" />
        <StatCard label="Win Probability" value="49.5%" sub="Ensemble model output" accent="#E84B3A" />
        <StatCard label="Runner Up" value="AIADMK" sub="34.2% probability" accent="#3B82F6" />
        <StatCard label="Parties Modelled" value="8" sub="Across major alliances" accent="#8B5CF6" />
        <StatCard label="Model Accuracy" value="100%" sub="Test set (synthetic data)" accent="#10B981" />
      </div>
     
      {window.innerWidth >= 600 ?(
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }}>
        {/* Party bars */}
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
          }}>
            2026 WIN PROBABILITY — ALL PARTIES
          </div>
          {PARTIES.map((p, i) => (
            <AnimatedBar
              key={p.name}
              party={p}
              maxPct={maxPct}
              delay={200 + i * 80}
              onSelect={() => onPartySelect(p.name)}
            />
          ))}
          <div style={{
            marginTop: '20px',
            padding: '14px 16px',
            background: 'rgba(232,75,58,0.06)',
            border: '1px solid rgba(232,75,58,0.15)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text2)',
            lineHeight: 1.6,
          }}>
            ℹ️ Click any party bar to view detailed analysis in the Party Detail tab.
          </div>
        </div>

        {/* Donut + legend */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '16px',
          animation: 'fadeUp 0.5s 0.2s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px',
            }}>PROBABILITY DISTRIBUTION</div>

            {/* Center label for donut */}
            <div style={{ position: 'relative', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PARTIES}
                    dataKey="pct"
                    nameKey="name"
                    cx="50%" cy="50%"
                    innerRadius={75}
                    outerRadius={115}
                    paddingAngle={2}
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {PARTIES.map(p => (
                      <Cell key={p.name} fill={p.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center text */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center', pointerEvents: 'none',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#E84B3A', lineHeight: 1 }}>DMK</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', marginTop: '4px' }}>LEADS</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              {PARTIES.map(p => (
                <div key={p.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: p.color }}/>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text2)' }}>{p.name}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: p.color, fontWeight: 500 }}>
                    {p.pct.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>):(
      <div style={{ display: 'flex', flexDirection:'column', gap: '32px', alignItems: 'center' , justifyContent:'center'}}>
        {/* Party bars */}
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
          }}>
            2026 WIN PROBABILITY — ALL PARTIES
          </div>
          {PARTIES.map((p, i) => (
            <AnimatedBar
              key={p.name}
              party={p}
              maxPct={maxPct}
              delay={200 + i * 80}
              onSelect={() => onPartySelect(p.name)}
            />
          ))}
          <div style={{
            marginTop: '20px',
            padding: '14px 16px',
            background: 'rgba(232,75,58,0.06)',
            border: '1px solid rgba(232,75,58,0.15)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text2)',
            lineHeight: 1.6,
          }}>
            ℹ️ Click any party bar to view detailed analysis in the Party Detail tab.
          </div>
        </div>

        {/* Donut + legend */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '16px',
          animation: 'fadeUp 0.5s 0.2s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)',
              letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px',
            }}>PROBABILITY DISTRIBUTION</div>

            {/* Center label for donut */}
            <div style={{ position: 'relative', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PARTIES}
                    dataKey="pct"
                    nameKey="name"
                    cx="50%" cy="50%"
                    innerRadius={75}
                    outerRadius={115}
                    paddingAngle={2}
                    labelLine={false}
                    label={renderCustomLabel}
                  >
                    {PARTIES.map(p => (
                      <Cell key={p.name} fill={p.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center text */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center', pointerEvents: 'none',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#E84B3A', lineHeight: 1 }}>DMK</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)', marginTop: '4px' }}>LEADS</div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              {PARTIES.map(p => (
                <div key={p.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: p.color }}/>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text2)' }}>{p.name}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: p.color, fontWeight: 500 }}>
                    {p.pct.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      
      </div>)}
    </div>
  );
}
