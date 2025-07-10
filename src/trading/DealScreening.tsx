import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  MapPin, 
  DollarSign,
  Users,
  TrendingUp,
  BarChart3,
  MessageCircle,
  Calendar,
  FileText,
  Target,
  Brain,
  X,
  CheckCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import GlobalNavigation from '../components/GlobalNavigation';
import { sampleDealScreeningData } from '../data/tradingData';

interface DealScreeningProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: any;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging') => void;
  activeTradingTab: string;
  setActiveTradingTab: (tab: string) => void;
}

function DealScreening({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  activeTradingTab,
  setActiveTradingTab
}: DealScreeningProps) {
  const [activeScreeningTab, setActiveScreeningTab] = useState('pitch-deck');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [messageContent, setMessageContent] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const screeningTabs = [
    { id: 'pitch-deck', label: 'Pitch deck', icon: FileText },
    { id: 'business-model', label: 'Business model', icon: Building2 },
    { id: 'market-analysis', label: 'Market analysis', icon: BarChart3 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'traction', label: 'Traction', icon: TrendingUp },
    { id: 'projections', label: 'Projections', icon: Target },
    { id: 'round-dynamics', label: 'Round dynamics', icon: DollarSign },
    { id: 'scoring', label: 'Scoring & risk assessment', icon: Brain },
    { id: 'communication', label: 'Founder communication', icon: MessageCircle }
  ];

  const investmentTabs = [
    { id: 'pipeline', label: 'Investment pipeline' },
    { id: 'portfolio', label: 'Portfolio summary dashboard' },
    { id: 'explore', label: 'Explore portfolio' },
    { id: 'saved', label: 'Saved opportunities' }
  ];

  const deal = sampleDealScreeningData;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % deal.pitchDeck.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + deal.pitchDeck.length) % deal.pitchDeck.length);
  };

  const renderScreeningContent = () => {
    switch (activeScreeningTab) {
      case 'pitch-deck':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-4">Pitch Deck</h3>
            <div className="relative">
              <img
                src={deal.pitchDeck[currentSlide]}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-96 object-cover rounded-lg"
              />
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentSlide + 1} / {deal.pitchDeck.length}
              </div>
            </div>
          </div>
        );

      case 'business-model':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-6">Business Model</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-purple-300 font-semibold mb-3">WHO</h4>
                <p className="text-white/80">{deal.businessModel.who}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-3">WHAT</h4>
                <p className="text-white/80">{deal.businessModel.what}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-green-300 font-semibold mb-3">HOW</h4>
                <p className="text-white/80">{deal.businessModel.how}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-yellow-300 font-semibold mb-3">WHY</h4>
                <p className="text-white/80">{deal.businessModel.why}</p>
              </div>
            </div>
          </div>
        );

      case 'market-analysis':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-6">Market Analysis</h3>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Market Overview</h4>
                <p className="text-white/80">{deal.marketAnalysis.overview}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Market Problems</h4>
                <p className="text-white/80">{deal.marketAnalysis.problems}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Market Trends</h4>
                <p className="text-white/80">{deal.marketAnalysis.trends}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-3">Competitive Landscape</h4>
                <p className="text-white/80">{deal.marketAnalysis.competitiveLandscape}</p>
              </div>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-6">Team</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-4">Founders</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {deal.team.map((member, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={member.profilePicture}
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h5 className="text-white font-semibold">{member.name}</h5>
                          <p className="text-white/80 text-sm">{member.position}</p>
                          <p className="text-white/70 text-sm">{member.experienceYears} years experience</p>
                          <p className="text-white/60 text-xs mt-2">{member.background}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {member.keySkills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'traction':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-6">Traction (Totals)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{formatCurrency(deal.tractionMetrics.revenue)}</div>
                <div className="text-white/70 text-sm">Revenue (ARR)</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{formatNumber(deal.tractionMetrics.users)}</div>
                <div className="text-white/70 text-sm">Users</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">${deal.tractionMetrics.cac}</div>
                <div className="text-white/70 text-sm">CAC</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">${deal.tractionMetrics.cltv}</div>
                <div className="text-white/70 text-sm">CLTV</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{deal.tractionMetrics.churnRate}%</div>
                <div className="text-white/70 text-sm">Churn Rate</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{deal.tractionMetrics.grossMargin}%</div>
                <div className="text-white/70 text-sm">Gross Margin</div>
              </div>
            </div>
          </div>
        );

      case 'projections':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-6">Projections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Revenue Growth</h4>
                <p className="text-white/80">{deal.projections.revenueGrowth}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Users Growth</h4>
                <p className="text-white/80">{deal.projections.usersGrowth}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Avg CAC</h4>
                <p className="text-white/80">{deal.projections.avgCAC}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Avg CLTV</h4>
                <p className="text-white/80">{deal.projections.avgCLTV}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Avg Churn Rate</h4>
                <p className="text-white/80">{deal.projections.avgChurnRate}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Gross Margin Growth</h4>
                <p className="text-white/80">{deal.projections.grossMarginGrowth}</p>
              </div>
            </div>
          </div>
        );

      case 'round-dynamics':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-6">Round Dynamics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Round</h4>
                <p className="text-white/80">{deal.roundDynamics.round}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Round Size</h4>
                <p className="text-white/80">{formatCurrency(deal.roundDynamics.roundSize)}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Min. Ticket Size</h4>
                <p className="text-white/80">{formatCurrency(deal.roundDynamics.minTicketSize)}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Round Instrument</h4>
                <p className="text-white/80">{deal.roundDynamics.roundInstrument}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Valuation</h4>
                <p className="text-white/80">{formatCurrency(deal.roundDynamics.valuation)}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Runway</h4>
                <p className="text-white/80">{deal.roundDynamics.runway}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 md:col-span-2">
                <h4 className="text-white font-semibold mb-2">Valuation Methodology</h4>
                <p className="text-white/80">{deal.roundDynamics.valuationMethodology}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 md:col-span-2">
                <h4 className="text-white font-semibold mb-2">Use of Funds</h4>
                <p className="text-white/80">{deal.roundDynamics.useOfFunds}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-4 md:col-span-2">
                <h4 className="text-white font-semibold mb-2">Key Deal Terms</h4>
                <p className="text-white/80">{deal.roundDynamics.keyDealTerms}</p>
              </div>
            </div>
          </div>
        );

      case 'scoring':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-6">Scoring & Risk Assessment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-300 mb-2">{deal.scoringRiskAssessment.desirabilityScore}</div>
                <div className="text-white/70">Desirability Score</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                  <div 
                    className="bg-purple-500 h-2 rounded-full" 
                    style={{ width: `${deal.scoringRiskAssessment.desirabilityScore}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-300 mb-2">{deal.scoringRiskAssessment.viabilityScore}</div>
                <div className="text-white/70">Viability Score</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${deal.scoringRiskAssessment.viabilityScore}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-300 mb-2">{deal.scoringRiskAssessment.feasibilityScore}</div>
                <div className="text-white/70">Feasibility Score</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${deal.scoringRiskAssessment.feasibilityScore}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-2">{deal.scoringRiskAssessment.impactScore}</div>
                <div className="text-white/70">Impact Score</div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${deal.scoringRiskAssessment.impactScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'communication':
        return (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-6">Founder Communication</h3>
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-4">Send Message</h4>
                <textarea
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Write your message to the founder..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  rows={4}
                />
                <button className="mt-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                  Send Message
                </button>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-4">Request a Meeting</h4>
                <p className="text-white/70 mb-4">Schedule a call with the founder to discuss the opportunity in detail.</p>
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Request Meeting</span>
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Navigation */}
      <GlobalNavigation 
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
        profileData={profileData}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Left Sidebar */}
        <div 
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/10 backdrop-blur-md border-r border-white/20 transition-all duration-300 z-30 ${
            isAICompanionOpen ? 'w-16' : 'w-64'
          }`}
        >
          {/* Profile Section */}
          <div className="p-4 border-b border-white/20">
            {!isAICompanionOpen ? (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {profileData.fullName ? profileData.fullName.charAt(0) : 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">
                    {profileData.fullName || 'User Name'}
                  </h3>
                  <p className="text-white/70 text-xs">
                    {profileData.currentOccupation || 'Professional'}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      selectedRole === 'founder' ? 'bg-purple-500/20 text-purple-300' :
                      selectedRole === 'investor' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {selectedRole}
                    </span>
                    <span className="text-white/60 text-xs">
                      {profileData.country || 'Global'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {profileData.fullName ? profileData.fullName.charAt(0) : 'U'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Investment Profile Stats */}
          {!isAICompanionOpen && (
            <div className="p-4 border-b border-white/20">
              <div className="space-y-3">
                <div className="text-center">
                  <div className="text-white font-semibold">12</div>
                  <div className="text-white/70 text-xs"># of deals</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">$2.5M</div>
                  <div className="text-white/70 text-xs">Total deal volume</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-semibold">5</div>
                  <div className="text-white/70 text-xs"># active deals in pipeline</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="p-2">
            {investmentTabs.map((tab) => (
              <button
                key={tab.id}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors mb-1 ${
                  tab.id === 'pipeline'
                    ? 'bg-white/10 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {!isAICompanionOpen && <span className="text-sm">{tab.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div 
          className="flex-1 transition-all duration-300 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
          style={{ 
            marginLeft: isAICompanionOpen ? '64px' : '256px',
            marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Deal Info Header */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
              <div className="flex items-start space-x-4">
                <img
                  src={deal.logo}
                  alt={deal.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-white mb-2">{deal.name}</h1>
                  <p className="text-white/80 mb-3">{deal.shortDescription}</p>
                  <div className="flex items-center space-x-6 text-sm text-white/70">
                    <span className="flex items-center space-x-1">
                      <Building2 className="h-4 w-4" />
                      <span>{deal.industry}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{deal.hq}</span>
                    </span>
                    <span>{deal.stage}</span>
                  </div>
                  <div className="flex items-center space-x-6 mt-3">
                    <div>
                      <span className="text-white/60 text-sm">Deal Size: </span>
                      <span className="text-white font-semibold">{formatCurrency(deal.dealSizeAsk)}</span>
                    </div>
                    <div>
                      <span className="text-white/60 text-sm">Valuation: </span>
                      <span className="text-white font-semibold">{formatCurrency(deal.valuation)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screening Tabs */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
              <div className="border-b border-white/20">
                <div className="flex overflow-x-auto">
                  {screeningTabs.map((tab) => {
                    const IconComponent = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveScreeningTab(tab.id)}
                        className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                          activeScreeningTab === tab.id
                            ? 'bg-white/10 text-white border-b-2 border-purple-300'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                        <span className="text-sm">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Screening Content */}
            {renderScreeningContent()}

            {/* Proceeding Buttons */}
            <div className="flex items-center justify-between mt-8">
              <button 
                onClick={() => setActiveTradingTab('opportunities')}
                className="text-white/60 hover:text-white transition-colors"
              >
                ← Back to Opportunities
              </button>
              <div className="flex items-center space-x-4">
                <button className="bg-red-500/20 text-red-300 border border-red-500/30 px-6 py-3 rounded-lg font-medium hover:bg-red-500/30 transition-all duration-300 flex items-center space-x-2">
                  <X className="h-4 w-4" />
                  <span>Pass</span>
                </button>
                <button className="bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-6 py-3 rounded-lg font-medium hover:bg-yellow-500/30 transition-all duration-300 flex items-center space-x-2">
                  <Bookmark className="h-4 w-4" />
                  <span>Save to watchlist</span>
                </button>
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Request Due Diligence</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Companion Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleAICompanion}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <Brain className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default DealScreening;