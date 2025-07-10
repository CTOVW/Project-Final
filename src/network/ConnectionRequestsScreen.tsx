import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  MessageCircle,
  Calendar,
  MapPin,
  Building2,
  Check,
  X,
  UserPlus
} from 'lucide-react';
import { sampleConnectionRequests } from '../data/networkData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface ConnectionRequestsScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
}

function ConnectionRequestsScreen({ selectedRole, profileData, toggleAICompanion }: ConnectionRequestsScreenProps) {
  const [activeTab, setActiveTab] = useState('received');
  const [roleFilter, setRoleFilter] = useState('all');

  const requestTabs = [
    { id: 'received', label: 'Received' },
    { id: 'sent', label: 'Sent' }
  ];

  const roleFilters = [
    { id: 'all', label: 'All' },
    { id: 'founder', label: 'Founders' },
    { id: 'investor', label: 'Investors' },
    { id: 'expert', label: 'Experts' }
  ];

  const filteredRequests = sampleConnectionRequests.filter(request => {
    if (roleFilter === 'all') return true;
    return request.role === roleFilter;
  });

  const formatRequestDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Connection Requests</h1>
          <p className="text-white/80">Manage incoming and outgoing connection requests</p>
        </div>

        {/* Request Tabs */}
        <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden mb-8 shadow-lg">
          <div className="border-b border-white/20">
            <div className="flex">
              {requestTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary/40 text-white border-b-2 border-purple-300'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-white/10">
            <div className="flex space-x-2">
              {roleFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setRoleFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    roleFilter === filter.id
                      ? 'bg-accent text-white'
                      : 'bg-primary/40 text-white/70 hover:text-white hover:bg-primary/60'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'received' ? (
              <div className="space-y-6">
                {filteredRequests.length === 0 ? (
                  <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center shadow-lg">
                    <UserPlus className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white font-semibold text-xl mb-2">No connection requests</h3>
                    <p className="text-white/70">You don't have any pending connection requests</p>
                  </div>
                ) : (
                  filteredRequests.map((request) => (
                    <div key={request.id} className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-primary/40 transition-all duration-300 shadow-lg">
                      <div className="flex items-start space-x-4">
                        <img
                          src={request.profilePicture}
                          alt={request.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-white font-semibold text-lg">{request.name}</h3>
                              <p className="text-white/80 text-sm">{request.title}</p>
                              <p className="text-white/70 text-sm">{request.company}</p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  request.role === 'founder' ? 'bg-purple-500/20 text-purple-300' :
                                  request.role === 'investor' ? 'bg-blue-500/20 text-blue-300' :
                                  'bg-green-500/20 text-green-300'
                                }`}>
                                  {request.role}
                                </span>
                                <div className="flex items-center space-x-1 text-white/60 text-xs">
                                  <MapPin className="h-3 w-3" />
                                  <span>{request.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white/60 text-sm mb-2">
                                {formatRequestDate(request.requestDate)}
                              </div>
                              <div className="text-white/60 text-sm">
                                {request.mutualConnections} mutual connections
                              </div>
                            </div>
                          </div>

                          {request.message && (
                            <div className="bg-primary/40 rounded-lg p-3 mb-4">
                              <p className="text-white/80 text-sm italic">"{request.message}"</p>
                            </div>
                          )}

                          <div className="flex items-center space-x-3">
                            <button className="bg-red-500/20 text-red-300 border border-red-500/30 px-4 py-2 rounded-lg font-medium hover:bg-red-500/30 transition-all duration-300 flex items-center space-x-2">
                              <X className="h-4 w-4" />
                              <span>Ignore</span>
                            </button>
                            <button className="bg-gradient-to-r from-green-500 to-accent text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-accent-dark transition-all duration-300 flex items-center space-x-2">
                              <Check className="h-4 w-4" />
                              <span>Accept</span>
                            </button>
                            <button className="bg-primary/40 text-white border border-white/10 px-4 py-2 rounded-lg font-medium hover:bg-primary/60 transition-all duration-300 flex items-center space-x-2">
                              <MessageCircle className="h-4 w-4" />
                              <span>Message</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center shadow-lg">
                <UserPlus className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-white font-semibold text-xl mb-2">Sent Requests</h3>
                <p className="text-white/70">This feature will be available soon</p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Request Stats */}
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
              <h3 className="text-white font-semibold mb-4">Request Insights</h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{sampleConnectionRequests.length}</div>
                  <div className="text-white/70 text-sm">Pending Requests</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">89%</div>
                  <div className="text-white/70 text-sm">Acceptance Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">12</div>
                  <div className="text-white/70 text-sm">This Week</div>
                </div>
              </div>
            </div>

            {/* Request Breakdown */}
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-300" />
                <span>By Role</span>
              </h3>
              <div className="space-y-3">
                {[
                  { role: 'Founders', count: sampleConnectionRequests.filter(r => r.role === 'founder').length, color: 'purple' },
                  { role: 'Investors', count: sampleConnectionRequests.filter(r => r.role === 'investor').length, color: 'blue' },
                  { role: 'Experts', count: sampleConnectionRequests.filter(r => r.role === 'expert').length, color: 'green' }
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

            {/* Recent Activity */}
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
              <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-yellow-300" />
                <span>Recent Activity</span>
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'New request from', name: 'Khalid Al-Thani', time: '2 days ago' },
                  { action: 'Accepted request from', name: 'Nadia Boutros', time: '1 week ago' },
                  { action: 'New request from', name: 'Youssef Mansour', time: '3 days ago' },
                  { action: 'Sent request to', name: 'Rania Al-Abdullah', time: '1 week ago' }
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

export default ConnectionRequestsScreen;