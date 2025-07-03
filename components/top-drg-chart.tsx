"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { MoreHorizontal } from "lucide-react"

interface TopDrgChartData {
  drg: string
  relativity: number
}

interface TopDrgChartProps {
  title: string
  data: TopDrgChartData[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-[#e5e7eb]">
        <p className="font-semibold text-[#374151]">DRG {label}</p>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#449cfb]" />
          <span className="text-sm text-[#6b7280]">Rate Relativity:</span>
          <span className="text-sm font-medium text-[#374151]">{payload[0].value.toFixed(2)}</span>
        </div>
      </div>
    )
  }
  return null
}

const CustomLabel = ({ x, y, width, value }: any) => {
  if (typeof value !== "number") return null
  return (
    <text x={x + width / 2} y={y - 5} fill="#374151" textAnchor="middle" className="text-sm font-semibold">
      {value.toFixed(2)}
    </text>
  )
}

export function TopDrgChart({ title, data }: TopDrgChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="text-center flex-1">
          <h3 className="text-lg font-semibold text-[#374151] mb-2 font-comfortaa">{title}</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-[#449cfb] to-[#e679f2] rounded-full mx-auto"></div>
        </div>
        <button className="p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors">
          <MoreHorizontal className="w-5 h-5 text-[#6b7280]" />
        </button>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="drg" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              domain={[0, 1.5]}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="relativity" fill="#A10839" radius={[4, 4, 0, 0]} label={<CustomLabel />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
