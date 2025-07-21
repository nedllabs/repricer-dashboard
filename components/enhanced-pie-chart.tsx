"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface EnhancedPieChartProps {
  title: string;
  data: PieChartData[];
}

const CustomLegend = ({ payload }: { payload?: unknown[] }) => {
  if (!payload?.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-[#4d4d4d] font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 0.6; // Position labels at 60% of the radius
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-sm font-semibold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export function EnhancedPieChart({ title, data }: EnhancedPieChartProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-xs border border-[#d9d9d9]">
      <h3 className="text-lg font-medium text-[#4d4d4d] text-center mb-6">
        {title}
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
