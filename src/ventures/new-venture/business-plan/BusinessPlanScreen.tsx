import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  Building2,
  Target,
  Briefcase,
  Users,
  DollarSign,
  BarChart3,
  Globe,
  TrendingUp,
  ShoppingCart,
  Award,
  Zap,
  CheckCircle,
  Shield,
  FileText,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';

interface BusinessPlanScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function BusinessPlanScreen({ onNext, onBack, toggleAICompanion }: BusinessPlanScreenProps) {
  const [activeSection, setActiveSection] = useState('company-overview');
  const [businessPlanData, setBusinessPlanData] = useState({
    // Company Overview
    mission: '',
    vision: '',
    companyDescription: '',
    problemStatement: '',
    solutionDescription: '',
    valueProposition: '',
    
    // Market & Competition
    targetMarket: '',
    marketSize: '',
    marketTrends: '',
    competitiveLandscape: '',
    competitiveAdvantage: '',
    
    // Products & Services
    productDescription: '',
    productFeatures: '',
    intellectualProperty: '',
    developmentStage: '',
    futurePlans: '',
    
    // Marketing & Sales
    marketingStrategy: '',
    salesChannels: '',
    customerAcquisition: '',
    pricingStrategy: '',
    growthStrategy: '',
    
    // Operations & Management
    keyActivities: '',
    keyResources: '',
    keyPartners: '',
    teamStructure: '',
    hiringPlan: '',
    
    // Financial Projections
    revenueModel: '',
    costStructure: '',
    fundingRequirements: '',
    useOfFunds: '',
    financialProjections: '',
    breakEvenAnalysis: ''
  });

