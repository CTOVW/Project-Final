import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Bookmark, 
  Share, 
  Eye,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Building2,
  Target,
  PieChart
} from 'lucide-react';
import GlobalNavigation from '../components/GlobalNavigation';
import {
  sampleOpportunities,
  sampleActiveDealsStats,
  sampleActiveDealsPerIndustry,
  sampleActiveDealsPerMarket
} from '../data/tradingData';

interface MarketOpportunityMarketplaceProps {
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

function MarketOpportunityMarketplace({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  activeTradingTab,
  setActiveTradingTab
}: MarketOpportunityMarketplaceProps) {
  const [activeFilter, setActiveFilter] = useState('recommended');
  const [sortBy, setSortBy] = useState('relevance');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filterTabs = [
    { id: 'recommended', label: 'Recommended Deals' },
    { id: 'trending', label: 'Trending Deals' },
    { id: 'new', label: 'New Deals' },
    { id: 'all', label: 'All Deals' },
    { id: 'secondary', label: 'Secondary deals' },
    { id: 'primary', label: 'Primary deals' }
  ];

  const sortOptions = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'date', label: 'Date' },
    { id: 'size', label: 'Size' },
    { id: 'valuation', label: 'Valuation' }
  ];

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

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case 'Foundation': return 'bg-red-500/20 text-red-300';
      case 'Product': return 'bg-yellow-500/20 text-yellow-300';
      case 'GTM': return 'bg-blue-500/20 text-blue-300';
      case 'Traction': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const filteredOpportunities = sampleOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.ventureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.industry.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'primary') return matchesSearch && opportunity.dealType === 'Primary';
    if (activeFilter === 'secondary') return matchesSearch && opportunity.dealType === 'Secondary';
    
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Opportunity Marketplace</h1>
          <p className="text-white/80">Discover and evaluate investment opportunities</p>
        </div>

        {/* Active Deals Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">{sampleActiveDealsStats.numberOfActiveDeals}</div>
            <div className="text-white/70 text-sm">Number of active deals</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(sampleActiveDealsStats.totalDealSize)}</div>
            <div className="text-white/70 text-sm">Total deal size</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(sampleActiveDealsStats.averageDealSize)}</div>
            <div className="text-white/70 text-sm">Average deal size</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(sampleActiveDealsStats.averageDealValuation)}</div>
            <div className="text-white/70 text-sm">Average deal valuation</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search opportunities..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white/70 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Opportunities */}
          <div className="lg:col-span-2 space-y-6">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <img
                    src={opportunity.logo}
                    alt={opportunity.ventureName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-semibold text-xl mb-1">{opportunity.ventureName}</h3>
                        <p className="text-white/80 text-sm mb-2">{opportunity.shortDescription}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span className="flex items-center space-x-1">
                            <Building2 className="h-4 w-4" />
                            <span>{opportunity.industry}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{opportunity.hq}</span>
                          </span>
                          <span>{opportunity.postDate.toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-purple-300 font-semibold text-lg mb-1">
                          {opportunity.relevanceScore}% match
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          opportunity.dealType === 'Primary' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {opportunity.dealType}
                        </span>
                      </div>
                    </div>

                    {/* Deal Details */}
                    <div className="bg-white/5 rounded-lg p-4 mb-4">
                      {opportunity.dealType === 'Primary' && opportunity.primaryDealDetails ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-white/60 text-xs">Ask</div>
                            <div className="text-white font-semibold">{formatCurrency(opportunity.primaryDealDetails.ask)}</div>
                          </div>
                          <div>
                            <div className="text-white/60 text-xs">Valuation</div>
                            <div className="text-white font-semibold">{formatCurrency(opportunity.primaryDealDetails.valuation)}</div>
                          </div>
                          <div>
                            <div className="text-white/60 text-xs">Equity %</div>
                            <div className="text-white font-semibold">{opportunity.primaryDealDetails.equityPercentage}%</div>
                          </div>
                          <div>
                            <div className="text-white/60 text-xs">Stage</div>
                            <div className="text-white font-semibold">{opportunity.primaryDealDetails.stage}</div>
                          </div>
                        </div>
                      ) : opportunity.secondaryDealDetails ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="text-white/60 text-xs">Shares Available</div>
                            <div className="text-white font-semibold">{formatNumber(opportunity.secondaryDealDetails.sharesAvailable)}</div>
                          </div>
                          <div>
                            <div className="text-white/60 text-xs">Asking Price</div>
                            <div className="text-white font-semibold">{formatCurrency(opportunity.secondaryDealDetails.askingPrice)}</div>
                          </div>
                          <div>
                            <div className="text-white/60 text-xs">Original Round</div>
                            <div className="text-white font-semibold">{opportunity.secondaryDealDetails.originalRound}</div>
                          </div>
                          <div>
                            <div className="text-white/60 text-xs">Seller</div>
                            <div className="text-white font-semibold">{opportunity.secondaryDealDetails.sellerType}</div>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    {/* Progress and Traction */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${getProgressColor(opportunity.progress)}`}>
                          {opportunity.progress}
                        </span>
                        <div className="text-sm text-white/70">
                          ARR: {formatCurrency(opportunity.traction.arrMrr)} | 
                          Growth: {opportunity.traction.growthPercentage}% | 
                          Users: {formatNumber(opportunity.traction.users)} | 
                          Team: {opportunity.traction.teamSize}
                        </div>
                      </div>
                    </div>

                    {/* Opportunity Stats and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{formatNumber(opportunity.opportunityStats.views)} views</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Bookmark className="h-4 w-4" />
                          <span>{opportunity.opportunityStats.saves} saves</span>
                        </span>
                        <span>Closing in {opportunity.opportunityStats.closingInDays} days</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => setActiveTradingTab('deal-screening')}
                          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                        >
                          View / Add to pipeline
                        </button>
                        <button className={`p-2 rounded-lg transition-colors ${
                          opportunity.isSaved 
                            ? 'bg-yellow-500/20 text-yellow-300' 
                            : 'bg-white/10 text-white/70 hover:text-white'
                        }`}>
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <button className="bg-white/10 text-white/70 hover:text-white p-2 rounded-lg transition-colors">
                          <Share className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Top Active Deals */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-yellow-300" />
                <span>Top Active Deals</span>
              </h3>
              <div className="space-y-3">
                {sampleOpportunities.slice(0, 3).map((opportunity) => (
                  <div key={opportunity.id} className="border border-white/20 rounded-lg p-3">
                    <h4 className="text-white font-medium text-sm mb-1">{opportunity.ventureName}</h4>
                    <p className="text-white/70 text-xs mb-2">{opportunity.industry}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      opportunity.dealType === 'Primary' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {opportunity.dealType}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Deals per Industry */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <PieChart className="h-5 w-5 text-purple-300" />
                <span>Active Deals per Industry</span>
              </h3>
              <div className="space-y-3">
                {sampleActiveDealsPerIndustry.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-${['purple', 'blue', 'green', 'yellow', 'red'][index]}-400`}></div>
                      <span className="text-white/80">{item.label}</span>
                    </div>
                    <span className="text-white/60 text-sm">{item.value} deals</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Deals per Market */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-green-300" />
                <span>Active Deals per Market</span>
              </h3>
              <div className="space-y-3">
                {sampleActiveDealsPerMarket.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full bg-${['blue', 'purple', 'green', 'yellow', 'red'][index]}-400`}></div>
                      <span className="text-white/80">{item.label}</span>
                    </div>
                    <span className="text-white/60 text-sm">{item.value} deals</span>
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

export default MarketOpportunityMarketplace;