export interface Trade {
  id: string;
  tradeDateTime: Date;
  tradeType: 'Primary' | 'Secondary';
  ventureName: string;
  investorBuyerName: string;
  investorSellerName?: string; // Optional for secondary market trades
  tradeValue: number;
}

export interface PrimaryDealDetails {
  ask: number; // Amount being asked for
  valuation: number; // Pre-money valuation
  equityPercentage: number;
  stage: 'Pre-seed' | 'Seed' | 'Series A' | 'Series B+' | 'Growth';
}

export interface SecondaryDealDetails {
  sharesAvailable: number;
  askingPrice: number;
  originalRound: string;
  originalDate: Date;
  sellerType: 'Individual' | 'Fund' | 'Employee';
  sellerName: string;
  currentValuation: number;
}

export interface TractionMetrics {
  arrMrr: number; // Annual Recurring Revenue / Monthly Recurring Revenue
  growthPercentage: number;
  users: number;
  teamSize: number;
}

export interface OpportunityStats {
  views: number;
  saves: number;
  closingInDays: number;
}

export interface Opportunity {
  id: string;
  ventureName: string;
  shortDescription: string;
  relevanceScore: number; // AI matching score
  industry: string;
  hq: string; // Headquarters location
  postDate: Date;
  dealType: 'Primary' | 'Secondary';
  primaryDealDetails?: PrimaryDealDetails;
  secondaryDealDetails?: SecondaryDealDetails;
  progress: 'Foundation' | 'Product' | 'GTM' | 'Traction';
  traction: TractionMetrics;
  opportunityStats: OpportunityStats;
  isSaved: boolean;
  logo: string; // URL to venture logo
}

