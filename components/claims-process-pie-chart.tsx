"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

interface ClaimsProcessPieChartProps {
  title: string;
  data: Array<{
    name: string;
    value: number;
    claimVolume?: string;
    allowedAmount?: string;
    color: string;
  }>;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-[#e5e7eb]">
        <div className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.payload.color }}
          />
          <span className="font-medium text-[#374151]">
            {data.payload.name}
          </span>
        </div>
        <div className="text-sm text-[#6b7280] mt-1">
          {data.payload.allowedAmount
            ? `${data.payload.allowedAmount} allowed`
            : data.payload.claimVolume
            ? `${data.payload.claimVolume} claims`
            : `${data.value.toFixed(1)}% of total`}
        </div>
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
}: any) => {
  if (percent < 0.05) return null; // Don't show labels for very small slices

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
      className="text-sm font-bold drop-shadow-sm"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

export function ClaimsProcessPieChart({
  title,
  data,
}: ClaimsProcessPieChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-[#e5e7eb] hover:shadow-lg transition-all duration-300">
      <div className="text-center mb-4 lg:mb-6">
        <h3 className="text-base lg:text-lg font-semibold text-[#374151] mb-2 font-comfortaa">
          {title}
        </h3>
        <div className="w-12 lg:w-16 h-1 bg-gradient-to-r from-[#449cfb] to-[#e679f2] rounded-full mx-auto"></div>
      </div>

      {/* Mobile: Always use vertical layout (< lg breakpoint) */}
      <div className="flex flex-col lg:hidden">
        {/* Chart centered - Mobile optimized */}
        <div className="mx-auto w-56 h-56 sm:w-64 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={activeIndex === index ? "#ffffff" : "none"}
                    strokeWidth={activeIndex === index ? 3 : 0}
                    style={{
                      filter:
                        activeIndex === index ? "brightness(1.1)" : "none",
                      transform:
                        activeIndex === index ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "center",
                      transition: "all 0.2s ease-in-out",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend below the chart - Mobile grid layout */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {data.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                activeIndex === index
                  ? "bg-gray-50 shadow-sm"
                  : "hover:bg-gray-50"
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <div>
                  <div className="text-xs font-medium text-[#374151]">
                    {entry.name}
                  </div>
                  <div className="text-xs text-[#6b7280]">
                    {entry.value.toFixed(1)}%
                  </div>
                </div>
              </div>
              {(entry.allowedAmount || entry.claimVolume) && (
                <div className="text-right">
                  <div
                    className="text-xs font-bold"
                    style={{ color: entry.color }}
                  >
                    {entry.allowedAmount || entry.claimVolume}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: Use horizontal layout (>= lg breakpoint) */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* Chart on the left - Made bigger */}
        <div className="flex-shrink-0 w-80 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={140}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={activeIndex === index ? "#ffffff" : "none"}
                    strokeWidth={activeIndex === index ? 3 : 0}
                    style={{
                      filter:
                        activeIndex === index ? "brightness(1.1)" : "none",
                      transform:
                        activeIndex === index ? "scale(1.05)" : "scale(1)",
                      transformOrigin: "center",
                      transition: "all 0.2s ease-in-out",
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend on the right - Made smaller and more compact */}
        <div className="flex-1 space-y-1.5">
          {data.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2.5 rounded-lg transition-all duration-200 cursor-pointer ${
                activeIndex === index
                  ? "bg-gray-50 shadow-sm"
                  : "hover:bg-gray-50"
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <div>
                  <div className="text-xs font-medium text-[#374151]">
                    {entry.name}
                  </div>
                  <div className="text-xs text-[#6b7280]">
                    {entry.value.toFixed(1)}% of total
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-sm font-bold"
                  style={{ color: entry.color }}
                >
                  {entry.allowedAmount ||
                    entry.claimVolume ||
                    `${entry.value.toFixed(1)}%`}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
