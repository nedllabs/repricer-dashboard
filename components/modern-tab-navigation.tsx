"use client"

import { useState } from "react"

interface Tab {
  id: string
  label: string
  active: boolean
}

interface ModernTabNavigationProps {
  tabs: Tab[]
  onTabChange?: (tabId: string) => void
}

export function ModernTabNavigation({ tabs, onTabChange }: ModernTabNavigationProps) {
  const [activeTab, setActiveTab] = useState(tabs.find((tab) => tab.active)?.id || tabs[0]?.id)

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] mb-6 overflow-hidden">
      <div className="flex bg-[#f9fafb] border-b border-[#e5e7eb]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`relative px-8 py-4 text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id ? "text-[#374151] bg-white" : "text-[#6b7280] hover:text-[#374151] hover:bg-white/50"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0">
                <div className="h-1 bg-gradient-to-r from-[#449cfb] to-[#e679f2] rounded-t-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
