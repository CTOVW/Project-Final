import React, { useState } from 'react';
import {
  ArrowLeft,
  FileText,
  MessageCircle,
  Calendar,
  X,
  CheckCircle,
  Download,
  Edit
} from 'lucide-react';
import { PipelineDeal } from '../data/myInvestmentsData';

interface DealClosingProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  selectedDeal: PipelineDeal | null;
  onBack: () => void;
}

function DealClosing({
  isAICompanionOpen,
  aiCompanionWidth,
  selectedDeal,
  onBack
}: DealClosingProps) {
  const [messageContent, setMessageContent] = useState('');
  const [agreementGenerated, setAgreementGenerated] = useState(false);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const handleGenerateAgreement = () => {
    setAgreementGenerated(true);
  };

  if (!selectedDeal) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">No Deal Selected</h2>
        <p className="text-white/70 mb-6">Please select a deal from the pipeline to view closing details</p>
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
          </div>
        </div>
      </div>

      {/* Agreement Generation */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Agreement Generation</h2>
        
        {!agreementGenerated ? (
          <div className="text-center py-8">
            <FileText className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <p className="text-white/70 mb-6">Generate the investment agreement based on the negotiated terms</p>
            <button 
              onClick={handleGenerateAgreement}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Generate Agreement
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Investment Agreement</h3>
                <div className="flex items-center space-x-3">
                  <button className="text-white/70 hover:text-white transition-colors">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button className="text-white/70 hover:text-white transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-white/80 text-sm">
                <p className="mb-2">This INVESTMENT AGREEMENT (the "Agreement") is made and entered into as of [DATE], by and between:</p>
                <p className="mb-2">1. {selectedDeal.ventureName}, a [ENTITY TYPE] (the "Company")</p>
                <p className="mb-2">2. [INVESTOR NAME], (the "Investor")</p>
                <p className="mb-4">WHEREAS, the Company is engaged in [BUSINESS DESCRIPTION]; and WHEREAS, the Investor desires to invest in the Company...</p>
                <p className="text-white/60 italic">Full agreement text would appear here...</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Closing Checklist</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-white/80">Investment Agreement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-white/80">Board Approval</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border border-white/30 rounded-full"></div>
                    <span className="text-white/80">Shareholder Approval</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border border-white/30 rounded-full"></div>
                    <span className="text-white/80">Wire Transfer</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 border border-white/30 rounded-full"></div>
                    <span className="text-white/80">Share Certificate</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6">
                <h3 className="text-white font-semibold mb-4">Digital Signature</h3>
                <p className="text-white/70 mb-4">Sign the agreement electronically to complete the investment process.</p>
                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 w-full">
                  Sign Agreement
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Founder Communication */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Founder Communication</h2>
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
            <p className="text-white/70 mb-4">Schedule a call with the founder to discuss closing details.</p>
            <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Request Meeting</span>
            </button>
          </div>
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
            <span>Proceed to Signature</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DealClosing;