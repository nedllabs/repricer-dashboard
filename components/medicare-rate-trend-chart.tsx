"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import medicareRateTrendData from "@/data/medicare-rate-trend-data.json"

interface TrendData {
  quarter: string
  rate: number
  target: number
}

interface MedicareRateTrendChartProps {
  title: string
  data?: TrendData[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#e5e7eb]">
        <p className="font-semibold text-[#374151] mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between space-x-4 mb-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-sm text-[#6b7280]">{entry.name}:</span>
            </div>
            <span className="text-sm font-medium text-[#374151]">{entry.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function MedicareRateTrendChart({ title, data = medicareRateTrendData.data }: MedicareRateTrendChartProps) {
  const currentRate = data[data.length - 1]?.rate || 0
  const previousRate = data[data.length - 2]?.rate || 0
  const trend = currentRate - previousRate
  const isPositive = trend > 0

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#374151] mb-2 font-comfortaa text-center">{title}</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#449cfb] to-[#e679f2] rounded-full mx-auto mb-4"></div>

        <div className="text-center">
          <div className="text-3xl font-bold text-[#449CFB] mb-1">{currentRate.toFixed(1)}%</div>
          <div
            className={`flex items-center justify-center space-x-1 text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}
          >
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>
              {isPositive ? "+" : ""}
              {trend.toFixed(1)}% vs Previous Quarter
            </span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="quarter"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              domain={[115, 130]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={120} stroke="#ADA64B" strokeDasharray="5 5" label="Target" />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#449CFB"
              strokeWidth={3}
              dot={{ fill: "#449CFB", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#449CFB", strokeWidth: 2, fill: "#ffffff" }}
              name="Medicare Rate Relativity"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-[#82F09A]">{Math.max(...data.map((d) => d.rate)).toFixed(1)}%</div>
            <div className="text-xs text-[#6b7280]">Peak Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#449CFB]">
              {(data.reduce((sum, d) => sum + d.rate, 0) / data.length).toFixed(1)}%
            </div>
            <div className="text-xs text-[#6b7280]">Average</div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#ADA64B]">120.0%</div>
            <div className="text-xs text-[#6b7280]">Target</div>
          </div>
        </div>
      </div>
    </div>
  )
}
