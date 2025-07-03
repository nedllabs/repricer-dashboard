"use client"

import { useState } from "react"

interface Tab {
  id: string
  label: string
  active: boolean
}

interface MobileTabNavigationProps {
  tabs: Tab[]
  onTabChange?: (tabId: string) => void
}

export function MobileTabNavigation({ tabs, onTabChange }: MobileTabNavigationProps) {
  const [activeTab, setActiveTab] = useState(tabs.find((tab) => tab.active)?.id || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <>
      {/* Mobile Tab Navigation - Horizontal Scroll */}
      <div className="block lg:hidden bg-white rounded-xl shadow-sm border border-[#e5e7eb] mb-6 overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide bg-[#f9fafb] border-b border-[#e5e7eb]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative px-4 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                activeTab === tab.id
                  ? "text-[#374151] bg-white"
                  : "text-[#6b7280] hover:text-[#374151] hover:bg-white/50"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="h-1 bg-gradient-to-r from-[#449cfb] via-[#e679f2] to-[#f0c7f5] rounded-t-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Tab Navigation - Same as before */}
      <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-[#e5e7eb] mb-6 overflow-hidden">
        <div className="flex bg-[#f9fafb] border-b border-[#e5e7eb]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative px-8 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-[#374151] bg-white"
                  : "text-[#6b7280] hover:text-[#374151] hover:bg-white/50"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="h-1 bg-gradient-to-r from-[#449cfb] via-[#e679f2] to-[#f0c7f5] rounded-t-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
