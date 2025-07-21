"use client";

import { useState } from "react";
import { Search, ChevronDown, Filter, MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface CountyTableRow {
  county: string;
  code: string;
  claimCount: string;
  avgBilled: string;
  avgAllowed: string;
  avgMrp: string;
  avgMrr: string;
}

interface EnhancedCountyTableProps {
  title: string;
  headers: string[];
  rows: string[][];
}

export function EnhancedCountyTable({
  title,
  headers,
  rows,
}: EnhancedCountyTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [countyFilter, setCountyFilter] = useState("All Counties");

  // Convert rows to structured data for easier filtering
  const tableData: CountyTableRow[] = rows.map((row) => ({
    county: row[0],
    code: row[1],
    claimCount: row[2],
    avgBilled: row[3],
    avgAllowed: row[4],
    avgMrp: row[5],
    avgMrr: row[6],
  }));

  // Get unique county names for filter options
  const countyOptions = [
    "All Counties",
    ...Array.from(new Set(tableData.map((row) => row.county))),
  ];

  // Filter data based on search and county selection
  const filteredData = tableData.filter((row) => {
    const matchesSearch =
      row.county.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCounty =
      countyFilter === "All Counties" || row.county === countyFilter;

    return matchesSearch && matchesCounty;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setCountyFilter("All Counties");
  };

  const hasActiveFilters = searchTerm !== "" || countyFilter !== "All Counties";

  return (
    <div className="bg-white rounded-xl shadow-xs border border-[#e5e7eb] overflow-hidden">
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
              placeholder="Search county name or code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#e5e7eb] focus:border-[#449cfb] focus:ring-[#449cfb]"
            />
          </div>

          {/* County Filter */}
          <div className="flex items-center space-x-2">
            <Select value={countyFilter} onValueChange={setCountyFilter}>
              <SelectTrigger className="w-64 border-[#e5e7eb]">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#6b7280]" />
                  <SelectValue placeholder="County Name" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {countyOptions.map((option) => (
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
            {countyFilter !== "All Counties" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#f0fdf4] text-[#166534] border border-[#86efac]">
                County: {countyFilter}
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
                  <td className="p-3 text-[#374151] font-medium">
                    {row.county}
                  </td>
                  <td className="p-3 text-[#374151] font-mono">{row.code}</td>
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
                  <td className="p-3 text-[#374151] font-mono">{row.avgMrr}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length}
                  className="p-8 text-center text-[#6b7280]"
                >
                  No records found matching the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
