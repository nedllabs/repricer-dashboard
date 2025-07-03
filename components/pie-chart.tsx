"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface PieChartData {
  name: string
  value: number
  color: string
}

interface CustomPieChartProps {
  title: string
  data: PieChartData[]
}

export function CustomPieChart({ title, data }: CustomPieChartProps) {
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
      <div className="flex items-center">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="ml-6 flex-1">
          {data.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }} />
              <span className="text-sm text-[#858585]">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
