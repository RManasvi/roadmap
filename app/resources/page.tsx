'use client'

import { useState } from 'react'

const resources = {
  phase1: {
    label: 'Phase 1',
    color: '#00D4FF',
    sections: [
      {
        skill: 'Python (Basics → Pandas → NumPy)',
        items: [
          {
            type: 'YT 🇮🇳 Hindi',
            name: 'CodeWithHarry — Python Tutorial for Beginners',
            url: 'https://youtube.com/@CodeWithHarry',
            note: 'Sabse best Hindi Python series. Basics se OOP tak. Free.',
            priority: 'START HERE',
          },
          {
            type: 'YT 🇮🇳 Indian English',
            name: 'Campusx — 100 Days of Machine Learning (Pandas/NumPy covered deeply)',
            url: 'https://youtube.com/@campusx-official',
            note: 'Nitish Singh ka channel — Pandas, NumPy, EDA sab ek jagah. Hinglish style, very practical.',
            priority: 'MUST',
          },
          {
            type: 'Practice',
            name: 'HackerRank Python Track',
            url: 'https://hackerrank.com/domains/python',
            note: 'Daily 1-2 problems. Beginner to intermediate. Free.',
            priority: 'DAILY',
          },
          {
            type: 'Docs',
            name: 'Pandas Official Docs — 10 Minutes to Pandas',
            url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
            note: 'Ek baar zaroor padho. Short aur precise.',
            priority: 'REFERENCE',
          },
        ],
      },
      {
        skill: 'SQL (MySQL)',
        items: [
          {
            type: 'YT 🇮🇳 Hindi',
            name: 'Apna College — SQL Full Course',
            url: 'https://youtube.com/@ApnaCollegeOfficial',
            note: 'Shraddha Khapra ki SQL series — beginners ke liye perfect. Hindi mein.',
            priority: 'START HERE',
          },
          {
            type: 'Practice',
            name: 'LeetCode SQL 50',
            url: 'https://leetcode.com/studyplan/top-sql-50/',
            note: '50 curated SQL problems — interview standard. Daily 1 karo.',
            priority: 'DAILY',
          },
          {
            type: 'Practice',
            name: 'SQLZoo',
            url: 'https://sqlzoo.net',
            note: 'Interactive browser-based SQL practice. Good for Window Functions.',
            priority: 'SUPPLEMENT',
          },
        ],
      },
      {
        skill: 'Excel',
        items: [
          {
            type: 'YT 🇮🇳 Hindi',
            name: 'Learnvern — Excel Full Course Hindi',
            url: 'https://learnvern.com',
            note: 'Free Hindi Excel course. Pivot tables, VLOOKUP sab covered.',
            priority: 'QUICK',
          },
        ],
      },
    ],
  },
  phase2: {
    label: 'Phase 2',
    color: '#A855F7',
    sections: [
      {
        skill: 'Power BI / Tableau',
        items: [
          {
            type: 'YT 🇮🇳 Indian English',
            name: 'Chandoo.org — Power BI for Beginners',
            url: 'https://youtube.com/@chandoo_',
            note: 'Clean Indian English tutorials. Power BI dashboards step by step.',
            priority: 'START HERE',
          },
          {
            type: 'YT 🇮🇳 Hindi',
            name: 'Aman Kharwal — Data Analysis with Python + Visualization',
            url: 'https://youtube.com/@thecleverprogrammer',
            note: 'Hinglish, project-based. Matplotlib, Seaborn, Plotly sab hai.',
            priority: 'MUST',
          },
          {
            type: 'Free Course',
            name: 'Microsoft Learn — Power BI Fundamentals',
            url: 'https://learn.microsoft.com/en-us/training/powerplatform/power-bi',
            note: 'Microsoft ka official free course. Certificate bhi milta hai.',
            priority: 'BONUS',
          },
        ],
      },
      {
        skill: 'Statistics for Data Analysis',
        items: [
          {
            type: 'YT 🇮🇳 Indian English',
            name: 'Campusx — Statistics for Data Science',
            url: 'https://youtube.com/@campusx-official',
            note: 'Nitish Singh ne statistics ka alag playlist banaya hai — very data-science focused.',
            priority: 'MUST',
          },
          {
            type: 'YT Global',
            name: 'StatQuest with Josh Starmer',
            url: 'https://youtube.com/@statquest',
            note: 'Best statistics + ML intuition channel globally. Slow English, very clear visuals.',
            priority: 'REFERENCE',
          },
        ],
      },
    ],
  },
  phase3: {
    label: 'Phase 3',
    color: '#F59E0B',
    sections: [
      {
        skill: 'Product Analytics & Business Thinking',
        items: [
          {
            type: 'YT 🇮🇳 Indian English',
            name: 'Rishabh Dev — Product Analytics Explained',
            url: 'https://youtube.com/@RishabhDev',
            note: 'Indian creator, product metrics, funnel analysis, case studies. Very relevant.',
            priority: 'START HERE',
          },
          {
            type: 'Free Read',
            name: 'Mixpanel Product Analytics Blog',
            url: 'https://mixpanel.com/blog',
            note: 'Best free resource for DAU/MAU, retention, cohort concepts. Real case studies.',
            priority: 'MUST READ',
          },
          {
            type: 'Course',
            name: 'Google Analytics Academy — GA4 Fundamentals',
            url: 'https://skillshop.withgoogle.com',
            note: 'Free Google certified course. Certificate bhi milta hai. 4-5 ghante ka.',
            priority: 'DO IT',
          },
          {
            type: 'YT 🇮🇳 Indian English',
            name: 'Codebasics — SQL + Data Analysis Projects',
            url: 'https://youtube.com/@codebasics',
            note: 'Dhaval Patel ka channel — end-to-end data analyst projects, resume tips, interview prep. Hinglish.',
            priority: 'GOLDMINE',
          },
        ],
      },
    ],
  },
  phase4: {
    label: 'Phase 4',
    color: '#10B981',
    sections: [
      {
        skill: 'Machine Learning (Scikit-learn)',
        items: [
          {
            type: 'YT 🇮🇳 Indian English',
            name: 'Campusx — 100 Days of ML',
            url: 'https://youtube.com/@campusx-official',
            note: 'The single best ML series in India. Regression, classification, clustering — sab hai. Hinglish.',
            priority: 'START HERE',
          },
          {
            type: 'Course',
            name: 'Kaggle Learn — Intro to ML + Intermediate ML',
            url: 'https://kaggle.com/learn',
            note: 'Free, browser-based, certificate milta hai. 4-6 ghante per course. Kaggle profile bhi banta hai.',
            priority: 'MUST',
          },
        ],
      },
      {
        skill: 'Python Developer Track',
        items: [
          {
            type: 'YT 🇮🇳 Hindi',
            name: 'CodeWithHarry — Flask Tutorial',
            url: 'https://youtube.com/@CodeWithHarry',
            note: 'Hindi mein Flask basics se deployment tak. Already tere paas base hai.',
            priority: 'QUICK REVISION',
          },
          {
            type: 'Docs',
            name: 'FastAPI Official Docs',
            url: 'https://fastapi.tiangolo.com',
            note: 'Best written docs in Python ecosystem. Tujhe already FastAPI aata hai — advanced parts padh.',
            priority: 'REFERENCE',
          },
          {
            type: 'YT Global',
            name: 'Tech With Tim — Python OOP Tutorial',
            url: 'https://youtube.com/@TechWithTim',
            note: 'Clear English, short videos. OOP concepts quickly cover karne ke liye.',
            priority: 'TARGETED',
          },
        ],
      },
      {
        skill: 'Interview Prep',
        items: [
          {
            type: 'YT 🇮🇳 Indian English',
            name: 'Codebasics — Data Analyst Interview Questions',
            url: 'https://youtube.com/@codebasics',
            note: 'Mock interviews, SQL puzzles, HR questions — sab covered. Watch in Week 11-12.',
            priority: 'FINAL PREP',
          },
          {
            type: 'Practice',
            name: 'Stratascratch — Data Science Interview Questions',
            url: 'https://stratascratch.com',
            note: 'Real interview questions from Google, Amazon, Netflix. SQL + Python both.',
            priority: 'MUST',
          },
        ],
      },
    ],
  },
}

