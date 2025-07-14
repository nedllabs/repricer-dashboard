interface ModernSectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function ModernSectionHeader({
  title,
  subtitle,
  className = "",
}: ModernSectionHeaderProps) {
  return (
    <div className={`text-center py-3 ${className}`}>
      <h3 className="text-2xl font-semibold text-[#374151] mb-2 font-comfortaa">
        {title}
      </h3>
      {subtitle && <p className="text-sm text-[#6b7280] mb-4">{subtitle}</p>}
      <div className="relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-[#449cfb] to-[#f087fb] rounded-full -translate-y-px"></div>
      </div>
    </div>
  );
}
