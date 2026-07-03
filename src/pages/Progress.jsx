import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { db, auth } from '../firebase'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Progress() {
  const [weekData, setWeekData] = useState(Array(7).fill(0))
  const [totalMins, setTotalMins] = useState(0)
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.currentUser) return
      try {
        const now = new Date()
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - now.getDay())
        startOfWeek.setHours(0, 0, 0, 0)

        const q = query(
          collection(db, 'uploads'),
          where('studentId', '==', auth.currentUser.uid),
          orderBy('timestamp', 'desc')
        )
        const snap = await getDocs(q)
        const uploads = snap.docs.map(d => ({ ...d.data(), id: d.id }))

        // Weekly minutes per day
        const days = Array(7).fill(0)
        let weekTotal = 0
        uploads.forEach(u => {
          if (!u.timestamp) return
          const date = u.timestamp.toDate()
          if (date >= startOfWeek) {
            const day = date.getDay()
            const mins = Math.round((u.durationSeconds || 0) / 60)
            days[day] += mins
            weekTotal += mins
          }
        })
        setWeekData(days)
        setTotalMins(weekTotal)

        // Streak: count consecutive days practiced
        const practicedDays = new Set(
          uploads
            .filter(u => u.timestamp)
            .map(u => u.timestamp.toDate().toDateString())
        )
        let s = 0
        const today = new Date()
        for (let i = 0; i < 30; i++) {
          const d = new Date(today)
          d.setDate(today.getDate() - i)
          if (practicedDays.has(d.toDateString())) s++
          else break
        }
        setStreak(s)
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const MAX = Math.max(...weekData, 1)

  if (loading) return (
    <div style={{ padding: '48px 20px', textAlign: 'center', color: '#999' }}>
      Loading your progress...
    </div>
  )

  return (
    <div style={{ padding: '48px 20px 90px' }}>
      <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700 }}>This week</h2>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 24 }}>
        <div style={{ background: '#F8F9FF', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#4F6AF5' }}>{totalMins}</div>
          <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>mins this week</div>
        </div>
        <div style={{ background: '#F8F9FF', borderRadius: 12, padding: '14px', textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#4F6AF5' }}>{streak}</div>
          <div style={{ fontSize: 11, color: '#999', marginTop: 2 }}>day streak 🔥</div>
        </div>
      </div>

      {/* Bar chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100, marginBottom: 6 }}>
        {weekData.map((mins, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: '100%', background: mins ? '#4F6AF5' : '#F0F0F0', borderRadius: 6,
              height: `${(mins / MAX) * 80}px`, minHeight: 4, transition: 'height 0.3s'
            }}/>
            <span style={{ fontSize: 10, color: '#999' }}>{DAY_LABELS[i]}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', marginBottom: 28 }}>
        {weekData.map((mins, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 10, color: '#bbb' }}>
            {mins ? `${mins}m` : '–'}
          </div>
        ))}
      </div>

      {totalMins === 0 && (
        <div style={{ background: '#F8F9FF', borderRadius: 12, padding: 16, textAlign: 'center', color: '#999', fontSize: 13 }}>
          No practice uploads this week yet. Record a clip to get started!
        </div>
      )}
    </div>
  )
}