import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Calendar,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Brain
} from 'lucide-react';
import { sampleSessions, sampleExperts, sampleServices } from '../data/expertsData';
import GlobalNavigation from '../components/GlobalNavigation';
import SessionDetailsView from './SessionDetailsView';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface SessionsScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
}

function SessionsScreen({ selectedRole, profileData, toggleAICompanion }: SessionsScreenProps) {
  const [activeTab, setActiveTab] = useState('active-sessions');
  const [viewingDetailsSessionId, setViewingDetailsSessionId] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sessionTabs = [
    { id: 'active-sessions', label: 'Active sessions' },
    { id: 'session-history', label: 'Session history' }, 
    { id: 'upcoming-appointments', label: 'Upcoming appointments' }
  ];

  const activeSessions = sampleSessions.filter(session => session.status === 'active');
  const completedSessions = sampleSessions.filter(session => session.status === 'completed');
  const upcomingSessions = sampleSessions.filter(session => session.status === 'scheduled');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getExpertById = (expertId: string) => {
    return sampleExperts.find(expert => expert.id === expertId);
  };

  const getServiceById = (serviceId: string) => {
    return sampleServices.find(service => service.id === serviceId);
  };

  // If viewing session details, render the SessionDetailsView component
  if (viewingDetailsSessionId) {
    return (
      <SessionDetailsView
        sessionId={viewingDetailsSessionId}
        onBack={() => setViewingDetailsSessionId(null)}
        isAICompanionOpen={isAICompanionOpen}
        aiCompanionWidth={aiCompanionWidth}
        toggleAICompanion={toggleAICompanion}
        selectedRole={selectedRole}
        profileData={profileData}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Navigation */}
      <GlobalNavigation 
        activeMainTab="expert-marketplace"
        setActiveMainTab={() => {}}
        profileData={profileData}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <button 
                  onClick={() => window.history.back()}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Marketplace</span>
                </button>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Sessions Management</h1>
              <p className="text-white/80">Manage your active sessions and track progress</p>
            </div>

            {/* Session Tabs */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
              <div className="border-b border-white/20">
                <div className="flex overflow-x-auto">
                  {sessionTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-shrink-0 px-6 py-4 font-medium transition-colors whitespace-nowrap ${
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

              <div className="p-8">
                {/* Active Sessions Tab */}
                {activeTab === 'active-sessions' && (
                  <div className="space-y-6">
                    {activeSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-xl mb-2">No active sessions</h3>
                        <p className="text-white/70">You don't have any active sessions at the moment</p>
                      </div>
                    ) : (
                      activeSessions.map((session) => {
                        const expert = getExpertById(session.expertId);
                        const service = getServiceById(session.serviceId);
                        
                        return (
                          <div key={session.id} className="bg-white/5 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                              {expert && (
                                <img
                                  src={expert.profilePicture}
                                  alt={expert.name}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex items-start justify-between mb-3">
                                  <div>
                                    <h3 className="text-white font-semibold text-lg">{service?.serviceName}</h3>
                                    <p className="text-white/80">with {expert?.name}</p>
                                    <p className="text-white/60 text-sm">Started {formatDate(session.startDate)}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-green-400 font-semibold">{session.progress}% Complete</div>
                                    <div className="w-24 bg-white/20 rounded-full h-2 mt-1">
                                      <div 
                                        className="bg-green-500 h-2 rounded-full" 
                                        style={{ width: `${session.progress}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                                
                                {session.nextMilestone && (
                                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 mb-4">
                                    <h4 className="text-blue-300 font-semibold text-sm mb-1">Next Milestone</h4>
                                    <p className="text-white/80 text-sm">{session.nextMilestone}</p>
                                  </div>
                                )}

                                {session.actionItems.length > 0 && (
                                  <div className="mb-4">
                                    <h4 className="text-white font-semibold text-sm mb-2">Action Items</h4>
                                    <ul className="space-y-1">
                                      {session.actionItems.map((item, index) => (
                                        <li key={index} className="flex items-start space-x-2">
                                          <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                          <span className="text-white/80 text-sm">{item}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                <div className="flex items-center space-x-4">
                                  <button 
                                    onClick={() => setViewingDetailsSessionId(session.id)}
                                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
                                  >
                                    {session.status === 'scheduled' ? 'Prepare Session' : 'Continue Session'}
                                  </button>
                                  <button 
                                    onClick={() => setViewingDetailsSessionId(session.id)}
                                    className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300"
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Session History Tab */}
                {activeTab === 'session-history' && (
                  <div className="space-y-6">
                    {completedSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <Clock className="h-16 w-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-xl mb-2">No completed sessions</h3>
                        <p className="text-white/70">Your completed sessions will appear here</p>
                      </div>
                    ) : (
                      completedSessions.map((session) => {
                        const expert = getExpertById(session.expertId);
                        const service = getServiceById(session.serviceId);
                        
                        return (
                          <div key={session.id} className="bg-white/5 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                              {expert && (
                                <img
                                  src={expert.profilePicture}
                                  alt={expert.name}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">{service?.serviceName}</h3>
                                <p className="text-white/80">with {expert?.name}</p>
                                <p className="text-white/60 text-xs">
                                  {formatDate(session.startDate)} - {session.endDate ? formatDate(session.endDate) : 'Ongoing'}
                                </p>
                                <div className="mt-3">
                                  <button 
                                    onClick={() => setViewingDetailsSessionId(session.id)}
                                    className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300"
                                  >
                                    View Details
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}

                {/* Upcoming Appointments Tab */}
                {activeTab === 'upcoming-appointments' && (
                  <div className="space-y-6">
                    {upcomingSessions.length === 0 ? (
                      <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-xl mb-2">No upcoming appointments</h3>
                        <p className="text-white/70">Your scheduled appointments will appear here</p>
                      </div>
                    ) : (
                      upcomingSessions.map((session) => {
                        const expert = getExpertById(session.expertId);
                        const service = getServiceById(session.serviceId);
                        
                        return (
                          <div key={session.id} className="bg-white/5 rounded-lg p-6">
                            <div className="flex items-start space-x-4">
                              {expert && (
                                <img
                                  src={expert.profilePicture}
                                  alt={expert.name}
                                  className="w-16 h-16 rounded-full object-cover"
                                />
                              )}
                              <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg">{service?.serviceName}</h3>
                                <p className="text-white/80">with {expert?.name}</p>
                                <p className="text-white/60 text-xs mt-1">{formatDate(session.startDate)}</p>
                              </div>
                              <div className="flex items-center space-x-3">
                                <button 
                                  onClick={() => setViewingDetailsSessionId(session.id)}
                                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                                >
                                  Join Session
                                </button>
                                <button 
                                  onClick={() => setViewingDetailsSessionId(session.id)}
                                  className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300"
                                >
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
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

export default SessionsScreen;