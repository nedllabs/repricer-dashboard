interface DataTableProps {
  headers: string[]
  rows: string[][]
}

export function DataTable({ headers, rows }: DataTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#d9d9d9] overflow-hidden">
      <div className="bg-[#858585] text-white">
        <div className="grid grid-cols-3 gap-4 p-4">
          {headers.map((header, index) => (
            <div key={index} className="font-medium text-center">
              {header}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#d1d3d4]">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-3 gap-4 p-4 border-b border-[#c0c0c0] last:border-b-0">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="text-sm text-[#4d4d4d] text-center">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
