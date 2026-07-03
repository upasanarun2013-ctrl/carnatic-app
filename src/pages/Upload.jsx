import { useState, useRef } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../firebase'

const SONGS_BY_TYPE = {
  Alankaram: [
    'Dhruva Thalam', 'Matya Thalam', 'Rupaka Thalam',
    'Jhampa Thalam', 'Triputa Thalam', 'Ata Thalam', 'Eka Thalam'
  ],
  Geetham: [
    'Shri Gananatha', 'Vara Veena', 'Analekara', 'Janakasutha',
    'Kamalajadhala', 'Kamalasulochana', 'Mandharadharare'
  ],
  Varnam: [
    'Evari Bodhana', 'Vanajakshi Ro', 'Valachi Vacchi',
    'Jalajakshi', 'Karunimpa', 'Era Napai'
  ],
  Kriti: [
    'Shyamale Meenakshi', 'Santhatam Pahimam', 'Shankaravara Pankajakara',
    'Rama Rama Rama Jaya Jaya Rama', 'Dhruva Matya Roopaka', 'Tamaru Mamaru',
    'Shankachakradara', 'Vara Leela Gana Lola', 'Raghuvamsa Sudambudhi',
    'Tumaku Chalathu', 'Nagumomu Galavani', 'Makutabishekam Kondane',
    'Shri Vigna Rajam Bhaje', 'Alola Tulasi', 'PAhi PAhi Jagan Mohana Krishna',
    'Muruganin Marupeyar', 'Unnai Thidikka Aruzh tha', 'Veera Maruthi',
    'Tamboori Mettidhava', 'Bhajare Gopalam Manasa', 'Adamodigalade',
    'Narayana te Namo Namo', 'Muddu Gare Yashoda', 'Giriraja Sudha',
    'Sharanu Siddhi Vinayaka', 'Vandhanamo Raghunandhana', 'Isha Pahimam',
    'Margabandhu Stotram', 'Kamakshi Loka Shakshi', 'Himagiri Thanaye',
    'Yehi Mudham Dehi', 'Venkatachala Nilayam', 'Ranganai Thudiporku',
    'Gananayakam Bhajeham', 'Umbar Tharu', 'Maithreem Bhajatha',
    'Ezhiludai Hamsanaadam', 'Hari MhaNa Tumi', 'Theerada Vizhayattu Pillai',
    'Pibre Rama Rasam', 'Enna Thavam Seithanai', 'Vilayaada Idhu Nerama',
    'Haridasulu Vedale', 'Kalyana Gopalam', 'Santanagopala Krishnam',
    'Subramanyena Rakshitaham', 'Namaste Paradevate', 'Shri Nathadhi Guruguho',
    'Venkata Ramana', 'Bantu Reeti Kolu', 'Madhava Mamava Krishna',
    'Govindamiha Gopika Nandakandam', 'Telisi Rama Chinthanatho Namamu',
    'Adiya Padattai Darisika', 'Enadu Manam Kavalai', 'Sinam Adaiyathey',
    'Rama Manthrava Japiso'
  ]
}
const TYPES = ['Alankaram', 'Geetham', 'Varnam', 'Kriti']

