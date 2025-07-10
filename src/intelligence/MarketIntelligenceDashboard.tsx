import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Target,
  Calendar,
  Filter,
  Brain,
  ExternalLink,
  PieChart as PieChartIcon,
  AlertTriangle
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';
import {
  sampleMarketStats,
  sampleMarketTrends,
  sampleMarketSegments,
  sampleCompetitiveMetrics,
  sampleAIMarketSummary,
  sampleMarketAlerts
} from '../data/intelligenceData';
import { 
  sampleRecentUpdates,
  sampleTradesPerMarket,
  sampleTradingGrowth,
  sampleTradesPerIndustry
} from '../data/tradingData';

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

interface MarketIntelligenceDashboardProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  preferences: PreferencesData;
}

function MarketIntelligenceDashboard({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  preferences
}: MarketIntelligenceDashboardProps) {
  const [activeTab, setActiveTab] = useState('market-overview');
  const [durationFilter, setDurationFilter] = useState('monthly');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const durationOptions = [
    { id: 'daily', label: 'Daily' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' }
  ];

  const industryOptions = [
    { id: 'all', label: 'All Industries' },
    { id: 'fintech', label: 'Fintech' },
    { id: 'healthtech', label: 'Healthtech' },
    { id: 'ecommerce', label: 'E-commerce' }
  ];

  const regionOptions = [
    { id: 'all', label: 'All Regions' },
    { id: 'mena', label: 'MENA' },
    { id: 'gcc', label: 'GCC' },
    { id: 'levant', label: 'Levant' },
    { id: 'north-africa', label: 'North Africa' }
  ];

  const intelligenceTabs = [
    { id: 'market-overview', label: 'Market Overview' },
    { id: 'macro-intelligence', label: 'Macro Intelligence' },
    { id: 'micro-intelligence', label: 'Micro Intelligence' },
    { id: 'market-alerts', label: 'Market Alerts' }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      DollarSign,
      TrendingUp,
      BarChart3,
      Target
    };
    return icons[iconName] || DollarSign;
  };

  // Filter market trends based on selected industry and region
  const filteredMarketTrends = sampleMarketTrends.filter(trend => {
    const matchesIndustry = industryFilter === 'all' || trend.industry?.toLowerCase() === industryFilter.toLowerCase();
    const matchesRegion = regionFilter === 'all' || trend.region?.toLowerCase() === regionFilter.toLowerCase();
    return matchesIndustry && matchesRegion;
  });

  // Filter market segments based on selected industry
  const filteredMarketSegments = sampleMarketSegments.filter(segment => {
    return industryFilter === 'all' || segment.name.toLowerCase().includes(industryFilter.toLowerCase());
  });

  // Filter competitive metrics based on selected industry
  const filteredCompetitiveMetrics = sampleCompetitiveMetrics.filter(metric => {
    return industryFilter === 'all' || metric.industry.toLowerCase() === industryFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Market Intelligence Dashboard</h1>
          <p className="text-white/80">Real-time market insights and intelligence for informed decision-making</p>
        </div>

        {/* AI Market Summary */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Brain className="h-6 w-6 text-purple-300" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-2">AI Market Summary</h2>
              <p className="text-white/80 mb-4">{sampleAIMarketSummary.executiveOverview}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-white font-semibold mb-2">Key Insights</h3>
                  <ul className="space-y-2">
                    {sampleAIMarketSummary.keyInsights.map((insight, index) => (
                      <li key={index} className="flex items-start space-x-2 text-white/70">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">Market Sentiment</h3>
                    <span className="text-green-400">{sampleAIMarketSummary.marketSentiment}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-semibold">Confidence Score</h3>
                    <span className="text-blue-400">{sampleAIMarketSummary.confidenceScore}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Data Freshness</h3>
                    <span className="text-white/70">{formatTimeAgo(sampleAIMarketSummary.dataFreshness)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-white/60" />
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {durationOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-white/60" />
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {industryOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-white/60" />
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {regionOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Intelligence Tabs */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
          <div className="border-b border-white/20">
            <div className="flex">
              {intelligenceTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white border-b-2 border-purple-300'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Market Overview Tab */}
            {activeTab === 'market-overview' && (
              <div className="space-y-8">
                {/* General Market Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sampleMarketStats.map((stat, index) => {
                    const IconComponent = getIconComponent(stat.icon);
                    return (
                      <div key={index} className="bg-white/5 rounded-lg p-6">
                        <div className={`bg-${stat.color}-500/20 p-3 rounded-lg w-fit mb-4`}>
                          <IconComponent className={`h-6 w-6 text-${stat.color}-300`} />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-white/70 text-sm">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Trades per Market */}
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                      <PieChartIcon className="h-5 w-5 text-green-300" />
                      <span>Trades per Market (Geo)</span>
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sampleTradesPerMarket}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="label"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {sampleTradesPerMarket.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][index % 5]} 
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Percentage']}
                            contentStyle={{ backgroundColor: 'rgba(22, 33, 62, 0.9)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Legend 
                            layout="horizontal" 
                            verticalAlign="bottom" 
                            align="center"
                            formatter={(value) => <span style={{ color: '#fff', opacity: 0.8 }}>{value}</span>}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Trades per Industry */}
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-purple-300" />
                      <span>Trades per Industry</span>
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sampleTradesPerIndustry}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="label"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {sampleTradesPerIndustry.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'][index % 5]} 
                              />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Percentage']}
                            contentStyle={{ backgroundColor: 'rgba(22, 33, 62, 0.9)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Legend 
                            layout="horizontal" 
                            verticalAlign="bottom" 
                            align="center"
                            formatter={(value) => <span style={{ color: '#fff', opacity: 0.8 }}>{value}</span>}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Market Trends Chart */}
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-300" />
                    <span>Market Trends</span>
                  </h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={filteredMarketTrends}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                        <XAxis 
                          dataKey="period" 
                          tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                        />
                        <YAxis 
                          tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => [value, 'Value']}
                          labelFormatter={(label) => `Period: ${label}`}
                          contentStyle={{ backgroundColor: 'rgba(22, 33, 62, 0.9)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem' }}
                          itemStyle={{ color: '#fff' }}
                          labelStyle={{ color: '#fff' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8b5cf6" 
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                          activeDot={{ r: 8 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Market Segments */}
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Market Segments</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left text-white/80 font-medium py-3 px-4">Segment</th>
                          <th className="text-left text-white/80 font-medium py-3 px-4">Market Share</th>
                          <th className="text-left text-white/80 font-medium py-3 px-4">Growth</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMarketSegments.map((segment, index) => (
                          <tr key={index} className="border-b border-white/10">
                            <td className="py-3 px-4 text-white">{segment.name}</td>
                            <td className="py-3 px-4 text-white">{segment.value}%</td>
                            <td className="py-3 px-4">
                              <span className="text-green-400">+{segment.growth}%</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Competitive Metrics */}
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Competitive Metrics</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left text-white/80 font-medium py-3 px-4">Metric</th>
                          <th className="text-left text-white/80 font-medium py-3 px-4">Value</th>
                          <th className="text-left text-white/80 font-medium py-3 px-4">Industry</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCompetitiveMetrics.map((metric, index) => (
                          <tr key={index} className="border-b border-white/10">
                            <td className="py-3 px-4 text-white">{metric.name}</td>
                            <td className="py-3 px-4 text-white">{metric.value}%</td>
                            <td className="py-3 px-4 text-white/70">{metric.industry}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Macro Intelligence Tab */}
            {activeTab === 'macro-intelligence' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6">Macro Intelligence</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Economic Stability</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/80">Index</span>
                        <span className="text-green-400">Stable</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">GDP Growth</span>
                        <span className="text-white">3.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Inflation</span>
                        <span className="text-white">2.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Currency Stability</span>
                        <span className="text-green-400">High</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Political Risk</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/80">Risk Barometer</span>
                        <span className="text-yellow-400">Low-Moderate</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Government Stability</span>
                        <span className="text-green-400">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Policy Continuity</span>
                        <span className="text-green-400">Good</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Regulatory Landscape</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/80">Regulatory Tracker</span>
                        <span className="text-blue-400">Evolving</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Recent Changes</span>
                        <span className="text-white">New fintech licenses, relaxed foreign ownership laws</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Upcoming Shifts</span>
                        <span className="text-white">Data privacy regulations, AI governance frameworks</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Market Accessibility</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/80">Accessibility Score</span>
                        <span className="text-green-400">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Ease of Entry</span>
                        <span className="text-blue-400">Improving</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Operational Complexity</span>
                        <span className="text-yellow-400">Moderate</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Infrastructure Readiness</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/80">Readiness Gauge</span>
                        <span className="text-green-400">Advanced</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Digital Infrastructure</span>
                        <span className="text-green-400">Excellent</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Financial Infrastructure</span>
                        <span className="text-green-400">Strong</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/80">Physical Infrastructure</span>
                        <span className="text-blue-400">Good</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Macro Trend Indicators</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-white/80">Demographic Shifts</span>
                        <p className="text-white mt-1">Youth bulge, growing middle class</p>
                      </div>
                      <div>
                        <span className="text-white/80">Technological Adoption</span>
                        <p className="text-white mt-1">Rapid digital adoption, AI integration</p>
                      </div>
                      <div>
                        <span className="text-white/80">Social Changes</span>
                        <p className="text-white mt-1">Increasing female workforce participation, urbanization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Micro Intelligence Tab */}
            {activeTab === 'micro-intelligence' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6">Micro Intelligence</h2>
                
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Market Fundamentals</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-3">Market Size</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/80">Fintech</span>
                          <span className="text-white">TAM: $31B</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/80">E-commerce</span>
                          <span className="text-white">TAM: $28B</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/80">Healthtech</span>
                          <span className="text-white">TAM: $2.8B</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Market Behavior</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-white/80">Fintech</span>
                          <p className="text-white text-sm mt-1">High mobile adoption, increasing digital payments</p>
                        </div>
                        <div>
                          <span className="text-white/80">E-commerce</span>
                          <p className="text-white text-sm mt-1">Strong mobile commerce, social commerce growth</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-3">Competitive Intensity</h4>
                      <div className="space-y-2">
                        <div>
                          <span className="text-white/80">Fintech</span>
                          <p className="text-white text-sm mt-1">Moderate, increasing competition from local and international players</p>
                        </div>
                        <div>
                          <span className="text-white/80">E-commerce</span>
                          <p className="text-white text-sm mt-1">High, dominated by regional and global giants</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Growth Forecast</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { year: 2022, value: 100 },
                            { year: 2023, value: 120 },
                            { year: 2024, value: 150 },
                            { year: 2025, value: 180 },
                            { year: 2026, value: 220 }
                          ]}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                          <XAxis 
                            dataKey="year" 
                            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                          />
                          <YAxis 
                            tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                          />
                          <Tooltip 
                            formatter={(value) => [value, 'Value']}
                            contentStyle={{ backgroundColor: 'rgba(22, 33, 62, 0.9)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem' }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#fff' }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#8b5cf6" 
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-white/80">Market Lifecycle</span>
                        <p className="text-white mt-1">Fintech: Growth</p>
                        <p className="text-white mt-1">E-commerce: Mature-Growth</p>
                        <p className="text-white mt-1">Healthtech: Emerging</p>
                      </div>
                      <div>
                        <span className="text-white/80">Forecast Confidence</span>
                        <p className="text-green-400 mt-1">High</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-4">Strategic Intelligence</h3>
                    <div>
                      <h4 className="text-white font-medium mb-2">Opportunity Matrix</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2 text-white/80">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <span>B2B SaaS in underserved sectors (High Impact, Low Competition)</span>
                        </li>
                        <li className="flex items-start space-x-2 text-white/80">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <span>Climate Tech solutions (High Impact, Moderate Competition)</span>
                        </li>
                        <li className="flex items-start space-x-2 text-white/80">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <span>EdTech for vocational training (Moderate Impact, Low Competition)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-white font-medium mb-2">Challenge Assessment</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2 text-white/80">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                          <span>Regulatory hurdles in new markets (High Severity, Moderate Probability)</span>
                        </li>
                        <li className="flex items-start space-x-2 text-white/80">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                          <span>Talent acquisition and retention (Moderate Severity, High Probability)</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="text-white font-medium mb-2">Market Timing</h4>
                      <p className="text-white/80">Optimal entry window for Healthtech and Climate Tech</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Market Alerts Tab */}
            {activeTab === 'market-alerts' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-white mb-6">Market Alerts</h2>
                
                <div className="space-y-4">
                  {sampleMarketAlerts.map((alert) => (
                    <div 
                      key={alert.id} 
                      className={`p-4 rounded-lg ${
                        alert.type === 'critical' ? 'bg-red-500/20 border border-red-500/30' :
                        alert.type === 'warning' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                        'bg-blue-500/20 border border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          alert.type === 'critical' ? 'bg-red-500/20' :
                          alert.type === 'warning' ? 'bg-yellow-500/20' :
                          'bg-blue-500/20'
                        }`}>
                          <AlertTriangle className={`h-5 w-5 ${
                            alert.type === 'critical' ? 'text-red-300' :
                            alert.type === 'warning' ? 'text-yellow-300' :
                            'text-blue-300'
                          }`} />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${
                            alert.type === 'critical' ? 'text-red-300' :
                            alert.type === 'warning' ? 'text-yellow-300' :
                            'text-blue-300'
                          }`}>
                            {alert.title}
                          </h3>
                          <p className="text-white/80 mt-1">{alert.description}</p>
                          <p className="text-white/60 text-sm mt-2">{formatTimeAgo(alert.date)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Recent Market News</h3>
                  <div className="space-y-4">
                    {sampleRecentUpdates.map((update) => (
                      <a 
                        key={update.id} 
                        href={update.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
                      >
                        <h4 className="text-white font-medium text-sm mb-1">{update.title}</h4>
                        <p className="text-white/70 text-xs mb-2 line-clamp-2">{update.intro}</p>
                        <div className="flex items-center justify-between text-white/60 text-xs">
                          <span>{update.source}</span>
                          <div className="flex items-center space-x-1">
                            <span>{formatTimeAgo(update.date)}</span>
                            <ExternalLink className="h-3 w-3" />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketIntelligenceDashboard;