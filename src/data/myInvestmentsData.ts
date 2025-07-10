// Data structures and sample data for My Investments section

// Portfolio Summary Dashboard
export interface PortfolioSummary {
  totalPortfolioValue: number;
  numberOfInvestments: number;
  totalInvested: number;
  numberOfExits: number;
  totalGain: number;
  assetAllocation: {
    byStage: { [key: string]: number };
    bySector: { [key: string]: number };
    byGeography: { [key: string]: number };
  };
  cashVsInvested: {
    cash: number;
    invested: number;
  };
  recentActivity: {
    id: string;
    type: 'investment' | 'exit' | 'follow-on' | 'dividend';
    venture: string;
    amount: number;
    date: Date;
  }[];
}

export interface PerformanceSummary {
  overallReturn: {
    irr: number;
    multiple: number;
  };
  gains: {
    unrealized: number;
    realized: number;
  };
  topPerformers: {
    id: string;
    name: string;
    logo: string;
    returnMultiple: number;
    invested: number;
    currentValue: number;
  }[];
  bottomPerformers: {
    id: string;
    name: string;
    logo: string;
    returnMultiple: number;
    invested: number;
    currentValue: number;
  }[];
  performanceVsBenchmarks: {
    portfolio: number;
    ventureBenchmark: number;
    publicMarkets: number;
  };
  performanceTrends: {
    month: string;
    value: number;
  }[];
}

// Investment Pipeline
export interface PipelineStage {
  id: string;
  name: string;
  count: number;
  deals: PipelineDeal[];
}

export interface PipelineDeal {
  id: string;
  ventureName: string;
  logo: string;
  industry: string;
  stage: string;
  amount: number;
  status: string;
  lastActivity: Date;
  progress: number;
  assignedTo: string[];
  dueDate?: Date;
}

// Deal Screening & Due Diligence
export interface DueDiligenceItem {
  id: string;
  category: string;
  item: string;
  status: 'pending' | 'in-progress' | 'completed' | 'flagged';
  assignedTo?: string;
  dueDate?: Date;
  notes?: string;
}

// Deal Terms
export interface DealTerms {
  investmentStructure: {
    instrument: string;
    amount: number;
    securityType: string;
    conversionMechanics: string;
  };
  valuationTerms: {
    valuationCap?: number;
    preMoney?: number;
    postMoney?: number;
    discountRate?: number;
    antiDilution: string;
  };
  economicRights: {
    liquidationPreference: string;
    dividendRights: string;
    proRataRights: boolean;
    redemptionRights: boolean;
  };
  controlGovernance: {
    boardComposition: string;
    votingRights: string;
    protectiveProvisions: string[];
    informationRights: string;
  };
  transferLiquidity: {
    rightOfFirstRefusal: boolean;
    coSaleRights: boolean;
    dragAlongRights: boolean;
    registrationRights: string;
    lockupProvisions: string;
  };
  legalAdministrative: {
    useOfProceeds: string;
    representationsWarranties: string;
    closingConditions: string[];
    legalFees: string;
    governingLaw: string;
  };
}

// Portfolio Management
export interface VentureOverviewData {
  id: string;
  name: string;
  logo: string;
  description: string;
  industry: string;
  hq: string;
  website: string;
  contactEmail: string;
  keyHighlights: {
    totalRevenue: number;
    totalUsers: number;
    fundingStage: string;
  };
  people: {
    founders: {
      name: string;
      title: string;
      image: string;
      linkedinProfile: string;
    }[];
    headcount: number;
  };
  recentActivity: {
    id: string;
    title: string;
    description: string;
    date: Date;
  }[];
  relevantNews: {
    id: string;
    title: string;
    description: string;
    date: Date;
    source: string;
    url: string;
  }[];
}

