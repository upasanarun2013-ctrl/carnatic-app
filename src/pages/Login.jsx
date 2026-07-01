import { useState } from 'react'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    // Placeholder login — will connect to Firebase later
    onLogin({ name: 'Student A', email })
  }

  return (
    <div style={{ padding: '60px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16, background: '#EEF0FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, marginBottom: 16
      }}>🎶</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>Carnatic Practice</h1>
      <p style={{ color: '#999', fontSize: 14, margin: '0 0 36px' }}>Student companion</p>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="email"
          placeholder="Student ID or email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={inputStyle}
        />
        {error && <p style={{ color: '#e53e3e', fontSize: 13, margin: 0 }}>{error}</p>}
        <button onClick={handleSubmit} style={btnStyle}>Sign in</button>
        <p style={{ textAlign: 'center', color: '#4F6AF5', fontSize: 13, cursor: 'pointer', margin: 0 }}>
          Forgot password?
        </p>
      </div>
    </div>
  )
}

const inputStyle = {
  padding: '12px 14px', borderRadius: 10, border: '1px solid #e2e8f0',
  fontSize: 15, outline: 'none', width: '100%', boxSizing: 'border-box'
}

const btnStyle = {
  padding: '13px', borderRadius: 10, background: '#4F6AF5',
  color: '#fff', fontWeight: 600, fontSize: 15, border: 'none',
  cursor: 'pointer', width: '100%'
}