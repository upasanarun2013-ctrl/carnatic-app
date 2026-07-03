import { useState, useEffect } from 'react'
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import { db, auth } from '../firebase'

const TABS = ['Practice Time', 'Versatility', 'Consistency']
const MEDALS = ['🥇', '🥈', '🥉']

const DESCRIPTIONS = {
  'Practice Time': 'Total minutes practiced this week',
  'Versatility':   'Number of different song types practiced',
  'Consistency':   'Days practiced this week',
}

export default function Leaderboard() {
  const [tab, setTab] = useState('Practice Time')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const now = new Date()
        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - now.getDay())
        startOfWeek.setHours(0, 0, 0, 0)

        // Get all uploads this week
        const uploadsSnap = await getDocs(query(
          collection(db, 'uploads'),
          orderBy('timestamp', 'desc')
        ))
        const uploads = uploadsSnap.docs
          .map(d => ({ ...d.data(), id: d.id }))
          .filter(u => u.timestamp && u.timestamp.toDate() >= startOfWeek)

        // Get all users
        const usersSnap = await getDocs(collection(db, 'users'))
        const users = {}
        usersSnap.docs.forEach(d => { users[d.id] = d.data() })

        // Compute stats per student
        const stats = {}
        uploads.forEach(u => {
          const uid = u.studentId
          if (!uid) return
          if (!stats[uid]) stats[uid] = { mins: 0, types: new Set(), days: new Set() }
          stats[uid].mins += Math.round((u.durationSeconds || 0) / 60)
          if (u.songType) stats[uid].types.add(u.songType)
          if (u.timestamp) stats[uid].days.add(u.timestamp.toDate().toDateString())
        })

        const currentUid = auth.currentUser?.uid

        let data = Object.entries(stats).map(([uid, s]) => ({
          uid,
          name: users[uid]?.name || 'Student',
          mins: s.mins,
          versatility: s.types.size,
          consistency: s.days.size,
          isYou: uid === currentUid,
        }))

        if (tab === 'Practice Time') data.sort((a, b) => b.mins - a.mins)
        else if (tab === 'Versatility') data.sort((a, b) => b.versatility - a.versatility)
        else data.sort((a, b) => b.consistency - a.consistency)

        setRows(data)
      } catch (e) {
        console.error(e)
      }
      setLoading(false)
    }
    fetch()
  }, [tab])

  const getValue = (row) => {
    if (tab === 'Practice Time') return `${row.mins} min`
    if (tab === 'Versatility') return `${row.versatility} type${row.versatility !== 1 ? 's' : ''}`
    return `${row.consistency} day${row.consistency !== 1 ? 's' : ''}`
  }

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
          }}>{t}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#999', padding: 40 }}>Loading leaderboard...</div>
      ) : rows.length === 0 ? (
        <div style={{ background: '#F8F9FF', borderRadius: 12, padding: 20, textAlign: 'center', color: '#999', fontSize: 13 }}>
          No practice uploads this week yet. Be the first on the board!
        </div>
      ) : (
        <>
          {/* Podium */}
          {rows.length >= 2 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 12, marginBottom: 28 }}>
              {[rows[1], rows[0], rows[2]].map((s, i) => {
                if (!s) return <div key={i} style={{ flex: 1 }} />
                const heights = [80, 100, 60]
                const realRank = i === 0 ? 1 : i === 1 ? 0 : 2
                return (
                  <div key={s.uid} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: s.isYou ? '#4F6AF5' : '#555', textAlign: 'center' }}>
                      {s.isYou ? 'You' : s.name}
                    </div>
                    <div style={{ fontSize: 20 }}>{MEDALS[realRank]}</div>
                    <div style={{
                      width: '100%', borderRadius: '8px 8px 0 0',
                      height: heights[i], background: s.isYou ? '#4F6AF5' : realRank === 0 ? '#F5C842' : '#E0E0E0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexDirection: 'column', color: realRank === 0 || s.isYou ? '#fff' : '#555'
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{getValue(s)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Full list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {rows.map((s, i) => (
              <div key={s.uid} style={{
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
                    {s.isYou ? `You (${s.name})` : s.name}
                  </div>
                </div>
                <span style={{ fontWeight: 700, color: s.isYou ? '#4F6AF5' : '#555', fontSize: 14 }}>
                  {getValue(s)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}