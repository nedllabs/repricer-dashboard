"use client"

import { useState } from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface QuarterRange {
  startYear: number
  startQuarter: number
  endYear: number
  endQuarter: number
}

interface QuarterDatePickerProps {
  value: QuarterRange
  onChange: (range: QuarterRange) => void
}

const quarters = [
  { id: 1, label: "Q1", months: "Jan-Mar", color: "#449cfb" },
  { id: 2, label: "Q2", months: "Apr-Jun", color: "#5489c2" },
  { id: 3, label: "Q3", months: "Jul-Sep", color: "#1ac1eb" },
  { id: 4, label: "Q4", months: "Oct-Dec", color: "#93c6fd" },
]

const presetRanges = [
  { label: "Last 4 Quarters", getValue: () => ({ startYear: 2024, startQuarter: 1, endYear: 2024, endQuarter: 4 }) },
  { label: "Year to Date", getValue: () => ({ startYear: 2025, startQuarter: 1, endYear: 2025, endQuarter: 2 }) },
  { label: "Last 2 Years", getValue: () => ({ startYear: 2023, startQuarter: 1, endYear: 2024, endQuarter: 4 }) },
  { label: "Current Quarter", getValue: () => ({ startYear: 2025, startQuarter: 2, endYear: 2025, endQuarter: 2 }) },
]

export function QuarterDatePicker({ value, onChange }: QuarterDatePickerProps) {
  const [currentYear, setCurrentYear] = useState(2024)
  const [selectionMode, setSelectionMode] = useState<"start" | "end">("start")
  const [isOpen, setIsOpen] = useState(false)

  const handleQuarterClick = (year: number, quarter: number) => {
    if (selectionMode === "start") {
      onChange({
        ...value,
        startYear: year,
        startQuarter: quarter,
      })
      setSelectionMode("end")
    } else {
      onChange({
        ...value,
        endYear: year,
        endQuarter: quarter,
      })
      setSelectionMode("start")
      setIsOpen(false)
    }
  }

  const handlePresetClick = (preset: (typeof presetRanges)[0]) => {
    onChange(preset.getValue())
    setIsOpen(false)
  }

  const isQuarterInRange = (year: number, quarter: number) => {
    const startDate = value.startYear * 10 + value.startQuarter
    const endDate = value.endYear * 10 + value.endQuarter
    const currentDate = year * 10 + quarter
    return currentDate >= startDate && currentDate <= endDate
  }

  const isQuarterSelected = (year: number, quarter: number) => {
    return (
      (value.startYear === year && value.startQuarter === quarter) ||
      (value.endYear === year && value.endQuarter === quarter)
    )
  }

  const formatRange = () => {
    return `Q${value.startQuarter} ${value.startYear} - Q${value.endQuarter} ${value.endYear}`
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full justify-between bg-white border-[#d9d9d9] hover:bg-[#f5f5f5]"
      >
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-[#449cfb]" />
          <span className="text-[#4d4d4d]">{formatRange()}</span>
        </div>
        <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? "rotate-90" : ""}`} />
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-2 shadow-lg border-[#d9d9d9]">
          <CardContent className="p-6">
            {/* Selection Mode Indicator */}
            <div className="mb-4 p-3 bg-[#f5f5f5] rounded-lg">
              <div className="text-sm font-medium text-[#4d4d4d] mb-1">
                {selectionMode === "start" ? "Select Start Quarter" : "Select End Quarter"}
              </div>
              <div className="text-xs text-[#858585]">
                {selectionMode === "start"
                  ? "Choose the beginning of your date range"
                  : "Choose the end of your date range"}
              </div>
            </div>

            {/* Preset Ranges */}
            <div className="mb-6">
              <div className="text-sm font-medium text-[#4d4d4d] mb-3">Quick Select</div>
              <div className="grid grid-cols-2 gap-2">
                {presetRanges.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePresetClick(preset)}
                    className="text-xs border-[#d9d9d9] hover:bg-[#449cfb] hover:text-white hover:border-[#449cfb]"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Year Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentYear(currentYear - 1)}
                className="text-[#858585] hover:text-[#4d4d4d]"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="text-lg font-semibold text-[#4d4d4d]">{currentYear}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentYear(currentYear + 1)}
                className="text-[#858585] hover:text-[#4d4d4d]"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Quarter Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {quarters.map((quarter) => {
                const isSelected = isQuarterSelected(currentYear, quarter.id)
                const isInRange = isQuarterInRange(currentYear, quarter.id)

                return (
                  <button
                    key={quarter.id}
                    onClick={() => handleQuarterClick(currentYear, quarter.id)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-[#449cfb] bg-[#449cfb] text-white shadow-md"
                        : isInRange
                          ? "border-[#93c6fd] bg-[#f0f9ff] text-[#449cfb]"
                          : "border-[#d9d9d9] bg-white text-[#4d4d4d] hover:border-[#449cfb] hover:bg-[#f0f9ff]"
                    }`}
                  >
                    <div className="text-lg font-semibold">{quarter.label}</div>
                    <div className="text-xs opacity-75">{quarter.months}</div>
                  </button>
                )
              })}
            </div>

            {/* Multi-Year View */}
            <div className="border-t border-[#d9d9d9] pt-4">
              <div className="text-sm font-medium text-[#4d4d4d] mb-3">Other Years</div>
              <div className="flex flex-wrap gap-2">
                {[2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map((year) => (
                  <Button
                    key={year}
                    variant={year === currentYear ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentYear(year)}
                    className={`text-xs ${
                      year === currentYear
                        ? "bg-[#449cfb] text-white"
                        : "border-[#d9d9d9] text-[#858585] hover:border-[#449cfb] hover:text-[#449cfb]"
                    }`}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6 pt-4 border-t border-[#d9d9d9]">
              <Button variant="ghost" onClick={() => setIsOpen(false)} className="text-[#858585] hover:text-[#4d4d4d]">
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)} className="bg-[#449cfb] hover:bg-[#2f4ca3] text-white">
                Apply Range
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
