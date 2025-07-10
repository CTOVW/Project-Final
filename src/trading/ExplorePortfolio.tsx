import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Calendar,
  Building2,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { samplePortfolioVentures } from '../data/myInvestmentsData';
import PortfolioManagement from './PortfolioManagement';

interface ExplorePortfolioProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
}

function ExplorePortfolio({
  isAICompanionOpen,
  aiCompanionWidth
}: ExplorePortfolioProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedVentureId, setSelectedVentureId] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Filter and sort ventures
  const filteredVentures = samplePortfolioVentures
    .filter(venture => {
      const matchesSearch = venture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           venture.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = industryFilter === 'all' || venture.industry === industryFilter;
      const matchesStage = stageFilter === 'all' || venture.stage === stageFilter;
      return matchesSearch && matchesIndustry && matchesStage;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.investmentDate.getTime() - a.investmentDate.getTime();
        case 'amount':
          return b.investmentAmount - a.investmentAmount;
        case 'value':
          return b.currentValue - a.currentValue;
        case 'performance':
          return b.returnMultiple - a.returnMultiple;
        default:
          return 0;
      }
    });

  // If a venture is selected, show the PortfolioManagement component
  if (selectedVentureId) {
    return (
      <PortfolioManagement
        isAICompanionOpen={isAICompanionOpen}
        aiCompanionWidth={aiCompanionWidth}
        ventureId={selectedVentureId}
        onBack={() => setSelectedVentureId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Portfolio</h1>
          <p className="text-white/80">Manage and monitor your portfolio companies</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search portfolio..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-white/60" />
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all" className="bg-slate-800">All Industries</option>
                  <option value="Fintech" className="bg-slate-800">Fintech</option>
                  <option value="Healthtech" className="bg-slate-800">Healthtech</option>
                  <option value="E-commerce" className="bg-slate-800">E-commerce</option>
                  <option value="EdTech" className="bg-slate-800">EdTech</option>
                  <option value="CleanTech" className="bg-slate-800">CleanTech</option>
                </select>
              </div>
              <div>
                <select
                  value={stageFilter}
                  onChange={(e) => setStageFilter(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all" className="bg-slate-800">All Stages</option>
                  <option value="Pre-seed" className="bg-slate-800">Pre-seed</option>
                  <option value="Seed" className="bg-slate-800">Seed</option>
                  <option value="Series A" className="bg-slate-800">Series A</option>
                  <option value="Series B+" className="bg-slate-800">Series B+</option>
                </select>
              </div>
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="date" className="bg-slate-800">Date (Newest)</option>
                  <option value="amount" className="bg-slate-800">Amount (Highest)</option>
                  <option value="value" className="bg-slate-800">Current Value (Highest)</option>
                  <option value="performance" className="bg-slate-800">Performance (Best)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Ventures */}
        <div className="space-y-6">
          {filteredVentures.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">No Ventures Found</h2>
              <p className="text-white/70">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            filteredVentures.map((venture) => (
              <div 
                key={venture.id} 
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedVentureId(venture.id)}
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={venture.logo}
                    alt={venture.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-bold text-white mb-1">{venture.name}</h2>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span className="flex items-center space-x-1">
                            <Building2 className="h-4 w-4" />
                            <span>{venture.industry}</span>
                          </span>
                          <span>{venture.stage}</span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(venture.investmentDate)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ChevronRight className="h-5 w-5 text-white/60" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <h3 className="text-white/60 text-xs mb-1">Investment</h3>
                        <p className="text-white font-semibold">{formatCurrency(venture.investmentAmount)}</p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <h3 className="text-white/60 text-xs mb-1">Current Value</h3>
                        <p className="text-white font-semibold">
                          {venture.performance === 'exited' ? 'Exited' : formatCurrency(venture.currentValue)}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <h3 className="text-white/60 text-xs mb-1">Performance</h3>
                        <div className="flex items-center space-x-2">
                          <p className={`font-semibold ${
                            venture.performance === 'positive' ? 'text-green-400' :
                            venture.performance === 'negative' ? 'text-red-400' :
                            'text-blue-400'
                          }`}>
                            {venture.returnMultiple.toFixed(1)}x
                          </p>
                          {venture.performance === 'positive' && <ArrowUp className="h-4 w-4 text-green-400" />}
                          {venture.performance === 'negative' && <ArrowDown className="h-4 w-4 text-red-400" />}
                          {venture.performance === 'exited' && <TrendingUp className="h-4 w-4 text-blue-400" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplorePortfolio;