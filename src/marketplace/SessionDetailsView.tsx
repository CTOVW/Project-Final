import React, { useState } from 'react';
import { 
  ArrowLeft,
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageCircle, 
  FileText, 
  Users, 
  Download, 
  Send,
  Star,
  Brain
} from 'lucide-react';
import { sampleSessions } from '../data/expertsData';
import GlobalNavigation from '../components/GlobalNavigation';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface SessionDetailsViewProps {
  sessionId: string;
  onBack: () => void;
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
}

function SessionDetailsView({ 
  sessionId, 
  onBack, 
  isAICompanionOpen, 
  aiCompanionWidth, 
  toggleAICompanion, 
  selectedRole, 
  profileData 
}: SessionDetailsViewProps) {
  const [newMessage, setNewMessage] = useState('');
  const [newNote, setNewNote] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Find the session by ID
  const session = sampleSessions.find(s => s.id === sessionId);

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col">
        <GlobalNavigation 
          activeMainTab="expert-marketplace"
          setActiveMainTab={() => {}}
          profileData={profileData}
        />
        <div className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Session Not Found</h2>
            <p className="text-white/70 mb-6">The session you're looking for could not be found.</p>
            <button
              onClick={onBack}
              className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Sessions
            </button>
          </div>
        </div>
      </div>
    );
  }

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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleUpdateNotes = () => {
    if (newNote.trim()) {
      // In a real app, this would update the session notes
      console.log('Updating notes:', newNote);
    }
  };

  const handleSubmitFeedback = () => {
    if (feedbackComment.trim()) {
      // In a real app, this would submit the feedback
      console.log('Submitting feedback:', { rating: feedbackRating, comment: feedbackComment });
      setFeedbackComment('');
    }
  };

  const detailTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'materials', label: 'Materials & Notes' },
    { id: 'communication', label: 'Communication' },
    { id: 'feedback', label: 'Feedback' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalNavigation 
        activeMainTab="expert-marketplace"
        setActiveMainTab={() => {}}
        profileData={profileData}
      />

      <div className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div 
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          style={{ 
            marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
          }}
        >
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Sessions</span>
          </button>

          {/* Session Header */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-4">
              <img
                src={session.clientProfilePicture}
                alt={session.clientName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-white mb-2">{session.serviceName}</h1>
                    <p className="text-white/80">with {session.clientName}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
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
                    <div className="text-white font-semibold">${session.price}</div>
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

          {/* Session Detail Tabs */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
            <div className="border-b border-white/20">
              <div className="flex">
                {detailTabs.map((tab) => (
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
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {session.nextMilestone && (
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                      <h3 className="text-blue-300 font-semibold text-lg mb-2">Next Milestone</h3>
                      <p className="text-white/80">{session.nextMilestone}</p>
                    </div>
                  )}

                  {/* Action Items */}
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">Action Items</h3>
                    
                    {session.actionItems.length === 0 ? (
                      <div className="text-center py-6">
                        <CheckCircle className="h-12 w-12 text-white/40 mx-auto mb-3" />
                        <p className="text-white/70">No action items yet</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {session.actionItems.map((item, index) => (
                          <div key={index} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${item.isCompleted ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                                {item.isCompleted ? (
                                  <CheckCircle className="h-5 w-5 text-green-300" />
                                ) : (
                                  <Clock className="h-5 w-5 text-yellow-300" />
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
                              <button className={`px-3 py-1 rounded-lg text-xs ${
                                item.isCompleted 
                                  ? 'bg-white/10 text-white/60' 
                                  : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                              }`}>
                                {item.isCompleted ? 'Completed' : 'Mark Complete'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Session Details */}
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">Session Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white/70 text-sm mb-2">Client Information</h4>
                        <div className="bg-white/10 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <img
                              src={session.clientProfilePicture}
                              alt={session.clientName}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <h5 className="text-white font-medium">{session.clientName}</h5>
                              <p className="text-white/60 text-xs">{session.clientEmail}</p>
                            </div>
                          </div>
                          <button className="w-full bg-white/10 text-white hover:bg-white/20 px-3 py-2 rounded-lg text-sm transition-colors">
                            View Client Profile
                          </button>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-white/70 text-sm mb-2">Session Information</h4>
                        <div className="bg-white/10 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-white/70">Session Type</span>
                            <span className="text-white">{session.sessionType}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Format</span>
                            <span className="text-white">{session.format}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Duration</span>
                            <span className="text-white">{session.duration}</span>
                          </div>
                          {session.location && (
                            <div className="flex justify-between">
                              <span className="text-white/70">Location</span>
                              <span className="text-white">{session.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Session Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {session.status === 'scheduled' && (
                        <>
                          <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300">
                            Start Session
                          </button>
                          <button className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-300">
                            Reschedule
                          </button>
                        </>
                      )}
                      {session.status === 'in-progress' && (
                        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                          Continue Session
                        </button>
                      )}
                    </div>
                    {session.status !== 'completed' && session.status !== 'cancelled' && (
                      <button className="bg-red-500/20 text-red-300 border border-red-500/30 px-4 py-2 rounded-lg font-medium hover:bg-red-500/30 transition-all duration-300">
                        Cancel Session
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Materials & Notes Tab */}
              {activeTab === 'materials' && (
                <div className="space-y-6">
                  {/* Session Materials */}
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">Session Materials</h3>
                    
                    {session.materials.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="h-16 w-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-lg mb-2">No materials yet</h3>
                        <p className="text-white/70">No materials have been uploaded for this session yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {session.materials.map((material) => (
                          <div key={material.id} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-5 w-5 text-white/60" />
                              <div>
                                <h4 className="text-white font-medium">{material.name}</h4>
                                <p className="text-white/60 text-xs">{material.type} • {material.uploadDate.toLocaleDateString()}</p>
                              </div>
                            </div>
                            <button className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>Upload New Material</span>
                      </button>
                    </div>
                  </div>

                  {/* Session Notes */}
                  <div className="bg-white/5 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold text-lg">Session Notes</h3>
                      <button 
                        onClick={handleUpdateNotes}
                        className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300"
                      >
                        Update Notes
                      </button>
                    </div>
                    
                    <textarea
                      value={session.notes || newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add notes about this session..."
                      rows={6}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                    />
                  </div>
                </div>
              )}

              {/* Communication Tab */}
              {activeTab === 'communication' && (
                <div className="space-y-6">
                  {/* Message History */}
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">Communication History</h3>
                    
                    <div className="h-64 overflow-y-auto bg-white/10 rounded-lg p-4 mb-4">
                      <div className="space-y-4">
                        <div className="flex justify-start">
                          <div className="bg-white/10 text-white rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">Hello! I'm looking forward to our session. I've prepared some questions about the project.</p>
                            <p className="text-xs opacity-70 mt-1">10:30 AM</p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">Great! I'm excited to help. Feel free to share your questions and we can address them during our session.</p>
                            <p className="text-xs opacity-70 mt-1">10:35 AM</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-white/10 text-white rounded-lg p-3 max-w-[80%]">
                            <p className="text-sm">Perfect! I'll send over the document with my questions shortly.</p>
                            <p className="text-xs opacity-70 mt-1">10:40 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-end space-x-3">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write your message..."
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                        rows={3}
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="text-white/70 text-sm mb-2">Email</h4>
                        <p className="text-white">{session.clientEmail}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <h4 className="text-white/70 text-sm mb-2">Preferred Contact Method</h4>
                        <p className="text-white">In-app messaging</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Tab */}
              {activeTab === 'feedback' && (
                <div className="space-y-6">
                  {/* Existing Feedback */}
                  {session.feedback ? (
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-white font-semibold text-lg mb-4">Client Feedback</h3>
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
                    </div>
                  ) : (
                    <div className="bg-white/5 rounded-lg p-6">
                      <h3 className="text-white font-semibold text-lg mb-4">Request Feedback</h3>
                      <p className="text-white/70 mb-4">No feedback has been received for this session yet.</p>
                      <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                        Request Feedback
                      </button>
                    </div>
                  )}

                  {/* Submit Feedback (if you're the client) */}
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-white font-semibold text-lg mb-4">Submit Feedback</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Rating</label>
                        <div className="flex items-center space-x-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              onClick={() => setFeedbackRating(rating)}
                              className="transition-colors"
                            >
                              <Star 
                                className={`h-6 w-6 ${rating <= feedbackRating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-white/70 text-sm mb-2">Comments</label>
                        <textarea
                          value={feedbackComment}
                          onChange={(e) => setFeedbackComment(e.target.value)}
                          placeholder="Share your experience..."
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                          rows={4}
                        />
                      </div>
                      <button 
                        onClick={handleSubmitFeedback}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                      >
                        Submit Feedback
                      </button>
                    </div>
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

export default SessionDetailsView;