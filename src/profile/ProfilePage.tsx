import React, { useState, useEffect } from 'react';
import { Brain, Award, Shield, User } from 'lucide-react';
import GlobalNavigation from '../components/GlobalNavigation';
import ProfileSidebar, { ProfileTab } from './components/ProfileSidebar';
import ProfileHeader from './components/ProfileHeader';
import { ProfileData, UserRole } from './types';

// Import placeholder screens (these will be implemented later)
// import ProfileOverviewScreen from './screens/ProfileOverviewScreen';
// import ProfileInformationScreen from './screens/ProfileInformationScreen';
// import MindsetPreferencesScreen from './screens/MindsetPreferencesScreen';
// import DirectionThesisScreen from './screens/DirectionThesisScreen';
// import ProfileSettingsScreen from './screens/ProfileSettingsScreen';
// import ProfilePrivacyScreen from './screens/ProfilePrivacyScreen';

interface ProfilePageProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: UserRole;
  profileData: ProfileData;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace' | 'intelligence' | 'my-ventures' | 'my-services') => void;
  selectedAICompanion: string;
  onAgentChange: (agent: string) => void;
}

/**
 * ProfilePage component
 * 
 * Main container for the profile section. Manages navigation between different
 * profile screens and integrates with global navigation and AI companion.
 */
