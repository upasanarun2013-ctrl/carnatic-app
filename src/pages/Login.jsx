import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

export default function Login({ onLogin }) {
  const [mode, setMode]       = useState('login') // 'login' or 'signup'
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true); setError('')
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      onLogin({ name: result.user.email, email: result.user.email, uid: result.user.uid })
    } catch (err) {
      if (err.code === 'auth/invalid-credential') setError('Incorrect email or password.')
      else if (err.code === 'auth/too-many-requests') setError('Too many attempts. Try again later.')
      else setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const handleSignup = async () => {
    if (!name || !email || !password || !confirm) { setError('Please fill in all fields'); return }
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true); setError('')
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      // Save profile to Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        name,
        email,
        role: 'student',
      })
      onLogin({ name, email, uid: result.user.uid })
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setError('An account with this email already exists.')
      else if (err.code === 'auth/invalid-email') setError('Please enter a valid email.')
      else setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '60px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{
        width: 56, height: 56, borderRadius: 16, background: '#EEF0FF',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 28, marginBottom: 16
      }}>🎶</div>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px' }}>Carnatic Practice</h1>
      <p style={{ color: '#999', fontSize: 14, margin: '0 0 24px' }}>Student companion</p>

      {/* Mode toggle */}
      <div style={{ display: 'flex', background: '#F0F0F0', borderRadius: 12, padding: 4, marginBottom: 24, width: '100%', gap: 4 }}>
        {['login', 'signup'].map(m => (
          <button key={m} onClick={() => { setMode(m); setError('') }} style={{
            flex: 1, padding: '8px', borderRadius: 9, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: mode === m ? 700 : 400,
            background: mode === m ? '#fff' : 'transparent',
            color: mode === m ? '#4F6AF5' : '#888',
            boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          }}>{m === 'login' ? 'Sign in' : 'Sign up'}</button>
        ))}
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {mode === 'signup' && (
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={inputStyle}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPass(e.target.value)}
          style={inputStyle}
        />
        {mode === 'signup' && (
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            style={inputStyle}
          />
        )}
        {error && <p style={{ color: '#e53e3e', fontSize: 13, margin: 0 }}>{error}</p>}
        <button
          onClick={mode === 'login' ? handleLogin : handleSignup}
          disabled={loading}
          style={{ ...btnStyle, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? (mode === 'login' ? 'Signing in...' : 'Creating account...') : (mode === 'login' ? 'Sign in' : 'Create account')}
        </button>
        {mode === 'login' && (
          <p style={{ textAlign: 'center', color: '#4F6AF5', fontSize: 13, cursor: 'pointer', margin: 0 }}>
            Forgot password?
          </p>
        )}
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