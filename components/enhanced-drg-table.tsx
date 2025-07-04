"use client";

import { useState } from "react";
import { Search, ChevronDown, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import drgFilterOptions from "@/data/drg-filter-options.json";

interface DrgTableRow {
  drg: string;
  description: string;
  claimCount: string;
  avgBilled: string;
  avgAllowed: string;
  avgMrp: string;
  avgMrr: string;
  level1?: string;
  level2?: string;
  level3?: string;
}

interface EnhancedDrgTableProps {
  title: string;
  headers: string[];
  rows: string[][];
  type: "inpatient" | "outpatient";
}

export function EnhancedDrgTable({
  title,
  headers,
  rows,
  type,
}: EnhancedDrgTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [level1Filter, setLevel1Filter] = useState("All Categories");
  const [level2Filter, setLevel2Filter] = useState("All Subcategories");
  const [level3Filter, setLevel3Filter] = useState("All Procedures");

  // Convert rows to structured data for easier filtering
  const tableData: DrgTableRow[] = rows.map((row) => ({
    drg: row[0],
    description: row[1],
    claimCount: row[2],
    avgBilled: row[3],
    avgAllowed: row[4],
    avgMrp: row[5],
    avgMrr: row[6],
    // Mock level assignments for demo - in real app this would come from data
    level1: row[0] === "470" ? "Inpatient Surgery" : "Inpatient Medical",
    level2: row[0] === "470" ? "Orthopedic Surgery" : "Neurology",
    level3: row[0] === "470" ? "Spinal Disorders/Injuries" : "CVA w MCC",
  }));

  // Filter data based on search and level selections
  const filteredData = tableData.filter((row) => {
    const matchesSearch =
      row.drg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel1 =
      level1Filter === "All Categories" || row.level1 === level1Filter;
    const matchesLevel2 =
      level2Filter === "All Subcategories" || row.level2 === level2Filter;
    const matchesLevel3 =
      level3Filter === "All Procedures" || row.level3 === level3Filter;

    return matchesSearch && matchesLevel1 && matchesLevel2 && matchesLevel3;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setLevel1Filter("All Categories");
    setLevel2Filter("All Subcategories");
    setLevel3Filter("All Procedures");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    level1Filter !== "All Categories" ||
    level2Filter !== "All Subcategories" ||
    level3Filter !== "All Procedures";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      {/* Table Header with Title */}
      <div className="p-4 bg-[#f9fafb] border-b border-[#e5e7eb]">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[#374151] font-comfortaa">
            {title}
          </h4>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-[#6b7280]" />
            <span className="text-sm text-[#6b7280]">
              {filteredData.length} of {tableData.length} records
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
              placeholder="Search DRG code or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#e5e7eb] focus:border-[#449cfb] focus:ring-[#449cfb]"
            />
          </div>

          {/* Level Filters */}
          <div className="flex items-center space-x-2 z-50">
            <Select value={level1Filter} onValueChange={setLevel1Filter}>
              <SelectTrigger className="w-40 border-[#e5e7eb]">
                <SelectValue placeholder="Level 1" />
              </SelectTrigger>
              <SelectContent>
                {drgFilterOptions.level1Options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={level2Filter} onValueChange={setLevel2Filter}>
              <SelectTrigger className="w-40 border-[#e5e7eb]">
                <SelectValue placeholder="Level 2" />
              </SelectTrigger>
              <SelectContent>
                {drgFilterOptions.level2Options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {type === "inpatient" && (
              <Select value={level3Filter} onValueChange={setLevel3Filter}>
                <SelectTrigger className="w-48 border-[#e5e7eb]">
                  <SelectValue placeholder="Level 3" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {drgFilterOptions.level3Options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

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
            {level1Filter !== "All Categories" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#f0fdf4] text-[#166534] border border-[#86efac]">
                L1: {level1Filter}
              </span>
            )}
            {level2Filter !== "All Subcategories" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]">
                L2: {level2Filter}
              </span>
            )}
            {level3Filter !== "All Procedures" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#fce7f3] text-[#be185d] border border-[#f9a8d4]">
                L3:{" "}
                {level3Filter.length > 30
                  ? level3Filter.substring(0, 30) + "..."
                  : level3Filter}
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
                <th
                  key={index}
                  className="p-3 text-left font-semibold text-[#6b7280]"
                >
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
                <tr
                  key={rowIndex}
                  className="hover:bg-[#f9fafb] transition-colors"
                >
                  <td className="p-3 text-[#374151] font-medium">{row.drg}</td>
                  <td className="p-3 text-[#374151]">{row.description}</td>
                  <td className="p-3 text-[#374151] font-mono">
                    {row.claimCount}
                  </td>
                  <td className="p-3 text-[#374151] font-mono">
                    {row.avgBilled}
                  </td>
                  <td className="p-3 text-[#374151] font-mono">
                    {row.avgAllowed}
                  </td>
                  <td className="p-3 text-[#374151] font-mono">{row.avgMrp}</td>
                  <td className="p-3 text-[#374151] font-mono font-semibold">
                    {row.avgMrr}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="p-8 text-center text-[#6b7280]"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <Search className="w-8 h-8 text-[#d1d5db]" />
                    <span>No records found matching your filters</span>
                    <button
                      onClick={clearFilters}
                      className="text-sm text-[#449cfb] hover:text-[#2563eb] underline"
                    >
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
          {hasActiveFilters && ` (filtered from ${tableData.length} total)`}
        </div>
      )}
    </div>
  );
}
