"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import methodologyOptions from "@/data/methodology-options.json"

interface MethodologyOption {
  id: string
  name: string
  description: string
  category: string
}

export function MethodologySelector() {
  // Set IPPS as default selection instead of "all"
  const [selectedMethodology, setSelectedMethodology] = useState("ipps")

  // Set initial collapsed state: only Inpatient is expanded
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
    new Set(["Outpatient", "Medicare Fee Schedule"]),
  )

  const toggleCategory = (category: string) => {
    const newCollapsed = new Set(collapsedCategories)
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category)
    } else {
      newCollapsed.add(category)
    }
    setCollapsedCategories(newCollapsed)
  }

  const groupedMethodologies = methodologyOptions.methodologies.reduce(
    (acc, methodology) => {
      if (!acc[methodology.category]) {
        acc[methodology.category] = []
      }
      acc[methodology.category].push(methodology)
      return acc
    },
    {} as Record<string, MethodologyOption[]>,
  )

  // Get the selected methodology name for display
  const getSelectedMethodologyName = () => {
    if (selectedMethodology === "all") {
      return "All Methodologies"
    }
    const methodology = methodologyOptions.methodologies.find((m) => m.id === selectedMethodology)
    return methodology?.name || "Unknown"
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e5e7eb]">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#374151] mb-2 font-comfortaa">SELECT REIMBURSEMENT METHODOLOGY</h3>
        <p className="text-sm text-[#6b7280]">Choose a methodology to filter the data</p>
      </div>

      {/* Selected Methodology Display */}
      <div className="mb-4 p-3 bg-gradient-to-r from-[#f0f9ff] to-[#eff6ff] rounded-lg border border-[#93c6fd]">
        <div className="text-sm font-medium text-[#449cfb]">
          Now Selected: <span className="font-semibold">{getSelectedMethodologyName()}</span>
        </div>
      </div>

      <div className="space-y-1">
        {/* All Methodologies Option */}
        <div
          onClick={() => setSelectedMethodology("all")}
          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
            selectedMethodology === "all"
              ? "bg-gradient-to-r from-[#f0f9ff] to-[#eff6ff] border-[#449cfb] text-[#449cfb] shadow-sm"
              : "bg-[#f9fafb] border-[#e5e7eb] hover:bg-[#f3f4f6] text-[#374151] hover:border-[#d1d5db]"
          }`}
        >
          <div className="font-semibold text-base">All Methodologies</div>
          <div className="text-sm opacity-75 mt-1">All payment types combined</div>
          <div className="text-xs opacity-60 mt-1">Category: All Categories</div>
        </div>

        {/* Categorized Methodologies */}
        {Object.entries(groupedMethodologies).map(([category, items]) => {
          const isCollapsed = collapsedCategories.has(category)
          const categoryColor =
            methodologyOptions.categoryColors[category as keyof typeof methodologyOptions.categoryColors]

          return (
            <div key={category} className="border border-[#e5e7eb] rounded-lg overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-4 bg-[#f9fafb] hover:bg-[#f3f4f6] transition-colors duration-200 flex items-center justify-between border-b border-[#e5e7eb]"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColor }} />
                  <span className="font-semibold text-[#374151] font-comfortaa">{category}</span>
                  <span className="text-xs bg-[#e5e7eb] text-[#6b7280] px-2 py-1 rounded-full">
                    {items.length} items
                  </span>
                </div>
                {isCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-[#6b7280]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#6b7280]" />
                )}
              </button>

              {/* Category Items */}
              {!isCollapsed && (
                <div className="bg-white">
                  {items.map((methodology) => (
                    <div
                      key={methodology.id}
                      onClick={() => setSelectedMethodology(methodology.id)}
                      className={`p-4 cursor-pointer transition-all duration-200 border-l-4 hover:bg-[#f9fafb] ${
                        selectedMethodology === methodology.id
                          ? `bg-gradient-to-r from-[#f0f9ff] to-[#eff6ff] border-l-[${categoryColor}] shadow-sm`
                          : "border-l-transparent hover:border-l-[#d1d5db]"
                      }`}
                      style={{
                        borderLeftColor: selectedMethodology === methodology.id ? categoryColor : "transparent",
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div
                            className={`font-semibold text-base ${
                              selectedMethodology === methodology.id ? "text-[#374151]" : "text-[#374151]"
                            }`}
                          >
                            {methodology.name}
                          </div>
                          <div className="text-sm text-[#6b7280] mt-1 leading-relaxed">{methodology.description}</div>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColor }} />
                            <span className="text-xs text-[#9ca3af]">Category: {methodology.category}</span>
                          </div>
                        </div>
                        {selectedMethodology === methodology.id && (
                          <div className="ml-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColor }} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected Summary - Keep the existing one at the bottom for additional details */}
      {selectedMethodology !== "all" && (
        <div className="mt-6 p-4 bg-gradient-to-r from-[#f0f9ff] to-[#eff6ff] rounded-lg border border-[#93c6fd]">
          <div className="text-sm font-medium text-[#449cfb] mb-1">Currently Selected:</div>
          <div className="text-sm text-[#2f4ca3]">
            {methodologyOptions.methodologies.find((m) => m.id === selectedMethodology)?.name} -{" "}
            {methodologyOptions.methodologies.find((m) => m.id === selectedMethodology)?.description}
          </div>
        </div>
      )}
    </div>
  )
}
