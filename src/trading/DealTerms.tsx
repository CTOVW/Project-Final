import React, { useState } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Calendar,
  X
} from 'lucide-react';
import { sampleDealTerms } from '../data/myInvestmentsData';
import { PipelineDeal } from '../data/myInvestmentsData';

interface DealTermsProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  selectedDeal: PipelineDeal | null;
  onBack: () => void;
}

function DealTerms({
  isAICompanionOpen,
  aiCompanionWidth,
  selectedDeal,
  onBack
}: DealTermsProps) {
  const [activeTermsTab, setActiveTermsTab] = useState('investment-structure');
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

  const termsTabs = [
    { id: 'investment-structure', label: 'Investment Structure' },
    { id: 'valuation-terms', label: 'Valuation Terms' },
    { id: 'economic-rights', label: 'Economic Rights & Returns' },
    { id: 'control-governance', label: 'Control & Governance' },
    { id: 'transfer-liquidity', label: 'Transfer & Liquidity Rights' },
    { id: 'legal-administrative', label: 'Legal & Administrative' }
  ];

  if (!selectedDeal) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">No Deal Selected</h2>
        <p className="text-white/70 mb-6">Please select a deal from the pipeline to view deal terms</p>
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

      {/* Deal Terms Tabs */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
        <div className="border-b border-white/20">
          <div className="flex overflow-x-auto">
            {termsTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTermsTab(tab.id)}
                className={`flex-shrink-0 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                  activeTermsTab === tab.id
                    ? 'bg-white/10 text-white border-b-2 border-purple-300'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Investment Structure Tab */}
          {activeTermsTab === 'investment-structure' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Investment Structure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Investment Instrument</h3>
                  <select
                    defaultValue={sampleDealTerms.investmentStructure.instrument}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="SAFE" className="bg-slate-800">SAFE</option>
                    <option value="Convertible Note" className="bg-slate-800">Convertible Note</option>
                    <option value="Preferred Equity" className="bg-slate-800">Preferred Equity</option>
                    <option value="Common Equity" className="bg-slate-800">Common Equity</option>
                  </select>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Investment Amount</h3>
                  <input
                    type="number"
                    defaultValue={sampleDealTerms.investmentStructure.amount}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Security Type</h3>
                  <input
                    type="text"
                    defaultValue={sampleDealTerms.investmentStructure.securityType}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Conversion Mechanics</h3>
                  <textarea
                    defaultValue={sampleDealTerms.investmentStructure.conversionMechanics}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Valuation Terms Tab */}
          {activeTermsTab === 'valuation-terms' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Valuation Terms</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Valuation Cap</h3>
                  <input
                    type="number"
                    defaultValue={sampleDealTerms.valuationTerms.valuationCap}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Discount Rate (%)</h3>
                  <input
                    type="number"
                    defaultValue={sampleDealTerms.valuationTerms.discountRate}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="bg-white/5 rounded-lg p-4 md:col-span-2">
                  <h3 className="text-white font-medium mb-2">Anti-Dilution Protection</h3>
                  <select
                    defaultValue={sampleDealTerms.valuationTerms.antiDilution}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="None" className="bg-slate-800">None</option>
                    <option value="Weighted Average" className="bg-slate-800">Weighted Average</option>
                    <option value="Full Ratchet" className="bg-slate-800">Full Ratchet</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Economic Rights Tab */}
          {activeTermsTab === 'economic-rights' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Economic Rights & Returns</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Liquidation Preference</h3>
                  <select
                    defaultValue={sampleDealTerms.economicRights.liquidationPreference}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="1x Non-participating" className="bg-slate-800">1x Non-participating</option>
                    <option value="1x Participating" className="bg-slate-800">1x Participating</option>
                    <option value="2x Non-participating" className="bg-slate-800">2x Non-participating</option>
                    <option value="2x Participating" className="bg-slate-800">2x Participating</option>
                  </select>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Dividend Rights</h3>
                  <input
                    type="text"
                    defaultValue={sampleDealTerms.economicRights.dividendRights}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Pro Rata Rights</h3>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="proRataRights"
                        defaultChecked={sampleDealTerms.economicRights.proRataRights}
                        className="text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-white">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="proRataRights"
                        defaultChecked={!sampleDealTerms.economicRights.proRataRights}
                        className="text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-white">No</span>
                    </label>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h3 className="text-white font-medium mb-2">Redemption Rights</h3>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="redemptionRights"
                        defaultChecked={sampleDealTerms.economicRights.redemptionRights}
                        className="text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-white">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="redemptionRights"
                        defaultChecked={!sampleDealTerms.economicRights.redemptionRights}
                        className="text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-white">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTermsTab === 'founder-communication' && (
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
                  <p className="text-white/70 mb-4">Schedule a call with the founder to discuss the deal terms in detail.</p>
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
            <span>Proceed to Sharing Terms</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DealTerms;