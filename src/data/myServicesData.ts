import { 
  DollarSign, 
  Users, 
  Star, 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertTriangle,
  MessageCircle,
  FileText,
  BarChart3,
  TrendingUp
} from 'lucide-react';

// Data structures for My Services section

// Services Overview Dashboard
export interface ServicePortfolioSummary {
  totalRevenue: number;
  activeServices: number;
  totalServicesOffered: number;
  totalClients: number;
  totalSessions: number;
  averageRating: number;
  serviceBreakdown: {
    byType: { [key: string]: number };
    byStatus: { [key: string]: number };
    byPerformance: { [key: string]: number };
  };
  recentActivity: {
    id: string;
    type: 'booking' | 'session' | 'review' | 'payment';
    client: string;
    service: string;
    description: string;
    date: Date;
  }[];
}

export interface ServiceData {
  id: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  coverImage: string;
  category: string;
  status: 'active' | 'draft' | 'archived';
  pricing: {
    basePrice: number;
    currency: string;
    pricingModel: 'fixed' | 'hourly' | 'tiered' | 'custom';
    packages?: {
      name: string;
      price: number;
      description: string;
    }[];
  };
  deliveryFormat: 'online' | 'in-person' | 'hybrid';
  duration: string;
  location?: string;
  tags: string[];
  createdDate: Date;
  lastUpdated: Date;
  totalBookings: number;
  activeBookings: number;
  completedSessions: number;
  totalRevenue: number;
  averageRating: number;
  reviewCount: number;
  objectives: string[];
  deliverables: string[];
  prerequisites: string[];
  termsAndConditions: string;
}

export interface WorkshopData {
  id: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  coverImage: string;
  category: string;
  status: 'scheduled' | 'draft' | 'completed' | 'cancelled';
  pricing: {
    registrationFee: number;
    currency: string;
    earlyBirdDiscount?: number;
    groupDiscount?: number;
  };
  deliveryFormat: 'online' | 'in-person' | 'hybrid';
  duration: string;
  date: Date;
  location?: string;
  capacity: {
    maxParticipants: number;
    currentEnrollment: number;
  };
  tags: string[];
  createdDate: Date;
  lastUpdated: Date;
  totalRevenue: number;
  averageRating: number;
  reviewCount: number;
  learningObjectives: string[];
  agenda: {
    time: string;
    title: string;
    description: string;
  }[];
  materials: string[];
  prerequisites: string[];
}

export interface SessionData {
  id: string;
  serviceId: string;
  serviceName: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  clientProfilePicture: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  sessionType: 'one-time' | 'recurring' | 'workshop';
  startDate: Date;
  endDate?: Date;
  duration: string;
  location?: string;
  format: 'online' | 'in-person' | 'hybrid';
  price: number;
  isPaid: boolean;
  progress: number;
  notes: string;
  materials: {
    id: string;
    name: string;
    type: string;
    url: string;
    uploadDate: Date;
  }[];
  actionItems: {
    id: string;
    description: string;
    isCompleted: boolean;
    dueDate?: Date;
  }[];
  feedback?: {
    rating: number;
    comment: string;
    date: Date;
  };
}

export interface ClientData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture: string;
  company?: string;
  title?: string;
  location?: string;
  firstInteraction: Date;
  lastInteraction: Date;
  totalSessions: number;
  activeSessions: number;
  completedSessions: number;
  totalSpent: number;
  servicesUsed: string[];
  notes: string;
  tags: string[];
  communicationHistory: {
    id: string;
    type: 'email' | 'call' | 'message' | 'meeting';
    date: Date;
    summary: string;
    followUp?: {
      required: boolean;
      dueDate?: Date;
      description?: string;
      completed: boolean;
    };
  }[];
}

export interface MarketUpdate {
  id: string;
  title: string;
  description: string;
  date: Date;
  source: string;
  url: string;
  relevance: 'high' | 'medium' | 'low';
  category: 'industry' | 'market' | 'competition' | 'regulation' | 'technology';
}

