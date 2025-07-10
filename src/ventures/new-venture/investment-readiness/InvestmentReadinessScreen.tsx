import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  FileText,
  Presentation,
  DollarSign,
  Users,
  MessageCircle,
  CheckCircle,
  BarChart3,
  Target,
  Calendar,
  Mail,
  Briefcase,
  Globe,
  TrendingUp,
  Shield,
  Award,
  Zap,
  PieChart
} from 'lucide-react';

interface InvestmentReadinessScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function InvestmentReadinessScreen({ onNext, onBack, toggleAICompanion }: InvestmentReadinessScreenProps) {
  const [activeSection, setActiveSection] = useState('due-diligence');
  const [investmentData, setInvestmentData] = useState({
    // Due Diligence Materials
    businessDocuments: [] as string[],
    financialDocuments: [] as string[],
    legalDocuments: [] as string[],
    marketDocuments: [] as string[],
    teamDocuments: [] as string[],
    dueDiligenceNotes: '',
    
    // Pitch Materials
    pitchDeckStatus: '',
    pitchDeckOutline: '',
    executiveSummary: '',
    onePager: '',
    demoPreparation: '',
    
    // Financial Model
    financialProjections: '',
    fundingRequirements: '',
    valuationMethodology: '',
    capTable: '',
    exitStrategy: '',
    
    // Investor Targeting
    investorProfile: '',
    targetInvestors: '',
    outreachStrategy: '',
    networkLeverage: '',
    pitchEvents: '',
    
    // Negotiation Strategy
    termSheetPreparation: '',
    valuationJustification: '',
    negotiationPoints: '',
    dealStructure: '',
    advisorSupport: ''
  });

