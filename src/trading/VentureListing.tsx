import React, { useState } from 'react';
import {
  DollarSign,
  Clock,
  Users,
  Shield,
  Save,
  Tag
} from 'lucide-react';
import { sampleVentureListing } from '../data/myInvestmentsData';

interface VentureListingProps {
  ventureId: string;
}

function VentureListing({ ventureId }: VentureListingProps) {
  const [activeListingTab, setActiveListingTab] = useState('offering-details');
  const [listingData, setListingData] = useState(sampleVentureListing); // In a real app, you'd find the listing data by ID or initialize with defaults

  const listingTabs = [
    { id: 'offering-details', label: 'Offering Details' },
    { id: 'sale-preference', label: 'Sale Preference' },
    { id: 'buyer-criteria', label: 'Buyer Criteria' },
    { id: 'disclosure-level', label: 'Disclosure Level' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setListingData({
        ...listingData,
        [section]: {
          ...listingData[section as keyof typeof listingData],
          [field]: value
        }
      });
    } else {
      setListingData({
        ...listingData,
        [name]: value
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    // Handle nested properties
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setListingData({
        ...listingData,
        [section]: {
          ...listingData[section as keyof typeof listingData],
          [field]: checked
        }
      });
    } else {
      setListingData({
        ...listingData,
        [name]: checked
      });
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  return (
    <div className="space-y-8">
      {/* Listing Tabs */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
        <div className="border-b border-white/20">
          <div className="flex">
            {listingTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveListingTab(tab.id)}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activeListingTab === tab.id
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
          {/* Offering Details Tab */}
          {activeListingTab === 'offering-details' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Offering Details</h2>
              <p className="text-white/70 mb-6">Define the basic parameters of what you're selling and at what price.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <label className="block text-white font-medium mb-2">Number of Shares to Sell</label>
                  <input
                    type="number"
                    name="offeringDetails.sharesToSell"
                    value={listingData.offeringDetails.sharesToSell}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <label className="block text-white font-medium mb-2">Asking Price per Share</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
                    <input
                      type="number"
                      name="offeringDetails.askingPricePerShare"
                      value={listingData.offeringDetails.askingPricePerShare}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 md:col-span-2">
                  <label className="block text-white font-medium mb-2">Minimum Acceptable Price (Reserve)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
                    <input
                      type="number"
                      name="offeringDetails.minimumAcceptablePrice"
                      value={listingData.offeringDetails.minimumAcceptablePrice}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-6">
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-blue-300 mt-0.5" />
                  <div>
                    <h3 className="text-blue-300 font-medium mb-1">Total Offering Value</h3>
                    <p className="text-white/80">
                      {formatCurrency(listingData.offeringDetails.sharesToSell * listingData.offeringDetails.askingPricePerShare)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sale Preference Tab */}
          {activeListingTab === 'sale-preference' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Sale Preference</h2>
              <p className="text-white/70 mb-6">Define how you want the transaction structured and executed.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <label className="block text-white font-medium mb-2">All-or-Nothing vs. Partial Sale</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="salePreference.allOrNothing"
                        checked={listingData.salePreference.allOrNothing}
                        onChange={handleCheckboxChange}
                        className="text-purple-500 focus:ring-purple-500 h-4 w-4 rounded"
                      />
                      <span className="text-white/80">All-or-nothing (entire offering must be purchased)</span>
                    </label>
                    <p className="text-white/60 text-sm ml-6">If unchecked, partial sales will be allowed</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <label className="block text-white font-medium mb-2">Fixed Price vs. Negotiation</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="salePreference.fixedPrice"
                        checked={listingData.salePreference.fixedPrice}
                        onChange={handleCheckboxChange}
                        className="text-purple-500 focus:ring-purple-500 h-4 w-4 rounded"
                      />
                      <span className="text-white/80">Fixed price (non-negotiable)</span>
                    </label>
                    <p className="text-white/60 text-sm ml-6">If unchecked, buyers can make offers</p>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 md:col-span-2">
                  <label className="block text-white font-medium mb-2">Sale Timeline/Urgency</label>
                  <select
                    name="salePreference.saleTimeline"
                    value={listingData.salePreference.saleTimeline}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="7 days" className="bg-slate-800">7 days (Urgent)</option>
                    <option value="14 days" className="bg-slate-800">14 days (High Priority)</option>
                    <option value="30 days" className="bg-slate-800">30 days (Standard)</option>
                    <option value="60 days" className="bg-slate-800">60 days (No Rush)</option>
                    <option value="90 days" className="bg-slate-800">90 days (Long-term)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Buyer Criteria Tab */}
          {activeListingTab === 'buyer-criteria' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Buyer Criteria</h2>
              <p className="text-white/70 mb-6">Define requirements and preferences for potential purchasers.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <label className="block text-white font-medium mb-2">Minimum Purchase Size</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
                    <input
                      type="number"
                      name="buyerCriteria.minimumPurchaseSize"
                      value={listingData.buyerCriteria.minimumPurchaseSize}
                      onChange={handleInputChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <label className="block text-white font-medium mb-2">Preferred Buyer Type</label>
                  <select
                    name="buyerCriteria.preferredBuyerType"
                    value={listingData.buyerCriteria.preferredBuyerType}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Any" className="bg-slate-800">Any Buyer</option>
                    <option value="Institutional Investor" className="bg-slate-800">Institutional Investor</option>
                    <option value="Angel Investor" className="bg-slate-800">Angel Investor</option>
                    <option value="Strategic Investor" className="bg-slate-800">Strategic Investor</option>
                    <option value="Family Office" className="bg-slate-800">Family Office</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Disclosure Level Tab */}
          {activeListingTab === 'disclosure-level' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Disclosure Level</h2>
              <p className="text-white/70 mb-6">Define information sharing and confidentiality settings for your listing.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <label className="block text-white font-medium mb-2">Information Sharing Level</label>
                  <select
                    name="disclosureLevel.informationSharingLevel"
                    value={listingData.disclosureLevel.informationSharingLevel}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Basic" className="bg-slate-800">Basic (Limited information)</option>
                    <option value="Standard due diligence package" className="bg-slate-800">Standard (Due diligence package)</option>
                    <option value="Comprehensive" className="bg-slate-800">Comprehensive (Full disclosure)</option>
                  </select>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <label className="block text-white font-medium mb-2">Confidentiality Preferences</label>
                  <select
                    name="disclosureLevel.confidentialityPreferences"
                    value={listingData.disclosureLevel.confidentialityPreferences}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Public listing" className="bg-slate-800">Public listing</option>
                    <option value="NDA required" className="bg-slate-800">NDA required</option>
                    <option value="Private listing" className="bg-slate-800">Private listing (by invitation only)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-4">
        <button className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Draft</span>
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
          <Tag className="h-4 w-4" />
          <span>List Opportunity</span>
        </button>
      </div>
    </div>
  );
}

export default VentureListing;