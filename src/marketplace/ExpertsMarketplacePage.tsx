import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  Bookmark,
  Brain
} from 'lucide-react';
import ExpertDiscoveryScreen from './ExpertDiscoveryScreen';
import ServiceDiscoveryScreen from './ServiceDiscoveryScreen';
import WorkshopDiscoveryScreen from './WorkshopDiscoveryScreen';
import ExpertProfileScreen from './ExpertProfileScreen';
import ServiceDetailsScreen from './ServiceDetailsScreen';
import WorkshopDetailsScreen from './WorkshopDetailsScreen';
import SessionsScreen from './SessionsScreen';
import SavedItemsScreen from './SavedItemsScreen';
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

interface ExpertsMarketplacePageProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace') => void;
  selectedAICompanion: string;
  onAgentChange: (agent: string) => void;
}

function ExpertsMarketplacePage({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  selectedAICompanion,
  onAgentChange
}: ExpertsMarketplacePageProps) {
  const [activeMarketplaceTab, setActiveMarketplaceTab] = useState('discover-experts');
  const [selectedExpertId, setSelectedExpertId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update AI agent when tab changes
  useEffect(() => {
    switch (activeMarketplaceTab) {
      case 'discover-experts':
        onAgentChange('expert-matching');
        break;
      case 'discover-services':
        onAgentChange('service-matcher');
        break;
      case 'discover-workshops':
        onAgentChange('workshop-selector');
        break;
      case 'expert-profile':
        onAgentChange('expert-evaluator');
        break;
      case 'service-details':
      case 'workshop-details':
        onAgentChange('booking-optimization');
        break;
      case 'sessions':
        onAgentChange('session-coordinator');
        break;
      case 'saved-items':
        onAgentChange('learning-organizer');
        break;
      default:
        onAgentChange('expert-matching');
    }
  }, [activeMarketplaceTab, onAgentChange]);

  const marketplaceTabs = [
    { id: 'discover-experts', label: 'Discover Experts', icon: Users },
    { id: 'discover-services', label: 'Discover Services', icon: Briefcase },
    { id: 'discover-workshops', label: 'Discover Workshops', icon: Calendar },
    { id: 'saved-items', label: 'Saved Items', icon: Bookmark }
  ];

  const handleExpertSelect = (expertId: string) => {
    setSelectedExpertId(expertId);
    setActiveMarketplaceTab('expert-profile');
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setActiveMarketplaceTab('service-details');
  };

  const handleWorkshopSelect = (workshopId: string) => {
    setSelectedWorkshopId(workshopId);
    setActiveMarketplaceTab('workshop-details');
  };

  const handleBackToDiscovery = () => {
    setSelectedExpertId(null);
    setSelectedServiceId(null);
    setSelectedWorkshopId(null);
    setActiveMarketplaceTab('discover-experts');
  };

  const renderCurrentScreen = () => {
    switch (activeMarketplaceTab) {
      case 'discover-experts':
        return (
          <ExpertDiscoveryScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
            onExpertSelect={handleExpertSelect}
          />
        );
      case 'discover-services':
        return (
          <ServiceDiscoveryScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
            onServiceSelect={handleServiceSelect}
            onExpertSelect={handleExpertSelect}
          />
        );
      case 'discover-workshops':
        return (
          <WorkshopDiscoveryScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
            onWorkshopSelect={handleWorkshopSelect}
            onExpertSelect={handleExpertSelect}
          />
        );
      case 'expert-profile':
        return (
          <ExpertProfileScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
            expertId={selectedExpertId!}
            onServiceSelect={handleServiceSelect}
            onWorkshopSelect={handleWorkshopSelect}
            onBack={handleBackToDiscovery}
          />
        );
      case 'service-details':
        return (
          <ServiceDetailsScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
            serviceId={selectedServiceId!}
            onExpertSelect={handleExpertSelect}
            onBack={handleBackToDiscovery}
          />
        );
      case 'workshop-details':
        return (
          <WorkshopDetailsScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
            workshopId={selectedWorkshopId!}
            onExpertSelect={handleExpertSelect}
            onBack={handleBackToDiscovery}
          />
        );
      case 'sessions':
        return (
          <SessionsScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'saved-items':
        return (
          <SavedItemsScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
            onExpertSelect={handleExpertSelect}
            onServiceSelect={handleServiceSelect}
            onWorkshopSelect={handleWorkshopSelect}
          />
        );
      default:
        return (
          <ExpertDiscoveryScreen
            selectedRole={selectedRole}
            profileData={profileData}
            toggleAICompanion={toggleAICompanion}
            onExpertSelect={handleExpertSelect}
          />
        );
    }
  };

  // For detail screens, we don't show the sidebar
  if (['expert-profile', 'service-details', 'workshop-details', 'sessions'].includes(activeMarketplaceTab)) {
    return renderCurrentScreen();
  }

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

          {/* Quick Stats */}
          {!isAICompanionOpen && (
            <div className="p-4 border-b border-white/20">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-white font-semibold">3</div>
                  <div className="text-white/70 text-xs">Active Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">12</div>
                  <div className="text-white/70 text-xs">Saved Items</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">8</div>
                  <div className="text-white/70 text-xs">Completed Services</div>
                </div>
                <button 
                  onClick={() => setActiveMarketplaceTab('sessions')}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-2 rounded-lg text-xs font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                >
                  Manage Sessions
                </button>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="p-2">
            {marketplaceTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveMarketplaceTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                    activeMarketplaceTab === tab.id
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

export default ExpertsMarketplacePage;