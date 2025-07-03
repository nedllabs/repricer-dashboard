"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { BarChart3, Bell, ChevronDown } from "lucide-react"

export function HeaderNavigation() {
  const pathname = usePathname()

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[#e5e7eb]/50 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between mx-auto">
        {/* Left Section - Logo */}
        <div className="flex items-center space-x-4 flex-1">
          <button className="p-2 hover:bg-[#f3f4f6] rounded-xl transition-all duration-200">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="text-[#6b7280]">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-[#449cfb] to-[#e679f2] rounded-xl shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#449cfb] to-[#e679f2] bg-clip-text text-transparent font-comfortaa">
              NEDL Analytics
            </div>
          </div>
        </div>

        {/* Center Section - Navigation */}
        <div className="flex items-center justify-center flex-2">
          <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-[#e5e7eb]/50 shadow-lg">
            <Link
              href="/"
              className={`relative px-6 mx-2 py-3 text-sm font-semibold transition-all duration-300 rounded-xl ${
                pathname === "/"
                  ? "text-white bg-gradient-to-r from-[#449cfb] via-[#e679f2] to-[#f0c7f5] shadow-lg transform scale-105"
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
              className={`relative px-8 py-3 text-sm font-semibold transition-all duration-300 rounded-xl ${
                pathname === "/claims-process"
                  ? "text-white bg-gradient-to-r from-[#449cfb] via-[#e679f2] to-[#f0c7f5] shadow-lg transform scale-105"
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
        <div className="flex items-center justify-end space-x-4 flex-1">
          <button className="relative p-3 hover:bg-[#f3f4f6] rounded-xl transition-all duration-200 group">
            <Bell className="w-5 h-5 text-[#6b7280] group-hover:text-[#374151]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#ef4444] to-[#f87171] rounded-full shadow-sm animate-pulse"></div>
          </button>

          <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-2 hover:bg-white/90 transition-all duration-200 cursor-pointer border border-[#e5e7eb]/50 shadow-sm">
            <span className="text-sm font-medium text-[#374151]">Analytics User</span>
            <div className="w-9 h-9 bg-gradient-to-r from-[#449cfb] to-[#e679f2] rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-md">
              A
            </div>
            <ChevronDown className="w-4 h-4 text-[#6b7280]" />
          </div>
        </div>
      </div>
    </header>
  )
}
