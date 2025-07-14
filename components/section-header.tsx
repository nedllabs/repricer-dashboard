interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center py-4 ${className}`}>
      <h3 className="text-lg font-medium text-[#4d4d4d] mb-2">{title}</h3>
      <div className="w-full h-1 bg-gradient-to-r from-[#449cfb] to-[#f087fb] rounded-full mx-auto"></div>
    </div>
  );
}