  const handleInputChange = (field: keyof typeof businessPlanData, value: string) => {
    setBusinessPlanData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sections = [
    { id: 'company-overview', label: 'Company Overview', icon: Building2 },
    { id: 'market-competition', label: 'Market & Competition', icon: Globe },
    { id: 'products-services', label: 'Products & Services', icon: Briefcase },
    { id: 'marketing-sales', label: 'Marketing & Sales', icon: ShoppingCart },
    { id: 'operations-management', label: 'Operations & Management', icon: Users },
    { id: 'financial-projections', label: 'Financial Projections', icon: DollarSign }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Business Plan Development
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Create a comprehensive business plan to guide your venture's strategy, operations, and growth.
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

      {/* Business Plan Sections */}
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
          {/* Company Overview Section */}
          {activeSection === 'company-overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Company Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Target className="h-4 w-4 text-purple-300" />
                    <span>Mission Statement</span>
                  </h3>
                  <textarea
                    value={businessPlanData.mission}
                    onChange={(e) => handleInputChange('mission', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What is your company's mission? What do you aim to achieve?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-300" />
                    <span>Vision Statement</span>
                  </h3>
                  <textarea
                    value={businessPlanData.vision}
                    onChange={(e) => handleInputChange('vision', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What is your long-term vision for the company? Where do you see it in 5-10 years?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-green-300" />
                  <span>Company Description</span>
                </h3>
                <textarea
                  value={businessPlanData.companyDescription}
                  onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your company, its history, legal structure, and overall business concept."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-300" />
                    <span>Problem Statement</span>
                  </h3>
                  <textarea
                    value={businessPlanData.problemStatement}
                    onChange={(e) => handleInputChange('problemStatement', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What problem does your company solve? Why is this problem significant?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Lightbulb className="h-4 w-4 text-yellow-300" />
                    <span>Solution Description</span>
                  </h3>
                  <textarea
                    value={businessPlanData.solutionDescription}
                    onChange={(e) => handleInputChange('solutionDescription', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How does your company solve this problem? What is your approach?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Award className="h-4 w-4 text-indigo-300" />
                  <span>Value Proposition</span>
                </h3>
                <textarea
                  value={businessPlanData.valueProposition}
                  onChange={(e) => handleInputChange('valueProposition', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What unique value do you provide to customers? Why should they choose your solution over alternatives?"
                />
              </div>
            </div>
          )}

          {/* Market & Competition Section */}
          {activeSection === 'market-competition' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Market & Competition</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-300" />
                  <span>Target Market</span>
                </h3>
                <textarea
                  value={businessPlanData.targetMarket}
                  onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your target customers in detail. Include demographics, psychographics, and buyer personas."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-blue-300" />
                    <span>Market Size</span>
                  </h3>
                  <textarea
                    value={businessPlanData.marketSize}
                    onChange={(e) => handleInputChange('marketSize', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What is the Total Addressable Market (TAM), Serviceable Available Market (SAM), and Serviceable Obtainable Market (SOM)?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-300" />
                    <span>Market Trends</span>
                  </h3>
                  <textarea
                    value={businessPlanData.marketTrends}
                    onChange={(e) => handleInputChange('marketTrends', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What trends are shaping your market? How is the market evolving?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-red-300" />
                    <span>Competitive Landscape</span>
                  </h3>
                  <textarea
                    value={businessPlanData.competitiveLandscape}
                    onChange={(e) => handleInputChange('competitiveLandscape', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Who are your direct and indirect competitors? What are their strengths and weaknesses?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-yellow-300" />
                    <span>Competitive Advantage</span>
                  </h3>
                  <textarea
                    value={businessPlanData.competitiveAdvantage}
                    onChange={(e) => handleInputChange('competitiveAdvantage', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What is your competitive advantage? How will you maintain it over time?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Products & Services Section */}
          {activeSection === 'products-services' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Products & Services</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-purple-300" />
                  <span>Product/Service Description</span>
                </h3>
                <textarea
                  value={businessPlanData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your products or services in detail. What do you offer and how does it work?"
                />
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-300" />
                  <span>Key Features & Benefits</span>
                </h3>
                <textarea
                  value={businessPlanData.productFeatures}
                  onChange={(e) => handleInputChange('productFeatures', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What are the key features and benefits of your product/service? How do they address customer needs?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-300" />
                    <span>Intellectual Property</span>
                  </h3>
                  <textarea
                    value={businessPlanData.intellectualProperty}
                    onChange={(e) => handleInputChange('intellectualProperty', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What IP do you have or plan to develop? (patents, trademarks, copyrights, etc.)"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-yellow-300" />
                    <span>Development Stage</span>
                  </h3>
                  <textarea
                    value={businessPlanData.developmentStage}
                    onChange={(e) => handleInputChange('developmentStage', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What stage of development is your product/service in? What milestones have you achieved?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-red-300" />
                    <span>Future Plans</span>
                  </h3>
                  <textarea
                    value={businessPlanData.futurePlans}
                    onChange={(e) => handleInputChange('futurePlans', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What are your future product/service development plans? What's on your roadmap?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Marketing & Sales Section */}
          {activeSection === 'marketing-sales' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Marketing & Sales</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Target className="h-4 w-4 text-purple-300" />
                  <span>Marketing Strategy</span>
                </h3>
                <textarea
                  value={businessPlanData.marketingStrategy}
                  onChange={(e) => handleInputChange('marketingStrategy', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What is your overall marketing strategy? How will you position and promote your product/service?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <ShoppingCart className="h-4 w-4 text-blue-300" />
                    <span>Sales Channels</span>
                  </h3>
                  <textarea
                    value={businessPlanData.salesChannels}
                    onChange={(e) => handleInputChange('salesChannels', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What channels will you use to sell your product/service? (direct, online, partners, etc.)"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-300" />
                    <span>Customer Acquisition</span>
                  </h3>
                  <textarea
                    value={businessPlanData.customerAcquisition}
                    onChange={(e) => handleInputChange('customerAcquisition', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you acquire customers? What is your customer acquisition strategy and cost?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-yellow-300" />
                    <span>Pricing Strategy</span>
                  </h3>
                  <textarea
                    value={businessPlanData.pricingStrategy}
                    onChange={(e) => handleInputChange('pricingStrategy', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What is your pricing strategy? How did you determine your pricing?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-red-300" />
                    <span>Growth Strategy</span>
                  </h3>
                  <textarea
                    value={businessPlanData.growthStrategy}
                    onChange={(e) => handleInputChange('growthStrategy', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How do you plan to grow your business over time? What are your growth targets?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Operations & Management Section */}
          {activeSection === 'operations-management' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Operations & Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-purple-300" />
                    <span>Key Activities</span>
                  </h3>
                  <textarea
                    value={businessPlanData.keyActivities}
                    onChange={(e) => handleInputChange('keyActivities', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What are the key activities required to deliver your value proposition? What operations are critical?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-blue-300" />
                    <span>Key Resources</span>
                  </h3>
                  <textarea
                    value={businessPlanData.keyResources}
                    onChange={(e) => handleInputChange('keyResources', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What key resources do you need to operate your business? (physical, intellectual, human, financial)"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-green-300" />
                  <span>Key Partners</span>
                </h3>
                <textarea
                  value={businessPlanData.keyPartners}
                  onChange={(e) => handleInputChange('keyPartners', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Who are your key partners and suppliers? What strategic alliances will you form?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-yellow-300" />
                    <span>Team Structure</span>
                  </h3>
                  <textarea
                    value={businessPlanData.teamStructure}
                    onChange={(e) => handleInputChange('teamStructure', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your team structure, key roles, and responsibilities. Include current team members and their qualifications."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-red-300" />
                    <span>Hiring Plan</span>
                  </h3>
                  <textarea
                    value={businessPlanData.hiringPlan}
                    onChange={(e) => handleInputChange('hiringPlan', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What are your hiring plans? What key positions will you need to fill and when?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Financial Projections Section */}
          {activeSection === 'financial-projections' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Financial Projections</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-purple-300" />
                    <span>Revenue Model</span>
                  </h3>
                  <textarea
                    value={businessPlanData.revenueModel}
                    onChange={(e) => handleInputChange('revenueModel', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will your business generate revenue? Describe your revenue streams and business model."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-blue-300" />
                    <span>Cost Structure</span>
                  </h3>
                  <textarea
                    value={businessPlanData.costStructure}
                    onChange={(e) => handleInputChange('costStructure', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What are your major cost categories? Include fixed and variable costs, COGS, operating expenses, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-300" />
                    <span>Funding Requirements</span>
                  </h3>
                  <textarea
                    value={businessPlanData.fundingRequirements}
                    onChange={(e) => handleInputChange('fundingRequirements', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How much funding do you need? What type of funding are you seeking? (equity, debt, grants, etc.)"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-yellow-300" />
                    <span>Use of Funds</span>
                  </h3>
                  <textarea
                    value={businessPlanData.useOfFunds}
                    onChange={(e) => handleInputChange('useOfFunds', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you use the funds? Provide a breakdown of fund allocation."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-red-300" />
                    <span>Financial Projections</span>
                  </h3>
                  <textarea
                    value={businessPlanData.financialProjections}
                    onChange={(e) => handleInputChange('financialProjections', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Summarize your financial projections for the next 3-5 years. Include revenue, expenses, profit, and cash flow."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-indigo-300" />
                    <span>Break-even Analysis</span>
                  </h3>
                  <textarea
                    value={businessPlanData.breakEvenAnalysis}
                    onChange={(e) => handleInputChange('breakEvenAnalysis', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="When do you expect to break even? What assumptions are you making for this analysis?"
                  />
                </div>
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

export default BusinessPlanScreen;