"use client";

import type React from "react";
import {
  FileBarChart,
  BookOpen,
  Users,
  FileCheck,
  X,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface NavigationItem {
  id: string | null;
  icon: React.ElementType;
  label: string;
  count?: number;
  color?: string;
  href: string;
  children?: NavigationItem[];
}

interface SidebarNavigationProps {
  className?: string;
  onNavigate: (id: string | null) => void;
  activeItem?: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

export function SidebarNavigation({
  className,
  onNavigate,
  activeItem,
  isOpen,
  onToggle,
}: SidebarNavigationProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["claim-repricer"])
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const quickNavItems: NavigationItem[] = [
    {
      id: "policy-intelligence",
      icon: FileBarChart,
      label: "Policy Intelligence",
      color: "text-blue-600",
      href: "#",
      children: [
        {
          id: null,
          icon: FileBarChart,
          label: "Overview",
          color: "text-blue-600",
          href: "https://nedl-dashboard.vercel.app/",
        },
        {
          id: "bookmarked",
          icon: Users,
          label: "Payer Analysis",
          color: "text-blue-600",
          href: "https://nedl-dashboard.vercel.app/payer-analysis",
        },
        {
          id: "all-policies",
          icon: BookOpen,
          label: "Policy Explorer",
          color: "text-blue-600",
          href: "https://nedl-dashboard.vercel.app/policy-explorer",
        },
        {
          id: "code-coverage",
          icon: FileCheck,
          label: "Code Coverage",
          color: "text-blue-600",
          href: "https://nedl-dashboard.vercel.app/code-coverage",
        },
      ],
    },
    {
      id: "claim-repricer",
      icon: FileCheck,
      label: "Claim Repricer",
      color: "text-green-600",
      href: "#",
      children: [
        {
          id: "repricer-dashboard",
          icon: FileBarChart,
          label: "Repricer Intelligence Dashboard",
          color: "text-green-600",
          href: "/",
        },
        {
          id: "claims-process",
          icon: FileCheck,
          label: "Claims Process Summary",
          color: "text-green-600",
          href: "/claims-process",
        },
      ],
    },
    {
      id: "payment-leakage",
      icon: Users,
      label: "Payment Leakage",
      color: "text-orange-600",
      href: "#",
      children: [
        {
          id: "leakage-overview",
          icon: FileBarChart,
          label: "Overview",
          color: "text-orange-600",
          href: "https://payment-leakage.vercel.app/",
        },
        {
          id: "data-ingestion",
          icon: FileCheck,
          label: "Data Ingestion",
          color: "text-orange-600",
          href: "https://payment-leakage.vercel.app/data-ingestion",
        },
        {
          id: "diagnosis-configuration",
          icon: BookOpen,
          label: "Diagnosis Configuration",
          color: "text-orange-600",
          href: "https://payment-leakage.vercel.app/diagnosis-configuration",
        },
        {
          id: "file-config-status",
          icon: FileCheck,
          label: "File & Config Status",
          color: "text-orange-600",
          href: "https://payment-leakage.vercel.app/file-config-status",
        },
        {
          id: "claims-management",
          icon: Users,
          label: "Claims Management",
          color: "text-orange-600",
          href: "https://payment-leakage.vercel.app/claims-management",
        },
      ],
    },
  ];

  const handleNavigate = (href: string, itemId?: string) => {
    if (href !== "#") {
      // Check if it's an external link
      router.push(href);

      if (isMobile) {
        onToggle(); // Close mobile menu after navigation
      }
    }
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href;
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const isCategoryExpanded = (categoryId: string) => {
    return expandedCategories.has(categoryId);
  };

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onToggle}
          />
        )}

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "fixed left-0 top-0 h-full w-64 z-50 font-comfortaa transform transition-transform duration-300 ease-in-out",
            "bg-[#F5F5F5] shadow-[3px_0px_25px_0px_rgba(0,0,0,0.15)]",
            isOpen ? "translate-x-0" : "-translate-x-full",
            className
          )}
        >
          {/* Mobile header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          <div className="p-2">
            <nav className="mt-2 space-y-1">
              {quickNavItems.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = hasChildren
                  ? isCategoryExpanded(item.id!)
                  : false;

                return (
                  <div key={item.id || "overview"}>
                    <button
                      onClick={() => {
                        if (hasChildren) {
                          toggleCategory(item.id!);
                        } else {
                          handleNavigate(item.href, item.id || undefined);
                        }
                      }}
                      className={cn(
                        "flex w-full items-center rounded-full px-2 py-4 my-1 text-sm font-bold text-left transition-all duration-200 no-shadow",
                        hasChildren
                          ? "text-black hover:bg-white"
                          : isActive(item.href)
                          ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white"
                          : "text-black hover:bg-white"
                      )}
                    >
                      <item.icon
                        className={cn(
                          "mr-3 h-5 w-5 no-shadow",
                          hasChildren
                            ? item.color
                            : isActive(item.href)
                            ? "text-white"
                            : item.color
                        )}
                      />
                      <span className="flex-1">{item.label}</span>
                      {hasChildren && (
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            isExpanded ? "rotate-180" : ""
                          )}
                        />
                      )}
                      {item.count && (
                        <span
                          className={cn(
                            "ml-2 rounded-full text-xs",
                            isActive(item.href)
                              ? "text-white"
                              : "text-slate-500"
                          )}
                        >
                          ({item.count})
                        </span>
                      )}
                    </button>

                    {hasChildren && isExpanded && (
                      <div className="ml-2 space-y-1">
                        {item.children!.map((child) => {
                          const childActive = isActive(child.href);
                          return (
                            <button
                              key={child.id || "child-overview"}
                              onClick={() =>
                                handleNavigate(
                                  child.href,
                                  child.id || undefined
                                )
                              }
                              className={cn(
                                "flex w-full items-center rounded-full px-4 py-3 my-1 text-sm font-medium text-left transition-all duration-200 no-shadow",
                                childActive
                                  ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white"
                                  : "text-gray-900 hover:bg-white"
                              )}
                            >
                              <child.icon
                                className={cn(
                                  "mr-3 h-4 w-4 no-shadow",
                                  childActive ? "text-white" : child.color
                                )}
                              />
                              <span className="flex-1">{child.label}</span>
                              {child.count && (
                                <span
                                  className={cn(
                                    "ml-2 rounded-full text-xs",
                                    childActive
                                      ? "text-white"
                                      : "text-slate-500"
                                  )}
                                >
                                  ({child.count})
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar (unchanged)
  return (
    <div
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-5rem)] w-64 z-10 font-comfortaa",
        "bg-[#F5F5F5] shadow-[3px_0px_25px_0px_rgba(0,0,0,0.15)]",
        className
      )}
    >
      <div className="p-2">
        <nav className="mt-2 space-y-1">
          {quickNavItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = hasChildren
              ? isCategoryExpanded(item.id!)
              : false;

            return (
              <div key={item.id || "overview"}>
                <button
                  onClick={() => {
                    if (hasChildren) {
                      toggleCategory(item.id!);
                    } else {
                      handleNavigate(item.href, item.id || undefined);
                    }
                  }}
                  className={cn(
                    "flex w-full items-center rounded-full px-3 py-4 my-2 text-md font-semibold text-left transition-all duration-200 no-shadow",
                    hasChildren
                      ? "text-black hover:bg-white"
                      : isActive(item.href)
                      ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white"
                      : "text-black hover:bg-white"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 no-shadow",
                      hasChildren
                        ? item.color
                        : isActive(item.href)
                        ? "text-white"
                        : item.color
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded ? "rotate-180" : ""
                      )}
                    />
                  )}
                  {item.count && (
                    <span
                      className={cn(
                        "ml-2 rounded-full text-xs",
                        isActive(item.href) ? "text-white" : "text-slate-500"
                      )}
                    >
                      ({item.count})
                    </span>
                  )}
                </button>

                {hasChildren && isExpanded && (
                  <div className="ml-2 space-y-1">
                    {item.children!.map((child) => {
                      const childActive = isActive(child.href);
                      return (
                        <button
                          key={child.id || "child-overview"}
                          onClick={() =>
                            handleNavigate(child.href, child.id || undefined)
                          }
                          className={cn(
                            "flex w-full items-center rounded-full px-4 py-3 my-1 text-sm font-medium text-left transition-all duration-200 no-shadow",
                            childActive
                              ? "bg-gradient-to-r from-[#449CFB] to-[#E85DF9] text-white"
                              : "text-gray-900 hover:bg-white"
                          )}
                        >
                          <child.icon
                            className={cn(
                              "mr-3 h-4 w-4 no-shadow",
                              childActive ? "text-white" : child.color
                            )}
                          />
                          <span className="flex-1">{child.label}</span>
                          {child.count && (
                            <span
                              className={cn(
                                "ml-2 rounded-full text-xs",
                                childActive ? "text-white" : "text-slate-500"
                              )}
                            >
                              ({child.count})
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
