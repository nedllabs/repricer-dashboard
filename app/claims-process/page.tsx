"use client";
import { useState } from "react";
import { ProcessedDataFilter } from "@/components/processed-data-filter";
import { EnhancedMetricCard } from "@/components/enhanced-metric-card";
import { ClaimsProcessPieChart } from "@/components/claims-process-pie-chart";
import { RepricingStatusChart } from "@/components/repricing-status-chart";
import { ClaimsProcessTable } from "@/components/claims-process-table";
import { MethodologySelector } from "@/components/methodology-selector";
import { ModernSectionHeader } from "@/components/modern-section-header";

// --- ALL RUNS DATASET (totals add up to 145M) ---
const allRunsClaimsProcessMetrics = [
  { label: "Total Claims", value: "145M", unit: "#", color: "#449cfb" },
  { label: "Total Claim Lines", value: "2.15B", unit: "Lines", color: "#449cfb" },
  { label: "Total Repriced Claims", value: "137.75M", unit: "Claims", color: "#82F09A" },
  { label: "Total Exclusions", value: "7.25M", unit: "Claims", color: "#f59e0b" },
  { label: "Total Errors", value: "2.0M", unit: "Claims", color: "#ef4444" },
  { label: "Total Duplicates", value: "1.5M", unit: "Claims", color: "#8b5cf6" },
];

const allRunsClaimVolumeData = [
  { name: "PFS", value: 45.2, color: "#449CFB" }, // 65.5M
  { name: "OPPS", value: 32.8, color: "#F08C76" }, // 47.6M
  { name: "IPPS", value: 17.0, color: "#F5709A" }, // 24.7M
  { name: "ASC", value: 2.8, color: "#B782E8" }, // 4.1M
  { name: "SNF", value: 1.2, color: "#82F09A" }, // 1.7M
  { name: "Other", value: 1.0, color: "#FFB366" }, // 1.5M
];

const allRunsRepricingStatusData = [
  { name: "PFS", success: 62000000, exclusions: 3000000, errors: 500000 },
  { name: "OPPS", success: 45000000, exclusions: 2000000, errors: 600000 },
  { name: "IPPS", success: 23000000, exclusions: 1200000, errors: 500000 },
  { name: "ASC", success: 3900000, exclusions: 150000, errors: 60000 },
  { name: "SNF", success: 1600000, exclusions: 70000, errors: 30000 },
  { name: "Other", success: 1300000, exclusions: 80000, errors: 20000 },
];

const allRunsTableData = [
  { category: "Uploaded Claims", type: "-", totalClaims: "145M", totalClaimLines: "2.15B" },
  { type: "Service Date not Supported", totalClaims: "2.5M", totalClaimLines: "37.5M", isSubItem: true },
  { type: "Low Allowed Amount (less than $0)", totalClaims: "1.5M", totalClaimLines: "22.5M", isSubItem: true },
  { category: "Exclusions", type: "Provider Location not supported", totalClaims: "1.5M", totalClaimLines: "22.5M" },
  { type: "Coordination of Benefits", totalClaims: "2.0M", totalClaimLines: "30M", isSubItem: true },
  { type: "Missing DRG", totalClaims: "1.75M", totalClaimLines: "26.25M", isSubItem: true },
  { category: "Errors", type: "Missing Admit Date", totalClaims: "1.0M", totalClaimLines: "15M" },
  { type: "Invalid Length of Stay", totalClaims: "1.0M", totalClaimLines: "15M", isSubItem: true },
  { category: "Repriced", type: "-", totalClaims: "137.75M", totalClaimLines: "2.06B" },
];

