import React from 'react';
import { 
  Users, 
  User, 
  ExternalLink 
} from 'lucide-react';
import { DetailedVentureData } from '../../data/myVenturesData';

interface VentureTeamDetailsProps {
  venture: DetailedVentureData;
}

function VentureTeamDetails({ venture }: VentureTeamDetailsProps) {
  return (
    <div className="space-y-8">
      {/* Founders */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2 shadow-lg">
          <User className="h-5 w-5 text-purple-300" />
          <span>Founders</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 shadow-lg">
          {venture.founders.map((founder, index) => (
            <div key={index} className="bg-primary/30 rounded-lg p-6 flex items-start space-x-4 border border-white/10">
              <img
                src={founder.image}
                alt={founder.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-white font-semibold text-lg">{founder.name}</h3>
                <p className="text-white/80">{founder.title}</p>
                <a 
                  href={founder.linkedinProfile} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-purple-300 hover:text-purple-200 transition-colors flex items-center space-x-1 mt-2"
                >
                  <span>LinkedIn</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Members */}
      {venture.teamMembers.length > 0 && (
        <div className="shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-300" />
            <span>Team Members</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {venture.teamMembers.map((member, index) => (
              <div key={index} className="bg-primary/30 rounded-lg p-4 flex items-center space-x-3 border border-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-white font-medium">{member.name}</h3>
                  <p className="text-white/70 text-sm">{member.title}</p>
                  <p className="text-white/60 text-xs">{member.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Structure */}
      <div className="bg-primary/30 rounded-lg p-6 border border-white/10 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Team Structure</h2>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-2xl">
            {/* Simple org chart visualization */}
            <div className="flex flex-col items-center">
              {/* CEO level */}
              <div className="bg-purple-500/20 border border-purple-500/20 rounded-lg p-3 w-48 text-center mb-4">
                <p className="text-white font-semibold">{venture.founders[0]?.name || 'CEO'}</p>
                <p className="text-white/70 text-sm">{venture.founders[0]?.title || 'Chief Executive Officer'}</p>
              </div>
              
              {/* Connecting line */}
              <div className="h-8 w-px bg-white/20"></div>
              
              {/* Executive level */}
              <div className="flex justify-center space-x-4 mb-4">
                {venture.teamMembers.length > 0 ? (
                  venture.teamMembers.slice(0, 3).map((member, index) => (
                    <div key={index} className="bg-blue-500/20 border border-blue-500/20 rounded-lg p-3 w-40 text-center">
                      <p className="text-white font-semibold">{member.name}</p>
                      <p className="text-white/70 text-sm">{member.title}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-blue-500/20 border border-blue-500/20 rounded-lg p-3 w-40 text-center">
                      <p className="text-white font-semibold">CTO</p>
                      <p className="text-white/70 text-sm">Technology</p>
                    </div>
                    <div className="bg-blue-500/20 border border-blue-500/20 rounded-lg p-3 w-40 text-center">
                      <p className="text-white font-semibold">COO</p>
                      <p className="text-white/70 text-sm">Operations</p>
                    </div>
                    <div className="bg-blue-500/20 border border-blue-500/20 rounded-lg p-3 w-40 text-center">
                      <p className="text-white font-semibold">CMO</p>
                      <p className="text-white/70 text-sm">Marketing</p>
                    </div>
                  </>
                )}
              </div>
              
              {/* Connecting lines */}
              <div className="flex justify-center space-x-20 mb-2">
                <div className="h-8 w-px bg-white/20"></div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="h-8 w-px bg-white/20"></div>
              </div>
              
              {/* Team level */}
              <div className="flex justify-center space-x-4">
                <div className="bg-green-500/20 border border-green-500/20 rounded-lg p-3 w-32 text-center">
                  <p className="text-white font-semibold">Engineering</p>
                  <p className="text-white/70 text-sm">{Math.round(venture.teamSize * 0.4)} members</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/20 rounded-lg p-3 w-32 text-center">
                  <p className="text-white font-semibold">Product</p>
                  <p className="text-white/70 text-sm">{Math.round(venture.teamSize * 0.2)} members</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/20 rounded-lg p-3 w-32 text-center">
                  <p className="text-white font-semibold">Marketing</p>
                  <p className="text-white/70 text-sm">{Math.round(venture.teamSize * 0.2)} members</p>
                </div>
                <div className="bg-green-500/20 border border-green-500/20 rounded-lg p-3 w-32 text-center">
                  <p className="text-white font-semibold">Operations</p>
                  <p className="text-white/70 text-sm">{Math.round(venture.teamSize * 0.2)} members</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Plan */}
      <div className="bg-primary/30 rounded-lg p-6 border border-white/10 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-4">Hiring Plan</h2>
        <div className="space-y-4">
          <div className="bg-primary/40 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Current Team Size</h3>
            <p className="text-white/80">{venture.teamSize} team members</p>
          </div>
          <div className="bg-primary/40 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Projected Growth</h3>
            <p className="text-white/80">Expected to grow to {Math.round(venture.teamSize * 1.5)} team members in the next 12 months</p>
          </div>
          <div className="bg-primary/40 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Key Positions to Fill</h3>
            <ul className="space-y-2">
              <li className="text-white/80 flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <span>Senior Software Engineer (2 positions)</span>
              </li>
              <li className="text-white/80 flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <span>Product Manager</span>
              </li>
              <li className="text-white/80 flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <span>Growth Marketing Specialist</span>
              </li>
              <li className="text-white/80 flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                <span>Customer Success Manager</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VentureTeamDetails;