import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  MessageCircle,
  Calendar,
  MapPin,
  Building2
} from 'lucide-react';
import { sampleConnections } from '../data/networkData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface MyConnectionsScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
}

function MyConnectionsScreen({ selectedRole, profileData, toggleAICompanion }: MyConnectionsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const roleFilters = [
    { id: 'all', label: 'All Roles' },
    { id: 'founder', label: 'Founders' },
    { id: 'investor', label: 'Investors' },
    { id: 'expert', label: 'Experts' }
  ];

  const locationFilters = [
    { id: 'all', label: 'All Locations' },
    { id: 'uae', label: 'UAE' },
    { id: 'saudi', label: 'Saudi Arabia' },
    { id: 'egypt', label: 'Egypt' },
    { id: 'jordan', label: 'Jordan' }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Recently Added' },
    { id: 'first-name', label: 'First Name' },
    { id: 'last-name', label: 'Last Name' },
    { id: 'company', label: 'Company' }
  ];

  const filteredConnections = sampleConnections.filter(connection => {
    const matchesSearch = connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         connection.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || connection.role === roleFilter;
    const matchesLocation = locationFilter === 'all' || 
                           connection.location.toLowerCase().includes(locationFilter === 'uae' ? 'uae' : 
                           locationFilter === 'saudi' ? 'saudi' : 
                           locationFilter === 'egypt' ? 'egypt' : 
                           locationFilter === 'jordan' ? 'jordan' : '');
    return matchesSearch && matchesRole && matchesLocation;
  });

  const sortedConnections = [...filteredConnections].sort((a, b) => {
    switch (sortBy) {
      case 'first-name':
        return a.name.split(' ')[0].localeCompare(b.name.split(' ')[0]);
      case 'last-name':
        return a.name.split(' ').pop()!.localeCompare(b.name.split(' ').pop()!);
      case 'company':
        return a.company.localeCompare(b.company);
      case 'recent':
      default:
        return b.connectionDate.getTime() - a.connectionDate.getTime();
    }
  });

  const formatConnectionDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Connected today';
    if (diffDays === 1) return 'Connected yesterday';
    if (diffDays < 30) return `Connected ${diffDays} days ago`;
    if (diffDays < 365) return `Connected ${Math.floor(diffDays / 30)} months ago`;
    return `Connected ${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">My Connections</h1>
          <div className="flex items-center space-x-4 text-white/80">
            <span className="text-2xl font-semibold text-purple-300">{sampleConnections.length}</span>
            <span>Connections</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name"
                  className="w-full bg-primary/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                {roleFilters.map((filter) => (
                  <option key={filter.id} value={filter.id} className="bg-slate-800">
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {sortOptions.map((option) => (
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
          <div className="lg:col-span-2">
            {sortedConnections.length === 0 ? (
              <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center shadow-lg">
                <Users className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-white font-semibold text-xl mb-2">No connections found</h3>
                <p className="text-white/70">Try adjusting your search criteria or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedConnections.map((connection) => (
                  <div key={connection.id} className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-primary/40 transition-all duration-300 shadow-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={connection.profilePicture}
                        alt={connection.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-white font-semibold text-lg">{connection.name}</h3>
                            <p className="text-white/80 text-sm">{connection.title}</p>
                            <p className="text-white/70 text-sm">{connection.company}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                connection.role === 'founder' ? 'bg-purple-500/20 text-purple-300' :
                                connection.role === 'investor' ? 'bg-blue-500/20 text-blue-300' :
                                'bg-green-500/20 text-green-300'
                              }`}>
                                {connection.role}
                              </span>
                              <div className="flex items-center space-x-1 text-white/60 text-xs">
                                <MapPin className="h-3 w-3" />
                                <span>{connection.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white/60 text-sm mb-2">
                              {formatConnectionDate(connection.connectionDate)}
                            </div>
                            <button className="bg-gradient-to-r from-accent to-highlight text-white px-4 py-2 rounded-lg font-medium hover:from-accent-dark hover:to-highlight-dark transition-all duration-300 flex items-center space-x-2">
                              <MessageCircle className="h-4 w-4" />
                              <span>Message</span>
                            </button>
                          </div>
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
            {/* Connection Stats */}
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
              <h3 className="text-white font-semibold mb-4">Connection Insights</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{sampleConnections.length}</div>
                  <div className="text-white/70 text-sm">Total Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">23</div>
                  <div className="text-white/70 text-sm">New This Month</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">89%</div>
                  <div className="text-white/70 text-sm">Response Rate</div>
                </div>
              </div>
            </div>

            {/* Connection Breakdown */}
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-300" />
                <span>By Role</span>
              </h3>
              <div className="space-y-3">
                {[
                  { role: 'Founders', count: sampleConnections.filter(c => c.role === 'founder').length, color: 'purple' },
                  { role: 'Investors', count: sampleConnections.filter(c => c.role === 'investor').length, color: 'blue' },
                  { role: 'Experts', count: sampleConnections.filter(c => c.role === 'expert').length, color: 'green' }
                ].map((item) => (
                  <div key={item.role} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-${item.color}-400`}></div>
                      <span className="text-white/80">{item.role}</span>
                    </div>
                    <span className="text-white/60 text-sm">{item.count}</span>
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
                  { location: 'UAE', count: 2 },
                  { location: 'Saudi Arabia', count: 1 },
                  { location: 'Egypt', count: 1 },
                  { location: 'Jordan', count: 1 }
                ].map((item) => (
                  <div key={item.location} className="flex items-center justify-between">
                    <span className="text-white/80">{item.location}</span>
                    <span className="text-white/60 text-sm">{item.count} connections</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-yellow-300" />
                <span>Recent Activity</span>
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Connected with', name: 'Layla Kassem', time: '7 days ago' },
                  { action: 'Message from', name: 'Dr. Fatima Al-Zahra', time: '2 weeks ago' },
                  { action: 'Connected with', name: 'Ahmed Hassan', time: '2 weeks ago' },
                  { action: 'Connected with', name: 'Omar Al-Mansouri', time: '1 month ago' }
                ].map((activity, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-white/80">{activity.action}</span>
                    <span className="text-purple-300"> {activity.name}</span>
                    <div className="text-white/50 text-xs">{activity.time}</div>
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

export default MyConnectionsScreen;