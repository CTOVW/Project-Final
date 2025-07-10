import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  ChevronRight
} from 'lucide-react';
import { sampleVentures } from '../data/myVenturesData';
import VentureDetailsPage from './VentureDetailsPage';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface MyVenturesScreenProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  onCreateNewVenture: () => void;
}

function MyVenturesScreen({ 
  isAICompanionOpen, 
  aiCompanionWidth, 
  toggleAICompanion, 
  selectedRole, 
  profileData,
  onCreateNewVenture
}: MyVenturesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [fundingStatusFilter, setFundingStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('last-updated');
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

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-300" />;
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-300" />;
      case 'info':
        return <Building2 className="h-5 w-5 text-blue-300" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-white/60" />;
    }
  };

  // Get unique industries, stages, and funding statuses for filters
  const industries = Array.from(new Set(sampleVentures.map(venture => venture.industry)));
  const stages = Array.from(new Set(sampleVentures.map(venture => venture.stage)));
  const fundingStatuses = Array.from(new Set(sampleVentures.map(venture => venture.fundingStatus)));

  // Filter and sort ventures
  const filteredVentures = sampleVentures
    .filter(venture => {
      const matchesSearch = venture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           venture.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           venture.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIndustry = industryFilter === 'all' || venture.industry === industryFilter;
      const matchesStage = stageFilter === 'all' || venture.stage === stageFilter;
      const matchesFundingStatus = fundingStatusFilter === 'all' || venture.fundingStatus === fundingStatusFilter;
      
      return matchesSearch && matchesIndustry && matchesStage && matchesFundingStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'last-updated':
          return b.lastUpdated.getTime() - a.lastUpdated.getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        case 'progress':
          return b.progress - a.progress;
        case 'revenue':
          return b.monthlyRevenue - a.monthlyRevenue;
        default:
          return 0;
      }
    });

  // If a venture is selected, show the details page
  if (selectedVentureId) {
    return (
      <VentureDetailsPage 
        ventureId={selectedVentureId} 
        onBack={() => setSelectedVentureId(null)}
        isAICompanionOpen={isAICompanionOpen}
        aiCompanionWidth={aiCompanionWidth}
        toggleAICompanion={toggleAICompanion}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Ventures</h1>
            <p className="text-white/80">Manage and monitor your ventures</p>
          </div>
          <button 
            onClick={onCreateNewVenture}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Venture</span>
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search ventures..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-white/60" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="last-updated" className="bg-slate-800">Last Updated</option>
                <option value="name" className="bg-slate-800">Name (A-Z)</option>
                <option value="progress" className="bg-slate-800">Progress</option>
                <option value="revenue" className="bg-slate-800">Revenue</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Industry</label>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all" className="bg-slate-800">All Industries</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry} className="bg-slate-800">{industry}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Stage</label>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all" className="bg-slate-800">All Stages</option>
                {stages.map((stage) => (
                  <option key={stage} value={stage} className="bg-slate-800">{stage}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Funding Status</label>
              <select
                value={fundingStatusFilter}
                onChange={(e) => setFundingStatusFilter(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all" className="bg-slate-800">All Statuses</option>
                {fundingStatuses.map((status) => (
                  <option key={status} value={status} className="bg-slate-800">{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Ventures List */}
        <div className="space-y-6">
          {filteredVentures.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-12 text-center">
              <Building2 className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No ventures found</h2>
              <p className="text-white/70 mb-6">Try adjusting your search criteria or filters</p>
              <button 
                onClick={onCreateNewVenture}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 inline-flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create New Venture</span>
              </button>
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
                        <p className="text-white/80 text-sm mb-2">{venture.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-white/70">
                          <span>{venture.industry}</span>
                          <span>{venture.stage}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            venture.fundingStatus === 'Funded' ? 'bg-green-500/20 text-green-300' :
                            venture.fundingStatus === 'In Progress' ? 'bg-blue-500/20 text-blue-300' :
                            venture.fundingStatus === 'Exited' ? 'bg-purple-500/20 text-purple-300' :
                            'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {venture.fundingStatus}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="text-white/60 text-xs">Last updated</div>
                          <div className="text-white/80 text-sm">{formatTimeAgo(venture.lastUpdated)}</div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-white/60" />
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <div className="text-white/60">Progress</div>
                        <div className="text-white/80">{venture.progress}%</div>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                          style={{ width: `${venture.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {venture.fundingStatus !== 'Exited' && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2 text-white/60 text-xs mb-1">
                            <DollarSign className="h-4 w-4" />
                            <span>Funds Raised</span>
                          </div>
                          <div className="text-white font-semibold">{formatCurrency(venture.totalFundsRaised)}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2 text-white/60 text-xs mb-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>Monthly Revenue</span>
                          </div>
                          <div className="text-white font-semibold">{formatCurrency(venture.monthlyRevenue)}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2 text-white/60 text-xs mb-1">
                            <Users className="h-4 w-4" />
                            <span>Users</span>
                          </div>
                          <div className="text-white font-semibold">{formatNumber(venture.userCount)}</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <div className="flex items-center space-x-2 text-white/60 text-xs mb-1">
                            <Users className="h-4 w-4" />
                            <span>Team Size</span>
                          </div>
                          <div className="text-white font-semibold">{venture.teamSize}</div>
                        </div>
                      </div>
                    )}
                    
                    {venture.alerts.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {venture.alerts.map((alert) => (
                          <div 
                            key={alert.id} 
                            className={`flex items-center space-x-2 p-2 rounded-lg ${
                              alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
                              alert.type === 'critical' ? 'bg-red-500/20 text-red-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {getAlertIcon(alert.type)}
                            <span className="text-sm">{alert.message}</span>
                          </div>
                        ))}
                      </div>
                    )}
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

export default MyVenturesScreen;