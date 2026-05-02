'use client'

import Link from 'next/link'
import { Day } from '@/lib/types'
import { PHASES } from '@/lib/types'

interface DayCardProps {
  day: Day
  isCompleted: boolean
  isCurrent: boolean
  isLocked: boolean
  onNavigate?: (dayNumber: number) => void
}

export function DayCard({
  day,
  isCompleted,
  isCurrent,
  isLocked,
  onNavigate,
}: DayCardProps) {
  const phaseConfig = PHASES.find(p => p.phase === day.phase)

  const baseClass =
    'flex flex-col gap-2 p-4 rounded-lg border transition-all cursor-pointer'

  let className = baseClass

  if (isLocked) {
    className += ' bg-[#09090E] border-[#1E1E2E] cursor-not-allowed opacity-50'
  } else if (isCompleted) {
    className += ' bg-[#0D0D1A] border-green-600 bg-green-950/20'
  } else if (isCurrent) {
    className += ` bg-[#0D0D1A] border-[3px]`
    className += ` hover:bg-[#1A1A2E]`
    // Add glow effect with inline style
  } else {
    className += ' bg-[#0D0D1A] border-[#1E1E2E] hover:border-[#2E2E3E]'
  }

  const cardContent = (
    <>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {isCompleted && <span className="text-green-400">✓</span>}
            <p className="font-semibold text-white">Day {day.day}</p>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2">{day.title}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-semibold px-2 py-1 rounded text-white"
          style={{ backgroundColor: phaseConfig?.color || '#gray' }}
        >
          {phaseConfig?.label}
        </span>
        {isLocked && <span className="text-lg">🔒</span>}
      </div>
    </>
  )

  if (isLocked) {
    return <div className={className}>{cardContent}</div>
  }

  return (
    <Link href={`/day/${day.day}`} onClick={() => onNavigate?.(day.day)}>
      <div
        className={className}
        style={
          isCurrent && phaseConfig
            ? {
                borderColor: phaseConfig.color,
                boxShadow: `0 0 8px ${phaseConfig.color}40`,
              }
            : undefined
        }
      >
        {cardContent}
      </div>
    </Link>
  )
}
