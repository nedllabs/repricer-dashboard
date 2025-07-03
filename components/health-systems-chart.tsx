"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { MoreHorizontal, Building2 } from "lucide-react"

interface HealthSystemData {
  name: string
  relativity: number
  claims: string
}

interface HealthSystemsChartProps {
  title: string
  data: HealthSystemData[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#e5e7eb]">
        <div className="flex items-center space-x-2 mb-2">
          <Building2 className="w-4 h-4 text-[#449cfb]" />
          <p className="font-semibold text-[#374151]">{label}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Rate Relativity:</span>
            <span className="text-sm font-medium text-[#374151]">{data.relativity.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Claims Volume:</span>
            <span className="text-sm font-medium text-[#374151]">{data.claims}</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const CustomLabel = ({ x, y, width, value }: any) => {
  if (typeof value !== "number") return null
  return (
    <text x={x + width / 2} y={y - 5} fill="#374151" textAnchor="middle" className="text-xs font-semibold">
      {value.toFixed(2)}
    </text>
  )
}

export function HealthSystemsChart({ title, data }: HealthSystemsChartProps) {
  // Sort data by relativity in descending order
  const sortedData = [...data].sort((a, b) => b.relativity - a.relativity)

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

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sortedData} margin={{ top: 30, right: 30, left: 20, bottom: 80 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#6b7280" }}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              domain={[0.9, 1.4]}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="relativity" fill="#A10839" radius={[4, 4, 0, 0]} label={<CustomLabel />} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-[#449cfb]">
              {Math.max(...sortedData.map((d) => d.relativity)).toFixed(2)}
            </div>
            <div className="text-xs text-[#6b7280]">Highest Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#22c55e]">
              {(sortedData.reduce((sum, d) => sum + d.relativity, 0) / sortedData.length).toFixed(2)}
            </div>
            <div className="text-xs text-[#6b7280]">Average Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#f59e0b]">
              {Math.min(...sortedData.map((d) => d.relativity)).toFixed(2)}
            </div>
            <div className="text-xs text-[#6b7280]">Lowest Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}
