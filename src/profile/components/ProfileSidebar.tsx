import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Lock, 
  ChevronDown, 
  ChevronRight,
  FileText,
  BrainCircuit,
  Target,
  Eye
} from 'lucide-react';

// Main tab types
export type MainProfileTab = 'profile-details' | 'profile-settings' | 'profile-privacy';

// Sub tab types for Profile Details
export type ProfileDetailsTab = 'overview' | 'information' | 'mindset-preferences' | 'direction-thesis';

// Sub tab types for Profile Settings
export type ProfileSettingsTab = 
  | 'account-information' 
  | 'subscription-management' 
  | 'notification-preferences' 
  | 'platform-preferences'
  | 'ai-companion-settings'
  | 'integration-settings'
  | 'accessibility-options';

// Sub tab types for Profile Privacy
export type ProfilePrivacyTab = 'profile-visibility' | 'data-sharing' | 'contact-permissions';

// Combined tab type
export type ProfileTab = 
  | { main: 'profile-details'; sub: ProfileDetailsTab }
  | { main: 'profile-settings'; sub: ProfileSettingsTab }
  | { main: 'profile-privacy'; sub: ProfilePrivacyTab };

interface ProfileSidebarProps {
  isAICompanionOpen: boolean;
  activeTab: ProfileTab;
  onTabChange: (tab: ProfileTab) => void;
}

/**
 * ProfileSidebar component
 * 
 * Provides navigation for the profile section with main tabs and nested tabs.
 * Collapses to show only icons when AI companion is open.
 */
const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ 
  isAICompanionOpen, 
  activeTab, 
  onTabChange 
}) => {
  // State to track which main sections are expanded
  const [expandedSections, setExpandedSections] = useState<{
    [key in MainProfileTab]?: boolean;
  }>({
    'profile-details': true,
    'profile-settings': false,
    'profile-privacy': false
  });

  // Toggle section expansion
  const toggleSection = (section: MainProfileTab) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle main tab click
  const handleMainTabClick = (main: MainProfileTab) => {
    // If the section is not expanded, expand it
    if (!expandedSections[main]) {
      toggleSection(main);
    }
    
    // Determine which sub-tab to select by default
    let sub: any;
    switch (main) {
      case 'profile-details':
        sub = 'overview';
        break;
      case 'profile-settings':
        sub = 'account-information';
        break;
      case 'profile-privacy':
        sub = 'profile-visibility';
        break;
    }
    
    onTabChange({ main, sub });
  };

  // Handle sub tab click
  const handleSubTabClick = (main: MainProfileTab, sub: any) => {
    onTabChange({ main, sub });
  };

  return (
    <div 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-white/20 transition-all duration-300 z-30 overflow-y-auto ${
        isAICompanionOpen ? 'w-16' : 'w-64'
      }`}
    >
      {/* Main Navigation Tabs */}
      <div className="p-2">
        {/* Profile Details */}
        <div className="mb-2">
          <button
            onClick={() => handleMainTabClick('profile-details')}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
              activeTab.main === 'profile-details'
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 flex-shrink-0" />
              {!isAICompanionOpen && <span className="text-sm">Profile Details</span>}
            </div>
            {!isAICompanionOpen && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSection('profile-details');
                }}
                className="text-white/70 hover:text-white"
              >
                {expandedSections['profile-details'] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
          </button>

          {/* Profile Details Sub-tabs */}
          {!isAICompanionOpen && expandedSections['profile-details'] && (
            <div className="ml-8 mt-1 space-y-1">
              <button
                onClick={() => handleSubTabClick('profile-details', 'overview')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeTab.main === 'profile-details' && activeTab.sub === 'overview'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Eye className="h-4 w-4 flex-shrink-0" />
                <span>Overview</span>
              </button>
              <button
                onClick={() => handleSubTabClick('profile-details', 'information')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeTab.main === 'profile-details' && activeTab.sub === 'information'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span>Information</span>
              </button>
              <button
                onClick={() => handleSubTabClick('profile-details', 'mindset-preferences')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeTab.main === 'profile-details' && activeTab.sub === 'mindset-preferences'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <BrainCircuit className="h-4 w-4 flex-shrink-0" />
                <span>Mindset & Preferences</span>
              </button>
              <button
                onClick={() => handleSubTabClick('profile-details', 'direction-thesis')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeTab.main === 'profile-details' && activeTab.sub === 'direction-thesis'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Target className="h-4 w-4 flex-shrink-0" />
                <span>Direction/Thesis</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Settings */}
        <div className="mb-2">
          <button
            onClick={() => handleMainTabClick('profile-settings')}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
              activeTab.main === 'profile-settings'
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!isAICompanionOpen && <span className="text-sm">Profile Settings</span>}
            </div>
            {!isAICompanionOpen && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSection('profile-settings');
                }}
                className="text-white/70 hover:text-white"
              >
                {expandedSections['profile-settings'] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
          </button>

          {/* Profile Settings Sub-tabs */}
          {!isAICompanionOpen && expandedSections['profile-settings'] && (
            <div className="ml-8 mt-1 space-y-1">
              <button
                onClick={() => handleSubTabClick('profile-settings', 'account-information')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeTab.main === 'profile-settings' && activeTab.sub === 'account-information'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <User className="h-4 w-4 flex-shrink-0" />
                <span>Account Information</span>
              </button>
              <button
                onClick={() => handleSubTabClick('profile-settings', 'subscription-management')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeTab.main === 'profile-settings' && activeTab.sub === 'subscription-management'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span>Subscription Management</span>
              </button>
              {/* Add more settings sub-tabs as needed */}
            </div>
          )}
        </div>

        {/* Profile Privacy */}
        <div className="mb-2">
          <button
            onClick={() => handleMainTabClick('profile-privacy')}
            className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-colors ${
              activeTab.main === 'profile-privacy'
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 flex-shrink-0" />
              {!isAICompanionOpen && <span className="text-sm">Profile Privacy</span>}
            </div>
            {!isAICompanionOpen && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSection('profile-privacy');
                }}
                className="text-white/70 hover:text-white"
              >
                {expandedSections['profile-privacy'] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}
          </button>

          {/* Profile Privacy Sub-tabs */}
          {!isAICompanionOpen && expandedSections['profile-privacy'] && (
            <div className="ml-8 mt-1 space-y-1">
              <button
                onClick={() => handleSubTabClick('profile-privacy', 'profile-visibility')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeTab.main === 'profile-privacy' && activeTab.sub === 'profile-visibility'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Eye className="h-4 w-4 flex-shrink-0" />
                <span>Profile Visibility</span>
              </button>
              <button
                onClick={() => handleSubTabClick('profile-privacy', 'data-sharing')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeTab.main === 'profile-privacy' && activeTab.sub === 'data-sharing'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="h-4 w-4 flex-shrink-0" />
                <span>Data Sharing</span>
              </button>
              <button
                onClick={() => handleSubTabClick('profile-privacy', 'contact-permissions')}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeTab.main === 'profile-privacy' && activeTab.sub === 'contact-permissions'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <User className="h-4 w-4 flex-shrink-0" />
                <span>Contact Permissions</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
