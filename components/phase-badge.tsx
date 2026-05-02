import { PHASES } from '@/lib/types'

interface PhaseBadgeProps {
  phase: 1 | 2 | 3 | 4
}

export function PhaseBadge({ phase }: PhaseBadgeProps) {
  const phaseConfig = PHASES.find(p => p.phase === phase)
  if (!phaseConfig) return null

  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
      style={{ backgroundColor: phaseConfig.color }}
    >
      {phaseConfig.label}
    </span>
  )
}
