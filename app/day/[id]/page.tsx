'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import confetti from 'canvas-confetti'
import { CURRICULUM_DATA } from '@/lib/curriculum-data'
import { PHASES } from '@/lib/types'
import {
  getCompletedDays,
  setDayComplete,
  getCompletedTasks,
  setTaskComplete,
  calculateStreak,
} from '@/lib/storage'
import { PhaseBadge } from '@/components/phase-badge'
import { ResourceCard } from '@/components/resource-card'
import { TaskItem } from '@/components/task-item'
import { PhaseCompleteModal } from '@/components/phase-complete-modal'
import { MobileNav } from '@/components/mobile-nav'

export default function DayDetail() {
  const params = useParams()
  const dayId = parseInt(params.id as string, 10)

  const [day, setDay] = useState<(typeof CURRICULUM_DATA)[0] | null>(null)
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set())
  const [completedTasks, setCompletedTasksState] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)
  const [showPhaseComplete, setShowPhaseComplete] = useState(false)
  const [completedPhase, setCompletedPhase] = useState<1 | 2 | 3 | 4 | null>(null)
  const [streak, setStreak] = useState({ current: 0, longest: 0 })

  useEffect(() => {
    setMounted(true)
    const dayData = CURRICULUM_DATA.find(d => d.day === dayId)
    setDay(dayData || null)
    setCompletedDays(getCompletedDays())
    setCompletedTasksState(getCompletedTasks())
    setStreak(calculateStreak())
  }, [dayId])

  if (!mounted || !day) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#09090E]">
        <p className="text-gray-400">Loading...</p>
      </div>
    )
  }

  const phaseConfig = PHASES.find(p => p.phase === day.phase)
  const isCompleted = completedDays.has(dayId)
  const dayTasksCompleted = day.tasks.filter(
    (task) => completedTasks[`${dayId}-${task.id}`]
  ).length

  const handleTaskToggle = (taskId: string) => {
    const newState = !completedTasks[`${dayId}-${taskId}`]
    completedTasks[`${dayId}-${taskId}`] = newState
    setTaskComplete(dayId, taskId, newState)
    setCompletedTasksState({ ...completedTasks })
  }

  const handleMarkComplete = async () => {
    if (isCompleted) {
      setDayComplete(dayId, false)
      const newCompleted = new Set(completedDays)
      newCompleted.delete(dayId)
      setCompletedDays(newCompleted)
    } else {
      setDayComplete(dayId, true)
      const newCompleted = new Set(completedDays)
      newCompleted.add(dayId)
      setCompletedDays(newCompleted)

      // Trigger confetti
      confetti({
        particleCount: 120,
        spread: 70,
        colors: [phaseConfig?.color || '#00D4FF'],
      })

      // Check if phase is complete
      const phaseDays = PHASES.find(p => p.phase === day.phase)
      if (phaseDays) {
        const phaseDayNumbers = Array.from({ length: phaseDays.totalDays }, (_, i) => {
          const startDay = phaseDays.days[0]
          return startDay + i
        })

        const allPhaseCompleted = phaseDayNumbers.every(d => newCompleted.has(d))

        if (allPhaseCompleted) {
          setCompletedPhase(day.phase as 1 | 2 | 3 | 4)
          setShowPhaseComplete(true)
        }
      }

      // Update streak
      setStreak(calculateStreak())
    }
  }

  const prevDay = dayId > 1 ? dayId - 1 : null
  const nextDay = dayId < 90 ? dayId + 1 : null

  return (
    <div className="min-h-screen bg-[#09090E] text-white pb-20 md:pb-0">
      <MobileNav />

      <PhaseCompleteModal
        phaseNumber={completedPhase || day.phase}
        isOpen={showPhaseComplete}
        onClose={() => setShowPhaseComplete(false)}
      />

      {/* Header */}
      <header className="border-b border-[#1E1E2E] px-6 py-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-sm text-gray-400 hover:text-white mb-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <div className="mb-4">
              <PhaseBadge phase={day.phase} />
            </div>
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Day {day.day}
            </h1>
            <h2 className="text-2xl font-semibold text-gray-300 mb-6">{day.title}</h2>

            <p className="text-gray-300 leading-relaxed mb-6">{day.description}</p>

            <div className="mb-8">
              <span
                className="inline-block px-3 py-1 rounded-lg text-sm font-semibold text-white"
                style={{ backgroundColor: `${phaseConfig?.color}20`, color: phaseConfig?.color }}
              >
                Time Estimate: {day.timeEstimate}
              </span>
            </div>

            <button
              onClick={handleMarkComplete}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-all mb-4 ${
                isCompleted
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'hover:opacity-90'
              }`}
              style={{
                backgroundColor: isCompleted ? '#16a34a' : phaseConfig?.color,
              }}
            >
              {isCompleted ? 'Completed ✓' : 'Mark Complete'}
            </button>

            <div className="flex gap-3">
              {prevDay && (
                <Link
                  href={`/day/${prevDay}`}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#0D0D1A] border border-[#1E1E2E] hover:border-[#2E2E3E] text-white text-center transition-colors"
                >
                  ← Previous
                </Link>
              )}
              {nextDay && (
                <Link
                  href={`/day/${nextDay}`}
                  className="flex-1 px-4 py-2 rounded-lg bg-[#0D0D1A] border border-[#1E1E2E] hover:border-[#2E2E3E] text-white text-center transition-colors"
                >
                  Next →
                </Link>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Tasks Section */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold mb-4">Tasks</h3>
              <div className="space-y-3">
                {day.tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    isCompleted={!!completedTasks[`${dayId}-${task.id}`]}
                    onToggle={() => handleTaskToggle(task.id)}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                {dayTasksCompleted}/{day.tasks.length} tasks completed
              </p>
            </section>

            {/* Resources Section */}
            <section>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <div className="space-y-3">
                {day.resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
