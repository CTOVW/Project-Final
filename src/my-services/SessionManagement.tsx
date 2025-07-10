import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MessageCircle, 
  FileText, 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  Edit, 
  Trash2, 
  Video, 
  Monitor, 
  Share, 
  Save
} from 'lucide-react';
import { sampleSessions } from '../data/myServicesData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface SessionManagementProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
}

function SessionManagement({ 
  isAICompanionOpen, 
  aiCompanionWidth, 
  toggleAICompanion, 
  selectedRole, 
  profileData 
}: SessionManagementProps) {
  const [activeTab, setActiveTab] = useState('calendar-tracking');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');
  const [newActionItem, setNewActionItem] = useState('');

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
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'calendar-tracking', label: 'Calendar & Tracking' },
    { id: 'workspace', label: 'Workspace' },
    { id: 'client-interaction', label: 'Client Interaction' }
  ];

  // Filter sessions based on search and status filter
  const filteredSessions = sampleSessions.filter(session => {
    const matchesSearch = session.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get the selected session details
  const session = selectedSession ? sampleSessions.find(s => s.id === selectedSession) : null;

  const handleAddActionItem = () => {
    if (newActionItem.trim() && session) {
      // In a real app, this would update the session in the database
      console.log('Adding action item:', newActionItem);
      setNewActionItem('');
    }
  };

  const handleAddNote = () => {
    if (newNote.trim() && session) {
      // In a real app, this would update the session in the database
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300"
        style={{ 
          marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
        }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Session Management</h1>
          <p className="text-white/80">Schedule, track, and manage your client sessions</p>
        </div>

        {/* Session Management Tabs */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
          <div className="border-b border-white/20">
            <div className="flex">
              {tabs.map((tab) => (
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
            {/* Calendar & Tracking Tab */}
            {activeTab === 'calendar-tracking' && (
              <div className="space-y-6">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search sessions by client or service..."
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
                      <option value="all" className="bg-slate-800">All Sessions</option>
                      <option value="scheduled" className="bg-slate-800">Upcoming</option>
                      <option value="in-progress" className="bg-slate-800">In Progress</option>
                      <option value="completed" className="bg-slate-800">Completed</option>
                      <option value="cancelled" className="bg-slate-800">Cancelled</option>
                    </select>
                  </div>
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Schedule New Session</span>
                  </button>
                </div>

                {/* Sessions List */}
                <div className="grid grid-cols-1 gap-4">
                  {filteredSessions.length === 0 ? (
                    <div className="text-center py-12 bg-white/5 rounded-lg">
                      <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
                      <h3 className="text-white font-semibold text-lg mb-2">No sessions found</h3>
                      <p className="text-white/70">Try adjusting your search or filters</p>
                    </div>
                  ) : (
                    filteredSessions.map((session) => (
                      <div 
                        key={session.id} 
                        className={`bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                          selectedSession === session.id ? 'border border-purple-300' : ''
                        }`}
                        onClick={() => setSelectedSession(session.id)}
                      >
                        <div className="flex items-start space-x-4">
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
                                    session.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' : 
                                    session.status === 'in-progress' ? 'bg-green-500/20 text-green-300' :
                                    session.status === 'completed' ? 'bg-purple-500/20 text-purple-300' :
                                    'bg-red-500/20 text-red-300'
                                  }`}>
                                    {session.status === 'scheduled' ? 'Upcoming' : 
                                     session.status === 'in-progress' ? 'In Progress' :
                                     session.status === 'completed' ? 'Completed' :
                                     'Cancelled'}
                                  </span>
                                  <span className="text-white/60 text-xs">
                                    {formatDate(session.startDate)} at {formatTime(session.startDate)}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-white font-semibold">{formatCurrency(session.price)}</div>
                                <div className="text-white/60 text-xs">{session.isPaid ? 'Paid' : 'Unpaid'}</div>
                                {session.status === 'in-progress' && (
                                  <div className="text-white/60 text-xs mt-1">{session.progress}% complete</div>
                                )}
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
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Workspace Tab */}
            {activeTab === 'workspace' && (
              <div className="space-y-6">
                {!selectedSession ? (
                  <div className="text-center py-12 bg-white/5 rounded-lg">
                    <Monitor className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white font-semibold text-lg mb-2">No session selected</h3>
                    <p className="text-white/70">Select a session from the Calendar & Tracking tab to access the workspace</p>
                  </div>
                ) : (
                  <>
                    {/* Session Header */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={session?.clientProfilePicture}
                          alt={session?.clientName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-white font-semibold">{session?.serviceName}</h3>
                              <p className="text-white/80 text-sm">with {session?.clientName}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className={`px-2 py-0.5 rounded-full text-xs ${
                                  session?.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' : 
                                  session?.status === 'in-progress' ? 'bg-green-500/20 text-green-300' :
                                  session?.status === 'completed' ? 'bg-purple-500/20 text-purple-300' :
                                  'bg-red-500/20 text-red-300'
                                }`}>
                                  {session?.status === 'scheduled' ? 'Upcoming' : 
                                   session?.status === 'in-progress' ? 'In Progress' :
                                   session?.status === 'completed' ? 'Completed' :
                                   'Cancelled'}
                                </span>
                                <span className="text-white/60 text-xs">
                                  {formatDate(session?.startDate)} at {formatTime(session?.startDate)}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-semibold">{formatCurrency(session?.price)}</div>
                              <div className="text-white/60 text-xs">{session?.isPaid ? 'Paid' : 'Unpaid'}</div>
                              {session?.status === 'in-progress' && (
                                <div className="text-white/60 text-xs mt-1">{session?.progress}% complete</div>
                              )}
                            </div>
                          </div>
                          
                          {session?.status === 'in-progress' && (
                            <div className="mt-3">
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                                  style={{ width: `${session?.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Workspace Tools */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-4 text-center transition-all duration-300">
                        <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-3">
                          <Video className="h-5 w-5 text-purple-300" />
                        </div>
                        <div className="text-white font-medium">Video Conference</div>
                      </button>
                      
                      <button className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-4 text-center transition-all duration-300">
                        <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-3">
                          <Monitor className="h-5 w-5 text-blue-300" />
                        </div>
                        <div className="text-white font-medium">Screen Sharing</div>
                      </button>
                      
                      <button className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg p-4 text-center transition-all duration-300">
                        <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-3">
                          <Share className="h-5 w-5 text-green-300" />
                        </div>
                        <div className="text-white font-medium">File Sharing</div>
                      </button>
                    </div>

                    {/* Session Materials */}
                    <div className="bg-white/5 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Session Materials</h3>
                        <button className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                          <Upload className="h-4 w-4" />
                          <span>Upload Material</span>
                        </button>
                      </div>
                      
                      {session?.materials.length === 0 ? (
                        <div className="text-center py-6">
                          <FileText className="h-12 w-12 text-white/40 mx-auto mb-3" />
                          <p className="text-white/70">No materials uploaded yet</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {session?.materials.map((material) => (
                            <div key={material.id} className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <FileText className="h-5 w-5 text-white/60" />
                                <div>
                                  <h4 className="text-white font-medium text-sm">{material.name}</h4>
                                  <p className="text-white/60 text-xs">{material.type} • {material.uploadDate.toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="text-white/60 hover:text-white p-1 rounded hover:bg-white/10 transition-colors">
                                  <Download className="h-4 w-4" />
                                </button>
                                <button className="text-white/60 hover:text-white p-1 rounded hover:bg-white/10 transition-colors">
                                  <Share className="h-4 w-4" />
                                </button>
                                <button className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-white/10 transition-colors">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Items */}
                    <div className="bg-white/5 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Action Items</h3>
                        <div className="text-white/60 text-sm">
                          {session?.actionItems.filter(item => item.isCompleted).length} of {session?.actionItems.length} completed
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        {session?.actionItems.map((item) => (
                          <div key={item.id} className="bg-white/10 rounded-lg p-3 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-1 rounded ${item.isCompleted ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                                {item.isCompleted ? (
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                ) : (
                                  <Clock className="h-4 w-4 text-yellow-400" />
                                )}
                              </div>
                              <div>
                                <p className={`text-sm ${item.isCompleted ? 'text-white/60 line-through' : 'text-white'}`}>
                                  {item.description}
                                </p>
                                {item.dueDate && (
                                  <p className="text-white/60 text-xs">
                                    Due: {formatDate(item.dueDate)}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button className="text-white/60 hover:text-white p-1 rounded hover:bg-white/10 transition-colors">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-white/10 transition-colors">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newActionItem}
                          onChange={(e) => setNewActionItem(e.target.value)}
                          placeholder="Add a new action item..."
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button 
                          onClick={handleAddActionItem}
                          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Client Interaction Tab */}
            {activeTab === 'client-interaction' && (
              <div className="space-y-6">
                {!selectedSession ? (
                  <div className="text-center py-12 bg-white/5 rounded-lg">
                    <Users className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white font-semibold text-lg mb-2">No session selected</h3>
                    <p className="text-white/70">Select a session from the Calendar & Tracking tab to manage client interactions</p>
                  </div>
                ) : (
                  <>
                    {/* Client Profile */}
                    <div className="bg-white/5 rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={session?.clientProfilePicture}
                          alt={session?.clientName}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{session?.clientName}</h3>
                          <p className="text-white/80 text-sm">{session?.clientEmail}</p>
                          <div className="flex items-center space-x-3 mt-2">
                            <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
                              <MessageCircle className="h-4 w-4" />
                              <span>Message Client</span>
                            </button>
                            <button className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300">
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Session Notes */}
                    <div className="bg-white/5 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">Session Notes</h3>
                        <button className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                          <Save className="h-4 w-4" />
                          <span>Save Notes</span>
                        </button>
                      </div>
                      
                      <textarea
                        value={session?.notes || newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Add notes about this session..."
                        rows={6}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                      />
                      
                      <button 
                        onClick={handleAddNote}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Update Notes
                      </button>
                    </div>

                    {/* Progress Tracking */}
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-white font-semibold mb-4">Progress Tracking</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-white/80">Overall Progress</label>
                            <span className="text-white/80">{session?.progress}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                              style={{ width: `${session?.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-white font-semibold">{session?.actionItems.length}</div>
                            <div className="text-white/70 text-sm">Total Action Items</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-white font-semibold">{session?.actionItems.filter(item => item.isCompleted).length}</div>
                            <div className="text-white/70 text-sm">Completed Items</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-3 text-center">
                            <div className="text-white font-semibold">{session?.materials.length}</div>
                            <div className="text-white/70 text-sm">Materials Shared</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feedback Section */}
                    {session?.status === 'completed' && (
                      <div className="bg-white/5 rounded-lg p-6">
                        <h3 className="text-white font-semibold mb-4">Client Feedback</h3>
                        
                        {session?.feedback ? (
                          <div className="bg-white/10 rounded-lg p-4">
                            <div className="flex items-center space-x-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-5 w-5 ${i < session.feedback!.rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                                />
                              ))}
                              <span className="text-white/80 ml-2">{session.feedback.rating}/5</span>
                            </div>
                            <p className="text-white/80 italic">"{session.feedback.comment}"</p>
                            <p className="text-white/60 text-xs mt-2">Received on {formatDate(session.feedback.date)}</p>
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <Star className="h-12 w-12 text-white/40 mx-auto mb-3" />
                            <p className="text-white/70">No feedback received yet</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionManagement;