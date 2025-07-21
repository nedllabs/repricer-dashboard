"use client"

import { useState } from "react"
import { Search, ChevronDown, Filter, Building2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import healthSystemOptions from "@/data/health-system-options.json"

interface ProviderTableRow {
  provider: string
  claimCount: string
  avgBilled: string
  avgAllowed: string
  avgMrp: string
  avgMrr: string
  healthSystem: string
}

interface EnhancedProviderTableProps {
  title: string
  headers: string[]
  rows: string[][]
}

export function EnhancedProviderTable({ title, headers, rows }: EnhancedProviderTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [healthSystemFilter, setHealthSystemFilter] = useState("All Health Systems")

  // Convert rows to structured data for easier filtering
  const tableData: ProviderTableRow[] = rows.map((row) => ({
    provider: row[0],
    claimCount: row[1],
    avgBilled: row[2],
    avgAllowed: row[3],
    avgMrp: row[4],
    avgMrr: row[5],
    healthSystem: row[6],
  }))

  // Add more mock data for demonstration
  const expandedTableData: ProviderTableRow[] = [
    ...tableData,
    {
      provider: "Regional Medical Center",
      claimCount: "4,200",
      avgBilled: "$8,500",
      avgAllowed: "$4,100",
      avgMrp: "$3,900",
      avgMrr: "105%",
      healthSystem: "Trinity Health",
    },
    {
      provider: "University Hospital",
      claimCount: "3,800",
      avgBilled: "$11,200",
      avgAllowed: "$5,400",
      avgMrp: "$5,200",
      avgMrr: "104%",
      healthSystem: "Mayo Clinic",
    },
    {
      provider: "Metro Health Center",
      claimCount: "3,600",
      avgBilled: "$7,800",
      avgAllowed: "$3,800",
      avgMrp: "$3,600",
      avgMrr: "106%",
      healthSystem: "Kaiser Permanente",
    },
    {
      provider: "Central Hospital",
      claimCount: "3,200",
      avgBilled: "$9,600",
      avgAllowed: "$4,600",
      avgMrp: "$4,400",
      avgMrr: "105%",
      healthSystem: "Cleveland Clinic",
    },
    {
      provider: "Specialty Medical Center",
      claimCount: "2,900",
      avgBilled: "$12,800",
      avgAllowed: "$6,200",
      avgMrp: "$5,900",
      avgMrr: "105%",
      healthSystem: "Johns Hopkins",
    },
  ]

  // Filter data based on search and health system selection
  const filteredData = expandedTableData.filter((row) => {
    const matchesSearch =
      row.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.healthSystem.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesHealthSystem = healthSystemFilter === "All Health Systems" || row.healthSystem === healthSystemFilter

    return matchesSearch && matchesHealthSystem
  })

  const clearFilters = () => {
    setSearchTerm("")
    setHealthSystemFilter("All Health Systems")
  }

  const hasActiveFilters = searchTerm !== "" || healthSystemFilter !== "All Health Systems"

  return (
    <div className="bg-white rounded-xl shadow-xs border border-[#e5e7eb] overflow-hidden">
      {/* Table Header with Title */}
      <div className="p-4 bg-[#f9fafb] border-b border-[#e5e7eb]">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[#374151] font-comfortaa">{title}</h4>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#6b7280]" />
            <span className="text-sm text-[#6b7280]">
              {filteredData.length} of {expandedTableData.length} records
            </span>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="p-4 bg-white border-b border-[#e5e7eb]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <Input
              placeholder="Search provider name or health system..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#e5e7eb] focus:border-[#449cfb] focus:ring-[#449cfb]"
            />
          </div>

          {/* Health System Filter */}
          <div className="flex items-center space-x-2">
            <Select value={healthSystemFilter} onValueChange={setHealthSystemFilter}>
              <SelectTrigger className="w-64 border-[#e5e7eb]">
                <div className="flex items-center space-x-2">
                  <Building2 className="w-4 h-4 text-[#6b7280]" />
                  <SelectValue placeholder="Health System" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {healthSystemOptions.healthSystemOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-sm text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6] rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#eff6ff] text-[#1d4ed8] border border-[#93c5fd]">
                Search: "{searchTerm}"
              </span>
            )}
            {healthSystemFilter !== "All Health Systems" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#f0fdf4] text-[#166534] border border-[#86efac]">
                Health System: {healthSystemFilter}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#f9fafb]">
              {headers.map((header, index) => (
                <th key={index} className="p-3 text-left font-semibold text-[#6b7280]">
                  <div className="flex items-center space-x-1">
                    <span>{header}</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb]">
            {filteredData.length > 0 ? (
              filteredData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-[#f9fafb] transition-colors">
                  <td className="p-3 text-[#374151] font-medium">{row.provider}</td>
                  <td className="p-3 text-[#374151] font-mono">{row.claimCount}</td>
                  <td className="p-3 text-[#374151] font-mono">{row.avgBilled}</td>
                  <td className="p-3 text-[#374151] font-mono">{row.avgAllowed}</td>
                  <td className="p-3 text-[#374151] font-mono">{row.avgMrp}</td>
                  <td className="p-3 text-[#374151] font-mono font-semibold">{row.avgMrr}</td>
                  <td className="p-3 text-[#374151]">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#f0f9ff] text-[#1d4ed8] border border-[#93c5fd]">
                      {row.healthSystem}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="p-8 text-center text-[#6b7280]">
                  <div className="flex flex-col items-center space-y-2">
                    <Search className="w-8 h-8 text-[#d1d5db]" />
                    <span>No records found matching your filters</span>
                    <button onClick={clearFilters} className="text-sm text-[#449cfb] hover:text-[#2563eb] underline">
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer with Summary */}
      {filteredData.length > 0 && (
        <div className="p-3 bg-[#f9fafb] border-t border-[#e5e7eb] text-sm text-[#6b7280]">
          Showing {filteredData.length} records
          {hasActiveFilters && ` (filtered from ${expandedTableData.length} total)`}
        </div>
      )}
    </div>
  )
}
