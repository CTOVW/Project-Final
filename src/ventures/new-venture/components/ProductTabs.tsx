import React from 'react';
import { 
  Box, 
  Smartphone, 
  Server, 
  Clock, 
  CheckSquare, 
  Rocket 
} from 'lucide-react';

interface ProductTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  ventureProgress: number;
}

function ProductTabs({ activeTab, onTabChange, ventureProgress }: ProductTabsProps) {
  const tabs = [
    { id: 'product-definition', label: 'Product Definition', icon: Box, minProgress: 40 },
    { id: 'ux-design', label: 'UX Design', icon: Smartphone, minProgress: 42 },
    { id: 'technical-architecture', label: 'Technical Architecture', icon: Server, minProgress: 44 },
    { id: 'development-roadmap', label: 'Development Roadmap', icon: Clock, minProgress: 46 },
    { id: 'testing-qa', label: 'Testing & QA', icon: CheckSquare, minProgress: 48 },
    { id: 'launch-post-launch', label: 'Launch & Post-Launch', icon: Rocket, minProgress: 50 }
  ];

  return (
    <div className="p-4">
      <div className="text-white/60 text-xs uppercase font-semibold mb-2">Product</div>
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

export default ProductTabs;