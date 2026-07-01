import { useState } from 'react'

const TABS = ['Practice Time', 'Versatility', 'Consistency']

const DATA = {
  'Practice Time': [
    { name: 'Player 1', value: 142, unit: 'min', initials: '🎵' },
    { name: 'Player 2', value: 118, unit: 'min', initials: '🎵' },
    { name: 'You',      value: 90,  unit: 'min', initials: '🎵', isYou: true },
    { name: 'Player 4', value: 76,  unit: 'min', initials: '🎵' },
    { name: 'Player 5', value: 54,  unit: 'min', initials: '🎵' },
  ],
  'Versatility': [
    // Points for practicing across Alankaram, Varnam, Kriti
    { name: 'Player 2', value: 3, unit: 'categories', initials: '🎵', badge: '🏅 All 3' },
    { name: 'You',      value: 3, unit: 'categories', initials: '🎵', isYou: true, badge: '🏅 All 3' },
    { name: 'Player 1', value: 2, unit: 'categories', initials: '🎵', badge: '⭐ 2 types' },
    { name: 'Player 4', value: 1, unit: 'categories', initials: '🎵', badge: '1 type' },
    { name: 'Player 5', value: 1, unit: 'categories', initials: '🎵', badge: '1 type' },
  ],
  'Consistency': [
    // Days practiced this week
    { name: 'Player 1', value: 7, unit: 'days', initials: '🎵', badge: '🔥 Perfect week' },
    { name: 'Player 2', value: 6, unit: 'days', initials: '🎵', badge: '⭐ 6 days' },
    { name: 'You',      value: 5, unit: 'days', initials: '🎵', isYou: true, badge: '5 days' },
    { name: 'Player 4', value: 4, unit: 'days', initials: '🎵', badge: '4 days' },
    { name: 'Player 5', value: 2, unit: 'days', initials: '🎵', badge: '2 days' },
  ],
}

const MEDALS = ['🥇', '🥈', '🥉']

const DESCRIPTIONS = {
  'Practice Time': 'Total minutes practiced this week',
  'Versatility':   'Points for practicing Alankaram, Varnam & Kriti',
  'Consistency':   'Number of days practiced this week',
}

export default function Leaderboard() {
  const [tab, setTab] = useState('Practice Time')
  const rows = DATA[tab]

  return (
    <div style={{ padding: '48px 20px 90px' }}>
      <h2 style={{ margin: '0 0 6px', fontSize: 20, fontWeight: 700 }}>Leaderboard</h2>
      <p style={{ color: '#999', fontSize: 13, margin: '0 0 20px' }}>{DESCRIPTIONS[tab]}</p>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F0F0F0', borderRadius: 12, padding: 4, marginBottom: 24, gap: 4 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '8px 4px', borderRadius: 9, border: 'none', cursor: 'pointer',
            fontSize: 12, fontWeight: tab === t ? 700 : 400,
            background: tab === t ? '#fff' : 'transparent',
            color: tab === t ? '#4F6AF5' : '#888',
            boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
            transition: 'all 0.15s'
          }}>{t}</button>
        ))}
      </div>

      {/* Top 3 podium */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 12, marginBottom: 28 }}>
        {[rows[1], rows[0], rows[2]].map((s, i) => {
          if (!s) return <div key={i} style={{ flex: 1 }} />
          const heights = [80, 100, 60]
          const realRank = i === 0 ? 1 : i === 1 ? 0 : 2
          return (
            <div key={s.name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: s.isYou ? '#4F6AF5' : '#555' }}>
                {s.isYou ? 'You' : s.name}
              </div>
              <div style={{ fontSize: 20 }}>{MEDALS[realRank]}</div>
              <div style={{
                width: '100%', borderRadius: '8px 8px 0 0',
                height: heights[i], background: s.isYou ? '#4F6AF5' : realRank === 0 ? '#F5C842' : '#E0E0E0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexDirection: 'column', color: realRank === 0 || s.isYou ? '#fff' : '#555'
              }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{s.value}</div>
                <div style={{ fontSize: 9 }}>{s.unit}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Full list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((s, i) => (
          <div key={s.name} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
            borderRadius: 12,
            background: s.isYou ? '#EEF0FF' : '#F8F8F8',
            border: s.isYou ? '1px solid #C7D0FF' : '1px solid transparent'
          }}>
            <span style={{ width: 24, fontSize: i < 3 ? 18 : 13, textAlign: 'center' }}>
              {i < 3 ? MEDALS[i] : i + 1}
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: s.isYou ? 700 : 500, color: s.isYou ? '#4F6AF5' : '#333', fontSize: 14 }}>
                {s.isYou ? 'You' : s.name}
              </div>
              {s.badge && <div style={{ fontSize: 11, color: '#999', marginTop: 1 }}>{s.badge}</div>}
            </div>
            <span style={{ fontWeight: 700, color: s.isYou ? '#4F6AF5' : '#555', fontSize: 14 }}>
              {s.value} <span style={{ fontWeight: 400, fontSize: 11, color: '#aaa' }}>{s.unit}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}