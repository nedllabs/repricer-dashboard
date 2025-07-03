"use client"

import { useState } from "react"
import { QuarterDatePicker } from "./quarter-date-picker"
import { Button } from "@/components/ui/button"
import { RotateCcw, TrendingUp } from "lucide-react"

interface QuarterRange {
  startYear: number
  startQuarter: number
  endYear: number
  endQuarter: number
}

export function EnhancedDateFilters() {
  const [dateRange, setDateRange] = useState<QuarterRange>({
    startYear: 2019,
    startQuarter: 1,
    endYear: 2025,
    endQuarter: 2,
  })

  const handleReset = () => {
    setDateRange({
      startYear: 2024,
      startQuarter: 1,
      endYear: 2024,
      endQuarter: 4,
    })
  }

  const getQuarterCount = () => {
    const startTotal = dateRange.startYear * 4 + dateRange.startQuarter
    const endTotal = dateRange.endYear * 4 + dateRange.endQuarter
    return endTotal - startTotal + 1
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-[#d9d9d9] mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[#4d4d4d] font-comfortaa">Date Range Selection</h3>
          <p className="text-sm text-[#858585]">Select quarters to analyze your healthcare data</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <div className="text-sm font-medium text-[#4d4d4d]">{getQuarterCount()} Quarters</div>
            <div className="text-xs text-[#858585]">Selected</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="border-[#d9d9d9] text-[#858585] hover:border-[#449cfb] hover:text-[#449cfb] bg-transparent"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-[#4d4d4d] mb-2">Quarter Date Range</label>
          <QuarterDatePicker value={dateRange} onChange={setDateRange} />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="bg-[#f0f9ff] border border-[#93c6fd] rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[#449cfb]" />
              <div>
                <div className="text-sm font-medium text-[#449cfb]">Analysis Period</div>
                <div className="text-xs text-[#2f4ca3]">
                  Q{dateRange.startQuarter} {dateRange.startYear} to Q{dateRange.endQuarter} {dateRange.endYear}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
