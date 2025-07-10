import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  Box,
  Layers,
  Code,
  Clock,
  CheckSquare,
  Rocket,
  Smartphone,
  Monitor,
  Server,
  Database,
  Lock,
  Zap,
  Users,
  BarChart3,
  FileText,
  CheckCircle,
  MessageCircle
} from 'lucide-react';

interface ProductScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function ProductScreen({ onNext, onBack, toggleAICompanion }: ProductScreenProps) {
  const [activeSection, setActiveSection] = useState('product-definition');
  const [productData, setProductData] = useState({
    // Product Definition
    productVision: '',
    coreFeatures: '',
    userBenefits: '',
    userStories: '',
    successMetrics: '',
    
    // UX Design
    userPersonas: '',
    userJourneys: '',
    wireframes: '',
    designSystem: '',
    prototypes: '',
    
    // Technical Architecture
    techStack: [] as string[],
    infrastructure: '',
    dataModel: '',
    apiDesign: '',
    securityApproach: '',
    scalabilityPlan: '',
    
    // Development Roadmap
    developmentPhases: '',
    keyMilestones: '',
    resourceAllocation: '',
    timelineEstimate: '',
    dependencies: '',
    
    // Testing & QA
    testingStrategy: '',
    qualityStandards: '',
    bugTracking: '',
    performanceTesting: '',
    userTesting: '',
    
    // Launch & Post-Launch
    launchPlan: '',
    marketingCoordination: '',
    monitoringPlan: '',
    feedbackCollection: '',
    iterationStrategy: '',
    maintenancePlan: ''
  });

  const handleInputChange = (field: keyof typeof productData, value: string) => {
    setProductData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: keyof typeof productData, value: string) => {
    setProductData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const sections = [
    { id: 'product-definition', label: 'Product Definition', icon: Box },
    { id: 'ux-design', label: 'UX Design', icon: Smartphone },
    { id: 'technical-architecture', label: 'Technical Architecture', icon: Server },
    { id: 'development-roadmap', label: 'Development Roadmap', icon: Clock },
    { id: 'testing-qa', label: 'Testing & QA', icon: CheckSquare },
    { id: 'launch-post-launch', label: 'Launch & Post-Launch', icon: Rocket }
  ];

  const techStackOptions = [
    'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Django', 'Flask',
    'Ruby on Rails', 'PHP', 'Laravel', 'Java', 'Spring Boot', 'Go',
    'AWS', 'Azure', 'Google Cloud', 'Firebase', 'MongoDB', 'PostgreSQL',
    'MySQL', 'Redis', 'GraphQL', 'REST API', 'Docker', 'Kubernetes'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Product Development
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Define your product vision, design, architecture, and development roadmap.
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

      {/* Product Sections */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
        <div className="border-b border-white/20">
          <div className="flex overflow-x-auto">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                    activeSection === section.id
                      ? 'bg-white/10 text-white border-b-2 border-purple-300'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="text-sm">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {/* Product Definition Section */}
          {activeSection === 'product-definition' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Product Definition</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Box className="h-4 w-4 text-purple-300" />
                  <span>Product Vision</span>
                </h3>
                <textarea
                  value={productData.productVision}
                  onChange={(e) => handleInputChange('productVision', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What is your product vision? What do you aim to achieve with this product?"
                />
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Layers className="h-4 w-4 text-blue-300" />
                  <span>Core Features</span>
                </h3>
                <textarea
                  value={productData.coreFeatures}
                  onChange={(e) => handleInputChange('coreFeatures', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What are the core features of your product? Describe the key functionality."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-300" />
                    <span>User Benefits</span>
                  </h3>
                  <textarea
                    value={productData.userBenefits}
                    onChange={(e) => handleInputChange('userBenefits', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What benefits will users get from your product? How will it improve their lives or work?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-yellow-300" />
                    <span>User Stories</span>
                  </h3>
                  <textarea
                    value={productData.userStories}
                    onChange={(e) => handleInputChange('userStories', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Provide key user stories in the format: 'As a [type of user], I want [goal] so that [benefit]'"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-red-300" />
                  <span>Success Metrics</span>
                </h3>
                <textarea
                  value={productData.successMetrics}
                  onChange={(e) => handleInputChange('successMetrics', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="How will you measure product success? What KPIs will you track?"
                />
              </div>
            </div>
          )}

          {/* UX Design Section */}
          {activeSection === 'ux-design' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">User Experience (UX) Design</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-300" />
                    <span>User Personas</span>
                  </h3>
                  <textarea
                    value={productData.userPersonas}
                    onChange={(e) => handleInputChange('userPersonas', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your primary user personas. Include demographics, goals, pain points, and behaviors."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-300" />
                    <span>User Journeys</span>
                  </h3>
                  <textarea
                    value={productData.userJourneys}
                    onChange={(e) => handleInputChange('userJourneys', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Outline the key user journeys through your product. What are the main paths users will take?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Monitor className="h-4 w-4 text-green-300" />
                  <span>Wireframes & Mockups</span>
                </h3>
                <textarea
                  value={productData.wireframes}
                  onChange={(e) => handleInputChange('wireframes', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your wireframes and mockups. What are the key screens and user interfaces?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Layers className="h-4 w-4 text-yellow-300" />
                    <span>Design System</span>
                  </h3>
                  <textarea
                    value={productData.designSystem}
                    onChange={(e) => handleInputChange('designSystem', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your design system. What are your color palette, typography, components, etc.?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Smartphone className="h-4 w-4 text-red-300" />
                    <span>Prototypes</span>
                  </h3>
                  <textarea
                    value={productData.prototypes}
                    onChange={(e) => handleInputChange('prototypes', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your prototyping approach. What tools will you use? How will you test prototypes?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Technical Architecture Section */}
          {activeSection === 'technical-architecture' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Technical Architecture</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Code className="h-4 w-4 text-purple-300" />
                  <span>Tech Stack (Select multiple)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {techStackOptions.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => handleMultiSelect('techStack', tech)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                        productData.techStack.includes(tech)
                          ? 'bg-purple-500/20 border-purple-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {productData.techStack.includes(tech) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 border border-white/40 rounded-full" />
                      )}
                      <span>{tech}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Server className="h-4 w-4 text-blue-300" />
                    <span>Infrastructure</span>
                  </h3>
                  <textarea
                    value={productData.infrastructure}
                    onChange={(e) => handleInputChange('infrastructure', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your infrastructure architecture. Where will your product be hosted? What services will you use?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Database className="h-4 w-4 text-green-300" />
                    <span>Data Model</span>
                  </h3>
                  <textarea
                    value={productData.dataModel}
                    onChange={(e) => handleInputChange('dataModel', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your data model. What are the key entities and relationships?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Code className="h-4 w-4 text-yellow-300" />
                    <span>API Design</span>
                  </h3>
                  <textarea
                    value={productData.apiDesign}
                    onChange={(e) => handleInputChange('apiDesign', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your API design. What endpoints will you have? What authentication method will you use?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-red-300" />
                    <span>Security Approach</span>
                  </h3>
                  <textarea
                    value={productData.securityApproach}
                    onChange={(e) => handleInputChange('securityApproach', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your security approach. How will you protect user data? What security measures will you implement?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-indigo-300" />
                    <span>Scalability Plan</span>
                  </h3>
                  <textarea
                    value={productData.scalabilityPlan}
                    onChange={(e) => handleInputChange('scalabilityPlan', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will your architecture scale? What measures will you take to handle growth?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Development Roadmap Section */}
          {activeSection === 'development-roadmap' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Development Roadmap</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Layers className="h-4 w-4 text-purple-300" />
                  <span>Development Phases</span>
                </h3>
                <textarea
                  value={productData.developmentPhases}
                  onChange={(e) => handleInputChange('developmentPhases', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Outline the phases of your development process. What are the key stages from concept to launch?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <CheckSquare className="h-4 w-4 text-blue-300" />
                    <span>Key Milestones</span>
                  </h3>
                  <textarea
                    value={productData.keyMilestones}
                    onChange={(e) => handleInputChange('keyMilestones', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What are the key milestones in your development roadmap? What are the critical deliverables?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-300" />
                    <span>Resource Allocation</span>
                  </h3>
                  <textarea
                    value={productData.resourceAllocation}
                    onChange={(e) => handleInputChange('resourceAllocation', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you allocate resources for development? What team members will be involved in each phase?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-300" />
                    <span>Timeline Estimate</span>
                  </h3>
                  <textarea
                    value={productData.timelineEstimate}
                    onChange={(e) => handleInputChange('timelineEstimate', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What is your estimated timeline for development? Provide timeframes for each phase and milestone."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Layers className="h-4 w-4 text-red-300" />
                    <span>Dependencies</span>
                  </h3>
                  <textarea
                    value={productData.dependencies}
                    onChange={(e) => handleInputChange('dependencies', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What dependencies exist in your development roadmap? What external factors might impact your timeline?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Testing & QA Section */}
          {activeSection === 'testing-qa' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Testing & Quality Assurance</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <CheckSquare className="h-4 w-4 text-purple-300" />
                  <span>Testing Strategy</span>
                </h3>
                <textarea
                  value={productData.testingStrategy}
                  onChange={(e) => handleInputChange('testingStrategy', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What is your overall testing strategy? What types of testing will you perform? (unit, integration, system, etc.)"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-300" />
                    <span>Quality Standards</span>
                  </h3>
                  <textarea
                    value={productData.qualityStandards}
                    onChange={(e) => handleInputChange('qualityStandards', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What quality standards will you adhere to? What are your acceptance criteria?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-300" />
                    <span>Bug Tracking & Resolution</span>
                  </h3>
                  <textarea
                    value={productData.bugTracking}
                    onChange={(e) => handleInputChange('bugTracking', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you track and resolve bugs? What tools and processes will you use?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-300" />
                    <span>Performance Testing</span>
                  </h3>
                  <textarea
                    value={productData.performanceTesting}
                    onChange={(e) => handleInputChange('performanceTesting', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you test performance? What metrics will you measure? (load time, response time, etc.)"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-red-300" />
                    <span>User Testing</span>
                  </h3>
                  <textarea
                    value={productData.userTesting}
                    onChange={(e) => handleInputChange('userTesting', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you conduct user testing? What methodologies will you use? (usability testing, A/B testing, etc.)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Launch & Post-Launch Section */}
          {activeSection === 'launch-post-launch' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Launch & Post-Launch</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Rocket className="h-4 w-4 text-purple-300" />
                  <span>Launch Plan</span>
                </h3>
                <textarea
                  value={productData.launchPlan}
                  onChange={(e) => handleInputChange('launchPlan', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What is your launch plan? Include timeline, channels, and key activities for product launch."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-300" />
                    <span>Marketing Coordination</span>
                  </h3>
                  <textarea
                    value={productData.marketingCoordination}
                    onChange={(e) => handleInputChange('marketingCoordination', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you coordinate with marketing for the launch? What materials and support will you provide?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-green-300" />
                    <span>Monitoring Plan</span>
                  </h3>
                  <textarea
                    value={productData.monitoringPlan}
                    onChange={(e) => handleInputChange('monitoringPlan', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you monitor the product after launch? What metrics will you track? What tools will you use?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-yellow-300" />
                    <span>Feedback Collection</span>
                  </h3>
                  <textarea
                    value={productData.feedbackCollection}
                    onChange={(e) => handleInputChange('feedbackCollection', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you collect user feedback after launch? What channels and tools will you use?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-red-300" />
                    <span>Iteration Strategy</span>
                  </h3>
                  <textarea
                    value={productData.iterationStrategy}
                    onChange={(e) => handleInputChange('iterationStrategy', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you iterate on the product post-launch? What is your approach to continuous improvement?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <CheckSquare className="h-4 w-4 text-indigo-300" />
                    <span>Maintenance Plan</span>
                  </h3>
                  <textarea
                    value={productData.maintenancePlan}
                    onChange={(e) => handleInputChange('maintenancePlan', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What is your plan for ongoing maintenance? How will you handle updates, bug fixes, and technical debt?"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mb-8">
        <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Save Draft</span>
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
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

export default ProductScreen;