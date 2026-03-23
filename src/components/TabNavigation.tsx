"use client";

import { TabId, Tab } from "@/lib/types";
import { tabs } from "@/lib/data";

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex items-center gap-1 rounded-2xl border border-border/50 bg-surface-light/30 p-1.5 backdrop-blur-sm">
        {tabs.map((tab: Tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer ${
              activeTab === tab.id
                ? "bg-primary/20 text-primary-light shadow-lg shadow-primary/10"
                : "text-text-secondary hover:text-text-primary hover:bg-surface-lighter/50"
            }`}
          >
            {activeTab === tab.id && (
              <span className="absolute inset-0 rounded-xl border border-primary/30" />
            )}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
