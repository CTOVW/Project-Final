import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  FileText,
  Brain
} from 'lucide-react';
import GlobalNavigation from '../components/GlobalNavigation';
import MarketIntelligenceDashboard from './MarketIntelligenceDashboard';
import AIReportDevelopment from './AIReportDevelopment';

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

interface PreferencesData {
  riskTolerance: string;
  investmentHorizon: string;
  primaryMotivation: string;
  preferredIndustries: string[];
  geographicFocus: string[];
  collaborationStyle: string;
  decisionMakingStyle: string;
  learningPreference: string;
  communicationStyle: string;
  workingStyle: string;
}

interface IntelligencePageProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  preferences: PreferencesData; // Pass preferences for filter panel defaults
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace' | 'intelligence') => void;
  selectedAICompanion: string;
  onAgentChange: (agent: string) => void;
}

function IntelligencePage({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  preferences,
  activeMainTab,
  setActiveMainTab,
  selectedAICompanion,
  onAgentChange
}: IntelligencePageProps) {
  const [activeIntelligenceTab, setActiveIntelligenceTab] = useState('dashboard');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update AI agent when tab changes
  useEffect(() => {
    switch (activeIntelligenceTab) {
      case 'dashboard':
        onAgentChange('intelligence-analytics');
        break;
      case 'ai-reports':
        onAgentChange('research-generator');
        break;
      default:
        onAgentChange('intelligence-analytics');
    }
  }, [activeIntelligenceTab, onAgentChange]);

  const intelligenceTabs = [
    { id: 'dashboard', label: 'Intelligence Dashboard', icon: BarChart3 },
    { id: 'ai-reports', label: 'AI Reports', icon: FileText }
  ];

  const renderCurrentScreen = () => {
    switch (activeIntelligenceTab) {
      case 'dashboard':
        return (
          <MarketIntelligenceDashboard
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            preferences={preferences}
          />
        );
      case 'ai-reports':
        return (
          <AIReportDevelopment
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
          />
        );
      default:
        return (
          <MarketIntelligenceDashboard
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            preferences={preferences}
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
        profileData={profileData}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Left Sidebar */}
        <div
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-primary border-r border-accent/20 transition-all duration-300 z-30 ${
            isAICompanionOpen ? 'w-16' : 'w-64'
          }`}
        >
          {/* Profile Section */}
          <div className="p-4 border-b border-accent/20">
            {!isAICompanionOpen ? (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-highlight rounded-full flex items-center justify-center">
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
                      selectedRole === 'founder' ? 'bg-accent/20 text-accent' :
                      selectedRole === 'investor' ? 'bg-highlight/20 text-highlight' :
                      'bg-accent/20 text-accent'
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
                <div className="w-8 h-8 bg-gradient-to-r from-accent to-highlight rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {profileData.fullName ? profileData.fullName.charAt(0) : 'U'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Stats (Placeholder for Intelligence specific stats) */}
          {!isAICompanionOpen && (
            <div className="p-4 border-b border-accent/20">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-white font-semibold">12</div>
                  <div className="text-white/70 text-xs">Custom Reports</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">89%</div>
                  <div className="text-white/70 text-xs">Data Freshness</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">5</div>
                  <div className="text-white/70 text-xs">Active Alerts</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="p-2">
            {intelligenceTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveIntelligenceTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                    activeIntelligenceTab === tab.id
                      ? 'bg-secondary text-white'
                      : 'text-white/70 hover:text-white hover:bg-secondary'
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
          className="bg-gradient-to-r from-accent to-highlight text-white p-4 rounded-full shadow-lg hover:from-accent-dark hover:to-highlight-dark transition-all duration-300 transform hover:scale-110"
        >
          <Brain className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default IntelligencePage;