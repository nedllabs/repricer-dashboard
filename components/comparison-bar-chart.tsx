"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ComparisonBarChartData {
  name: string
  billedAmount: number
  allowedAmount: number
  medicareReference: number
}

interface ComparisonBarChartProps {
  title: string
  data: ComparisonBarChartData[]
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
            <span className="text-sm font-medium text-[#374151]">${entry.value.toFixed(2)}B</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function ComparisonBarChart({ title, data }: ComparisonBarChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-lg transition-all duration-300">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-[#374151] mb-2 font-comfortaa">{title}</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#449cfb] to-[#e679f2] rounded-full mx-auto"></div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `$${value.toFixed(1)}B`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} iconType="rect" />
            <Bar dataKey="billedAmount" name="Billed Amount" fill="#A10839" radius={[2, 2, 0, 0]} />
            <Bar dataKey="allowedAmount" name="Allowed Amount" fill="#FB457F" radius={[2, 2, 0, 0]} />
            <Bar dataKey="medicareReference" name="Medicare Reference" fill="#7A0485" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
