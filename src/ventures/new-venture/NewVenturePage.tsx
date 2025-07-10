import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Brain,
  PieChart,
  DollarSign,
  Users,
  TrendingUp,
  Briefcase,
  Box,
  Settings,
  BarChart3,
  CheckCircle
} from 'lucide-react';
import OrientationScreen from './OrientationScreen';
import KnowledgeBaseScreen from './KnowledgeBaseScreen';
import MarketTargetingScreen from './idea/MarketTargetingScreen';
import ProblemDefinitionScreen from './idea/ProblemDefinitionScreen';
import IdeationScreen from './idea/IdeationScreen';
import IdeaValidationScreen from './idea/IdeaValidationScreen';
import BusinessPlanScreen from './business-plan/BusinessPlanScreen';
import ProductScreen from './product/ProductScreen';
import SetupScreen from './setup/SetupScreen';
import InvestmentReadinessScreen from './investment-readiness/InvestmentReadinessScreen';
import VenturePerformanceScreen from './performance/VenturePerformanceScreen';
import InvestorRelationsScreen from './investor-relations/InvestorRelationsScreen';
import IdeaFlowTabs from './components/IdeaFlowTabs';
import BusinessPlanTabs from './components/BusinessPlanTabs';
import ProductTabs from './components/ProductTabs';
import SetupTabs from './components/SetupTabs';
import InvestmentReadinessTabs from './components/InvestmentReadinessTabs';
import PerformanceTabs from './components/PerformanceTabs';
import InvestorRelationsTabs from './components/InvestorRelationsTabs';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  country: string;
  language: string;
  currentOccupation: string;
  yearsExperience: string;
  entrepreneurialExperience: string;
  industryExpertise: string;
  marketExpertise: string;
  keySkills: string;
  company: string;
  companyLinkedin: string;
  companyType: string;
  industryFocus: string;
  origin: string;
  companySize: string;
  portfolioSize: string;
  headquarters: string;
  operatingMarkets: string;
  targetClients: string;
  keyCapabilities: string;
}

interface NewVenturePageProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  profileData: ProfileData;
  onAgentChange: (agent: string) => void;
}