// Sample Data
export const sampleServicePortfolioSummary: ServicePortfolioSummary = {
  totalRevenue: 125000,
  activeServices: 5,
  totalServicesOffered: 8,
  totalClients: 45,
  totalSessions: 156,
  averageRating: 4.8,
  serviceBreakdown: {
    byType: {
      'Consulting': 40,
      'Mentoring': 25,
      'Training': 20,
      'Advisory': 15
    },
    byStatus: {
      'Active': 60,
      'Draft': 25,
      'Archived': 15
    },
    byPerformance: {
      'High Performing': 35,
      'Steady': 45,
      'Needs Attention': 20
    }
  },
  recentActivity: [
    {
      id: 'activity1',
      type: 'booking',
      client: 'Ahmed Hassan',
      service: 'Startup Mentoring Package',
      description: 'New booking for 6-session package',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
    },
    {
      id: 'activity2',
      type: 'session',
      client: 'Sarah Al-Rashid',
      service: 'Fintech Strategy Consulting',
      description: 'Completed session #3 of 5',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      id: 'activity3',
      type: 'review',
      client: 'Khalid Al-Thani',
      service: 'Investor Pitch Preparation',
      description: '5-star review received',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
      id: 'activity4',
      type: 'payment',
      client: 'Nadia Boutros',
      service: 'Market Entry Strategy',
      description: 'Payment of $3,500 received',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    }
  ]
};

