import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  FileText,
  ShoppingCart,
  BarChart3,
  DollarSign,
  Megaphone,
  Building2,
  Globe,
  Users,
  Shield,
  CheckCircle,
  Database,
  PieChart,
  CreditCard,
  Briefcase,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Clock,
  Target
} from 'lucide-react';

interface SetupScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function SetupScreen({ onNext, onBack, toggleAICompanion }: SetupScreenProps) {
  const [activeSection, setActiveSection] = useState('legal-setup');
  const [setupData, setSetupData] = useState({
    // Legal Setup
    legalStructure: '',
    registrationStatus: '',
    businessLicenses: '',
    intellectualProperty: '',
    termsOfService: '',
    privacyPolicy: '',
    
    // Commercial Setup
    paymentProcessors: [] as string[],
    bankingSetup: '',
    merchantAccounts: '',
    subscriptionManagement: '',
    invoicingSystem: '',
    
    // Business Intelligence
    analyticsTools: [] as string[],
    dashboards: '',
    dataCollection: '',
    reportingFrequency: '',
    keyMetrics: '',
    
    // Accounting Setup
    accountingSoftware: '',
    taxCompliance: '',
    financialReporting: '',
    budgetPlanning: '',
    expenseTracking: '',
    
    // Marketing Setup
    brandingAssets: '',
    marketingChannels: [] as string[],
    contentStrategy: '',
    socialMediaPresence: '',
    analyticsTracking: '',
    marketingAutomation: ''
  });

