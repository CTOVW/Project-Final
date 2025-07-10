import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Building2, 
  Save,
  ArrowLeft,
  ArrowRight,
  Brain,
  Sparkles,
  RefreshCw
} from 'lucide-react';

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

interface ProfileScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  onNext: () => void;
  onBack: () => void;
  onProfileDataChange: (data: ProfileData) => void;
  toggleAICompanion: () => void;
  setChatHistory?: (chatHistory: any) => void;
  onAgentChange?: (agent: string) => void;
}

function ProfileScreen({ 
  selectedRole, 
  profileData, 
  onNext, 
  onBack, 
  onProfileDataChange, 
  toggleAICompanion,
  setChatHistory,
  onAgentChange
}: ProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('personal');

  // Trigger AI companion suggestion when component mounts
  useEffect(() => {
    if (setChatHistory && onAgentChange) {
      // Set the appropriate agent for profile building
      onAgentChange('profile-builder');
      
      // Add a helpful message about autofill capabilities
      setTimeout(() => {
        setChatHistory((prev: any) => [...prev, {
          type: 'ai',
          message: `I notice you're filling out your profile. I can help you autofill information based on your background. Just tell me about yourself, or type "autofill my profile" and I'll suggest relevant information for your ${selectedRole} profile.`,
          timestamp: new Date()
        }]);
      }, 1000);
    }
  }, [setChatHistory, onAgentChange, selectedRole]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    onProfileDataChange({
      ...profileData,
      [field]: value
    });
  };

  const onboardingTabs = [
    { id: 'role', label: 'Role Selection', active: false },
    { id: 'profile', label: 'Profile Info', active: true },
    { id: 'mindset', label: 'Mindset & Preferences', active: false },
    { id: 'intelligence', label: 'General Intelligence', active: false },
    { id: 'direction', label: 'Direction/Thesis', active: false }
  ];

  const profileTabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'professional', label: 'Professional Background', icon: Briefcase },
    { id: 'business', label: 'Business Info', icon: Building2 }
  ];

  // Check if any fields have been autofilled (non-empty)
  const hasAutofillData = Object.values(profileData).some(value => value.trim() !== '');

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
              <span className="text-sm">Step 2 of 5</span>
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="text-sm">40% Complete</span>
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
              Complete Your Profile
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Help us personalize your Venture Weavers experience. The more data you provide the more relevant your experience gets.
            </p>
            
            {/* AI Companion Button */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={toggleAICompanion}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
              >
                <Brain className="h-5 w-5" />
                <span>Get AI Assistance</span>
              </button>
              
              {hasAutofillData && (
                <div className="flex items-center space-x-2 text-green-400">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-sm">AI has pre-filled some fields for you!</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
            <div className="border-b border-white/20">
              <div className="flex">
                {profileTabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-white/10 text-white border-b-2 border-purple-300'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-8">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Personal Information</h3>
                    <div className="text-sm text-white/60">
                      Ask AI: "Please autofill my personal information" or "I'm from Dubai, work in fintech"
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.fullName ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.email ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.phone ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">LinkedIn Profile</label>
                      <input
                        type="url"
                        value={profileData.linkedinProfile}
                        onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.linkedinProfile ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="LinkedIn profile URL"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Country of Residence</label>
                      <select
                        value={profileData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.country ? 'ring-2 ring-green-400/50' : ''
                        }`}
                      >
                        <option value="" className="bg-slate-800">Select country</option>
                        <option value="UAE" className="bg-slate-800">United Arab Emirates</option>
                        <option value="SA" className="bg-slate-800">Saudi Arabia</option>
                        <option value="EG" className="bg-slate-800">Egypt</option>
                        <option value="JO" className="bg-slate-800">Jordan</option>
                        <option value="LB" className="bg-slate-800">Lebanon</option>
                        <option value="other" className="bg-slate-800">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Preferred Language</label>
                      <select
                        value={profileData.language}
                        onChange={(e) => handleInputChange('language', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.language ? 'ring-2 ring-green-400/50' : ''
                        }`}
                      >
                        <option value="" className="bg-slate-800">Select language</option>
                        <option value="en" className="bg-slate-800">English</option>
                        <option value="ar" className="bg-slate-800">Arabic</option>
                        <option value="both" className="bg-slate-800">Both</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Save Draft</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Professional Background Tab */}
              {activeTab === 'professional' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Professional Background</h3>
                    <div className="text-sm text-white/60">
                      Ask AI: "I'm a senior fintech professional" or "Help me fill professional background"
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Current Occupation</label>
                      <input
                        type="text"
                        value={profileData.currentOccupation}
                        onChange={(e) => handleInputChange('currentOccupation', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.currentOccupation ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="Your current role/position"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Years of Professional Experience</label>
                      <select
                        value={profileData.yearsExperience}
                        onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.yearsExperience ? 'ring-2 ring-green-400/50' : ''
                        }`}
                      >
                        <option value="" className="bg-slate-800">Select experience</option>
                        <option value="0-2" className="bg-slate-800">0-2 years</option>
                        <option value="3-5" className="bg-slate-800">3-5 years</option>
                        <option value="6-10" className="bg-slate-800">6-10 years</option>
                        <option value="11-15" className="bg-slate-800">11-15 years</option>
                        <option value="15+" className="bg-slate-800">15+ years</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white/80 mb-2">Previous Entrepreneurial Experience</label>
                      <textarea
                        value={profileData.entrepreneurialExperience}
                        onChange={(e) => handleInputChange('entrepreneurialExperience', e.target.value)}
                        rows={3}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.entrepreneurialExperience ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="Describe your entrepreneurial background..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Relevant Industry Expertise</label>
                      <input
                        type="text"
                        value={profileData.industryExpertise}
                        onChange={(e) => handleInputChange('industryExpertise', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.industryExpertise ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="e.g., Fintech, Healthcare, E-commerce"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Relevant Market Expertise</label>
                      <input
                        type="text"
                        value={profileData.marketExpertise}
                        onChange={(e) => handleInputChange('marketExpertise', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.marketExpertise ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="e.g., MENA, GCC, North Africa"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white/80 mb-2">Key Skills and Competencies</label>
                      <textarea
                        value={profileData.keySkills}
                        onChange={(e) => handleInputChange('keySkills', e.target.value)}
                        rows={3}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.keySkills ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="List your key skills and competencies..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Save Draft</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Business Information Tab */}
              {activeTab === 'business' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Business Information</h3>
                    <div className="text-sm text-white/60">
                      Ask AI: "I run a startup in Dubai" or "Help with business information"
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Company/Organization</label>
                      <input
                        type="text"
                        value={profileData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.company ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="Company name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Company LinkedIn Profile</label>
                      <input
                        type="url"
                        value={profileData.companyLinkedin}
                        onChange={(e) => handleInputChange('companyLinkedin', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.companyLinkedin ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="Company LinkedIn URL"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Type of Company</label>
                      <select
                        value={profileData.companyType}
                        onChange={(e) => handleInputChange('companyType', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.companyType ? 'ring-2 ring-green-400/50' : ''
                        }`}
                      >
                        <option value="" className="bg-slate-800">Select type</option>
                        <option value="startup" className="bg-slate-800">Startup</option>
                        <option value="vc" className="bg-slate-800">VC Fund</option>
                        <option value="corporate" className="bg-slate-800">Corporate</option>
                        <option value="consulting" className="bg-slate-800">Consulting</option>
                        <option value="other" className="bg-slate-800">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Industry Focus</label>
                      <input
                        type="text"
                        value={profileData.industryFocus}
                        onChange={(e) => handleInputChange('industryFocus', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.industryFocus ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="Primary industry focus"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Origin (Location)</label>
                      <input
                        type="text"
                        value={profileData.origin}
                        onChange={(e) => handleInputChange('origin', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.origin ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="Company origin/location"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Company Size</label>
                      <select
                        value={profileData.companySize}
                        onChange={(e) => handleInputChange('companySize', e.target.value)}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.companySize ? 'ring-2 ring-green-400/50' : ''
                        }`}
                      >
                        <option value="" className="bg-slate-800">Select size</option>
                        <option value="1-10" className="bg-slate-800">1-10 employees</option>
                        <option value="11-50" className="bg-slate-800">11-50 employees</option>
                        <option value="51-200" className="bg-slate-800">51-200 employees</option>
                        <option value="201-500" className="bg-slate-800">201-500 employees</option>
                        <option value="500+" className="bg-slate-800">500+ employees</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-white/80 mb-2">What are your institution's key capabilities / potential value-add?</label>
                      <textarea
                        value={profileData.keyCapabilities}
                        onChange={(e) => handleInputChange('keyCapabilities', e.target.value)}
                        rows={4}
                        className={`w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          profileData.keyCapabilities ? 'ring-2 ring-green-400/50' : ''
                        }`}
                        placeholder="Describe your key capabilities and value proposition..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                      <Save className="h-4 w-4" />
                      <span>Save Draft</span>
                    </button>
                  </div>
                </div>
              )}
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
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
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

export default ProfileScreen;