export interface VentureFundingData {
  id: string;
  fundingOverview: {
    totalRaised: number;
    currentValuation: number;
    fundraisingStage: string;
    lastRound: string;
    fundraisingStatus: 'Active' | 'Inactive';
    currentRound?: string;
  };
  myInvestment: {
    investmentAmount: number;
    round: string;
    investmentDate: Date;
    currentOwnership: number;
    currentValue: number;
  };
  fundingHistory: {
    date: Date;
    investor: string;
    isLead: boolean;
    round: string;
    amount: number;
  }[];
  capTable: {
    investor: string;
    investmentAmount: number;
    investmentDate: Date;
    round: string;
    shareClass: string;
    ownershipPercentage: number;
    pricePerShare: number;
  }[];
  myInvestmentTerms: {
    investmentStructure: string;
    valuationTerms: string;
    economicRights: string;
    controlGovernance: string;
    transferLiquidity: string;
    legalAdministrative: string;
  };
}

export interface VenturePerformanceData {
  id: string;
  financialPerformance: {
    revenue: {
      mrr: number;
      arr: number;
      growthRate: number;
      arpu: number;
    };
    profitability: {
      grossMargin: number;
      ebitda: number;
      burnRate: number;
    };
  };
  businessPerformance: {
    customers: {
      totalActive: number;
      newAcquisitions: number;
      growthRate: number;
      cac: number;
      cltv: number;
      churnRate: number;
      satisfactionScore: number;
    };
    productUsage: {
      dau: number;
      mau: number;
      sessionDuration: number;
      featureAdoption: number;
    };
    operationalEfficiency: {
      uptime: number;
      responseTime: number;
      transactionSuccess: number;
      supportResolutionTime: number;
    };
  };
  marketPerformance: {
    marketMetrics: {
      marketShare: number;
      brandAwareness: number;
      penetrationRate: number;
    };
    competitiveAnalysis: {
      position: string;
      featureDifferentiation: string;
    };
  };
}

export interface VentureListingData {
  id: string;
  offeringDetails: {
    sharesToSell: number;
    askingPricePerShare: number;
    minimumAcceptablePrice: number;
  };
  salePreference: {
    allOrNothing: boolean;
    fixedPrice: boolean;
    saleTimeline: string;
  };
  buyerCriteria: {
    minimumPurchaseSize: number;
    preferredBuyerType: string;
  };
  disclosureLevel: {
    informationSharingLevel: string;
    confidentialityPreferences: string;
  };
}

// Sample Data
export const samplePortfolioSummary: PortfolioSummary = {
  totalPortfolioValue: 12500000,
  numberOfInvestments: 15,
  totalInvested: 8000000,
  numberOfExits: 2,
  totalGain: 3500000,
  assetAllocation: {
    byStage: {
      'Pre-seed': 15,
      'Seed': 35,
      'Series A': 30,
      'Series B+': 20
    },
    bySector: {
      'Fintech': 40,
      'Healthtech': 25,
      'E-commerce': 20,
      'Other': 15
    },
    byGeography: {
      'UAE': 45,
      'Saudi Arabia': 30,
      'Egypt': 15,
      'Other': 10
    }
  },
  cashVsInvested: {
    cash: 3000000,
    invested: 8000000
  },
  recentActivity: [
    {
      id: 'activity1',
      type: 'investment',
      venture: 'HealthTech Solutions',
      amount: 500000,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
      id: 'activity2',
      type: 'follow-on',
      venture: 'PayMENA',
      amount: 250000,
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
    },
    {
      id: 'activity3',
      type: 'exit',
      venture: 'LogiFlow',
      amount: 1800000,
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
    }
  ]
};

export const samplePerformanceSummary: PerformanceSummary = {
  overallReturn: {
    irr: 22.5,
    multiple: 1.8
  },
  gains: {
    unrealized: 1500000,
    realized: 2000000
  },
  topPerformers: [
    {
      id: 'venture1',
      name: 'PayMENA',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      returnMultiple: 3.2,
      invested: 1000000,
      currentValue: 3200000
    },
    {
      id: 'venture2',
      name: 'HealthTech Solutions',
      logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      returnMultiple: 2.5,
      invested: 800000,
      currentValue: 2000000
    }
  ],
  bottomPerformers: [
    {
      id: 'venture3',
      name: 'EduPlatform',
      logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      returnMultiple: 0.8,
      invested: 500000,
      currentValue: 400000
    },
    {
      id: 'venture4',
      name: 'GreenEnergy',
      logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      returnMultiple: 0.9,
      invested: 700000,
      currentValue: 630000
    }
  ],
  performanceVsBenchmarks: {
    portfolio: 22.5,
    ventureBenchmark: 18.2,
    publicMarkets: 12.8
  },
  performanceTrends: [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 105 },
    { month: 'Mar', value: 110 },
    { month: 'Apr', value: 108 },
    { month: 'May', value: 115 },
    { month: 'Jun', value: 120 },
    { month: 'Jul', value: 125 },
    { month: 'Aug', value: 130 },
    { month: 'Sep', value: 135 },
    { month: 'Oct', value: 140 },
    { month: 'Nov', value: 145 },
    { month: 'Dec', value: 150 }
  ]
};

export const samplePipelineStages: PipelineStage[] = [
  {
    id: 'screening',
    name: 'Screening',
    count: 8,
    deals: [
      {
        id: 'deal1',
        ventureName: 'AI Solutions MENA',
        logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        industry: 'AI/ML',
        stage: 'Seed',
        amount: 1500000,
        status: 'New',
        lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        progress: 25,
        assignedTo: ['John Doe']
      },
      {
        id: 'deal2',
        ventureName: 'MedTech Innovations',
        logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        industry: 'Healthtech',
        stage: 'Series A',
        amount: 3000000,
        status: 'In Review',
        lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        progress: 50,
        assignedTo: ['John Doe', 'Sarah Smith']
      }
    ]
  },
  {
    id: 'due-diligence',
    name: 'Due Diligence',
    count: 3,
    deals: [
      {
        id: 'deal3',
        ventureName: 'FinTech Solutions',
        logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        industry: 'Fintech',
        stage: 'Seed',
        amount: 2000000,
        status: 'Active',
        lastActivity: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        progress: 75,
        assignedTo: ['John Doe'],
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    ]
  },
  {
    id: 'deal-terms',
    name: 'Deal Terms',
    count: 2,
    deals: [
      {
        id: 'deal4',
        ventureName: 'E-commerce Platform',
        logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        industry: 'E-commerce',
        stage: 'Series A',
        amount: 4000000,
        status: 'Negotiating',
        lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        progress: 90,
        assignedTo: ['John Doe', 'Michael Johnson'],
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      }
    ]
  },
  {
    id: 'closing',
    name: 'Closing',
    count: 1,
    deals: [
      {
        id: 'deal5',
        ventureName: 'EdTech Solutions',
        logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        industry: 'EdTech',
        stage: 'Seed',
        amount: 1800000,
        status: 'Final Review',
        lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        progress: 95,
        assignedTo: ['John Doe'],
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      }
    ]
  }
];

export const sampleDueDiligenceItems: DueDiligenceItem[] = [
  {
    id: 'dd1',
    category: 'Business',
    item: 'Business model validation',
    status: 'completed',
    assignedTo: 'John Doe',
    notes: 'Business model validated through customer interviews and market analysis.'
  },
  {
    id: 'dd2',
    category: 'Financial',
    item: 'Financial projections review',
    status: 'in-progress',
    assignedTo: 'Sarah Smith',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'dd3',
    category: 'Legal',
    item: 'IP verification',
    status: 'flagged',
    assignedTo: 'Michael Johnson',
    notes: 'Potential issues with patent claims. Need further investigation.'
  },
  {
    id: 'dd4',
    category: 'Market',
    item: 'Market size validation',
    status: 'completed',
    assignedTo: 'John Doe'
  },
  {
    id: 'dd5',
    category: 'Team',
    item: 'Background checks',
    status: 'pending',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  }
];

export const sampleDealTerms: DealTerms = {
  investmentStructure: {
    instrument: 'SAFE',
    amount: 500000,
    securityType: 'Convertible Note',
    conversionMechanics: 'Converts at qualified financing of $3M or more'
  },
  valuationTerms: {
    valuationCap: 8000000,
    discountRate: 20,
    antiDilution: 'Weighted Average'
  },
  economicRights: {
    liquidationPreference: '1x Non-participating',
    dividendRights: 'Non-cumulative 8% when declared',
    proRataRights: true,
    redemptionRights: false
  },
  controlGovernance: {
    boardComposition: '1 seat for lead investor',
    votingRights: 'As-converted basis',
    protectiveProvisions: [
      'Sale of company',
      'Issuance of senior securities',
      'Changes to articles of incorporation'
    ],
    informationRights: 'Quarterly financial statements, annual budget'
  },
  transferLiquidity: {
    rightOfFirstRefusal: true,
    coSaleRights: true,
    dragAlongRights: true,
    registrationRights: 'Piggyback registration rights',
    lockupProvisions: '180 days post-IPO'
  },
  legalAdministrative: {
    useOfProceeds: 'Product development, market expansion, working capital',
    representationsWarranties: 'Standard for early-stage investments',
    closingConditions: [
      'Satisfactory completion of due diligence',
      'Board approval',
      'Minimum investment threshold met'
    ],
    legalFees: 'Each party bears own costs',
    governingLaw: 'Delaware'
  }
};

export const sampleVentureOverview: VentureOverviewData = {
  id: 'venture1',
  name: 'PayMENA',
  logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
  description: 'Digital payment platform revolutionizing financial transactions across MENA',
  industry: 'Fintech',
  hq: 'Dubai, UAE',
  website: 'https://paymena.com',
  contactEmail: 'info@paymena.com',
  keyHighlights: {
    totalRevenue: 2400000,
    totalUsers: 125000,
    fundingStage: 'Series A'
  },
  people: {
    founders: [
      {
        name: 'Ahmed Al-Rashid',
        title: 'CEO & Co-founder',
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: '#'
      },
      {
        name: 'Sarah Hassan',
        title: 'CTO & Co-founder',
        image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        linkedinProfile: '#'
      }
    ],
    headcount: 28
  },
  recentActivity: [
    {
      id: 'activity1',
      title: 'Series A Funding Closed',
      description: 'Successfully closed $8M Series A round led by MENA Ventures',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'activity2',
      title: 'New Product Launch',
      description: 'Launched PayMENA Business, a comprehensive payment solution for SMEs',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'activity3',
      title: 'Key Hire',
      description: 'Appointed Khalid Al-Thani as Chief Financial Officer',
      date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    }
  ],
  relevantNews: [
    {
      id: 'news1',
      title: 'PayMENA Expands to Saudi Arabia',
      description: 'The fintech startup has received regulatory approval to operate in Saudi Arabia',
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      source: 'TechCrunch',
      url: '#'
    },
    {
      id: 'news2',
      title: 'Digital Payments in MENA to Grow by 30%',
      description: 'Industry report predicts significant growth in digital payment adoption across the region',
      date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      source: 'Forbes Middle East',
      url: '#'
    }
  ]
};

export const sampleVentureFunding: VentureFundingData = {
  id: 'venture1',
  fundingOverview: {
    totalRaised: 12000000,
    currentValuation: 32000000,
    fundraisingStage: 'Series A',
    lastRound: 'Series A',
    fundraisingStatus: 'Inactive'
  },
  myInvestment: {
    investmentAmount: 1000000,
    round: 'Series A',
    investmentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    currentOwnership: 3.125,
    currentValue: 1500000
  },
  fundingHistory: [
    {
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      investor: 'MENA Ventures',
      isLead: true,
      round: 'Series A',
      amount: 8000000
    },
    {
      date: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      investor: 'Seed Capital',
      isLead: true,
      round: 'Seed',
      amount: 2500000
    },
    {
      date: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000),
      investor: 'Angel Investors',
      isLead: false,
      round: 'Pre-seed',
      amount: 500000
    }
  ],
  capTable: [
    {
      investor: 'Founders',
      investmentAmount: 0,
      investmentDate: new Date(Date.now() - 1095 * 24 * 60 * 60 * 1000),
      round: 'Founding',
      shareClass: 'Common',
      ownershipPercentage: 60,
      pricePerShare: 0.1
    },
    {
      investor: 'Angel Investors',
      investmentAmount: 500000,
      investmentDate: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000),
      round: 'Pre-seed',
      shareClass: 'Preferred A',
      ownershipPercentage: 10,
      pricePerShare: 1
    },
    {
      investor: 'Seed Capital',
      investmentAmount: 2500000,
      investmentDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
      round: 'Seed',
      shareClass: 'Preferred B',
      ownershipPercentage: 15,
      pricePerShare: 5
    },
    {
      investor: 'MENA Ventures',
      investmentAmount: 7000000,
      investmentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      round: 'Series A',
      shareClass: 'Preferred C',
      ownershipPercentage: 11.875,
      pricePerShare: 10
    },
    {
      investor: 'Your Investment',
      investmentAmount: 1000000,
      investmentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      round: 'Series A',
      shareClass: 'Preferred C',
      ownershipPercentage: 3.125,
      pricePerShare: 10
    }
  ],
  myInvestmentTerms: {
    investmentStructure: 'Preferred Equity (Series A)',
    valuationTerms: 'Pre-money valuation of $24M',
    economicRights: '1x non-participating liquidation preference',
    controlGovernance: 'Pro-rata board observer rights',
    transferLiquidity: 'Standard tag-along and ROFR provisions',
    legalAdministrative: 'Delaware C-Corp, standard representations and warranties'
  }
};

