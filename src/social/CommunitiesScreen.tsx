import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Building2,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import { sampleCommunities } from '../data/socialData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface CommunitiesScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
}

function CommunitiesScreen({ selectedRole, profileData, toggleAICompanion }: CommunitiesScreenProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterOptions = [
    { id: 'all', label: 'All Communities' },
    { id: 'industry', label: 'By Industry' },
    { id: 'location', label: 'By Location' },
    { id: 'stakeholder', label: 'By Stakeholder Type' },
    { id: 'activity', label: 'By Activity Level' }
  ];

  const joinedCommunities = sampleCommunities.filter(community => community.isJoined);
  const availableCommunities = sampleCommunities.filter(community => !community.isJoined);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Communities</h1>
          <p className="text-white/80">Connect with like-minded professionals in your industry</p>
        </div>
        <button className="bg-gradient-to-r from-accent to-highlight text-white px-6 py-3 rounded-lg font-semibold hover:from-accent-dark hover:to-highlight-dark transition-all duration-300 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Create Community</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search communities..."
                className="w-full bg-primary/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-white/60" />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-primary/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Joined Communities */}
          {joinedCommunities.length > 0  && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-highlight" />
                <span>My Communities ({joinedCommunities.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {joinedCommunities.map((community) => (
                  <div key={community.id} className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-primary/40 transition-all duration-300 shadow-lg">
                    <img
                      src={community.coverImage}
                      alt={community.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-white font-semibold text-lg">{community.name}</h3>
                        <span className="bg-highlight/20 text-highlight px-2 py-1 rounded-full text-xs">
                          Joined
                        </span>
                      </div>
                      <p className="text-white/70 text-sm mb-4">{community.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4 text-white/60">
                          <span>{formatNumber(community.memberCount)} members</span>
                          <span className="text-green-400">{community.recentActivity}</span>
                        </div>
                        <button className="bg-accent hover:bg-accent-dark text-white px-4 py-2 rounded-lg transition-colors">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Available Communities */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Discover Communities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableCommunities.map((community) => (
                <div key={community.id} className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-primary/40 transition-all duration-300 shadow-lg">
                  <img
                    src={community.coverImage}
                    alt={community.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-white font-semibold text-lg">{community.name}</h3>
                      <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs">
                        {community.category}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm mb-4">{community.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4 text-white/60">
                        <span>{formatNumber(community.memberCount)} members</span>
                        <span className="text-yellow-400">{community.recentActivity}</span>
                      </div>
                      <button className="bg-gradient-to-r from-accent to-highlight hover:from-accent-dark hover:to-highlight-dark text-white px-4 py-2 rounded-lg transition-all duration-300">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Community Categories */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-300" />
              <span>Popular Categories</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Fintech', count: 45 },
                { name: 'Healthcare', count: 32 },
                { name: 'E-commerce', count: 28 },
                { name: 'AI & ML', count: 24 },
                { name: 'Sustainability', count: 19 }
              ].map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <span className="text-white/80">{category.name}</span>
                  <span className="text-white/60 text-sm">{category.count} communities</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Communities */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-300" />
              <span>Regional Communities</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'UAE Startups', count: 5234 },
                { name: 'Saudi Tech', count: 3891 },
                { name: 'Egypt Innovation', count: 2456 },
                { name: 'Jordan Entrepreneurs', count: 1789 },
                { name: 'MENA Women in Tech', count: 1234 }
              ].map((region) => (
                <div key={region.name} className="flex items-center justify-between">
                  <span className="text-white/80">{region.name}</span>
                  <span className="text-white/60 text-sm">{formatNumber(region.count)} members</span>
                </div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-yellow-300" />
              <span>Community Insights</span>
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">127</div>
                <div className="text-white/70 text-sm">Total Communities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">45K+</div>
                <div className="text-white/70 text-sm">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">2.3K</div>
                <div className="text-white/70 text-sm">Daily Posts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunitiesScreen;