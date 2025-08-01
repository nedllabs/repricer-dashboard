"use client";

import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EnhancedMetricCardProps {
  label: string;
  value: string;
  unit: string;
  color: string;
  trend?: number;
  previousValue?: string;
  tooltip?: string;
}

export function EnhancedMetricCard({
  label,
  value,
  unit,
  color,
  trend = 0,
  previousValue,
  tooltip,
}: EnhancedMetricCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const CardContent = () => (
    <div
      className="group relative bg-white rounded-xl p-6 shadow-xs border border-[#e5e7eb] hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}05)`,
        }}
      />

      {/* Top Border Accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-all duration-300"
        style={{ backgroundColor: isHovered ? color : "transparent" }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4 min-h-12">
          <div className="text-sm font-medium text-[#4d4d4d] leading-tight font-opensans flex items-center space-x-2">
            <span>{label}</span>
            {tooltip && (
              <Info className="w-3 h-3 text-[#9ca3af] opacity-60 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
          {trend !== 0 && (
            <div
              className={`hidden flex items-center space-x-1 ${
                trend > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend > 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span className="text-xs font-medium">{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        <div className="mb-2">
          <div className="text-3xl font-bold font-comfortaa" style={{ color }}>
            {value}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs font-medium text-[#858585] uppercase tracking-wide">
            {unit}
          </div>
          {previousValue && (
            <div className="text-xs text-[#c0c0c0]">vs {previousValue}</div>
          )}
        </div>
      </div>
    </div>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <CardContent />
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="max-w-xs p-3 bg-[#374151] text-white text-sm rounded-lg shadow-lg"
          >
            <div className="font-medium mb-1">Formula:</div>
            <div className="text-xs leading-relaxed">{tooltip}</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return <CardContent />;
}
