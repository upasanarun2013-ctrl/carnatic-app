import { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db, pruneOldAudio } from './firebase'
import Login from './pages/Login'
import Home from './pages/Home'
import Songs from './pages/Songs'
import Upload from './pages/Upload'
import Progress from './pages/Progress'
import Leaderboard from './pages/Leaderboard'
import Challenges from './pages/Challenges'
import Messages from './pages/Messages'
import Parent from './pages/Parent'
import './App.css'

export default function App() {
  const [page, setPage] = useState('login')
  const [user, setUser] = useState(null)

  const navigate = (p) => setPage(p)

  const handleLogin = async (userData) => {
    try {
      const docRef = doc(db, 'users', userData.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setUser({ ...userData, name: docSnap.data().name, role: docSnap.data().role })
      pruneOldAudio(userData.uid)
      } else {
        setUser({ ...userData, name: userData.email })
      }
    } catch {
      setUser({ ...userData, name: userData.email })
    }
    setPage('home')
  }

  const renderPage = () => {
    switch (page) {
      case 'login':       return <Login onLogin={handleLogin} />
      case 'home':        return <Home user={user} navigate={navigate} />
      case 'songs':       return <Songs navigate={navigate} />
      case 'upload':      return <Upload navigate={navigate} />
      case 'progress':    return <Progress navigate={navigate} />
      case 'leaderboard': return <Leaderboard navigate={navigate} />
      case 'challenges':  return <Challenges navigate={navigate} />
      case 'messages':    return <Messages navigate={navigate} />
      case 'parent':      return <Parent navigate={navigate} />
      default:            return <Login onLogin={handleLogin} />
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '0 auto', minHeight: '100vh', background: '#fff', position: 'relative' }}>
      {renderPage()}
      {page !== 'login' && (
        <nav style={{
          position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 420, background: '#fff',
          borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-around',
          padding: '10px 0', zIndex: 100, overflowX: 'auto'
        }}>
          {[
            { id: 'home',        icon: '🏠', label: 'Home' },
            { id: 'songs',       icon: '🎵', label: 'Songs' },
            { id: 'upload',      icon: '🎙️', label: 'Upload' },
            { id: 'progress',    icon: '📊', label: 'Progress' },
            { id: 'leaderboard', icon: '🏆', label: 'Ranks' },
            { id: 'challenges',  icon: '🎯', label: 'Challenges' },
            { id: 'messages',    icon: '💬', label: 'Messages' },
            { id: 'parent',      icon: '👨‍👩‍👧', label: 'Parent' },
          ].map(tab => (
            <button key={tab.id} onClick={() => navigate(tab.id)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              color: page === tab.id ? '#4F6AF5' : '#999', fontSize: 11,
              fontWeight: page === tab.id ? 600 : 400, minWidth: 48
            }}>
              <span style={{ fontSize: 20 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}