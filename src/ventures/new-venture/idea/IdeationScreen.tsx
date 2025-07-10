import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  Lightbulb,
  CheckCircle,
  Zap,
  Target,
  Shield,
  Award,
  Layers,
  PieChart,
  TrendingUp,
  Users
} from 'lucide-react';

interface IdeationScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function IdeationScreen({ onNext, onBack, toggleAICompanion }: IdeationScreenProps) {
  const [ideationData, setIdeationData] = useState({
    solutionIdea: '',
    valueProposition: '',
    keyFeatures: [] as string[],
    customFeature: '',
    uniqueSellingPoints: '',
    competitiveAdvantages: '',
    innovationAspects: '',
    targetOutcomes: '',
    solutionCategories: [] as string[]
  });

  const handleInputChange = (field: keyof typeof ideationData, value: string) => {
    setIdeationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: keyof typeof ideationData, value: string) => {
    setIdeationData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const handleAddCustomFeature = () => {
    if (ideationData.customFeature.trim()) {
      setIdeationData(prev => ({
        ...prev,
        keyFeatures: [...prev.keyFeatures, prev.customFeature.trim()],
        customFeature: ''
      }));
    }
  };

  const handleRemoveFeature = (feature: string) => {
    setIdeationData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.filter(f => f !== feature)
    }));
  };

  const featureOptions = [
    'User Authentication', 'Payment Processing', 'Data Analytics', 
    'AI Recommendations', 'Social Features', 'Mobile App', 
    'API Integration', 'Subscription Management', 'Real-time Notifications'
  ];

  const solutionCategoryOptions = [
    'Software Platform', 'Mobile Application', 'Marketplace', 
    'SaaS', 'Hardware + Software', 'API Service', 
    'Blockchain Solution', 'AI/ML Solution', 'IoT Platform'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Idea: Solution Ideation
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Define your solution concept, key features, and competitive advantages.
        </p>
        <div className="mt-6">
          <button
            onClick={toggleAICompanion}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Brain className="h-5 w-5" />
            <span>Get AI Assistance</span>
          </button>
        </div>
      </div>

      {/* Ideation Form */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
        <div className="space-y-8">
          {/* Solution Idea */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-300" />
              <span>Solution Idea</span>
            </h3>
            <textarea
              value={ideationData.solutionIdea}
              onChange={(e) => handleInputChange('solutionIdea', e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your solution idea in detail. What are you building and how does it work?"
            />
          </div>

          {/* Value Proposition */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Award className="h-5 w-5 text-purple-300" />
              <span>Value Proposition</span>
            </h3>
            <textarea
              value={ideationData.valueProposition}
              onChange={(e) => handleInputChange('valueProposition', e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="What value does your solution provide to users? Why would they choose your solution?"
            />
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Layers className="h-5 w-5 text-blue-300" />
              <span>Key Features</span>
            </h3>
            
            {/* Predefined Features */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {featureOptions.map((feature) => (
                <button
                  key={feature}
                  onClick={() => handleMultiSelect('keyFeatures', feature)}
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                    ideationData.keyFeatures.includes(feature)
                      ? 'bg-blue-500/20 border-blue-300 text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {ideationData.keyFeatures.includes(feature) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 border border-white/40 rounded-full" />
                  )}
                  <span>{feature}</span>
                </button>
              ))}
            </div>
            
            {/* Custom Feature Input */}
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={ideationData.customFeature}
                onChange={(e) => handleInputChange('customFeature', e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Add a custom feature..."
              />
              <button
                onClick={handleAddCustomFeature}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add
              </button>
            </div>
            
            {/* Selected Features */}
            {ideationData.keyFeatures.length > 0 && (
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Selected Features:</h4>
                <div className="flex flex-wrap gap-2">
                  {ideationData.keyFeatures.map((feature) => (
                    <div 
                      key={feature} 
                      className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                    >
                      <span>{feature}</span>
                      <button 
                        onClick={() => handleRemoveFeature(feature)}
                        className="ml-1 text-blue-300 hover:text-blue-100"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Unique Selling Points & Competitive Advantages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-300" />
                <span>Unique Selling Points</span>
              </h3>
              <textarea
                value={ideationData.uniqueSellingPoints}
                onChange={(e) => handleInputChange('uniqueSellingPoints', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What makes your solution unique? What are your key differentiators?"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Shield className="h-5 w-5 text-red-300" />
                <span>Competitive Advantages</span>
              </h3>
              <textarea
                value={ideationData.competitiveAdvantages}
                onChange={(e) => handleInputChange('competitiveAdvantages', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What advantages do you have over competitors? What barriers to entry can you establish?"
              />
            </div>
          </div>

          {/* Innovation Aspects & Target Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-yellow-300" />
                <span>Innovation Aspects</span>
              </h3>
              <textarea
                value={ideationData.innovationAspects}
                onChange={(e) => handleInputChange('innovationAspects', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What is innovative about your solution? How does it push boundaries?"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-indigo-300" />
                <span>Target Outcomes</span>
              </h3>
              <textarea
                value={ideationData.targetOutcomes}
                onChange={(e) => handleInputChange('targetOutcomes', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What outcomes do you aim to achieve for your users? What metrics will indicate success?"
              />
            </div>
          </div>

          {/* Solution Categories */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-teal-300" />
              <span>Solution Categories (Select multiple)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {solutionCategoryOptions.map((category) => (
                <button
                  key={category}
                  onClick={() => handleMultiSelect('solutionCategories', category)}
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                    ideationData.solutionCategories.includes(category)
                      ? 'bg-teal-500/20 border-teal-300 text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {ideationData.solutionCategories.includes(category) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 border border-white/40 rounded-full" />
                  )}
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Draft</span>
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
  );
}

export default IdeationScreen;