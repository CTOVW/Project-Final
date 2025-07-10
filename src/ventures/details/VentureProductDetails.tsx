import React from 'react';
import { 
  Briefcase, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Target, 
  Zap, 
  Layers 
} from 'lucide-react';
import { DetailedVentureData } from '../../data/myVenturesData';

interface VentureProductDetailsProps {
  venture: DetailedVentureData;
}

function VentureProductDetails({ venture }: VentureProductDetailsProps) {
  return (
    <div className="space-y-8">
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
          <Layers className="h-5 w-5 text-blue-300" />
          <span>Core Features</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 shadow-lg">
          {venture.coreFeatures.map((feature, index) => (
            <div key={index} className="bg-primary/30 rounded-lg p-4 flex items-start space-x-3 border border-white/10">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold">{feature}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Roadmap */}
      <div className="shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-green-300" />
          <span>Product Roadmap</span>
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-white/20"></div>
          
          <div className="space-y-6 relative">
            {venture.roadmap.map((phase, index) => (
              <div key={index} className="ml-12 relative">
                {/* Timeline dot */}
                <div className={`absolute -left-12 top-1.5 w-6 h-6 rounded-full flex items-center justify-center ${
                  phase.status === 'completed' ? 'bg-green-500/20' :
                  phase.status === 'in-progress' ? 'bg-blue-500/20' :
                  'bg-yellow-500/20'
                }`}>
                  {phase.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : phase.status === 'in-progress' ? (
                    <Clock className="h-4 w-4 text-blue-400" />
                  ) : (
                    <Calendar className="h-4 w-4 text-yellow-400" />
                  )}
                </div>
                
                <div className="bg-primary/30 rounded-lg p-4 border border-white/10">
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Development Status */}
      <div className="bg-primary/30 rounded-lg p-6 border border-white/10 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-300" />
          <span>Product Development Status</span>
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-primary/40 rounded-lg p-4 text-center">
              <h3 className="text-white/70 text-sm mb-1">Development Stage</h3>
              <p className="text-white font-semibold">
                {venture.progress < 20 ? 'Concept' :
                 venture.progress < 40 ? 'Prototype' :
                 venture.progress < 60 ? 'MVP' :
                 venture.progress < 80 ? 'Beta' :
                 'Production'}
              </p>
            </div>
            <div className="bg-primary/40 rounded-lg p-4 text-center">
              <h3 className="text-white/70 text-sm mb-1">Current Sprint</h3>
              <p className="text-white font-semibold">Sprint {Math.floor(Math.random() * 20) + 1}</p>
            </div>
            <div className="bg-primary/40 rounded-lg p-4 text-center">
              <h3 className="text-white/70 text-sm mb-1">Open Issues</h3>
              <p className="text-white font-semibold">{Math.floor(Math.random() * 30) + 5}</p>
            </div>
            <div className="bg-primary/40 rounded-lg p-4 text-center">
              <h3 className="text-white/70 text-sm mb-1">Last Release</h3>
              <p className="text-white font-semibold">v{Math.floor(Math.random() * 3)}.{Math.floor(Math.random() * 10)}.{Math.floor(Math.random() * 10)}</p>
            </div>
          </div>
          
          <div className="bg-primary/40 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Current Development Focus</h3>
            <p className="text-white/80">
              {venture.progress < 50 
                ? 'Building core platform functionality and establishing product-market fit.'
                : 'Enhancing user experience, adding advanced features, and optimizing performance.'}
            </p>
          </div>
          
          <div className="bg-primary/40 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Technical Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'GraphQL'].map((tech, index) => (
                <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Metrics */}
      {venture.userCount > 0 && (
        <div className="bg-primary/30 rounded-lg p-6 border border-white/10 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">User Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/40 rounded-lg p-4 text-center">
              <h3 className="text-white/70 text-sm mb-1">Active Users</h3>
              <p className="text-white font-semibold">{venture.userCount}</p>
            </div>
            <div className="bg-primary/40 rounded-lg p-4 text-center">
              <h3 className="text-white/70 text-sm mb-1">User Growth</h3>
              <p className="text-white font-semibold">+{venture.growthRate}%</p>
            </div>
            <div className="bg-primary/40 rounded-lg p-4 text-center">
              <h3 className="text-white/70 text-sm mb-1">User Satisfaction</h3>
              <p className="text-white font-semibold">4.7/5.0</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VentureProductDetails;