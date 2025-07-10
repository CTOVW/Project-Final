import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Brain,
  PieChart,
  DollarSign,
  Users,
  TrendingUp
} from 'lucide-react';
import GlobalNavigation from '../components/GlobalNavigation';
import PortfolioSummaryDashboard from './PortfolioSummaryDashboard';
import NewVenturePage from './new-venture/NewVenturePage';
import MyVenturesScreen from './MyVenturesScreen';

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

interface MyVenturesPageProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace' | 'intelligence') => void;
  selectedAICompanion: string;
  onAgentChange: (agent: string) => void;
}

function MyVenturesPage({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  selectedAICompanion,
  onAgentChange
}: MyVenturesPageProps) {
  const [activeVentureSubTab, setActiveVentureSubTab] = useState('portfolio-dashboard');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update AI agent when tab changes
  useEffect(() => {
    switch (activeVentureSubTab) {
      case 'portfolio-dashboard':
        onAgentChange('venture-tracker');
        break;
      case 'my-ventures':
        onAgentChange('venture-tracker');
        break;
      case 'new-venture':
        onAgentChange('knowledge-navigator');
        break;
      default:
        onAgentChange('venture-tracker');
    }
  }, [activeVentureSubTab, onAgentChange]);

  const handleCreateNewVenture = () => {
    setActiveVentureSubTab('new-venture');
  };

  const renderContent = () => {
    switch (activeVentureSubTab) {
      case 'portfolio-dashboard':
        return (
          <PortfolioSummaryDashboard
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'my-ventures':
        return (
          <MyVenturesScreen
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            onCreateNewVenture={handleCreateNewVenture}
          />
        );
      case 'new-venture':
        return (
          <NewVenturePage
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            profileData={profileData}
            onAgentChange={onAgentChange}
          />
        );
      default:
        return (
          <PortfolioSummaryDashboard
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Navigation */}
      <GlobalNavigation 
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
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

          {/* Founder profile stats */}
          {!isAICompanionOpen && (
            <div className="p-4 border-b border-white/20">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-white font-semibold">5</div>
                  <div className="text-white/70 text-xs"># of ventures founded</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">$7.5M</div>
                  <div className="text-white/70 text-xs">Total funds raised</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">2</div>
                  <div className="text-white/70 text-xs"># active fundraising rounds</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="p-2">
            <button
              onClick={() => setActiveVentureSubTab('portfolio-dashboard')}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                activeVentureSubTab === 'portfolio-dashboard'
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <PieChart className="h-5 w-5 flex-shrink-0" />
              {!isAICompanionOpen && <span className="text-sm">Portfolio Dashboard</span>}
            </button>
            <button
              onClick={() => setActiveVentureSubTab('my-ventures')}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                activeVentureSubTab === 'my-ventures'
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="h-5 w-5 flex-shrink-0" />
              {!isAICompanionOpen && <span className="text-sm">My Ventures</span>}
            </button>
            <button
              onClick={() => setActiveVentureSubTab('new-venture')}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                activeVentureSubTab === 'new-venture'
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Plus className="h-5 w-5 flex-shrink-0" />
              {!isAICompanionOpen && <span className="text-sm">Create New Venture</span>}
            </button>
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
          {renderContent()}
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

export default MyVenturesPage;