export interface MarketStat {
  label: string;
  value: string;
  unit: string;
  icon: string; // Lucide React icon name as a string
  color: string; // Tailwind CSS color class
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface GrowthData {
  period: string; // e.g., "Jan", "Feb"
  volume: number;
}

export interface RecentUpdate {
  id: string;
  title: string;
  intro: string;
  date: Date;
}

export interface InvestmentProfileStats {
  dealsCount: number;
  totalDealVolume: number;
  activeDealsInPipeline: number;
}

export interface BusinessModelDetails {
  who: string;
  what: string;
  how: string;
  why: string;
}

export interface MarketAnalysisDetails {
  overview: string;
  problems: string;
  trends: string;
  competitiveLandscape: string;
}

export interface TeamMember {
  name: string;
  position: string;
  experienceYears: number;
  background: string;
  keySkills: string[];
  profilePicture: string;
}

export interface TractionDetails {
  revenue: number;
  users: number;
  cac: number; // Customer Acquisition Cost
  cltv: number; // Customer Lifetime Value
  churnRate: number;
  grossMargin: number;
}

export interface ProjectionDetails {
  revenueGrowth: string;
  usersGrowth: string;
  avgCAC: string;
  avgCLTV: string;
  avgChurnRate: string;
  grossMarginGrowth: string;
}

export interface RoundDynamicsDetails {
  round: string;
  roundSize: number;
  minTicketSize: number;
  roundInstrument: string;
  valuation: number;
  valuationMethodology: string;
  runway: string; // e.g., "18 months"
  useOfFunds: string;
  keyDealTerms: string;
}

export interface ScoringRiskAssessmentDetails {
  desirabilityScore: number;
  viabilityScore: number;
  feasibilityScore: number;
  impactScore: number;
}

export interface DealScreeningData {
  id: string;
  logo: string;
  name: string;
  shortDescription: string;
  industry: string;
  hq: string;
  stage: string;
  dealSizeAsk: number;
  valuation: number;
  pitchDeck: string[]; // Array of image URLs for slides
  businessModel: BusinessModelDetails;
  marketAnalysis: MarketAnalysisDetails;
  team: TeamMember[];
  tractionMetrics: TractionDetails;
  projections: ProjectionDetails;
  roundDynamics: RoundDynamicsDetails;
  scoringRiskAssessment: ScoringRiskAssessmentDetails;
}

// Sample data
export const sampleInvestmentStats: InvestmentProfileStats = {
  dealsCount: 12,
  totalDealVolume: 2500000,
  activeDealsInPipeline: 5
};

export const sampleMarketStats: MarketStat[] = [
  {
    label: 'Total Traded Volume',
    value: '$2.3B',
    unit: 'USD',
    icon: 'DollarSign',
    color: 'blue'
  },
  {
    label: 'Total Number of Trades',
    value: '1,247',
    unit: 'trades',
    icon: 'TrendingUp',
    color: 'green'
  },
  {
    label: 'Average Trade Volume',
    value: '$1.8M',
    unit: 'USD',
    icon: 'BarChart3',
    color: 'purple'
  },
  {
    label: 'Number of Active Deals',
    value: '89',
    unit: 'deals',
    icon: 'Target',
    color: 'yellow'
  }
];

export const sampleTradesPerMarket: ChartDataPoint[] = [
  { label: 'UAE', value: 35 },
  { label: 'Saudi Arabia', value: 28 },
  { label: 'Egypt', value: 18 },
  { label: 'Jordan', value: 12 },
  { label: 'Other', value: 7 }
];

export const sampleTradesPerIndustry: ChartDataPoint[] = [
  { label: 'Fintech', value: 32 },
  { label: 'E-commerce', value: 24 },
  { label: 'Healthtech', value: 18 },
  { label: 'EdTech', value: 15 },
  { label: 'Other', value: 11 }
];

export const sampleTradingGrowth: GrowthData[] = [
  { period: 'Jan', volume: 180 },
  { period: 'Feb', volume: 220 },
  { period: 'Mar', volume: 195 },
  { period: 'Apr', volume: 280 },
  { period: 'May', volume: 320 },
  { period: 'Jun', volume: 290 },
  { period: 'Jul', volume: 350 },
  { period: 'Aug', volume: 380 },
  { period: 'Sep', volume: 420 },
  { period: 'Oct', volume: 450 },
  { period: 'Nov', volume: 480 },
  { period: 'Dec', volume: 520 }
];

export const sampleRecentUpdates: RecentUpdate[] = [
  {
    id: 'update1',
    title: 'MENA Venture Capital Market Reaches Record High',
    intro: 'The MENA region saw unprecedented venture capital activity in Q4 2024, with total investments reaching $2.3B...',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 'update2',
    title: 'New Regulatory Framework for Secondary Trading',
    intro: 'UAE Securities and Commodities Authority announces new guidelines for private equity secondary market transactions...',
    date: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
  },
  {
    id: 'update3',
    title: 'Saudi Arabia Launches $500M Venture Fund',
    intro: 'The Public Investment Fund announces a new dedicated venture capital fund targeting early-stage startups...',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

export const sampleRecentTrades: Trade[] = [
  {
    id: 'trade1',
    tradeDateTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    tradeType: 'Primary',
    ventureName: 'PayMENA',
    investorBuyerName: 'MENA Ventures',
    tradeValue: 5000000
  },
  {
    id: 'trade2',
    tradeDateTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    tradeType: 'Secondary',
    ventureName: 'HealthTech Solutions',
    investorBuyerName: 'Gulf Capital',
    investorSellerName: 'Early Stage Fund',
    tradeValue: 2500000
  },
  {
    id: 'trade3',
    tradeDateTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    tradeType: 'Primary',
    ventureName: 'EduPlatform',
    investorBuyerName: 'Innovation Capital',
    tradeValue: 3200000
  },
  {
    id: 'trade4',
    tradeDateTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    tradeType: 'Secondary',
    ventureName: 'LogiFlow',
    investorBuyerName: 'Regional Growth Fund',
    investorSellerName: 'Seed Investor',
    tradeValue: 1800000
  }
];

export const sampleOpportunities: Opportunity[] = [
  {
    id: 'opp1',
    ventureName: 'PayMENA',
    shortDescription: 'Digital payment platform revolutionizing financial transactions across MENA',
    relevanceScore: 95,
    industry: 'Fintech',
    hq: 'Dubai, UAE',
    postDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    dealType: 'Primary',
    primaryDealDetails: {
      ask: 8000000,
      valuation: 32000000,
      equityPercentage: 20,
      stage: 'Series A'
    },
    progress: 'Traction',
    traction: {
      arrMrr: 2400000,
      growthPercentage: 45,
      users: 125000,
      teamSize: 28
    },
    opportunityStats: {
      views: 1247,
      saves: 89,
      closingInDays: 15
    },
    isSaved: false,
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  },
  {
    id: 'opp2',
    ventureName: 'HealthTech Solutions',
    shortDescription: 'AI-powered telemedicine platform connecting patients with healthcare providers',
    relevanceScore: 88,
    industry: 'Healthtech',
    hq: 'Riyadh, Saudi Arabia',
    postDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    dealType: 'Secondary',
    secondaryDealDetails: {
      sharesAvailable: 50000,
      askingPrice: 4500000,
      originalRound: 'Seed',
      originalDate: new Date(Date.now() - 18 * 30 * 24 * 60 * 60 * 1000),
      sellerType: 'Fund',
      sellerName: 'Early Stage Ventures',
      currentValuation: 18000000
    },
    progress: 'GTM',
    traction: {
      arrMrr: 1200000,
      growthPercentage: 67,
      users: 45000,
      teamSize: 18
    },
    opportunityStats: {
      views: 892,
      saves: 67,
      closingInDays: 22
    },
    isSaved: true,
    logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  },
  {
    id: 'opp3',
    ventureName: 'EduPlatform',
    shortDescription: 'Online learning platform for professional development in emerging markets',
    relevanceScore: 82,
    industry: 'EdTech',
    hq: 'Cairo, Egypt',
    postDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    dealType: 'Primary',
    primaryDealDetails: {
      ask: 3500000,
      valuation: 14000000,
      equityPercentage: 20,
      stage: 'Seed'
    },
    progress: 'Product',
    traction: {
      arrMrr: 480000,
      growthPercentage: 89,
      users: 12000,
      teamSize: 12
    },
    opportunityStats: {
      views: 654,
      saves: 45,
      closingInDays: 30
    },
    isSaved: false,
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  }
];

export const sampleActiveDealsStats = {
  numberOfActiveDeals: 89,
  totalDealSize: 245000000,
  averageDealSize: 2750000,
  averageDealValuation: 12500000
};

export const sampleActiveDealsPerIndustry: ChartDataPoint[] = [
  { label: 'Fintech', value: 28 },
  { label: 'E-commerce', value: 22 },
  { label: 'Healthtech', value: 16 },
  { label: 'EdTech', value: 12 },
  { label: 'Other', value: 11 }
];

export const sampleActiveDealsPerMarket: ChartDataPoint[] = [
  { label: 'UAE', value: 32 },
  { label: 'Saudi Arabia', value: 25 },
  { label: 'Egypt', value: 18 },
  { label: 'Jordan', value: 9 },
  { label: 'Other', value: 5 }
];

export const sampleDealScreeningData: DealScreeningData = {
  id: 'deal1',
  logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  name: 'PayMENA',
  shortDescription: 'Digital payment platform revolutionizing financial transactions across MENA',
  industry: 'Fintech',
  hq: 'Dubai, UAE',
  stage: 'Series A',
  dealSizeAsk: 8000000,
  valuation: 32000000,
  pitchDeck: [
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
  ],
  businessModel: {
    who: 'SMEs and individuals in MENA region seeking digital payment solutions',
    what: 'Comprehensive digital payment platform with multi-currency support and compliance',
    how: 'SaaS model with transaction fees and premium features subscription',
    why: 'Growing digital transformation and need for secure, compliant payment solutions'
  },
  marketAnalysis: {
    overview: 'MENA digital payments market valued at $8.2B with 23% CAGR expected through 2027',
    problems: 'Fragmented payment landscape, regulatory complexity, limited cross-border solutions',
    trends: 'Increasing mobile adoption, government digitization initiatives, fintech-friendly regulations',
    competitiveLandscape: 'Competing with traditional banks, regional fintechs, and global players like PayPal'
  },
  team: [
    {
      name: 'Ahmed Al-Rashid',
      position: 'CEO & Co-founder',
      experienceYears: 12,
      background: 'Former VP at Emirates NBD, MBA from INSEAD',
      keySkills: ['Fintech', 'Strategy', 'Fundraising'],
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      name: 'Sarah Hassan',
      position: 'CTO & Co-founder',
      experienceYears: 10,
      background: 'Former Lead Engineer at Careem, MS Computer Science',
      keySkills: ['Software Engineering', 'Blockchain', 'Security'],
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ],
  tractionMetrics: {
    revenue: 2400000,
    users: 125000,
    cac: 45,
    cltv: 890,
    churnRate: 3.2,
    grossMargin: 78
  },
  projections: {
    revenueGrowth: '300% over next 3 years',
    usersGrowth: '500% over next 3 years',
    avgCAC: 'Decrease to $35 through optimization',
    avgCLTV: 'Increase to $1,200 through premium features',
    avgChurnRate: 'Reduce to 2.1% through improved UX',
    grossMarginGrowth: 'Maintain 75-80% through scale'
  },
  roundDynamics: {
    round: 'Series A',
    roundSize: 8000000,
    minTicketSize: 250000,
    roundInstrument: 'Preferred Shares',
    valuation: 32000000,
    valuationMethodology: 'Revenue multiple (13.3x ARR) based on comparable fintech companies',
    runway: '24 months',
    useOfFunds: '40% Product Development, 30% Market Expansion, 20% Team Growth, 10% Working Capital',
    keyDealTerms: 'Anti-dilution protection, Board seat for lead investor, 1x liquidation preference'
  },
  scoringRiskAssessment: {
    desirabilityScore: 85,
    viabilityScore: 78,
    feasibilityScore: 82,
    impactScore: 88
  }
};