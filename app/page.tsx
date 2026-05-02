'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CURRICULUM_DATA } from '@/lib/curriculum-data'
import { PHASES } from '@/lib/types'
import {
  getCompletedDays,
  getCurrentDay,
  calculateStreak,
  resetAllProgress,
} from '@/lib/storage'
import { DayCard } from '@/components/day-card'
import { ProgressBar } from '@/components/progress-bar'
import { SearchBar } from '@/components/search-bar'
import { MobileNav } from '@/components/mobile-nav'

export default function Dashboard() {
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set())
  const [currentDay, setCurrentDay] = useState(1)
  const [streak, setStreak] = useState({ current: 0, longest: 0 })
  const [selectedPhase, setSelectedPhase] = useState<1 | 2 | 3 | 4 | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  useEffect(() => {
    setMounted(true)
    const completed = getCompletedDays()
    setCompletedDays(completed)
    setCurrentDay(getCurrentDay())
    setStreak(calculateStreak())
  }, [])

  const filteredDays = CURRICULUM_DATA.filter((day) => {
    const matchesPhase = selectedPhase === null || day.phase === selectedPhase
    const matchesSearch =
      searchQuery === '' ||
      day.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      day.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPhase && matchesSearch
  })

  const progressPercent = Math.round((completedDays.size / 90) * 100)

  const handleReset = () => {
    resetAllProgress()
    setCompletedDays(new Set())
    setCurrentDay(1)
    setStreak({ current: 0, longest: 0 })
    setShowResetConfirm(false)
    window.location.reload()
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#09090E]">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#09090E] text-white pb-20 md:pb-0">
      <MobileNav />

      {/* Header */}
      <header className="border-b border-[#1E1E2E] px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                90-Day Data Analyst Roadmap
              </h1>
              <p className="text-gray-400">Manasvi · ABES CSE 2027</p>
            </div>
            <div className="flex gap-2 flex-col md:flex-row">
              <Link 
                href="/roadmap"
                className="px-4 py-2 text-sm rounded-lg bg-[#0D0D1A] border border-[#1E1E2E] text-gray-300 hover:bg-[#1A1A2E] transition-colors"
              >
                📋 Roadmap
              </Link>
              <Link 
                href="/resources"
                className="px-4 py-2 text-sm rounded-lg bg-[#0D0D1A] border border-[#1E1E2E] text-gray-300 hover:bg-[#1A1A2E] transition-colors"
              >
                📚 Resources
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="flex gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Current Streak</p>
                <p className="text-2xl font-bold">
                  {streak.current}
                  <span className="ml-2">🔥</span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Days Completed</p>
                <p className="text-2xl font-bold">
                  {completedDays.size}/{CURRICULUM_DATA.length}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <ProgressBar
              value={completedDays.size}
              max={90}
              color="#00D4FF"
              label="Overall Progress"
              showPercent
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Phase Cards */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Phases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PHASES.map((phase) => {
              const phaseCompletedDays = Array.from(completedDays).filter((day) => {
                const dayData = CURRICULUM_DATA.find(d => d.day === day)
                return dayData?.phase === phase.phase
              }).length

              return (
                <button
                  key={phase.phase}
                  onClick={() =>
                    setSelectedPhase(selectedPhase === phase.phase ? null : phase.phase)
                  }
                  className={`p-4 rounded-lg border transition-all text-left ${ 
                    selectedPhase === phase.phase
                      ? 'bg-[#1A1A2E] border-white'
                      : 'bg-[#0D0D1A] border-[#1E1E2E] hover:border-[#2E2E3E]'
                  }`}
                >
                  {/* Color bar + label + duration */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="h-1 w-6 rounded flex-shrink-0"
                      style={{ backgroundColor: phase.color }}
                    />
                    <span className="text-xs font-mono" style={{ color: phase.color }}>
                      {phase.label}
                    </span>
                    <span className="text-xs text-gray-600 font-mono">{phase.duration}</span>
                  </div>

                  {/* Phase title */}
                  <p className="font-semibold text-white mb-1 text-sm leading-tight">{phase.title}</p>

                  {/* Days progress */}
                  <p className="text-xs text-gray-400 mb-3">
                    {phaseCompletedDays}/{phase.totalDays} days completed
                  </p>

                  <ProgressBar
                    value={phaseCompletedDays}
                    max={phase.totalDays}
                    color={phase.color}
                  />

                  {/* Certifications */}
                  {phase.certifications.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 uppercase tracking-widest mb-1.5 font-mono">Certifications</p>
                      <div className="flex flex-wrap gap-1">
                        {phase.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                            style={{
                              color: phase.color,
                              border: `1px solid ${phase.color}33`,
                              backgroundColor: `${phase.color}11`,
                            }}
                          >
                            🏅 {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Milestone badge */}
                  {phase.milestone && (
                    <div
                      className="mt-3 text-[10px] font-bold font-mono rounded px-2 py-1 leading-snug"
                      style={{
                        color: '#10B981',
                        border: '1px solid #10B98133',
                        backgroundColor: '#10B98111',
                      }}
                    >
                      {phase.milestone}
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Search Bar */}
        <section className="mb-8">
          <SearchBar onQueryChange={setSearchQuery} />
        </section>

        {/* Days Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredDays.map((day) => (
              <DayCard
                key={day.day}
                day={day}
                isCompleted={completedDays.has(day.day)}
                isCurrent={day.day === currentDay}
                isLocked={day.day > currentDay + 1}
              />
            ))}
          </div>

          {filteredDays.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400">No days match your search</p>
            </div>
          )}
        </section>

        {/* Reset Button */}
        <section className="border-t border-[#1E1E2E] pt-8">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Reset Progress
          </button>
        </section>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#0D0D1A] border border-[#1E1E2E] rounded-lg p-6 max-w-sm w-full mx-4">
              <h3 className="text-lg font-semibold text-white mb-2">Reset Progress?</h3>
              <p className="text-sm text-gray-400 mb-6">
                This will clear all your completion data and start from day 1. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#1A1A2E] text-white hover:bg-[#2A2A3E] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