function NewVenturePage({
  isAICompanionOpen,
  aiCompanionWidth,
  toggleAICompanion,
  profileData,
  onAgentChange
}: NewVenturePageProps) {
  const [currentStep, setCurrentStep] = useState('orientation');
  const [ventureProgress, setVentureProgress] = useState(5); // Starting at 5% for orientation
  const [isExistingVenture, setIsExistingVenture] = useState(false);
  const [activeIdeaTab, setActiveIdeaTab] = useState('market-targeting');
  const [activeBusinessPlanTab, setActiveBusinessPlanTab] = useState('company-overview');
  const [activeProductTab, setActiveProductTab] = useState('product-definition');
  const [activeSetupTab, setActiveSetupTab] = useState('legal-setup');
  const [activeInvestmentTab, setActiveInvestmentTab] = useState('due-diligence');
  const [activePerformanceTab, setActivePerformanceTab] = useState('financial-performance');
  const [activeInvestorRelationsTab, setActiveInvestorRelationsTab] = useState('investor-contacts');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  // Update AI agent when step changes
  useEffect(() => {
    switch (currentStep) {
      case 'orientation':
        onAgentChange('knowledge-navigator');
        break;
      case 'knowledge-base':
        onAgentChange('knowledge-navigator');
        break;
      case 'idea-market-targeting':
        onAgentChange('thesis-development');
        break;
      case 'idea-problem-definition':
        onAgentChange('thesis-development');
        break;
      case 'idea-ideation':
        onAgentChange('thesis-development');
        break;
      case 'idea-validation':
        onAgentChange('thesis-development');
        break;
      case 'business-plan':
        onAgentChange('thesis-development');
        break;
      case 'product':
        onAgentChange('thesis-development');
        break;
      case 'setup':
        onAgentChange('thesis-development');
        break;
      case 'investment-readiness':
        onAgentChange('thesis-development');
        break;
      case 'venture-performance':
        onAgentChange('venture-tracker');
        break;
      case 'investor-relations':
        onAgentChange('knowledge-navigator');
        break;
      // Add more cases as needed
      default:
        onAgentChange('knowledge-navigator');
    }
  }, [currentStep, onAgentChange]);

  const handleNext = (nextStep: string) => {
    setCurrentStep(nextStep);
    // Update progress based on step
    switch (nextStep) {
      case 'knowledge-base':
        setVentureProgress(10);
        break;
      case 'idea-market-targeting':
        setVentureProgress(15);
        break;
      case 'idea-problem-definition':
        setVentureProgress(20);
        break;
      case 'idea-ideation':
        setVentureProgress(25);
        break;
      case 'idea-validation':
        setVentureProgress(30);
        break;
      case 'business-plan':
        setVentureProgress(40);
        break;
      case 'product':
        setVentureProgress(50);
        break;
      case 'setup':
        setVentureProgress(60);
        break;
      case 'investment-readiness':
        setVentureProgress(70);
        break;
      case 'venture-performance':
        setVentureProgress(80);
        break;
      case 'investor-relations':
        setVentureProgress(90);
        break;
      case 'venture-complete':
        setVentureProgress(100);
        break;
      // Add more cases as needed
      default:
        break;
    }
  };

  const handleBack = (prevStep: string) => {
    setCurrentStep(prevStep);
    // Update progress based on step
    switch (prevStep) {
      case 'orientation':
        setVentureProgress(5);
        break;
      case 'knowledge-base':
        setVentureProgress(10);
        break;
      case 'idea-market-targeting':
        setVentureProgress(15);
        break;
      case 'idea-problem-definition':
        setVentureProgress(20);
        break;
      case 'idea-ideation':
        setVentureProgress(25);
        break;
      case 'idea-validation':
        setVentureProgress(30);
        break;
      case 'business-plan':
        setVentureProgress(40);
        break;
      case 'product':
        setVentureProgress(50);
        break;
      case 'setup':
        setVentureProgress(60);
        break;
      case 'investment-readiness':
        setVentureProgress(70);
        break;
      case 'venture-performance':
        setVentureProgress(80);
        break;
      // Add more cases as needed
      default:
        break;
    }
  };

  const handleExistingVentureToggle = (isExisting: boolean) => {
    setIsExistingVenture(isExisting);
  };

  const renderCurrentScreen = () => {
    switch (currentStep) {
      case 'orientation':
        return (
          <OrientationScreen
            onNext={() => handleNext('knowledge-base')}
            toggleAICompanion={toggleAICompanion}
            onExistingVentureToggle={handleExistingVentureToggle}
            isExistingVenture={isExistingVenture}
          />
        );
      case 'knowledge-base':
        return (
          <KnowledgeBaseScreen
            onNext={() => handleNext('idea-market-targeting')}
            onBack={() => handleBack('orientation')}
            toggleAICompanion={toggleAICompanion}
            isExistingVenture={isExistingVenture}
          />
        );
      case 'idea-market-targeting':
        return (
          <MarketTargetingScreen
            onNext={() => handleNext('idea-problem-definition')}
            onBack={() => handleBack('knowledge-base')}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'idea-problem-definition':
        return (
          <ProblemDefinitionScreen
            onNext={() => handleNext('idea-ideation')}
            onBack={() => handleBack('idea-market-targeting')}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'idea-ideation':
        return (
          <IdeationScreen
            onNext={() => handleNext('idea-validation')}
            onBack={() => handleBack('idea-problem-definition')}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'idea-validation':
        return (
          <IdeaValidationScreen
            onNext={() => handleNext('business-plan')}
            onBack={() => handleBack('idea-ideation')}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'business-plan':
        return (
          <BusinessPlanScreen
            onNext={() => handleNext('product')}
            onBack={() => handleBack('idea-validation')}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'product':
        return (
          <ProductScreen
            onNext={() => handleNext('setup')}
            onBack={() => handleBack('business-plan')}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'setup':
        return (
          <SetupScreen
            onNext={() => handleNext('investment-readiness')}
            onBack={() => handleBack('product')}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'investment-readiness':
        return (
          <InvestmentReadinessScreen
            onNext={() => handleNext('venture-performance')}
            onBack={() => handleBack('setup')}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'venture-performance':
        return (
          <VenturePerformanceScreen
            onNext={() => handleNext('investor-relations')}
            onBack={() => handleBack('investment-readiness')}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'investor-relations':
        return (
          <InvestorRelationsScreen
            onNext={() => handleNext('venture-complete')}
            onBack={() => handleBack('venture-performance')}
            toggleAICompanion={toggleAICompanion}
          />
        );
      case 'venture-complete':
        return (
          <div className="max-w-4xl mx-auto text-center py-16">
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/20 rounded-xl p-8">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-white mb-4">Venture Created Successfully!</h1>
              <p className="text-xl text-white/80 mb-8">
                Congratulations! Your venture has been created and is ready for launch. You can now manage your venture from the My Ventures dashboard.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300"
              >
                Go to My Ventures
              </button>
            </div>
          </div>
        );
      // Add more cases for other screens
      default:
        return (
          <OrientationScreen
            onNext={() => handleNext('knowledge-base')}
            toggleAICompanion={toggleAICompanion}
            onExistingVentureToggle={handleExistingVentureToggle}
            isExistingVenture={isExistingVenture}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Expanded Left Sidebar - Venture Progress */}
        <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/10 backdrop-blur-md border-r border-white/20 transition-all duration-300 z-30 w-64 overflow-y-auto" style={{ 
          marginLeft: isAICompanionOpen ? '64px' : '256px',
          width: isAICompanionOpen ? '0' : '256px',
          opacity: isAICompanionOpen ? '0' : '1',
          pointerEvents: isAICompanionOpen ? 'none' : 'auto'
        }}>
          <div className="p-4 border-b border-white/20">
            <div className="flex items-center justify-center mb-2">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-white/10"></div>
                <div 
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  style={{ 
                    clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
                    opacity: 0.3
                  }}
                ></div>
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{ 
                    background: `conic-gradient(from 0deg, #8B5CF6 0%, #3B82F6 ${ventureProgress}%, transparent ${ventureProgress}%, transparent 100%)`
                  }}
                ></div>
                <div className="absolute inset-2 rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{ventureProgress}%</span>
                </div>
              </div>
            </div>
            <div className="text-center text-white font-semibold mt-2">Venture Completion</div>
          </div>

          {/* Orientation & Knowledge-base */}
          <div className="p-4 border-b border-white/20">
            <button
              onClick={() => setCurrentStep('orientation')}
              className={`w-full text-left px-3 py-2 rounded-lg mb-2 ${
                currentStep === 'orientation' ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Orientation
            </button>
            <button
              onClick={() => currentStep !== 'orientation' && setCurrentStep('knowledge-base')}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                currentStep === 'knowledge-base' ? 'bg-white/10 text-white' : 'text-white/70 hover:text-white hover:bg-white/5'
              } ${currentStep === 'orientation' ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={currentStep === 'orientation'}
            >
              Venture Knowledge-base
            </button>
          </div>

          {/* Venture Building tabs */}
          <div className="p-2">
            <div className="text-white/60 text-xs uppercase font-semibold mb-2">Venture Building</div>
            <div className="space-y-1">
              {/* Idea Flow Tabs */}
              <IdeaFlowTabs
                activeTab={activeIdeaTab}
                onTabChange={(tab) => {
                  setActiveIdeaTab(tab);
                  setCurrentStep(`idea-${tab}`);
                }}
                ventureProgress={ventureProgress}
              />
              
              {/* Business Plan Tabs */}
              <BusinessPlanTabs
                activeTab={activeBusinessPlanTab}
                onTabChange={(tab) => {
                  setActiveBusinessPlanTab(tab);
                  setCurrentStep('business-plan');
                }}
                ventureProgress={ventureProgress}
              />
              
              {/* Product Tabs */}
              <ProductTabs
                activeTab={activeProductTab}
                onTabChange={(tab) => {
                  setActiveProductTab(tab);
                  setCurrentStep('product');
                }}
                ventureProgress={ventureProgress}
              />
              
              {/* Setup Tabs */}
              <SetupTabs
                activeTab={activeSetupTab}
                onTabChange={(tab) => {
                  setActiveSetupTab(tab);
                  setCurrentStep('setup');
                }}
                ventureProgress={ventureProgress}
              />
              
              {/* Investment Readiness Tabs */}
              <InvestmentReadinessTabs
                activeTab={activeInvestmentTab}
                onTabChange={(tab) => {
                  setActiveInvestmentTab(tab);
                  setCurrentStep('investment-readiness');
                }}
                ventureProgress={ventureProgress}
              />
              
              {/* Performance Tabs */}
              <PerformanceTabs
                activeTab={activePerformanceTab}
                onTabChange={(tab) => {
                  setActivePerformanceTab(tab);
                  setCurrentStep('venture-performance');
                }}
                ventureProgress={ventureProgress}
              />
              
              {/* Investor Relations Tabs */}
              <InvestorRelationsTabs
                activeTab={activeInvestorRelationsTab}
                onTabChange={(tab) => {
                  setActiveInvestorRelationsTab(tab);
                  setCurrentStep('investor-relations');
                }}
                ventureProgress={ventureProgress}
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div 
          className="transition-all duration-300"
          style={{ 
            marginLeft: isAICompanionOpen ? '64px' : '256px',
            marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
          }}
        >
          {renderCurrentScreen()}
        </div>
      </div>
    </div>
  );
}

export default NewVenturePage;