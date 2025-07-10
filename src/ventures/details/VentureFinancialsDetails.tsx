import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Clock, 
  Users 
} from 'lucide-react';
import { DetailedVentureData } from '../../data/myVenturesData';

interface VentureFinancialsDetailsProps {
  venture: DetailedVentureData;
}

function VentureFinancialsDetails({ venture }: VentureFinancialsDetailsProps) {
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
      {/* Financial Metrics */}
      {venture.fundingStatus !== 'Exited' && (
        <div className="shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-purple-300" />
            <span>Financial Metrics</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary/30 rounded-lg p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-300" />
                <span>Revenue</span>
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">MRR</span>
                  <span className="text-white">{formatCurrency(venture.financialMetrics.mrr)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">ARR</span>
                  <span className="text-white">{formatCurrency(venture.financialMetrics.arr)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Growth Rate</span>
                  <span className="text-green-400">+{venture.growthRate}%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/30 rounded-lg p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-red-300" />
                <span>Burn & Runway</span>
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">Monthly Burn</span>
                  <span className="text-white">{formatCurrency(venture.financialMetrics.burnRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Runway</span>
                  <span className="text-white">{venture.financialMetrics.runway} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Gross Margin</span>
                  <span className="text-white">{venture.financialMetrics.grossMargin}%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary/30 rounded-lg p-4 border border-white/10">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-300" />
                <span>Unit Economics</span>
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/70">CAC</span>
                  <span className="text-white">${venture.businessMetrics.cac}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">LTV</span>
                  <span className="text-white">${venture.businessMetrics.ltv}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">LTV:CAC</span>
                  <span className="text-white">{(venture.businessMetrics.ltv / venture.businessMetrics.cac).toFixed(1)}x</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Funding History */}
      {venture.fundingHistory.length > 0 && (
        <div className="shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-blue-300" />
            <span>Funding History</span>
          </h2>
          <div className="overflow-x-auto bg-primary/30 rounded-lg border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-white/80 font-medium py-3 px-4">Round</th>
                  <th className="text-left text-white/80 font-medium py-3 px-4">Date</th>
                  <th className="text-left text-white/80 font-medium py-3 px-4">Amount</th>
                  <th className="text-left text-white/80 font-medium py-3 px-4">Valuation</th>
                  <th className="text-left text-white/80 font-medium py-3 px-4">Investors</th>
                </tr>
              </thead>
              <tbody>
                {venture.fundingHistory.map((round, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-3 px-4 text-white font-medium">{round.round}</td>
                    <td className="py-3 px-4 text-white/70">{formatDate(round.date)}</td>
                    <td className="py-3 px-4 text-white">{formatCurrency(round.amount)}</td>
                    <td className="py-3 px-4 text-white">{formatCurrency(round.valuation)}</td>
                    <td className="py-3 px-4 text-white/70">{round.investors.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cap Table */}
      <div className="shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <PieChart className="h-5 w-5 text-green-300" />
          <span>Cap Table Summary</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary/30 rounded-lg p-6 border border-white/10">
            <div className="flex items-center justify-center h-48">
              {/* Simple pie chart visualization */}
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Founders slice */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent"
                    stroke="#8B5CF6" 
                    strokeWidth="20" 
                    strokeDasharray={`${venture.capTableSummary.founders * 2.51} ${251 - venture.capTableSummary.founders * 2.51}`}
                    strokeDashoffset="0"
                  />
                  {/* Investors slice */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent"
                    stroke="#3B82F6" 
                    strokeWidth="20" 
                    strokeDasharray={`${venture.capTableSummary.investors * 2.51} ${251 - venture.capTableSummary.investors * 2.51}`}
                    strokeDashoffset={`${-venture.capTableSummary.founders * 2.51}`}
                  />
                  {/* Employees slice */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent"
                    stroke="#10B981" 
                    strokeWidth="20" 
                    strokeDasharray={`${venture.capTableSummary.employees * 2.51} ${251 - venture.capTableSummary.employees * 2.51}`}
                    strokeDashoffset={`${-(venture.capTableSummary.founders + venture.capTableSummary.investors) * 2.51}`}
                  />
                  {/* Option Pool slice */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    fill="transparent"
                    stroke="#F59E0B" 
                    strokeWidth="20" 
                    strokeDasharray={`${venture.capTableSummary.optionPool * 2.51} ${251 - venture.capTableSummary.optionPool * 2.51}`}
                    strokeDashoffset={`${-(venture.capTableSummary.founders + venture.capTableSummary.investors + venture.capTableSummary.employees) * 2.51}`}
                  />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/30 rounded-lg p-6 border border-white/10">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
                  <span className="text-white">Founders</span>
                </div>
                <span className="text-white font-semibold">{venture.capTableSummary.founders}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  <span className="text-white">Investors</span>
                </div>
                <span className="text-white font-semibold">{venture.capTableSummary.investors}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                  <span className="text-white">Employees</span>
                </div>
                <span className="text-white font-semibold">{venture.capTableSummary.employees}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                  <span className="text-white">Option Pool</span>
                </div>
                <span className="text-white font-semibold">{venture.capTableSummary.optionPool}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Projections */}
      {venture.fundingStatus !== 'Exited' && (
        <div className="bg-primary/30 rounded-lg p-6 border border-white/10 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-yellow-300" />
            <span>Financial Projections</span>
          </h2>
          <div className="space-y-6">
            <div className="bg-primary/40 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">12-Month Revenue Projection</h3>
              <div className="h-40 flex items-end space-x-1">
                {Array.from({ length: 12 }).map((_, index) => {
                  const height = 20 + index * 10 + Math.random() * 20;
                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full bg-gradient-to-t from-purple-500 to-blue-500 rounded-t"
                        style={{ height: `${height}px` }}
                      ></div>
                      <div className="text-white/60 text-xs mt-2">
                        {new Date(Date.now() + index * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/40 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Revenue Growth</h3>
                <p className="text-white/80">Projected to reach {formatCurrency(venture.financialMetrics.arr * 2)} ARR in 12 months</p>
              </div>
              <div className="bg-primary/40 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Profitability Timeline</h3>
                <p className="text-white/80">Expected to reach profitability in {Math.floor(Math.random() * 12) + 12} months</p>
              </div>
              <div className="bg-primary/40 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Next Funding Round</h3>
                <p className="text-white/80">
                  {venture.fundingHistory.length > 0 
                    ? `Planning ${venture.fundingHistory[venture.fundingHistory.length - 1].round === 'Seed' ? 'Series A' : 'Series B'} in Q${Math.floor(Math.random() * 4) + 1} 2025`
                    : 'Planning Seed round in Q1 2025'}
                </p>
              </div>
              <div className="bg-primary/40 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Target Valuation</h3>
                <p className="text-white/80">
                  {venture.fundingHistory.length > 0 
                    ? `Targeting ${formatCurrency(venture.fundingHistory[venture.fundingHistory.length - 1].valuation * 2)} valuation at next round`
                    : 'Targeting $5M valuation at Seed round'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VentureFinancialsDetails;