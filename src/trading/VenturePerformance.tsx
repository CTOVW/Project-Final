import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Users,
  Clock,
  Activity,
  Globe,
  Target
} from 'lucide-react';
import { sampleVenturePerformance } from '../data/myInvestmentsData';

interface VenturePerformanceProps {
  ventureId: string;
}

function VenturePerformance({ ventureId }: VenturePerformanceProps) {
  const [activePerformanceTab, setActivePerformanceTab] = useState('financial');
  const performance = sampleVenturePerformance; // In a real app, you'd find the performance data by ID

  const performanceTabs = [
    { id: 'financial', label: 'Financial' },
    { id: 'business', label: 'Business' },
    { id: 'market', label: 'Market' }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="space-y-8">
      {/* Performance Tabs */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
        <div className="border-b border-white/20">
          <div className="flex">
            {performanceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePerformanceTab(tab.id)}
                className={`flex-1 px-6 py-4 font-medium transition-colors ${
                  activePerformanceTab === tab.id
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
          {/* Financial Performance Tab */}
          {activePerformanceTab === 'financial' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Financial Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-purple-300" />
                    <span>Revenue Metrics</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">MRR</span>
                      <span className="text-white font-medium">{formatCurrency(performance.financialPerformance.revenue.mrr)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">ARR</span>
                      <span className="text-white font-medium">{formatCurrency(performance.financialPerformance.revenue.arr)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Growth Rate</span>
                      <span className="text-green-400 font-medium">{formatPercentage(performance.financialPerformance.revenue.growthRate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">ARPU</span>
                      <span className="text-white font-medium">${performance.financialPerformance.revenue.arpu}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-blue-300" />
                    <span>Profitability & Cash Flow</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Gross Margin</span>
                      <span className="text-white font-medium">{formatPercentage(performance.financialPerformance.profitability.grossMargin)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">EBITDA</span>
                      <span className={`font-medium ${performance.financialPerformance.profitability.ebitda >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(performance.financialPerformance.profitability.ebitda)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Burn Rate</span>
                      <span className="text-white font-medium">{formatCurrency(performance.financialPerformance.profitability.burnRate)}/month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Performance Tab */}
          {activePerformanceTab === 'business' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Business Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-300" />
                    <span>Customer Analytics</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Total Active Customers</span>
                      <span className="text-white font-medium">{formatNumber(performance.businessPerformance.customers.totalActive)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">New Acquisitions</span>
                      <span className="text-white font-medium">{formatNumber(performance.businessPerformance.customers.newAcquisitions)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Growth Rate</span>
                      <span className="text-green-400 font-medium">{formatPercentage(performance.businessPerformance.customers.growthRate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">CAC</span>
                      <span className="text-white font-medium">${performance.businessPerformance.customers.cac}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">CLTV</span>
                      <span className="text-white font-medium">${performance.businessPerformance.customers.cltv}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Churn Rate</span>
                      <span className="text-white font-medium">{formatPercentage(performance.businessPerformance.customers.churnRate)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Satisfaction Score</span>
                      <span className="text-white font-medium">{performance.businessPerformance.customers.satisfactionScore}/5</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-300" />
                    <span>Product Usage</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Daily Active Users</span>
                      <span className="text-white font-medium">{formatNumber(performance.businessPerformance.productUsage.dau)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Monthly Active Users</span>
                      <span className="text-white font-medium">{formatNumber(performance.businessPerformance.productUsage.mau)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Avg Session Duration</span>
                      <span className="text-white font-medium">{performance.businessPerformance.productUsage.sessionDuration} min</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Feature Adoption Rate</span>
                      <span className="text-white font-medium">{formatPercentage(performance.businessPerformance.productUsage.featureAdoption)}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-300" />
                    <span>Operational Efficiency</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Platform Uptime</span>
                      <span className="text-white font-medium">{formatPercentage(performance.businessPerformance.operationalEfficiency.uptime)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Avg Response Time</span>
                      <span className="text-white font-medium">{performance.businessPerformance.operationalEfficiency.responseTime}s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Transaction Success Rate</span>
                      <span className="text-white font-medium">{formatPercentage(performance.businessPerformance.operationalEfficiency.transactionSuccess)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">Support Resolution Time</span>
                      <span className="text-white font-medium">{performance.businessPerformance.operationalEfficiency.supportResolutionTime}h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Market Performance Tab */}
          {activePerformanceTab === 'market' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Market Performance</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-purple-300" />
                    <span>Market Metrics</span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Market Share</span>
                      <span className="text-white font-medium">{formatPercentage(performance.marketPerformance.marketMetrics.marketShare)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Brand Awareness</span>
                      <span className="text-white font-medium">{formatPercentage(performance.marketPerformance.marketMetrics.brandAwareness)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Market Penetration Rate</span>
                      <span className="text-white font-medium">{formatPercentage(performance.marketPerformance.marketMetrics.penetrationRate)}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-6">
                  <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <Target className="h-5 w-5 text-blue-300" />
                    <span>Competitive Analysis</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white/80 mb-1">Competitive Position</h4>
                      <p className="text-white font-medium">{performance.marketPerformance.competitiveAnalysis.position}</p>
                    </div>
                    <div>
                      <h4 className="text-white/80 mb-1">Feature Differentiation</h4>
                      <p className="text-white font-medium">{performance.marketPerformance.competitiveAnalysis.featureDifferentiation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VenturePerformance;