"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { AlertTriangle } from "lucide-react";
import statisticalOutlierData from "@/data/statistical-outlier-data.json";

interface OutlierData {
  provider: string;
  claimCount: number;
  rateRelativity: number;
  isOutlier: boolean;
  severity: "low" | "medium" | "high";
  category: string;
}

interface HistogramBin {
  binStart: number;
  binEnd: number;
  binCenter: number;
  frequency: number;
  claimsCount: number;
  normalCurve: number;
  isOutlierRange: boolean;
}

interface StatisticalOutlierChartProps {
  title: string;
  data?: OutlierData[];
}

const severityColors = {
  low: "#82F09A",
  medium: "#ADA64B",
  high: "#BA3761",
};

// Function to create histogram bins from the data
const createHistogramBins = (
  data: OutlierData[],
  numBins: number = 12
): HistogramBin[] => {
  const values = data.map((d) => d.rateRelativity);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binWidth = (max - min) / numBins;

  // Calculate mean and standard deviation for normal distribution
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    values.length;
  const stdDev = Math.sqrt(variance);

  // Determine outlier thresholds (mean ± 2 standard deviations)
  const lowerThreshold = mean - 2 * stdDev;
  const upperThreshold = mean + 2 * stdDev;

  const bins: HistogramBin[] = [];

  for (let i = 0; i < numBins; i++) {
    const binStart = min + i * binWidth;
    const binEnd = min + (i + 1) * binWidth;
    const binCenter = binStart + binWidth / 2;

    // Count providers in this bin
    const providersInBin = data.filter(
      (d) => d.rateRelativity >= binStart && d.rateRelativity < binEnd
    );
    const frequency = providersInBin.length;

    // Calculate total claims in this bin
    const claimsCount = providersInBin.reduce(
      (sum, provider) => sum + provider.claimCount,
      0
    );

    // Calculate normal distribution curve value (scaled to fit claims data)
    const normalDensity =
      (1 / (stdDev * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * Math.pow((binCenter - mean) / stdDev, 2));

    // Scale the normal curve to match the claims data range
    const maxClaims = Math.max(
      ...bins.map((b) => b?.claimsCount || 0),
      claimsCount
    );
    const scaleFactor =
      data.reduce((sum, d) => sum + d.claimCount, 0) /
      (4 * Math.sqrt(2 * Math.PI) * stdDev);
    const normalCurve = normalDensity * scaleFactor;

    // Check if this bin range is in outlier territory
    const isOutlierRange =
      binCenter < lowerThreshold || binCenter > upperThreshold;

    bins.push({
      binStart,
      binEnd,
      binCenter,
      frequency,
      claimsCount,
      normalCurve,
      isOutlierRange,
    });
  }

  return bins;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as HistogramBin;
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-[#e5e7eb]">
        <div className="flex items-center space-x-2 mb-2">
          <div
            className={`w-3 h-3 rounded-full ${
              data.isOutlierRange ? "bg-red-500" : "bg-blue-500"
            }`}
          />
          <p className="font-semibold text-[#374151]">
            Rate Relativity Distribution
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Rate Range:</span>
            <span className="text-sm font-medium text-[#374151]">
              {data.binStart.toFixed(0)}% - {data.binEnd.toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Providers:</span>
            <span className="text-sm font-medium text-[#374151]">
              {data.frequency}
            </span>
          </div>
          <div className="flex justify-between space-x-4">
            <span className="text-sm text-[#6b7280]">Total Claims:</span>
            <span className="text-sm font-medium text-[#374151]">
              {data.claimsCount.toLocaleString()}
            </span>
          </div>
          {data.isOutlierRange && (
            <div className="flex justify-between space-x-4">
              <span className="text-sm text-[#6b7280]">Status:</span>
              <span className="text-sm font-medium text-red-500">
                Outlier Range
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export function StatisticalOutlierChart({
  title,
  data = statisticalOutlierData.data,
}: StatisticalOutlierChartProps) {
  const histogramData = createHistogramBins(data);
  const outliers = data.filter((d) => d.isOutlier);
  const values = data.map((d) => d.rateRelativity);
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const totalClaims = data.reduce((sum, d) => sum + d.claimCount, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#374151] mb-2 font-comfortaa text-center">
          {title || "Claims Distribution by Medicare Rate Relativity"}
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#449cfb] to-[#BA3761] rounded-full mx-auto mb-4"></div>

        <div className="text-center">
          <div className="text-3xl font-bold text-[#449cfb] mb-1">
            {totalClaims.toLocaleString()}
          </div>
          <div className="flex items-center justify-center space-x-1 text-sm text-[#6b7280]">
            <span>total claims across {data.length} providers</span>
          </div>
          <div className="mt-2">
            <span className="text-sm text-[#BA3761] font-medium">
              {outliers.length} outlier providers flagged
            </span>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={histogramData}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="binCenter"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `${value.toFixed(0)}%`}
              label={{
                value: "Medicare Rate Relativity (%)",
                position: "insideBottom",
                offset: -5,
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => value.toLocaleString()}
              label={{
                value: "Total Claims",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Mean reference line */}
            <ReferenceLine x={mean} stroke="#6b7280" strokeDasharray="2 2" />

            {/* Histogram bars */}
            <Bar
              dataKey="claimsCount"
              fill="#87CEEB"
              stroke="#449cfb"
              strokeWidth={1}
              radius={[0, 0, 0, 0]}
            />

            {/* Normal distribution curve */}
            <Line
              type="monotone"
              dataKey="normalCurve"
              stroke="#dc2626"
              strokeWidth={3}
              dot={false}
              connectNulls={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend and Summary */}
      <div className="mt-4 pt-4 border-t border-[#e5e7eb]">
        <div className="grid grid-cols-2 gap-6">
          {/* Legend */}
          <div>
            <div className="text-sm font-medium text-[#374151] mb-2">
              Legend
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#87CEEB] border border-[#449cfb]"></div>
                <span className="text-xs text-[#6b7280]">
                  Claims Distribution
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-0.5 bg-[#dc2626]"></div>
                <span className="text-xs text-[#6b7280]">
                  Expected Distribution Curve
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-0.5 border-t-2 border-dashed border-[#6b7280]"></div>
                <span className="text-xs text-[#6b7280]">
                  Mean Rate Relativity
                </span>
              </div>
            </div>
          </div>

          {/* Summary Stats */}
          <div>
            <div className="text-sm font-medium text-[#374151] mb-2">
              Distribution Summary
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-sm font-bold text-[#449cfb]">
                  {mean.toFixed(0)}%
                </div>
                <div className="text-xs text-[#6b7280]">Mean Rate</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#BA3761]">
                  {outliers.length}
                </div>
                <div className="text-xs text-[#6b7280]">Outliers</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#82F09A]">
                  {data.length - outliers.length}
                </div>
                <div className="text-xs text-[#6b7280]">Normal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
