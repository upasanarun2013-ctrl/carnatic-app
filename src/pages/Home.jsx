export default function Home({ user, navigate }) {
  const stats = [
    { label: 'mins today', value: 24 },
    { label: 'day streak', value: 5 },
    { label: 'rank', value: '#3' },
  ]

  return (
    <div style={{ padding: '48px 20px 90px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <p style={{ color: '#999', fontSize: 13, margin: 0 }}>Good morning</p>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{user?.name ?? 'Student'} 👋</h2>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: '50%', background: '#EEF0FF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, color: '#4F6AF5', fontSize: 14
        }}>SA</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{
            background: '#F8F9FF', borderRadius: 12, padding: '14px 8px', textAlign: 'center'
          }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#4F6AF5' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Quick actions</p>
      <button onClick={() => navigate('upload')} style={{ ...btnStyle, background: '#4F6AF5', color: '#fff', marginBottom: 10 }}>
        🎙️ Record practice
      </button>
      <button onClick={() => navigate('songs')} style={{ ...btnStyle, background: '#EEF0FF', color: '#4F6AF5' }}>
        🎵 View songs
      </button>
    </div>
  )
}

const btnStyle = {
  width: '100%', padding: '14px', borderRadius: 12, border: 'none',
  fontWeight: 600, fontSize: 15, cursor: 'pointer', display: 'block'
}