"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ComparisonBarChartData {
  name: string;
  billedAmount: number;
  allowedAmount: number;
  medicareReference: number;
}

interface RateRelativityData {
  name: string;
  relativity: number;
}

interface ComparisonBarChartProps {
  title: string;
  data: ComparisonBarChartData[] | RateRelativityData[];
  type?: "comparison" | "rateRelativity";
}

const CustomTooltip = ({ active, payload, label, type }: any) => {
  if (active && payload && payload.length) {
    if (type === "rateRelativity") {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#e5e7eb]">
          <p className="font-semibold text-[#374151] mb-2">{label}</p>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#f087fb]" />
            <span className="text-sm text-[#6b7280]">Rate Relativity:</span>
            <span className="text-sm font-medium text-[#374151]">
              {payload[0].value}%
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#e5e7eb]">
        <p className="font-semibold text-[#374151] mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2 mb-1">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-[#6b7280]">{entry.name}:</span>
            <span className="text-sm font-medium text-[#374151]">
              ${entry.value.toFixed(2)}B
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const customLegendOrder = [
  { dataKey: "billedAmount", color: "#449CFB", label: "Billed Amount" },
  { dataKey: "allowedAmount", color: "#F08C76", label: "Allowed Amount" },
  { dataKey: "medicareReference", color: "#F5709A", label: "Medicare Reference" },
];

function CustomLegend() {
  return (
    <ul className="flex flex-row justify-center gap-6 mt-2">
      {customLegendOrder.map((item) => (
        <li key={item.dataKey} className="flex items-center space-x-2">
          <span
            className="inline-block w-4 h-4 rounded"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-xs text-[#374151]">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export function ComparisonBarChart({
  title,
  data,
  type = "comparison",
}: ComparisonBarChartProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-lg transition-all duration-300">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-[#374151] mb-2 font-comfortaa">
          {title}
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#449cfb] to-[#f087fb] rounded-full mx-auto"></div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) =>
                type === "rateRelativity"
                  ? `${value}%`
                  : `$${value.toFixed(1)}B`
              }
            />
            <Tooltip
              content={(props) => <CustomTooltip {...props} type={type} />}
            />
            {type === "rateRelativity" ? (
              <Bar
                dataKey="relativity"
                name="Rate Relativity"
                fill="#f087fb"
                radius={[2, 2, 0, 0]}
              />
            ) : (
              <>
                <Legend content={<CustomLegend />} />
                <Bar
                  dataKey="billedAmount"
                  name="Billed Amount"
                  fill="#449CFB"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="allowedAmount"
                  name="Allowed Amount"
                  fill="#F08C76"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="medicareReference"
                  name="Medicare Reference"
                  fill="#F5709A"
                  radius={[2, 2, 0, 0]}
                />
              </>
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
