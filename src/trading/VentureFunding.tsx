import React from 'react';
import {
  DollarSign,
  Calendar,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';
import { sampleVentureFunding } from '../data/myInvestmentsData';

interface VentureFundingProps {
  ventureId: string;
}

function VentureFunding({ ventureId }: VentureFundingProps) {
  const funding = sampleVentureFunding; // In a real app, you'd find the funding data by ID

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

  return (
    <div className="space-y-8">
      {/* Funding Overview */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Funding Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-purple-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(funding.fundingOverview.totalRaised)}</div>
            <div className="text-white/70 text-sm">Total Raised</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-blue-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(funding.fundingOverview.currentValuation)}</div>
            <div className="text-white/70 text-sm">Current Valuation</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <Calendar className="h-6 w-6 text-green-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{funding.fundingOverview.fundraisingStage}</div>
            <div className="text-white/70 text-sm">Fundraising Stage</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-white font-semibold">Last Round</div>
            <div className="text-white/70 text-sm">{funding.fundingOverview.lastRound}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-white font-semibold">Fundraising Status</div>
            <div className={`text-sm ${funding.fundingOverview.fundraisingStatus === 'Active' ? 'text-green-400' : 'text-white/70'}`}>
              {funding.fundingOverview.fundraisingStatus}
            </div>
          </div>
          {funding.fundingOverview.currentRound && (
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <div className="text-white font-semibold">Current Round</div>
              <div className="text-white/70 text-sm">{funding.fundingOverview.currentRound}</div>
            </div>
          )}
        </div>
      </div>

      {/* My Investment Details */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">My Investment Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-white font-semibold mb-1">{formatCurrency(funding.myInvestment.investmentAmount)}</div>
            <div className="text-white/70 text-xs">Investment Amount</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-white font-semibold mb-1">{funding.myInvestment.round}</div>
            <div className="text-white/70 text-xs">Round</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-white font-semibold mb-1">{formatDate(funding.myInvestment.investmentDate)}</div>
            <div className="text-white/70 text-xs">Investment Date</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-white font-semibold mb-1">{funding.myInvestment.currentOwnership}%</div>
            <div className="text-white/70 text-xs">Current Ownership</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-white font-semibold mb-1">{formatCurrency(funding.myInvestment.currentValue)}</div>
            <div className="text-white/70 text-xs">Current Value</div>
          </div>
        </div>
      </div>

      {/* Funding History */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Funding History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-white/80 font-medium py-3 px-4">Date</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Investor</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Lead</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Round</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {funding.fundingHistory.map((round, index) => (
                <tr key={index} className="border-b border-white/10">
                  <td className="py-3 px-4 text-white/80">{formatDate(round.date)}</td>
                  <td className="py-3 px-4 text-white">{round.investor}</td>
                  <td className="py-3 px-4 text-white/80">{round.isLead ? 'Yes' : 'No'}</td>
                  <td className="py-3 px-4 text-white/80">{round.round}</td>
                  <td className="py-3 px-4 text-white font-medium">{formatCurrency(round.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cap Table */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Cap Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left text-white/80 font-medium py-3 px-4">Investor</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Investment</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Date</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Round</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Share Class</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Ownership %</th>
                <th className="text-left text-white/80 font-medium py-3 px-4">Price/Share</th>
              </tr>
            </thead>
            <tbody>
              {funding.capTable.map((entry, index) => (
                <tr key={index} className={`border-b border-white/10 ${entry.investor === 'Your Investment' ? 'bg-purple-500/10' : ''}`}>
                  <td className="py-3 px-4 text-white">{entry.investor}</td>
                  <td className="py-3 px-4 text-white/80">{formatCurrency(entry.investmentAmount)}</td>
                  <td className="py-3 px-4 text-white/80">{formatDate(entry.investmentDate)}</td>
                  <td className="py-3 px-4 text-white/80">{entry.round}</td>
                  <td className="py-3 px-4 text-white/80">{entry.shareClass}</td>
                  <td className="py-3 px-4 text-white/80">{entry.ownershipPercentage}%</td>
                  <td className="py-3 px-4 text-white/80">${entry.pricePerShare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* My Investment Terms */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">My Investment Terms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Investment Structure</h3>
            <p className="text-white/80">{funding.myInvestmentTerms.investmentStructure}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Valuation Terms</h3>
            <p className="text-white/80">{funding.myInvestmentTerms.valuationTerms}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Economic Rights & Returns</h3>
            <p className="text-white/80">{funding.myInvestmentTerms.economicRights}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Control & Governance</h3>
            <p className="text-white/80">{funding.myInvestmentTerms.controlGovernance}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Transfer & Liquidity Rights</h3>
            <p className="text-white/80">{funding.myInvestmentTerms.transferLiquidity}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Legal & Administrative</h3>
            <p className="text-white/80">{funding.myInvestmentTerms.legalAdministrative}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VentureFunding;