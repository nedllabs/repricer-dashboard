"use client";

import { useState } from "react";
import { SidebarNavigation } from "./sidebar-navigation";
import { HeaderNavigation } from "../header-navigation";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

export function SidebarWrapper({ children }: SidebarWrapperProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleNavigate = (id: string | null) => {
    setActiveItem(id);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNavigation onSidebarToggle={toggleSidebar} />
      <div className="flex flex-1">
        <SidebarNavigation
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          activeItem={activeItem}
          onNavigate={handleNavigate}
        />
        <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
