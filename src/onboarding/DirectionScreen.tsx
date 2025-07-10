import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Globe, 
  Lightbulb,
  DollarSign,
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  CheckCircle,
  Building2,
  BarChart3
} from 'lucide-react';

interface DirectionScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function DirectionScreen({ selectedRole, onNext, onBack, toggleAICompanion }: DirectionScreenProps) {
  const [thesisData, setThesisData] = useState({
    investmentThesis: '',
    targetMarkets: [] as string[],
    investmentRange: '',
    portfolioGoals: '',
    riskStrategy: '',
    exitStrategy: '',
    valueCreationApproach: '',
    networkingGoals: '',
    learningObjectives: '',
    timeCommitment: '',
    successMetrics: ''
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setThesisData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: string, value: string) => {
    setThesisData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const onboardingTabs = [
    { id: 'role', label: 'Role Selection', active: false },
    { id: 'profile', label: 'Profile Info', active: false },
    { id: 'mindset', label: 'Mindset & Preferences', active: false },
    { id: 'intelligence', label: 'General Intelligence', active: false },
    { id: 'direction', label: 'Direction/Thesis', active: true }
  ];

  const getRoleSpecificContent = () => {
    switch (selectedRole) {
      case 'founder':
        return {
          title: 'Venture Building Direction',
          subtitle: 'Define your startup strategy and growth objectives',
          sections: [
            {
              title: 'Business Vision',
              field: 'investmentThesis',
              placeholder: 'Describe your business vision and value proposition...',
              type: 'textarea'
            },
            {
              title: 'Target Markets',
              field: 'targetMarkets',
              options: ['B2B', 'B2C', 'B2B2C', 'Enterprise', 'SME', 'Consumer'],
              type: 'multiselect'
            },
            {
              title: 'Funding Goals',
              field: 'investmentRange',
              options: ['Pre-seed ($50K-$250K)', 'Seed ($250K-$2M)', 'Series A ($2M-$15M)', 'Series B+ ($15M+)'],
              type: 'select'
            }
          ]
        };
      case 'investor':
        return {
          title: 'Investment Thesis',
          subtitle: 'Define your investment strategy and portfolio objectives',
          sections: [
            {
              title: 'Investment Philosophy',
              field: 'investmentThesis',
              placeholder: 'Describe your investment thesis and approach...',
              type: 'textarea'
            },
            {
              title: 'Target Sectors',
              field: 'targetMarkets',
              options: ['Fintech', 'Healthtech', 'E-commerce', 'EdTech', 'PropTech', 'CleanTech'],
              type: 'multiselect'
            },
            {
              title: 'Investment Range',
              field: 'investmentRange',
              options: ['$10K-$50K', '$50K-$250K', '$250K-$1M', '$1M-$5M', '$5M+'],
              type: 'select'
            }
          ]
        };
      case 'expert':
        return {
          title: 'Service Direction',
          subtitle: 'Define your expertise and service offerings',
          sections: [
            {
              title: 'Service Philosophy',
              field: 'investmentThesis',
              placeholder: 'Describe your approach to helping startups and investors...',
              type: 'textarea'
            },
            {
              title: 'Target Clients',
              field: 'targetMarkets',
              options: ['Early-stage Startups', 'Growth Companies', 'VCs', 'Corporate Innovation', 'Government'],
              type: 'multiselect'
            },
            {
              title: 'Service Range',
              field: 'investmentRange',
              options: ['$1K-$5K', '$5K-$25K', '$25K-$100K', '$100K+'],
              type: 'select'
            }
          ]
        };
      default:
        return {
          title: 'Direction & Strategy',
          subtitle: 'Define your objectives and approach',
          sections: []
        };
    }
  };

  const roleContent = getRoleSpecificContent();

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
              <span className="text-sm">Step 5 of 5</span>
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <span className="text-sm">100% Complete</span>
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
              {roleContent.title}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {roleContent.subtitle}
            </p>
            
            {/* AI Companion Button */}
            <div className="mt-6">
              <button 
                onClick={toggleAICompanion}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
              >
                <Brain className="h-5 w-5" />
                <span>Get Strategic Guidance</span>
              </button>
            </div>
          </div>

          {/* Direction Form */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
            <div className="space-y-8">
              {/* Main Sections */}
              {roleContent.sections.map((section, index) => (
                <div key={section.field}>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                    {index === 0 && <Target className="h-5 w-5 text-purple-300" />}
                    {index === 1 && <Users className="h-5 w-5 text-blue-300" />}
                    {index === 2 && <DollarSign className="h-5 w-5 text-green-300" />}
                    <span>{section.title}</span>
                  </h3>

                  {section.type === 'textarea' && (
                    <textarea
                      value={thesisData[section.field as keyof typeof thesisData] as string}
                      onChange={(e) => handleInputChange(section.field, e.target.value)}
                      rows={4}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder={section.placeholder}
                    />
                  )}

                  {section.type === 'select' && (
                    <select
                      value={thesisData[section.field as keyof typeof thesisData] as string}
                      onChange={(e) => handleInputChange(section.field, e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="" className="bg-slate-800">Select option</option>
                      {section.options?.map((option) => (
                        <option key={option} value={option} className="bg-slate-800">
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {section.type === 'multiselect' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {section.options?.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleMultiSelect(section.field, option)}
                          className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                            (thesisData[section.field as keyof typeof thesisData] as string[]).includes(option)
                              ? 'bg-purple-500/20 border-purple-300 text-white'
                              : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                          }`}
                        >
                          {(thesisData[section.field as keyof typeof thesisData] as string[]).includes(option) ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <div className="h-4 w-4 border border-white/40 rounded-full" />
                          )}
                          <span>{option}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Additional Strategy Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-yellow-300" />
                    <span>Success Metrics</span>
                  </h3>
                  <textarea
                    value={thesisData.successMetrics}
                    onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How do you measure success?"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-orange-300" />
                    <span>Learning Objectives</span>
                  </h3>
                  <textarea
                    value={thesisData.learningObjectives}
                    onChange={(e) => handleInputChange('learningObjectives', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What do you want to learn?"
                  />
                </div>
              </div>

              {/* Time Commitment */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Time Commitment</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['1-5 hours/week', '5-10 hours/week', '10-20 hours/week', '20+ hours/week'].map((option) => (
                    <button
                      key={option}
                      onClick={() => handleInputChange('timeCommitment', option)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm ${
                        thesisData.timeCommitment === option
                          ? 'bg-indigo-500/20 border-indigo-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Save Strategy</span>
                </button>
              </div>
            </div>
          </div>

          {/* Completion Summary */}
          <div className="mt-8 bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-6 w-6 text-green-300 mt-1" />
              <div>
                <h4 className="text-green-300 font-semibold mb-2">Ready to Launch!</h4>
                <p className="text-white/80 mb-4">
                  You've completed all onboarding steps. Your personalized Venture Weavers experience is ready to begin.
                </p>
                <ul className="text-white/70 space-y-1 text-sm">
                  <li>✓ Profile information collected</li>
                  <li>✓ Preferences and mindset configured</li>
                  <li>✓ Intelligence assessment completed</li>
                  <li>✓ Strategic direction defined</li>
                </ul>
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
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105"
              >
                <span>Complete Onboarding</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectionScreen;