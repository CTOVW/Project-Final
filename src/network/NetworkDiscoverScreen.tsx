import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  MapPin, 
  Building2,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { sampleDiscoverProfiles } from '../data/networkData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface NetworkDiscoverScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
}

function NetworkDiscoverScreen({ selectedRole, profileData, toggleAICompanion }: NetworkDiscoverScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('recommended');

  const tabs = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'top-profiles', label: 'Top Profiles' }
  ];

  const roleFilters = [
    { id: 'all', label: 'All Roles' },
    { id: 'founder', label: 'Founders' },
    { id: 'investor', label: 'Investors' },
    { id: 'expert', label: 'Experts' }
  ];

  const filteredProfiles = sampleDiscoverProfiles.filter(profile => {
    const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         profile.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         profile.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || profile.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Network Discovery</h1>
        <p className="text-white/80">Discover other profiles and build your network</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, company, expertise"
                className="w-full bg-primary/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-white/60" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-primary/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {roleFilters.map((filter) => (
                  <option key={filter.id} value={filter.id} className="bg-slate-800">
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-accent text-white'
                  : 'bg-primary/40 text-white/70 hover:text-white hover:bg-primary/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {filteredProfiles.length === 0 ? (
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center shadow-lg">
              <Users className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-xl mb-2">No profiles found</h3>
              <p className="text-white/70">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProfiles.map((profile) => (
                <div key={profile.id} className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-primary/40 transition-all duration-300 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <img
                      src={profile.profilePicture}
                      alt={profile.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-white font-semibold text-lg">{profile.name}</h3>
                          <p className="text-white/80 text-sm">{profile.title}</p>
                          <p className="text-white/70 text-sm">{profile.company}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          profile.role === 'founder' ? 'bg-purple-500/20 text-purple-300' :
                          profile.role === 'investor' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {profile.role}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-white/60 text-sm mb-3">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>

                      {profile.expertise && (
                        <div className="mb-4">
                          <div className="flex flex-wrap gap-1">
                            {profile.expertise.slice(0, 3).map((skill, index) => (
                              <span 
                                key={index}
                                className="bg-primary/40 text-white/80 px-2 py-1 rounded text-xs"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="text-white/60 text-sm">
                          {profile.mutualConnections} mutual connections
                        </div>
                        <button className="bg-gradient-to-r from-accent to-highlight text-white px-4 py-2 rounded-lg font-medium hover:from-accent-dark hover:to-highlight-dark transition-all duration-300 flex items-center space-x-2">
                          <UserPlus className="h-4 w-4" />
                          <span>Connect</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Network Stats */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4">Your Network</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">247</div>
                <div className="text-white/70 text-sm">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">89</div>
                <div className="text-white/70 text-sm">Pending Requests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-white/70 text-sm">Profile Views</div>
              </div>
            </div>
          </div>

          {/* Popular Industries */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-purple-300" />
              <span>Popular Industries</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Fintech', count: 1234 },
                { name: 'Healthcare', count: 987 },
                { name: 'E-commerce', count: 756 },
                { name: 'AI & ML', count: 543 },
                { name: 'CleanTech', count: 321 }
              ].map((industry) => (
                <div key={industry.name} className="flex items-center justify-between">
                  <span className="text-white/80">{industry.name}</span>
                  <span className="text-white/60 text-sm">{industry.count} professionals</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Locations */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-green-300" />
              <span>Top Locations</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Dubai, UAE', count: 2456 },
                { name: 'Riyadh, Saudi Arabia', count: 1789 },
                { name: 'Cairo, Egypt', count: 1234 },
                { name: 'Amman, Jordan', count: 987 },
                { name: 'Kuwait City, Kuwait', count: 654 }
              ].map((location) => (
                <div key={location.name} className="flex items-center justify-between">
                  <span className="text-white/80">{location.name}</span>
                  <span className="text-white/60 text-sm">{location.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Network Growth */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-yellow-300" />
              <span>Network Growth</span>
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">+23</div>
                <div className="text-white/70 text-sm">New connections this week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">+156</div>
                <div className="text-white/70 text-sm">Profile views this month</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">89%</div>
                <div className="text-white/70 text-sm">Connection acceptance rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NetworkDiscoverScreen;