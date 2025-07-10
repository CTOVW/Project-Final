import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  Building2,
  BarChart3,
  Users,
  TrendingUp,
  Target,
  DollarSign,
  Brain,
  MessageCircle,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  X
} from 'lucide-react';
import { sampleDueDiligenceItems } from '../data/myInvestmentsData';
import { PipelineDeal } from '../data/myInvestmentsData';

interface DealDueDiligenceProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  selectedDeal: PipelineDeal | null;
  onBack: () => void;
}

function DealDueDiligence({
  isAICompanionOpen,
  aiCompanionWidth,
  selectedDeal,
  onBack
}: DealDueDiligenceProps) {
  const [activeDDTab, setActiveDDTab] = useState('information-memo');
  const [messageContent, setMessageContent] = useState('');

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const ddTabs = [
    { id: 'information-memo', label: 'Information Memo', icon: FileText },
    { id: 'business-model', label: 'Business Model & Strategy', icon: Building2 },
    { id: 'market-analysis', label: 'Market Analysis', icon: BarChart3 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'traction', label: 'Traction', icon: TrendingUp },
    { id: 'projections', label: 'Projections', icon: Target },
    { id: 'round-dynamics', label: 'Round Dynamics', icon: DollarSign },
    { id: 'scoring', label: 'Scoring & Risk Assessment', icon: Brain },
    { id: 'founder-communication', label: 'Founder Communication', icon: MessageCircle }
  ];

  if (!selectedDeal) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
        <AlertCircle className="h-16 w-16 text-white/40 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Deal Selected</h2>
        <p className="text-white/70 mb-6">Please select a deal from the pipeline to view due diligence details</p>
        <button
          onClick={onBack}
          className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Pipeline
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Deal Info Header */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <img
            src={selectedDeal.logo}
            alt={selectedDeal.ventureName}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">{selectedDeal.ventureName}</h1>
                <div className="flex items-center space-x-4 text-sm text-white/70">
                  <span>{selectedDeal.industry}</span>
                  <span>{selectedDeal.stage}</span>
                  <span>{formatCurrency(selectedDeal.amount)}</span>
                </div>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  selectedDeal.status === 'New' ? 'bg-green-500/20 text-green-300' :
                  selectedDeal.status === 'In Review' ? 'bg-blue-500/20 text-blue-300' :
                  selectedDeal.status === 'Active' ? 'bg-purple-500/20 text-purple-300' :
                  selectedDeal.status === 'Negotiating' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {selectedDeal.status}
                </span>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="text-white/60">Due Diligence Progress</div>
                <div className="text-white/80">{selectedDeal.progress}%</div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                  style={{ width: `${selectedDeal.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Due Diligence Tabs */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
        <div className="border-b border-white/20">
          <div className="flex overflow-x-auto">
            {ddTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDDTab(tab.id)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                    activeDDTab === tab.id
                      ? 'bg-white/10 text-white border-b-2 border-purple-300'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Information Memo Tab */}
          {activeDDTab === 'information-memo' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Information Memorandum</h2>
              <div className="bg-white/5 rounded-lg p-6 text-center">
                <FileText className="h-16 w-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/70 mb-6">Information memorandum would be displayed here</p>
                <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                  View Information Memo
                </button>
              </div>
              
              <h3 className="text-white font-semibold mt-8 mb-4">Due Diligence Checklist</h3>
              <div className="space-y-3">
                {sampleDueDiligenceItems.map((item) => (
                  <div key={item.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          item.status === 'completed' ? 'bg-green-500/20' :
                          item.status === 'in-progress' ? 'bg-blue-500/20' :
                          item.status === 'flagged' ? 'bg-red-500/20' :
                          'bg-yellow-500/20'
                        }`}>
                          {item.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-300" />
                          ) : item.status === 'in-progress' ? (
                            <Clock className="h-5 w-5 text-blue-300" />
                          ) : item.status === 'flagged' ? (
                            <AlertCircle className="h-5 w-5 text-red-300" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-300" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{item.item}</h4>
                          <p className="text-white/60 text-sm">{item.category}</p>
                          {item.notes && (
                            <p className="text-white/70 text-sm mt-1">{item.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {item.assignedTo && (
                          <p className="text-white/60 text-sm">{item.assignedTo}</p>
                        )}
                        {item.dueDate && (
                          <p className="text-white/60 text-sm">Due: {item.dueDate.toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business Model Tab */}
          {activeDDTab === 'business-model' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Business Model & Strategy</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Business Model</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-purple-300 font-medium mb-2">WHO</h4>
                      <p className="text-white/80">Target customers and market segments</p>
                    </div>
                    <div>
                      <h4 className="text-blue-300 font-medium mb-2">WHAT</h4>
                      <p className="text-white/80">Value proposition and offering</p>
                    </div>
                    <div>
                      <h4 className="text-green-300 font-medium mb-2">HOW</h4>
                      <p className="text-white/80">Revenue model and delivery mechanism</p>
                    </div>
                    <div>
                      <h4 className="text-yellow-300 font-medium mb-2">WHY</h4>
                      <p className="text-white/80">Market need and differentiation</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Strategy Roadmap</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Short-term (6-12 months)</h4>
                      <p className="text-white/80">Key milestones and objectives</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Medium-term (1-2 years)</h4>
                      <p className="text-white/80">Growth and expansion plans</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Long-term (3-5 years)</h4>
                      <p className="text-white/80">Vision and strategic positioning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Market Analysis Tab */}
          {activeDDTab === 'market-analysis' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Market Analysis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Market Segmentation</h3>
                  <p className="text-white/80">Detailed breakdown of market segments and target customers</p>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Market Size</h3>
                  <p className="text-white/80">TAM, SAM, and SOM analysis with growth projections</p>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Market Behavior</h3>
                  <p className="text-white/80">Customer adoption patterns, buying behavior, and market trends</p>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Competitive Landscape</h3>
                  <p className="text-white/80">Analysis of direct and indirect competitors, market positioning</p>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeDDTab === 'founder-communication' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Founder Communication</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Send Message</h3>
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Write your message to the founder..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={4}
                  />
                  <button className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                    Send Message
                  </button>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4">Request a Meeting</h3>
                  <p className="text-white/70 mb-4">Schedule a call with the founder to discuss the opportunity in detail.</p>
                  <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Request Meeting</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Pipeline</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <button className="bg-red-500/20 text-red-300 border border-red-500/30 px-6 py-3 rounded-lg font-medium hover:bg-red-500/30 transition-all duration-300 flex items-center space-x-2">
            <X className="h-4 w-4" />
            <span>Pass</span>
          </button>
          <button className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-300">
            <span>Save Draft</span>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
            <span>Proceed to Deal Terms</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DealDueDiligence;