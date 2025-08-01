"use client"

import { useState } from "react"
import { Database, Clock, CheckCircle2 } from "lucide-react"

export function ProcessedDataFilter({ value, onChange }: { value: "all" | "last", onChange: (val: "all" | "last") => void }) {
  return (
    <div className="bg-white rounded-xl p-4 lg:p-6 shadow-xs border border-[#e5e7eb] mb-6">
      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-linear-to-r from-[#449cfb] to-[#5489c2] rounded-xl shadow-xs">
            <Database className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#374151] font-comfortaa">Processed Data</h3>
            <p className="text-sm text-[#6b7280]">Select data processing scope</p>
          </div>
        </div>

        {/* Mobile Radio Options - Stacked */}
        <div className="space-y-3">
          <label
            className={`flex items-center space-x-3 p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
              value === "all"
                ? "bg-white text-[#374151] shadow-md border-[#449cfb] transform scale-[1.02]"
                : "text-[#6b7280] hover:text-[#374151] hover:bg-[#f9fafb] border-[#e5e7eb]"
            }`}
          >
            <div className="relative">
              <input
                type="radio"
                name="processedData"
                value="all"
                checked={value === "all"}
                onChange={() => onChange("all")}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                  value === "all" ? "border-[#449cfb] bg-[#449cfb] shadow-xs" : "border-[#d1d5db] bg-white"
                }`}
              >
                {value === "all" && (
                  <div className="w-full h-full rounded-full bg-white scale-50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#449cfb]"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-1">
              <Database className="w-4 h-4" />
              <span className="font-medium text-sm">ALL RUNS</span>
            </div>
          </label>

          <label
            className={`flex items-center space-x-3 p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
              value === "last"
                ? "bg-white text-[#374151] shadow-md border-[#449cfb] transform scale-[1.02]"
                : "text-[#6b7280] hover:text-[#374151] hover:bg-[#f9fafb] border-[#e5e7eb]"
            }`}
          >
            <div className="relative">
              <input
                type="radio"
                name="processedData"
                value="last"
                checked={value === "last"}
                onChange={() => onChange("last")}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                  value === "last" ? "border-[#449cfb] bg-[#449cfb] shadow-xs" : "border-[#d1d5db] bg-white"
                }`}
              >
                {value === "last" && (
                  <div className="w-full h-full rounded-full bg-white scale-50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#449cfb]"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-1">
              <Clock className="w-4 h-4" />
              <span className="font-medium text-sm">LAST RUN</span>
            </div>
          </label>
        </div>

        {/* Mobile Status Indicator */}
        <div className="bg-[#f0f9ff] border border-[#93c6fd] rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#449cfb] shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-medium text-[#449cfb]">Active Filter:</div>
              <div className="text-sm text-[#2f4ca3] truncate">
                {value === "all" ? "All Processing Runs" : "Latest Processing Run"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-linear-to-r from-[#449cfb] to-[#5489c2] rounded-xl shadow-xs">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#374151] font-comfortaa">Processed Data</h3>
              <p className="text-sm text-[#6b7280]">Select data processing scope</p>
            </div>
          </div>

          <div className="flex items-center bg-[#f9fafb] rounded-2xl p-2 border border-[#e5e7eb] shadow-xs">
            <label
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                value === "all"
                  ? "bg-white text-[#374151] shadow-md border border-[#e5e7eb] transform scale-105"
                  : "text-[#6b7280] hover:text-[#374151] hover:bg-white/50"
              }`}
            >
              <div className="relative">
                <input
                  type="radio"
                  name="processedData"
                  value="all"
                  checked={value === "all"}
                  onChange={() => onChange("all")}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    value === "all" ? "border-[#449cfb] bg-[#449cfb] shadow-xs" : "border-[#d1d5db] bg-white"
                  }`}
                >
                  {value === "all" && (
                    <div className="w-full h-full rounded-full bg-white scale-50 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#449cfb]"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4" />
                <span className="font-medium text-sm">ALL RUNS</span>
              </div>
            </label>

            <label
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                value === "last"
                  ? "bg-white text-[#374151] shadow-md border border-[#e5e7eb] transform scale-105"
                  : "text-[#6b7280] hover:text-[#374151] hover:bg-white/50"
              }`}
            >
              <div className="relative">
                <input
                  type="radio"
                  name="processedData"
                  value="last"
                  checked={value === "last"}
                  onChange={() => onChange("last")}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    value === "last" ? "border-[#449cfb] bg-[#449cfb] shadow-xs" : "border-[#d1d5db] bg-white"
                  }`}
                >
                  {value === "last" && (
                    <div className="w-full h-full rounded-full bg-white scale-50 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#449cfb]"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium text-sm">LAST RUN</span>
              </div>
            </label>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[#f0f9ff] border border-[#93c6fd] rounded-lg px-3 py-2">
            <CheckCircle2 className="w-4 h-4 text-[#449cfb]" />
            <div className="text-sm">
              <span className="font-medium text-[#449cfb]">Active Filter:</span>
              <span className="text-[#2f4ca3] ml-1">
                {value === "all" ? "All Processing Runs" : "Latest Processing Run"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
