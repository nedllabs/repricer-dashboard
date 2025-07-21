"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calculator } from "lucide-react";
import allowedAmountChangeData from "@/data/allowed-amount-change-data.json";

interface AllowedAmountData {
  quarter: string;
  expectedAmount: number;
  actualAmount: number;
  variance: number;
}

interface AllowedAmountChangeChartProps {
  title: string;
  data?: AllowedAmountData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as AllowedAmountData;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#e5e7eb]">
        <p className="font-semibold text-[#374151] mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Change:</span>
            <span
              className={`text-sm font-medium ${
                data.variance >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {data.variance > 0 ? "+" : ""}
              {data.variance.toFixed(3)}
            </span>
          </div>
          <div className="flex justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Expected:</span>
            <span className="text-sm font-medium text-[#374151]">
              ${data.expectedAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Actual:</span>
            <span className="text-sm font-medium text-[#374151]">
              ${data.actualAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function AllowedAmountChangeChart({
  title,
  data = allowedAmountChangeData.data,
}: AllowedAmountChangeChartProps) {
  const currentVariance = data[data.length - 1]?.variance || 0;
  const avgVariance =
    data.reduce((sum, d) => sum + d.variance, 0) / data.length;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#374151] mb-2 font-comfortaa text-center">
          {title}
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#B782E8] to-[#943B9C] rounded-full mx-auto mb-4"></div>

        <div className="text-center">
          <div
            className={`text-3xl font-bold mb-1 ${
              currentVariance >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {currentVariance > 0 ? "+" : ""}
            {currentVariance.toFixed(3)}
          </div>
          <div className="flex items-center justify-center space-x-1 text-sm text-[#6b7280]">
            <Calculator className="w-4 h-4" />
            <span>Current Quarter Change</span>
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
              tickFormatter={(value) => `${value > 0 ? "+" : ""}${value.toFixed(3)}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="variance" fill="#F5709A" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-sm font-bold text-[#82F09A]">
              +{Math.max(...data.map((d) => d.variance)).toFixed(3)}
            </div>
            <div className="text-xs text-[#6b7280]">Best Quarter</div>
          </div>
          <div>
            <div
              className={`text-sm font-bold ${
                avgVariance >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {avgVariance > 0 ? "+" : ""}
              {avgVariance.toFixed(3)}
            </div>
            <div className="text-xs text-[#6b7280]">Avg Change</div>
          </div>
          <div>
            <div className="text-sm font-bold text-[#BA3761]">
              {Math.min(...data.map((d) => d.variance)).toFixed(3)}
            </div>
            <div className="text-xs text-[#6b7280]">Worst Quarter</div>
          </div>
        </div>
      </div>
    </div>
  );
}
