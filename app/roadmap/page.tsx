'use client'

import { useState } from 'react'

const phases = [
  {
    id: 1,
    label: 'Phase 1',
    duration: 'Weeks 1–4',
    title: 'Foundation Lock-In',
    color: '#00D4FF',
    applyFor: [],
    skills: [
      {
        cat: 'Python',
        topics: [
          'Variables, loops, functions, list comprehensions',
          'Pandas — read_csv, groupby, merge, pivot_table',
          'NumPy — arrays, vectorized ops, basic stats',
          'Matplotlib & Seaborn — line, bar, scatter, heatmap',
        ],
      },
      {
        cat: 'SQL (MySQL)',
        topics: [
          'SELECT, WHERE, GROUP BY, HAVING, ORDER BY',
          'JOINs — INNER, LEFT, RIGHT',
          'Subqueries & CTEs',
          'Window functions — ROW_NUMBER, RANK, LAG, LEAD',
        ],
      },
      {
        cat: 'Excel',
        topics: [
          'VLOOKUP / XLOOKUP, SUMIF, COUNTIF',
          'Pivot Tables + Charts',
          'Basic data cleaning in Excel',
        ],
      },
    ],
    projects: [
      'EDA on a Kaggle dataset (crime/health/ecommerce) — upload to GitHub',
      '5 SQL query sets on a public DB (LeetCode SQL / HackerRank)',
    ],
    milestone: null,
    resume_add: 'Add: Python (Pandas, NumPy, Matplotlib, Seaborn), MySQL (Window Functions, CTEs)',
  },
  {
    id: 2,
    label: 'Phase 2',
    duration: 'Weeks 5–7',
    title: 'Analytics Stack',
    color: '#A855F7',
    applyFor: ['🟢 Data Analyst Intern'],
    skills: [
      {
        cat: 'Data Visualization',
        topics: [
          'Power BI or Tableau — dashboards, slicers, KPIs',
          'Plotly / Dash for Python dashboards',
          'Storytelling with data — what chart for what question',
        ],
      },
      {
        cat: 'Statistics',
        topics: [
          'Mean, median, mode, std dev, variance',
          'Correlation vs causation',
          'Hypothesis testing — t-test, chi-square (conceptual)',
          'A/B testing basics',
        ],
      },
      {
        cat: 'EDA Deep Dive',
        topics: [
          'Missing value treatment strategies',
          'Outlier detection (IQR, Z-score)',
          'Feature distribution analysis',
        ],
      },
    ],
    projects: [
      'Build a Power BI / Tableau dashboard on SafeMap data or Untangle stress data (you already have the DB)',
      'A/B test simulation notebook — show statistical significance',
    ],
    milestone: '✅ CAN APPLY: Data Analyst Intern',
    resume_add: 'Add: Power BI / Tableau, Statistical Analysis, A/B Testing, EDA',
  },
  {
    id: 3,
    label: 'Phase 3',
    duration: 'Weeks 8–10',
    title: 'Product + Business Thinking',
    color: '#F59E0B',
    applyFor: ['🟢 Data Analyst Intern', '🟡 Product Analyst Intern'],
    skills: [
      {
        cat: 'Product Analytics',
        topics: [
          'Funnel analysis — acquisition → activation → retention',
          'Cohort analysis',
          'DAU/MAU, retention rate, churn metrics',
          'North Star metric framework',
        ],
      },
      {
        cat: 'SQL Advanced',
        topics: [
          'Complex multi-table JOINs',
          'Date/time functions for trend analysis',
          'Query optimization basics',
        ],
      },
      {
        cat: 'Tools',
        topics: [
          'Google Analytics / Mixpanel — basics',
          'Notion or Confluence for doc writing',
          'Structuring a data story for non-tech stakeholders',
        ],
      },
    ],
    projects: [
      'Product analytics case study: pick any app (Zomato, Swiggy, Spotify), define metrics, build a mock dashboard',
      'Write a 1-page PRD-style analysis doc with data-backed recommendations',
    ],
    milestone: '✅ CAN APPLY: Product Analyst Intern',
    resume_add: 'Add: Product Analytics, Funnel/Cohort Analysis, Google Analytics, Business Metrics',
  },
  {
    id: 4,
    label: 'Phase 4',
    duration: 'Weeks 11–12',
    title: 'ML for Analysts + Polish',
    color: '#10B981',
    applyFor: ['🟢 Data Analyst', '🟡 Product Analyst', '🔵 Data Scientist (Junior)', '🔵 ML Engineer (entry)', '🐍 Python Developer'],
    skills: [
      {
        cat: 'ML Essentials',
        topics: [
          'Scikit-learn — Linear Regression, Logistic Regression, Decision Tree',
          'Train/test split, cross-validation, confusion matrix',
          'Feature importance, model interpretation',
          'You already have DBSCAN/clustering — document it properly',
        ],
      },
      {
        cat: 'Python Advanced',
        topics: [
          'Automation scripts — scheduled reports via Python + cron',
          'API data pulling — requests, JSON parsing',
          'Basic web scraping — BeautifulSoup (optional)',
        ],
      },
      {
        cat: 'Python Developer Track',
        topics: [
          'Flask / FastAPI — REST API design, route handling, middleware (tere paas already hai)',
          'OOP in Python — classes, inheritance, decorators',
          'File handling, exception handling, logging',
          'Virtual environments, requirements.txt, project structuring',
          'Basic testing — pytest, unit tests',
          'Deployment — Railway / Render / Vercel for Python backends',
        ],
      },
      {
        cat: 'Portfolio Polish',
        topics: [
          'GitHub README for every project (clear problem → approach → result)',
          'LinkedIn: headline, About, Skills, Projects section',
          'Resume version for each role',
        ],
      },
    ],
    projects: [
      'Predictive model on SafeMap: predict crime probability in a zone (you have the base already)',
      'Build a clean REST API project with FastAPI — proper routes, error handling, Pydantic models, deployed on Render (tera SafeMap/Untangle backend restructure bhi kaam karega)',
    ],
    milestone: '✅ CAN APPLY: Data Scientist Intern, ML Analyst, BI Developer, Python Developer',
    resume_add: 'Add: Scikit-learn (Regression, Classification), Model Evaluation, Automation, API Integration, OOP, pytest, Deployment (Render/Railway)',
  },
]

