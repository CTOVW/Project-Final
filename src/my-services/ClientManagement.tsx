import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MessageCircle, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  Clock, 
  Tag, 
  Edit, 
  Trash2, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  ExternalLink 
} from 'lucide-react';
import { sampleClients } from '../data/myServicesData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface ClientManagementProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
}

function ClientManagement({ 
  isAICompanionOpen, 
  aiCompanionWidth, 
  toggleAICompanion, 
  selectedRole, 
  profileData 
}: ClientManagementProps) {
  const [activeTab, setActiveTab] = useState('crm');
  const [searchQuery, setSearchQuery] = useState('');
  const [tagFilter, setTagFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newTag, setNewTag] = useState('');

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

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const tabs = [
    { id: 'crm', label: 'CRM' },
    { id: 'communication', label: 'Communication' }
  ];

  // Get all unique tags from clients
  const allTags = Array.from(new Set(sampleClients.flatMap(client => client.tags)));

  // Filter clients based on search and tag filter
  const filteredClients = sampleClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (client.company && client.company.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTag = tagFilter === 'all' || client.tags.includes(tagFilter);
    return matchesSearch && matchesTag;
  });

  // Get the selected client details
  const client = selectedClient ? sampleClients.find(c => c.id === selectedClient) : null;

  const handleAddTag = () => {
    if (newTag.trim() && client) {
      // In a real app, this would update the client in the database
      console.log('Adding tag:', newTag);
      setNewTag('');
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && client) {
      // In a real app, this would send the message and update the communication history
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleUpdateNotes = () => {
    if (client) {
      // In a real app, this would update the client notes in the database
      console.log('Updating notes:', newNote);
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
          <h1 className="text-3xl font-bold text-white mb-2">Client Management</h1>
          <p className="text-white/80">Manage your client relationships and communications</p>
        </div>

        {/* Client Management Tabs */}
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
            {/* CRM Tab */}
            {activeTab === 'crm' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Client List */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Search and Filters */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search clients..."
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-5 w-5 text-white/60" />
                      <select
                        value={tagFilter}
                        onChange={(e) => setTagFilter(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1"
                      >
                        <option value="all" className="bg-slate-800">All Tags</option>
                        {allTags.map((tag) => (
                          <option key={tag} value={tag} className="bg-slate-800">{tag}</option>
                        ))}
                      </select>
                    </div>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Add New Client</span>
                    </button>
                  </div>

                  {/* Client List */}
                  <div className="space-y-2 mt-4">
                    {filteredClients.length === 0 ? (
                      <div className="text-center py-8 bg-white/5 rounded-lg">
                        <Users className="h-12 w-12 text-white/40 mx-auto mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">No clients found</h3>
                        <p className="text-white/70">Try adjusting your search or filters</p>
                      </div>
                    ) : (
                      filteredClients.map((client) => (
                        <div 
                          key={client.id} 
                          className={`bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                            selectedClient === client.id ? 'border border-purple-300' : ''
                          }`}
                          onClick={() => setSelectedClient(client.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={client.profilePicture}
                              alt={client.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-medium text-sm truncate">{client.name}</h3>
                              {client.company && (
                                <p className="text-white/70 text-xs truncate">{client.company}</p>
                              )}
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1 text-white/60 text-xs">
                                  <Calendar className="h-3 w-3" />
                                  <span>{formatTimeAgo(client.lastInteraction)}</span>
                                </div>
                                {client.activeSessions > 0 && (
                                  <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full text-xs">
                                    {client.activeSessions} active
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Client Details */}
                <div className="lg:col-span-2 space-y-6">
                  {!selectedClient ? (
                    <div className="text-center py-12 bg-white/5 rounded-lg">
                      <Users className="h-16 w-16 text-white/40 mx-auto mb-4" />
                      <h3 className="text-white font-semibold text-lg mb-2">No client selected</h3>
                      <p className="text-white/70">Select a client from the list to view details</p>
                    </div>
                  ) : (
                    <>
                      {/* Client Profile */}
                      <div className="bg-white/5 rounded-lg p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={client?.profilePicture}
                            alt={client?.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h2 className="text-white font-semibold text-xl">{client?.name}</h2>
                                {client?.company && client?.title && (
                                  <p className="text-white/80">{client.title} at {client.company}</p>
                                )}
                                {client?.location && (
                                  <p className="text-white/60 text-sm">{client.location}</p>
                                )}
                              </div>
                              <div className="flex space-x-2">
                                <button className="bg-white/10 text-white border border-white/20 p-2 rounded-lg hover:bg-white/20 transition-all duration-300">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="bg-red-500/20 text-red-300 border border-red-500/30 p-2 rounded-lg hover:bg-red-500/30 transition-all duration-300">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              {client?.tags.map((tag) => (
                                <span 
                                  key={tag} 
                                  className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                              <button 
                                onClick={() => setNewTag('New Tag')}
                                className="bg-white/10 text-white/70 hover:text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1"
                              >
                                <Plus className="h-3 w-3" />
                                <span>Add Tag</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                          <a 
                            href={`mailto:${client?.email}`} 
                            className="flex items-center space-x-2 bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-colors"
                          >
                            <Mail className="h-5 w-5 text-blue-300" />
                            <span className="text-white/80 text-sm truncate">{client?.email}</span>
                          </a>
                          
                          {client?.phone && (
                            <a 
                              href={`tel:${client?.phone}`} 
                              className="flex items-center space-x-2 bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-colors"
                            >
                              <Phone className="h-5 w-5 text-green-300" />
                              <span className="text-white/80 text-sm">{client?.phone}</span>
                            </a>
                          )}
                          
                          <button className="flex items-center space-x-2 bg-white/10 rounded-lg p-3 hover:bg-white/15 transition-colors">
                            <Calendar className="h-5 w-5 text-purple-300" />
                            <span className="text-white/80 text-sm">Schedule Meeting</span>
                          </button>
                        </div>
                      </div>

                      {/* Client Stats */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-white mb-1">{client?.totalSessions}</div>
                          <div className="text-white/70 text-sm">Total Sessions</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-white mb-1">{client?.activeSessions}</div>
                          <div className="text-white/70 text-sm">Active Sessions</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-white mb-1">{formatCurrency(client?.totalSpent || 0)}</div>
                          <div className="text-white/70 text-sm">Total Spent</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-white mb-1">{formatTimeAgo(client?.firstInteraction || new Date())}</div>
                          <div className="text-white/70 text-sm">Client Since</div>
                        </div>
                      </div>

                      {/* Services Used */}
                      <div className="bg-white/5 rounded-lg p-6">
                        <h3 className="text-white font-semibold mb-4">Services Used</h3>
                        
                        {client?.servicesUsed.length === 0 ? (
                          <div className="text-center py-6">
                            <FileText className="h-12 w-12 text-white/40 mx-auto mb-3" />
                            <p className="text-white/70">No services used yet</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {client?.servicesUsed.map((service, index) => (
                              <div key={index} className="bg-white/10 rounded-lg p-3">
                                <h4 className="text-white font-medium">{service}</h4>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Client Notes */}
                      <div className="bg-white/5 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-white font-semibold">Client Notes</h3>
                          <button 
                            onClick={handleUpdateNotes}
                            className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300"
                          >
                            Update Notes
                          </button>
                        </div>
                        
                        <textarea
                          value={client?.notes || newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          placeholder="Add notes about this client..."
                          rows={5}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Client List (same as CRM tab) */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Search and Filters */}
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search clients..."
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="h-5 w-5 text-white/60" />
                      <select
                        value={tagFilter}
                        onChange={(e) => setTagFilter(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1"
                      >
                        <option value="all" className="bg-slate-800">All Tags</option>
                        {allTags.map((tag) => (
                          <option key={tag} value={tag} className="bg-slate-800">{tag}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Client List */}
                  <div className="space-y-2 mt-4">
                    {filteredClients.length === 0 ? (
                      <div className="text-center py-8 bg-white/5 rounded-lg">
                        <Users className="h-12 w-12 text-white/40 mx-auto mb-3" />
                        <h3 className="text-white font-semibold text-lg mb-2">No clients found</h3>
                        <p className="text-white/70">Try adjusting your search or filters</p>
                      </div>
                    ) : (
                      filteredClients.map((client) => (
                        <div 
                          key={client.id} 
                          className={`bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-all duration-300 cursor-pointer ${
                            selectedClient === client.id ? 'border border-purple-300' : ''
                          }`}
                          onClick={() => setSelectedClient(client.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={client.profilePicture}
                              alt={client.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-medium text-sm truncate">{client.name}</h3>
                              {client.company && (
                                <p className="text-white/70 text-xs truncate">{client.company}</p>
                              )}
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center space-x-1 text-white/60 text-xs">
                                  <MessageCircle className="h-3 w-3" />
                                  <span>{formatTimeAgo(client.lastInteraction)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Communication History */}
                <div className="lg:col-span-2 space-y-6">
                  {!selectedClient ? (
                    <div className="text-center py-12 bg-white/5 rounded-lg">
                      <MessageCircle className="h-16 w-16 text-white/40 mx-auto mb-4" />
                      <h3 className="text-white font-semibold text-lg mb-2">No client selected</h3>
                      <p className="text-white/70">Select a client from the list to view communication history</p>
                    </div>
                  ) : (
                    <>
                      {/* Client Header */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={client?.profilePicture}
                            alt={client?.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h2 className="text-white font-semibold">{client?.name}</h2>
                            {client?.company && client?.title && (
                              <p className="text-white/80 text-sm">{client.title} at {client.company}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Message Composer */}
                      <div className="bg-white/5 rounded-lg p-6">
                        <h3 className="text-white font-semibold mb-4">Send Message</h3>
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message here..."
                          rows={4}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button className="text-white/60 hover:text-white p-2 rounded hover:bg-white/10 transition-colors">
                              <Plus className="h-5 w-5" />
                            </button>
                            <button className="text-white/60 hover:text-white p-2 rounded hover:bg-white/10 transition-colors">
                              <FileText className="h-5 w-5" />
                            </button>
                            <button className="text-white/60 hover:text-white p-2 rounded hover:bg-white/10 transition-colors">
                              <Calendar className="h-5 w-5" />
                            </button>
                          </div>
                          <button 
                            onClick={handleSendMessage}
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>Send Message</span>
                          </button>
                        </div>
                      </div>

                      {/* Communication History */}
                      <div className="bg-white/5 rounded-lg p-6">
                        <h3 className="text-white font-semibold mb-4">Communication History</h3>
                        
                        {client?.communicationHistory.length === 0 ? (
                          <div className="text-center py-6">
                            <MessageCircle className="h-12 w-12 text-white/40 mx-auto mb-3" />
                            <p className="text-white/70">No communication history yet</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {client?.communicationHistory.sort((a, b) => b.date.getTime() - a.date.getTime()).map((comm) => (
                              <div key={comm.id} className="bg-white/10 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <div className={`p-2 rounded-lg ${
                                      comm.type === 'email' ? 'bg-blue-500/20' :
                                      comm.type === 'call' ? 'bg-green-500/20' :
                                      comm.type === 'message' ? 'bg-purple-500/20' :
                                      'bg-yellow-500/20'
                                    }`}>
                                      {comm.type === 'email' ? (
                                        <Mail className="h-4 w-4 text-blue-300" />
                                      ) : comm.type === 'call' ? (
                                        <Phone className="h-4 w-4 text-green-300" />
                                      ) : comm.type === 'message' ? (
                                        <MessageCircle className="h-4 w-4 text-purple-300" />
                                      ) : (
                                        <Calendar className="h-4 w-4 text-yellow-300" />
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="text-white font-medium text-sm">
                                        {comm.type.charAt(0).toUpperCase() + comm.type.slice(1)}
                                      </h4>
                                      <p className="text-white/60 text-xs">{formatDate(comm.date)}</p>
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
                                
                                <p className="text-white/80 text-sm">{comm.summary}</p>
                                
                                {comm.followUp && comm.followUp.required && (
                                  <div className={`mt-3 p-2 rounded-lg ${
                                    comm.followUp.completed ? 'bg-green-500/20' : 'bg-yellow-500/20'
                                  }`}>
                                    <div className="flex items-start space-x-2">
                                      {comm.followUp.completed ? (
                                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />
                                      ) : (
                                        <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                                      )}
                                      <div>
                                        <p className={`text-sm ${
                                          comm.followUp.completed ? 'text-green-300' : 'text-yellow-300'
                                        }`}>
                                          {comm.followUp.completed ? 'Completed' : 'Follow-up Required'}
                                        </p>
                                        {comm.followUp.description && (
                                          <p className="text-white/80 text-xs">{comm.followUp.description}</p>
                                        )}
                                        {comm.followUp.dueDate && !comm.followUp.completed && (
                                          <p className="text-white/60 text-xs">Due: {formatDate(comm.followUp.dueDate)}</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientManagement;