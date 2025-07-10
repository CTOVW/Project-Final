import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  Zap,
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  CheckCircle,
  Circle
} from 'lucide-react';

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

interface MindsetScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  preferences: PreferencesData;
  onNext: () => void;
  onBack: () => void;
  onPreferencesChange: (preferences: PreferencesData) => void;
  toggleAICompanion: () => void;
}

function MindsetScreen({ selectedRole, preferences, onNext, onBack, onPreferencesChange, toggleAICompanion }: MindsetScreenProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePreferenceChange = (field: string, value: string) => {
    const updatedPreferences = {
      ...preferences,
      [field]: value
    };
    onPreferencesChange(updatedPreferences);
  };

  const handleMultiSelect = (field: string, value: string) => {
    const currentArray = preferences[field as keyof PreferencesData] as string[];
    const updatedArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    
    const updatedPreferences = {
      ...preferences,
      [field]: updatedArray
    };
    onPreferencesChange(updatedPreferences);
  };

  const onboardingTabs = [
    { id: 'role', label: 'Role Selection', active: false },
    { id: 'profile', label: 'Profile Info', active: false },
    { id: 'mindset', label: 'Mindset & Preferences', active: true },
    { id: 'intelligence', label: 'General Intelligence', active: false },
    { id: 'direction', label: 'Direction/Thesis', active: false }
  ];

  const industries = [
    'Fintech', 'Healthtech', 'E-commerce', 'EdTech', 'PropTech', 
    'FoodTech', 'CleanTech', 'AI/ML', 'Blockchain', 'IoT', 
    'Cybersecurity', 'Gaming', 'Media & Entertainment'
  ];

  const regions = [
    'UAE', 'Saudi Arabia', 'Egypt', 'Jordan', 'Lebanon', 
    'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Morocco', 
    'Tunisia', 'Turkey', 'Pakistan'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Fixed Onboarding Tabs */}
      <div className="fixed top-16 left-0 right-0 bg-white/10 backdrop-blur-md border-b border-white/20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex space-x-8">
              {onboardingTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`text-sm font-medium ${
                    tab.active 
                      ? 'text-purple-300 border-b-2 border-purple-300' 
                      : 'text-white/60'
                  } pb-2`}
                >
                  {tab.label}
                </div>
              ))}
            </div>
            
            {/* Progress Stats */}
            <div className="flex items-center space-x-4 text-white/80">
              <span className="text-sm">Step 3 of 5</span>
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm">60% Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mindset & Preferences
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Help us understand your approach, preferences, and working style to personalize your experience.
            </p>
            
            {/* AI Companion Button */}
            <div className="mt-6">
              <button 
                onClick={toggleAICompanion}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <Brain className="h-5 w-5" />
                <span>Get AI Guidance</span>
              </button>
            </div>
          </div>

          {/* Preferences Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
            <div className="space-y-8">
              {/* Risk Tolerance */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <Target className="h-5 w-5 text-purple-300" />
                  <span>Risk Tolerance</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['Conservative', 'Moderate', 'Aggressive'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handlePreferenceChange('riskTolerance', option)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        preferences.riskTolerance === option
                          ? 'bg-purple-500/20 border-purple-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Investment Horizon */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-blue-300" />
                  <span>Investment/Engagement Horizon</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {['Short-term (1-2 years)', 'Medium-term (3-5 years)', 'Long-term (5-10 years)', 'Very long-term (10+ years)'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handlePreferenceChange('investmentHorizon', option)}
                      className={`p-4 rounded-lg border transition-all duration-300 text-sm ${
                        preferences.investmentHorizon === option
                          ? 'bg-blue-500/20 border-blue-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Primary Motivation */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-300" />
                  <span>Primary Motivation</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Financial Returns', 
                    'Social Impact', 
                    'Innovation & Technology', 
                    'Market Leadership',
                    'Knowledge & Learning',
                    'Network Building'
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => handlePreferenceChange('primaryMotivation', option)}
                      className={`p-4 rounded-lg border transition-all duration-300 ${
                        preferences.primaryMotivation === option
                          ? 'bg-red-500/20 border-red-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Industries */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-300" />
                  <span>Preferred Industries (Select multiple)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => handleMultiSelect('preferredIndustries', industry)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                        preferences.preferredIndustries.includes(industry)
                          ? 'bg-yellow-500/20 border-yellow-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {preferences.preferredIndustries.includes(industry) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                      <span>{industry}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Geographic Focus */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-green-300" />
                  <span>Geographic Focus (Select multiple)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => handleMultiSelect('geographicFocus', region)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                        preferences.geographicFocus.includes(region)
                          ? 'bg-green-500/20 border-green-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {preferences.geographicFocus.includes(region) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                      <span>{region}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Working Style Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Users className="h-5 w-5 text-indigo-300" />
                    <span>Collaboration Style</span>
                  </h3>
                  <div className="space-y-2">
                    {['Hands-on', 'Advisory', 'Strategic', 'Operational'].map((style) => (
                      <button
                        key={style}
                        onClick={() => handlePreferenceChange('collaborationStyle', style)}
                        className={`w-full p-3 rounded-lg border transition-all duration-300 text-left ${
                          preferences.collaborationStyle === style
                            ? 'bg-indigo-500/20 border-indigo-300 text-white'
                            : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Decision Making Style</h3>
                  <div className="space-y-2">
                    {['Data-driven', 'Intuitive', 'Collaborative', 'Quick & Decisive'].map((style) => (
                      <button
                        key={style}
                        onClick={() => handlePreferenceChange('decisionMakingStyle', style)}
                        className={`w-full p-3 rounded-lg border transition-all duration-300 text-left ${
                          preferences.decisionMakingStyle === style
                            ? 'bg-purple-500/20 border-purple-300 text-white'
                            : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Preferences</span>
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
            
            <div className="flex space-x-4">
              <button 
                onClick={onNext}
                className="text-white/60 hover:text-white transition-colors"
              >
                Skip for Now
              </button>
              <button 
                onClick={onNext}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Save & Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MindsetScreen;