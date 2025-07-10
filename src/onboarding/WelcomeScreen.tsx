import React, { useEffect } from 'react';
import { 
  Users, 
  Brain, 
  Briefcase, 
  ArrowRight,
  BarChart3,
  Target,
  MessageCircle
} from 'lucide-react';

interface WelcomeScreenProps {
  onRoleSelect: (role: 'founder' | 'investor' | 'expert') => void;
  toggleAICompanion: () => void;
}

function WelcomeScreen({ onRoleSelect, toggleAICompanion }: WelcomeScreenProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Page Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Venture Weavers</span>
          </h1>

          {/* Page Subtitle */}
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
            Weaving the DNA of Innovation
          </h2>

          {/* Page Description */}
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            A social trading platform focused for the early stage private capital market
          </p>

          {/* AI Companion Button */}
          <div className="mb-12">
            <button 
              onClick={toggleAICompanion}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <Brain className="h-5 w-5" />
              <span>Get AI Assistance</span>
            </button>
          </div>

          {/* Call to Action */}
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-12">
            Choose your role to unlock your personalized experience
          </h3>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="flex-1 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Founder Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="bg-purple-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Briefcase className="h-8 w-8 text-purple-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Founder</h3>
                <p className="text-white/80 mb-6">Build & scale your venture with AI-powered tools</p>
                
                <ul className="text-left text-white/70 mb-8 space-y-2">
                  <li className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-purple-300" />
                    <span>Business planning</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-300" />
                    <span>Investor matchmaking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-purple-300" />
                    <span>Market intelligence</span>
                  </li>
                </ul>

                <button 
                  onClick={() => onRoleSelect('founder')}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Proceed as a Founder</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Investor Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="bg-blue-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <BarChart3 className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Investor</h3>
                <p className="text-white/80 mb-6">Discover & invest in early stage opportunities</p>
                
                <ul className="text-left text-white/70 mb-8 space-y-2">
                  <li className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-blue-300" />
                    <span>AI-curated deals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-blue-300" />
                    <span>AI-powered deal evaluation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-blue-300" />
                    <span>Portfolio management</span>
                  </li>
                </ul>

                <button 
                  onClick={() => onRoleSelect('investor')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Proceed as an Investor</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Expert Card */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="bg-green-500/20 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-300" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Expert</h3>
                <p className="text-white/80 mb-6">Share expertise & monetize your knowledge</p>
                
                <ul className="text-left text-white/70 mb-8 space-y-2">
                  <li className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-green-300" />
                    <span>Service creation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-300" />
                    <span>Client matching</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-green-300" />
                    <span>Revenue management</span>
                  </li>
                </ul>

                <button 
                  onClick={() => onRoleSelect('expert')}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Proceed as an Expert</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;