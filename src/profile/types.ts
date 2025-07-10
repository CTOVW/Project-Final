/**
 * Profile Section Type Definitions
 * Contains all interfaces related to user profiles, preferences, and settings
 */

// ============================================================================
// COMMON TYPES AND ENUMS
// ============================================================================

/**
 * User roles in the platform
 */
export type UserRole = 'founder' | 'investor' | 'expert';

/**
 * Language options
 */
export type Language = 'English' | 'Arabic' | 'French' | 'Other';

/**
 * Risk tolerance levels
 */
export type RiskTolerance = 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';

/**
 * Decision making styles
 */
export type DecisionMakingStyle = 'Analytical' | 'Intuitive' | 'Consultative' | 'Directive' | 'Adaptive';

/**
 * Leadership styles
 */
export type LeadershipStyle = 'Visionary' | 'Coaching' | 'Affiliative' | 'Democratic' | 'Pacesetting' | 'Commanding';

/**
 * Learning preferences
 */
export type LearningPreference = 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic' | 'Multimodal';

/**
 * Communication styles
 */
export type CommunicationStyle = 'Direct' | 'Analytical' | 'Intuitive' | 'Functional';

/**
 * Company types
 */
export type CompanyType = 'startup' | 'scaleup' | 'sme' | 'enterprise' | 'vc' | 'pe' | 'family_office' | 'angel' | 'consulting' | 'other';

/**
 * Industry focus options
 */
export type Industry = 'Fintech' | 'Healthtech' | 'E-commerce' | 'EdTech' | 'PropTech' | 'CleanTech' | 'AI/ML' | 'Blockchain' | 'Other';

/**
 * Sub-industry options
 */
export type SubIndustry = 'Digital Payments' | 'Telemedicine' | 'Online Retail' | 'E-learning Platforms' | 'Smart Homes' | 'Solar Energy' | 'Other';

/**
 * Market focus options
 */
export type Market = 'MENA' | 'GCC' | 'North Africa' | 'Europe' | 'North America' | 'Asia' | 'Global' | 'Other';

/**
 * Business model types
 */
export type BusinessModel = 'B2B' | 'B2C' | 'B2B2C' | 'Enterprise' | 'SME' | 'Consumer' | 'Other';

/**
 * Venture stages
 */
export type VentureStage = 'Idea' | 'Pre-seed' | 'Seed' | 'Series A' | 'Series B+' | 'Growth' | 'Mature';

/**
 * Investment instruments
 */
export type InvestmentInstrument = 'Equity' | 'Convertible Note' | 'SAFE' | 'Debt' | 'Revenue Share' | 'Other';

// ============================================================================
// PROFILE DATA INTERFACES
// ============================================================================

/**
 * Personal information interface
 */
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedinProfile: string;
  country: string;
  language: Language;
  profilePicture?: string;
}

/**
 * Professional background interface
 */
export interface ProfessionalBackground {
  currentOccupation: string;
  yearsExperience: string;
  entrepreneurialExperience: string;
  industryExpertise: string;
  marketExpertise: string;
  keySkills: string;
}

/**
 * Business information interface
 */
export interface BusinessInfo {
  company: string;
  companyLinkedin: string;
  companyType: CompanyType;
  industryFocus: string;
  origin: string;
  companySize: string;
  portfolioSize: string;
  headquarters: string;
  operatingMarkets: string;
  targetClients: string;
  keyCapabilities: string;
}

/**
 * Complete profile data interface
 */
export interface ProfileData {
  personalInfo: PersonalInfo;
  professionalBackground: ProfessionalBackground;
  businessInfo: BusinessInfo;
  role: UserRole;
}

/**
 * Reputation metrics interface
 */
export interface ReputationMetrics {
  trustScore: number;
  endorsementsCount: number;
  completedTransactions: number;
  platformTenure: string; // e.g., "2 years"
}

/**
 * Activity summary interface
 */
