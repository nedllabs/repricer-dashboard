"use client";

import { useState } from "react";
import { Calendar, ChevronDown, Check, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface QuarterRange {
  startYear: number;
  startQuarter: number;
  endYear: number;
  endQuarter: number;
}

const presetRanges = [
  {
    label: "Last 4 Quarters",
    getValue: () => ({
      startYear: 2024,
      startQuarter: 1,
      endYear: 2024,
      endQuarter: 4,
    }),
  },
  {
    label: "Year to Date",
    getValue: () => ({
      startYear: 2025,
      startQuarter: 1,
      endYear: 2025,
      endQuarter: 2,
    }),
  },
  {
    label: "Last 2 Years",
    getValue: () => ({
      startYear: 2023,
      startQuarter: 1,
      endYear: 2024,
      endQuarter: 4,
    }),
  },
  {
    label: "Current Quarter",
    getValue: () => ({
      startYear: 2025,
      startQuarter: 2,
      endYear: 2025,
      endQuarter: 2,
    }),
  },
];

export function CompactDateFilters() {
  const [dateRange, setDateRange] = useState<QuarterRange>({
    startYear: 2019,
    startQuarter: 1,
    endYear: 2025,
    endQuarter: 2,
  });

  const [tempDateRange, setTempDateRange] = useState<QuarterRange>(dateRange);
  const [isOpen, setIsOpen] = useState(false);

  const formatRange = () => {
    return `Q${dateRange.startQuarter} ${dateRange.startYear} - Q${dateRange.endQuarter} ${dateRange.endYear}`;
  };

  const getQuarterCount = () => {
    const startTotal = dateRange.startYear * 4 + dateRange.startQuarter;
    const endTotal = dateRange.endYear * 4 + dateRange.endQuarter;
    return endTotal - startTotal + 1;
  };

  const handlePresetClick = (preset: (typeof presetRanges)[0]) => {
    const newRange = preset.getValue();
    setTempDateRange(newRange);
    setDateRange(newRange);
    setIsOpen(false);
  };

  const updateTempDateRange = (field: keyof QuarterRange, value: number) => {
    setTempDateRange((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    setDateRange(tempDateRange);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempDateRange(dateRange);
    setIsOpen(false);
  };

  const hasChanges = () => {
    return (
      tempDateRange.startYear !== dateRange.startYear ||
      tempDateRange.startQuarter !== dateRange.startQuarter ||
      tempDateRange.endYear !== dateRange.endYear ||
      tempDateRange.endQuarter !== dateRange.endQuarter
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb] mb-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#449cfb]" />
              <span className="text-sm font-medium text-[#374151]">
                Quarter Date Range:
              </span>
            </div>

            {/* Compact Date Range Display */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-9 px-3 text-sm border-[#e5e7eb] hover:border-[#449cfb] bg-transparent"
                >
                  {formatRange()}
                  <ChevronDown className="ml-2 h-3 w-3" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="start">
                <div className="space-y-4">
                  <div className="text-sm font-medium text-[#374151] font-comfortaa">
                    Select Date Range
                  </div>

                  {/* Quick Presets */}
                  <div className="grid grid-cols-2 gap-2">
                    {presetRanges.map((preset) => (
                      <Button
                        key={preset.label}
                        variant="outline"
                        size="sm"
                        onClick={() => handlePresetClick(preset)}
                        className="text-xs h-8 border-[#e5e7eb] hover:bg-[#449cfb] hover:text-white hover:border-[#449cfb]"
                      >
                        {preset.label}
                      </Button>
                    ))}
                  </div>

                  <div className="border-t border-[#e5e7eb] pt-4">
                    <div className="text-xs font-medium text-[#6b7280] mb-3">
                      Custom Range
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-[#6b7280]">Start</label>
                        <div className="flex space-x-2">
                          <Select
                            value={tempDateRange.startYear.toString()}
                            onValueChange={(value) =>
                              updateTempDateRange(
                                "startYear",
                                Number.parseInt(value)
                              )
                            }
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[2019, 2020, 2021, 2022, 2023, 2024, 2025].map(
                                (year) => (
                                  <SelectItem
                                    key={year}
                                    value={year.toString()}
                                  >
                                    {year}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <Select
                            value={`Q${tempDateRange.startQuarter}`}
                            onValueChange={(value) =>
                              updateTempDateRange(
                                "startQuarter",
                                Number.parseInt(value.replace("Q", ""))
                              )
                            }
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Q1">Q1</SelectItem>
                              <SelectItem value="Q2">Q2</SelectItem>
                              <SelectItem value="Q3">Q3</SelectItem>
                              <SelectItem value="Q4">Q4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-[#6b7280]">End</label>
                        <div className="flex space-x-2">
                          <Select
                            value={tempDateRange.endYear.toString()}
                            onValueChange={(value) =>
                              updateTempDateRange(
                                "endYear",
                                Number.parseInt(value)
                              )
                            }
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[2019, 2020, 2021, 2022, 2023, 2024, 2025].map(
                                (year) => (
                                  <SelectItem
                                    key={year}
                                    value={year.toString()}
                                  >
                                    {year}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          <Select
                            value={`Q${tempDateRange.endQuarter}`}
                            onValueChange={(value) =>
                              updateTempDateRange(
                                "endQuarter",
                                Number.parseInt(value.replace("Q", ""))
                              )
                            }
                          >
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Q1">Q1</SelectItem>
                              <SelectItem value="Q2">Q2</SelectItem>
                              <SelectItem value="Q3">Q3</SelectItem>
                              <SelectItem value="Q4">Q4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-4 border-t border-[#e5e7eb]">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancel}
                      className="text-[#6b7280] hover:text-[#374151] h-8"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleApply}
                      disabled={!hasChanges()}
                      className="bg-[#449cfb] hover:bg-[#2f4ca3] text-white h-8 px-4"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Analysis Period Card */}
        <div className="flex flex-col space-y-2">
          <div className="bg-[#f0f9ff] border border-[#93c6fd] rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-[#449cfb]" />
              <div>
                <div className="text-sm font-medium text-[#449cfb]">
                  Analysis Period
                </div>
                <div className="text-xs text-[#2f4ca3]">
                  Q{dateRange.startQuarter} {dateRange.startYear} to Q
                  {dateRange.endQuarter} {dateRange.endYear}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
