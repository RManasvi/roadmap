interface StatsCardProps {
  label: string
  value: string | number
  icon?: string
  color?: string
}

export function StatsCard({ label, value, icon, color }: StatsCardProps) {
  return (
    <div className="rounded-lg bg-[#0D0D1A] border border-[#1E1E2E] p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-3xl font-bold text-white mt-2">{value}</p>
        </div>
        {icon && <span className="text-3xl">{icon}</span>}
      </div>
      {color && (
        <div className="mt-4 h-1 w-full rounded-full" style={{ backgroundColor: color }}></div>
      )}
    </div>
  )
}
