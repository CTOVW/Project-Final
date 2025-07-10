import React from 'react';
import { 
  FileText, 
  ShoppingCart, 
  BarChart3, 
  DollarSign, 
  Megaphone 
} from 'lucide-react';

interface SetupTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ventureProgress: number;
}

function SetupTabs({ activeTab, onTabChange, ventureProgress }: SetupTabsProps) {
  const tabs = [
    { id: 'legal-setup', label: 'Legal Setup', icon: FileText, minProgress: 50 },
    { id: 'commercial-setup', label: 'Commercial Setup', icon: ShoppingCart, minProgress: 52 },
    { id: 'business-intelligence', label: 'Business Intelligence', icon: BarChart3, minProgress: 54 },
    { id: 'accounting-setup', label: 'Accounting Setup', icon: DollarSign, minProgress: 56 },
    { id: 'marketing-setup', label: 'Marketing Setup', icon: Megaphone, minProgress: 58 }
  ];

  return (
    <div className="p-4">
      <div className="text-white/60 text-xs uppercase font-semibold mb-2">Setup</div>
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

export default SetupTabs;