// --- LAST RUN DATASET (unchanged) ---
const lastRunClaimsProcessMetrics = [
  { label: "Total Claims", value: "3.5M", unit: "#", color: "#449cfb" },
  { label: "Total Claim Lines", value: "52.5M", unit: "Lines", color: "#449cfb" },
  { label: "Total Repriced Claims", value: "3.26M", unit: "Claims", color: "#82F09A" },
  { label: "Total Exclusions", value: "140K", unit: "Claims", color: "#f59e0b" },
  { label: "Total Errors", value: "63K", unit: "Claims", color: "#ef4444" },
  { label: "Total Duplicates", value: "37K", unit: "Claims", color: "#8b5cf6" },
];

const lastRunClaimVolumeData = [
  { name: "PFS", value: 42.6, color: "#449CFB" },
  { name: "OPPS", value: 33.5, color: "#F08C76" },
  { name: "IPPS", value: 19.8, color: "#F5709A" },
  { name: "ASC", value: 3.1, color: "#B782E8" },
  { name: "IRF", value: 1.0, color: "#82F09A" },
];

const lastRunRepricingStatusData = [
  { name: "PFS", success: 1302000, exclusions: 45000, errors: 8000 },
  { name: "OPPS", success: 1023000, exclusions: 32000, errors: 5000 },
  { name: "IPPS", success: 604500, exclusions: 18000, errors: 3500 },
  { name: "ASC", success: 85000, exclusions: 4000, errors: 1000 },
  { name: "IRF", success: 25000, exclusions: 2000, errors: 500 },
];

const lastRunTableData = [
  { category: "Uploaded Claims", type: "-", totalClaims: "650K", totalClaimLines: "1.63M" },
  { type: "Service Date not Supported", totalClaims: "8,500", totalClaimLines: "21,250", isSubItem: true },
  { type: "Low Allowed Amount (less than $0)", totalClaims: "3,200", totalClaimLines: "8,000", isSubItem: true },
  { category: "Exclusions", type: "Provider Location not supported", totalClaims: "3,300", totalClaimLines: "8,250" },
  { type: "Coordination of Benefits", totalClaims: "4,300", totalClaimLines: "12,250", isSubItem: true },
  { type: "Missing DRG", totalClaims: "7,800", totalClaimLines: "19,500", isSubItem: true },
  { category: "Errors", type: "Missing Admit Date", totalClaims: "4,830", totalClaimLines: "12,075" },
  { type: "Invalid Length of Stay", totalClaims: "115", totalClaimLines: "423", isSubItem: true },
  { category: "Repriced", type: "-", totalClaims: "604,500", totalClaimLines: "1.51M" },
];

export default function ClaimsProcessPage() {
  const [filter, setFilter] = useState<"all" | "last">("last");

  const claimsProcessMetrics = filter === "all" ? allRunsClaimsProcessMetrics : lastRunClaimsProcessMetrics;
  const claimVolumeData = filter === "all" ? allRunsClaimVolumeData : lastRunClaimVolumeData;
  const repricingStatusData = filter === "all" ? allRunsRepricingStatusData : lastRunRepricingStatusData;
  const tableData = filter === "all" ? allRunsTableData : lastRunTableData;

  return (
    <main className="p-3 lg:p-6 space-y-4 lg:space-y-6">
      <ModernSectionHeader
        title="Claims Process Summary"
        subtitle="Overview of claims processing status and type breakdown"
      />

      <ProcessedDataFilter value={filter} onChange={setFilter} />

      {/* Mobile: 2 columns, Desktop: 6 columns */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4">
        {claimsProcessMetrics.map((metric, index) => (
          <EnhancedMetricCard
            key={index}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            color={metric.color}
          />
        ))}
      </div>

      {/* Mobile: Stack charts vertically, Desktop: Side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <ClaimsProcessPieChart
          title="Claim Volume by Claim Type"
          data={claimVolumeData}
        />
        <RepricingStatusChart
          title="Repricing status by Claim Type"
          data={repricingStatusData}
        />
      </div>

      {/* Mobile: Stack table and selector vertically, Desktop: Side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="xl:col-span-3">
          <ClaimsProcessTable data={tableData} />
        </div>
        <div>
          <MethodologySelector />
        </div>
      </div>
    </main>
  );
}
