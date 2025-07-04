"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Bell, ChevronDown, Menu, X } from "lucide-react"
import { useState } from "react"

export function HeaderNavigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[#e5e7eb]/50 px-4 lg:px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between mx-auto">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-2 lg:space-x-4 flex-1">
          <button
            className="p-2 hover:bg-[#f3f4f6] rounded-xl transition-all duration-200 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#6b7280]" /> : <Menu className="w-5 h-5 text-[#6b7280]" />}
          </button>

          <div className="flex items-center space-x-2 lg:space-x-3">
            <div className="p-1.5 lg:p-2 bg-gradient-to-r from-[#449cfb] to-[#e679f2] rounded-lg lg:rounded-xl shadow-lg">
              <BarChart3 className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
            </div>
            <div className="text-lg lg:text-xl font-bold bg-gradient-to-r from-[#449cfb] to-[#e679f2] bg-clip-text text-transparent font-comfortaa">
              <span className="hidden sm:inline">NEDL Analytics</span>
              <span className="sm:hidden">NEDL</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden lg:flex items-center justify-center flex-2">
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-[#e5e7eb]/50 shadow-lg">
            <Link
              href="/"
              className={`relative px-4 xl:px-6 mx-2 py-3 text-sm font-semibold transition-all duration-300 rounded-xl ${
                pathname === "/"
                  ? "bg-[#f0f9ff] border border-[#93c6fd] shadow-lg transform scale-105"
                  : "text-[#6b7280] hover:text-[#374151] hover:bg-white/70"
              }`}
            >
              <span className="relative z-10">Repricer Intelligence Dashboard</span>
              {pathname === "/" && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#449cfb]/20 to-[#5489c2]/20 rounded-xl blur-xl"></div>
              )}
            </Link>

            <Link
              href="/claims-process"
              className={`relative px-4 xl:px-8 py-3 text-sm font-semibold transition-all duration-300 rounded-xl ${
                pathname === "/claims-process"
                  ? "bg-[#f0f9ff] border border-[#93c6fd] shadow-lg transform scale-105"
                  : "text-[#6b7280] hover:text-[#374151] hover:bg-white/70"
              }`}
            >
              <span className="relative z-10">Claims Process Summary</span>
              {pathname === "/claims-process" && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#449cfb]/20 to-[#5489c2]/20 rounded-xl blur-xl"></div>
              )}
            </Link>
          </div>
        </div>

        {/* Right Section - User Menu */}
        <div className="flex items-center justify-end space-x-2 lg:space-x-4 flex-1">
          <button className="relative p-2 lg:p-3 hover:bg-[#f3f4f6] rounded-xl transition-all duration-200 group">
            <Bell className="w-4 h-4 lg:w-5 lg:h-5 text-[#6b7280] group-hover:text-[#374151]" />
            <div className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-gradient-to-r from-[#ef4444] to-[#f87171] rounded-full shadow-sm animate-pulse"></div>
          </button>

          <div className="flex items-center space-x-2 lg:space-x-3 bg-white/70 backdrop-blur-sm rounded-xl lg:rounded-2xl px-2 lg:px-4 py-1.5 lg:py-2 hover:bg-white/90 transition-all duration-200 cursor-pointer border border-[#e5e7eb]/50 shadow-sm">
            <span className="text-xs lg:text-sm font-medium text-[#374151] hidden sm:inline">Analytics User</span>
            <div className="w-7 h-7 lg:w-9 lg:h-9 bg-gradient-to-r from-[#449cfb] to-[#e679f2] rounded-lg lg:rounded-xl flex items-center justify-center text-white text-xs lg:text-sm font-bold shadow-md">
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
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full p-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                pathname === "/"
                  ? "text-white bg-gradient-to-r from-[#449cfb] via-[#e679f2] to-[#f0c7f5] shadow-lg"
                  : "text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6]"
              }`}
            >
              Repricer Intelligence Dashboard
            </Link>
            <Link
              href="/claims-process"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full p-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                pathname === "/claims-process"
                  ? "text-white bg-gradient-to-r from-[#449cfb] via-[#e679f2] to-[#f0c7f5] shadow-lg"
                  : "text-[#6b7280] hover:text-[#374151] hover:bg-[#f3f4f6]"
              }`}
            >
              Claims Process Summary
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
