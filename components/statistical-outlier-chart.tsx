"use client"

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts"
import { AlertTriangle } from "lucide-react"
import statisticalOutlierData from "@/data/statistical-outlier-data.json"

interface OutlierData {
  provider: string
  claimCount: number
  rateRelativity: number
  isOutlier: boolean
  severity: "low" | "medium" | "high"
  category: string
}

interface StatisticalOutlierChartProps {
  title: string
  data?: OutlierData[]
}

const severityColors = {
  low: "#82F09A",
  medium: "#ADA64B",
  high: "#BA3761",
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#e5e7eb]">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className={`w-4 h-4 ${data.isOutlier ? "text-red-500" : "text-green-500"}`} />
          <p className="font-semibold text-[#374151]">{data.provider}</p>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Claims:</span>
            <span className="text-sm font-medium text-[#374151]">{data.claimCount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Rate Relativity:</span>
            <span className="text-sm font-medium text-[#374151]">{data.rateRelativity}%</span>
          </div>
          <div className="flex justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Status:</span>
            <span className={`text-sm font-medium ${data.isOutlier ? "text-red-500" : "text-green-500"}`}>
              {data.isOutlier ? "Outlier" : "Normal"}
            </span>
          </div>
          {data.isOutlier && (
            <div className="flex justify-between space-x-4">
              <span className="text-sm text-[#6b7280]">Severity:</span>
              <span className={`text-sm font-medium capitalize`} style={{ color: severityColors[data.severity] }}>
                {data.severity}
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }
  return null
}

export function StatisticalOutlierChart({ title, data = statisticalOutlierData.data }: StatisticalOutlierChartProps) {
  const outliers = data.filter((d) => d.isOutlier)
  const highSeverityOutliers = outliers.filter((d) => d.severity === "high")
  const avgRateRelativity = data.reduce((sum, d) => sum + d.rateRelativity, 0) / data.length

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#374151] mb-2 font-comfortaa text-center">{title}</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#BA3761] to-[#F08C76] rounded-full mx-auto mb-4"></div>

        <div className="text-center">
          <div className="text-3xl font-bold text-[#BA3761] mb-1">{outliers.length}</div>
          <div className="flex items-center justify-center space-x-1 text-sm text-[#6b7280]">
            <AlertTriangle className="w-4 h-4" />
            <span>of {data.length} providers flagged</span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              type="number"
              dataKey="claimCount"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              name="Claim Count"
            />
            <YAxis
              type="number"
              dataKey="rateRelativity"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `${value}%`}
              name="Rate Relativity"
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Reference lines for outlier detection */}
            <ReferenceLine y={avgRateRelativity} stroke="#6b7280" strokeDasharray="2 2" />
            <ReferenceLine y={avgRateRelativity + 30} stroke="#ADA64B" strokeDasharray="5 5" />
            <ReferenceLine y={avgRateRelativity - 30} stroke="#ADA64B" strokeDasharray="5 5" />

            <Scatter name="Providers" data={data} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.isOutlier ? severityColors[entry.severity] : "#82F09A"}
                  fillOpacity={entry.isOutlier ? 0.8 : 0.6}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Legend and Summary */}
      <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
        <div className="grid grid-cols-2 gap-6">
          {/* Legend */}
          <div>
            <div className="text-sm font-medium text-[#374151] mb-2">Legend</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#82F09A]"></div>
                <span className="text-xs text-[#6b7280]">Normal Range</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ADA64B]"></div>
                <span className="text-xs text-[#6b7280]">Medium Risk Outlier</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#BA3761]"></div>
                <span className="text-xs text-[#6b7280]">High Risk Outlier</span>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div>
            <div className="text-sm font-medium text-[#374151] mb-2">Outlier Summary</div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-bold text-[#BA3761]">{highSeverityOutliers.length}</div>
                <div className="text-xs text-[#6b7280]">High Risk</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#ADA64B]">
                  {outliers.filter((d) => d.severity === "medium").length}
                </div>
                <div className="text-xs text-[#6b7280]">Medium Risk</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#449CFB]">{avgRateRelativity.toFixed(0)}%</div>
                <div className="text-xs text-[#6b7280]">Avg Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
