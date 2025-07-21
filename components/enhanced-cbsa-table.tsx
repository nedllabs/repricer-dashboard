"use client"

import { useState } from "react"
import { Search, ChevronDown, Filter, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import cbsaOptions from "@/data/cbsa-options.json"

interface CbsaTableRow {
  cbsaName: string
  cbsaCode: string
  claimCount: string
  avgBilled: string
  avgAllowed: string
  avgMrp: string
  avgMrr: string
}

interface EnhancedCbsaTableProps {
  title: string
  headers: string[]
  rows: string[][]
}

export function EnhancedCbsaTable({ title, headers, rows }: EnhancedCbsaTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [cbsaNameFilter, setCbsaNameFilter] = useState("All CBSA Names")

  // Convert rows to structured data for easier filtering
  const tableData: CbsaTableRow[] = rows.map((row) => ({
    cbsaName: row[0],
    cbsaCode: row[1],
    claimCount: row[2],
    avgBilled: row[3],
    avgAllowed: row[4],
    avgMrp: row[5],
    avgMrr: row[6],
  }))

  // Add more mock data for demonstration
  const expandedTableData: CbsaTableRow[] = [
    ...tableData,
    {
      cbsaName: "Dallas-Fort Worth-Arlington, TX",
      cbsaCode: "19100",
      claimCount: "16,500",
      avgBilled: "$9,500",
      avgAllowed: "$4,600",
      avgMrp: "$4,400",
      avgMrr: "105%",
    },
    {
      cbsaName: "Houston-The Woodlands-Sugar Land, TX",
      cbsaCode: "26420",
      claimCount: "14,200",
      avgBilled: "$11,800",
      avgAllowed: "$5,700",
      avgMrp: "$5,500",
      avgMrr: "104%",
    },
    {
      cbsaName: "Washington-Arlington-Alexandria, DC-VA-MD-WV",
      cbsaCode: "47900",
      claimCount: "13,800",
      avgBilled: "$13,200",
      avgAllowed: "$6,400",
      avgMrp: "$6,200",
      avgMrr: "103%",
    },
    {
      cbsaName: "Miami-Fort Lauderdale-West Palm Beach, FL",
      cbsaCode: "33100",
      claimCount: "12,500",
      avgBilled: "$10,800",
      avgAllowed: "$5,200",
      avgMrp: "$5,000",
      avgMrr: "104%",
    },
    {
      cbsaName: "Philadelphia-Camden-Wilmington, PA-NJ-DE-MD",
      cbsaCode: "37980",
      claimCount: "11,900",
      avgBilled: "$11,500",
      avgAllowed: "$5,500",
      avgMrp: "$5,300",
      avgMrr: "104%",
    },
    {
      cbsaName: "Atlanta-Sandy Springs-Roswell, GA",
      cbsaCode: "12060",
      claimCount: "10,800",
      avgBilled: "$9,200",
      avgAllowed: "$4,400",
      avgMrp: "$4,200",
      avgMrr: "105%",
    },
    {
      cbsaName: "Boston-Cambridge-Newton, MA-NH",
      cbsaCode: "14460",
      claimCount: "9,600",
      avgBilled: "$14,500",
      avgAllowed: "$7,000",
      avgMrp: "$6,800",
      avgMrr: "103%",
    },
  ]

  // Filter data based on search and CBSA name selection
  const filteredData = expandedTableData.filter((row) => {
    const matchesSearch =
      row.cbsaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.cbsaCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCbsaName = cbsaNameFilter === "All CBSA Names" || row.cbsaName === cbsaNameFilter

    return matchesSearch && matchesCbsaName
  })

  const clearFilters = () => {
    setSearchTerm("")
    setCbsaNameFilter("All CBSA Names")
  }

  const hasActiveFilters = searchTerm !== "" || cbsaNameFilter !== "All CBSA Names"

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
              placeholder="Search CBSA name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#e5e7eb] focus:border-[#449cfb] focus:ring-[#449cfb]"
            />
          </div>

          {/* CBSA Name Filter */}
          <div className="flex items-center space-x-2">
            <Select value={cbsaNameFilter} onValueChange={setCbsaNameFilter}>
              <SelectTrigger className="w-80 border-[#e5e7eb]">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#6b7280]" />
                  <SelectValue placeholder="CBSA Name" />
                </div>
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {cbsaOptions.cbsaNameOptions.map((option) => (
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
            {cbsaNameFilter !== "All CBSA Names" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#f0fdf4] text-[#166534] border border-[#86efac]">
                CBSA: {cbsaNameFilter.length > 30 ? cbsaNameFilter.substring(0, 30) + "..." : cbsaNameFilter}
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
                  <td className="p-3 text-[#374151] font-medium">{row.cbsaName}</td>
                  <td className="p-3 text-[#374151] font-mono">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]">
                      {row.cbsaCode}
                    </span>
                  </td>
                  <td className="p-3 text-[#374151] font-mono">{row.claimCount}</td>
                  <td className="p-3 text-[#374151] font-mono">{row.avgBilled}</td>
                  <td className="p-3 text-[#374151] font-mono">{row.avgAllowed}</td>
                  <td className="p-3 text-[#374151] font-mono">{row.avgMrp}</td>
                  <td className="p-3 text-[#374151] font-mono font-semibold">{row.avgMrr}</td>
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
