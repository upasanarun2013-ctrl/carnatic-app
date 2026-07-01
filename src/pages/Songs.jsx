import { useState } from 'react'

const SONGS = [
  { id: 1,  title: 'Shyamale Meenakshi',            ragam: 'Shankarabaranam',   thalam: 'Adi',          composer: 'Muttuswami Dikshitar', type: 'Krithi'  },
  { id: 2,  title: 'Santhatam Pahimam',              ragam: 'Shankarabaranam',   thalam: 'Rupakam',      composer: 'Muttuswami Dikshitar', type: 'Krithi'  },
  { id: 3,  title: 'Shankaravara Pankajakara',       ragam: 'Shankarabaranam',   thalam: 'Rupakam',      composer: 'Muttuswami Dikshitar', type: 'Krithi'  },
  { id: 4,  title: 'Rama Rama Rama Jaya Jaya Rama',  ragam: 'Mayamalavagowla',   thalam: 'Adi',          composer: '',                    type: 'Krithi'  },
  { id: 5,  title: 'Dhruva Matya Roopaka',           ragam: 'Mohanam',           thalam: 'Adi',          composer: 'Dr Shri Shivakumar Bhat', type: 'Krithi' },
  { id: 6,  title: 'Tamaru Mamaru (Tirupugazh)',     ragam: 'Hameer Kalyani',    thalam: 'Rupakam',      composer: 'Arunagirinadar',      type: 'Krithi'  },
  { id: 7,  title: 'Shankachakradara',               ragam: 'Pharaju',           thalam: 'Adi',          composer: '',                    type: 'Krithi'  },
  { id: 8,  title: 'Vara Leela Gana Lola',           ragam: 'Shankarabaranam',   thalam: 'Trishragati',  composer: 'Thyagarajar',         type: 'Krithi'  },
  { id: 9,  title: 'Raghuvamsa Sudambudhi',          ragam: 'Katanakutuhalam',   thalam: 'Adi',          composer: 'PaTNam Subramanya Aiyyar', type: 'Krithi' },
  { id: 10, title: 'Tumaku Chalathu (Bhajan)',        ragam: 'Hindustani Jhinj hoti', thalam: 'Adi',     composer: 'Tulasi das',          type: 'Krithi'  },
  { id: 11, title: 'Nagumomu Galavani',              ragam: 'Madhyamavati',      thalam: 'Adi',          composer: 'Thyagarajar',         type: 'Krithi'  },
  { id: 12, title: 'Makutabishekam Kondane',         ragam: 'Surutti',           thalam: 'Adi',          composer: 'Arunachala Kavi',     type: 'Krithi'  },
  { id: 13, title: 'Shri Vigna Rajam Bhaje',         ragam: 'Ghambeera Nattai',  thalam: 'Kanda Chapu', composer: 'OotukkaaDu VenkaTasubbaiyyar', type: 'Krithi' },
  { id: 14, title: 'Alola Tulasi',                   ragam: 'Bhairavi',          thalam: 'Adi',          composer: 'Badrachala Ramadasar', type: 'Krithi' },
  { id: 15, title: 'PAhi PAhi Jagan Mohana Krishna', ragam: 'Nadanamakriya',     thalam: 'Adi',          composer: 'Narayana Theertar',   type: 'Krithi'  },
  { id: 16, title: 'Muruganin Marupeyar',            ragam: 'Behag',             thalam: 'Kanda Chapu', composer: 'Guru Surajananda',    type: 'Krithi'  },
  { id: 17, title: 'Unnai Thidikka Aruzh tha',       ragam: 'Kunthalavarali',    thalam: 'Adi',          composer: 'Papanasam Sivan',     type: 'Krithi'  },
  { id: 18, title: 'Veera Maruthi (Bhajan)',          ragam: 'Sindhubhairavi',    thalam: 'Adi',          composer: '',                    type: 'Krithi'  },
  { id: 19, title: 'Tamboori Mettidhava',            ragam: 'Sindhubhairavi',    thalam: 'Adi',          composer: 'Purandara dasar',     type: 'Krithi'  },
  { id: 20, title: 'Bhajare Gopalam Manasa',         ragam: 'Hidolam',           thalam: 'Adi',          composer: 'Sadashiva Brahmendrar', type: 'Krithi' },
  { id: 21, title: 'Adamodigalade',                  ragam: 'Charukesi',         thalam: 'Adi',          composer: 'Thyagarajar',         type: 'Krithi'  },
  { id: 22, title: 'Narayana te Namo Namo',          ragam: 'Behag',             thalam: 'Adi',          composer: 'Annamacharya',        type: 'Krithi'  },
  { id: 23, title: 'Muddu Gare Yashoda',             ragam: 'Kurinji',           thalam: 'Adi',          composer: 'Annamacharya',        type: 'Krithi'  },
  { id: 24, title: 'Giriraja Sudha',                 ragam: 'Bangala',           thalam: 'Adi',          composer: 'Thyagarajar',         type: 'Krithi'  },
  { id: 25, title: 'Sharanu Siddhi Vinayaka',        ragam: 'Nattai',            thalam: 'Misra Chapu', composer: 'Purandara dasar',     type: 'Krithi'  },
  { id: 26, title: 'Vandhanamo Raghunandhana',       ragam: 'Sahana',            thalam: 'Adi',          composer: 'Thyagarajar',         type: 'Krithi'  },
  { id: 27, title: 'Isha Pahimam',                   ragam: 'Kalyani',           thalam: 'Rupakam',      composer: 'Thyagarajar',         type: 'Krithi'  },
  { id: 28, title: 'Margabandhu Stotram',            ragam: 'Nadanamakriya',     thalam: 'Eka',          composer: 'Appaya Dikshitar',    type: 'Krithi'  },
  { id: 29, title: 'Kamakshi Loka Shakshi',          ragam: 'Madhyamavati',      thalam: 'Misra Chapu', composer: 'Shyama Shastri',      type: 'Krithi'  },
  { id: 30, title: 'Himagiri Thanaye',               ragam: 'Shudda Danyasi',    thalam: 'Adi',          composer: 'Harikeshanallur Muthaiya Bhagavathar', type: 'Krithi' },
  { id: 31, title: 'Yehi Mudham Dehi',               ragam: 'Anandabhairavi',    thalam: 'Adi',          composer: 'Narayana Theertar',   type: 'Krithi'  },
  { id: 32, title: 'Venkatachala Nilayam',           ragam: 'Sindhubhairavi',    thalam: 'Adi',          composer: 'Purandara dasar',     type: 'Krithi'  },
  { id: 33, title: 'Ranganai Thudiporku',            ragam: 'Chakravakam',       thalam: 'Adi',          composer: 'Papanasam Sivan',     type: 'Krithi'  },
  { id: 34, title: 'Gananayakam Bhajeham',           ragam: 'Rudrapriya',        thalam: 'Adi',          composer: 'Muthuswami Dikshitar', type: 'Krithi' },
  { id: 35, title: 'Umbar Tharu (Tirupugazh)',       ragam: 'Hamsadwani',        thalam: 'Kanda Chapu', composer: 'Arunagirinadar',      type: 'Krithi'  },
  { id: 36, title: 'Maithreem Bhajatha',             ragam: 'Yamuna Kalyani',    thalam: 'Adi',          composer: 'Mahaperiyava',        type: 'Krithi'  },
  { id: 37, title: 'Ezhiludai Hamsanaadam',          ragam: 'Hamsanaadam',       thalam: 'Adi',          composer: 'Tanjavur Shankar Iyer', type: 'Krithi' },
  { id: 38, title: 'Hari MhaNa Tumi (Abhang)',       ragam: 'Brindhavani',       thalam: 'Adi',          composer: 'Dhanpal Singh Rajput', type: 'Krithi' },
  { id: 39, title: 'Theerada Vizhayattu Pillai',     ragam: 'Ragamalika',        thalam: 'Kanda Nadai', composer: 'Subramanya Bharathiyar', type: 'Krithi' },
  { id: 40, title: 'Pibre Rama Rasam',               ragam: 'Ahir Bhairav',      thalam: 'Adi',          composer: 'Sadashiva Brahmendra', type: 'Krithi' },
  { id: 41, title: 'Enna Thavam Seithanai',          ragam: 'Kapi',              thalam: 'Adi',          composer: 'Papanasam Sivan',     type: 'Krithi'  },
  { id: 42, title: 'Vilayaada Idhu Nerama',          ragam: 'Shanmughapriya',    thalam: 'Adi',          composer: 'T.N. Baala',          type: 'Krithi'  },
  { id: 43, title: 'Haridasulu Vedale',              ragam: 'Yamuna Kalyani',    thalam: 'Adi',          composer: 'Thyagarajar',         type: 'Krithi'  },
  { id: 44, title: 'Kalyana Gopalam',                ragam: 'Sindhubhairavi',    thalam: 'Kanda Chapu', composer: 'Narayana Theertar',   type: 'Krithi'  },
  { id: 45, title: 'Santanagopala Krishnam',         ragam: 'Kamaas',            thalam: 'Rupakam',      composer: 'Muthuswami Dikshitar', type: 'Krithi' },
  { id: 46, title: 'Subramanyena Rakshitaham',       ragam: 'Shudda Danyasi',    thalam: 'Adi',          composer: 'Muthuswami Dikshitar', type: 'Krithi' },
  { id: 47, title: 'Namaste Paradevate',             ragam: 'Devaranji',         thalam: 'Rupakam',      composer: 'Muthuswami Dikshitar', type: 'Krithi' },
  { id: 48, title: 'Shri Nathadhi Guruguho',         ragam: 'Mayamalavagowla',   thalam: 'Adi',          composer: 'Muthuswami Dikshitar', type: 'Krithi' },
  { id: 49, title: 'Venkata Ramana',                 ragam: 'Lathangi',          thalam: 'Rupakam',      composer: 'Papanasam Sivan',     type: 'Krithi'  },
  { id: 50, title: 'Bantu Reeti Kolu',               ragam: 'Hamsanaadam',       thalam: 'Adi',          composer: 'Thyagarajar',         type: 'Krithi'  },
  { id: 51, title: 'Madhava Mamava Krishna',         ragam: 'Neelambari',        thalam: 'Adi',          composer: 'Narayana Theertar',   type: 'Krithi'  },
  { id: 52, title: 'Govindamiha Gopika Nandakandam', ragam: 'Bageshri',          thalam: 'Kanda Chapu', composer: 'Narayana Theertar',   type: 'Krithi'  },
  { id: 53, title: 'Telisi Rama Chinthanatho Namamu',ragam: 'Poornachandrika',   thalam: 'Adi',          composer: 'Thyagarajar',         type: 'Krithi'  },
  { id: 54, title: 'Adiya Padattai Darisika',        ragam: 'Pantuvarali',       thalam: 'Adi',          composer: 'Papanasam Sivan',     type: 'Krithi'  },
  { id: 55, title: 'Enadu Manam Kavalai',            ragam: 'Harikambhoji',      thalam: 'Adi',          composer: 'Papanasam Sivan',     type: 'Krithi'  },
  { id: 56, title: 'Sinam Adaiyathey',               ragam: 'Bahudari',          thalam: 'Adi',          composer: 'M.M. DanDapaaNi DEshikar', type: 'Krithi' },
  { id: 57, title: 'Rama Manthrava Japiso',          ragam: 'Jhonpuri',          thalam: 'Adi',          composer: 'Purandara dasar',     type: 'Krithi'  },
  // Varnams
  { id: 58, title: 'Evari Bodhana',                  ragam: 'Abhogi',            thalam: 'Adi',          composer: 'Pattanam Subramanya Iyer', type: 'Varnam' },
  { id: 59, title: 'Vanajakshi Ro',                  ragam: 'Kalyani',           thalam: 'Adi',          composer: 'Ramanathapuram Srinivasa Iyengar', type: 'Varnam' },
  { id: 60, title: 'Valachi Vacchi',                 ragam: 'Nava Ragamalika',   thalam: 'Adi',          composer: 'Patnam Subramania Iyer', type: 'Varnam' },
  { id: 61, title: 'Jalajakshi',                     ragam: 'Hamsadwani',        thalam: 'Adi',          composer: 'Mānambuccāvaḍi Venkaṭa Subbayyar', type: 'Varnam' },
  { id: 62, title: 'Karunimpa',                      ragam: 'Sahana',            thalam: 'Adi',          composer: 'Tiruvotriyur Thiyagaiyer', type: 'Varnam' },
  { id: 63, title: 'Era Napai',                      ragam: 'Todi',              thalam: 'Adi',          composer: 'Patnam Subramania Iyer', type: 'Varnam' },
  // Geethams
  { id: 64, title: 'Shri Gananatha',                 ragam: 'Malahari',          thalam: 'Rupakam',      composer: 'Purandara dasar',     type: 'Geetham' },
  { id: 65, title: 'Vara Veena',                     ragam: 'Mohanam',           thalam: '',             composer: 'Purandara dasar',     type: 'Geetham' },
  { id: 66, title: 'Analekara',                      ragam: 'Shudha Saveri',     thalam: 'Rupakam',      composer: 'Purandara dasar',     type: 'Geetham' },
  { id: 67, title: 'Janakasutha',                    ragam: 'Saveri',            thalam: 'Rupakam',      composer: 'Purandara dasar',     type: 'Geetham' },
  { id: 68, title: 'Kamalajadhala',                  ragam: 'Kalyani',           thalam: 'Misra Chapu', composer: 'Purandara dasar',     type: 'Geetham' },
  { id: 69, title: 'Kamalasulochana',                ragam: 'Anandabhairavi',    thalam: 'Triputa',      composer: 'Purandara dasar',     type: 'Geetham' },
  { id: 70, title: 'Mandharadharare',                ragam: 'Kamboji',           thalam: '',             composer: 'Paidala Gurumurti Shastri', type: 'Geetham' },
]

