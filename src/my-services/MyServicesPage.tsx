import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Briefcase, 
  Calendar, 
  Users, 
  Brain,
  Plus
} from 'lucide-react';
import GlobalNavigation from '../components/GlobalNavigation';
import ServicesOverview from './ServicesOverview';
import CreateNewService from './CreateNewService';
import CreateNewWorkshop from './CreateNewWorkshop';
import SessionManagement from './SessionManagement';
import ClientManagement from './ClientManagement';

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

interface MyServicesPageProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace' | 'intelligence' | 'my-services') => void;
  selectedAICompanion: string;
  onAgentChange: (agent: string) => void;
}

function MyServicesPage({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  selectedAICompanion,
  onAgentChange
}: MyServicesPageProps) {
  const [activeServiceSubTab, setActiveServiceSubTab] = useState('overview');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update AI agent when tab changes
  useEffect(() => {
    switch (activeServiceSubTab) {
      case 'overview':
        onAgentChange('service-portfolio-agent');
        break;
      case 'create-service':
        onAgentChange('service-designer-agent');
        break;
      case 'create-workshop':
        onAgentChange('workshop-designer-agent');
        break;
      case 'session-management':
        onAgentChange('session-intelligence-agent');
        break;
      case 'client-management':
        onAgentChange('client-relationship-agent');
        break;
      default:
        onAgentChange('service-portfolio-agent');
    }
  }, [activeServiceSubTab, onAgentChange]);

  const serviceTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'create-service', label: 'Create new service', icon: Briefcase },
    { id: 'create-workshop', label: 'Create new workshop', icon: Calendar },
    { id: 'session-management', label: 'Session Management', icon: Calendar },
    { id: 'client-management', label: 'Client Management', icon: Users }
  ];

  const renderCurrentScreen = () => {
    switch (activeServiceSubTab) {
      case 'overview':
        return (
          <ServicesOverview
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            setActiveServiceTab={setActiveServiceSubTab}
          />
        );
      case 'create-service':
        return (
          <CreateNewService
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            onBack={() => setActiveServiceSubTab('overview')}
          />
        );
      case 'create-workshop':
        return (
          <CreateNewWorkshop
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            onBack={() => setActiveServiceSubTab('overview')}
          />
        );
      case 'session-management':
        return (
          <SessionManagement
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
          />
        );
      case 'client-management':
        return (
          <ClientManagement
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
          />
        );
      default:
        return (
          <ServicesOverview
            isAICompanionOpen={isAICompanionOpen}
            aiCompanionWidth={aiCompanionWidth}
            toggleAICompanion={toggleAICompanion}
            selectedRole={selectedRole}
            profileData={profileData}
            setActiveServiceTab={setActiveServiceSubTab}
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

          {/* Expert profile stats */}
          {!isAICompanionOpen && (
            <div className="p-4 border-b border-white/20">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-white font-semibold">5</div>
                  <div className="text-white/70 text-xs"># of active services</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">8</div>
                  <div className="text-white/70 text-xs">Total services offered</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">$125K</div>
                  <div className="text-white/70 text-xs">Total revenue</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="p-2">
            {serviceTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveServiceSubTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                    activeServiceSubTab === tab.id
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

export default MyServicesPage;