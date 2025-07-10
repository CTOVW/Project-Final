import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Target,
  ArrowLeft,
  ArrowRight,
  Save,
  CheckCircle,
  AlertCircle,
  Info,
  DollarSign,
  Building2,
  Zap,
  Activity,
  PieChart,
  MapPin
} from 'lucide-react';

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

interface IntelligenceScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  preferences: PreferencesData;
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function IntelligenceScreen({ selectedRole, profileData, preferences, onNext, onBack, toggleAICompanion }: IntelligenceScreenProps) {
  const [activeIntelligenceTab, setActiveIntelligenceTab] = useState('market-overview');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onboardingTabs = [
    { id: 'role', label: 'Role Selection', active: false },
    { id: 'profile', label: 'Profile Info', active: false },
    { id: 'mindset', label: 'Mindset & Preferences', active: false },
    { id: 'intelligence', label: 'General Intelligence', active: true },
    { id: 'direction', label: 'Direction/Thesis', active: false }
  ];

  const intelligenceTabs = [
    { id: 'market-overview', label: 'Market overview' },
    { id: 'demographic-economic', label: 'Demographic & economic data' },
    { id: 'startup-ecosystem', label: 'Startup ecosystem data' },
    { id: 'market-trends', label: 'Market trends' }
  ];

  // Generate personalized tags based on user data
  const generatePersonalizedTags = () => {
    const tags = [];
    
    // Add industry tags from preferences
    if (preferences.preferredIndustries.length > 0) {
      tags.push(preferences.preferredIndustries[0]);
    }
    
    // Add stage based on role
    if (selectedRole === 'founder') {
      tags.push('Early-stage');
    } else if (selectedRole === 'investor') {
      tags.push('Growth-stage');
    } else {
      tags.push('Advisory');
    }
    
    // Add geographic focus
    if (preferences.geographicFocus.length > 0) {
      tags.push('MENA');
    } else if (profileData.country) {
      tags.push('MENA');
    } else {
      tags.push('Global');
    }
    
    return tags;
  };

  const personalizedTags = generatePersonalizedTags();

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      DollarSign, MapPin, TrendingUp, Building2, Target,
      Globe, Activity, PieChart, BarChart3, Zap
    };
    return icons[iconName] || DollarSign;
  };

  // Sample market stats for the General Market Stats section
  const sampleMarketStats = [
    {
      label: 'Total VC Market',
      value: '$337.4B',
      unit: 'USD',
      icon: 'DollarSign',
      color: 'blue'
    },
    {
      label: 'MENA Investment',
      value: '$2.3B',
      unit: 'USD',
      icon: 'MapPin',
      color: 'purple'
    },
    {
      label: 'Growth Rate',
      value: '+17.56%',
      unit: '',
      icon: 'TrendingUp',
      color: 'green'
    },
    {
      label: 'Active Ventures',
      value: '12,500+',
      unit: '',
      icon: 'Building2',
      color: 'yellow'
    }
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
              <span className="text-sm">Step 4 of 5</span>
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
              <span className="text-sm">80% Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Personalized For Tags */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 text-white/80">
              <span className="text-sm font-medium">Personalized for:</span>
              <div className="flex space-x-2">
                {personalizedTags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-300/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Target Market Overview
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Real-time market insights tailored to your profile & interests.
            </p>
            
            {/* AI Companion Button */}
            <div className="mt-6">
              <button 
                onClick={toggleAICompanion}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <Brain className="h-5 w-5" />
                <span>Get Assessment Help</span>
              </button>
            </div>
          </div>

          {/* General Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {sampleMarketStats.map((stat, index) => {
              const IconComponent = getIconComponent(stat.icon);
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
                  <div className={`bg-${stat.color}-500/20 p-3 rounded-lg w-fit mx-auto mb-4`}>
                    <IconComponent className={`h-6 w-6 text-${stat.color}-300`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Intelligence Tabs */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
            <div className="border-b border-white/20">
              <div className="flex overflow-x-auto">
                {intelligenceTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveIntelligenceTab(tab.id)}
                    className={`flex-shrink-0 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                      activeIntelligenceTab === tab.id
                        ? 'bg-white/10 text-white border-b-2 border-purple-300'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8">
              {/* Market Overview Tab */}
              {activeIntelligenceTab === 'market-overview' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Industry Market Overview</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-blue-500/20 p-2 rounded-lg">
                          <DollarSign className="h-5 w-5 text-blue-300" />
                        </div>
                        <h4 className="text-white font-semibold">Fintech</h4>
                      </div>
                      <p className="text-white/80 text-sm mb-2">$31B market size</p>
                      <p className="text-green-300 text-sm">67% payment growth</p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-purple-500/20 p-2 rounded-lg">
                          <BarChart3 className="h-5 w-5 text-purple-300" />
                        </div>
                        <h4 className="text-white font-semibold">E-commerce</h4>
                      </div>
                      <p className="text-white/80 text-sm mb-2">$28B by 2026</p>
                      <p className="text-green-300 text-sm">78% mobile adoption</p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-green-500/20 p-2 rounded-lg">
                          <Activity className="h-5 w-5 text-green-300" />
                        </div>
                        <h4 className="text-white font-semibold">Healthtech</h4>
                      </div>
                      <p className="text-white/80 text-sm mb-2">$2.8B market size</p>
                      <p className="text-green-300 text-sm">340% telemedicine growth</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                    <h4 className="text-blue-300 font-semibold mb-3">Key Trends by Sector</h4>
                    <ul className="text-white/80 space-y-2 text-sm">
                      <li>• Digital transformation accelerating across all sectors</li>
                      <li>• Government initiatives supporting tech adoption</li>
                      <li>• Cross-border partnerships increasing</li>
                      <li>• Regulatory environment becoming more favorable</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Demographic & Economic Data Tab */}
              {activeIntelligenceTab === 'demographic-economic' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Regional Demographics & Economics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Users className="h-5 w-5 text-purple-300" />
                        <span>Population Demographics</span>
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/80">Youth population (15-34):</span>
                          <span className="text-purple-300 font-semibold">60%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/80">Digital penetration:</span>
                          <span className="text-blue-300 font-semibold">73% internet, 85% mobile</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/80">Tertiary education:</span>
                          <span className="text-green-300 font-semibold">42% enrollment</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-green-300" />
                        <span>Economic Indicators</span>
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-white/80">GDP growth:</span>
                          <span className="text-green-300 font-semibold">3.8% average</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/80">Business environment:</span>
                          <span className="text-yellow-300 font-semibold">Improving rankings</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/80">FDI inflows:</span>
                          <span className="text-blue-300 font-semibold">$45B annually</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Startup Ecosystem Data Tab */}
              {activeIntelligenceTab === 'startup-ecosystem' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Startup Ecosystem Analytics</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white/5 rounded-lg p-6 text-center">
                      <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                        <Building2 className="h-6 w-6 text-purple-300" />
                      </div>
                      <div className="text-xl font-bold text-white mb-1">12,500+</div>
                      <div className="text-white/70 text-sm">Active startups</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6 text-center">
                      <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                        <DollarSign className="h-6 w-6 text-green-300" />
                      </div>
                      <div className="text-xl font-bold text-white mb-1">$2.3B</div>
                      <div className="text-white/70 text-sm">Funding 2024 (+47%)</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6 text-center">
                      <div className="bg-yellow-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                        <Zap className="h-6 w-6 text-yellow-300" />
                      </div>
                      <div className="text-xl font-bold text-white mb-1">14</div>
                      <div className="text-white/70 text-sm">Unicorns in region</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6 text-center">
                      <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                        <Target className="h-6 w-6 text-blue-300" />
                      </div>
                      <div className="text-xl font-bold text-white mb-1">180+</div>
                      <div className="text-white/70 text-sm">Accelerator programs</div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                    <h4 className="text-purple-300 font-semibold mb-3">Geographic Distribution</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">35%</div>
                        <div className="text-white/70 text-sm">UAE</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">28%</div>
                        <div className="text-white/70 text-sm">Saudi Arabia</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">18%</div>
                        <div className="text-white/70 text-sm">Egypt</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">19%</div>
                        <div className="text-white/70 text-sm">Other</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Market Trends Tab */}
              {activeIntelligenceTab === 'market-trends' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white mb-6">Key Market Trends</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Brain className="h-5 w-5 text-blue-300" />
                        <span>Technology Trends</span>
                      </h4>
                      <ul className="text-white/80 space-y-2 text-sm">
                        <li>• AI investments: 34% of all deals</li>
                        <li>• B2B focus: 58% of Series A rounds</li>
                        <li>• Blockchain adoption: 23% growth</li>
                        <li>• IoT integration: 45% increase</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-6">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Globe className="h-5 w-5 text-green-300" />
                        <span>Market Dynamics</span>
                      </h4>
                      <ul className="text-white/80 space-y-2 text-sm">
                        <li>• Government support: $850M allocated</li>
                        <li>• International partnerships: 41% of deals</li>
                        <li>• Secondary trading: +156% growth</li>
                        <li>• Cross-border investments: 29% increase</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-6">
                    <h4 className="text-blue-300 font-semibold mb-3">Emerging Opportunities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-white font-medium mb-2">Climate/AgTech</div>
                        <div className="text-green-300 text-sm">40%+ growth potential</div>
                      </div>
                      <div>
                        <div className="text-white font-medium mb-2">B2B SaaS</div>
                        <div className="text-yellow-300 text-sm">67% market gap vs global</div>
                      </div>
                      <div>
                        <div className="text-white font-medium mb-2">Deep Tech</div>
                        <div className="text-purple-300 text-sm">78% sector fragmentation</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
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

export default IntelligenceScreen;