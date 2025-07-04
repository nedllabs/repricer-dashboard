"use client"

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Calculator } from "lucide-react"
import allowedAmountChangeData from "@/data/allowed-amount-change-data.json"

interface AllowedAmountData {
  quarter: string
  expectedAmount: number
  actualAmount: number
  variance: number
}

interface AllowedAmountChangeChartProps {
  title: string
  data?: AllowedAmountData[]
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
            <span className="text-sm font-medium text-[#374151]">
              {entry.dataKey === "variance"
                ? `${entry.value > 0 ? "+" : ""}${entry.value.toFixed(1)}%`
                : `$${entry.value.toLocaleString()}`}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function AllowedAmountChangeChart({
  title,
  data = allowedAmountChangeData.data,
}: AllowedAmountChangeChartProps) {
  const currentActual = data[data.length - 1]?.actualAmount || 0
  const currentExpected = data[data.length - 1]?.expectedAmount || 0
  const currentVariance = data[data.length - 1]?.variance || 0

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#374151] mb-2 font-comfortaa text-center">{title}</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#B782E8] to-[#943B9C] rounded-full mx-auto mb-4"></div>

        <div className="text-center">
          <div className="text-3xl font-bold text-[#B782E8] mb-1">${currentActual.toLocaleString()}</div>
          <div
            className={`flex items-center justify-center space-x-1 text-sm ${currentVariance >= 0 ? "text-green-500" : "text-red-500"}`}
          >
            <Calculator className="w-4 h-4" />
            <span>
              {currentVariance > 0 ? "+" : ""}
              {currentVariance.toFixed(1)}% vs Expected
            </span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              yAxisId="amount"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
            />
            <YAxis
              yAxisId="variance"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "20px" }} />
            <Bar
              yAxisId="amount"
              dataKey="expectedAmount"
              fill="#e5e7eb"
              name="Expected Amount"
              radius={[2, 2, 0, 0]}
            />
            <Bar yAxisId="amount" dataKey="actualAmount" fill="#B782E8" name="Actual Amount" radius={[2, 2, 0, 0]} />
            <Line
              yAxisId="variance"
              type="monotone"
              dataKey="variance"
              stroke="#ADA64B"
              strokeWidth={3}
              dot={{ fill: "#ADA64B", strokeWidth: 2, r: 4 }}
              name="Variance %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-bold text-[#B782E8]">
              ${Math.max(...data.map((d) => d.actualAmount)).toLocaleString()}
            </div>
            <div className="text-xs text-[#6b7280]">Peak Amount</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#82F09A]">
              +{Math.max(...data.map((d) => d.variance)).toFixed(1)}%
            </div>
            <div className="text-xs text-[#6b7280]">Best Variance</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#449CFB]">
              {(data.reduce((sum, d) => sum + d.variance, 0) / data.length).toFixed(1)}%
            </div>
            <div className="text-xs text-[#6b7280]">Avg Variance</div>
          </div>
        </div>
      </div>
    </div>
  )
}
