import { useState } from 'react'

const GROUP_CHALLENGES = [
  {
    id: 1,
    title: 'Alankaram Sprint',
    description: 'Practice any Alankaram for at least 10 minutes every day this week.',
    type: 'Weekly',
    category: 'Alankaram',
    dueDate: 'Sun, Jul 6',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Varnam Focus',
    description: 'Record and upload a clean run of any Varnam by end of week.',
    type: 'Weekly',
    category: 'Varnam',
    dueDate: 'Sun, Jul 6',
    status: 'Completed',
  },
]

const INDIVIDUAL_CHALLENGES = [
  {
    id: 3,
    title: 'Daily Kriti Practice',
    description: 'Practice Nagumomu Galavani for 15 minutes today and upload a clip.',
    type: 'Daily',
    category: 'Kriti',
    dueDate: 'Today',
    status: 'Pending',
  },
  {
    id: 4,
    title: 'Consistency Check',
    description: 'Practice for at least 5 minutes every day for 5 days this week.',
    type: 'Weekly',
    category: 'General',
    dueDate: 'Sun, Jul 6',
    status: 'Completed',
  },
]

const CATEGORY_COLORS = {
  Alankaram: { bg: '#EEF0FF', color: '#4F6AF5' },
  Varnam:    { bg: '#E6F7EE', color: '#2D9E5F' },
  Kriti:     { bg: '#F3EEFF', color: '#7C3AED' },
  General:   { bg: '#FFF4E6', color: '#C97A20' },
}

const STATUS_COLORS = {
  Completed: { bg: '#E6F7EE', color: '#2D9E5F' },
  Pending:   { bg: '#FFF4E6', color: '#C97A20' },
}

function ChallengeCard({ challenge, onToggle }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid #eee', borderRadius: 14,
      padding: '14px', marginBottom: 10,
      borderLeft: `4px solid ${CATEGORY_COLORS[challenge.category]?.color}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div style={{ flex: 1, marginRight: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{challenge.title}</div>
          <div style={{ color: '#666', fontSize: 12, lineHeight: 1.4 }}>{challenge.description}</div>
        </div>
        <span style={{
          fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 8, whiteSpace: 'nowrap',
          background: STATUS_COLORS[challenge.status].bg,
          color: STATUS_COLORS[challenge.status].color
        }}>{challenge.status}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{
            fontSize: 11, padding: '2px 8px', borderRadius: 6,
            background: CATEGORY_COLORS[challenge.category]?.bg,
            color: CATEGORY_COLORS[challenge.category]?.color, fontWeight: 600
          }}>{challenge.category}</span>
          <span style={{
            fontSize: 11, padding: '2px 8px', borderRadius: 6,
            background: '#F0F0F0', color: '#888'
          }}>{challenge.type}</span>
        </div>
        <div style={{ fontSize: 11, color: '#aaa' }}>Due: {challenge.dueDate}</div>
      </div>
      <button onClick={() => onToggle(challenge.id)} style={{
        marginTop: 10, width: '100%', padding: '8px', borderRadius: 9, border: 'none',
        cursor: 'pointer', fontSize: 13, fontWeight: 600,
        background: challenge.status === 'Completed' ? '#F0F0F0' : '#4F6AF5',
        color: challenge.status === 'Completed' ? '#888' : '#fff',
      }}>
        {challenge.status === 'Completed' ? '✓ Completed' : 'Mark as complete'}
      </button>
    </div>
  )
}

export default function Challenges() {
  const [group, setGroup] = useState(GROUP_CHALLENGES)
  const [individual, setIndividual] = useState(INDIVIDUAL_CHALLENGES)
  const [tab, setTab] = useState('Group')

  const toggle = (list, setList, id) => {
    setList(list.map(c => c.id === id
      ? { ...c, status: c.status === 'Completed' ? 'Pending' : 'Completed' }
      : c
    ))
  }

  const current = tab === 'Group' ? group : individual
  const setList = tab === 'Group' ? (id) => toggle(group, setGroup, id) : (id) => toggle(individual, setIndividual, id)

  const completed = current.filter(c => c.status === 'Completed').length

  return (
    <div style={{ padding: '48px 20px 90px' }}>
      <h2 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 700 }}>Challenges</h2>
      <p style={{ color: '#999', fontSize: 13, margin: '0 0 20px' }}>
        {completed}/{current.length} completed this week
      </p>

      {/* Progress bar */}
      <div style={{ background: '#F0F0F0', borderRadius: 10, height: 8, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 10, background: '#4F6AF5',
          width: `${current.length ? (completed / current.length) * 100 : 0}%`,
          transition: 'width 0.3s'
        }} />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F0F0F0', borderRadius: 12, padding: 4, marginBottom: 20, gap: 4 }}>
        {['Group', 'Individual'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '8px', borderRadius: 9, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: tab === t ? 700 : 400,
            background: tab === t ? '#fff' : 'transparent',
            color: tab === t ? '#4F6AF5' : '#888',
            boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          }}>{t}</button>
        ))}
      </div>

      {current.map(c => (
        <ChallengeCard key={c.id} challenge={c} onToggle={setList} />
      ))}
    </div>
  )
}