const profiles = [
  { name: 'Data Analyst', when: 'After Week 7', color: '#00D4FF', icon: '📊' },
  { name: 'Product Analyst', when: 'After Week 10', color: '#A855F7', icon: '🧩' },
  { name: 'Business Analyst', when: 'After Week 10', color: '#F59E0B', icon: '📈' },
  { name: 'Data Scientist (Jr.)', when: 'After Week 12', color: '#10B981', icon: '🤖' },
  { name: 'ML Engineer (entry)', when: 'After Week 12', color: '#EF4444', icon: '⚙️' },
  { name: 'BI Developer', when: 'After Week 12', color: '#EC4899', icon: '🗂️' },
  { name: 'Python Developer', when: 'After Week 12', color: '#F97316', icon: '🐍' },
]

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(0)
  const [tab, setTab] = useState('skills')
  const phase = phases[activePhase]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0F',
        color: '#E8E8F0',
        fontFamily: "'Courier New', monospace",
        padding: '0',
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid #1E1E2E',
          padding: '28px 32px 20px',
          background: 'linear-gradient(180deg, #0D0D1A 0%, #0A0A0F 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 4,
                color: '#555',
                marginBottom: 6,
                textTransform: 'uppercase',
              }}
            >
              Manasvi · ABES CSE 2027
            </div>
            <h1
              style={{
                fontSize: 'clamp(22px, 4vw, 36px)',
                fontWeight: 700,
                margin: 0,
                letterSpacing: -1,
                fontFamily: 'Georgia, serif',
              }}
            >
              3-Month <span style={{ color: '#00D4FF' }}>Data Analyst</span> Roadmap
            </h1>
            <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>
              Starting from 0 · Python · SQL · ML · Internship-Ready
            </div>
          </div>
          <div
            style={{
              background: '#0D1117',
              border: '1px solid #1E1E2E',
              borderRadius: 8,
              padding: '10px 16px',
              fontSize: 11,
              color: '#888',
              textAlign: 'right',
            }}
          >
            <div style={{ color: '#00D4FF', fontWeight: 700, fontSize: 18 }}>12 wks</div>
            <div>4 phases</div>
            <div style={{ marginTop: 4 }}>6 profiles unlocked</div>
          </div>
        </div>

        {/* Phase selector */}
        <div style={{ display: 'flex', gap: 8, marginTop: 24, flexWrap: 'wrap' }}>
          {phases.map((p, i) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePhase(i)
                setTab('skills')
              }}
              style={{
                background: activePhase === i ? p.color : 'transparent',
                border: `1px solid ${activePhase === i ? p.color : '#2A2A3E'}`,
                color: activePhase === i ? '#000' : '#888',
                borderRadius: 6,
                padding: '8px 16px',
                cursor: 'pointer',
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                fontWeight: activePhase === i ? 700 : 400,
                transition: 'all 0.2s',
              }}
            >
              {p.label} <span style={{ opacity: 0.7 }}>· {p.duration}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '28px 32px', maxWidth: 900 }}>

        {/* Phase Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              width: 4,
              height: 40,
              background: phase.color,
              borderRadius: 2,
            }}
          />
          <div>
            <div
              style={{
                fontSize: 11,
                color: phase.color,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              {phase.duration}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                fontFamily: 'Georgia, serif',
                letterSpacing: -0.5,
              }}
            >
              {phase.title}
            </div>
          </div>
          {phase.milestone && (
            <div
              style={{
                marginLeft: 'auto',
                background: '#0D1A12',
                border: `1px solid #10B981`,
                borderRadius: 6,
                padding: '6px 14px',
                fontSize: 11,
                color: '#10B981',
                fontWeight: 700,
              }}
            >
              {phase.milestone}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            marginBottom: 20,
            borderBottom: '1px solid #1E1E2E',
          }}
        >
          {['skills', 'projects', 'resume'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: tab === t ? `2px solid ${phase.color}` : '2px solid transparent',
                color: tab === t ? '#E8E8F0' : '#555',
                padding: '8px 18px',
                cursor: 'pointer',
                fontFamily: "'Courier New', monospace",
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 2,
                transition: 'all 0.15s',
              }}
            >
              {t === 'skills' ? '📚 Skills' : t === 'projects' ? '🔧 Projects' : '📄 Resume'}
            </button>
          ))}
        </div>

        {/* Tab: Skills */}
        {tab === 'skills' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {phase.skills.map((s, i) => (
              <div
                key={i}
                style={{
                  background: '#0D0D1A',
                  border: '1px solid #1E1E2E',
                  borderTop: `2px solid ${phase.color}`,
                  borderRadius: 8,
                  padding: 18,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: phase.color,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  {s.cat}
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {s.topics.map((t, j) => (
                    <li
                      key={j}
                      style={{
                        fontSize: 12,
                        color: '#B0B0C0',
                        padding: '5px 0',
                        borderBottom:
                          j < s.topics.length - 1
                            ? '1px solid #14141F'
                            : 'none',
                        display: 'flex',
                        gap: 8,
                        alignItems: 'flex-start',
                      }}
                    >
                      <span
                        style={{
                          color: phase.color,
                          marginTop: 1,
                          flexShrink: 0,
                        }}
                      >
                        ›
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Projects */}
        {tab === 'projects' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {phase.projects.map((p, i) => (
              <div
                key={i}
                style={{
                  background: '#0D0D1A',
                  border: '1px solid #1E1E2E',
                  borderLeft: `3px solid ${phase.color}`,
                  borderRadius: 8,
                  padding: '16px 20px',
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    background: phase.color,
                    color: '#000',
                    borderRadius: '50%',
                    width: 22,
                    height: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {i + 1}
                </span>
                <div
                  style={{
                    fontSize: 13,
                    color: '#C8C8D8',
                    lineHeight: 1.6,
                  }}
                >
                  {p}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Resume */}
        {tab === 'resume' && (
          <div
            style={{
              background: '#0D0D1A',
              border: '1px solid #1E1E2E',
              borderRadius: 8,
              padding: 20,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: phase.color,
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              Resume Skills Section — Is Phase Ke Baad Add Karo
            </div>
            <div
              style={{
                background: '#060610',
                border: '1px solid #1A1A2E',
                borderRadius: 6,
                padding: '14px 18px',
                fontSize: 13,
                color: '#A0A0B8',
                lineHeight: 1.8,
                fontFamily: "'Courier New', monospace",
              }}
            >
              {phase.resume_add}
            </div>
            {phase.applyFor.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div
                  style={{
                    fontSize: 11,
                    color: '#555',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    marginBottom: 10,
                  }}
                >
                  Apply For These Roles
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {phase.applyFor.map((r, i) => (
                    <span
                      key={i}
                      style={{
                        background: '#0D1117',
                        border: '1px solid #2A2A3E',
                        borderRadius: 20,
                        padding: '5px 14px',
                        fontSize: 12,
                        color: '#C0C0D0',
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Profile Unlock Section */}
      <div
        style={{
          padding: '0 32px 32px',
          maxWidth: 900,
        }}
      >
        <div style={{ borderTop: '1px solid #1A1A2E', paddingTop: 28 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: '#444',
              textTransform: 'uppercase',
              marginBottom: 16,
            }}
          >
            Profile Unlocks — Full Timeline
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 10,
            }}
          >
            {profiles.map((p, i) => (
              <div
                key={i}
                style={{
                  background: '#0D0D1A',
                  border: `1px solid #1E1E2E`,
                  borderBottom: `2px solid ${p.color}`,
                  borderRadius: 8,
                  padding: '14px 16px',
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 6 }}>{p.icon}</div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#E0E0F0',
                    marginBottom: 4,
                  }}
                >
                  {p.name}
                </div>
                <div style={{ fontSize: 11, color: p.color }}>{p.when}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
