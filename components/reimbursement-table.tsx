interface TableRow {
  methodology: string
  claims: string
  billed: string
  allowed: string
  paid: string
  medicare: string
  highlight?: boolean
}

interface TableSection {
  title: string
  color: string
  rows: TableRow[]
}

interface ReimbursementTableProps {
  headers: string[]
  sections: TableSection[]
}

export function ReimbursementTable({ headers, sections }: ReimbursementTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#f9fafb] border-b border-[#e5e7eb]">
        <div className="grid grid-cols-6 gap-4 p-4">
          {headers.map((header, index) => (
            <div key={index} className="text-sm font-semibold text-[#374151] text-center">
              {header}
            </div>
          ))}
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-[#e5e7eb]">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {/* Section Header */}
            <div className="bg-[#f0f9ff] border-b border-[#e5e7eb]">
              <div className="p-3 text-center">
                <span className="text-sm font-semibold" style={{ color: section.color }}>
                  {section.title}
                </span>
              </div>
            </div>

            {/* Section Rows */}
            {section.rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`grid grid-cols-6 gap-4 p-4 hover:bg-[#f9fafb] transition-colors ${
                  row.highlight ? "bg-[#eff6ff]" : ""
                }`}
              >
                <div className="text-sm font-medium text-[#374151] text-center">{row.methodology}</div>
                <div
                  className={`text-sm text-center ${row.highlight ? "text-[#2563eb] font-semibold" : "text-[#6b7280]"}`}
                >
                  {row.claims}
                </div>
                <div className="text-sm text-[#6b7280] text-center">{row.billed}</div>
                <div className="text-sm text-[#6b7280] text-center">{row.allowed}</div>
                <div className="text-sm text-[#6b7280] text-center">{row.paid}</div>
                <div className="text-sm text-[#6b7280] text-center">{row.medicare}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