const priorityColors = {
  'START HERE': '#00D4FF',
  MUST: '#10B981',
  DAILY: '#F59E0B',
  GOLDMINE: '#EF4444',
  'DO IT': '#A855F7',
  'MUST READ': '#10B981',
  QUICK: '#888',
  REFERENCE: '#555',
  SUPPLEMENT: '#555',
  BONUS: '#555',
  'QUICK REVISION': '#888',
  TARGETED: '#888',
  'FINAL PREP': '#F97316',
}

const typeColors = {
  'YT 🇮🇳 Hindi': '#FF4444',
  'YT 🇮🇳 Indian English': '#FF6B35',
  Practice: '#00D4FF',
  Docs: '#888',
  'Free Course': '#10B981',
  Course: '#A855F7',
  'Free Read': '#F59E0B',
  'YT Global': '#666',
}

export default function Resources() {
  const [activePhase, setActivePhase] = useState('phase1')
  const phase = resources[activePhase as keyof typeof resources]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#09090E',
        color: '#E0E0EE',
        fontFamily: "'Courier New', monospace",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '28px 28px 0',
          borderBottom: '1px solid #181828',
          background: 'linear-gradient(180deg, #0C0C18 0%, #09090E 100%)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            letterSpacing: 4,
            color: '#444',
            marginBottom: 6,
            textTransform: 'uppercase',
          }}
        >
          Manasvi · Learning Resources
        </div>
        <h1
          style={{
            fontSize: 'clamp(20px, 3.5vw, 32px)',
            fontFamily: 'Georgia, serif',
            fontWeight: 700,
            margin: '0 0 4px',
            letterSpacing: -0.5,
          }}
        >
          Kaha Se Padhu? <span style={{ color: '#F59E0B' }}>Resource Guide</span>
        </h1>
        <p style={{ fontSize: 12, color: '#555', margin: '0 0 20px' }}>
          Hindi · Indian English · Free first · Phase-wise
        </p>

        {/* Phase tabs */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {Object.entries(resources).map(([key, p]) => (
            <button
              key={key}
              onClick={() => setActivePhase(key)}
              style={{
                background: activePhase === key ? p.color : 'transparent',
                border: `1px solid ${activePhase === key ? p.color : '#222235'}`,
                color: activePhase === key ? '#000' : '#666',
                borderRadius: '5px 5px 0 0',
                padding: '7px 18px',
                cursor: 'pointer',
                fontFamily: "'Courier New', monospace",
                fontSize: 11,
                fontWeight: activePhase === key ? 700 : 400,
                letterSpacing: 1,
                transition: 'all 0.15s',
                borderBottom: activePhase === key ? `1px solid ${p.color}` : '1px solid #181828',
                marginBottom: -1,
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div
        style={{
          padding: '12px 28px',
          borderBottom: '1px solid #181828',
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: '#444',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Type:
        </span>
        {['YT 🇮🇳 Hindi', 'YT 🇮🇳 Indian English', 'Practice', 'Course'].map((t) => (
          <span
            key={t}
            style={{
              fontSize: 10,
              color: typeColors[t as keyof typeof typeColors] || '#888',
              border: `1px solid ${typeColors[t as keyof typeof typeColors] || '#888'}`,
              borderRadius: 3,
              padding: '2px 8px',
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '24px 28px', maxWidth: 860 }}>
        {phase.sections.map((section, si) => (
          <div key={si} style={{ marginBottom: 32 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 20,
                  background: phase.color,
                  borderRadius: 2,
                }}
              />
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#E0E0EE',
                  letterSpacing: 0.5,
                }}
              >
                {section.skill}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {section.items.map((item, ii) => (
                <a
                  key={ii}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      background: '#0D0D1A',
                      border: '1px solid #1A1A2E',
                      borderLeft: `3px solid ${phase.color}`,
                      borderRadius: 8,
                      padding: '14px 16px',
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: '8px 12px',
                      transition: 'border-color 0.15s, background 0.15s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLDivElement).style.background = '#12122A'
                      ;(e.currentTarget as HTMLDivElement).style.borderLeftColor = phase.color
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLDivElement).style.background = '#0D0D1A'
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          flexWrap: 'wrap',
                          marginBottom: 5,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 9,
                            color: typeColors[item.type as keyof typeof typeColors] || '#888',
                            border: `1px solid ${typeColors[item.type as keyof typeof typeColors] || '#888'}`,
                            borderRadius: 3,
                            padding: '1px 6px',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.type}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            color: '#C8C8E0',
                            fontWeight: 600,
                          }}
                        >
                          {item.name}
                        </span>
                      </div>
                      <div
                        style={{
                          fontSize: 11,
                          color: '#555',
                          lineHeight: 1.5,
                        }}
                      >
                        {item.note}
                      </div>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 9,
                          color:
                            priorityColors[item.priority as keyof typeof priorityColors] || '#555',
                          background:
                            `${priorityColors[item.priority as keyof typeof priorityColors]}18` || 'transparent',
                          border: `1px solid ${priorityColors[item.priority as keyof typeof priorityColors] || '#333'}`,
                          borderRadius: 3,
                          padding: '2px 7px',
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                          fontWeight: 700,
                        }}
                      >
                        {item.priority}
                      </span>
                      <span style={{ fontSize: 14, color: '#333' }}>↗</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom note */}
        <div
          style={{
            background: '#0D0D1A',
            border: '1px dashed #222235',
            borderRadius: 8,
            padding: '16px 18px',
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: '#F59E0B',
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            💡 Golden Rule
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              'Pehle ek topic ka ek resource finish karo — multiple channels simultaneously mat dekho.',
              'YT dekho → same din practice karo (HackerRank / LeetCode / Kaggle) — sirf dekhne se kuch nahi hoga.',
              'Campusx aur Codebasics — ye dono channels tera 80% kaam kar denge. Baaki sab supplement hai.',
              'Paid courses mat kharido abhi — jo list mein hai sab free ya near-free hai.',
            ].map((tip, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: 10,
                  fontSize: 11,
                  color: '#666',
                  lineHeight: 1.6,
                }}
              >
                <span style={{ color: '#F59E0B', flexShrink: 0 }}>›</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
