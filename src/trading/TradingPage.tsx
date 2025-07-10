import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Search, 
  Bookmark,
  Brain,
  Briefcase,
  PieChart
} from 'lucide-react';
import MarketTradingDashboard from './MarketTradingDashboard';
import MarketOpportunityMarketplace from './MarketOpportunityMarketplace';
import DealScreening from './DealScreening';
import GlobalNavigation from '../components/GlobalNavigation';
import PortfolioSummaryDashboard from './PortfolioSummaryDashboard';
import InvestmentPipeline from './InvestmentPipeline';
import ExplorePortfolio from './ExplorePortfolio';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  country: string;
  language: string;
  currentOccupation: string;
  yearsExperience: string;
  entrepreneurialExperience: string;
  industryExpertise: string;
  marketExpertise: string;
  keySkills: string;
  company: string;
  companyLinkedin: string;
  companyType: string;
  industryFocus: string;
  origin: string;
  companySize: string;
  portfolioSize: string;
  headquarters: string;
  operatingMarkets: string;
  targetClients: string;
  keyCapabilities: string;
}

interface TradingPageProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace' | 'intelligence') => void;
  selectedAICompanion: string;
  onAgentChange: (agent: string) => void;
  initialTradingTab: string | null;
  setInitialTradingTab: (tab: string | null) => void;
}

function TradingPage({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  selectedAICompanion,
  onAgentChange,
  initialTradingTab,
  setInitialTradingTab
}: TradingPageProps) {
  const [activeTradingTab, setActiveTradingTab] = useState('market-dashboard');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle initialTradingTab if it's set
  useEffect(() => {
    if (initialTradingTab) {
      setActiveTradingTab(initialTradingTab);
      setInitialTradingTab(null); // Reset after applying
    }
  }, [initialTradingTab, setInitialTradingTab]);

  // Update AI agent when tab changes
  useEffect(() => {
    switch (activeTradingTab) {
      case 'market-dashboard':
        onAgentChange('trading-analytics');
        break;
      case 'opportunities':
        onAgentChange('deal-discovery');
        break;
      case 'deal-screening':
        onAgentChange('due-diligence');
        break;
      case 'portfolio-summary':
        onAgentChange('portfolio-analytics');
        break;
      case 'investment-pipeline':
        onAgentChange('pipeline-analytics');
        break;
      case 'explore-portfolio':
        onAgentChange('venture-tracker');
        break;
      case 'saved-opportunities':
        onAgentChange('deal-discovery');
        break;
      default:
        onAgentChange('trading-analytics');
    }
  }, [activeTradingTab, onAgentChange]);

  const tradingTabs = [
    { id: 'market-dashboard', label: 'Market Dashboard', icon: BarChart3 },
    { id: 'opportunities', label: 'Opportunities Marketplace', icon: Search },
    { id: 'portfolio-summary', label: 'Portfolio Summary', icon: PieChart },
    { id: 'investment-pipeline', label: 'Investment Pipeline', icon: Briefcase },
    { id: 'explore-portfolio', label: 'Explore Portfolio', icon: Search },
    { id: 'saved-opportunities', label: 'Saved Opportunities', icon: Bookmark }
  ];

  const renderCurrentScreen = () => {
    switch (activeTradingTab) {
      case 'market-dashboard':
        return (
          <MarketTradingDashboard
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            activeTradingTab={activeTradingTab}
            setActiveTradingTab={setActiveTradingTab}
          />
        );
      case 'opportunities':
        return (
          <MarketOpportunityMarketplace
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            activeTradingTab={activeTradingTab}
            setActiveTradingTab={setActiveTradingTab}
          />
        );
      case 'deal-screening':
        return (
          <DealScreening
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            activeTradingTab={activeTradingTab}
            setActiveTradingTab={setActiveTradingTab}
          />
        );
      case 'portfolio-summary':
        return (
          <PortfolioSummaryDashboard
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            setActiveTradingTab={setActiveTradingTab}
          />
        );
      case 'investment-pipeline':
        return (
          <InvestmentPipeline
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
          />
        );
      case 'explore-portfolio':
        return (
          <ExplorePortfolio
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
          />
        );
      case 'saved-opportunities':
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            <div className="text-center">
              <Bookmark className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Saved Opportunities</h2>
              <p className="text-white/70">Your saved investment opportunities will appear here</p>
            </div>
          </div>
        );
      default:
        return (
          <MarketTradingDashboard
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            activeMainTab={activeMainTab}
            setActiveMainTab={setActiveMainTab}
            activeTradingTab={activeTradingTab}
            setActiveTradingTab={setActiveTradingTab}
          />
        );
    }
  };

  // For deal screening, we don't show the sidebar
  if (activeTradingTab === 'deal-screening') {
    return renderCurrentScreen();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Navigation */}
      <GlobalNavigation 
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
        setInitialTradingTab={setInitialTradingTab}
        profileData={profileData}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Left Sidebar */}
        <div 
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-white/20 transition-all duration-300 z-30 ${
            isAICompanionOpen ? 'w-16' : 'w-64'
          }`}
        >
          {/* Profile Section */}
          <div className="p-4 border-b border-white/20">
            {!isAICompanionOpen ? (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {profileData.fullName ? profileData.fullName.charAt(0) : 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {profileData.fullName || 'User Name'}
                  </h3>
                  <p className="text-white/70 text-xs">
                    {profileData.currentOccupation || 'Professional'}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedRole === 'founder' ? 'bg-purple-500/20 text-purple-300' :
                      selectedRole === 'investor' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {selectedRole}
                    </span>
                    <span className="text-white/60 text-xs">
                      {profileData.country || 'Global'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {profileData.fullName ? profileData.fullName.charAt(0) : 'U'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Investment Profile Stats */}
          {!isAICompanionOpen && (
            <div className="p-4 border-b border-white/20">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-white font-semibold">12</div>
                  <div className="text-white/70 text-xs"># of deals</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">$2.5M</div>
                  <div className="text-white/70 text-xs">Total deal volume</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">5</div>
                  <div className="text-white/70 text-xs"># active deals in pipeline</div>
                </div>
                <button 
                  onClick={() => setActiveTradingTab('portfolio-summary')}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  Go to your investment dashboard
                </button>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="p-2">
            {tradingTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTradingTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                    activeTradingTab === tab.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  {!isAICompanionOpen && <span className="text-sm">{tab.label}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div 
          className="flex-1 transition-all duration-300"
          style={{ 
            marginLeft: isAICompanionOpen ? '64px' : '256px',
            marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
          }}
        >
          {renderCurrentScreen()}
        </div>
      </div>

      {/* AI Companion Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleAICompanion}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <Brain className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default TradingPage;