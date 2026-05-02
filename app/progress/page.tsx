'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CURRICULUM_DATA } from '@/lib/curriculum-data'
import { PHASES } from '@/lib/types'
import {
  getCompletedDays,
  calculateStreak,
  getCertificates,
  setCertificate,
} from '@/lib/storage'
import { StatsCard } from '@/components/stats-card'
import { ProgressBar } from '@/components/progress-bar'
import { CertificateTracker } from '@/components/certificate-tracker'
import { StreakHeatmap } from '@/components/streak-heatmap'
import { MobileNav } from '@/components/mobile-nav'

export default function ProgressPage() {
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set())
  const [streak, setStreak] = useState({ current: 0, longest: 0 })
  const [certificates, setCertificatesState] = useState<boolean[]>(Array(11).fill(false))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const completed = getCompletedDays()
    setCompletedDays(completed)
    setStreak(calculateStreak())
    setCertificatesState(getCertificates())
  }, [])

  const handleCertificateChange = (index: number, value: boolean) => {
    setCertificate(index, value)
    const newCerts = [...certificates]
    newCerts[index] = value
    setCertificatesState(newCerts)
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#09090E]">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  // Calculate phase completions
  const phaseCounts = PHASES.map((phase) => {
    const daysInPhase = CURRICULUM_DATA.filter(d => d.phase === phase.phase).length
    const completedInPhase = Array.from(completedDays).filter((day) => {
      const dayData = CURRICULUM_DATA.find(d => d.day === day)
      return dayData?.phase === phase.phase
    }).length
    return { phase, completed: completedInPhase, total: daysInPhase }
  })

  const unlockedPhases = phaseCounts.filter(p => p.completed > 0 || p.phase.phase === 1).length

  return (
    <div className="min-h-screen bg-[#09090E] text-white pb-20 md:pb-0">
      <MobileNav />

      {/* Header */}
      <header className="border-b border-[#1E1E2E] px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="text-sm text-gray-400 hover:text-white mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
            Your Progress
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-12">
        {/* Heatmap Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Completion Timeline</h2>
          <StreakHeatmap />
        </section>

        {/* Stats Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard label="Days Completed" value={`${completedDays.size}/90`} icon="📅" />
            <StatsCard label="Current Streak" value={`${streak.current} days`} icon="🔥" />
            <StatsCard label="Longest Streak" value={`${streak.longest} days`} icon="⭐" />
            <StatsCard label="Phases Unlocked" value={`${unlockedPhases}/4`} icon="🎯" />
          </div>
        </section>

        {/* Certificate Tracker Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Certificates</h2>
          <CertificateTracker
            certificates={certificates}
            onChange={handleCertificateChange}
          />
        </section>

        {/* Phase Breakdown Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">Phase Breakdown</h2>
          <div className="space-y-6">
            {phaseCounts.map((item) => (
              <div key={item.phase.phase}>
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-white">{item.phase.label}</p>
                  <p className="text-sm text-gray-400">
                    {item.completed}/{item.total} days
                  </p>
                </div>
                <ProgressBar
                  value={item.completed}
                  max={item.total}
                  color={item.phase.color}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
