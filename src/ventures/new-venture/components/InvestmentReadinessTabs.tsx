import React from 'react';
import { 
  FileText, 
  Presentation, 
  DollarSign, 
  Users, 
  MessageCircle 
} from 'lucide-react';

interface InvestmentReadinessTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ventureProgress: number;
}

function InvestmentReadinessTabs({ activeTab, onTabChange, ventureProgress }: InvestmentReadinessTabsProps) {
  const tabs = [
    { id: 'due-diligence', label: 'Due Diligence Materials', icon: FileText, minProgress: 60 },
    { id: 'pitch-materials', label: 'Pitch Materials', icon: Presentation, minProgress: 62 },
    { id: 'financial-model', label: 'Financial Model', icon: DollarSign, minProgress: 64 },
    { id: 'investor-targeting', label: 'Investor Targeting', icon: Users, minProgress: 66 },
    { id: 'negotiation-strategy', label: 'Negotiation Strategy', icon: MessageCircle, minProgress: 68 }
  ];

  return (
    <div className="p-4">
      <div className="text-white/60 text-xs uppercase font-semibold mb-2">Investment Readiness</div>
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

export default InvestmentReadinessTabs;