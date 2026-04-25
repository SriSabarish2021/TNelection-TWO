import React, { useState, useEffect } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from 'recharts';
import { PARTIES } from '../data';

function DetailRow({ label, value, accent }) {
  return (
    <div style={{
      padding: '14px 0',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', color: accent || 'var(--text1)' }}>
        {value}
      </span>
    </div>
  );
}

export default function PartiesTab({ selectedParty, onSelect }) {
  const p = PARTIES.find(x => x.name === selectedParty) || PARTIES[0];
  const age = 2026 - p.founded;

  const radarData = [
    { subject: 'Vote Share',    value: (p.vote / 55 * 100) },
    { subject: 'Alliance',      value: p.alliance * 100 },
    { subject: 'Anti-Incumb.',  value: (1 - p.anti) * 100 },
    { subject: 'Social Media',  value: p.social * 100 },
    { subject: 'Media Cover.',  value: p.media * 100 },
    { subject: 'Campaign $',    value: p.spend * 100 },
    { subject: 'Caste Factor',  value: p.caste * 100 },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>
      {/* Party selector */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '28px 32px',
        marginBottom: '24px',
        animation: 'fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)',
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px',
        }}>SELECT PARTY</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {PARTIES.map(party => (
            <button
              key={party.name}
              onClick={() => onSelect(party.name)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                border: `1px solid ${selectedParty === party.name ? party.color : 'var(--border)'}`,
                background: selectedParty === party.name ? `${party.color}20` : 'transparent',
                color: selectedParty === party.name ? party.color : 'var(--text2)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.05em',
              }}
            >
              {party.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '24px', alignItems: 'start' }}>
        {/* Left: detail panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Party hero */}
          <div style={{
            background: 'var(--surface)',
            border: `1px solid ${p.color}40`,
            borderRadius: 'var(--radius-xl)',
            padding: '28px 32px',
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeUp 0.5s 0.05s cubic-bezier(0.22,1,0.36,1) both',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0, width: '5px',
              background: p.color,
              borderRadius: '0 0 0 0',
            }}/>
            <div style={{ paddingLeft: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '6px' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '40px', color: p.color, lineHeight: 1 }}>
                  {p.name}
                </span>
                {p.name === 'DMK' && (
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '10px',
                    background: 'rgba(232,75,58,0.15)', color: '#E84B3A',
                    border: '1px solid rgba(232,75,58,0.35)',
                    borderRadius: '4px', padding: '3px 8px',
                  }}>★ PREDICTED WINNER</span>
                )}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text3)' }}>
                {p.full}
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '28px 32px',
            animation: 'fadeUp 0.5s 0.1s cubic-bezier(0.22,1,0.36,1) both',
          }}>
            <DetailRow label="Win Probability"  value={`${p.pct.toFixed(2)}%`} accent={p.color} />
            <DetailRow label="Vote Share Est."  value={`${p.vote}%`} />
            <DetailRow label="Alliance Bonus"   value={p.alliance.toFixed(2)} />
            <DetailRow label="Anti-Incumbency"  value={p.anti.toFixed(2)} />
            <DetailRow label="Social Media Idx" value={p.social.toFixed(2)} />
            <DetailRow label="Media Coverage"   value={p.media.toFixed(2)} />
            <DetailRow label="Caste Factor"     value={p.caste.toFixed(2)} />
            <DetailRow label="Welfare Schemes"  value={p.welfare} />
            <DetailRow label="Candidate Rep."   value={`${p.cand.toFixed(1)}/10`} />
            <DetailRow label="Campaign Spend"   value={p.spend.toFixed(2)} />
            <DetailRow label="Party Founded"    value={p.founded} />
            <DetailRow label="Party Age (2026)" value={`${age} yrs`} />
          </div>
        </div>

        {/* Right: Radar chart */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 24px',
          animation: 'fadeUp 0.5s 0.15s cubic-bezier(0.22,1,0.36,1) both',
        }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text3)',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px',
          }}>FACTOR RADAR — {p.name}</div>

          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius={110}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#556070', fontSize: 10, fontFamily: 'DM Mono, monospace' }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name={p.name}
                  dataKey="value"
                  stroke={p.color}
                  fill={p.color}
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip
                  formatter={(v) => [`${v.toFixed(1)}`, 'Score']}
                  contentStyle={{
                    background: 'var(--bg2)', border: '1px solid var(--border2)',
                    borderRadius: '8px', fontFamily: 'DM Mono, monospace', fontSize: '11px',
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Factor breakdown bars */}
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {radarData.map(item => (
              <div key={item.subject}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text3)' }}>{item.subject}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: p.color }}>{item.value.toFixed(0)}</span>
                </div>
                <div style={{ height: '3px', background: 'var(--bg3)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${item.value}%`,
                    background: p.color,
                    borderRadius: '2px',
                    transition: 'width 0.8s cubic-bezier(0.22,1,0.36,1)',
                  }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
