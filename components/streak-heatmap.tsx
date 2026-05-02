'use client'

import { CURRICULUM_DATA } from '@/lib/curriculum-data'
import { PHASES } from '@/lib/types'
import { getCompletedDays, getCompletionDates } from '@/lib/storage'
import { useEffect, useState } from 'react'

export function StreakHeatmap() {
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set())
  const [completionDates, setCompletionDates] = useState<Record<number, string>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setCompletedDays(getCompletedDays())
    setCompletionDates(getCompletionDates())
  }, [])

  if (!mounted) return null

  const getPhaseColor = (dayNumber: number) => {
    const day = CURRICULUM_DATA.find(d => d.day === dayNumber)
    if (!day) return '#1A1A2E'
    const phase = PHASES.find(p => p.phase === day.phase)
    return phase?.color || '#1A1A2E'
  }

  const getDayTooltip = (dayNumber: number) => {
    const day = CURRICULUM_DATA.find(d => d.day === dayNumber)
    if (!day) return ''
    const completedDate = completionDates[dayNumber]
    return `Day ${dayNumber} — ${day.title} — ${
      completedDate ? `Completed on ${completedDate}` : 'Not completed'
    }`
  }

  const squares = Array.from({ length: 90 }, (_, i) => i + 1)

  return (
    <div className="space-y-6">
      <div className="flex gap-8 mb-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">Current Streak</p>
          <p className="text-2xl font-bold">
            {Array.from(completedDays).length}
            <span className="ml-2">🔥</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">Total Completed</p>
          <p className="text-2xl font-bold">{completedDays.size}/90</p>
        </div>
      </div>

      <div className="bg-[#0D0D1A] border border-[#1E1E2E] rounded-lg p-6">
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}>
          {squares.map((dayNum) => {
            const isCompleted = completedDays.has(dayNum)
            const backgroundColor = isCompleted ? getPhaseColor(dayNum) : '#1A1A2E'
            const tooltip = getDayTooltip(dayNum)

            return (
              <div
                key={dayNum}
                className="relative group"
                style={{
                  aspectRatio: '1/1',
                }}
              >
                <div
                  className="w-full h-full rounded-sm cursor-default transition-all hover:ring-2 hover:ring-white"
                  style={{
                    backgroundColor,
                  }}
                  title={tooltip}
                />
                {/* CSS Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-[#1A1A2E] border border-[#2E2E3E] rounded px-2 py-1 text-xs text-white whitespace-nowrap z-10">
                  {tooltip}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
