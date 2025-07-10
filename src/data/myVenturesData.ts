import { 
  Building2, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  AlertTriangle
} from 'lucide-react';

// Data structures for My Ventures section

// Portfolio Summary Dashboard
export interface VenturePortfolioSummary {
  totalPortfolioValue: number;
  numberOfVentures: number;
  totalFundsRaised: number;
  numberOfExits: number;
  totalGain: number;
  portfolioBreakdown: {
    byStage: { [key: string]: number };
    byIndustry: { [key: string]: number };
    byPerformance: { [key: string]: number };
  };
  recentActivity: {
    id: string;
    type: 'funding' | 'milestone' | 'launch' | 'exit';
    venture: string;
    description: string;
    date: Date;
  }[];
}

export interface VentureData {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  stage: string;
  progress: number;
  fundingStatus: 'Not Started' | 'In Progress' | 'Funded' | 'Exited';
  totalFundsRaised: number;
  monthlyRevenue: number;
  growthRate: number;
  userCount: number;
  teamSize: number;
  lastUpdated: Date;
  alerts: {
    id: string;
    type: 'warning' | 'critical' | 'info';
    message: string;
  }[];
}

export interface DetailedVentureData extends VentureData {
  website: string;
  contactEmail: string;
  keyHighlights: {
    totalRevenue: number;
    totalUsers: number;
    fundingStage: string;
  };
  founders: {
    name: string;
    title: string;
    image: string;
    linkedinProfile: string;
  }[];
  teamMembers: {
    name: string;
    title: string;
    image: string;
    department: string;
  }[];
  productVision: string;
  coreFeatures: string[];
  roadmap: {
    phase: string;
    timeline: string;
    description: string;
    status: 'completed' | 'in-progress' | 'planned';
  }[];
  keyActivities: string[];
  keyResources: string[];
  keyPartners: string[];
  financialMetrics: {
    mrr: number;
    arr: number;
    burnRate: number;
    runway: number;
    grossMargin: number;
  };
  businessMetrics: {
    cac: number;
    ltv: number;
    churnRate: number;
    conversionRate: number;
    activeUsers: number;
  };
  marketMetrics: {
    marketSize: string;
    marketGrowth: string;
    marketShare: string;
    competitorCount: number;
  };
  fundingHistory: {
    round: string;
    amount: number;
    date: Date;
    investors: string[];
    valuation: number;
  }[];
  capTableSummary: {
    founders: number;
    investors: number;
    employees: number;
    optionPool: number;
  };
  uploadedDocuments: {
    id: string;
    name: string;
    type: string;
    dateUploaded: Date;
    category: 'legal' | 'financial' | 'product' | 'marketing' | 'other';
  }[];
}

export interface MarketUpdate {
  id: string;
  title: string;
  description: string;
  date: Date;
  source: string;
  url: string;
}

// Sample Data
export const sampleVenturePortfolioSummary: VenturePortfolioSummary = {
  totalPortfolioValue: 15000000,
  numberOfVentures: 5,
  totalFundsRaised: 7500000,
  numberOfExits: 1,
  totalGain: 2500000,
  portfolioBreakdown: {
    byStage: {
      'Idea': 20,
      'MVP': 40,
      'Growth': 30,
      'Mature': 10
    },
    byIndustry: {
      'Fintech': 30,
      'Healthtech': 25,
      'E-commerce': 20,
      'SaaS': 15,
      'Other': 10
    },
    byPerformance: {
      'Exceeding': 30,
      'On Track': 40,
      'Needs Attention': 20,
      'Underperforming': 10
    }
  },
  recentActivity: [
    {
      id: 'activity1',
      type: 'funding',
      venture: 'FinTech Solutions',
      description: 'Closed $2M seed round led by MENA Ventures',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
      id: 'activity2',
      type: 'milestone',
      venture: 'HealthTech Innovations',
      description: 'Reached 10,000 active users milestone',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
    },
    {
      id: 'activity3',
      type: 'launch',
      venture: 'E-commerce Platform',
      description: 'Launched new mobile app with enhanced features',
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) // 21 days ago
    },
    {
      id: 'activity4',
      type: 'exit',
      venture: 'SaaS Analytics',
      description: 'Acquired by Tech Giant Inc. for $12M',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) // 60 days ago
    }
  ]
};

