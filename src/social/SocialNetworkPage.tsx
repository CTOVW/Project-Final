import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Bookmark, 
  Home,
  MessageSquare,
  Brain
} from 'lucide-react';
import ActivityFeedScreen from './ActivityFeedScreen';
import CommunitiesScreen from './CommunitiesScreen';
import EventsScreen from './events/EventsScreen';
import SavedPostsScreen from './SavedPostsScreen';
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

interface SocialNetworkPageProps {
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

function SocialNetworkPage({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  selectedAICompanion,
  onAgentChange
}: SocialNetworkPageProps) {
  const [activeSocialTab, setActiveSocialTab] = useState('activity-feed');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update AI agent when tab changes
  useEffect(() => {
    switch (activeSocialTab) {
      case 'activity-feed':
        onAgentChange('feed-intelligence');
        break;
      case 'communities':
        onAgentChange('community-navigator');
        break;
      case 'events':
        onAgentChange('event-discovery');
        break;
      case 'saved-posts':
        onAgentChange('content-organizer');
        break;
      default:
        onAgentChange('feed-intelligence');
    }
  }, [activeSocialTab, onAgentChange]);

  const socialTabs = [
    { id: 'activity-feed', label: 'Activity feed', icon: Home },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'saved-posts', label: 'Saved posts', icon: Bookmark }
  ];

  const renderCurrentScreen = () => {
    switch (activeSocialTab) {
      case 'activity-feed':
        return (
          <ActivityFeedScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'communities':
        return (
          <CommunitiesScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'events':
        return (
          <EventsScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'saved-posts':
        return (
          <SavedPostsScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
          />
        );
      default:
        return (
          <ActivityFeedScreen
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

          {/* Social Profile Stats */}
          {!isAICompanionOpen && (
            <div className="p-4 border-b border-white/20">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-white font-semibold">247</div>
                  <div className="text-white/70 text-xs">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">18</div>
                  <div className="text-white/70 text-xs">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">1.2K</div>
                  <div className="text-white/70 text-xs">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">89%</div>
                  <div className="text-white/70 text-xs">Engagement</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="p-2">
            {socialTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSocialTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                    activeSocialTab === tab.id
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
          className="flex-1 transition-all duration-300 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
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

export default SocialNetworkPage;