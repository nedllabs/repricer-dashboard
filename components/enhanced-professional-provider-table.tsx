"use client";

import { useState } from "react";
import { Search, ChevronDown, Filter, User, Stethoscope } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ProfessionalProviderTableRow {
  classification: string;
  specialization: string;
  claimCount: string;
  avgBilled: string;
  avgAllowed: string;
  avgMrp: string;
  avgMrr: string;
}

interface EnhancedProfessionalProviderTableProps {
  title: string;
  headers: string[];
  rows: string[][];
}

const classificationOptions = [
  "All Classifications",
  "Physician",
  "Nurse Practitioner",
  "Physician Assistant",
  "Clinical Nurse Specialist",
  "Certified Nurse Midwife",
];

const specializationOptions = [
  "All Specializations",
  "Primary Care",
  "Cardiology",
  "Orthopedics",
  "Dermatology",
  "Neurology",
  "Emergency Medicine",
  "Internal Medicine",
  "Pediatrics",
  "Obstetrics & Gynecology",
  "Psychiatry",
  "Radiology",
  "Anesthesiology",
  "Oncology",
  "Endocrinology",
];

export function EnhancedProfessionalProviderTable({
  title,
  headers,
  rows,
}: EnhancedProfessionalProviderTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [classificationFilter, setClassificationFilter] = useState(
    "All Classifications"
  );
  const [specializationFilter, setSpecializationFilter] = useState(
    "All Specializations"
  );

  // Convert rows to structured data for easier filtering
  const tableData: ProfessionalProviderTableRow[] = rows.map((row) => ({
    classification: row[0],
    specialization: row[1],
    claimCount: row[2],
    avgBilled: row[3],
    avgAllowed: row[4],
    avgMrp: row[5],
    avgMrr: row[6],
  }));

  // Filter data based on search and filter selections
  const filteredData = tableData.filter((row) => {
    const matchesSearch =
      row.classification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClassification =
      classificationFilter === "All Classifications" ||
      row.classification === classificationFilter;
    const matchesSpecialization =
      specializationFilter === "All Specializations" ||
      row.specialization === specializationFilter;

    return matchesSearch && matchesClassification && matchesSpecialization;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setClassificationFilter("All Classifications");
    setSpecializationFilter("All Specializations");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    classificationFilter !== "All Classifications" ||
    specializationFilter !== "All Specializations";

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <Input
              placeholder="Search classification or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#e5e7eb] focus:border-[#449cfb] focus:ring-[#449cfb]"
            />
          </div>

          {/* Classification Filter */}
          <div className="flex items-center space-x-2">
            <Select
              value={classificationFilter}
              onValueChange={setClassificationFilter}
            >
              <SelectTrigger className="w-48 border-[#e5e7eb]">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#6b7280]" />
                  <SelectValue placeholder="Classification" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {classificationOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Specialization Filter */}
          <div className="flex items-center space-x-2">
            <Select
              value={specializationFilter}
              onValueChange={setSpecializationFilter}
            >
              <SelectTrigger className="w-48 border-[#e5e7eb]">
                <div className="flex items-center space-x-2">
                  <Stethoscope className="w-4 h-4 text-[#6b7280]" />
                  <SelectValue placeholder="Specialization" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {specializationOptions.map((option) => (
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
            {classificationFilter !== "All Classifications" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#f0fdf4] text-[#166534] border border-[#86efac]">
                Classification: {classificationFilter}
              </span>
            )}
            {specializationFilter !== "All Specializations" && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#fef3c7] text-[#92400e] border border-[#fcd34d]">
                Specialization: {specializationFilter}
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
                    {row.classification}
                  </td>
                  <td className="p-3 text-[#374151]">{row.specialization}</td>
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
