import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Building2,
  DollarSign,
  BarChart3,
  Tag
} from 'lucide-react';
import VentureOverview from './VentureOverview';
import VentureFunding from './VentureFunding';
import VenturePerformance from './VenturePerformance';
import VentureListing from './VentureListing';
import { samplePortfolioVentures } from '../data/myInvestmentsData';

interface PortfolioManagementProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  ventureId: string;
  onBack: () => void;
}

function PortfolioManagement({
  isAICompanionOpen,
  aiCompanionWidth,
  ventureId,
  onBack
}: PortfolioManagementProps) {
  const [activeVentureTab, setActiveVentureTab] = useState('overview');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const venture = samplePortfolioVentures.find(v => v.id === ventureId);

  const ventureTabs = [
    { id: 'overview', label: 'Venture Overview', icon: Building2 },
    { id: 'funding', label: 'Venture Funding', icon: DollarSign },
    { id: 'performance', label: 'Venture Performance', icon: BarChart3 },
    { id: 'listing', label: 'List in Secondary Market', icon: Tag }
  ];

  if (!venture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Venture Not Found</h2>
          <p className="text-white/70 mb-6">The selected venture could not be found</p>
          <button
            onClick={onBack}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const renderVentureContent = () => {
    switch (activeVentureTab) {
      case 'overview':
        return <VentureOverview ventureId={ventureId} />;
      case 'funding':
        return <VentureFunding ventureId={ventureId} />;
      case 'performance':
        return <VenturePerformance ventureId={ventureId} />;
      case 'listing':
        return <VentureListing ventureId={ventureId} />;
      default:
        return <VentureOverview ventureId={ventureId} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">{venture.name}</h1>
          <div className="flex items-center space-x-4 text-white/80">
            <span>{venture.industry}</span>
            <span>{venture.stage}</span>
          </div>
        </div>

        {/* Venture Tabs */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
          <div className="border-b border-white/20">
            <div className="flex">
              {ventureTabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveVentureTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors ${
                      activeVentureTab === tab.id
                        ? 'bg-white/10 text-white border-b-2 border-purple-300'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Venture Content */}
        {renderVentureContent()}
      </div>
    </div>
  );
}

export default PortfolioManagement;