export interface ActivitySummary {
  recentPosts: number;
  connectionsMade: number;
  venturesInteracted: number;
  achievementsUnlocked: number;
}

/**
 * Professional achievement interface
 */
export interface ProfessionalAchievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'success_story' | 'portfolio_highlight' | 'testimonial' | 'award';
}

// ============================================================================
// PREFERENCES DATA INTERFACES
// ============================================================================

/**
 * Base preferences shared by all roles
 */
export interface BasePreferences {
  riskTolerance: RiskTolerance;
  decisionMakingStyle: DecisionMakingStyle;
  leadershipStyle: LeadershipStyle;
  learningPreference: LearningPreference;
  communicationPreference: string;
  toolPreference: string;
}

/**
 * Portfolio interests for founders
 */
export interface FounderPortfolioInterests {
  industriesOfInterest: Industry[];
  subIndustriesOfInterest: SubIndustry[];
  desiredMarketFocus: Market[];
  businessModelInterest: BusinessModel[];
  growthExpectations: string;
  buildingApproach: string;
  diversificationLevel: string;
  allocationStrategy: string;
  targetReturns: string;
  exitStrategy: string;
}

/**
 * Portfolio interests for investors
 */
export interface InvestorPortfolioInterests {
  targetMarkets: Market[];
  outsideIndustryInterests: boolean;
  industryInterests: Industry[];
  industryChallenges: string;
  businessModelInterest: BusinessModel[];
  growthExpectations: string;
  existingPortfolio: boolean;
  portfolioManagementApproach: string;
  portfolioGoals: string;
}

/**
 * Portfolio interests for experts
 */
export interface ExpertPortfolioInterests {
  targetMarkets: Market[];
  outsideIndustryInterests: boolean;
  industryInterests: Industry[];
  industryChallenges: string;
  businessModelInterest: BusinessModel[];
  growthExpectations: string;
  existingPortfolio: boolean;
  portfolioManagementApproach: string;
  portfolioGoals: string;
}

/**
 * Complete preferences data interface
 */
export interface PreferencesData {
  basePreferences: BasePreferences;
  founderInterests?: FounderPortfolioInterests;
  investorInterests?: InvestorPortfolioInterests;
  expertInterests?: ExpertPortfolioInterests;
}

// ============================================================================
// STRATEGY/THESIS DATA INTERFACES
// ============================================================================

/**
 * Base strategy overview shared by all roles
 */
export interface StrategyOverview {
  strategicGoals: string;
  strategicObjectives: string;
  philosophy: string;
  riskAppetite: string;
  esgConsiderations: string;
  capabilities: string;
  keyMetrics: string;
}

/**
 * Portfolio direction for founders
 */
export interface FounderPortfolioDirection {
  totalBootstrapFund: number;
  industryFocus: Industry[];
  geographicalFocus: Market[];
  problemFocus: string;
  businessModelFocus: BusinessModel[];
  buildingApproach: string;
  diversificationLevel: string;
  allocationStrategy: string;
  exitStrategy: string;
}

/**
 * Venture founding criteria for founders
 */
export interface VentureFoundingCriteria {
  buildingFundSize: number;
  avgTicketSize: number;
  portfolioSize: number;
  joiningType: string;
  ventureStage: VentureStage[];
  equityOwnership: string;
  targetPosition: string;
  cofoundersCriteria: string;
}

/**
 * Portfolio direction for investors
 */
export interface InvestorPortfolioDirection {
  investmentType: string;
  industryFocus: Industry[];
  geographicalFocus: Market[];
  problemFocus: string;
  investmentStages: VentureStage[];
  businessModelFocus: BusinessModel[];
  founderCriteria: string;
  diversificationLevel: string;
  allocationStrategy: string;
}

/**
 * Venture investment criteria for investors
 */
export interface VentureInvestmentCriteria {
  investmentFundSize: number;
  avgTicketSize: number;
  portfolioSize: number;
  investmentStages: VentureStage[];
  avgValuation: number;
  equityOwnership: string;
  investmentInstruments: InvestmentInstrument[];
  roundInvestorType: string;
  followOnPercentage: number;
  deploymentPlan: string;
  portfolioConstruction: string;
  riskAppetite: string;
  exitStrategy: string;
  targetReturns: string;
  dealTerms: string;
}

/**
 * Portfolio direction for experts
 */
export interface ExpertPortfolioDirection {
  serviceTypes: string[];
  industryFocus: Industry[];
  geographicFocus: Market[];
  problemFocus: string;
  ventureStage: VentureStage[];
  founderCriteria: string;
  engagementDiversity: string;
  deliveryApproach: string;
}

/**
 * Commercial criteria for experts
 */
export interface CommercialCriteria {
  pricingStructure: string;
  timeCommitment: string;
  engagementCapacity: string;
  revenueTargets: number;
  paymentPreferences: string;
  availabilitySchedule: string;
  relationshipDuration: string;
}

/**
 * Complete strategy/thesis data interface for founders
 */
export interface FounderThesisData {
  strategyOverview: StrategyOverview;
  portfolioDirection: FounderPortfolioDirection;
  foundingCriteria: VentureFoundingCriteria;
}

/**
 * Complete strategy/thesis data interface for investors
 */
export interface InvestorThesisData {
  strategyOverview: StrategyOverview;
  portfolioDirection: InvestorPortfolioDirection;
  investmentCriteria: VentureInvestmentCriteria;
}

/**
 * Complete strategy/thesis data interface for experts
 */
export interface ExpertThesisData {
  strategyOverview: StrategyOverview;
  portfolioDirection: ExpertPortfolioDirection;
  commercialCriteria: CommercialCriteria;
}

// ============================================================================
// SETTINGS DATA INTERFACES
// ============================================================================

/**
 * Account information settings
 */
export interface AccountInformation {
  username: string;
  accountType: UserRole;
  memberSince: Date;
  accountStatus: 'active' | 'inactive' | 'suspended';
  verificationLevel: 'unverified' | 'basic' | 'verified' | 'premium';
  email: string;
  recoveryEmail: string;
  twoFactorEnabled: boolean;
  securityQuestionsSet: boolean;
}

/**
 * Subscription management settings
 */
export interface SubscriptionManagement {
  planType: 'basic' | 'professional' | 'enterprise';
  billingCycle: 'monthly' | 'annual';
  nextBillingDate: Date;
  usageStatistics: {
    connectionsUsed: number;
    connectionsTotal: number;
    dealsAnalyzed: number;
    dealsTotal: number;
    storageUsed: number;
    storageTotal: number;
  };
  paymentMethod: {
    type: 'credit_card' | 'paypal' | 'bank_transfer';
    lastFour?: string;
    expiryDate?: string;
    name?: string;
  };
}

/**
 * Notification preferences settings
 */
export interface NotificationPreferences {
  emailNotifications: {
    newConnections: boolean;
    investmentOpportunities: boolean;
    mentorRequests: boolean;
    platformUpdates: boolean;
    weeklyDigest: boolean;
    monthlyReports: boolean;
  };
  pushNotifications: {
    realTimeMessages: boolean;
    dealAlerts: boolean;
    activityUpdates: boolean;
    reminderNotifications: boolean;
  };
  frequencySettings: 'immediate' | 'daily' | 'weekly' | 'custom';
  customSchedule?: string; // Time in HH:MM format
}

/**
 * Platform preferences settings
 */
export interface PlatformPreferences {
  language: Language;
  timeZone: string;
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  currencyDisplay: 'USD' | 'EGP' | 'EUR' | 'SAR' | 'AED';
}

/**
 * AI companion settings
 */
export interface AICompanionSettings {
  proactivityLevel: number; // 1-10 scale
  suggestionFrequency: 'low' | 'medium' | 'high';
  autoCompleteEnabled: boolean;
  learningFromInteractions: boolean;
  assistanceAreas: {
    businessPlanReview: boolean;
    marketAnalysis: boolean;
    investmentScreening: boolean;
    networkSuggestions: boolean;
    contentCuration: boolean;
  };
  communicationStyle: 'professional' | 'casual' | 'technical';
  expertiseLevel: number; // 1-10 scale (beginner to expert)
}