  const handleInputChange = (field: keyof typeof investmentData, value: string) => {
    setInvestmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: keyof typeof investmentData, value: string) => {
    setInvestmentData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const sections = [
    { id: 'due-diligence', label: 'Due Diligence Materials', icon: FileText },
    { id: 'pitch-materials', label: 'Pitch Materials', icon: Presentation },
    { id: 'financial-model', label: 'Financial Model', icon: DollarSign },
    { id: 'investor-targeting', label: 'Investor Targeting', icon: Users },
    { id: 'negotiation-strategy', label: 'Negotiation Strategy', icon: MessageCircle }
  ];

  const businessDocumentOptions = [
    'Business Plan', 'Executive Summary', 'Product Roadmap', 'Market Analysis', 
    'Competitive Analysis', 'Customer Testimonials', 'Traction Metrics'
  ];

  const financialDocumentOptions = [
    'Financial Projections', 'Historical Financials', 'Cash Flow Statement', 
    'Balance Sheet', 'Income Statement', 'Cap Table', 'Funding History'
  ];

  const legalDocumentOptions = [
    'Company Registration', 'Shareholder Agreements', 'IP Documentation', 
    'Contracts & Agreements', 'Regulatory Compliance', 'Terms of Service', 'Privacy Policy'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Investment Readiness
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Prepare your venture for fundraising with comprehensive due diligence materials, pitch assets, and investor strategy.
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

      {/* Investment Readiness Sections */}
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
          {/* Due Diligence Materials Section */}
          {activeSection === 'due-diligence' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Due Diligence Materials</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-purple-300" />
                  <span>Business Documents (Select all that are ready)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {businessDocumentOptions.map((doc) => (
                    <button
                      key={doc}
                      onClick={() => handleMultiSelect('businessDocuments', doc)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                        investmentData.businessDocuments.includes(doc)
                          ? 'bg-purple-500/20 border-purple-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {investmentData.businessDocuments.includes(doc) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 border border-white/40 rounded-full" />
                      )}
                      <span>{doc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-blue-300" />
                  <span>Financial Documents (Select all that are ready)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {financialDocumentOptions.map((doc) => (
                    <button
                      key={doc}
                      onClick={() => handleMultiSelect('financialDocuments', doc)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                        investmentData.financialDocuments.includes(doc)
                          ? 'bg-blue-500/20 border-blue-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {investmentData.financialDocuments.includes(doc) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 border border-white/40 rounded-full" />
                      )}
                      <span>{doc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-green-300" />
                  <span>Legal Documents (Select all that are ready)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {legalDocumentOptions.map((doc) => (
                    <button
                      key={doc}
                      onClick={() => handleMultiSelect('legalDocuments', doc)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                        investmentData.legalDocuments.includes(doc)
                          ? 'bg-green-500/20 border-green-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {investmentData.legalDocuments.includes(doc) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 border border-white/40 rounded-full" />
                      )}
                      <span>{doc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-yellow-300" />
                  <span>Due Diligence Notes</span>
                </h3>
                <textarea
                  value={investmentData.dueDiligenceNotes}
                  onChange={(e) => handleInputChange('dueDiligenceNotes', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Additional notes about your due diligence materials. What's missing? What needs improvement?"
                />
              </div>
            </div>
          )}

          {/* Pitch Materials Section */}
          {activeSection === 'pitch-materials' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Pitch Materials</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Presentation className="h-4 w-4 text-purple-300" />
                    <span>Pitch Deck Status</span>
                  </h3>
                  <select
                    value={investmentData.pitchDeckStatus}
                    onChange={(e) => handleInputChange('pitchDeckStatus', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="" className="bg-slate-800">Select status</option>
                    <option value="Not Started" className="bg-slate-800">Not Started</option>
                    <option value="In Progress" className="bg-slate-800">In Progress</option>
                    <option value="First Draft" className="bg-slate-800">First Draft</option>
                    <option value="Under Review" className="bg-slate-800">Under Review</option>
                    <option value="Final Version" className="bg-slate-800">Final Version</option>
                  </select>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-300" />
                    <span>Pitch Deck Outline</span>
                  </h3>
                  <textarea
                    value={investmentData.pitchDeckOutline}
                    onChange={(e) => handleInputChange('pitchDeckOutline', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Outline the key slides and content of your pitch deck"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-green-300" />
                    <span>Executive Summary</span>
                  </h3>
                  <textarea
                    value={investmentData.executiveSummary}
                    onChange={(e) => handleInputChange('executiveSummary', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Status and notes about your executive summary document"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-yellow-300" />
                    <span>One-Pager</span>
                  </h3>
                  <textarea
                    value={investmentData.onePager}
                    onChange={(e) => handleInputChange('onePager', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Status and notes about your one-page summary document"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-red-300" />
                  <span>Demo Preparation</span>
                </h3>
                <textarea
                  value={investmentData.demoPreparation}
                  onChange={(e) => handleInputChange('demoPreparation', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What is the status of your product demo? How are you preparing to demonstrate your product to investors?"
                />
              </div>
            </div>
          )}

          {/* Financial Model Section */}
          {activeSection === 'financial-model' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Financial Model</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-purple-300" />
                  <span>Financial Projections</span>
                </h3>
                <textarea
                  value={investmentData.financialProjections}
                  onChange={(e) => handleInputChange('financialProjections', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your financial projections. What is the status of your financial model? What assumptions are you making?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-blue-300" />
                    <span>Funding Requirements</span>
                  </h3>
                  <textarea
                    value={investmentData.fundingRequirements}
                    onChange={(e) => handleInputChange('fundingRequirements', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How much funding are you seeking? What will you use the funds for? What is your funding timeline?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Target className="h-4 w-4 text-green-300" />
                    <span>Valuation Methodology</span>
                  </h3>
                  <textarea
                    value={investmentData.valuationMethodology}
                    onChange={(e) => handleInputChange('valuationMethodology', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How have you determined your company's valuation? What methodology did you use?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <PieChart className="h-4 w-4 text-yellow-300" />
                    <span>Cap Table</span>
                  </h3>
                  <textarea
                    value={investmentData.capTable}
                    onChange={(e) => handleInputChange('capTable', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your current cap table. Who are the current shareholders and what are their ownership percentages?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-red-300" />
                    <span>Exit Strategy</span>
                  </h3>
                  <textarea
                    value={investmentData.exitStrategy}
                    onChange={(e) => handleInputChange('exitStrategy', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What is your exit strategy? What are potential exit scenarios and timelines?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Investor Targeting Section */}
          {activeSection === 'investor-targeting' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Investor Targeting</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-300" />
                  <span>Ideal Investor Profile</span>
                </h3>
                <textarea
                  value={investmentData.investorProfile}
                  onChange={(e) => handleInputChange('investorProfile', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your ideal investor profile. What type of investors are you looking for? What value-add do you expect beyond capital?"
                />
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Target className="h-4 w-4 text-blue-300" />
                  <span>Target Investors</span>
                </h3>
                <textarea
                  value={investmentData.targetInvestors}
                  onChange={(e) => handleInputChange('targetInvestors', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="List specific investors you're targeting. Include names of VCs, angel investors, or investment groups that align with your venture."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-green-300" />
                    <span>Outreach Strategy</span>
                  </h3>
                  <textarea
                    value={investmentData.outreachStrategy}
                    onChange={(e) => handleInputChange('outreachStrategy', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you approach investors? What is your outreach strategy and timeline?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-yellow-300" />
                    <span>Network Leverage</span>
                  </h3>
                  <textarea
                    value={investmentData.networkLeverage}
                    onChange={(e) => handleInputChange('networkLeverage', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you leverage your network for introductions? Who can help you connect with potential investors?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-red-300" />
                  <span>Pitch Events & Opportunities</span>
                </h3>
                <textarea
                  value={investmentData.pitchEvents}
                  onChange={(e) => handleInputChange('pitchEvents', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What pitch events, competitions, or demo days are you planning to participate in? List specific opportunities."
                />
              </div>
            </div>
          )}

          {/* Negotiation Strategy Section */}
          {activeSection === 'negotiation-strategy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Negotiation Strategy</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-purple-300" />
                    <span>Term Sheet Preparation</span>
                  </h3>
                  <textarea
                    value={investmentData.termSheetPreparation}
                    onChange={(e) => handleInputChange('termSheetPreparation', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How are you preparing for term sheet negotiations? What terms are most important to you?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-blue-300" />
                    <span>Valuation Justification</span>
                  </h3>
                  <textarea
                    value={investmentData.valuationJustification}
                    onChange={(e) => handleInputChange('valuationJustification', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you justify your valuation to investors? What metrics or comparables support your valuation?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <MessageCircle className="h-4 w-4 text-green-300" />
                  <span>Key Negotiation Points</span>
                </h3>
                <textarea
                  value={investmentData.negotiationPoints}
                  onChange={(e) => handleInputChange('negotiationPoints', e.target.value)}
                  rows={4}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What are your key negotiation points? What terms are you willing to be flexible on and which are non-negotiable?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-yellow-300" />
                    <span>Deal Structure</span>
                  </h3>
                  <textarea
                    value={investmentData.dealStructure}
                    onChange={(e) => handleInputChange('dealStructure', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What deal structure are you seeking? (equity, convertible note, SAFE, etc.) Why is this structure best for your venture?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-red-300" />
                    <span>Advisor Support</span>
                  </h3>
                  <textarea
                    value={investmentData.advisorSupport}
                    onChange={(e) => handleInputChange('advisorSupport', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What advisors or mentors are supporting your fundraising efforts? How are they helping with negotiations?"
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

export default InvestmentReadinessScreen;