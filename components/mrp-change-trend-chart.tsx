"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { DollarSign } from "lucide-react";
import mrpChangeTrendData from "@/data/mrp-change-trend-data.json";

interface MrpChangeData {
  quarter: string;
  change: number;
  cumulative: number;
}

interface MrpChangeTrendChartProps {
  title: string;
  data?: MrpChangeData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#e5e7eb]">
        <p className="font-semibold text-[#374151] mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between space-x-4 mb-1"
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-[#6b7280]">{entry.name}:</span>
            </div>
            <span className="text-sm font-medium text-[#374151]">
              {entry.value > 0 ? "+" : ""}
              {entry.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function MrpChangeTrendChart({
  title,
  data = mrpChangeTrendData.data,
}: MrpChangeTrendChartProps) {
  const currentChange = data[data.length - 1]?.change || 0;
  const cumulativeChange = data[data.length - 1]?.cumulative || 0;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#374151] mb-2 font-comfortaa text-center">
          {title}
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#82F09A] to-[#62915D] rounded-full mx-auto mb-4"></div>

        <div className="text-center">
          <div
            className={`text-3xl font-bold mb-1 ${
              currentChange >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {currentChange > 0 ? "+" : ""}
            {currentChange.toFixed(1)}%
          </div>
          <div className="flex items-center justify-center space-x-1 text-sm text-[#6b7280]">
            <DollarSign className="w-4 h-4" />
            <span>Cumulative: +{cumulativeChange.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
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
              tickFormatter={(value) => `${value > 0 ? "+" : ""}${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="2 2" />
            <Bar
              dataKey="change"
              fill="#82F09A"
              stroke="#82F09A"
              strokeWidth={1}
              radius={[2, 2, 0, 0]}
              name="Quarterly Change"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-bold text-[#82F09A]">
              +{Math.max(...data.map((d) => d.change)).toFixed(1)}%
            </div>
            <div className="text-xs text-[#6b7280]">Best Quarter</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#449CFB]">
              +
              {(
                data.reduce((sum, d) => sum + d.change, 0) / data.length
              ).toFixed(1)}
              %
            </div>
            <div className="text-xs text-[#6b7280]">Avg Change</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#82F09A]">
              +{cumulativeChange.toFixed(1)}%
            </div>
            <div className="text-xs text-[#6b7280]">Total Growth</div>
          </div>
        </div>
      </div>
    </div>
  );
}
