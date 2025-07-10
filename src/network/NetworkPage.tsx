import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  Search,
  Brain
} from 'lucide-react';
import NetworkDiscoverScreen from './NetworkDiscoverScreen';
import MyConnectionsScreen from './MyConnectionsScreen';
import ConnectionRequestsScreen from './ConnectionRequestsScreen';
import GlobalNavigation from '../components/GlobalNavigation';

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

interface NetworkPageProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging') => void;
  selectedAICompanion: string;
  onAgentChange: (agent: string) => void;
}

function NetworkPage({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  selectedAICompanion,
  onAgentChange
}: NetworkPageProps) {
  const [activeNetworkTab, setActiveNetworkTab] = useState('discover-people');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update AI agent when tab changes
  useEffect(() => {
    switch (activeNetworkTab) {
      case 'discover-people':
        onAgentChange('connection-intelligence');
        break;
      case 'my-connections':
        onAgentChange('relationship-manager');
        break;
      case 'connection-requests':
        onAgentChange('connection-evaluator');
        break;
      default:
        onAgentChange('connection-intelligence');
    }
  }, [activeNetworkTab, onAgentChange]);

  const networkTabs = [
    { id: 'discover-people', label: 'Discover people', icon: Search },
    { id: 'my-connections', label: 'My connections', icon: Users },
    { id: 'connection-requests', label: 'Connection requests', icon: UserPlus },
    { id: 'network-events', label: 'Network events', icon: Calendar }
  ];

  const renderCurrentScreen = () => {
    switch (activeNetworkTab) {
      case 'discover-people':
        return (
          <NetworkDiscoverScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'my-connections':
        return (
          <MyConnectionsScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'connection-requests':
        return (
          <ConnectionRequestsScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'network-events':
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            <div className="text-center">
              <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Network Events</h2>
              <p className="text-white/70">Coming soon - Discover networking events in your area</p>
            </div>
          </div>
        );
      default:
        return (
          <NetworkDiscoverScreen
            selectedRole={selectedRole}
            profileData={profileData}
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
          {/* Navigation Tabs */}
          <div className="p-2">
            {networkTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveNetworkTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                    activeNetworkTab === tab.id
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

export default NetworkPage;