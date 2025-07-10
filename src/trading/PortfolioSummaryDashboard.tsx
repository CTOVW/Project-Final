import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  Target as TargetIcon,
  Calendar,
  Filter,
  Brain,
  ExternalLink,
  PieChart as PieChartIcon,
  Search
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
import GlobalNavigation from '../components/GlobalNavigation';
import {
  sampleInvestmentStats,
  sampleMarketStats,
  sampleTradesPerMarket,
  sampleTradesPerIndustry,
  sampleTradingGrowth,
  sampleRecentUpdates,
  sampleRecentTrades
} from '../data/tradingData';

// Custom color palette for charts
const CHART_COLORS = {
  primary: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  secondary: ['#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#f87171'],
  background: 'rgba(22, 33, 62, 0.9)',
  border: 'rgba(255, 255, 255, 0.2)',
  text: '#fff',
  grid: 'rgba(255, 255, 255, 0.1)'
};

interface MarketTradingDashboardProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: any;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace' | 'intelligence') => void;
  activeTradingTab: string;
  setActiveTradingTab: (tab: string) => void;
}

function MarketTradingDashboard({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  activeTradingTab,
  setActiveTradingTab
}: MarketTradingDashboardProps) {
  const [durationFilter, setDurationFilter] = useState('monthly');
  const [marketFilter, setMarketFilter] = useState('all-deals');
  const [activeTab, setActiveTab] = useState('overview');
  const [mounted, setMounted] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    setMounted(true);
  }, []);

  const durationOptions = [
    { id: 'daily', label: 'Daily insights' },
    { id: 'weekly', label: 'Weekly insights' },
    { id: 'monthly', label: 'Monthly insights' },
    { id: 'quarterly', label: 'Quarterly insights' }
  ];

  const filterOptions = [
    { id: 'all-deals', label: 'All deals' },
    { id: 'industry', label: 'Industry focus' },
    { id: 'geo', label: 'Geo focus' },
    { id: 'primary-secondary', label: 'Primary/Secondary market' }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
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
      Target: TargetIcon
    };
    return icons[iconName] || DollarSign;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Trading Dashboard</h1>
          <p className="text-white/80">Real-time market activity and trading performance analytics</p>
          
          {/* Dashboard Tabs */}
          <div className="flex mt-6 space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              Market Overview
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'trends'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              Trading Trends
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'activity'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              Recent Activity
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                activeTab === 'insights'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
              }`}
            >
              Market Insights
            </button>
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
                value={marketFilter}
                onChange={(e) => setMarketFilter(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {filterOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* General Market Trading Stats - with hover effects and improved visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {sampleMarketStats.map((stat, index) => {
                const IconComponent = getIconComponent(stat.icon);
                return (
                  <div 
                    key={index} 
                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className={`bg-${stat.color}-500/20 p-3 rounded-lg w-fit mx-auto mb-4`}>
                      <IconComponent className={`h-6 w-6 text-${stat.color}-300`} strokeWidth={2} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 text-center">{stat.value}</div>
                    <div className="text-white/70 text-sm text-center">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Trades per Market */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-6 flex items-center space-x-2">
                  <PieChartIcon className="h-5 w-5 text-green-300" strokeWidth={2} />
                  <span>Trades per Market (Geo)</span>
                </h3>
                <div className="h-64">
                  {mounted && (
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
                          animationDuration={1000}
                        >
                          {sampleTradesPerMarket.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={CHART_COLORS.primary[index % CHART_COLORS.primary.length]} 
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
                  )}
                </div>
              </div>

              {/* Trades per Industry */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-6 flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-purple-300" strokeWidth={2} />
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
                        animationDuration={1000}
                      >
                        {sampleTradesPerIndustry.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={CHART_COLORS.primary[index % CHART_COLORS.primary.length]} 
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

            {/* Trading Growth Chart */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-300" strokeWidth={2} />
                <span>Trading Growth</span>
              </h3>
              <div className="h-80">
                {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={sampleTradingGrowth}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.4} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
                      <XAxis 
                        dataKey="period" 
                        tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                      />
                      <YAxis 
                        tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 12 }}
                        tickFormatter={(value) => formatCurrency(value * 1000)}
                      />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value * 1000), 'Trading Volume']}
                        labelFormatter={(label) => `Period: ${label}`}
                        contentStyle={{ backgroundColor: 'rgba(22, 33, 62, 0.9)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '0.5rem' }}
                        itemStyle={{ color: '#fff' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="volume" 
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorVolume)" 
                        activeDot={{ r: 8 }}
                        animationDuration={1000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-green-300" />
                  <span>Recent Trades</span>
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search trades..."
                      className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-white text-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-white/20 bg-white/5">
                      <th className="text-left text-white/80 font-medium py-3 px-4 rounded-tl-lg">Trade Date/Time</th>
                      <th className="text-left text-white/80 font-medium py-3 px-4">Trade Type</th>
                      <th className="text-left text-white/80 font-medium py-3 px-4">Venture Name</th>
                      <th className="text-left text-white/80 font-medium py-3 px-4">Investor (Buyer)</th>
                      <th className="text-left text-white/80 font-medium py-3 px-4">Investor (Seller)</th>
                      <th className="text-left text-white/80 font-medium py-3 px-4 rounded-tr-lg">Trade Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleRecentTrades.map((trade, index) => (
                      <tr 
                        key={trade.id} 
                        className={`border-b border-white/10 hover:bg-white/5 transition-colors ${
                          index === sampleRecentTrades.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <td className="py-3 px-4 text-white/70 text-sm">
                          {trade.tradeDateTime.toLocaleDateString()} {trade.tradeDateTime.toLocaleTimeString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            trade.tradeType === 'Primary' 
                              ? 'bg-green-500/20 text-green-300' 
                              : 'bg-blue-500/20 text-blue-300'
                          }`}>
                            {trade.tradeType}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-white font-medium">{trade.ventureName}</td>
                        <td className="py-3 px-4 text-white/70">{trade.investorBuyerName}</td>
                        <td className="py-3 px-4 text-white/70">{trade.investorSellerName || '-'}</td>
                        <td className="py-3 px-4 text-white font-semibold">{formatCurrency(trade.tradeValue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Investment Profile Stats */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <PieChartIcon className="h-5 w-5 text-purple-300" strokeWidth={2} />
                <span>Investment Profile</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-white/70 text-sm"># of deals</div>
                  <div className="text-white font-semibold">{sampleInvestmentStats.dealsCount}</div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div className="bg-purple-500 h-1 rounded-full" style={{ width: `${(sampleInvestmentStats.dealsCount / 20) * 100}%` }}></div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-white/70 text-sm">Total deal volume</div>
                  <div className="text-white font-semibold">{formatCurrency(sampleInvestmentStats.totalDealVolume)}</div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: `${(sampleInvestmentStats.totalDealVolume / 5000000) * 100}%` }}></div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="text-white/70 text-sm"># active deals in pipeline</div>
                  <div className="text-white font-semibold">{sampleInvestmentStats.activeDealsInPipeline}</div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: `${(sampleInvestmentStats.activeDealsInPipeline / 10) * 100}%` }}></div>
                </div>
                <button 
                  onClick={() => setActiveTradingTab('portfolio-summary')}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 mt-6 flex items-center justify-center space-x-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>View Investment Dashboard</span>
                </button>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-300" strokeWidth={2} />
                <span>Recent Updates</span>
              </h3>
              <div className="space-y-4">
                {sampleRecentUpdates.map((update) => (
                  <div key={update.id} className="border-b border-white/10 pb-4 last:border-b-0 hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <h4 className="text-white font-medium text-sm mb-2 leading-tight">{update.title}</h4>
                    <p className="text-white/70 text-xs mb-2 line-clamp-2">{update.intro}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-xs">{formatTimeAgo(update.date)}</span>
                      <button className="text-purple-300 hover:text-purple-200 transition-colors">
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarketTradingDashboard;