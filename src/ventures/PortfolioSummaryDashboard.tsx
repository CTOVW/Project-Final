import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Building2, 
  Users, 
  PieChart, 
  BarChart3, 
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Calendar,
  ExternalLink,
  Filter
} from 'lucide-react';
import { 
  sampleVenturePortfolioSummary, 
  sampleVentures,
  sampleMarketUpdates
} from '../data/myVenturesData';

interface PortfolioSummaryDashboardProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
}

function PortfolioSummaryDashboard({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion
}: PortfolioSummaryDashboardProps) {
  const [durationFilter, setDurationFilter] = useState('1y');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
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

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'funding':
        return <DollarSign className="h-5 w-5 text-green-300" />;
      case 'milestone':
        return <TrendingUp className="h-5 w-5 text-blue-300" />;
      case 'launch':
        return <Building2 className="h-5 w-5 text-purple-300" />;
      case 'exit':
        return <Users className="h-5 w-5 text-yellow-300" />;
      default:
        return <Calendar className="h-5 w-5 text-white/60" />;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-300" />;
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-300" />;
      case 'info':
        return <Building2 className="h-5 w-5 text-blue-300" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-white/60" />;
    }
  };

  // Get top performing ventures
  const topPerformers = [...sampleVentures]
    .filter(venture => venture.fundingStatus !== 'Exited' && venture.monthlyRevenue > 0)
    .sort((a, b) => b.growthRate - a.growthRate)
    .slice(0, 3);

  // Get ventures with alerts
  const venturesWithAlerts = sampleVentures.filter(venture => venture.alerts.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Venture Portfolio Dashboard</h1>
          <p className="text-white/80">Comprehensive overview of your venture portfolio performance</p>
        </div>

        {/* Portfolio Value Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-blue-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(sampleVenturePortfolioSummary.totalPortfolioValue)}</div>
            <div className="text-white/70 text-sm">Total Portfolio Value</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <Building2 className="h-6 w-6 text-purple-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{sampleVenturePortfolioSummary.numberOfVentures}</div>
            <div className="text-white/70 text-sm"># Ventures</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-green-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(sampleVenturePortfolioSummary.totalFundsRaised)}</div>
            <div className="text-white/70 text-sm">Total Funds Raised</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-yellow-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-yellow-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{sampleVenturePortfolioSummary.numberOfExits}</div>
            <div className="text-white/70 text-sm"># of Exits</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="bg-red-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-red-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(sampleVenturePortfolioSummary.totalGain)}</div>
            <div className="text-white/70 text-sm">Total Gain (Exit Value)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Breakdown */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Portfolio Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3 text-center">By Stage</h3>
                  <div className="space-y-2">
                    {Object.entries(sampleVenturePortfolioSummary.portfolioBreakdown.byStage).map(([stage, percentage]) => (
                      <div key={stage} className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">{stage}</span>
                        <span className="text-white/80 text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      {Object.entries(sampleVenturePortfolioSummary.portfolioBreakdown.byStage).map(([stage, percentage], index) => {
                        const colors = ['bg-purple-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
                        return (
                          <div 
                            key={stage} 
                            className={`${colors[index % colors.length]}`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3 text-center">By Industry</h3>
                  <div className="space-y-2">
                    {Object.entries(sampleVenturePortfolioSummary.portfolioBreakdown.byIndustry).map(([industry, percentage]) => (
                      <div key={industry} className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">{industry}</span>
                        <span className="text-white/80 text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      {Object.entries(sampleVenturePortfolioSummary.portfolioBreakdown.byIndustry).map(([industry, percentage], index) => {
                        const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500'];
                        return (
                          <div 
                            key={industry} 
                            className={`${colors[index % colors.length]}`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-semibold mb-3 text-center">By Performance</h3>
                  <div className="space-y-2">
                    {Object.entries(sampleVenturePortfolioSummary.portfolioBreakdown.byPerformance).map(([performance, percentage]) => (
                      <div key={performance} className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">{performance}</span>
                        <span className="text-white/80 text-sm">{percentage}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-4 bg-white/10 rounded-full overflow-hidden">
                    <div className="flex h-full">
                      {Object.entries(sampleVenturePortfolioSummary.portfolioBreakdown.byPerformance).map(([performance, percentage], index) => {
                        const colors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
                        return (
                          <div 
                            key={performance} 
                            className={`${colors[index % colors.length]}`} 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Portfolio Performance Growth */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Portfolio Performance Growth</h2>
                <div className="flex space-x-2">
                  {['3m', '6m', '1y', 'all'].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setDurationFilter(duration)}
                      className={`px-2 py-1 rounded text-xs ${
                        durationFilter === duration
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Placeholder for growth chart */}
              <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                <div className="text-white/60">Portfolio performance growth chart would be displayed here</div>
              </div>
            </div>

            {/* Ventures List */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">My Ventures</h2>
              <div className="space-y-4">
                {sampleVentures.map((venture) => (
                  <div key={venture.id} className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors">
                    <div className="flex items-start space-x-4">
                      <img
                        src={venture.logo}
                        alt={venture.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-white font-semibold">{venture.name}</h3>
                            <p className="text-white/70 text-sm">{venture.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-white/60 mt-1">
                              <span>{venture.industry}</span>
                              <span>{venture.stage}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                venture.fundingStatus === 'Funded' ? 'bg-green-500/20 text-green-300' :
                                venture.fundingStatus === 'In Progress' ? 'bg-blue-500/20 text-blue-300' :
                                venture.fundingStatus === 'Exited' ? 'bg-purple-500/20 text-purple-300' :
                                'bg-yellow-500/20 text-yellow-300'
                              }`}>
                                {venture.fundingStatus}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white/60 text-xs">Last updated</div>
                            <div className="text-white/80 text-sm">{formatTimeAgo(venture.lastUpdated)}</div>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <div className="text-white/60">Progress</div>
                            <div className="text-white/80">{venture.progress}%</div>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" 
                              style={{ width: `${venture.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {venture.fundingStatus !== 'Exited' && (
                          <div className="grid grid-cols-4 gap-4 mt-4">
                            <div className="text-center">
                              <div className="text-white font-semibold">{formatCurrency(venture.totalFundsRaised)}</div>
                              <div className="text-white/60 text-xs">Funds Raised</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{formatCurrency(venture.monthlyRevenue)}</div>
                              <div className="text-white/60 text-xs">Monthly Revenue</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{formatNumber(venture.userCount)}</div>
                              <div className="text-white/60 text-xs">Users</div>
                            </div>
                            <div className="text-center">
                              <div className="text-white font-semibold">{venture.teamSize}</div>
                              <div className="text-white/60 text-xs">Team Size</div>
                            </div>
                          </div>
                        )}
                        
                        {venture.alerts.length > 0 && (
                          <div className="mt-4">
                            {venture.alerts.map((alert) => (
                              <div 
                                key={alert.id} 
                                className={`flex items-center space-x-2 p-2 rounded-lg ${
                                  alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-300' :
                                  alert.type === 'critical' ? 'bg-red-500/20 text-red-300' :
                                  'bg-blue-500/20 text-blue-300'
                                }`}
                              >
                                {getAlertIcon(alert.type)}
                                <span className="text-sm">{alert.message}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {sampleVenturePortfolioSummary.recentActivity.map((activity) => (
                  <div key={activity.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activity.type === 'funding' ? 'bg-green-500/20' :
                        activity.type === 'milestone' ? 'bg-blue-500/20' :
                        activity.type === 'launch' ? 'bg-purple-500/20' :
                        'bg-yellow-500/20'
                      }`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-sm">{activity.venture}</h3>
                        <p className="text-white/70 text-sm">{activity.description}</p>
                        <p className="text-white/60 text-xs mt-1">{formatTimeAgo(activity.date)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4">Top Performers</h2>
              <div className="space-y-3">
                {topPerformers.map((venture) => (
                  <div key={venture.id} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={venture.logo} 
                        alt={venture.name} 
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-sm">{venture.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400 text-xs">+{venture.growthRate}% growth</span>
                          <ArrowUp className="h-3 w-3 text-green-400" />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white text-sm font-medium">{formatCurrency(venture.monthlyRevenue)}</p>
                        <p className="text-white/60 text-xs">Monthly Revenue</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-300" />
                <span>Alerts</span>
              </h2>
              <div className="space-y-3">
                {venturesWithAlerts.flatMap(venture => 
                  venture.alerts.map(alert => (
                    <div 
                      key={alert.id} 
                      className={`p-3 rounded-lg ${
                        alert.type === 'warning' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                        alert.type === 'critical' ? 'bg-red-500/20 border border-red-500/30' :
                        'bg-blue-500/20 border border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {getAlertIcon(alert.type)}
                        <div>
                          <h4 className="text-white font-medium text-sm">{venture.name}</h4>
                          <p className={`text-sm ${
                            alert.type === 'warning' ? 'text-yellow-300' :
                            alert.type === 'critical' ? 'text-red-300' :
                            'text-blue-300'
                          }`}>
                            {alert.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {venturesWithAlerts.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-white/70">No alerts at this time</p>
                  </div>
                )}
              </div>
            </div>

            {/* Market Updates */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
              <h2 className="text-white font-semibold mb-4">Market Updates</h2>
              <div className="space-y-4">
                {sampleMarketUpdates.map((update) => (
                  <a 
                    key={update.id} 
                    href={update.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
                  >
                    <h3 className="text-white font-medium text-sm mb-1">{update.title}</h3>
                    <p className="text-white/70 text-xs mb-2 line-clamp-2">{update.description}</p>
                    <div className="flex items-center justify-between text-white/60 text-xs">
                      <span>{update.source}</span>
                      <div className="flex items-center space-x-1">
                        <span>{formatTimeAgo(update.date)}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioSummaryDashboard;