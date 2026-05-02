'use client'

const CERTIFICATES = [
  'HackerRank Python Basic',
  'HackerRank Python Intermediate',
  'Kaggle Pandas',
  'Kaggle Data Visualization',
  'Kaggle Intro to ML',
  'Kaggle Intermediate ML',
  'Kaggle Feature Engineering',
  'Kaggle Time Series',
  'Kaggle NLP',
  'Microsoft Power BI Fundamentals',
  'Google Analytics GA4',
]

interface CertificateTrackerProps {
  certificates: boolean[]
  onChange: (index: number, value: boolean) => void
}

export function CertificateTracker({ certificates, onChange }: CertificateTrackerProps) {
  const earnedCount = certificates.filter(Boolean).length

  return (
    <div className="rounded-lg bg-[#0D0D1A] border border-[#1E1E2E] p-6">
      <div className="mb-6">
        <p className="text-lg font-semibold text-white">
          {earnedCount}/11 certificates earned
        </p>
      </div>
      <div className="space-y-3">
        {CERTIFICATES.map((cert, index) => (
          <label key={index} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={certificates[index] || false}
              onChange={(e) => onChange(index, e.target.checked)}
              className="w-4 h-4 rounded cursor-pointer"
              style={{
                accentColor: '#00D4FF',
              }}
            />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
              {cert}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
