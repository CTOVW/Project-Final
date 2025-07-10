import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Building2, 
  DollarSign, 
  Users, 
  TrendingUp, 
  FileText, 
  Globe,
  Calendar,
  Brain,
  BarChart3,
  PieChart,
  Briefcase,
  Target,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  Mail
} from 'lucide-react';
import { sampleDetailedVentures } from '../data/myVenturesData';
import VentureOverviewDetails from './details/VentureOverviewDetails';
import VentureTeamDetails from './details/VentureTeamDetails';
import VentureProductDetails from './details/VentureProductDetails';
import VentureFinancialsDetails from './details/VentureFinancialsDetails';
import VentureDocumentsDetails from './details/VentureDocumentsDetails';

interface VentureDetailsPageProps {
  ventureId: string;
  onBack: () => void;
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
}

function VentureDetailsPage({ 
  ventureId, 
  onBack,
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion
}: VentureDetailsPageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Find the detailed venture data
  const venture = sampleDetailedVentures.find(v => v.id === ventureId);

  if (!venture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Venture Not Found</h2>
          <p className="text-white/70 mb-6">The venture you're looking for could not be found.</p>
          <button
            onClick={onBack}
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to My Ventures
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Building2 },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'product', label: 'Product', icon: Briefcase },
    { id: 'financials', label: 'Financials', icon: DollarSign },
    { id: 'documents', label: 'Documents', icon: FileText }
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <VentureOverviewDetails venture={venture} />;
      case 'team':
        return <VentureTeamDetails venture={venture} />;
      case 'product':
        return <VentureProductDetails venture={venture} />;
      case 'financials':
        return <VentureFinancialsDetails venture={venture} />;
      case 'documents':
        return <VentureDocumentsDetails venture={venture} />;
      default:
        return <VentureOverviewDetails venture={venture} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300" 
        style={{ 
          marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
        }}
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to My Ventures</span>
        </button>

        {/* Venture Header */}
        <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-start space-x-4">
            <img
              src={venture.logo}
              alt={venture.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{venture.name}</h1>
                  <p className="text-white/80 text-lg mb-2">{venture.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-white/70">
                    <span>{venture.industry}</span>
                    <span>{venture.stage}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      venture.fundingStatus === 'Funded' ? 'bg-green-500/20 text-green-300' :
                      venture.fundingStatus === 'In Progress' ? 'bg-blue-500/20 text-blue-300' :
                      venture.fundingStatus === 'Exited' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {venture.fundingStatus}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-white/60 text-sm">Last updated</div>
                  <div className="text-white/80">{formatTimeAgo(venture.lastUpdated)}</div>
                  <div className="mt-2 flex space-x-3">
                    <a 
                      href={`mailto:${venture.contactEmail}`} 
                      className="text-white/70 hover:text-white transition-colors"
                      title="Send Email"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a 
                      href={venture.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white/70 hover:text-white transition-colors"
                      title="Visit Website"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
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
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        {venture.fundingStatus !== 'Exited' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8 shadow-lg">
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-purple-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{formatCurrency(venture.totalFundsRaised)}</div>
              <div className="text-white/70 text-sm">Total Funds Raised</div>
            </div>
            
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-blue-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{formatCurrency(venture.monthlyRevenue)}</div>
              <div className="text-white/70 text-sm">Monthly Revenue</div>
            </div>
            
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-green-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{venture.growthRate}%</div>
              <div className="text-white/70 text-sm">Growth Rate</div>
            </div>
            
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="bg-yellow-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-yellow-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{formatNumber(venture.userCount)}</div>
              <div className="text-white/70 text-sm">Total Users</div>
            </div>
            
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center">
              <div className="bg-red-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-red-300" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{venture.teamSize}</div>
              <div className="text-white/70 text-sm">Team Size</div>
            </div>
          </div>
        )}

        {/* Alerts */}
        {venture.alerts.length > 0 && (
          <div className="mb-8 space-y-3">
            {venture.alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`flex items-center space-x-3 p-4 rounded-lg ${
                  alert.type === 'warning' ? 'bg-yellow-500/20 border border-yellow-500/20' :
                  alert.type === 'critical' ? 'bg-red-500/20 border border-red-500/20' :
                  'bg-blue-500/20 border border-blue-500/20'
                }`}
              >
                {getAlertIcon(alert.type)}
                <span className={`${
                  alert.type === 'warning' ? 'text-yellow-300' :
                  alert.type === 'critical' ? 'text-red-300' :
                  'text-blue-300'
                }`}>
                  {alert.message}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden mb-8 shadow-lg">
          <div className="border-b border-white/10">
            <div className="flex">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary/40 text-white border-b-2 border-purple-300'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* AI Companion Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleAICompanion}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <Brain className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default VentureDetailsPage;