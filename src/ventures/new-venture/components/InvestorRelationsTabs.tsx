import React from 'react';
import { 
  Users, 
  MessageCircle, 
  FileText, 
  PieChart, 
  Calendar, 
  Award 
} from 'lucide-react';

interface InvestorRelationsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ventureProgress: number;
}

function InvestorRelationsTabs({ activeTab, onTabChange, ventureProgress }: InvestorRelationsTabsProps) {
  const tabs = [
    { id: 'investor-contacts', label: 'Investor Contacts', icon: Users, minProgress: 80 },
    { id: 'communication-log', label: 'Communication Log', icon: MessageCircle, minProgress: 82 },
    { id: 'reporting', label: 'Reporting', icon: FileText, minProgress: 84 },
    { id: 'cap-table-management', label: 'Cap Table Management', icon: PieChart, minProgress: 86 },
    { id: 'investor-events', label: 'Investor Events', icon: Calendar, minProgress: 88 },
    { id: 'investor-value-add', label: 'Investor Value-Add', icon: Award, minProgress: 90 }
  ];

  return (
    <div className="p-4">
      <div className="text-white/60 text-xs uppercase font-semibold mb-2">Investor Relations</div>
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

export default InvestorRelationsTabs;