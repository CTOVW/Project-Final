import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  Target,
  Building2,
  BarChart3,
  Users,
  Lightbulb,
  CheckCircle,
  Search,
  Globe,
  Tag,
  Activity,
  TrendingUp
} from 'lucide-react';

interface MarketTargetingScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function MarketTargetingScreen({ onNext, onBack, toggleAICompanion }: MarketTargetingScreenProps) {
  const [marketData, setMarketData] = useState({
    targetMarkets: [] as string[],
    industries: [] as string[],
    subIndustries: [] as string[],
    topics: [] as string[],
    marketOverview: '',
    marketBehavior: '',
    marketCompetition: '',
    marketAnalysis: ''
  });

  const handleMultiSelect = (field: keyof typeof marketData, value: string) => {
    setMarketData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const handleInputChange = (field: keyof typeof marketData, value: string) => {
    setMarketData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const marketOptions = ['B2B', 'B2C', 'B2B2C', 'Enterprise', 'SME', 'Consumer'];
  const industryOptions = ['Fintech', 'Healthtech', 'E-commerce', 'EdTech', 'PropTech', 'CleanTech', 'AI/ML', 'Blockchain'];
  const subIndustryOptions = ['Digital Payments', 'Telemedicine', 'Online Retail', 'E-learning Platforms', 'Smart Homes', 'Solar Energy'];
  const topicOptions = ['Market Trends', 'Regulatory Landscape', 'Consumer Behavior', 'Competitive Analysis', 'Emerging Technologies'];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Idea: Market Targeting
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Define your target markets, industries, and key topics to focus your venture.
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

      {/* Market Targeting Form */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
        <div className="space-y-8">
          {/* Target Markets */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-300" />
              <span>Target Markets (Select multiple)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {marketOptions.map((market) => (
                <button
                  key={market}
                  onClick={() => handleMultiSelect('targetMarkets', market)}
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                    marketData.targetMarkets.includes(market)
                      ? 'bg-purple-500/20 border-purple-300 text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {marketData.targetMarkets.includes(market) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 border border-white/40 rounded-full" />
                  )}
                  <span>{market}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-blue-300" />
              <span>Industries (Select multiple)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {industryOptions.map((industry) => (
                <button
                  key={industry}
                  onClick={() => handleMultiSelect('industries', industry)}
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                    marketData.industries.includes(industry)
                      ? 'bg-blue-500/20 border-blue-300 text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {marketData.industries.includes(industry) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 border border-white/40 rounded-full" />
                  )}
                  <span>{industry}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Industries */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Tag className="h-5 w-5 text-green-300" />
              <span>Sub-Industries (Select multiple)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subIndustryOptions.map((subIndustry) => (
                <button
                  key={subIndustry}
                  onClick={() => handleMultiSelect('subIndustries', subIndustry)}
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                    marketData.subIndustries.includes(subIndustry)
                      ? 'bg-green-500/20 border-green-300 text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {marketData.subIndustries.includes(subIndustry) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 border border-white/40 rounded-full" />
                  )}
                  <span>{subIndustry}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Key Topics */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-300" />
              <span>Key Topics (Select multiple)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {topicOptions.map((topic) => (
                <button
                  key={topic}
                  onClick={() => handleMultiSelect('topics', topic)}
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                    marketData.topics.includes(topic)
                      ? 'bg-yellow-500/20 border-yellow-300 text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {marketData.topics.includes(topic) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 border border-white/40 rounded-full" />
                  )}
                  <span>{topic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Market Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Globe className="h-5 w-5 text-indigo-300" />
                <span>Market Overview</span>
              </h3>
              <textarea
                value={marketData.marketOverview}
                onChange={(e) => handleInputChange('marketOverview', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Summarize the overall market landscape..."
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Activity className="h-5 w-5 text-pink-300" />
                <span>Market Behavior</span>
              </h3>
              <textarea
                value={marketData.marketBehavior}
                onChange={(e) => handleInputChange('marketBehavior', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe consumer/user behavior and trends..."
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Users className="h-5 w-5 text-orange-300" />
                <span>Market Competition</span>
              </h3>
              <textarea
                value={marketData.marketCompetition}
                onChange={(e) => handleInputChange('marketCompetition', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Analyze the competitive landscape..."
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-teal-300" />
                <span>Market Analysis & Insights</span>
              </h3>
              <textarea
                value={marketData.marketAnalysis}
                onChange={(e) => handleInputChange('marketAnalysis', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Provide your key insights and opportunities..."
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

export default MarketTargetingScreen;