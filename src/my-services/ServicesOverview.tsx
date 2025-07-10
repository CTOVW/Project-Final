import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Users, 
  Star, 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  MessageCircle,
  FileText,
  BarChart3,
  TrendingUp,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Eye,
  Edit,
  Trash2,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { 
  sampleServicePortfolioSummary, 
  sampleServices, 
  sampleSessions, 
  sampleMarketUpdates 
} from '../data/myServicesData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface ServicesOverviewProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  setActiveServiceTab: (tab: string) => void;
}

function ServicesOverview({ 
  isAICompanionOpen, 
  aiCompanionWidth, 
  toggleAICompanion, 
  selectedRole, 
  profileData,
  setActiveServiceTab
}: ServicesOverviewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

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

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="h-5 w-5 text-blue-300" />;
      case 'session':
        return <Clock className="h-5 w-5 text-green-300" />;
      case 'review':
        return <Star className="h-5 w-5 text-yellow-300" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-purple-300" />;
      default:
        return <MessageCircle className="h-5 w-5 text-white/60" />;
    }
  };

  // Get active sessions
  const activeSessions = sampleSessions.filter(session => 
    session.status === 'in-progress' || session.status === 'scheduled'
  ).sort((a, b) => {
    // Sort scheduled sessions first by start date, then in-progress by progress
    if (a.status === 'scheduled' && b.status === 'scheduled') {
      return a.startDate.getTime() - b.startDate.getTime();
    }
    if (a.status === 'in-progress' && b.status === 'in-progress') {
      return b.progress - a.progress;
    }
    return a.status === 'scheduled' ? -1 : 1;
  }).slice(0, 3);

  // Get pending requests (scheduled sessions that haven't started yet)
  const pendingRequests = sampleSessions.filter(session => 
    session.status === 'scheduled' && session.progress === 0
  ).slice(0, 3);

  // Get top performing services
  const topPerformingServices = [...sampleServices]
    .filter(service => service.status === 'active' && service.totalBookings > 0)
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Services Overview</h1>
          <p className="text-white/80">Manage your service offerings, track performance, and grow your expert business</p>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center md:col-span-2">
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-purple-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(sampleServicePortfolioSummary.totalRevenue)}</div>
            <div className="text-white/70 text-sm">Total Revenue</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <Briefcase className="h-6 w-6 text-blue-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{sampleServicePortfolioSummary.activeServices}</div>
            <div className="text-white/70 text-sm">Active Services</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <Users className="h-6 w-6 text-green-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{sampleServicePortfolioSummary.totalClients}</div>
            <div className="text-white/70 text-sm">Total Clients</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-yellow-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <Calendar className="h-6 w-6 text-yellow-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{sampleServicePortfolioSummary.totalSessions}</div>
            <div className="text-white/70 text-sm">Total Sessions</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-red-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <Star className="h-6 w-6 text-red-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{sampleServicePortfolioSummary.averageRating.toFixed(1)}</div>
            <div className="text-white/70 text-sm">Average Rating</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Sessions */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-300" />
                  <span>Active Sessions</span>
                </h2>
                <button 
                  onClick={() => setActiveServiceTab('session-management')}
                  className="text-purple-300 hover:text-purple-200 transition-colors flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              
              {activeSessions.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="h-16 w-16 text-white/40 mx-auto mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">No active sessions</h3>
                  <p className="text-white/70">You don't have any active or upcoming sessions at the moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={session.clientProfilePicture}
                          alt={session.clientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-white font-semibold">{session.serviceName}</h3>
                              <p className="text-white/80 text-sm">with {session.clientName}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                  session.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                                }`}>
                                  {session.status === 'scheduled' ? 'Upcoming' : 'In Progress'}
                                </span>
                                {session.status === 'scheduled' ? (
                                  <span className="text-white/60 text-xs">
                                    {new Date(session.startDate).toLocaleDateString()} at {new Date(session.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </span>
                                ) : (
                                  <span className="text-white/60 text-xs">{session.progress}% complete</span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-semibold">{formatCurrency(session.price)}</div>
                              <div className="text-white/60 text-xs">{session.isPaid ? 'Paid' : 'Unpaid'}</div>
                            </div>
                          </div>
                          
                          {session.status === 'in-progress' && (
                            <div className="mt-3">
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                                  style={{ width: `${session.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-3 mt-3">
                            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                              {session.status === 'scheduled' ? 'Prepare Session' : 'Continue Session'}
                            </button>
                            <button className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pending Requests */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-yellow-300" />
                  <span>Pending Requests</span>
                </h2>
                <button 
                  onClick={() => setActiveServiceTab('session-management')}
                  className="text-purple-300 hover:text-purple-200 transition-colors flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              
              {pendingRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">No pending requests</h3>
                  <p className="text-white/70">You don't have any pending booking requests at the moment</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <img
                          src={request.clientProfilePicture}
                          alt={request.clientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-white font-semibold">{request.serviceName}</h3>
                              <p className="text-white/80 text-sm">from {request.clientName}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full text-xs">
                                  New Request
                                </span>
                                <span className="text-white/60 text-xs">
                                  {new Date(request.startDate).toLocaleDateString()} at {new Date(request.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-semibold">{formatCurrency(request.price)}</div>
                              <div className="text-white/60 text-xs">{request.isPaid ? 'Pre-paid' : 'Payment pending'}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 mt-3">
                            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-1">
                              <CheckCircle className="h-4 w-4" />
                              <span>Accept</span>
                            </button>
                            <button className="bg-red-500/20 text-red-300 border border-red-500/30 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-all duration-300 flex items-center space-x-1">
                              <AlertTriangle className="h-4 w-4" />
                              <span>Decline</span>
                            </button>
                            <button className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <button 
                  onClick={() => setActiveServiceTab('create-service')}
                  className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-4 text-center transition-all duration-300"
                >
                  <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-3">
                    <Plus className="h-5 w-5 text-purple-300" />
                  </div>
                  <div className="text-white font-medium">Create New Service</div>
                </button>
                
                <button 
                  onClick={() => setActiveServiceTab('create-workshop')}
                  className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-4 text-center transition-all duration-300"
                >
                  <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-3">
                    <Calendar className="h-5 w-5 text-blue-300" />
                  </div>
                  <div className="text-white font-medium">Create Workshop</div>
                </button>
                
                <button 
                  onClick={() => setActiveServiceTab('session-management')}
                  className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-4 text-center transition-all duration-300"
                >
                  <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-3">
                    <Clock className="h-5 w-5 text-green-300" />
                  </div>
                  <div className="text-white font-medium">Schedule Session</div>
                </button>
                
                <button 
                  onClick={() => setActiveServiceTab('client-management')}
                  className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-4 text-center transition-all duration-300"
                >
                  <div className="bg-yellow-500/20 p-3 rounded-lg w-fit mx-auto mb-3">
                    <MessageCircle className="h-5 w-5 text-yellow-300" />
                  </div>
                  <div className="text-white font-medium">Message Clients</div>
                </button>
                
                <button className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-4 text-center transition-all duration-300">
                  <div className="bg-red-500/20 p-3 rounded-lg w-fit mx-auto mb-3">
                    <BarChart3 className="h-5 w-5 text-red-300" />
                  </div>
                  <div className="text-white font-medium">View Analytics</div>
                </button>
              </div>
            </div>

            {/* Services List */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Your Services</h2>
                <button 
                  onClick={() => setActiveServiceTab('create-service')}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Service</span>
                </button>
              </div>
              
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search services..."
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-white/60" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all" className="bg-slate-800">All Statuses</option>
                    <option value="active" className="bg-slate-800">Active</option>
                    <option value="draft" className="bg-slate-800">Draft</option>
                    <option value="archived" className="bg-slate-800">Archived</option>
                  </select>
                </div>
                <div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all" className="bg-slate-800">All Categories</option>
                    <option value="Consulting" className="bg-slate-800">Consulting</option>
                    <option value="Mentoring" className="bg-slate-800">Mentoring</option>
                    <option value="Training" className="bg-slate-800">Training</option>
                    <option value="Advisory" className="bg-slate-800">Advisory</option>
                  </select>
                </div>
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="recent" className="bg-slate-800">Most Recent</option>
                    <option value="popular" className="bg-slate-800">Most Popular</option>
                    <option value="revenue" className="bg-slate-800">Highest Revenue</option>
                    <option value="rating" className="bg-slate-800">Highest Rated</option>
                  </select>
                </div>
              </div>
              
              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleServices
                  .filter(service => {
                    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                         service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
                    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
                    return matchesSearch && matchesStatus && matchesCategory;
                  })
                  .sort((a, b) => {
                    switch (sortBy) {
                      case 'recent':
                        return b.lastUpdated.getTime() - a.lastUpdated.getTime();
                      case 'popular':
                        return b.totalBookings - a.totalBookings;
                      case 'revenue':
                        return b.totalRevenue - a.totalRevenue;
                      case 'rating':
                        return b.averageRating - a.averageRating;
                      default:
                        return 0;
                    }
                  })
                  .map((service) => (
                    <div key={service.id} className="bg-white/5 rounded-lg overflow-hidden">
                      <div className="relative">
                        <img
                          src={service.coverImage}
                          alt={service.name}
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            service.status === 'active' ? 'bg-green-500/20 text-green-300' :
                            service.status === 'draft' ? 'bg-yellow-500/20 text-yellow-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-white font-semibold text-lg">{service.name}</h3>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full text-xs">
                                {service.category}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-white/80 text-xs">{service.averageRating.toFixed(1)}</span>
                                <span className="text-white/60 text-xs">({service.reviewCount})</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-semibold">{formatCurrency(service.pricing.basePrice)}</div>
                            <div className="text-white/60 text-xs">{service.pricing.pricingModel}</div>
                          </div>
                        </div>
                        
                        <p className="text-white/70 text-sm mb-3 line-clamp-2">{service.shortDescription}</p>
                        
                        <div className="flex items-center justify-between text-sm text-white/60 mb-3">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{service.totalBookings} bookings</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4" />
                            <span>{formatCurrency(service.totalRevenue)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="flex-1 bg-white/10 text-white border border-white/20 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-1">
                            <Eye className="h-4 w-4" />
                            <span>View</span>
                          </button>
                          <button className="flex-1 bg-white/10 text-white border border-white/20 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-1">
                            <Edit className="h-4 w-4" />
                            <span>Edit</span>
                          </button>
                          <button className="bg-white/10 text-white border border-white/20 p-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300">
                            <Trash2 className="h-4 w-4" />
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
            {/* Top Performing Services */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-300" />
                <span>Top Performing Services</span>
              </h2>
              {topPerformingServices.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-white/70">No active services yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {topPerformingServices.map((service) => (
                    <div key={service.id} className="bg-white/5 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={service.coverImage} 
                          alt={service.name} 
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm">{service.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-white/60 text-xs">{service.totalBookings} bookings</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="text-white/80 text-xs">{service.averageRating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-sm font-medium">{formatCurrency(service.totalRevenue)}</p>
                          <p className="text-white/60 text-xs">Total Revenue</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-300" />
                <span>Recent Activity</span>
              </h2>
              <div className="space-y-4">
                {sampleServicePortfolioSummary.recentActivity.map((activity) => (
                  <div key={activity.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'booking' ? 'bg-blue-500/20' :
                        activity.type === 'session' ? 'bg-green-500/20' :
                        activity.type === 'review' ? 'bg-yellow-500/20' :
                        'bg-purple-500/20'
                      }`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm">{activity.client}</h3>
                        <p className="text-white/80 text-sm">{activity.description}</p>
                        <p className="text-white/60 text-xs mt-1">{formatTimeAgo(activity.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market News & Updates */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <FileText className="h-5 w-5 text-purple-300" />
                <span>Market News & Updates</span>
              </h2>
              <div className="space-y-4">
                {sampleMarketUpdates.map((update) => (
                  <a 
                    href={update.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    key={update.id} 
                    className="block bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
                  >
                    <h3 className="text-white font-medium text-sm mb-1">{update.title}</h3>
                    <p className="text-white/70 text-xs mb-2 line-clamp-2">{update.description}</p>
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
        </div>
      </div>
    </div>
  );
}

export default ServicesOverview;