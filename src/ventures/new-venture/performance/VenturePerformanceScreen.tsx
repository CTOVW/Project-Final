import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Target,
  Globe,
  PieChart,
  Activity,
  Zap,
  Award,
  CheckCircle,
  AlertTriangle,
  Calendar,
  FileText
} from 'lucide-react';

interface VenturePerformanceScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function VenturePerformanceScreen({ onNext, onBack, toggleAICompanion }: VenturePerformanceScreenProps) {
  const [activeSection, setActiveSection] = useState('financial-performance');
  const [performanceData, setPerformanceData] = useState({
    // Financial Performance
    revenue: '',
    expenses: '',
    profitability: '',
    burnRate: '',
    runwayCalculation: '',
    cashFlowManagement: '',
    
    // Business Performance
    customerAcquisition: '',
    userEngagement: '',
    retentionMetrics: '',
    conversionRates: '',
    unitEconomics: '',
    operationalEfficiency: '',
    
    // Market Performance
    marketShare: '',
    competitivePosition: '',
    brandAwareness: '',
    marketPenetration: '',
    industryTrends: '',
    regulatoryImpact: '',
    
    // Growth Metrics
    growthRate: '',
    expansionStrategy: '',
    scalingChallenges: '',
    newMarketEntry: '',
    productExpansion: '',
    growthExperiments: '',
    
    // Performance Reporting
    keyPerformanceIndicators: '',
    reportingCadence: '',
    stakeholderUpdates: '',
    boardReporting: '',
    performanceDashboards: '',
    dataVisualization: ''
  });

