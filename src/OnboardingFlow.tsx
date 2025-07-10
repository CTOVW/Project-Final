import React, { useState, useRef, useEffect } from 'react';
import WelcomeScreen from './onboarding/WelcomeScreen';
import ProfileScreen from './onboarding/ProfileScreen';
import MindsetScreen from './onboarding/MindsetScreen';
import IntelligenceScreen from './onboarding/IntelligenceScreen';
import DirectionScreen from './onboarding/DirectionScreen';
import AICompanion from './components/AICompanion';

interface ProfileData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  country: string;
  language: string;
  // Professional Background
  currentOccupation: string;
  yearsExperience: string;
  entrepreneurialExperience: string;
  industryExpertise: string;
  marketExpertise: string;
  keySkills: string;
  // Business Information
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

interface OnboardingFlowProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  selectedAICompanion: string;
  chatMessage: string;
  chatHistory: Array<{ type: 'user' | 'ai'; message: string; timestamp: Date }>;
  profileData: ProfileData;
  selectedRole: 'founder' | 'investor' | 'expert' | null;
  toggleAICompanion: () => void;
  onWidthChange: (width: number) => void;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onAgentChange: (agent: string) => void;
  onComplete: () => void;
  onRoleSelect: (role: 'founder' | 'investor' | 'expert') => void;
  onProfileDataChange: (data: ProfileData) => void;
}

function OnboardingFlow({
  isAICompanionOpen,
  aiCompanionWidth,
  selectedAICompanion,
  chatMessage,
  chatHistory,
  profileData,
  selectedRole,
  toggleAICompanion,
  onWidthChange,
  onMessageChange,
  onSendMessage,
  onAgentChange,
  onComplete,
  onRoleSelect,
  onProfileDataChange
}: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Add preferences state
  const [preferences, setPreferences] = useState<PreferencesData>({
    riskTolerance: '',
    investmentHorizon: '',
    primaryMotivation: '',
    preferredIndustries: [],
    geographicFocus: [],
    collaborationStyle: '',
    decisionMakingStyle: '',
    learningPreference: '',
    communicationStyle: '',
    workingStyle: ''
  });

  // AI Agent options based on current step
  const getAgentOptions = () => {
    switch (currentStep) {
      case 1:
        return [
          { value: 'platform-guide', label: 'Platform Guide Agent' }
        ];
      case 2:
        return [
          { value: 'profile-builder', label: 'Profile Builder Agent' }
        ];
      case 3:
        return [
          { value: 'personalization', label: 'Personalization Agent' }
        ];
      case 4:
        return [
          { value: 'assessment-guide', label: 'Assessment Guide Agent' }
        ];
      case 5:
        return [
          { value: 'thesis-development', label: 'Thesis Development Agent' }
        ];
      default:
        return [
          { value: 'general', label: 'General Assistant' }
        ];
    }
  };

  const handleRoleSelect = (role: 'founder' | 'investor' | 'expert') => {
    onRoleSelect(role);
    setCurrentStep(2);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePreferencesChange = (newPreferences: PreferencesData) => {
    setPreferences(newPreferences);
  };

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 1:
        return (
          <WelcomeScreen 
            onRoleSelect={handleRoleSelect}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 2:
        return (
          <ProfileScreen
            selectedRole={selectedRole!}
            profileData={profileData}
            onNext={handleNext}
            onBack={handleBack}
            onProfileDataChange={onProfileDataChange}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 3:
        return (
          <MindsetScreen
            selectedRole={selectedRole!}
            preferences={preferences}
            onNext={handleNext}
            onBack={handleBack}
            onPreferencesChange={handlePreferencesChange}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 4:
        return (
          <IntelligenceScreen
            selectedRole={selectedRole!}
            profileData={profileData}
            preferences={preferences}
            onNext={handleNext}
            onBack={handleBack}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 5:
        return (
          <DirectionScreen
            selectedRole={selectedRole!}
            onNext={handleNext}
            onBack={handleBack}
            toggleAICompanion={toggleAICompanion}
          />
        );
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Screen {currentStep} Coming Soon
              </h1>
              <p className="text-white/80 mb-8">
                This screen is under development
              </p>
              <div className="flex space-x-4 justify-center">
                <button 
                  onClick={handleBack}
                  className="bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-colors"
                >
                  {currentStep === 5 ? 'Complete Onboarding' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      {/* Main Content */}
      <div 
        className="transition-all duration-300"
        style={{ 
          marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
        }}
      >
        {renderCurrentScreen()}
      </div>

      {/* AI Companion */}
      <AICompanion
        isOpen={isAICompanionOpen}
        width={aiCompanionWidth}
        selectedAgent={selectedAICompanion}
        chatMessage={chatMessage}
        chatHistory={chatHistory}
        onToggle={toggleAICompanion}
        onWidthChange={onWidthChange}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
        onAgentChange={onAgentChange}
        agentOptions={getAgentOptions()}
      />
    </div>
  );
}

export default OnboardingFlow;