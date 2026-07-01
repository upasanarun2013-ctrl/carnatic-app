const DAYS = [
  { day: 'Mon', mins: 18 },
  { day: 'Tue', mins: 24 },
  { day: 'Wed', mins: 12 },
  { day: 'Thu', mins: 27 },
  { day: 'Fri', mins: 9  },
  { day: 'Sat', mins: 20 },
  { day: 'Sun', mins: 0  },
]

const MAX = Math.max(...DAYS.map(d => d.mins))

const FEEDBACK = [
  {
    id: 1,
    from: 'TA Priya',
    message: 'Great improvement on the Madhyamavati phrases this week! Keep focusing on the gamakams.',
    time: 'Today, 10:00 AM',
    avatar: '👩‍🏫',
  },
  {
    id: 2,
    from: 'Guru',
    message: 'Excellent dedication this week. The Varnam upload was very clean.',
    time: 'Yesterday, 5:00 PM',
    avatar: '🧑‍🏫',
  },
]

export default function Parent() {
  return (
    <div style={{ padding: '48px 20px 90px' }}>

      {/* Student card */}
      <div style={{
        background: '#EEF0FF', borderRadius: 16, padding: '16px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 14
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: '50%', background: '#4F6AF5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#fff', fontWeight: 700
        }}>🎵</div>
        <div>
          <div style={{ fontSize: 11, color: '#4F6AF5', fontWeight: 600, marginBottom: 2 }}>Viewing progress for</div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Your Child</div>
          <div style={{ fontSize: 12, color: '#888' }}>Student · Active this week</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
        {[
          { label: 'mins this week', value: 110 },
          { label: 'day streak',     value: 5   },
          { label: 'clips uploaded', value: 3   },
        ].map(s => (
          <div key={s.label} style={{
            background: '#F8F9FF', borderRadius: 12, padding: '14px 8px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#4F6AF5' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly chart */}
      <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>This week's practice</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 90, marginBottom: 6 }}>
        {DAYS.map(d => (
          <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: '100%', background: d.mins ? '#4F6AF5' : '#F0F0F0', borderRadius: 6,
              height: MAX ? `${(d.mins / MAX) * 75}px` : 4, minHeight: 4
            }}/>
            <span style={{ fontSize: 10, color: '#999' }}>{d.day}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginBottom: 28 }}>
        {DAYS.map(d => (
          <div key={d.day} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: '#bbb' }}>
            {d.mins ? `${d.mins}m` : '–'}
          </div>
        ))}
      </div>

      {/* Feedback */}
      <h3 style={{ margin: '0 0 12px', fontSize: 15, fontWeight: 700 }}>Feedback from teachers</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FEEDBACK.map(f => (
          <div key={f.id} style={{
            background: '#F8F9FF', border: '1px solid #E8EAFF', borderRadius: 14, padding: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 22 }}>{f.avatar}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{f.from}</div>
                <div style={{ fontSize: 11, color: '#aaa' }}>{f.time}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#444', lineHeight: 1.5 }}>{f.message}</div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 20, background: '#FFF4E6', border: '1px solid #FFD9A0',
        borderRadius: 12, padding: '12px 14px', fontSize: 13, color: '#C97A20'
      }}>
        👀 This is a read-only view. Only your child can upload clips or interact with teachers.
      </div>
    </div>
  )
}