export const sampleServices: ServiceData[] = [
  {
    id: 'service1',
    name: 'Startup Mentoring Package',
    shortDescription: 'Comprehensive mentoring for early-stage founders',
    detailedDescription: 'A structured mentoring program designed for early-stage founders looking to accelerate their growth. Includes bi-weekly sessions, strategic planning, and ongoing support.',
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    category: 'Mentoring',
    status: 'active',
    pricing: {
      basePrice: 5000,
      currency: 'USD',
      pricingModel: 'fixed',
      packages: [
        {
          name: 'Basic (3 months)',
          price: 5000,
          description: '6 sessions over 3 months with email support'
        },
        {
          name: 'Standard (6 months)',
          price: 9000,
          description: '12 sessions over 6 months with email and chat support'
        },
        {
          name: 'Premium (12 months)',
          price: 15000,
          description: '24 sessions over 12 months with unlimited support'
        }
      ]
    },
    deliveryFormat: 'online',
    duration: '60 minutes per session',
    tags: ['Startup', 'Mentoring', 'Entrepreneurship', 'Growth'],
    createdDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), // 180 days ago
    lastUpdated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    totalBookings: 24,
    activeBookings: 8,
    completedSessions: 68,
    totalRevenue: 45000,
    averageRating: 4.9,
    reviewCount: 18,
    objectives: [
      'Develop a clear strategic roadmap for your startup',
      'Overcome common early-stage challenges',
      'Refine your business model and value proposition',
      'Prepare for fundraising and investor conversations'
    ],
    deliverables: [
      'Personalized mentoring sessions',
      'Strategic action plans after each session',
      'Templates and frameworks for business planning',
      'Introductions to relevant network connections when appropriate'
    ],
    prerequisites: [
      'Must have a defined business idea or existing startup',
      'Commitment to implementing agreed-upon action items',
      'Openness to feedback and guidance'
    ],
    termsAndConditions: 'Sessions must be scheduled at least 48 hours in advance. Cancellations with less than 24 hours notice will count as a completed session. All materials provided are confidential and for client use only.'
  },
  {
    id: 'service2',
    name: 'Fintech Strategy Consulting',
    shortDescription: 'Expert guidance for fintech startups and financial institutions',
    detailedDescription: 'Strategic consulting service for fintech startups and financial institutions looking to innovate, scale, or transform. Includes market analysis, competitive positioning, regulatory guidance, and growth strategy.',
    coverImage: 'https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    category: 'Consulting',
    status: 'active',
    pricing: {
      basePrice: 10000,
      currency: 'USD',
      pricingModel: 'tiered',
      packages: [
        {
          name: 'Market Entry Analysis',
          price: 10000,
          description: 'Comprehensive market analysis and entry strategy'
        },
        {
          name: 'Regulatory Compliance Strategy',
          price: 15000,
          description: 'Detailed regulatory compliance roadmap and implementation plan'
        },
        {
          name: 'Full Growth Strategy',
          price: 25000,
          description: 'End-to-end strategy including market analysis, product roadmap, and scaling plan'
        }
      ]
    },
    deliveryFormat: 'hybrid',
    duration: '4-8 weeks',
    location: 'Dubai, UAE (for in-person components)',
    tags: ['Fintech', 'Strategy', 'Consulting', 'Financial Services', 'Regulation'],
    createdDate: new Date(Date.now() - 240 * 24 * 60 * 60 * 1000), // 240 days ago
    lastUpdated: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    totalBookings: 12,
    activeBookings: 3,
    completedSessions: 32,
    totalRevenue: 280000,
    averageRating: 4.8,
    reviewCount: 9,
    objectives: [
      'Develop a clear market entry or growth strategy',
      'Navigate complex regulatory environments',
      'Identify competitive advantages and market opportunities',
      'Create a roadmap for product development and scaling'
    ],
    deliverables: [
      'Comprehensive market analysis report',
      'Regulatory compliance framework',
      'Competitive positioning strategy',
      'Product roadmap and development plan',
      'Implementation timeline and milestones'
    ],
    prerequisites: [
      'Access to company financial data and metrics',
      'Availability of key stakeholders for interviews',
      'Clear objectives and scope definition',
      'Signed NDA and consulting agreement'
    ],
    termsAndConditions: 'Project scope and deliverables will be defined in a detailed statement of work. Payment terms include 50% upfront and 50% upon completion. Intellectual property created during the engagement belongs to the client.'
  },
  {
    id: 'service3',
    name: 'Investor Pitch Preparation',
    shortDescription: 'Comprehensive preparation for investor meetings and pitch events',
    detailedDescription: 'End-to-end preparation for fundraising, including pitch deck development, financial model review, storytelling coaching, and mock investor sessions. Designed to maximize your chances of securing investment.',
    coverImage: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    category: 'Advisory',
    status: 'active',
    pricing: {
      basePrice: 3500,
      currency: 'USD',
      pricingModel: 'fixed',
      packages: [
        {
          name: 'Pitch Deck Review',
          price: 1500,
          description: 'Detailed review and recommendations for your existing pitch deck'
        },
        {
          name: 'Pitch Preparation Package',
          price: 3500,
          description: 'Pitch deck development, story crafting, and 2 mock investor sessions'
        },
        {
          name: 'Complete Fundraising Package',
          price: 7500,
          description: 'Full pitch preparation plus financial model review and investor targeting strategy'
        }
      ]
    },
    deliveryFormat: 'online',
    duration: '2-4 weeks',
    tags: ['Fundraising', 'Pitch Deck', 'Investor Relations', 'Storytelling'],
    createdDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
    lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    totalBookings: 18,
    activeBookings: 4,
    completedSessions: 42,
    totalRevenue: 75000,
    averageRating: 4.7,
    reviewCount: 15,
    objectives: [
      'Create a compelling investor pitch deck',
      'Develop a clear and convincing investment narrative',
      'Prepare for tough investor questions',
      'Refine financial projections and funding ask',
      'Improve presentation skills and confidence'
    ],
    deliverables: [
      'Professional investor-ready pitch deck',
      'Pitch script and talking points',
      'Mock investor session recordings with feedback',
      'Q&A preparation document',
      'Follow-up strategy and templates'
    ],
    prerequisites: [
      'Business plan or executive summary',
      'Financial data and projections (if available)',
      'Clear understanding of funding needs',
      'Commitment to practice and iteration'
    ],
    termsAndConditions: 'Service includes up to 3 rounds of revisions on deliverables. Additional revisions available at hourly rate. Client is responsible for providing necessary business information in a timely manner.'
  },
  {
    id: 'service4',
    name: 'Market Entry Strategy',
    shortDescription: 'Strategic planning for entering new markets in MENA region',
    detailedDescription: 'Comprehensive market entry strategy service for companies looking to expand into the MENA region. Includes market assessment, competitive analysis, regulatory guidance, and go-to-market planning.',
    coverImage: 'https://images.pexels.com/photos/7821485/pexels-photo-7821485.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    category: 'Consulting',
    status: 'active',
    pricing: {
      basePrice: 12000,
      currency: 'USD',
      pricingModel: 'tiered',
      packages: [
        {
          name: 'Market Assessment',
          price: 5000,
          description: 'Comprehensive market analysis and opportunity assessment'
        },
        {
          name: 'Entry Strategy',
          price: 12000,
          description: 'Full market entry strategy including regulatory and operational planning'
        },
        {
          name: 'Implementation Support',
          price: 20000,
          description: 'Strategy development plus 3 months of implementation support'
        }
      ]
    },
    deliveryFormat: 'hybrid',
    duration: '6-12 weeks',
    location: 'MENA Region',
    tags: ['Market Entry', 'MENA', 'Strategy', 'International Expansion'],
    createdDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000), // 200 days ago
    lastUpdated: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
    totalBookings: 8,
    activeBookings: 2,
    completedSessions: 24,
    totalRevenue: 180000,
    averageRating: 4.9,
    reviewCount: 6,
    objectives: [
      'Assess market opportunity and fit for your business',
      'Develop a comprehensive market entry strategy',
      'Navigate regulatory and cultural considerations',
      'Create an implementation roadmap with clear milestones',
      'Identify potential partners and channels'
    ],
    deliverables: [
      'Market opportunity assessment report',
      'Competitive landscape analysis',
      'Regulatory and compliance roadmap',
      'Go-to-market strategy document',
      'Implementation plan with timeline and milestones',
      'Risk assessment and mitigation strategies'
    ],
    prerequisites: [
      'Clear business objectives for market entry',
      'Access to company information and current strategy',
      'Availability of key decision-makers for interviews',
      'Commitment to follow through on implementation'
    ],
    termsAndConditions: 'Project scope and timeline will be defined in a detailed statement of work. Travel expenses for in-person meetings are not included in the base price and will be billed separately. Confidentiality is guaranteed through a comprehensive NDA.'
  },
  {
    id: 'service5',
    name: 'Digital Transformation Workshop',
    shortDescription: 'Interactive workshop for organizations embracing digital change',
    detailedDescription: 'A hands-on workshop designed to help traditional businesses and organizations navigate digital transformation. Covers technology trends, organizational change, customer experience, and implementation planning.',
    coverImage: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    category: 'Training',
    status: 'draft',
    pricing: {
      basePrice: 8000,
      currency: 'USD',
      pricingModel: 'fixed'
    },
    deliveryFormat: 'hybrid',
    duration: '2 days',
    location: 'Client location or online',
    tags: ['Digital Transformation', 'Workshop', 'Innovation', 'Change Management'],
    createdDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    totalBookings: 0,
    activeBookings: 0,
    completedSessions: 0,
    totalRevenue: 0,
    averageRating: 0,
    reviewCount: 0,
    objectives: [
      'Understand key digital transformation concepts and trends',
      'Assess your organization\'s digital readiness',
      'Identify priority areas for digital initiatives',
      'Develop a practical transformation roadmap',
      'Address change management and cultural challenges'
    ],
    deliverables: [
      'Interactive 2-day workshop',
      'Digital readiness assessment',
      'Customized transformation framework',
      'Action planning templates',
      'Post-workshop summary report',
      'Follow-up consultation (30 days after workshop)'
    ],
    prerequisites: [
      'Participation of key stakeholders from different departments',
      'Pre-workshop questionnaire completion',
      'Basic information about current systems and processes',
      'Clear objectives for digital transformation efforts'
    ],
    termsAndConditions: 'Workshop is limited to 20 participants. For in-person delivery, client is responsible for providing suitable venue and equipment. Customization of workshop content requires additional lead time and may incur additional fees.'
  }
];

export const sampleWorkshops: WorkshopData[] = [
  {
    id: 'workshop1',
    name: 'Venture Capital Masterclass',
    shortDescription: 'Comprehensive workshop on venture capital fundraising for MENA startups',
    detailedDescription: 'An intensive one-day workshop covering all aspects of venture capital fundraising for startups in the MENA region. Learn how to approach VCs, structure deals, negotiate terms, and build relationships with investors.',
    coverImage: 'https://images.pexels.com/photos/7666429/pexels-photo-7666429.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    category: 'Fundraising',
    status: 'scheduled',
    pricing: {
      registrationFee: 750,
      currency: 'USD',
      earlyBirdDiscount: 150,
      groupDiscount: 100
    },
    deliveryFormat: 'hybrid',
    duration: '1 day (8 hours)',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    location: 'Dubai, UAE + Online',
    capacity: {
      maxParticipants: 30,
      currentEnrollment: 18
    },
    tags: ['Venture Capital', 'Fundraising', 'Startups', 'Investment'],
    createdDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    totalRevenue: 13500,
    averageRating: 0, // No ratings yet as it hasn't happened
    reviewCount: 0,
    learningObjectives: [
      'Understand the VC landscape in MENA',
      'Learn how to create an investor-ready pitch deck',
      'Master the art of valuation and deal terms',
      'Develop strategies for investor relations',
      'Build a fundraising roadmap for your startup'
    ],
    agenda: [
      {
        time: '09:00 - 10:00',
        title: 'MENA VC Landscape Overview',
        description: 'Current state, trends, and key players in the regional VC ecosystem'
      },
      {
        time: '10:15 - 11:30',
        title: 'Crafting Your Investor Story',
        description: 'Building a compelling narrative and pitch deck for investors'
      },
      {
        time: '11:45 - 13:00',
        title: 'Valuation Methodologies',
        description: 'Understanding how VCs value startups and determining your company\'s worth'
      },
      {
        time: '14:00 - 15:15',
        title: 'Term Sheet Deep Dive',
        description: 'Navigating and negotiating key investment terms'
      },
      {
        time: '15:30 - 16:45',
        title: 'Investor Relations & Follow-on Funding',
        description: 'Building relationships with investors and preparing for future rounds'
      },
      {
        time: '17:00 - 18:00',
        title: 'Q&A and Networking',
        description: 'Open discussion and networking opportunity with peers and speakers'
      }
    ],
    materials: [
      'Workshop handbook with all presentations',
      'Term sheet templates and examples',
      'Valuation spreadsheet models',
      'Pitch deck templates',
      'Investor database access (3 months)',
      'Video recording of the workshop'
    ],
    prerequisites: [
      'Basic understanding of startup funding stages',
      'Preferably have a business that is seeking or planning to seek VC funding',
      'Laptop for interactive exercises'
    ]
  },
  {
    id: 'workshop2',
    name: 'Product-Market Fit Bootcamp',
    shortDescription: 'Intensive workshop to help startups achieve product-market fit',
    detailedDescription: 'A hands-on bootcamp designed to help early-stage startups define, measure, and achieve product-market fit. Through practical exercises, case studies, and personalized feedback, participants will develop a clear roadmap to product-market fit.',
    coverImage: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    category: 'Product Development',
    status: 'draft',
    pricing: {
      registrationFee: 500,
      currency: 'USD',
      earlyBirdDiscount: 100
    },
    deliveryFormat: 'online',
    duration: '2 half-days',
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    capacity: {
      maxParticipants: 20,
      currentEnrollment: 0
    },
    tags: ['Product-Market Fit', 'Product Development', 'Customer Development', 'Validation'],
    createdDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    totalRevenue: 0,
    averageRating: 0,
    reviewCount: 0,
    learningObjectives: [
      'Understand what product-market fit means and how to measure it',
      'Develop effective customer interview techniques',
      'Create and validate value propositions',
      'Build minimum viable products that test key assumptions',
      'Implement iterative feedback loops for continuous improvement'
    ],
    agenda: [
      {
        time: 'Day 1 - 09:00 - 10:30',
        title: 'Understanding Product-Market Fit',
        description: 'Definitions, frameworks, and measurement approaches'
      },
      {
        time: 'Day 1 - 11:00 - 12:30',
        title: 'Customer Development Process',
        description: 'Identifying, reaching, and interviewing potential customers'
      },
      {
        time: 'Day 2 - 09:00 - 10:30',
        title: 'Value Proposition Design',
        description: 'Creating and testing compelling value propositions'
      },
      {
        time: 'Day 2 - 11:00 - 12:30',
        title: 'Iteration and Scaling',
        description: 'Implementing feedback loops and preparing for growth'
      }
    ],
    materials: [
      'Digital workbook with exercises',
      'Customer interview templates',
      'Value proposition canvas',
      'Product-market fit survey templates',
      'Case studies and examples'
    ],
    prerequisites: [
      'An existing product idea or early-stage product',
      'Basic understanding of your target market',
      'Willingness to engage with potential customers',
      'Computer with webcam and microphone'
    ]
  },
  {
    id: 'workshop3',
    name: 'Digital Marketing for Startups',
    shortDescription: 'Practical digital marketing strategies for resource-constrained startups',
    detailedDescription: 'A practical workshop focused on effective digital marketing strategies specifically designed for startups with limited budgets and resources. Learn how to build your brand, acquire customers, and grow your business using digital channels.',
    coverImage: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    category: 'Marketing',
    status: 'scheduled',
    pricing: {
      registrationFee: 350,
      currency: 'USD',
      earlyBirdDiscount: 50,
      groupDiscount: 50
    },
    deliveryFormat: 'online',
    duration: '1 day (6 hours)',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
    capacity: {
      maxParticipants: 40,
      currentEnrollment: 12
    },
    tags: ['Digital Marketing', 'Growth', 'Social Media', 'SEO', 'Content Marketing'],
    createdDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    totalRevenue: 4200,
    averageRating: 0,
    reviewCount: 0,
    learningObjectives: [
      'Develop a cost-effective digital marketing strategy',
      'Master customer acquisition channels for startups',
      'Create compelling content that drives engagement',
      'Implement data-driven marketing approaches',
      'Build automated marketing funnels'
    ],
    agenda: [
      {
        time: '09:00 - 10:15',
        title: 'Digital Marketing Strategy for Startups',
        description: 'Creating an effective strategy with limited resources'
      },
      {
        time: '10:30 - 11:45',
        title: 'Content Marketing & SEO Fundamentals',
        description: 'Creating valuable content and optimizing for search engines'
      },
      {
        time: '12:45 - 14:00',
        title: 'Social Media Marketing & Paid Acquisition',
        description: 'Leveraging social platforms and efficient paid campaigns'
      },
      {
        time: '14:15 - 15:30',
        title: 'Email Marketing & Automation',
        description: 'Building relationships and automating customer journeys'
      },
      {
        time: '15:45 - 17:00',
        title: 'Analytics & Growth Experimentation',
        description: 'Measuring results and running growth experiments'
      }
    ],
    materials: [
      'Digital marketing playbook',
      'Content calendar template',
      'Channel strategy framework',
      'Growth experiment templates',
      'Tool recommendations and resources list'
    ],
    prerequisites: [
      'Basic understanding of marketing concepts',
      'Access to your company\'s marketing accounts',
      'Computer with internet connection',
      'Willingness to participate in interactive exercises'
    ]
  }
];

export const sampleSessions: SessionData[] = [
  {
    id: 'session1',
    serviceId: 'service1',
    serviceName: 'Startup Mentoring Package',
    clientId: 'client1',
    clientName: 'Ahmed Hassan',
    clientEmail: 'ahmed.hassan@example.com',
    clientProfilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    status: 'in-progress',
    sessionType: 'recurring',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Started 30 days ago
    duration: '60 minutes',
    format: 'online',
    price: 5000, // Package price
    isPaid: true,
    progress: 50, // 50% complete (3/6 sessions)
    notes: 'Ahmed is making good progress with his fintech startup. We\'ve covered business model refinement and go-to-market strategy. Next session will focus on fundraising preparation.',
    materials: [
      {
        id: 'material1',
        name: 'Business Model Canvas Template',
        type: 'PDF',
        url: '#',
        uploadDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'material2',
        name: 'Go-to-Market Strategy Framework',
        type: 'PPTX',
        url: '#',
        uploadDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'material3',
        name: 'Fundraising Checklist',
        type: 'PDF',
        url: '#',
        uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      }
    ],
    actionItems: [
      {
        id: 'action1',
        description: 'Refine customer persona documents',
        isCompleted: true,
        dueDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'action2',
        description: 'Complete competitive analysis matrix',
        isCompleted: true,
        dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'action3',
        description: 'Draft executive summary for investors',
        isCompleted: false,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      }
    ]
  },
  {
    id: 'session2',
    serviceId: 'service2',
    serviceName: 'Fintech Strategy Consulting',
    clientId: 'client2',
    clientName: 'Sarah Al-Rashid',
    clientEmail: 'sarah.alrashid@example.com',
    clientProfilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    status: 'in-progress',
    sessionType: 'one-time',
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // Started 20 days ago
    duration: '6 weeks',
    format: 'hybrid',
    price: 15000,
    isPaid: true,
    progress: 65,
    notes: 'Project is progressing well. Completed market analysis and regulatory assessment. Currently working on product roadmap and go-to-market strategy.',
    materials: [
      {
        id: 'material4',
        name: 'Fintech Market Analysis Report',
        type: 'PDF',
        url: '#',
        uploadDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'material5',
        name: 'Regulatory Compliance Framework',
        type: 'DOCX',
        url: '#',
        uploadDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
      }
    ],
    actionItems: [
      {
        id: 'action4',
        description: 'Review and approve market analysis report',
        isCompleted: true,
        dueDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'action5',
        description: 'Schedule meeting with regulatory expert',
        isCompleted: true,
        dueDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'action6',
        description: 'Provide feedback on product roadmap draft',
        isCompleted: false,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      }
    ]
  },
  {
    id: 'session3',
    serviceId: 'service3',
    serviceName: 'Investor Pitch Preparation',
    clientId: 'client3',
    clientName: 'Khalid Al-Thani',
    clientEmail: 'khalid.althani@example.com',
    clientProfilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    status: 'completed',
    sessionType: 'one-time',
    startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // Started 45 days ago
    endDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // Ended 15 days ago
    duration: '3 weeks',
    format: 'online',
    price: 3500,
    isPaid: true,
    progress: 100,
    notes: 'Successfully completed the pitch preparation. Khalid secured $1.2M in seed funding from two investors we targeted.',
    materials: [
      {
        id: 'material6',
        name: 'Final Pitch Deck',
        type: 'PPTX',
        url: '#',
        uploadDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'material7',
        name: 'Investor Q&A Preparation Document',
        type: 'PDF',
        url: '#',
        uploadDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'material8',
        name: 'Mock Pitch Session Recording',
        type: 'MP4',
        url: '#',
        uploadDate: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000)
      }
    ],
    actionItems: [
      {
        id: 'action7',
        description: 'Finalize pitch deck content',
        isCompleted: true,
        dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'action8',
        description: 'Practice pitch delivery (minimum 10 times)',
        isCompleted: true,
        dueDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'action9',
        description: 'Prepare answers to potential investor questions',
        isCompleted: true,
        dueDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      }
    ],
    feedback: {
      rating: 5,
      comment: 'Exceptional service that directly contributed to our successful fundraising round. The pitch deck was outstanding and the preparation for investor questions was invaluable.',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: 'session4',
    serviceId: 'service4',
    serviceName: 'Market Entry Strategy',
    clientId: 'client4',
    clientName: 'Nadia Boutros',
    clientEmail: 'nadia.boutros@example.com',
    clientProfilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    status: 'scheduled',
    sessionType: 'one-time',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Starting in 7 days
    duration: '8 weeks',
    format: 'hybrid',
    price: 12000,
    isPaid: true,
    progress: 0,
    notes: 'Initial discovery call completed. Nadia\'s company is looking to expand their healthtech solution from Egypt to GCC countries. Need to prepare market analysis framework before kickoff.',
    materials: [
      {
        id: 'material9',
        name: 'Project Scope Document',
        type: 'PDF',
        url: '#',
        uploadDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'material10',
        name: 'Pre-Project Questionnaire',
        type: 'DOCX',
        url: '#',
        uploadDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ],
    actionItems: [
      {
        id: 'action10',
        description: 'Complete pre-project questionnaire',
        isCompleted: false,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'action11',
        description: 'Share current marketing materials and product documentation',
        isCompleted: false,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'action12',
        description: 'Schedule kickoff meeting with key stakeholders',
        isCompleted: false,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      }
    ]
  }
];

export const sampleClients: ClientData[] = [
  {
    id: 'client1',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+971 50 123 4567',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    company: 'FinTech Innovations',
    title: 'Founder & CEO',
    location: 'Dubai, UAE',
    firstInteraction: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), // 120 days ago
    lastInteraction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    totalSessions: 5,
    activeSessions: 1,
    completedSessions: 4,
    totalSpent: 8500,
    servicesUsed: ['Startup Mentoring Package', 'Investor Pitch Preparation'],
    notes: 'Ahmed is building a payment gateway for SMEs in the MENA region. He\'s highly engaged and implements feedback quickly. Looking to raise Series A in the next 6 months.',
    tags: ['Fintech', 'Founder', 'High Potential', 'Series A'],
    communicationHistory: [
      {
        id: 'comm1',
        type: 'meeting',
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        summary: 'Initial discovery call. Discussed Ahmed\'s business and challenges.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
          description: 'Send mentoring program details',
          completed: true
        }
      },
      {
        id: 'comm2',
        type: 'email',
        date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        summary: 'Sent proposal for mentoring package. Ahmed requested a call to discuss.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000),
          description: 'Schedule follow-up call',
          completed: true
        }
      },
      {
        id: 'comm3',
        type: 'meeting',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        summary: 'Mentoring session #3. Discussed go-to-market strategy and customer acquisition.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          description: 'Send GTM strategy template',
          completed: false
        }
      }
    ]
  },
  {
    id: 'client2',
    name: 'Sarah Al-Rashid',
    email: 'sarah.alrashid@example.com',
    phone: '+971 55 987 6543',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    company: 'Emirates NBD',
    title: 'Head of Digital Innovation',
    location: 'Dubai, UAE',
    firstInteraction: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    lastInteraction: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    totalSessions: 3,
    activeSessions: 1,
    completedSessions: 2,
    totalSpent: 15000,
    servicesUsed: ['Fintech Strategy Consulting'],
    notes: 'Sarah is leading digital transformation initiatives at Emirates NBD. She\'s looking for strategic guidance on fintech partnerships and regulatory compliance.',
    tags: ['Banking', 'Corporate', 'Digital Transformation', 'Fintech'],
    communicationHistory: [
      {
        id: 'comm4',
        type: 'email',
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        summary: 'Initial inquiry about fintech consulting services.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() - 88 * 24 * 60 * 60 * 1000),
          description: 'Respond with service details',
          completed: true
        }
      },
      {
        id: 'comm5',
        type: 'meeting',
        date: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000),
        summary: 'Discovery meeting with Sarah and her team. Discussed their digital transformation goals and challenges.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
          description: 'Send proposal',
          completed: true
        }
      },
      {
        id: 'comm6',
        type: 'meeting',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        summary: 'Project update meeting. Reviewed regulatory compliance framework and discussed next steps.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
          description: 'Send updated compliance framework document',
          completed: false
        }
      }
    ]
  },
  {
    id: 'client3',
    name: 'Khalid Al-Thani',
    email: 'khalid.althani@example.com',
    phone: '+974 33 456 7890',
    profilePicture: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    company: 'Tech Oasis',
    title: 'Co-founder & CTO',
    location: 'Doha, Qatar',
    firstInteraction: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    lastInteraction: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    totalSessions: 1,
    activeSessions: 0,
    completedSessions: 1,
    totalSpent: 3500,
    servicesUsed: ['Investor Pitch Preparation'],
    notes: 'Khalid co-founded a SaaS platform for the hospitality industry. Successfully completed pitch preparation and secured funding. Potential for future services as they scale.',
    tags: ['SaaS', 'Hospitality', 'Founder', 'Seed Stage'],
    communicationHistory: [
      {
        id: 'comm7',
        type: 'message',
        date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        summary: 'Khalid reached out via LinkedIn about pitch preparation services.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() - 59 * 24 * 60 * 60 * 1000),
          description: 'Schedule initial call',
          completed: true
        }
      },
      {
        id: 'comm8',
        type: 'call',
        date: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
        summary: 'Discovery call to understand Khalid\'s business and fundraising goals.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() - 53 * 24 * 60 * 60 * 1000),
          description: 'Send proposal',
          completed: true
        }
      },
      {
        id: 'comm9',
        type: 'email',
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        summary: 'Follow-up after successful fundraising. Congratulated Khalid on securing investment.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
          description: 'Check in on progress post-funding',
          completed: false
        }
      }
    ]
  },
  {
    id: 'client4',
    name: 'Nadia Boutros',
    email: 'nadia.boutros@example.com',
    phone: '+20 10 2345 6789',
    profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    company: 'HealthTech Solutions',
    title: 'Founder & CEO',
    location: 'Cairo, Egypt',
    firstInteraction: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    lastInteraction: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    totalSessions: 1,
    activeSessions: 1,
    completedSessions: 0,
    totalSpent: 12000,
    servicesUsed: ['Market Entry Strategy'],
    notes: 'Nadia founded a telemedicine platform in Egypt that has gained significant traction. Now looking to expand to GCC countries, starting with UAE and Saudi Arabia.',
    tags: ['Healthtech', 'Expansion', 'Founder', 'Growth Stage'],
    communicationHistory: [
      {
        id: 'comm10',
        type: 'email',
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        summary: 'Nadia inquired about market entry consulting services for GCC expansion.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
          description: 'Schedule discovery call',
          completed: true
        }
      },
      {
        id: 'comm11',
        type: 'meeting',
        date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        summary: 'Initial consultation to understand Nadia\'s business and expansion goals.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          description: 'Prepare and send proposal',
          completed: true
        }
      },
      {
        id: 'comm12',
        type: 'call',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        summary: 'Pre-kickoff call to discuss project timeline and requirements.',
        followUp: {
          required: true,
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          description: 'Send pre-project questionnaire',
          completed: false
        }
      }
    ]
  }
];

export const sampleMarketUpdates: MarketUpdate[] = [
  {
    id: 'update1',
    title: 'Consulting Demand Surges in MENA Tech Sector',
    description: 'Recent report shows 35% increase in demand for specialized consulting services in the MENA technology sector, with particular growth in fintech and healthtech advisory.',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    source: 'MENA Consulting Insights',
    url: '#',
    relevance: 'high',
    category: 'industry'
  },
  {
    id: 'update2',
    title: 'New Regulations for Digital Service Providers in UAE',
    description: 'UAE\'s regulatory authority announces new compliance requirements for digital service providers, including consultants and advisors operating online platforms.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    source: 'Gulf Business',
    url: '#',
    relevance: 'high',
    category: 'regulation'
  },
  {
    id: 'update3',
    title: 'Saudi Arabia Launches Program to Connect Startups with Mentors',
    description: 'Saudi Arabia\'s Ministry of Communications and Information Technology launches initiative to connect local startups with experienced mentors and advisors.',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    source: 'Arab News',
    url: '#',
    relevance: 'medium',
    category: 'market'
  },
  {
    id: 'update4',
    title: 'Virtual Workshop Platforms See 50% Growth in MENA Region',
    description: 'Virtual workshop and training platforms report significant growth in the MENA region as businesses continue to embrace digital learning solutions.',
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    source: 'Digital MENA',
    url: '#',
    relevance: 'medium',
    category: 'technology'
  }
];