import type React from "react"
import { EnhancedMetricCard } from "@/components/enhanced-metric-card"
import { ModernPieChart } from "@/components/modern-pie-chart"
import { ComparisonBarChart } from "@/components/comparison-bar-chart"
import { TopDrgChart } from "@/components/top-drg-chart"
import { EnhancedDrgTable } from "@/components/enhanced-drg-table"
import { HealthSystemsChart } from "@/components/health-systems-chart"
import { EnhancedProviderTable } from "@/components/enhanced-provider-table"
import { EnhancedCbsaTable } from "@/components/enhanced-cbsa-table"
import CbsaMap from "@/components/cbsa-map-wrapper"
import { MedicareRateTrendChart } from "@/components/medicare-rate-trend-chart"
import { MrpChangeTrendChart } from "@/components/mrp-change-trend-chart"
import { AllowedAmountChangeChart } from "@/components/allowed-amount-change-chart"
import { StatisticalOutlierChart } from "@/components/statistical-outlier-chart"
import inpatientData from "@/data/inpatient-data.json"

function SectionRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-6 border-b border-[#e5e7eb] last:border-b-0">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#374151] font-comfortaa mb-2">{title}</h3>
        <div className="w-16 h-1 bg-gradient-to-r from-[#449cfb] to-[#e679f2] rounded-full"></div>
      </div>
      {children}
    </div>
  )
}

export function InpatientTab() {
  const { repricerMetrics, ippsMetrics, codeLevel, healthSystem, geographic, timeBased } = inpatientData

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] mt-6">
      {/* Repricer metrics */}
      <SectionRow title="Repricer">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {repricerMetrics.map((m, i) => (
            <EnhancedMetricCard key={i} {...m} color="#449cfb" />
          ))}
        </div>
      </SectionRow>

      {/* IPPS metrics */}
      <SectionRow title="IPPS">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {ippsMetrics.map((m, i) => (
            <EnhancedMetricCard key={i} {...m} color="#5489c2" />
          ))}
        </div>
      </SectionRow>

      {/* Code level */}
      <SectionRow title="Code-level">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ModernPieChart {...codeLevel.drgCategoriesPieChart} layout="vertical" />
            <ComparisonBarChart
              title={codeLevel.rateRelativityBarChart.title}
              data={codeLevel.rateRelativityBarChart.data.map((d) => ({
                name: d.name,
                billedAmount: d.relativity,
                allowedAmount: 0,
                medicareReference: 0,
              }))}
            />
            <TopDrgChart {...codeLevel.top10DrgChart} />
          </div>
          <EnhancedDrgTable title="DRG Details" {...codeLevel.drgCodeTable} />
        </div>
      </SectionRow>

      {/* Health system */}
      <SectionRow title="Health System">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ModernPieChart {...healthSystem.topSystemsPieChart} layout="horizontal" />
            <HealthSystemsChart {...healthSystem.top10HealthSystemsChart} />
          </div>
          <EnhancedProviderTable title="Provider Details" {...healthSystem.providerTable} />
        </div>
      </SectionRow>

      {/* Geographic section */}
      <SectionRow title="Geographic">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CbsaMap title="CBSA by Claims Volume" metric="claimsVolume" legendUnit="" />
            <CbsaMap title="Avg. Rate Relativity by CBSA" metric="rateRelativity" legendUnit="%" />
          </div>
          <EnhancedCbsaTable title="CBSA Details" {...geographic.cbsaTable} />
        </div>
      </SectionRow>

      {/* Time-based trends */}
      <SectionRow title="Time-based">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <MedicareRateTrendChart title={timeBased.mrrTrend.title} />
          <MrpChangeTrendChart title={timeBased.mrpChangeTrend.title} />
          <AllowedAmountChangeChart title={timeBased.allowedAmountChange.title} />
        </div>
      </SectionRow>

      {/* Statistical outlier analysis */}
      <SectionRow title="Statistical Outlier">
        <StatisticalOutlierChart title="Provider Outlier Analysis" />
      </SectionRow>
    </div>
  )
}
