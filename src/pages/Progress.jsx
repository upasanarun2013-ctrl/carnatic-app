const DAYS = [
  { day: 'Mon', mins: 18 },
  { day: 'Tue', mins: 24 },
  { day: 'Wed', mins: 12 },
  { day: 'Thu', mins: 27 },
  { day: 'Fri', mins: 9  },
  { day: 'Sat', mins: 20 },
  { day: 'Sun', mins: 0  },
]

const LEADERBOARD = [
  { name: 'Student B', mins: 142, initials: 'SB' },
  { name: 'Student C', mins: 118, initials: 'SC' },
  { name: 'You',       mins: 90,  initials: 'SA', isYou: true },
  { name: 'Student D', mins: 76,  initials: 'SD' },
]

const MAX = Math.max(...DAYS.map(d => d.mins))

export default function Progress() {
  return (
    <div style={{ padding: '48px 20px 90px' }}>
      <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700 }}>This week</h2>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100, marginBottom: 8 }}>
        {DAYS.map(d => (
          <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: '100%', background: d.mins ? '#4F6AF5' : '#F0F0F0', borderRadius: 6,
              height: MAX ? `${(d.mins / MAX) * 80}px` : 4, minHeight: 4, transition: 'height 0.3s'
            }}/>
            <span style={{ fontSize: 10, color: '#999' }}>{d.day}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
        {DAYS.map(d => (
          <div key={d.day} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: '#bbb' }}>
            {d.mins ? `${d.mins}m` : '–'}
          </div>
        ))}
      </div>

      <h3 style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 700 }}>Leaderboard — practice time</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {LEADERBOARD.map((s, i) => (
          <div key={s.name} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
            borderRadius: 12, background: s.isYou ? '#EEF0FF' : '#F8F8F8',
            border: s.isYou ? '1px solid #C7D0FF' : '1px solid transparent'
          }}>
            <span style={{ width: 18, color: '#999', fontSize: 13, fontWeight: 600 }}>{i + 1}</span>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', background: s.isYou ? '#4F6AF5' : '#E0E0E0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700, color: s.isYou ? '#fff' : '#666'
            }}>{s.initials}</div>
            <span style={{ flex: 1, fontWeight: s.isYou ? 700 : 500, color: s.isYou ? '#4F6AF5' : '#333' }}>
              {s.name}
            </span>
            <span style={{ fontWeight: 700, color: s.isYou ? '#4F6AF5' : '#555', fontSize: 14 }}>
              {s.mins} min
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}