/**
 * Integration settings
 */
export interface IntegrationSettings {
  connectedAccounts: {
    linkedin: {
      connected: boolean;
      syncEnabled: boolean;
      lastSync?: Date;
    };
    googleCalendar: {
      connected: boolean;
      permissions: string[];
      lastSync?: Date;
    };
    zoom: {
      connected: boolean;
      autoJoin: boolean;
      lastSync?: Date;
    };
    banking: {
      connected: boolean;
      provider?: string;
      lastSync?: Date;
    };
  };
  apiAccess: {
    developerMode: boolean;
    apiKeyActive: boolean;
    webhookUrls: string[];
  };
  dataSync: {
    autoSyncFrequency: 'hourly' | 'daily' | 'weekly' | 'manual';
    conflictResolution: 'local' | 'remote' | 'ask';
    lastSyncStatus: 'success' | 'failed' | 'pending' | 'never';
    lastSyncTime?: Date;
  };
}

/**
 * Accessibility options settings
 */
export interface AccessibilityOptions {
  visualAccessibility: {
    highContrastMode: boolean;
    fontSize: 'small' | 'medium' | 'large' | 'extra_large';
    fontFamily: 'standard' | 'dyslexia_friendly';
    colorBlindSupport: boolean;
    colorBlindType?: 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
  };
  navigationAccessibility: {
    keyboardNavigation: boolean;
    screenReaderOptimization: boolean;
    reducedMotion: boolean;
    enhancedFocusIndicators: boolean;
  };
  audioAccessibility: {
    audioDescriptions: boolean;
    soundNotifications: boolean;
    volume: number; // 0-100 scale
  };
}

/**
 * Complete settings data interface
 */
export interface SettingsData {
  accountInformation: AccountInformation;
  subscriptionManagement: SubscriptionManagement;
  notificationPreferences: NotificationPreferences;
  platformPreferences: PlatformPreferences;
  aiCompanionSettings: AICompanionSettings;
  integrationSettings: IntegrationSettings;
  accessibilityOptions: AccessibilityOptions;
}

// ============================================================================
// PRIVACY DATA INTERFACES
// ============================================================================

/**
 * Profile visibility settings
 */
export interface ProfileVisibility {
  profileVisibleTo: 'everyone' | 'connections' | 'connections_of_connections' | 'nobody';
  showEmail: boolean;
  showPhone: boolean;
  showLinkedIn: boolean;
  showCompanyDetails: boolean;
  showInvestmentHistory: boolean;
  showPortfolioCompanies: boolean;
  showExpertiseAreas: boolean;
  allowProfileIndexing: boolean;
}

/**
 * Data sharing preferences
 */
export interface DataSharingPreferences {
  shareActivityWithConnections: boolean;
  shareInvestmentInterests: boolean;
  shareFundingActivity: boolean;
  shareExpertiseInsights: boolean;
  allowAnonymizedDataUse: boolean;
  allowAITrainingOnData: boolean;
  allowThirdPartyDataSharing: boolean;
  dataRetentionPeriod: 'standard' | 'extended' | 'minimal';
}

/**
 * Contact permissions
 */
export interface ContactPermissions {
  allowConnectionRequests: boolean;
  allowMessagesFrom: 'everyone' | 'connections' | 'nobody';
  allowInvestmentProposals: boolean;
  allowMentorshipRequests: boolean;
  allowEventInvitations: boolean;
  allowServiceOffers: boolean;
  blockList: string[]; // Array of user IDs
}

/**
 * Complete privacy data interface
 */
export interface PrivacyData {
  profileVisibility: ProfileVisibility;
  dataSharingPreferences: DataSharingPreferences;
  contactPermissions: ContactPermissions;
}