export default function Upload() {
  const [type, setType]         = useState('Alankaram')
  const [song, setSong]         = useState(SONGS_BY_TYPE['Alankaram'][0])
  const [recording, setRecord]  = useState(false)
  const [audioURL, setAudioURL] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)
  const [status, setStatus]     = useState('')
  const [error, setError]       = useState('')
  const [seconds, setSeconds]   = useState(0)
  const mediaRef  = useRef(null)
  const chunksRef = useRef([])
  const timerRef  = useRef(null)

  const startRecording = async () => {
    setError('')
    setAudioURL(null)
    setAudioBlob(null)
    setSeconds(0)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      mediaRef.current = mr
      chunksRef.current = []
      mr.ondataavailable = e => chunksRef.current.push(e.data)
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        setAudioURL(URL.createObjectURL(blob))
        stream.getTracks().forEach(t => t.stop())
      }
      mr.start()
      setRecord(true)
      timerRef.current = setInterval(() => {
        setSeconds(s => {
          if (s >= 119) { stopRecording(); return 120 }
          return s + 1
        })
      }, 1000)
    } catch {
      setError('Microphone access denied. Please allow microphone access and try again.')
    }
  }

  const stopRecording = () => {
    if (mediaRef.current && recording) {
      mediaRef.current.stop()
      setRecord(false)
      clearInterval(timerRef.current)
    }
  }

  const handleSubmit = async () => {
    if (!audioBlob) { setError('Please record a clip first.'); return }
    setStatus('uploading')
    setError('')
    try {
      const reader = new FileReader()
      reader.readAsDataURL(audioBlob)
      reader.onloadend = async () => {
        const base64 = reader.result
        await addDoc(collection(db, 'uploads'), {
          studentId: auth.currentUser?.uid,
          songTitle: song,
          songType: type,
          timestamp: serverTimestamp(),
          durationSeconds: seconds,
          audio: base64,
        })
        setStatus('done')
        setAudioURL(null)
        setAudioBlob(null)
        setSeconds(0)
        setTimeout(() => setStatus(''), 3000)
      }
    } catch {
      setError('Upload failed. Please try again.')
      setStatus('')
    }
  }

  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`

  return (
    <div style={{ padding: '48px 20px 90px' }}>
      <h2 style={{ margin: '0 0 24px', fontSize: 20, fontWeight: 700 }}>Upload practice</h2>

      <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Song type</p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {TYPES.map(t => (
          <button key={t} onClick={() => { setType(t); setSong(SONGS_BY_TYPE[t][0]) }} style={{
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
        fontSize: 14, marginBottom: 24, background: '#fff'
      }}>
        {SONGS_BY_TYPE[type].map(s => <option key={s}>{s}</option>)}
      </select>

      {/* Recording zone */}
      <div style={{
        border: `2px dashed ${recording ? '#e53e3e' : '#C7D0FF'}`,
        borderRadius: 16, padding: '28px 20px', textAlign: 'center',
        marginBottom: 16, background: recording ? '#FFF5F5' : '#F8F9FF'
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>
          {recording ? '🔴' : audioURL ? '✅' : '🎙️'}
        </div>
        {recording ? (
          <>
            <p style={{ fontWeight: 700, color: '#e53e3e', margin: '0 0 4px' }}>Recording... {fmt(seconds)}</p>
            <p style={{ color: '#999', fontSize: 12, margin: '0 0 12px' }}>Max 2:00</p>
            <button onClick={stopRecording} style={{
              padding: '10px 24px', borderRadius: 10, background: '#e53e3e',
              color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: 14
            }}>Stop recording</button>
          </>
        ) : audioURL ? (
          <>
            <p style={{ fontWeight: 600, margin: '0 0 8px' }}>Recording ready! ({fmt(seconds)})</p>
            <audio controls src={audioURL} style={{ width: '100%', marginBottom: 8 }} />
            <button onClick={startRecording} style={{
              padding: '8px 16px', borderRadius: 8, background: '#F0F0F0',
              color: '#666', fontWeight: 500, border: 'none', cursor: 'pointer', fontSize: 13
            }}>Record again</button>
          </>
        ) : (
          <>
            <p style={{ fontWeight: 600, margin: '0 0 4px' }}>Tap to record</p>
            <p style={{ color: '#999', fontSize: 12, margin: '0 0 12px' }}>Max 2 minutes · audio only</p>
            <button onClick={startRecording} style={{
              padding: '10px 24px', borderRadius: 10, background: '#4F6AF5',
              color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer', fontSize: 14
            }}>Start recording</button>
          </>
        )}
      </div>

      {error && <p style={{ color: '#e53e3e', fontSize: 13, marginBottom: 10 }}>{error}</p>}

      {status === 'done'
        ? <div style={{ background: '#E6F7EE', color: '#2D9E5F', borderRadius: 10, padding: 14, textAlign: 'center', fontWeight: 600 }}>
            ✅ Clip uploaded successfully!
          </div>
        : <button onClick={handleSubmit} disabled={!audioURL || status === 'uploading'} style={{
            width: '100%', padding: 14, borderRadius: 12,
            background: audioURL ? '#4F6AF5' : '#C0C0C0',
            color: '#fff', fontWeight: 600, fontSize: 15, border: 'none',
            cursor: audioURL ? 'pointer' : 'not-allowed'
          }}>
            {status === 'uploading' ? 'Uploading...' : 'Submit clip'}
          </button>
      }
    </div>
  )
}