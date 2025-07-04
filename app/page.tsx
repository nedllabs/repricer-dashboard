"use client";

import { useState } from "react";
import { EnhancedMetricCard } from "@/components/enhanced-metric-card";
import { ModernPieChart } from "@/components/modern-pie-chart";
import { ReimbursementTable } from "@/components/reimbursement-table";
import { ComparisonBarChart } from "@/components/comparison-bar-chart";
import { MobileDateFilters } from "@/components/mobile-date-filters";
import { ModernSectionHeader } from "@/components/modern-section-header";
import { MobileTabNavigation } from "@/components/mobile-tab-navigation";
import { InpatientTab } from "@/components/inpatient-tab";
import { OutpatientTab } from "@/components/outpatient-tab";
import dashboardData from "@/data/dashboard-data.json";

function SummaryTab() {
  return (
    <>
      <div className="space-y-4 lg:space-y-6">
        {/* Mobile: Stack metrics vertically, Desktop: Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          {dashboardData.metrics.slice(0, 5).map((metric, index) => (
            <EnhancedMetricCard
              key={index}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              color={metric.color}
              trend={index % 2 === 0 ? 12.5 : -3.2}
              previousValue={index === 0 ? "3.2M" : undefined}
              tooltip={metric.tooltip}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 max-w-2xl sm:max-w-full mx-auto">
          <EnhancedMetricCard
            label={dashboardData.metrics[5].label}
            value={dashboardData.metrics[5].value}
            unit={dashboardData.metrics[5].unit}
            color={dashboardData.metrics[5].color}
            trend={8.7}
            tooltip={dashboardData.metrics[5].tooltip}
          />
          <EnhancedMetricCard
            label={dashboardData.metrics[6].label}
            value={dashboardData.metrics[6].value}
            unit={dashboardData.metrics[6].unit}
            color={dashboardData.metrics[6].color}
            trend={-2.1}
            tooltip={dashboardData.metrics[6].tooltip}
          />
        </div>
      </div>

      {/* Mobile: Stack charts vertically, Desktop: Side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <ModernPieChart
          title={dashboardData.claimVolumePieChart.title}
          data={dashboardData.claimVolumePieChart.data}
          layout="horizontal"
        />
        <ModernPieChart
          title={dashboardData.allowedAmountPieChart.title}
          data={dashboardData.allowedAmountPieChart.data}
          layout="horizontal"
        />
      </div>

      {/* Mobile: Stack table and chart vertically, Desktop: Side by side */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        <div className="xl:col-span-2">
          <ReimbursementTable
            headers={dashboardData.reimbursementTable.headers}
            sections={dashboardData.reimbursementTable.sections}
          />
        </div>
        <div>
          <ComparisonBarChart
            title={dashboardData.comparisonBarChart.title}
            data={dashboardData.comparisonBarChart.data}
          />
        </div>
      </div>
    </>
  );
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <main className="p-3 lg:p-6 space-y-4 lg:space-y-6">
      <ModernSectionHeader
        title="Repricer Intelligence Dashboard"
        subtitle="Overview of claims repricing metrics and analytics"
      />
      <MobileDateFilters />
      <MobileTabNavigation
        tabs={dashboardData.tabs}
        onTabChange={setActiveTab}
      />

      {activeTab === "summary" && <SummaryTab />}
      {activeTab === "inpatient" && <InpatientTab />}
      {activeTab === "outpatient" && <OutpatientTab />}
      {/* Add other tabs here as they are built */}
    </main>
  );
}