export const sampleVentures: VentureData[] = [
  {
    id: 'venture1',
    name: 'FinTech Solutions',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    description: 'Digital payment platform revolutionizing financial transactions across MENA',
    industry: 'Fintech',
    stage: 'Growth',
    progress: 75,
    fundingStatus: 'Funded',
    totalFundsRaised: 2000000,
    monthlyRevenue: 150000,
    growthRate: 15,
    userCount: 25000,
    teamSize: 18,
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    alerts: [
      {
        id: 'alert1',
        type: 'info',
        message: 'New partnership opportunity with major bank'
      }
    ]
  },
  {
    id: 'venture2',
    name: 'HealthTech Innovations',
    logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    description: 'AI-powered telemedicine platform connecting patients with healthcare providers',
    industry: 'Healthtech',
    stage: 'MVP',
    progress: 45,
    fundingStatus: 'In Progress',
    totalFundsRaised: 500000,
    monthlyRevenue: 30000,
    growthRate: 25,
    userCount: 10000,
    teamSize: 8,
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    alerts: [
      {
        id: 'alert2',
        type: 'warning',
        message: 'User acquisition below target by 15%'
      }
    ]
  },
  {
    id: 'venture3',
    name: 'E-commerce Platform',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    description: 'Marketplace connecting local artisans with global customers',
    industry: 'E-commerce',
    stage: 'Growth',
    progress: 60,
    fundingStatus: 'Funded',
    totalFundsRaised: 1500000,
    monthlyRevenue: 120000,
    growthRate: 18,
    userCount: 35000,
    teamSize: 12,
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    alerts: [
      {
        id: 'alert3',
        type: 'critical',
        message: 'Supply chain disruption affecting delivery times'
      }
    ]
  },
  {
    id: 'venture4',
    name: 'SaaS Analytics',
    logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    description: 'Business intelligence platform for SMEs',
    industry: 'SaaS',
    stage: 'Mature',
    progress: 100,
    fundingStatus: 'Exited',
    totalFundsRaised: 3500000,
    monthlyRevenue: 0, // Exited
    growthRate: 0, // Exited
    userCount: 0, // Exited
    teamSize: 0, // Exited
    lastUpdated: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    alerts: []
  },
  {
    id: 'venture5',
    name: 'EdTech Solutions',
    logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    description: 'Online learning platform for professional development',
    industry: 'EdTech',
    stage: 'Idea',
    progress: 15,
    fundingStatus: 'Not Started',
    totalFundsRaised: 0,
    monthlyRevenue: 0,
    growthRate: 0,
    userCount: 0,
    teamSize: 3,
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    alerts: [
      {
        id: 'alert4',
        type: 'info',
        message: 'Market research completed, ready for prototype development'
      }
    ]
  }
];

