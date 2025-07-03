interface ClaimsProcessTableRow {
  category?: string
  type: string
  totalClaims: string
  totalClaimLines: string
  isSubItem?: boolean
}

interface ClaimsProcessTableProps {
  data: ClaimsProcessTableRow[]
}

export function ClaimsProcessTable({ data }: ClaimsProcessTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#f9fafb] border-b border-[#e5e7eb]">
        <div className="grid grid-cols-4 gap-4 p-4">
          <div className="text-sm font-semibold text-[#374151]">Category</div>
          <div className="text-sm font-semibold text-[#374151]">Type</div>
          <div className="text-sm font-semibold text-[#374151] text-center">Total Claims</div>
          <div className="text-sm font-semibold text-[#374151] text-center">Total Claim Lines</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[#e5e7eb]">
        {data.map((row, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 gap-4 p-4 hover:bg-[#f9fafb] transition-colors ${
              row.isSubItem ? "bg-[#fafbfc]" : ""
            }`}
          >
            <div className={`text-sm font-medium text-[#374151] ${row.isSubItem ? "pl-6" : ""}`}>
              {row.category || ""}
            </div>
            <div className={`text-sm text-[#6b7280] ${row.isSubItem ? "pl-4" : ""}`}>{row.type}</div>
            <div className="text-sm text-[#6b7280] text-center font-mono">{row.totalClaims}</div>
            <div className="text-sm text-[#6b7280] text-center font-mono">{row.totalClaimLines}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
