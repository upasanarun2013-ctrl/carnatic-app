import { useState } from 'react'

const BROADCASTS = [
  {
    id: 1,
    from: 'Guru',
    message: 'Great practice this week everyone! Remember to focus on your talam while practicing Varnams.',
    time: 'Today, 9:00 AM',
    avatar: '🧑‍🏫',
  },
  {
    id: 2,
    from: 'TA Priya',
    message: 'This week\'s group challenge has been posted. Please make sure to upload your Alankaram clip by Sunday!',
    time: 'Yesterday, 4:30 PM',
    avatar: '👩‍🏫',
  },
  {
    id: 3,
    from: 'Guru',
    message: 'Reminder: Class recording for last week\'s session has been uploaded to the song repository.',
    time: 'Mon, Jun 23',
    avatar: '🧑‍🏫',
  },
]

const INITIAL_CHAT = [
  { id: 1, from: 'ta', text: 'Hi! How is your practice going this week?', time: '9:00 AM' },
  { id: 2, from: 'me', text: 'It\'s going well! I\'ve been working on Nagumomu Galavani.', time: '9:05 AM' },
  { id: 3, from: 'ta', text: 'Great choice! Make sure to focus on the Madhyamavati raga phrases. Upload a clip when you\'re ready!', time: '9:07 AM' },
]

export default function Messages() {
  const [tab, setTab] = useState('Chats')
  const [chat, setChat] = useState(INITIAL_CHAT)
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input.trim()) return
    setChat([...chat, {
      id: chat.length + 1,
      from: 'me',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }])
    setInput('')
  }

  return (
    <div style={{ padding: '48px 20px 0', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <h2 style={{ margin: '0 0 16px', fontSize: 20, fontWeight: 700 }}>Messages</h2>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F0F0F0', borderRadius: 12, padding: 4, marginBottom: 16, gap: 4 }}>
        {['Chats', 'Broadcasts'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '8px', borderRadius: 9, border: 'none', cursor: 'pointer',
            fontSize: 13, fontWeight: tab === t ? 700 : 400,
            background: tab === t ? '#fff' : 'transparent',
            color: tab === t ? '#4F6AF5' : '#888',
            boxShadow: tab === t ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
          }}>{t}</button>
        ))}
      </div>

      {tab === 'Broadcasts' ? (
        <div style={{ overflowY: 'auto', paddingBottom: 90 }}>
          {BROADCASTS.map(b => (
            <div key={b.id} style={{
              background: '#F8F9FF', border: '1px solid #E8EAFF', borderRadius: 14,
              padding: '14px', marginBottom: 10
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 22 }}>{b.avatar}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{b.from}</div>
                  <div style={{ fontSize: 11, color: '#aaa' }}>{b.time}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: '#444', lineHeight: 1.5 }}>{b.message}</div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* TA header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
            borderBottom: '1px solid #eee', marginBottom: 12
          }}>
            <span style={{ fontSize: 28 }}>👩‍🏫</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>TA Priya</div>
              <div style={{ fontSize: 11, color: '#2D9E5F' }}>Online</div>
            </div>
          </div>

          {/* Chat messages */}
          <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {chat.map(msg => (
              <div key={msg.id} style={{
                display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '75%', padding: '9px 13px', borderRadius: msg.from === 'me' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: msg.from === 'me' ? '#4F6AF5' : '#F0F0F0',
                  color: msg.from === 'me' ? '#fff' : '#333',
                  fontSize: 13, lineHeight: 1.4
                }}>
                  <div>{msg.text}</div>
                  <div style={{ fontSize: 10, opacity: 0.6, marginTop: 3, textAlign: 'right' }}>{msg.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            display: 'flex', gap: 8, padding: '10px 0 90px',
            borderTop: '1px solid #eee'
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask your TA something..."
              style={{
                flex: 1, padding: '10px 14px', borderRadius: 20, border: '1px solid #e2e8f0',
                fontSize: 14, outline: 'none'
              }}
            />
            <button onClick={sendMessage} style={{
              width: 40, height: 40, borderRadius: '50%', background: '#4F6AF5',
              border: 'none', cursor: 'pointer', fontSize: 18, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>↑</button>
          </div>
        </div>
      )}
    </div>
  )
}