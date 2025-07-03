"use client"

import { useState } from "react"
import { Database, Clock, CheckCircle2 } from "lucide-react"

export function ProcessedDataFilter() {
  const [selectedOption, setSelectedOption] = useState<"all" | "last">("last")

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-[#449cfb] to-[#5489c2] rounded-xl shadow-sm">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#374151] font-comfortaa">Processed Data</h3>
              <p className="text-sm text-[#6b7280]">Select data processing scope</p>
            </div>
          </div>

          <div className="flex items-center bg-[#f9fafb] rounded-2xl p-2 border border-[#e5e7eb] shadow-sm">
            <label
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedOption === "all"
                  ? "bg-white text-[#374151] shadow-md border border-[#e5e7eb] transform scale-105"
                  : "text-[#6b7280] hover:text-[#374151] hover:bg-white/50"
              }`}
            >
              <div className="relative">
                <input
                  type="radio"
                  name="processedData"
                  value="all"
                  checked={selectedOption === "all"}
                  onChange={() => setSelectedOption("all")}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selectedOption === "all" ? "border-[#449cfb] bg-[#449cfb] shadow-sm" : "border-[#d1d5db] bg-white"
                  }`}
                >
                  {selectedOption === "all" && (
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
                selectedOption === "last"
                  ? "bg-white text-[#374151] shadow-md border border-[#e5e7eb] transform scale-105"
                  : "text-[#6b7280] hover:text-[#374151] hover:bg-white/50"
              }`}
            >
              <div className="relative">
                <input
                  type="radio"
                  name="processedData"
                  value="last"
                  checked={selectedOption === "last"}
                  onChange={() => setSelectedOption("last")}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                    selectedOption === "last" ? "border-[#449cfb] bg-[#449cfb] shadow-sm" : "border-[#d1d5db] bg-white"
                  }`}
                >
                  {selectedOption === "last" && (
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
                {selectedOption === "all" ? "All Processing Runs" : "Latest Processing Run"}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm font-medium text-[#374151]">
              {selectedOption === "all" ? "Complete Dataset" : "Current Session"}
            </div>
            <div className="text-xs text-[#6b7280]">
              {selectedOption === "all" ? "All historical data" : "Most recent processing"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