  const handleInputChange = (field: keyof typeof performanceData, value: string) => {
    setPerformanceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sections = [
    { id: 'financial-performance', label: 'Financial Performance', icon: DollarSign },
    { id: 'business-performance', label: 'Business Performance', icon: Activity },
    { id: 'market-performance', label: 'Market Performance', icon: Globe },
    { id: 'growth-metrics', label: 'Growth Metrics', icon: TrendingUp },
    { id: 'performance-reporting', label: 'Performance Reporting', icon: BarChart3 }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Venture Performance
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Track and analyze your venture's performance across financial, business, and market dimensions.
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

      {/* Performance Sections */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
        <div className="border-b border-white/20">
          <div className="flex overflow-x-auto">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-white/10 text-white border-b-2 border-purple-300'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Financial Performance Section */}
          {activeSection === 'financial-performance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Financial Performance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-purple-300" />
                    <span>Revenue</span>
                  </h3>
                  <textarea
                    value={performanceData.revenue}
                    onChange={(e) => handleInputChange('revenue', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your revenue metrics. Include MRR, ARR, revenue growth rate, and revenue breakdown by product/service."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-blue-300" />
                    <span>Expenses</span>
                  </h3>
                  <textarea
                    value={performanceData.expenses}
                    onChange={(e) => handleInputChange('expenses', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your expense metrics. Include fixed costs, variable costs, COGS, and operating expenses."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <PieChart className="h-4 w-4 text-green-300" />
                    <span>Profitability</span>
                  </h3>
                  <textarea
                    value={performanceData.profitability}
                    onChange={(e) => handleInputChange('profitability', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your profitability metrics. Include gross margin, net margin, EBITDA, and profit growth."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-yellow-300" />
                    <span>Burn Rate</span>
                  </h3>
                  <textarea
                    value={performanceData.burnRate}
                    onChange={(e) => handleInputChange('burnRate', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your burn rate. Include monthly burn rate, cash burn, and burn rate trends."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-red-300" />
                    <span>Runway Calculation</span>
                  </h3>
                  <textarea
                    value={performanceData.runwayCalculation}
                    onChange={(e) => handleInputChange('runwayCalculation', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Calculate your runway. How many months of operation can you sustain with current cash reserves at current burn rate?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-indigo-300" />
                    <span>Cash Flow Management</span>
                  </h3>
                  <textarea
                    value={performanceData.cashFlowManagement}
                    onChange={(e) => handleInputChange('cashFlowManagement', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your cash flow management. Include cash flow projections, cash reserves, and cash flow optimization strategies."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Business Performance Section */}
          {activeSection === 'business-performance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Business Performance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-300" />
                    <span>Customer Acquisition</span>
                  </h3>
                  <textarea
                    value={performanceData.customerAcquisition}
                    onChange={(e) => handleInputChange('customerAcquisition', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your customer acquisition metrics. Include CAC, acquisition channels, and acquisition efficiency."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-blue-300" />
                    <span>User Engagement</span>
                  </h3>
                  <textarea
                    value={performanceData.userEngagement}
                    onChange={(e) => handleInputChange('userEngagement', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your user engagement metrics. Include DAU/MAU, session duration, feature usage, and engagement trends."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-300" />
                    <span>Retention Metrics</span>
                  </h3>
                  <textarea
                    value={performanceData.retentionMetrics}
                    onChange={(e) => handleInputChange('retentionMetrics', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your retention metrics. Include customer retention rate, churn rate, and retention strategies."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Target className="h-4 w-4 text-yellow-300" />
                    <span>Conversion Rates</span>
                  </h3>
                  <textarea
                    value={performanceData.conversionRates}
                    onChange={(e) => handleInputChange('conversionRates', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your conversion metrics. Include conversion rates at each stage of your funnel and optimization efforts."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-red-300" />
                    <span>Unit Economics</span>
                  </h3>
                  <textarea
                    value={performanceData.unitEconomics}
                    onChange={(e) => handleInputChange('unitEconomics', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your unit economics. Include LTV, LTV:CAC ratio, payback period, and unit economics trends."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-indigo-300" />
                    <span>Operational Efficiency</span>
                  </h3>
                  <textarea
                    value={performanceData.operationalEfficiency}
                    onChange={(e) => handleInputChange('operationalEfficiency', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your operational efficiency metrics. Include productivity metrics, process efficiency, and operational improvements."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Market Performance Section */}
          {activeSection === 'market-performance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Market Performance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <PieChart className="h-4 w-4 text-purple-300" />
                    <span>Market Share</span>
                  </h3>
                  <textarea
                    value={performanceData.marketShare}
                    onChange={(e) => handleInputChange('marketShare', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your market share metrics. Include current market share, market share growth, and market share by segment."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Target className="h-4 w-4 text-blue-300" />
                    <span>Competitive Position</span>
                  </h3>
                  <textarea
                    value={performanceData.competitivePosition}
                    onChange={(e) => handleInputChange('competitivePosition', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Analyze your competitive position. How do you compare to competitors? What is your competitive advantage?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Award className="h-4 w-4 text-green-300" />
                    <span>Brand Awareness</span>
                  </h3>
                  <textarea
                    value={performanceData.brandAwareness}
                    onChange={(e) => handleInputChange('brandAwareness', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your brand awareness metrics. Include brand recognition, brand sentiment, and brand visibility."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-yellow-300" />
                    <span>Market Penetration</span>
                  </h3>
                  <textarea
                    value={performanceData.marketPenetration}
                    onChange={(e) => handleInputChange('marketPenetration', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your market penetration metrics. Include penetration rate, market coverage, and penetration strategy."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-red-300" />
                    <span>Industry Trends</span>
                  </h3>
                  <textarea
                    value={performanceData.industryTrends}
                    onChange={(e) => handleInputChange('industryTrends', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Monitor industry trends. How are industry trends affecting your business? How are you adapting to these trends?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-indigo-300" />
                    <span>Regulatory Impact</span>
                  </h3>
                  <textarea
                    value={performanceData.regulatoryImpact}
                    onChange={(e) => handleInputChange('regulatoryImpact', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Monitor regulatory impacts. How are regulations affecting your business? How are you ensuring compliance?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Growth Metrics Section */}
          {activeSection === 'growth-metrics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Growth Metrics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-purple-300" />
                    <span>Growth Rate</span>
                  </h3>
                  <textarea
                    value={performanceData.growthRate}
                    onChange={(e) => handleInputChange('growthRate', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your growth rate metrics. Include revenue growth, user growth, and other key growth indicators."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Target className="h-4 w-4 text-blue-300" />
                    <span>Expansion Strategy</span>
                  </h3>
                  <textarea
                    value={performanceData.expansionStrategy}
                    onChange={(e) => handleInputChange('expansionStrategy', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your expansion strategy. How are you planning to grow? What are your expansion targets?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-green-300" />
                    <span>Scaling Challenges</span>
                  </h3>
                  <textarea
                    value={performanceData.scalingChallenges}
                    onChange={(e) => handleInputChange('scalingChallenges', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Identify scaling challenges. What obstacles are you facing as you scale? How are you addressing them?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-yellow-300" />
                    <span>New Market Entry</span>
                  </h3>
                  <textarea
                    value={performanceData.newMarketEntry}
                    onChange={(e) => handleInputChange('newMarketEntry', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your new market entry efforts. What new markets are you targeting? What is your entry strategy?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-red-300" />
                    <span>Product Expansion</span>
                  </h3>
                  <textarea
                    value={performanceData.productExpansion}
                    onChange={(e) => handleInputChange('productExpansion', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your product expansion efforts. What new products or features are you developing? How are they performing?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-indigo-300" />
                    <span>Growth Experiments</span>
                  </h3>
                  <textarea
                    value={performanceData.growthExperiments}
                    onChange={(e) => handleInputChange('growthExperiments', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your growth experiments. What experiments are you running? What are the results and learnings?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Performance Reporting Section */}
          {activeSection === 'performance-reporting' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Performance Reporting</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Target className="h-4 w-4 text-purple-300" />
                  <span>Key Performance Indicators (KPIs)</span>
                </h3>
                <textarea
                  value={performanceData.keyPerformanceIndicators}
                  onChange={(e) => handleInputChange('keyPerformanceIndicators', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Define your key performance indicators (KPIs). What metrics are most important for measuring your venture's success?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-blue-300" />
                    <span>Reporting Cadence</span>
                  </h3>
                  <textarea
                    value={performanceData.reportingCadence}
                    onChange={(e) => handleInputChange('reportingCadence', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Define your reporting cadence. How often do you review performance metrics? What is your reporting schedule?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-300" />
                    <span>Stakeholder Updates</span>
                  </h3>
                  <textarea
                    value={performanceData.stakeholderUpdates}
                    onChange={(e) => handleInputChange('stakeholderUpdates', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your stakeholder update process. How do you communicate performance to stakeholders? What information do you share?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-yellow-300" />
                    <span>Board Reporting</span>
                  </h3>
                  <textarea
                    value={performanceData.boardReporting}
                    onChange={(e) => handleInputChange('boardReporting', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your board reporting process. What information do you present to your board? How do you structure board meetings?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-red-300" />
                    <span>Performance Dashboards</span>
                  </h3>
                  <textarea
                    value={performanceData.performanceDashboards}
                    onChange={(e) => handleInputChange('performanceDashboards', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your performance dashboards. What dashboards have you created? What metrics do they track?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <PieChart className="h-4 w-4 text-indigo-300" />
                  <span>Data Visualization</span>
                </h3>
                <textarea
                  value={performanceData.dataVisualization}
                  onChange={(e) => handleInputChange('dataVisualization', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your data visualization approach. How do you visualize performance data? What tools do you use?"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mb-8">
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Draft</span>
        </button>
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

export default VenturePerformanceScreen;