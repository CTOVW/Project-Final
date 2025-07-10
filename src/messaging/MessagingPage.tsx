import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Filter,
  MessageCircle,
  Paperclip,
  Send,
  MoreVertical,
  Star,
  Archive,
  Trash2,
  AlertTriangle,
  Brain
} from 'lucide-react';
import { sampleConversations, sampleMessages } from '../data/messagingData';
import GlobalNavigation from '../components/GlobalNavigation';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  country: string;
  language: string;
  currentOccupation: string;
  yearsExperience: string;
  entrepreneurialExperience: string;
  industryExpertise: string;
  marketExpertise: string;
  keySkills: string;
  company: string;
  companyLinkedin: string;
  companyType: string;
  industryFocus: string;
  origin: string;
  companySize: string;
  portfolioSize: string;
  headquarters: string;
  operatingMarkets: string;
  targetClients: string;
  keyCapabilities: string;
}

interface MessagingPageProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging') => void;
  selectedAICompanion: string;
  onAgentChange: (agent: string) => void;
}

function MessagingPage({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  selectedRole,
  profileData,
  activeMainTab,
  setActiveMainTab,
  selectedAICompanion,
  onAgentChange
}: MessagingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [messageFilter, setMessageFilter] = useState('messages');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showMessageActions, setShowMessageActions] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update AI agent when component loads
  useEffect(() => {
    onAgentChange('communication-assistant');
  }, [onAgentChange]);

  const filterOptions = [
    { id: 'messages', label: 'Messages' },
    { id: 'archived', label: 'Archived' },
    { id: 'spam', label: 'Spam' }
  ];

  const filteredConversations = sampleConversations.filter(conversation => {
    const matchesSearch = conversation.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const selectedConversationData = selectedConversation 
    ? sampleConversations.find(conv => conv.id === selectedConversation)
    : null;

  const conversationMessages = selectedConversation 
    ? sampleMessages[selectedConversation] || []
    : [];

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Navigation */}
      <GlobalNavigation 
        activeMainTab={activeMainTab}
        setActiveMainTab={setActiveMainTab}
        profileData={profileData}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Main Content */}
        <div 
          className="flex-1 transition-all duration-300"
          style={{ 
            marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
          }}
        >
          <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
            {/* Left Sidebar - Conversations List */}
            <div className="w-1/3 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-r border-white/20 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-bold text-white">Messaging</h1>
                  <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-2 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search messages"
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Filters */}
                <select
                  value={messageFilter}
                  onChange={(e) => setMessageFilter(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {filterOptions.map((option) => (
                    <option key={option.id} value={option.id} className="bg-slate-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-white/10' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.participantProfilePicture}
                          alt={conversation.participantName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-medium text-sm truncate">
                            {conversation.participantName}
                          </h3>
                          <span className="text-white/60 text-xs">
                            {formatMessageTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                        <p className="text-white/70 text-xs mb-1 truncate">
                          {conversation.participantTitle}
                        </p>
                        <p className="text-white/60 text-sm truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <div className="mt-2">
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                              {conversation.unreadCount}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversationData ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/20 bg-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={selectedConversationData.participantProfilePicture}
                            alt={selectedConversationData.participantName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {selectedConversationData.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">
                            {selectedConversationData.participantName}
                          </h3>
                          <p className="text-white/70 text-sm">
                            {selectedConversationData.participantTitle}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
                        <button
                          onClick={() => setShowMessageActions(!showMessageActions)}
                          className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        {showMessageActions && (
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-10">
                            <div className="py-2">
                              <button className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-2">
                                <MessageCircle className="h-4 w-4" />
                                <span>Mark Unread</span>
                              </button>
                              <button className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-2">
                                <Star className="h-4 w-4" />
                                <span>Star</span>
                              </button>
                              <button className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-2">
                                <Archive className="h-4 w-4" />
                                <span>Archive</span>
                              </button>
                              <button className="w-full text-left px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors flex items-center space-x-2">
                                <AlertTriangle className="h-4 w-4" />
                                <span>Mark Spam</span>
                              </button>
                              <button className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors flex items-center space-x-2">
                                <Trash2 className="h-4 w-4" />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {conversationMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${
                          message.senderId === 'current-user'
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                            : 'bg-white/10 text-white border border-white/20'
                        } rounded-lg p-3`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {formatMessageTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-white/20 bg-white/5">
                    <div className="flex items-end space-x-3">
                      <button className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <div className="flex-1">
                        <textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Write a message..."
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                          rows={1}
                        />
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white font-semibold text-xl mb-2">Select a conversation</h3>
                    <p className="text-white/70">Choose a conversation from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AI Companion Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleAICompanion}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <Brain className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default MessagingPage;