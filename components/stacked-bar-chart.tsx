"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"

interface StackedBarChartData {
  name: string
  success: number
  exclusions: number
  errors: number
}

interface StackedBarChartProps {
  title: string
  data: StackedBarChartData[]
}

export function StackedBarChart({ title, data }: StackedBarChartProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-xs border border-[#d9d9d9]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[#4d4d4d]">{title}</h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#858585" }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#858585" }}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} iconType="rect" />
            <Bar dataKey="success" stackId="a" fill="#22c55e" name="Success" radius={[0, 0, 0, 0]} />
            <Bar dataKey="exclusions" stackId="a" fill="#f59e0b" name="Exclusions" radius={[0, 0, 0, 0]} />
            <Bar dataKey="errors" stackId="a" fill="#ef4444" name="Errors" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
