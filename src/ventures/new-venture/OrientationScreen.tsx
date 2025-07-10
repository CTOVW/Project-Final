import React from 'react';
import { 
  Brain, 
  ArrowRight,
  Lightbulb,
  CheckCircle,
  Target,
  Briefcase,
  Box,
  Settings,
  DollarSign,
  BarChart3,
  Users,
  Building2
} from 'lucide-react';

interface OrientationScreenProps {
  onNext: () => void;
  toggleAICompanion: () => void;
  onExistingVentureToggle: (isExisting: boolean) => void;
  isExistingVenture: boolean;
}

function OrientationScreen({ 
  onNext, 
  toggleAICompanion, 
  onExistingVentureToggle,
  isExistingVenture
}: OrientationScreenProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          AI-Powered Venture Building
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Welcome to the Venture Weavers AI-powered venture building experience. Our platform will guide you through every step of creating and growing your venture.
        </p>
        
        {/* AI Companion Button */}
        <div className="mt-6">
          <button 
            onClick={toggleAICompanion}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Brain className="h-5 w-5" />
            <span>Get AI Guidance</span>
          </button>
        </div>
      </div>

      {/* Process Overview */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">The Venture Building Process</h2>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Target className="h-6 w-6 text-purple-300" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Idea Development</h3>
              <p className="text-white/80">Define your target market, identify problems, develop solutions, and validate with AI personas.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-300" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Business Planning</h3>
              <p className="text-white/80">Develop comprehensive market assessment, business model, strategy roadmap, tactical plan, and financial projections.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <Box className="h-6 w-6 text-green-300" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Product Creation</h3>
              <p className="text-white/80">Design user experience, create interactive prototypes, and develop minimum viable products with AI assistance.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Settings className="h-6 w-6 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Business Setup</h3>
              <p className="text-white/80">Implement legal, commercial, business intelligence, accounting, and marketing systems for operational launch.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-red-500/20 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-red-300" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Investment Readiness</h3>
              <p className="text-white/80">Prepare due diligence materials, create compelling pitch documents, and develop fundraising strategy.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-500/20 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Venture Performance</h3>
              <p className="text-white/80">Monitor real-time analytics, track growth metrics, and optimize business performance.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="bg-pink-500/20 p-3 rounded-lg">
              <Users className="h-6 w-6 text-pink-300" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Investor Relations</h3>
              <p className="text-white/80">Manage investor communications, track cap table, and maintain stakeholder relationships.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Venture Type Selection */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Are you building a new venture or adding an existing one?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className={`bg-white/5 border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
              !isExistingVenture ? 'border-purple-300 bg-purple-500/10' : 'border-white/20 hover:bg-white/10'
            }`}
            onClick={() => onExistingVentureToggle(false)}
          >
            <div className="flex items-start space-x-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Lightbulb className="h-6 w-6 text-purple-300" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">New Venture</h3>
                <p className="text-white/80 mb-4">Start from scratch with our AI-guided venture building process. We'll help you develop your idea into a fully-formed business.</p>
                <div className="flex items-center space-x-2">
                  {!isExistingVenture ? (
                    <CheckCircle className="h-5 w-5 text-purple-300" />
                  ) : (
                    <div className="w-5 h-5 border border-white/30 rounded-full"></div>
                  )}
                  <span className="text-white">Select New Venture</span>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`bg-white/5 border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
              isExistingVenture ? 'border-blue-300 bg-blue-500/10' : 'border-white/20 hover:bg-white/10'
            }`}
            onClick={() => onExistingVentureToggle(true)}
          >
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-2">Existing Venture</h3>
                <p className="text-white/80 mb-4">Add your existing venture to the platform. Upload your documents to the knowledge base and continue the venture building process.</p>
                <div className="flex items-center space-x-2">
                  {isExistingVenture ? (
                    <CheckCircle className="h-5 w-5 text-blue-300" />
                  ) : (
                    <div className="w-5 h-5 border border-white/30 rounded-full"></div>
                  )}
                  <span className="text-white">Select Existing Venture</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Companion Info */}
      <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/20 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-3">
          <Brain className="h-6 w-6 text-purple-300 mt-1" />
          <div>
            <h3 className="text-purple-300 font-semibold mb-2">AI Companion Assistance</h3>
            <p className="text-white/80 mb-4">
              Throughout the venture building process, our AI companion will guide you, provide suggestions, and help you make informed decisions. Click the AI Companion button at any time to get assistance.
            </p>
            <button 
              onClick={toggleAICompanion}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Open AI Companion
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Button */}
      <div className="flex justify-end">
        <button 
          onClick={onNext}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
        >
          <span>Continue to Knowledge Base</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default OrientationScreen;