// Sample detailed venture data
export const sampleDetailedVentures: DetailedVentureData[] = [
  {
    ...sampleVentures[0], // Extend from FinTech Solutions
    website: 'https://fintechsolutions.com',
    contactEmail: 'info@fintechsolutions.com',
    keyHighlights: {
      totalRevenue: 1800000, // Annual revenue
      totalUsers: 25000,
      fundingStage: 'Series A'
    },
    founders: [
      {
        name: 'Ahmed Al-Rashid',
        title: 'CEO & Co-founder',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: 'https://linkedin.com/in/ahmedalrashid'
      },
      {
        name: 'Sarah Hassan',
        title: 'CTO & Co-founder',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: 'https://linkedin.com/in/sarahhassan'
      }
    ],
    teamMembers: [
      {
        name: 'Khalid Al-Thani',
        title: 'Chief Financial Officer',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        department: 'Finance'
      },
      {
        name: 'Layla Kassem',
        title: 'Head of Product',
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        department: 'Product'
      },
      {
        name: 'Omar Al-Mansouri',
        title: 'VP of Engineering',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        department: 'Engineering'
      }
    ],
    productVision: 'To create a seamless digital payment ecosystem that empowers businesses and consumers across the MENA region with secure, efficient, and accessible financial services.',
    coreFeatures: [
      'Digital Wallet Integration',
      'Cross-border Payments',
      'Merchant Payment Solutions',
      'AI-powered Fraud Detection',
      'Islamic Banking Compliance',
      'Multi-currency Support'
    ],
    roadmap: [
      {
        phase: 'Phase 1: Core Platform',
        timeline: 'Q1-Q2 2024',
        description: 'Launch of core payment infrastructure and digital wallet',
        status: 'completed'
      },
      {
        phase: 'Phase 2: Merchant Solutions',
        timeline: 'Q3-Q4 2024',
        description: 'Rollout of comprehensive merchant services and dashboard',
        status: 'in-progress'
      },
      {
        phase: 'Phase 3: Regional Expansion',
        timeline: 'Q1-Q2 2025',
        description: 'Expansion to Saudi Arabia and Egypt markets',
        status: 'planned'
      }
    ],
    keyActivities: [
      'Payment processing and settlement',
      'Regulatory compliance management',
      'Merchant onboarding and support',
      'Security and fraud prevention',
      'Product development and innovation'
    ],
    keyResources: [
      'Proprietary payment technology',
      'Banking partnerships',
      'Regulatory licenses',
      'Development team',
      'Customer support infrastructure'
    ],
    keyPartners: [
      'Local banks in UAE, Saudi Arabia, and Egypt',
      'Major credit card networks',
      'E-commerce platforms',
      'Regulatory authorities',
      'Cybersecurity firms'
    ],
    financialMetrics: {
      mrr: 150000,
      arr: 1800000,
      burnRate: 120000,
      runway: 16, // months
      grossMargin: 68 // percentage
    },
    businessMetrics: {
      cac: 45, // Customer Acquisition Cost
      ltv: 890, // Lifetime Value
      churnRate: 3.2, // percentage
      conversionRate: 4.5, // percentage
      activeUsers: 25000
    },
    marketMetrics: {
      marketSize: '$31B in MENA region',
      marketGrowth: '23% CAGR through 2027',
      marketShare: '2.3% of addressable market',
      competitorCount: 12
    },
    fundingHistory: [
      {
        round: 'Pre-seed',
        amount: 250000,
        date: new Date(2022, 3, 15), // April 15, 2022
        investors: ['Angel Investors Group', 'Dubai Angel Investors'],
        valuation: 2500000
      },
      {
        round: 'Seed',
        amount: 1000000,
        date: new Date(2023, 1, 10), // February 10, 2023
        investors: ['MENA Ventures', 'Fintech Accelerator Fund'],
        valuation: 8000000
      },
      {
        round: 'Series A',
        amount: 2000000,
        date: new Date(2024, 0, 20), // January 20, 2024
        investors: ['Gulf Capital Partners', 'Tech Ventures MENA', 'Innovation Fund'],
        valuation: 15000000
      }
    ],
    capTableSummary: {
      founders: 60, // percentage
      investors: 30, // percentage
      employees: 8, // percentage
      optionPool: 2 // percentage
    },
    uploadedDocuments: [
      {
        id: 'doc1',
        name: 'Business Plan.pdf',
        type: 'PDF',
        dateUploaded: new Date(2023, 11, 15), // December 15, 2023
        category: 'financial'
      },
      {
        id: 'doc2',
        name: 'Product Roadmap.xlsx',
        type: 'Spreadsheet',
        dateUploaded: new Date(2024, 0, 5), // January 5, 2024
        category: 'product'
      },
      {
        id: 'doc3',
        name: 'Investor Pitch Deck.pptx',
        type: 'Presentation',
        dateUploaded: new Date(2024, 0, 10), // January 10, 2024
        category: 'financial'
      },
      {
        id: 'doc4',
        name: 'Legal Structure.pdf',
        type: 'PDF',
        dateUploaded: new Date(2023, 10, 20), // November 20, 2023
        category: 'legal'
      }
    ]
  },
  {
    ...sampleVentures[1], // Extend from HealthTech Innovations
    website: 'https://healthtechinnovations.com',
    contactEmail: 'info@healthtechinnovations.com',
    keyHighlights: {
      totalRevenue: 360000, // Annual revenue
      totalUsers: 10000,
      fundingStage: 'Seed'
    },
    founders: [
      {
        name: 'Dr. Fatima Al-Zahra',
        title: 'CEO & Founder',
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: 'https://linkedin.com/in/fatimaalzahra'
      },
      {
        name: 'Youssef Mansour',
        title: 'CTO & Co-founder',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: 'https://linkedin.com/in/youssefmansour'
      }
    ],
    teamMembers: [
      {
        name: 'Nadia Boutros',
        title: 'Head of Product',
        image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        department: 'Product'
      },
      {
        name: 'Hassan Al-Rashid',
        title: 'Lead Developer',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        department: 'Engineering'
      }
    ],
    productVision: 'To democratize healthcare access across the MENA region through AI-powered telemedicine, connecting patients with healthcare providers regardless of location or economic status.',
    coreFeatures: [
      'AI-powered Symptom Assessment',
      'Video Consultations',
      'Electronic Health Records',
      'E-prescriptions',
      'Specialist Referrals',
      'Appointment Scheduling'
    ],
    roadmap: [
      {
        phase: 'Phase 1: Core Platform',
        timeline: 'Q3-Q4 2023',
        description: 'Launch of basic telemedicine platform with video consultations',
        status: 'completed'
      },
      {
        phase: 'Phase 2: AI Integration',
        timeline: 'Q1-Q2 2024',
        description: 'Implementation of AI symptom checker and diagnostic assistance',
        status: 'in-progress'
      },
      {
        phase: 'Phase 3: Healthcare Ecosystem',
        timeline: 'Q3-Q4 2024',
        description: 'Integration with pharmacies, labs, and insurance providers',
        status: 'planned'
      }
    ],
    keyActivities: [
      'Telemedicine consultations',
      'AI-powered diagnostics',
      'Healthcare provider onboarding',
      'Patient data management',
      'Regulatory compliance'
    ],
    keyResources: [
      'AI diagnostic algorithms',
      'Medical professional network',
      'Telemedicine platform',
      'Health data infrastructure',
      'Regulatory approvals'
    ],
    keyPartners: [
      'Hospitals and clinics',
      'Medical professionals',
      'Health insurance companies',
      'Pharmaceutical companies',
      'Medical equipment suppliers'
    ],
    financialMetrics: {
      mrr: 30000,
      arr: 360000,
      burnRate: 50000,
      runway: 10, // months
      grossMargin: 72 // percentage
    },
    businessMetrics: {
      cac: 35, // Customer Acquisition Cost
      ltv: 420, // Lifetime Value
      churnRate: 4.5, // percentage
      conversionRate: 3.8, // percentage
      activeUsers: 10000
    },
    marketMetrics: {
      marketSize: '$2.8B in MENA region',
      marketGrowth: '30% CAGR through 2027',
      marketShare: '1.2% of addressable market',
      competitorCount: 8
    },
    fundingHistory: [
      {
        round: 'Pre-seed',
        amount: 150000,
        date: new Date(2023, 1, 20), // February 20, 2023
        investors: ['Health Innovation Fund', 'Angel Investors'],
        valuation: 1500000
      },
      {
        round: 'Seed',
        amount: 500000,
        date: new Date(2023, 8, 15), // September 15, 2023
        investors: ['MENA Health Ventures', 'Digital Health Accelerator'],
        valuation: 5000000
      }
    ],
    capTableSummary: {
      founders: 70, // percentage
      investors: 25, // percentage
      employees: 3, // percentage
      optionPool: 2 // percentage
    },
    uploadedDocuments: [
      {
        id: 'doc1',
        name: 'Telemedicine Market Analysis.pdf',
        type: 'PDF',
        dateUploaded: new Date(2023, 6, 10), // July 10, 2023
        category: 'financial'
      },
      {
        id: 'doc2',
        name: 'Product Development Roadmap.xlsx',
        type: 'Spreadsheet',
        dateUploaded: new Date(2023, 7, 22), // August 22, 2023
        category: 'product'
      },
      {
        id: 'doc3',
        name: 'Regulatory Compliance Report.pdf',
        type: 'PDF',
        dateUploaded: new Date(2023, 9, 5), // October 5, 2023
        category: 'legal'
      }
    ]
  },
  {
    ...sampleVentures[2], // Extend from E-commerce Platform
    website: 'https://ecommerceplatform.com',
    contactEmail: 'info@ecommerceplatform.com',
    keyHighlights: {
      totalRevenue: 1440000, // Annual revenue
      totalUsers: 35000,
      fundingStage: 'Series A'
    },
    founders: [
      {
        name: 'Mohammed Al-Sabah',
        title: 'CEO & Founder',
        image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: 'https://linkedin.com/in/mohammedalsabah'
      },
      {
        name: 'Leila Benali',
        title: 'COO & Co-founder',
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: 'https://linkedin.com/in/leilabenali'
      }
    ],
    teamMembers: [
      {
        name: 'Tariq Al-Zahra',
        title: 'CTO',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        department: 'Technology'
      },
      {
        name: 'Rania Al-Abdullah',
        title: 'Head of Marketing',
        image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        department: 'Marketing'
      },
      {
        name: 'Hassan Al-Rashid',
        title: 'Head of Operations',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        department: 'Operations'
      }
    ],
    productVision: 'To create a vibrant marketplace that connects local artisans and producers with global customers, preserving cultural heritage while enabling economic empowerment.',
    coreFeatures: [
      'Artisan Profiles and Storytelling',
      'Global Shipping and Logistics',
      'Multi-currency Payment Processing',
      'Authenticity Verification',
      'Cultural Context for Products',
      'Personalized Recommendations'
    ],
    roadmap: [
      {
        phase: 'Phase 1: Marketplace Launch',
        timeline: 'Q1-Q2 2023',
        description: 'Initial platform launch with core marketplace functionality',
        status: 'completed'
      },
      {
        phase: 'Phase 2: Mobile App & Global Expansion',
        timeline: 'Q3-Q4 2023',
        description: 'Mobile app launch and expansion to international markets',
        status: 'completed'
      },
      {
        phase: 'Phase 3: AI-Powered Personalization',
        timeline: 'Q1-Q2 2024',
        description: 'Implementation of AI for personalized shopping experiences',
        status: 'in-progress'
      },
      {
        phase: 'Phase 4: Augmented Reality Shopping',
        timeline: 'Q3-Q4 2024',
        description: 'AR features for virtual product try-on and visualization',
        status: 'planned'
      }
    ],
    keyActivities: [
      'Artisan onboarding and verification',
      'Quality control and authenticity checks',
      'Global logistics and shipping management',
      'Customer service and support',
      'Marketing and promotion',
      'Platform development and maintenance'
    ],
    keyResources: [
      'E-commerce platform technology',
      'Artisan network',
      'Global logistics partners',
      'Payment processing infrastructure',
      'Customer service team',
      'Marketing and content creation team'
    ],
    keyPartners: [
      'Local artisan cooperatives',
      'Shipping and logistics companies',
      'Payment processors',
      'Cultural heritage organizations',
      'Social media influencers',
      'Tourism boards'
    ],
    financialMetrics: {
      mrr: 120000,
      arr: 1440000,
      burnRate: 90000,
      runway: 14, // months
      grossMargin: 55 // percentage
    },
    businessMetrics: {
      cac: 28, // Customer Acquisition Cost
      ltv: 320, // Lifetime Value
      churnRate: 5.2, // percentage
      conversionRate: 3.1, // percentage
      activeUsers: 35000
    },
    marketMetrics: {
      marketSize: '$28B by 2026',
      marketGrowth: '18% CAGR through 2026',
      marketShare: '0.8% of addressable market',
      competitorCount: 15
    },
    fundingHistory: [
      {
        round: 'Seed',
        amount: 500000,
        date: new Date(2022, 8, 10), // September 10, 2022
        investors: ['E-commerce Ventures', 'Angel Investors Group'],
        valuation: 4000000
      },
      {
        round: 'Series A',
        amount: 1500000,
        date: new Date(2023, 5, 15), // June 15, 2023
        investors: ['MENA Growth Capital', 'Global Marketplace Fund', 'Retail Innovation Partners'],
        valuation: 12000000
      }
    ],
    capTableSummary: {
      founders: 55, // percentage
      investors: 35, // percentage
      employees: 5, // percentage
      optionPool: 5 // percentage
    },
    uploadedDocuments: [
      {
        id: 'doc1',
        name: 'E-commerce Market Analysis.pdf',
        type: 'PDF',
        dateUploaded: new Date(2022, 6, 15), // July 15, 2022
        category: 'financial'
      },
      {
        id: 'doc2',
        name: 'Supply Chain Strategy.docx',
        type: 'Document',
        dateUploaded: new Date(2022, 9, 8), // October 8, 2022
        category: 'other'
      },
      {
        id: 'doc3',
        name: 'Marketing Plan 2024.pptx',
        type: 'Presentation',
        dateUploaded: new Date(2023, 11, 12), // December 12, 2023
        category: 'marketing'
      },
      {
        id: 'doc4',
        name: 'Financial Projections.xlsx',
        type: 'Spreadsheet',
        dateUploaded: new Date(2023, 11, 20), // December 20, 2023
        category: 'financial'
      }
    ]
  },
  {
    ...sampleVentures[3], // Extend from SaaS Analytics (Exited)
    website: 'https://saasanalytics.com',
    contactEmail: 'info@saasanalytics.com',
    keyHighlights: {
      totalRevenue: 0, // Exited
      totalUsers: 0, // Exited
      fundingStage: 'Exited'
    },
    founders: [
      {
        name: 'Tariq Al-Zahra',
        title: 'Former CEO & Founder',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: 'https://linkedin.com/in/tariqalzahra'
      },
      {
        name: 'Nadia Boutros',
        title: 'Former CTO & Co-founder',
        image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: 'https://linkedin.com/in/nadiaboutros'
      }
    ],
    teamMembers: [], // Exited
    productVision: 'Provided business intelligence and analytics solutions for SMEs, making data-driven decision making accessible and affordable.',
    coreFeatures: [
      'Customizable Dashboards',
      'Data Integration from Multiple Sources',
      'Automated Reporting',
      'Predictive Analytics',
      'Mobile Access',
      'Collaboration Tools'
    ],
    roadmap: [
      {
        phase: 'Phase 1: Core Platform',
        timeline: 'Q1-Q2 2021',
        description: 'Initial platform launch with basic analytics features',
        status: 'completed'
      },
      {
        phase: 'Phase 2: Advanced Analytics',
        timeline: 'Q3-Q4 2021',
        description: 'Implementation of advanced analytics and predictive features',
        status: 'completed'
      },
      {
        phase: 'Phase 3: Enterprise Features',
        timeline: 'Q1-Q2 2022',
        description: 'Enterprise-grade security and collaboration features',
        status: 'completed'
      },
      {
        phase: 'Phase 4: Acquisition',
        timeline: 'Q3 2022',
        description: 'Acquisition by Tech Giant Inc.',
        status: 'completed'
      }
    ],
    keyActivities: [
      'Data processing and analytics',
      'Software development and maintenance',
      'Customer onboarding and support',
      'Sales and marketing',
      'Product innovation'
    ],
    keyResources: [
      'Analytics platform technology',
      'Data processing infrastructure',
      'Development team',
      'Customer support team',
      'Sales and marketing team'
    ],
    keyPartners: [
      'Data providers',
      'Cloud infrastructure providers',
      'Technology integrators',
      'Consulting firms',
      'Resellers and channel partners'
    ],
    financialMetrics: {
      mrr: 0, // Exited
      arr: 0, // Exited
      burnRate: 0, // Exited
      runway: 0, // Exited
      grossMargin: 0 // Exited
    },
    businessMetrics: {
      cac: 0, // Exited
      ltv: 0, // Exited
      churnRate: 0, // Exited
      conversionRate: 0, // Exited
      activeUsers: 0 // Exited
    },
    marketMetrics: {
      marketSize: '$12B globally',
      marketGrowth: '22% CAGR through 2025',
      marketShare: 'Acquired with 1.2% market share',
      competitorCount: 25
    },
    fundingHistory: [
      {
        round: 'Seed',
        amount: 750000,
        date: new Date(2020, 3, 15), // April 15, 2020
        investors: ['SaaS Ventures', 'Angel Investors Group'],
        valuation: 5000000
      },
      {
        round: 'Series A',
        amount: 3500000,
        date: new Date(2021, 5, 10), // June 10, 2021
        investors: ['Tech Growth Capital', 'B2B Software Fund', 'Enterprise SaaS Partners'],
        valuation: 18000000
      },
      {
        round: 'Acquisition',
        amount: 12000000, // Exit value
        date: new Date(2022, 8, 15), // September 15, 2022
        investors: ['Tech Giant Inc.'],
        valuation: 25000000
      }
    ],
    capTableSummary: {
      founders: 0, // Exited
      investors: 0, // Exited
      employees: 0, // Exited
      optionPool: 0 // Exited
    },
    uploadedDocuments: [
      {
        id: 'doc1',
        name: 'Acquisition Agreement.pdf',
        type: 'PDF',
        dateUploaded: new Date(2022, 8, 20), // September 20, 2022
        category: 'legal'
      },
      {
        id: 'doc2',
        name: 'Final Financial Statement.xlsx',
        type: 'Spreadsheet',
        dateUploaded: new Date(2022, 8, 25), // September 25, 2022
        category: 'financial'
      },
      {
        id: 'doc3',
        name: 'Exit Summary.pdf',
        type: 'PDF',
        dateUploaded: new Date(2022, 9, 5), // October 5, 2022
        category: 'other'
      }
    ]
  },
  {
    ...sampleVentures[4], // Extend from EdTech Solutions
    website: 'https://edtechsolutions.com',
    contactEmail: 'info@edtechsolutions.com',
    keyHighlights: {
      totalRevenue: 0, // Pre-revenue
      totalUsers: 0, // Pre-launch
      fundingStage: 'Pre-seed'
    },
    founders: [
      {
        name: 'Layla Kassem',
        title: 'CEO & Founder',
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: 'https://linkedin.com/in/laylakassem'
      }
    ],
    teamMembers: [
      {
        name: 'Hassan Al-Rashid',
        title: 'Lead Developer',
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        department: 'Technology'
      },
      {
        name: 'Nadia Boutros',
        title: 'Content Strategist',
        image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        department: 'Content'
      }
    ],
    productVision: 'To democratize professional education by providing accessible, high-quality learning experiences that help individuals advance their careers and adapt to changing industry demands.',
    coreFeatures: [
      'Personalized Learning Paths',
      'Industry Expert Masterclasses',
      'Skills Assessment and Certification',
      'Career Advancement Tools',
      'Networking Opportunities',
      'Mobile Learning Experience'
    ],
    roadmap: [
      {
        phase: 'Phase 1: Market Research',
        timeline: 'Q4 2023',
        description: 'Comprehensive market research and user interviews',
        status: 'completed'
      },
      {
        phase: 'Phase 2: MVP Development',
        timeline: 'Q1-Q2 2024',
        description: 'Development of minimum viable product with core features',
        status: 'planned'
      },
      {
        phase: 'Phase 3: Beta Launch',
        timeline: 'Q3 2024',
        description: 'Limited beta launch with select users and content partners',
        status: 'planned'
      },
      {
        phase: 'Phase 4: Full Launch',
        timeline: 'Q4 2024',
        description: 'Public launch with complete feature set and content library',
        status: 'planned'
      }
    ],
    keyActivities: [
      'Content creation and curation',
      'Platform development',
      'Expert recruitment and onboarding',
      'User acquisition and engagement',
      'Learning experience design'
    ],
    keyResources: [
      'Learning platform technology',
      'Content library',
      'Expert network',
      'Development team',
      'Educational design expertise'
    ],
    keyPartners: [
      'Industry experts and thought leaders',
      'Educational institutions',
      'Corporate training departments',
      'Content creators',
      'Certification bodies'
    ],
    financialMetrics: {
      mrr: 0, // Pre-revenue
      arr: 0, // Pre-revenue
      burnRate: 15000,
      runway: 8, // months
      grossMargin: 0 // Pre-revenue
    },
    businessMetrics: {
      cac: 0, // Pre-launch
      ltv: 0, // Pre-launch
      churnRate: 0, // Pre-launch
      conversionRate: 0, // Pre-launch
      activeUsers: 0 // Pre-launch
    },
    marketMetrics: {
      marketSize: '$5.2B in MENA region',
      marketGrowth: '25% CAGR through 2027',
      marketShare: 'Pre-launch',
      competitorCount: 9
    },
    fundingHistory: [], // No funding yet
    capTableSummary: {
      founders: 100, // percentage
      investors: 0, // percentage
      employees: 0, // percentage
      optionPool: 0 // percentage
    },
    uploadedDocuments: [
      {
        id: 'doc1',
        name: 'Market Research Report.pdf',
        type: 'PDF',
        dateUploaded: new Date(2023, 10, 15), // November 15, 2023
        category: 'other'
      },
      {
        id: 'doc2',
        name: 'Business Plan.docx',
        type: 'Document',
        dateUploaded: new Date(2023, 11, 10), // December 10, 2023
        category: 'financial'
      },
      {
        id: 'doc3',
        name: 'Product Prototype.fig',
        type: 'Design File',
        dateUploaded: new Date(2024, 0, 5), // January 5, 2024
        category: 'product'
      }
    ]
  }
];

export const sampleMarketUpdates: MarketUpdate[] = [
  {
    id: 'update1',
    title: 'MENA Startup Funding Reaches Record High in Q2',
    description: 'Venture capital investments in MENA startups hit $1.2B in Q2 2025, marking a 45% increase year-over-year.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    source: 'MENA Venture Report',
    url: '#'
  },
  {
    id: 'update2',
    title: 'New Regulatory Framework for Fintech in UAE',
    description: 'The UAE Central Bank has announced a new regulatory sandbox for fintech startups, easing compliance requirements.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    source: 'Gulf Business',
    url: '#'
  },
  {
    id: 'update3',
    title: 'Saudi Arabia Launches $500M Fund for Tech Startups',
    description: 'The Public Investment Fund (PIF) has launched a new $500M fund targeting early-stage technology startups in the Kingdom.',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    source: 'Arab News',
    url: '#'
  }
];