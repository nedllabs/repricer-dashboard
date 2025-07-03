"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"

interface BarChartData {
  name: string
  value: number
  color: string
}

interface CustomBarChartProps {
  title: string
  data: BarChartData[]
}

export function CustomBarChart({ title, data }: CustomBarChartProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-[#d9d9d9]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[#4d4d4d]">{title}</h3>
        <button className="text-[#858585] hover:text-[#4d4d4d]">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="8" cy="3" r="1" />
            <circle cx="8" cy="8" r="1" />
            <circle cx="8" cy="13" r="1" />
          </svg>
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#858585" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#858585" }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} fill={(entry) => entry.color}>
              {data.map((entry, index) => (
                <Bar key={`bar-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
