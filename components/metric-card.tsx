interface MetricCardProps {
  label: string
  value: string
  unit: string
  color: string
}

export function MetricCard({ label, value, unit, color }: MetricCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-xs border border-[#d9d9d9]">
      <div className="text-sm text-[#858585] mb-2">{label}</div>
      <div className="text-2xl font-semibold mb-1" style={{ color }}>
        {value}
      </div>
      <div className="text-xs text-[#858585]">{unit}</div>
    </div>
  )
}
