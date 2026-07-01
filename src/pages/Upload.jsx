import { useState } from 'react'

const SONGS = ['Song 1', 'Song 2', 'Song 3', 'Song 4', 'Song 5']
const TYPES = ['Alankaram', 'Varnam', 'Kriti']

export default function Upload() {
  const [type, setType]       = useState('Alankaram')
  const [song, setSong]       = useState(SONGS[0])
  const [submitted, setSubmit] = useState(false)

  const handleSubmit = () => {
    setSubmit(true)
    setTimeout(() => setSubmit(false), 3000)
  }

  return (
    <div style={{ padding: '48px 20px 90px' }}>
      <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 700 }}>Upload practice</h2>

      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Song type</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {TYPES.map(t => (
          <button key={t} onClick={() => setType(t)} style={{
            flex: 1, padding: '10px 4px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 13,
            background: type === t ? '#4F6AF5' : '#F0F0F0',
            color: type === t ? '#fff' : '#666',
            fontWeight: type === t ? 600 : 400,
          }}>{t}</button>
        ))}
      </div>

      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Select song</p>
      <select value={song} onChange={e => setSong(e.target.value)} style={{
        width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid #e2e8f0',
        fontSize: 15, marginBottom: 24, background: '#fff', appearance: 'auto'
      }}>
        {SONGS.map(s => <option key={s}>{s}</option>)}
      </select>

      <div style={{
        border: '2px dashed #C7D0FF', borderRadius: 16, padding: '36px 20px',
        textAlign: 'center', marginBottom: 24, background: '#F8F9FF'
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🎙️</div>
        <p style={{ fontWeight: 600, margin: '0 0 4px' }}>Record or upload</p>
        <p style={{ color: '#999', fontSize: 13, margin: 0 }}>Max 2 minutes · audio only</p>
      </div>

      {submitted
        ? <div style={{ background: '#E6F7EE', color: '#2D9E5F', borderRadius: 10, padding: 14, textAlign: 'center', fontWeight: 600 }}>
            Clip submitted!
          </div>
        : <button onClick={handleSubmit} style={{
            width: '100%', padding: 14, borderRadius: 12, background: '#4F6AF5',
            color: '#fff', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer'
          }}>Submit clip</button>
      }
    </div>
  )
}