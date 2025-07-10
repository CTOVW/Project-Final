import React from 'react';
import { 
  DollarSign, 
  Activity, 
  Globe, 
  TrendingUp, 
  BarChart3 
} from 'lucide-react';

interface PerformanceTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ventureProgress: number;
}

function PerformanceTabs({ activeTab, onTabChange, ventureProgress }: PerformanceTabsProps) {
  const tabs = [
    { id: 'financial-performance', label: 'Financial Performance', icon: DollarSign, minProgress: 70 },
    { id: 'business-performance', label: 'Business Performance', icon: Activity, minProgress: 72 },
    { id: 'market-performance', label: 'Market Performance', icon: Globe, minProgress: 74 },
    { id: 'growth-metrics', label: 'Growth Metrics', icon: TrendingUp, minProgress: 76 },
    { id: 'performance-reporting', label: 'Performance Reporting', icon: BarChart3, minProgress: 78 }
  ];

  return (
    <div className="p-4">
      <div className="text-white/60 text-xs uppercase font-semibold mb-2">Performance</div>
      <div className="space-y-1">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/40'
              } ${ventureProgress < tab.minProgress ? 'opacity-50 cursor-not-allowed' : 'hover:text-white/70'}`}
              disabled={ventureProgress < tab.minProgress}
            >
              <IconComponent className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PerformanceTabs;