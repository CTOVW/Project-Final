import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  Search,
  Users,
  CheckCircle,
  MessageCircle,
  FileText,
  Zap,
  Target,
  BarChart3,
  Lightbulb,
  AlertTriangle
} from 'lucide-react';

interface IdeaValidationScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function IdeaValidationScreen({ onNext, onBack, toggleAICompanion }: IdeaValidationScreenProps) {
  const [validationData, setValidationData] = useState({
    validationMethods: [] as string[],
    validationPlan: '',
    targetAudience: '',
    successCriteria: '',
    feedbackCollection: '',
    iterationStrategy: '',
    mvpDefinition: '',
    timelineEstimate: '',
    resourceRequirements: '',
    riskAssessment: ''
  });

  const handleInputChange = (field: keyof typeof validationData, value: string) => {
    setValidationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: keyof typeof validationData, value: string) => {
    setValidationData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const validationMethodOptions = [
    'Customer Interviews', 'Surveys', 'Focus Groups', 'Landing Page Test', 
    'Prototype Testing', 'A/B Testing', 'Smoke Test', 'Concierge MVP', 
    'Wizard of Oz MVP', 'Pre-sales', 'Crowdfunding'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Idea: Validation Strategy
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Define how you'll validate your solution concept with real users and gather feedback.
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

      {/* Validation Form */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
        <div className="space-y-8">
          {/* Validation Methods */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Search className="h-5 w-5 text-purple-300" />
              <span>Validation Methods (Select multiple)</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {validationMethodOptions.map((method) => (
                <button
                  key={method}
                  onClick={() => handleMultiSelect('validationMethods', method)}
                  className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                    validationData.validationMethods.includes(method)
                      ? 'bg-purple-500/20 border-purple-300 text-white'
                      : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                  }`}
                >
                  {validationData.validationMethods.includes(method) ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 border border-white/40 rounded-full" />
                  )}
                  <span>{method}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Validation Plan */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-300" />
              <span>Validation Plan</span>
            </h3>
            <textarea
              value={validationData.validationPlan}
              onChange={(e) => handleInputChange('validationPlan', e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Describe your overall validation approach and strategy..."
            />
          </div>

          {/* Target Audience & Success Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-300" />
                <span>Target Audience for Validation</span>
              </h3>
              <textarea
                value={validationData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Who will you validate your idea with? Be specific about demographics, roles, etc."
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Target className="h-5 w-5 text-red-300" />
                <span>Success Criteria</span>
              </h3>
              <textarea
                value={validationData.successCriteria}
                onChange={(e) => handleInputChange('successCriteria', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What metrics or feedback will indicate your idea is valid? What thresholds need to be met?"
              />
            </div>
          </div>

          {/* Feedback Collection & Iteration Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-yellow-300" />
                <span>Feedback Collection</span>
              </h3>
              <textarea
                value={validationData.feedbackCollection}
                onChange={(e) => handleInputChange('feedbackCollection', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="How will you collect and organize feedback? What questions will you ask?"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Zap className="h-5 w-5 text-indigo-300" />
                <span>Iteration Strategy</span>
              </h3>
              <textarea
                value={validationData.iterationStrategy}
                onChange={(e) => handleInputChange('iterationStrategy', e.target.value)}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="How will you iterate based on feedback? What's your approach to pivoting if needed?"
              />
            </div>
          </div>

          {/* MVP Definition */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-orange-300" />
              <span>Minimum Viable Product (MVP) Definition</span>
            </h3>
            <textarea
              value={validationData.mvpDefinition}
              onChange={(e) => handleInputChange('mvpDefinition', e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Define your MVP. What's the smallest version of your product that delivers value and can be used for validation?"
            />
          </div>

          {/* Timeline & Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-teal-300" />
                <span>Timeline Estimate</span>
              </h3>
              <textarea
                value={validationData.timelineEstimate}
                onChange={(e) => handleInputChange('timelineEstimate', e.target.value)}
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="How long will your validation process take? Outline key milestones and timeframes."
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Users className="h-5 w-5 text-pink-300" />
                <span>Resource Requirements</span>
              </h3>
              <textarea
                value={validationData.resourceRequirements}
                onChange={(e) => handleInputChange('resourceRequirements', e.target.value)}
                rows={3}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="What resources (people, tools, budget) will you need for validation?"
              />
            </div>
          </div>

          {/* Risk Assessment */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-300" />
              <span>Risk Assessment</span>
            </h3>
            <textarea
              value={validationData.riskAssessment}
              onChange={(e) => handleInputChange('riskAssessment', e.target.value)}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="What risks might affect your validation process? How will you mitigate them?"
            />
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

export default IdeaValidationScreen;