const TYPE_COLORS = {
  Krithi:  { bg: '#EEF0FF', color: '#4F6AF5' },
  Varnam:  { bg: '#E6F7EE', color: '#2D9E5F' },
  Geetham: { bg: '#FFF4E6', color: '#C97A20' },
}

const FILTERS = ['All', 'Krithi', 'Varnam', 'Geetham']

export default function Songs() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = SONGS.filter(s => {
    const matchType = filter === 'All' || s.type === filter
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.ragam.toLowerCase().includes(search.toLowerCase()) ||
      s.composer.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div style={{ padding: '48px 20px 90px' }}>
      <h2 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700 }}>Songs <span style={{ color: '#aaa', fontSize: 14, fontWeight: 400 }}>({filtered.length})</span></h2>

      <input
        placeholder="Search by title, raga, or composer..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #e2e8f0', fontSize: 14, marginBottom: 12, boxSizing: 'border-box' }}
      />

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13,
            background: filter === f ? '#4F6AF5' : '#F0F0F0',
            color: filter === f ? '#fff' : '#666',
            fontWeight: filter === f ? 600 : 400,
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(song => (
          <div key={song.id} style={{
            background: '#fff', border: '1px solid #eee', borderRadius: 12,
            padding: '11px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{ flex: 1, marginRight: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{song.title}</div>
              <div style={{ color: '#999', fontSize: 12, marginTop: 2 }}>
                {[song.ragam, song.thalam, song.composer].filter(Boolean).join(' · ')}
              </div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '3px 9px', borderRadius: 8, whiteSpace: 'nowrap',
              background: TYPE_COLORS[song.type]?.bg, color: TYPE_COLORS[song.type]?.color
            }}>{song.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}