const ProfilePage: React.FC<ProfilePageProps> = ({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  selectedAICompanion,
  onAgentChange
}) => {
  // State for active profile tab
  
  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const requiredFields = [
      'fullName', 'email', 'phone', 'linkedinProfile', 'country', 
      'currentOccupation', 'yearsExperience', 'industryExpertise'
    ];
    
    let completedFields = 0;
    requiredFields.forEach(field => {
      if (profileData[field] && typeof profileData[field] === 'string' && profileData[field].trim() !== '') {
        completedFields++;
      }
    });
    
    return Math.round((completedFields / requiredFields.length) * 100);
  };
  
  // Calculate profile status based on additional fields
  const calculateProfileStatus = () => {
    const enhancementFields = [
      'entrepreneurialExperience', 'marketExpertise', 'keySkills',
      'company', 'companyLinkedin', 'industryFocus'
    ];
    
    let enhancedFields = 0;
    enhancementFields.forEach(field => {
      if (profileData[field] && typeof profileData[field] === 'string' && profileData[field].trim() !== '') {
        enhancedFields++;
      }
    });
    
    if (enhancedFields >= 5) return { label: 'Verified', color: 'bg-green-500/20 text-green-300', icon: <Shield className="h-3 w-3" /> };
    if (enhancedFields >= 3) return { label: 'Enhanced', color: 'bg-blue-500/20 text-blue-300', icon: <Award className="h-3 w-3" /> };
    return { label: 'Basic', color: 'bg-yellow-500/20 text-yellow-300', icon: <User className="h-3 w-3" /> };
  };
  
  const profileCompletionPercentage = calculateProfileCompletion();
  const profileStatus = calculateProfileStatus();
  
  const [activeProfileTab, setActiveProfileTab] = useState<ProfileTab>({
    main: 'profile-details',
    sub: 'overview'
  });

  // Scroll to top when component mounts or tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeProfileTab]);

  // Update AI agent when tab changes
  useEffect(() => {
    switch (activeProfileTab.main) {
      case 'profile-details':
        switch (activeProfileTab.sub) {
          case 'overview':
            onAgentChange('profile-analyzer');
            break;
          case 'information':
            onAgentChange('profile-builder');
            break;
          case 'mindset-preferences':
            onAgentChange('personalization');
            break;
          case 'direction-thesis':
            onAgentChange('thesis-development');
            break;
          default:
            onAgentChange('profile-builder');
        }
        break;
      case 'profile-settings':
        onAgentChange('settings-assistant');
        break;
      case 'profile-privacy':
        onAgentChange('privacy-advisor');
        break;
      default:
        onAgentChange('profile-builder');
    }
  }, [activeProfileTab, onAgentChange]);

  // Handle edit profile action
  const handleEditProfile = () => {
    setActiveProfileTab({
      main: 'profile-details',
      sub: 'information'
    });
  };

  // Render the appropriate screen based on active tab
  const renderCurrentScreen = () => {
    switch (activeProfileTab.main) {
      case 'profile-details':
        switch (activeProfileTab.sub) {
          case 'overview':
            return (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Profile Overview</h2>
                <p className="text-white/70">
                  This is a placeholder for the Profile Overview screen. It will display reputation metrics, 
                  activity summary, and professional achievements.
                </p>
                
                {/* Reputation Metrics Placeholder */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Reputation Metrics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">85%</div>
                      <div className="text-white/70 text-sm">Trust Score</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">24</div>
                      <div className="text-white/70 text-sm">Endorsements</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">12</div>
                      <div className="text-white/70 text-sm">Transactions</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="text-2xl font-bold text-white">2 yrs</div>
                      <div className="text-white/70 text-sm">Platform Tenure</div>
                    </div>
                  </div>
                </div>
                
                {/* Activity Summary Placeholder */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Activity Summary</h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70">
                      Recent platform activity will be displayed here, including posts, connections, 
                      venture interactions, and achievements.
                    </p>
                  </div>
                </div>
                
                {/* Professional Achievements Placeholder */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Professional Achievements</h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70">
                      Career highlights and accomplishments will be displayed here, including success stories, 
                      portfolio highlights, ratings & testimonials, and awards/recognition.
                    </p>
                  </div>
                </div>
              </div>
            );
          case 'information':
            return (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Profile Information</h2>
                <p className="text-white/70">
                  This is a placeholder for the Profile Information screen. It will allow editing of personal 
                  and professional details, including name, background, location, and contact information.
                </p>
                
                {/* Horizontal Tabs Placeholder */}
                <div className="mt-6 border-b border-white/20">
                  <div className="flex space-x-4">
                    <button className="px-4 py-2 text-white border-b-2 border-purple-500">Personal Info</button>
                    <button className="px-4 py-2 text-white/60 hover:text-white">Professional Background</button>
                    <button className="px-4 py-2 text-white/60 hover:text-white">Business Info</button>
                  </div>
                </div>
                
                {/* Form Fields Placeholder */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white" 
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white mb-2">Email Address</label>
                    <input 
                      type="email" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white" 
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button className="px-4 py-2 text-white/60 hover:text-white">Discard Changes</button>
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg">
                    Save Changes
                  </button>
                </div>
              </div>
            );
          case 'mindset-preferences':
            return (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Mindset & Preferences</h2>
                <p className="text-white/70">
                  This is a placeholder for the Mindset & Preferences screen. It will display and allow editing of 
                  business mindset preferences, risk tolerance assessment, and investment/venture building philosophy.
                </p>
                
                {/* Role-specific content placeholder */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Preferences
                  </h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70">
                      Role-specific preferences will be displayed here based on whether the user is a founder, 
                      investor, or expert.
                    </p>
                  </div>
                </div>
              </div>
            );
          case 'direction-thesis':
            return (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Direction/Thesis</h2>
                <p className="text-white/70">
                  This is a placeholder for the Direction/Thesis screen. It will display and allow editing of 
                  strategic direction for founders, investment strategy for investors, or service strategy for experts.
                </p>
                
                {/* Role-specific content placeholder */}
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {selectedRole === 'founder' ? 'Venture Building Strategy' : 
                     selectedRole === 'investor' ? 'Investment Strategy' : 
                     'Service Strategy'}
                  </h3>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/70">
                      Role-specific strategy details will be displayed here based on whether the user is a founder, 
                      investor, or expert.
                    </p>
                  </div>
                </div>
              </div>
            );
          default:
            return <div>Select a profile details tab</div>;
        }
      case 'profile-settings':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Profile Settings</h2>
            <p className="text-white/70">
              This is a placeholder for the Profile Settings screen. It will allow configuration of 
              account settings, subscription management, notifications, and platform preferences.
            </p>
            
            {/* Settings content placeholder */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                {activeProfileTab.sub === 'account-information' ? 'Account Information' :
                 activeProfileTab.sub === 'subscription-management' ? 'Subscription Management' :
                 'Settings'}
              </h3>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/70">
                  Settings details will be displayed here based on the selected settings tab.
                </p>
              </div>
            </div>
          </div>
        );
      case 'profile-privacy':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Profile Privacy</h2>
            <p className="text-white/70">
              This is a placeholder for the Profile Privacy screen. It will allow configuration of 
              privacy settings, data sharing preferences, and contact permissions.
            </p>
            
            {/* Privacy content placeholder */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                {activeProfileTab.sub === 'profile-visibility' ? 'Profile Visibility' :
                 activeProfileTab.sub === 'data-sharing' ? 'Data Sharing' :
                 activeProfileTab.sub === 'contact-permissions' ? 'Contact Permissions' :
                 'Privacy Settings'}
              </h3>
              <div className="bg-white/5 rounded-lg p-4">
                <p className="text-white/70">
                  Privacy settings will be displayed here based on the selected privacy tab.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a profile tab</div>;
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
        <ProfileSidebar 
          isAICompanionOpen={isAICompanionOpen}
          activeTab={activeProfileTab}
          onTabChange={setActiveProfileTab}
        />

        {/* Main Content */}
        <div 
          className="flex-1 transition-all duration-300 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          style={{ 
            marginLeft: isAICompanionOpen ? '64px' : '256px',
            marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Profile Header */}
            <ProfileHeader 
              profileData={profileData}
              selectedRole={selectedRole}
              profileCompletionPercentage={profileCompletionPercentage}
              profileStatus={profileStatus}
              onEditProfile={handleEditProfile}
            />
            
            {/* Current Screen Content */}
            {renderCurrentScreen()}
          </div>
        </div>
      </div>

      {/* AI Companion Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleAICompanion}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
          aria-label="Toggle AI Companion"
        >
          <Brain className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
