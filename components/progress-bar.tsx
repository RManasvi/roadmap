interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  label?: string
  showPercent?: boolean
}

export function ProgressBar({ 
  value, 
  max = 100, 
  color = '#00D4FF',
  label,
  showPercent = false 
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100)

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-300">{label}</p>
          {showPercent && <p className="text-sm text-gray-400">{percentage}%</p>}
        </div>
      )}
      <div className="w-full h-2 rounded-full bg-[#1A1A2E] overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        ></div>
      </div>
    </div>
  )
}
