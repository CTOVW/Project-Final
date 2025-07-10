import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  Lightbulb,
  Users,
  CheckCircle,
  AlertTriangle,
  MessageCircle,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

interface ProblemDefinitionScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function ProblemDefinitionScreen({ onNext, onBack, toggleAICompanion }: ProblemDefinitionScreenProps) {
  const [problemData, setProblemData] = useState({
    coreProblem: '',
    problemContext: '',
    targetUsers: [] as string[],
    userPainPoints: '',
    currentSolutions: '',
    solutionLimitations: '',
    problemImpact: '',
    problemUrgency: '',
    problemCategories: [] as string[]
  });

  const handleInputChange = (field: keyof typeof problemData, value: string) => {
    setProblemData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: keyof typeof problemData, value: string) => {
    setProblemData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const targetUserOptions = [
    'Consumers', 'Small Businesses', 'Enterprises', 'Startups', 
    'Investors', 'Government', 'Healthcare Providers', 'Educational Institutions'
  ];

  const problemCategoryOptions = [
    'Efficiency', 'Cost', 'Access', 'Quality', 'Experience', 
    'Compliance', 'Integration', 'Scalability', 'Security'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Idea: Problem Definition
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Define the problem your venture aims to solve. A well-defined problem is the foundation of a successful solution.
        </p>
        <div className="mt-6">
          <button
            onClick={toggleAICompanion}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Brain className="h-5 w-5" />
            <span>Get AI Assistance</span>
          </button>
        </div>
      </div>

      {/* Problem Definition Form */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
        <div className="space-y-8">
          {/* Core Problem */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-300" />
              <span>Core Problem Statement</span>
            </h3>
            <textarea
              value={problemData.coreProblem}
              onChange={(e) => handleInputChange('coreProblem', e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="What is the core problem you're trying to solve? Be specific and concise."
            />
          </div>

          {/* Problem Context */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Target className="h-5 w-5 text-purple-300" />
              <span>Problem Context</span>
            </h3>
            <textarea
              value={problemData.problemContext}
              onChange={(e) => handleInputChange('problemContext', e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe the context in which this problem exists. What are the circumstances or environment?"
            />
          </div>

          {/* Target Users */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-300" />
              <span>Target Users (Select multiple)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {targetUserOptions.map((user) => (
                <button
                  key={user}
                  onClick={() => handleMultiSelect('targetUsers', user)}
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                    problemData.targetUsers.includes(user)
                      ? 'bg-blue-500/20 border-blue-300 text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {problemData.targetUsers.includes(user) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 border border-white/40 rounded-full" />
                  )}
                  <span>{user}</span>
                </button>
              ))}
            </div>
          </div>

          {/* User Pain Points */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-300" />
              <span>User Pain Points</span>
            </h3>
            <textarea
              value={problemData.userPainPoints}
              onChange={(e) => handleInputChange('userPainPoints', e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="What specific pain points do your target users experience? How does this problem affect them?"
            />
          </div>

          {/* Current Solutions & Limitations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-green-300" />
                <span>Current Solutions</span>
              </h3>
              <textarea
                value={problemData.currentSolutions}
                onChange={(e) => handleInputChange('currentSolutions', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="How is this problem currently being addressed? What existing solutions are there?"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-orange-300" />
                <span>Solution Limitations</span>
              </h3>
              <textarea
                value={problemData.solutionLimitations}
                onChange={(e) => handleInputChange('solutionLimitations', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What are the limitations or shortcomings of existing solutions?"
              />
            </div>
          </div>

          {/* Problem Impact & Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-indigo-300" />
                <span>Problem Impact</span>
              </h3>
              <textarea
                value={problemData.problemImpact}
                onChange={(e) => handleInputChange('problemImpact', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What is the scale and scope of this problem? How many people or businesses does it affect?"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-300" />
                <span>Problem Urgency</span>
              </h3>
              <textarea
                value={problemData.problemUrgency}
                onChange={(e) => handleInputChange('problemUrgency', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="How urgent is this problem? Is it becoming more or less pressing over time?"
              />
            </div>
          </div>

          {/* Problem Categories */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Target className="h-5 w-5 text-teal-300" />
              <span>Problem Categories (Select multiple)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {problemCategoryOptions.map((category) => (
                <button
                  key={category}
                  onClick={() => handleMultiSelect('problemCategories', category)}
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                    problemData.problemCategories.includes(category)
                      ? 'bg-teal-500/20 border-teal-300 text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {problemData.problemCategories.includes(category) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 border border-white/40 rounded-full" />
                  )}
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Save Draft</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>

        <div className="flex space-x-4">
          <button
            onClick={onNext}
            className="text-white/60 hover:text-white transition-colors"
          >
            Skip for Now
          </button>
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Save & Continue</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProblemDefinitionScreen;