"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface RepricingStatusData {
  name: string
  success: number
  exclusions: number
  errors: number
}

interface RepricingStatusChartProps {
  title: string
  data: RepricingStatusData[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#e5e7eb]">
        <p className="font-semibold text-[#374151] mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-[#6b7280]">{entry.name}:</span>
            <span className="text-sm font-medium text-[#374151]">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function RepricingStatusChart({ title, data }: RepricingStatusChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-xs border border-[#e5e7eb]">
      <h3 className="text-lg font-semibold text-[#374151] text-center mb-6 font-comfortaa">{title}</h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} iconType="rect" />
            <Bar dataKey="success" name="Success" fill="#82F09A" radius={[0, 0, 0, 0]} />
            <Bar dataKey="exclusions" name="Exclusions" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="errors" name="Errors" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
