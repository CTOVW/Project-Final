import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Save,
  Users,
  MessageCircle,
  FileText,
  Calendar,
  Mail,
  PieChart,
  DollarSign,
  TrendingUp,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Clock,
  Globe,
  Briefcase,
  Award,
  Zap
} from 'lucide-react';

interface InvestorRelationsScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
}

function InvestorRelationsScreen({ onNext, onBack, toggleAICompanion }: InvestorRelationsScreenProps) {
  const [activeSection, setActiveSection] = useState('investor-contacts');
  const [investorRelationsData, setInvestorRelationsData] = useState({
    // Investor Contacts
    currentInvestors: '',
    prospectiveInvestors: '',
    investorCategories: '',
    contactManagement: '',
    relationshipOwners: '',
    
    // Communication Log
    meetingNotes: '',
    emailCorrespondence: '',
    callRecords: '',
    followUpTasks: '',
    communicationStrategy: '',
    
    // Reporting
    investorUpdates: '',
    performanceReporting: '',
    milestoneCommunication: '',
    reportingFrequency: '',
    transparencyLevel: '',
    
    // Cap Table Management
    ownershipStructure: '',
    equityDistribution: '',
    optionPool: '',
    valuationHistory: '',
    dilutionAnalysis: '',
    
    // Investor Events
    annualMeetings: '',
    investorDemos: '',
    networkingEvents: '',
    industryConferences: '',
    communityBuilding: '',
    
    // Investor Value-Add
    strategicIntroductions: '',
    mentorshipPrograms: '',
    resourceAccess: '',
    knowledgeSharing: '',
    investorCollaboration: ''
  });

  const handleInputChange = (field: keyof typeof investorRelationsData, value: string) => {
    setInvestorRelationsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const sections = [
    { id: 'investor-contacts', label: 'Investor Contacts', icon: Users },
    { id: 'communication-log', label: 'Communication Log', icon: MessageCircle },
    { id: 'reporting', label: 'Reporting', icon: FileText },
    { id: 'cap-table-management', label: 'Cap Table Management', icon: PieChart },
    { id: 'investor-events', label: 'Investor Events', icon: Calendar },
    { id: 'investor-value-add', label: 'Investor Value-Add', icon: Award }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Investor Relations
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Manage your investor relationships, communications, and reporting to build strong partnerships.
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

      {/* Investor Relations Sections */}
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
          {/* Investor Contacts Section */}
          {activeSection === 'investor-contacts' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Investor Contacts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-300" />
                    <span>Current Investors</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.currentInvestors}
                    onChange={(e) => handleInputChange('currentInvestors', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="List your current investors. Include names, firms, investment amounts, and contact information."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-300" />
                    <span>Prospective Investors</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.prospectiveInvestors}
                    onChange={(e) => handleInputChange('prospectiveInvestors', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="List prospective investors you're targeting. Include names, firms, status of relationship, and next steps."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-green-300" />
                    <span>Investor Categories</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.investorCategories}
                    onChange={(e) => handleInputChange('investorCategories', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Categorize your investors (e.g., angel, VC, strategic, etc.). What types of investors do you have or are targeting?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-yellow-300" />
                    <span>Contact Management</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.contactManagement}
                    onChange={(e) => handleInputChange('contactManagement', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your investor contact management system. What tools do you use to manage investor contacts and communications?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Users className="h-4 w-4 text-red-300" />
                  <span>Relationship Owners</span>
                </h3>
                <textarea
                  value={investorRelationsData.relationshipOwners}
                  onChange={(e) => handleInputChange('relationshipOwners', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Assign relationship owners for each investor. Who on your team is responsible for maintaining each investor relationship?"
                />
              </div>
            </div>
          )}

          {/* Communication Log Section */}
          {activeSection === 'communication-log' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Communication Log</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple-300" />
                    <span>Meeting Notes</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.meetingNotes}
                    onChange={(e) => handleInputChange('meetingNotes', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Log your investor meetings. Include date, attendees, key discussion points, and action items."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-blue-300" />
                    <span>Email Correspondence</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.emailCorrespondence}
                    onChange={(e) => handleInputChange('emailCorrespondence', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track important email communications with investors. Include key emails sent, responses received, and important information shared."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <MessageCircle className="h-4 w-4 text-green-300" />
                    <span>Call Records</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.callRecords}
                    onChange={(e) => handleInputChange('callRecords', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Log your investor calls. Include date, participants, key discussion points, and outcomes."
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-yellow-300" />
                    <span>Follow-Up Tasks</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.followUpTasks}
                    onChange={(e) => handleInputChange('followUpTasks', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track follow-up tasks from investor communications. Include task description, deadline, owner, and status."
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-red-300" />
                  <span>Communication Strategy</span>
                </h3>
                <textarea
                  value={investorRelationsData.communicationStrategy}
                  onChange={(e) => handleInputChange('communicationStrategy', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your investor communication strategy. How often do you communicate? What channels do you use? What information do you share?"
                />
              </div>
            </div>
          )}

          {/* Reporting Section */}
          {activeSection === 'reporting' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Reporting</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-purple-300" />
                    <span>Investor Updates</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.investorUpdates}
                    onChange={(e) => handleInputChange('investorUpdates', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your investor update process. What information do you include in updates? How do you structure them?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-blue-300" />
                    <span>Performance Reporting</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.performanceReporting}
                    onChange={(e) => handleInputChange('performanceReporting', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your performance reporting to investors. What metrics do you share? How do you present performance data?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-300" />
                    <span>Milestone Communication</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.milestoneCommunication}
                    onChange={(e) => handleInputChange('milestoneCommunication', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How do you communicate milestones to investors? What milestones do you highlight? How do you celebrate achievements?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-300" />
                    <span>Reporting Frequency</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.reportingFrequency}
                    onChange={(e) => handleInputChange('reportingFrequency', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="How often do you report to investors? Do you have a regular reporting schedule? What is your cadence for different types of updates?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-red-300" />
                  <span>Transparency Level</span>
                </h3>
                <textarea
                  value={investorRelationsData.transparencyLevel}
                  onChange={(e) => handleInputChange('transparencyLevel', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What is your approach to transparency with investors? How open are you about challenges and setbacks? What information do you share vs. withhold?"
                />
              </div>
            </div>
          )}

          {/* Cap Table Management Section */}
          {activeSection === 'cap-table-management' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Cap Table Management</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <PieChart className="h-4 w-4 text-purple-300" />
                    <span>Ownership Structure</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.ownershipStructure}
                    onChange={(e) => handleInputChange('ownershipStructure', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your ownership structure. Who are the major shareholders? What is the breakdown of ownership?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-blue-300" />
                    <span>Equity Distribution</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.equityDistribution}
                    onChange={(e) => handleInputChange('equityDistribution', e.target.value)}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Detail your equity distribution. How is equity distributed among founders, employees, and investors? What is the vesting schedule?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-300" />
                    <span>Option Pool</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.optionPool}
                    onChange={(e) => handleInputChange('optionPool', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your option pool. What is the size of your option pool? How much has been allocated? What is your option grant strategy?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-yellow-300" />
                    <span>Valuation History</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.valuationHistory}
                    onChange={(e) => handleInputChange('valuationHistory', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track your valuation history. What was your valuation at each funding round? How has your valuation evolved?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-300" />
                  <span>Dilution Analysis</span>
                </h3>
                <textarea
                  value={investorRelationsData.dilutionAnalysis}
                  onChange={(e) => handleInputChange('dilutionAnalysis', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Analyze dilution impact. How have funding rounds affected ownership percentages? What is the projected dilution from future rounds?"
                />
              </div>
            </div>
          )}

          {/* Investor Events Section */}
          {activeSection === 'investor-events' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Investor Events</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-purple-300" />
                    <span>Annual Meetings</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.annualMeetings}
                    onChange={(e) => handleInputChange('annualMeetings', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Plan your annual investor meetings. When do they occur? What is the agenda? How do you prepare?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-300" />
                    <span>Investor Demos</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.investorDemos}
                    onChange={(e) => handleInputChange('investorDemos', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Plan product demos for investors. How often do you showcase new features? How do you structure these demos?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-green-300" />
                    <span>Networking Events</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.networkingEvents}
                    onChange={(e) => handleInputChange('networkingEvents', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Plan networking events with investors. What events do you organize? How do you facilitate connections?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-yellow-300" />
                    <span>Industry Conferences</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.industryConferences}
                    onChange={(e) => handleInputChange('industryConferences', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track industry conferences where you engage with investors. Which conferences do you attend? How do you maximize these opportunities?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Users className="h-4 w-4 text-red-300" />
                  <span>Community Building</span>
                </h3>
                <textarea
                  value={investorRelationsData.communityBuilding}
                  onChange={(e) => handleInputChange('communityBuilding', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe your investor community building efforts. How do you foster a sense of community among your investors?"
                />
              </div>
            </div>
          )}

          {/* Investor Value-Add Section */}
          {activeSection === 'investor-value-add' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Investor Value-Add</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-300" />
                    <span>Strategic Introductions</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.strategicIntroductions}
                    onChange={(e) => handleInputChange('strategicIntroductions', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track strategic introductions from investors. What valuable connections have your investors provided? What introductions are you seeking?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Award className="h-4 w-4 text-blue-300" />
                    <span>Mentorship Programs</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.mentorshipPrograms}
                    onChange={(e) => handleInputChange('mentorshipPrograms', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe mentorship from investors. What mentorship do your investors provide? How do you leverage their expertise?"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-green-300" />
                    <span>Resource Access</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.resourceAccess}
                    onChange={(e) => handleInputChange('resourceAccess', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Track resources provided by investors. What resources have your investors shared? How have they helped beyond capital?"
                  />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-yellow-300" />
                    <span>Knowledge Sharing</span>
                  </h3>
                  <textarea
                    value={investorRelationsData.knowledgeSharing}
                    onChange={(e) => handleInputChange('knowledgeSharing', e.target.value)}
                    rows={3}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Document knowledge shared by investors. What valuable insights have your investors provided? What expertise have they contributed?"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2 flex items-center space-x-2">
                  <Users className="h-4 w-4 text-red-300" />
                  <span>Investor Collaboration</span>
                </h3>
                <textarea
                  value={investorRelationsData.investorCollaboration}
                  onChange={(e) => handleInputChange('investorCollaboration', e.target.value)}
                  rows={3}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Describe collaboration among your investors. How do your investors work together? How do you facilitate collaboration between investors?"
                />
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
            <span>Complete Venture</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvestorRelationsScreen;