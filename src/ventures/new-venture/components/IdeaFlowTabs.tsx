import React from 'react';
import { Target, Lightbulb, CheckCircle, Search } from 'lucide-react';

interface IdeaFlowTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ventureProgress: number;
}

function IdeaFlowTabs({ activeTab, onTabChange, ventureProgress }: IdeaFlowTabsProps) {
  const tabs = [
    { id: 'market-targeting', label: 'Market Targeting', icon: Target, minProgress: 10 },
    { id: 'problem-definition', label: 'Problem Definition', icon: Lightbulb, minProgress: 15 },
    { id: 'ideation', label: 'Ideation', icon: CheckCircle, minProgress: 20 },
    { id: 'validation', label: 'Validation', icon: Search, minProgress: 25 }
  ];

  return (
    <div className="p-4">
      <div className="text-white/60 text-xs uppercase font-semibold mb-2">Idea</div>
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

export default IdeaFlowTabs;