export const sampleVenturePerformance: VenturePerformanceData = {
  id: 'venture1',
  financialPerformance: {
    revenue: {
      mrr: 200000,
      arr: 2400000,
      growthRate: 15,
      arpu: 45
    },
    profitability: {
      grossMargin: 78,
      ebitda: -100000, // Negative EBITDA (still not profitable)
      burnRate: 150000
    }
  },
  businessPerformance: {
    customers: {
      totalActive: 125000,
      newAcquisitions: 8500,
      growthRate: 12,
      cac: 35,
      cltv: 890,
      churnRate: 3.2,
      satisfactionScore: 4.7
    },
    productUsage: {
      dau: 45000,
      mau: 125000,
      sessionDuration: 8.5, // minutes
      featureAdoption: 72 // percentage
    },
    operationalEfficiency: {
      uptime: 99.95,
      responseTime: 0.8, // seconds
      transactionSuccess: 99.8, // percentage
      supportResolutionTime: 4.5 // hours
    }
  },
  marketPerformance: {
    marketMetrics: {
      marketShare: 8.5,
      brandAwareness: 42,
      penetrationRate: 15
    },
    competitiveAnalysis: {
      position: 'Market Challenger',
      featureDifferentiation: 'Superior user experience, faster transaction processing, and enhanced security features'
    }
  }
};

