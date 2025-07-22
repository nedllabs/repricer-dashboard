"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bell, ChevronDown, Menu, X, BarChart3, FileText } from "lucide-react";
import { useState } from "react";
import { NedlLogo } from "./nedl-logo";

interface HeaderNavigationProps {
  onSidebarToggle?: () => void;
}

export function HeaderNavigation({ onSidebarToggle }: HeaderNavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[#e5e7eb]/50 px-4 lg:px-6 sticky top-0 z-50 shadow-xs">
      <div className="flex justify-between mx-auto">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-2 lg:space-x-4 flex-1">
          <button
            className="p-2 hover:bg-[#f3f4f6] rounded-xl transition-all duration-200 lg:hidden"
            onClick={onSidebarToggle}
          >
            <Menu className="w-5 h-5 text-[#6b7280]" />
          </button>

          <div className="flex items-center">
            <button
              onClick={handleLogoClick}
              className="flex items-center focus:outline-hidden"
            >
              <NedlLogo className="p-3" />
            </button>
          </div>
        </div>

        {/* Right Section - User Menu */}
        <div className="flex items-center justify-end space-x-2 lg:space-x-4 flex-1">
          <button className="relative p-2 lg:p-3 hover:bg-[#f3f4f6] rounded-xl transition-all duration-200 group">
            <Bell className="w-5 h-5 lg:w-5 lg:h-5 text-[#6b7280] group-hover:text-[#374151]" />
            <div
              className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-[#FA1717] rounded-full shadow-xs animate-pulse"
              style={{ animationDuration: "1s" }}
            ></div>
          </button>

          <div className="flex items-center space-x-2 lg:space-x-3 bg-white/70 backdrop-blur-xs rounded-xl lg:rounded-2xl px-2 lg:px-4 py-1.5 lg:py-2 hover:bg-white/90 transition-all duration-200 cursor-pointer border border-[#e5e7eb]/50 shadow-xs">
            <span className="text-xs lg:text-sm font-medium text-[#374151] hidden sm:inline">
              Ashish
            </span>
            <div className="w-7 h-7 lg:w-9 lg:h-9 bg-linear-to-r from-[#449cfb] to-[#f087fb] rounded-lg lg:rounded-xl flex items-center justify-center text-white text-xs lg:text-sm font-bold shadow-md">
              A
            </div>
            <ChevronDown className="w-3 h-3 lg:w-4 lg:h-4 text-[#6b7280] hidden sm:inline" />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-[#e5e7eb] shadow-lg">
          <div className="p-4 space-y-2">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full p-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-3 ${
                    pathname === item.href
                      ? "text-white bg-linear-to-r from-[#449cfb] to-[#f087fb] shadow-lg"
                      : "text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6]"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