  const handleInputChange = (field: keyof typeof setupData, value: string) => {
    setSetupData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMultiSelect = (field: keyof typeof setupData, value: string) => {
    setSetupData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(item => item !== value)
        : [...(prev[field] as string[]), value]
    }));
  };

  const sections = [
    { id: 'legal-setup', label: 'Legal Setup', icon: FileText },
    { id: 'commercial-setup', label: 'Commercial Setup', icon: ShoppingCart },
    { id: 'business-intelligence', label: 'Business Intelligence', icon: BarChart3 },
    { id: 'accounting-setup', label: 'Accounting Setup', icon: DollarSign },
    { id: 'marketing-setup', label: 'Marketing Setup', icon: Megaphone }
  ];

  const paymentProcessorOptions = [
    'Stripe', 'PayPal', 'Square', 'Adyen', 'Checkout.com', 
    'Tap Payments', 'Fawry', 'Paytabs', 'Telr', 'Network International'
  ];

  const analyticsToolOptions = [
    'Google Analytics', 'Mixpanel', 'Amplitude', 'Segment', 'Hotjar',
    'Looker', 'Tableau', 'Power BI', 'Metabase', 'Sisense'
  ];

  const marketingChannelOptions = [
    'Email Marketing', 'Social Media', 'Content Marketing', 'SEO', 'SEM',
    'Influencer Marketing', 'Events', 'PR', 'Affiliate Marketing', 'Partnerships'
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Business Setup
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Set up the operational foundations for your venture, from legal structure to marketing systems.
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

      {/* Setup Sections */}
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
          {/* Legal Setup Section */}
          {activeSection === 'legal-setup' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Legal Setup</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-purple-300" />
                    <span>Legal Structure</span>
                  </h3>
                  <select
                    value={setupData.legalStructure}
                    onChange={(e) => handleInputChange('legalStructure', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="" className="bg-slate-800">Select legal structure</option>
                    <option value="Sole Proprietorship" className="bg-slate-800">Sole Proprietorship</option>
                    <option value="LLC" className="bg-slate-800">LLC</option>
                    <option value="Corporation" className="bg-slate-800">Corporation</option>
                    <option value="Partnership" className="bg-slate-800">Partnership</option>
                    <option value="Free Zone Company" className="bg-slate-800">Free Zone Company</option>
                    <option value="Offshore Company" className="bg-slate-800">Offshore Company</option>
                  </select>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-300" />
                    <span>Registration Status</span>
                  </h3>
                  <select
                    value={setupData.registrationStatus}
                    onChange={(e) => handleInputChange('registrationStatus', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="" className="bg-slate-800">Select registration status</option>
                    <option value="Not Started" className="bg-slate-800">Not Started</option>
                    <option value="In Progress" className="bg-slate-800">In Progress</option>
                    <option value="Completed" className="bg-slate-800">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-green-300" />
                  <span>Business Licenses & Permits</span>
                </h3>
                <textarea
                  value={setupData.businessLicenses}
                  onChange={(e) => handleInputChange('businessLicenses', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="List the business licenses and permits required for your venture and their status."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-yellow-300" />
                    <span>Intellectual Property</span>
                  </h3>
                  <textarea
                    value={setupData.intellectualProperty}
                    onChange={(e) => handleInputChange('intellectualProperty', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your IP strategy. What trademarks, patents, or copyrights do you have or plan to obtain?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-red-300" />
                    <span>Legal Documents</span>
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Terms of Service</label>
                      <textarea
                        value={setupData.termsOfService}
                        onChange={(e) => handleInputChange('termsOfService', e.target.value)}
                        rows={2}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Status and notes about your Terms of Service document"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Privacy Policy</label>
                      <textarea
                        value={setupData.privacyPolicy}
                        onChange={(e) => handleInputChange('privacyPolicy', e.target.value)}
                        rows={2}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Status and notes about your Privacy Policy document"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Commercial Setup Section */}
          {activeSection === 'commercial-setup' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Commercial Setup</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-purple-300" />
                  <span>Payment Processors (Select multiple)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {paymentProcessorOptions.map((processor) => (
                    <button
                      key={processor}
                      onClick={() => handleMultiSelect('paymentProcessors', processor)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                        setupData.paymentProcessors.includes(processor)
                          ? 'bg-purple-500/20 border-purple-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {setupData.paymentProcessors.includes(processor) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 border border-white/40 rounded-full" />
                      )}
                      <span>{processor}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Building2 className="h-4 w-4 text-blue-300" />
                    <span>Banking Setup</span>
                  </h3>
                  <textarea
                    value={setupData.bankingSetup}
                    onChange={(e) => handleInputChange('bankingSetup', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your banking setup. Which banks are you using? What accounts have you set up?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-green-300" />
                    <span>Merchant Accounts</span>
                  </h3>
                  <textarea
                    value={setupData.merchantAccounts}
                    onChange={(e) => handleInputChange('merchantAccounts', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your merchant account setup. Which providers are you using? What is the status?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-yellow-300" />
                    <span>Subscription Management</span>
                  </h3>
                  <textarea
                    value={setupData.subscriptionManagement}
                    onChange={(e) => handleInputChange('subscriptionManagement', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you manage subscriptions? What tools or systems will you use?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-red-300" />
                    <span>Invoicing System</span>
                  </h3>
                  <textarea
                    value={setupData.invoicingSystem}
                    onChange={(e) => handleInputChange('invoicingSystem', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What invoicing system will you use? How will you manage invoices and receipts?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Business Intelligence Section */}
          {activeSection === 'business-intelligence' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Business Intelligence</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-purple-300" />
                  <span>Analytics Tools (Select multiple)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {analyticsToolOptions.map((tool) => (
                    <button
                      key={tool}
                      onClick={() => handleMultiSelect('analyticsTools', tool)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                        setupData.analyticsTools.includes(tool)
                          ? 'bg-purple-500/20 border-purple-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {setupData.analyticsTools.includes(tool) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 border border-white/40 rounded-full" />
                      )}
                      <span>{tool}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <PieChart className="h-4 w-4 text-blue-300" />
                    <span>Dashboards</span>
                  </h3>
                  <textarea
                    value={setupData.dashboards}
                    onChange={(e) => handleInputChange('dashboards', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What dashboards will you create? What key metrics will they display?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Database className="h-4 w-4 text-green-300" />
                    <span>Data Collection</span>
                  </h3>
                  <textarea
                    value={setupData.dataCollection}
                    onChange={(e) => handleInputChange('dataCollection', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you collect data? What data points will you track?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-300" />
                    <span>Reporting Frequency</span>
                  </h3>
                  <textarea
                    value={setupData.reportingFrequency}
                    onChange={(e) => handleInputChange('reportingFrequency', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How often will you generate reports? What types of reports will you create?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Target className="h-4 w-4 text-red-300" />
                    <span>Key Metrics</span>
                  </h3>
                  <textarea
                    value={setupData.keyMetrics}
                    onChange={(e) => handleInputChange('keyMetrics', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What are your key performance indicators (KPIs)? How will you measure success?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Accounting Setup Section */}
          {activeSection === 'accounting-setup' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Accounting Setup</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-purple-300" />
                  <span>Accounting Software</span>
                </h3>
                <select
                  value={setupData.accountingSoftware}
                  onChange={(e) => handleInputChange('accountingSoftware', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="" className="bg-slate-800">Select accounting software</option>
                  <option value="QuickBooks" className="bg-slate-800">QuickBooks</option>
                  <option value="Xero" className="bg-slate-800">Xero</option>
                  <option value="FreshBooks" className="bg-slate-800">FreshBooks</option>
                  <option value="Zoho Books" className="bg-slate-800">Zoho Books</option>
                  <option value="Wave" className="bg-slate-800">Wave</option>
                  <option value="Other" className="bg-slate-800">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-blue-300" />
                    <span>Tax Compliance</span>
                  </h3>
                  <textarea
                    value={setupData.taxCompliance}
                    onChange={(e) => handleInputChange('taxCompliance', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you ensure tax compliance? What tax registrations do you need?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-green-300" />
                    <span>Financial Reporting</span>
                  </h3>
                  <textarea
                    value={setupData.financialReporting}
                    onChange={(e) => handleInputChange('financialReporting', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What financial reports will you generate? How often will you review financials?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-yellow-300" />
                    <span>Budget Planning</span>
                  </h3>
                  <textarea
                    value={setupData.budgetPlanning}
                    onChange={(e) => handleInputChange('budgetPlanning', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you plan and manage your budget? What is your budgeting process?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-red-300" />
                    <span>Expense Tracking</span>
                  </h3>
                  <textarea
                    value={setupData.expenseTracking}
                    onChange={(e) => handleInputChange('expenseTracking', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you track and manage expenses? What tools or processes will you use?"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Marketing Setup Section */}
          {activeSection === 'marketing-setup' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Marketing Setup</h2>
              
              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-purple-300" />
                  <span>Branding Assets</span>
                </h3>
                <textarea
                  value={setupData.brandingAssets}
                  onChange={(e) => handleInputChange('brandingAssets', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What branding assets have you created? (logo, color scheme, typography, etc.)"
                />
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-blue-300" />
                  <span>Marketing Channels (Select multiple)</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {marketingChannelOptions.map((channel) => (
                    <button
                      key={channel}
                      onClick={() => handleMultiSelect('marketingChannels', channel)}
                      className={`p-3 rounded-lg border transition-all duration-300 text-sm flex items-center space-x-2 ${
                        setupData.marketingChannels.includes(channel)
                          ? 'bg-blue-500/20 border-blue-300 text-white'
                          : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      {setupData.marketingChannels.includes(channel) ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <div className="h-4 w-4 border border-white/40 rounded-full" />
                      )}
                      <span>{channel}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-green-300" />
                  <span>Content Strategy</span>
                </h3>
                <textarea
                  value={setupData.contentStrategy}
                  onChange={(e) => handleInputChange('contentStrategy', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What is your content strategy? What types of content will you create and how often?"
                />
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Users className="h-4 w-4 text-yellow-300" />
                  <span>Social Media Presence</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Instagram className="h-5 w-5 text-pink-400" />
                      <h4 className="text-white font-medium">Instagram</h4>
                    </div>
                    <textarea
                      value={setupData.socialMediaPresence}
                      onChange={(e) => handleInputChange('socialMediaPresence', e.target.value)}
                      rows={2}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Instagram handle and setup status"
                    />
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Linkedin className="h-5 w-5 text-blue-400" />
                      <h4 className="text-white font-medium">LinkedIn</h4>
                    </div>
                    <textarea
                      rows={2}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="LinkedIn page and setup status"
                    />
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Twitter className="h-5 w-5 text-blue-400" />
                      <h4 className="text-white font-medium">Twitter</h4>
                    </div>
                    <textarea
                      rows={2}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Twitter handle and setup status"
                    />
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <Facebook className="h-5 w-5 text-blue-500" />
                      <h4 className="text-white font-medium">Facebook</h4>
                    </div>
                    <textarea
                      rows={2}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Facebook page and setup status"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-red-300" />
                    <span>Analytics Tracking</span>
                  </h3>
                  <textarea
                    value={setupData.analyticsTracking}
                    onChange={(e) => handleInputChange('analyticsTracking', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How will you track marketing analytics? What tools will you use?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-indigo-300" />
                    <span>Marketing Automation</span>
                  </h3>
                  <textarea
                    value={setupData.marketingAutomation}
                    onChange={(e) => handleInputChange('marketingAutomation', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="What marketing automation tools will you use? How will you automate your marketing efforts?"
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

export default SetupScreen;