export const sampleVentureListing: VentureListingData = {
  id: 'venture1',
  offeringDetails: {
    sharesToSell: 50000,
    askingPricePerShare: 12,
    minimumAcceptablePrice: 10
  },
  salePreference: {
    allOrNothing: false,
    fixedPrice: true,
    saleTimeline: '30 days'
  },
  buyerCriteria: {
    minimumPurchaseSize: 10000,
    preferredBuyerType: 'Institutional Investor'
  },
  disclosureLevel: {
    informationSharingLevel: 'Standard due diligence package',
    confidentialityPreferences: 'NDA required'
  }
};

// Sample portfolio ventures for Explore Portfolio
export const samplePortfolioVentures = [
  {
    id: 'venture1',
    name: 'PayMENA',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    industry: 'Fintech',
    stage: 'Series A',
    investmentDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    investmentAmount: 1000000,
    currentValue: 1500000,
    returnMultiple: 1.5,
    performance: 'positive'
  },
  {
    id: 'venture2',
    name: 'HealthTech Solutions',
    logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    industry: 'Healthtech',
    stage: 'Seed',
    investmentDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
    investmentAmount: 500000,
    currentValue: 750000,
    returnMultiple: 1.5,
    performance: 'positive'
  },
  {
    id: 'venture3',
    name: 'EduPlatform',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    industry: 'EdTech',
    stage: 'Seed',
    investmentDate: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000),
    investmentAmount: 500000,
    currentValue: 400000,
    returnMultiple: 0.8,
    performance: 'negative'
  },
  {
    id: 'venture4',
    name: 'LogiFlow',
    logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    industry: 'Logistics',
    stage: 'Seed',
    investmentDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
    investmentAmount: 600000,
    currentValue: 0, // Exited
    returnMultiple: 3.0,
    performance: 'exited'
  },
  {
    id: 'venture5',
    name: 'GreenEnergy',
    logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    industry: 'CleanTech',
    stage: 'Series A',
    investmentDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    investmentAmount: 700000,
    currentValue: 630000,
    returnMultiple: 0.9,
    performance: 'negative'
  }
];