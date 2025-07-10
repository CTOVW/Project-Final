import React from 'react';
import {
  Building2,
  MapPin,
  Globe,
  Mail,
  DollarSign,
  Users,
  TrendingUp,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { sampleVentureOverview } from '../data/myInvestmentsData';

interface VentureOverviewProps {
  ventureId: string;
}

function VentureOverview({ ventureId }: VentureOverviewProps) {
  const venture = sampleVentureOverview; // In a real app, you'd find the venture by ID

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

  return (
    <div className="space-y-8">
      {/* General Information */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <div className="flex items-start space-x-6">
          <img
            src={venture.logo}
            alt={venture.name}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{venture.name}</h2>
            <p className="text-white/80 mb-4">{venture.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-white/70">
                <Building2 className="h-4 w-4" />
                <span>{venture.industry}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <MapPin className="h-4 w-4" />
                <span>{venture.hq}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <Globe className="h-4 w-4" />
                <a href={venture.website} target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-purple-200 transition-colors">
                  {venture.website.replace('https://', '')}
                </a>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${venture.contactEmail}`} className="text-purple-300 hover:text-purple-200 transition-colors">
                  {venture.contactEmail}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Highlights */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Key Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-purple-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatCurrency(venture.keyHighlights.totalRevenue)}</div>
            <div className="text-white/70 text-sm">Total Revenue</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatNumber(venture.keyHighlights.totalUsers)}</div>
            <div className="text-white/70 text-sm">Total Users</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-green-300" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{venture.keyHighlights.fundingStage}</div>
            <div className="text-white/70 text-sm">Funding Stage</div>
          </div>
        </div>
      </div>

      {/* People */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">People</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-white font-semibold mb-4">Founders</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {venture.people.founders.map((founder, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 flex items-center space-x-4">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-medium">{founder.name}</h4>
                    <p className="text-white/70 text-sm">{founder.title}</p>
                    <a 
                      href={founder.linkedinProfile} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-purple-200 transition-colors text-xs flex items-center space-x-1"
                    >
                      <span>LinkedIn</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Team Size</h3>
            <p className="text-white/80">{venture.people.headcount} employees</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {venture.recentActivity.map((activity) => (
              <div key={activity.id} className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-1">{activity.title}</h3>
                <p className="text-white/70 text-sm mb-2">{activity.description}</p>
                <p className="text-white/60 text-xs">{formatTimeAgo(activity.date)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Relevant News */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Relevant News</h2>
          <div className="space-y-4">
            {venture.relevantNews.map((news) => (
              <a 
                key={news.id} 
                href={news.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-white font-semibold mb-1">{news.title}</h3>
                <p className="text-white/70 text-sm mb-2">{news.description}</p>
                <div className="flex items-center justify-between text-white/60 text-xs">
                  <span>{news.source}</span>
                  <span>{formatTimeAgo(news.date)}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VentureOverview;