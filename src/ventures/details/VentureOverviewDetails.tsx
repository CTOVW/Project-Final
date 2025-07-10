import React from 'react';
import { 
  Building2, 
  Globe, 
  Calendar, 
  TrendingUp, 
  Users, 
  Target, 
  Briefcase, 
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { DetailedVentureData } from '../../data/myVenturesData';

interface VentureOverviewDetailsProps {
  venture: DetailedVentureData;
}

function VentureOverviewDetails({ venture }: VentureOverviewDetailsProps) {
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Key Highlights */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Key Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-lg">
          <div className="bg-primary/40 rounded-lg p-4 text-center">
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-purple-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(venture.keyHighlights.totalRevenue)}</div>
            <div className="text-white/70 text-sm">Annual Revenue</div>
          </div>
          <div className="bg-primary/40 rounded-lg p-4 text-center">
            <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatNumber(venture.keyHighlights.totalUsers)}</div>
            <div className="text-white/70 text-sm">Total Users</div>
          </div>
          <div className="bg-primary/40 rounded-lg p-4 text-center">
            <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{venture.keyHighlights.fundingStage}</div>
            <div className="text-white/70 text-sm">Funding Stage</div>
          </div>
        </div>
      </div>

      {/* Product Vision */}
      <div className="bg-primary/30 rounded-lg p-6 border border-white/10 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Target className="h-5 w-5 text-purple-300" />
          <span>Product Vision</span>
        </h2>
        <p className="text-white/80 leading-relaxed">{venture.productVision}</p>
      </div>

      {/* Core Features */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 shadow-lg">
          <Briefcase className="h-5 w-5 text-blue-300" />
          <span>Core Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg">
          {venture.coreFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 bg-primary/40 p-3 rounded-lg">
              <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
              <span className="text-white/80">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-green-300" />
          <span>Roadmap</span>
        </h2>
        <div className="space-y-4">
          {venture.roadmap.map((phase, index) => (
            <div key={index} className="bg-primary/30 rounded-lg p-4 border border-white/10">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-semibold">{phase.phase}</h3>
                  <p className="text-white/70 text-sm">{phase.timeline}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  phase.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                  phase.status === 'in-progress' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {phase.status}
                </span>
              </div>
              <p className="text-white/80 mt-2">{phase.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Model */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-lg">
        <div className="bg-primary/30 rounded-lg p-6 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Target className="h-5 w-5 text-yellow-300" />
            <span>Key Activities</span>
          </h2>
          <ul className="space-y-2">
            {venture.keyActivities.map((activity, index) => (
              <li key={index} className="text-white/80 flex items-start space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary/30 rounded-lg p-6 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-red-300" />
            <span>Key Resources</span>
          </h2>
          <ul className="space-y-2">
            {venture.keyResources.map((resource, index) => (
              <li key={index} className="text-white/80 flex items-start space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <span>{resource}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary/30 rounded-lg p-6 border border-white/10">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Building2 className="h-5 w-5 text-indigo-300" />
            <span>Key Partners</span>
          </h2>
          <ul className="space-y-2">
            {venture.keyPartners.map((partner, index) => (
              <li key={index} className="text-white/80 flex items-start space-x-2">
                <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2"></div>
                <span>{partner}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Market Metrics */}
      <div className="bg-primary/30 rounded-lg p-6 border border-white/10 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Globe className="h-5 w-5 text-purple-300" />
          <span>Market Metrics</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-white/70 text-sm mb-1">Market Size</h3>
            <p className="text-white font-semibold">{venture.marketMetrics.marketSize}</p>
          </div>
          <div>
            <h3 className="text-white/70 text-sm mb-1">Market Growth</h3>
            <p className="text-white font-semibold">{venture.marketMetrics.marketGrowth}</p>
          </div>
          <div>
            <h3 className="text-white/70 text-sm mb-1">Market Share</h3>
            <p className="text-white font-semibold">{venture.marketMetrics.marketShare}</p>
          </div>
          <div>
            <h3 className="text-white/70 text-sm mb-1">Competitors</h3>
            <p className="text-white font-semibold">{venture.marketMetrics.competitorCount}</p>
          </div>
        </div>
      </div>

      {/* Recent Funding */}
      {venture.fundingHistory.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 shadow-lg">
            <DollarSign className="h-5 w-5 text-green-300" />
            <span>Recent Funding</span>
          </h2>
          <div className="bg-primary/30 rounded-lg p-6 border border-white/10 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-300" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">
                  {venture.fundingHistory[venture.fundingHistory.length - 1].round}
                </h3>
                <p className="text-white/80">
                  {formatCurrency(venture.fundingHistory[venture.fundingHistory.length - 1].amount)} raised at {formatCurrency(venture.fundingHistory[venture.fundingHistory.length - 1].valuation)} valuation
                </p>
                <p className="text-white/60 text-sm">
                  {formatDate(venture.fundingHistory[venture.fundingHistory.length - 1].date)}
                </p>
                <div className="mt-2">
                  <span className="text-white/70 text-sm">Investors: </span>
                  <span className="text-white/80">
                    {venture.fundingHistory[venture.fundingHistory.length - 1].investors.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VentureOverviewDetails;