export interface Expert {
  id: string;
  name: string;
  title: string;
  company: string;
  profilePicture: string;
  rating: number;
  specialities: string[];
  shortBio: string;
  location: string;
  yearsExperience: number;
  isOnline: boolean;
  responseTime: string;
  completedSessions: number;
  // Professional background
  workExperience: {
    position: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: string[];
  awards: string[];
  careerHighlights: string[];
}

export interface Service {
  id: string;
  expertId: string;
  expertName: string;
  expertProfilePicture: string;
  serviceName: string;
  shortDescription: string;
  detailedDescription: string;
  coverPhoto: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  location: string;
  deliveryFormat: 'Online' | 'In-person' | 'Hybrid';
  duration: string;
  pricing: {
    basePrice: number;
    currency: string;
    packageOptions?: {
      name: string;
      price: number;
      description: string;
    }[];
  };
  objectives: string[];
  methodology: string;
  deliverables: string[];
  prerequisites: string[];
  successMetrics: string[];
}

export interface Workshop {
  id: string;
  workshopName: string;
  shortDescription: string;
  detailedDescription: string;
  coverPhoto: string;
  date: Date;
  duration: string;
  location: string;
  format: 'Online' | 'In-person' | 'Hybrid';
  instructors: {
    expertId: string;
    name: string;
    profilePicture: string;
    title: string;
    rating: number;
  }[];
  rating: number;
  reviewCount: number;
  tags: string[];
  learningObjectives: string[];
  agenda: {
    time: string;
    topic: string;
    description: string;
  }[];
  targetAudience: string;
  pricing: {
    registrationFee: number;
    currency: string;
    earlyBirdDiscount?: number;
    groupPricing?: {
      minParticipants: number;
      discountPercentage: number;
    };
  };
  capacity: {
    maxParticipants: number;
    currentEnrollment: number;
    minParticipants: number;
  };
  materials: string[];
  certificates: boolean;
  prerequisites: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  clientProfilePicture: string;
  rating: number;
  testimonialText: string;
  serviceType: 'service' | 'workshop';
  serviceId: string;
  date: Date;
}

export interface SavedItem {
  id: string;
  type: 'expert' | 'service' | 'workshop';
  itemId: string;
  savedDate: Date;
}

export interface Session {
  id: string;
  expertId: string;
  serviceId: string;
  clientId: string;
  status: 'active' | 'completed' | 'scheduled' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  sessionType: 'service' | 'workshop';
  progress: number;
  nextMilestone?: string;
  actionItems: string[];
  materials: {
    name: string;
    url: string;
    type: 'document' | 'video' | 'link';
  }[];
  notes: string;
  feedback?: {
    rating: number;
    comment: string;
    date: Date;
  };
}

// Sample data
export const sampleExperts: Expert[] = [
  {
    id: 'expert1',
    name: 'Dr. Sarah Al-Rashid',
    title: 'Fintech Strategy Consultant',
    company: 'MENA Financial Innovation',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 4.9,
    specialities: ['Fintech Strategy', 'Digital Banking', 'Regulatory Compliance', 'Market Entry'],
    shortBio: 'Former VP at Emirates NBD with 15+ years in financial services and fintech innovation across MENA.',
    location: 'Dubai, UAE',
    yearsExperience: 15,
    isOnline: true,
    responseTime: '< 2 hours',
    completedSessions: 127,
    workExperience: [
      {
        position: 'VP Digital Innovation',
        company: 'Emirates NBD',
        duration: '2018-2023',
        description: 'Led digital transformation initiatives and fintech partnerships'
      },
      {
        position: 'Senior Manager',
        company: 'ADCB',
        duration: '2015-2018',
        description: 'Managed retail banking digital products and customer experience'
      }
    ],
    education: [
      {
        degree: 'MBA Finance',
        institution: 'INSEAD',
        year: '2015'
      },
      {
        degree: 'BSc Computer Science',
        institution: 'American University of Sharjah',
        year: '2008'
      }
    ],
    certifications: ['PMP', 'Certified Fintech Professional', 'Digital Banking Certification'],
    awards: ['MENA Fintech Leader 2022', 'Innovation Excellence Award'],
    careerHighlights: [
      'Led $50M digital transformation at Emirates NBD',
      'Launched 3 successful fintech partnerships',
      'Mentored 50+ fintech startups'
    ]
  },
  {
    id: 'expert2',
    name: 'Ahmed Hassan',
    title: 'Venture Capital Partner',
    company: 'MENA Growth Partners',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 4.8,
    specialities: ['Venture Capital', 'Due Diligence', 'Portfolio Management', 'Fundraising'],
    shortBio: 'Seasoned VC with $200M+ in investments across 40+ startups in MENA region.',
    location: 'Riyadh, Saudi Arabia',
    yearsExperience: 12,
    isOnline: false,
    responseTime: '< 4 hours',
    completedSessions: 89,
    workExperience: [
      {
        position: 'Partner',
        company: 'MENA Growth Partners',
        duration: '2020-Present',
        description: 'Leading Series A and B investments in tech startups'
      },
      {
        position: 'Principal',
        company: 'STV',
        duration: '2017-2020',
        description: 'Focused on early-stage investments in fintech and e-commerce'
      }
    ],
    education: [
      {
        degree: 'MBA',
        institution: 'Wharton School',
        year: '2017'
      },
      {
        degree: 'BSc Engineering',
        institution: 'King Fahd University',
        year: '2012'
      }
    ],
    certifications: ['CFA', 'Venture Capital Institute Certificate'],
    awards: ['Top VC MENA 2023', 'Deal of the Year 2022'],
    careerHighlights: [
      'Led investments in 3 unicorns',
      'Generated 15x average returns',
      'Built portfolio of 40+ companies'
    ]
  },
  {
    id: 'expert3',
    name: 'Dr. Fatima Al-Zahra',
    title: 'Healthcare Innovation Expert',
    company: 'MedTech Consulting MENA',
    profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 4.9,
    specialities: ['Healthcare Innovation', 'Digital Health', 'Regulatory Affairs', 'Medical Devices'],
    shortBio: 'Former Chief Medical Officer with expertise in healthcare technology and regulatory compliance.',
    location: 'Cairo, Egypt',
    yearsExperience: 18,
    isOnline: true,
    responseTime: '< 1 hour',
    completedSessions: 156,
    workExperience: [
      {
        position: 'Chief Medical Officer',
        company: 'Cairo Medical Center',
        duration: '2015-2022',
        description: 'Led digital health initiatives and medical technology adoption'
      },
      {
        position: 'Senior Physician',
        company: 'Al-Azhar University Hospital',
        duration: '2010-2015',
        description: 'Clinical practice and medical research'
      }
    ],
    education: [
      {
        degree: 'MD',
        institution: 'Al-Azhar University',
        year: '2005'
      },
      {
        degree: 'MSc Health Informatics',
        institution: 'Cairo University',
        year: '2012'
      }
    ],
    certifications: ['Board Certified Physician', 'Health Informatics Certification', 'Medical Device Regulation'],
    awards: ['Healthcare Innovation Award 2021', 'Medical Excellence Award'],
    careerHighlights: [
      'Implemented EMR system for 500+ bed hospital',
      'Advised 20+ healthtech startups',
      'Published 25+ research papers'
    ]
  },
  {
    id: 'expert4',
    name: 'Omar Al-Mansouri',
    title: 'Digital Transformation Leader',
    company: 'Innovation Consulting Group',
    profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 4.7,
    specialities: ['Digital Transformation', 'Innovation Strategy', 'Change Management', 'Technology Implementation'],
    shortBio: 'Former VP of Innovation at Emirates NBD, specializing in large-scale digital transformation.',
    location: 'Abu Dhabi, UAE',
    yearsExperience: 14,
    isOnline: true,
    responseTime: '< 3 hours',
    completedSessions: 98,
    workExperience: [
      {
        position: 'VP Innovation',
        company: 'Emirates NBD',
        duration: '2019-2024',
        description: 'Led bank-wide digital transformation and innovation programs'
      },
      {
        position: 'Director Digital Strategy',
        company: 'Etisalat',
        duration: '2016-2019',
        description: 'Developed and executed digital strategy for telecom operations'
      }
    ],
    education: [
      {
        degree: 'MBA Technology Management',
        institution: 'London Business School',
        year: '2016'
      },
      {
        degree: 'BSc Information Systems',
        institution: 'UAE University',
        year: '2010'
      }
    ],
    certifications: ['PMP', 'Certified Innovation Professional', 'Digital Transformation Certificate'],
    awards: ['Innovation Leader 2023', 'Digital Excellence Award'],
    careerHighlights: [
      'Led $100M digital transformation program',
      'Launched 5 innovative digital products',
      'Trained 500+ employees in digital skills'
    ]
  }
];

export const sampleServices: Service[] = [
  {
    id: 'service1',
    expertId: 'expert1',
    expertName: 'Dr. Sarah Al-Rashid',
    expertProfilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    serviceName: 'Fintech Strategy Development',
    shortDescription: 'Comprehensive fintech strategy consulting for startups and established companies',
    detailedDescription: 'A comprehensive 8-week program to develop and refine your fintech strategy, covering market analysis, competitive positioning, regulatory compliance, and go-to-market strategy. Includes weekly 1-on-1 sessions, strategic frameworks, and actionable roadmap.',
    coverPhoto: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    rating: 4.9,
    reviewCount: 47,
    tags: ['Fintech', 'Strategy', 'Market Entry', 'Compliance'],
    location: 'Dubai, UAE',
    deliveryFormat: 'Hybrid',
    duration: '8 weeks',
    pricing: {
      basePrice: 15000,
      currency: 'USD',
      packageOptions: [
        {
          name: 'Basic Strategy Review',
          price: 8000,
          description: '4-week program with bi-weekly sessions'
        },
        {
          name: 'Comprehensive Strategy',
          price: 15000,
          description: '8-week program with weekly sessions and deliverables'
        },
        {
          name: 'Strategy + Implementation',
          price: 25000,
          description: '12-week program including implementation support'
        }
      ]
    },
    objectives: [
      'Develop comprehensive fintech strategy',
      'Identify market opportunities and positioning',
      'Create regulatory compliance framework',
      'Design go-to-market strategy'
    ],
    methodology: 'Structured approach combining market research, stakeholder interviews, competitive analysis, and strategic planning workshops',
    deliverables: [
      'Market analysis report',
      'Competitive positioning framework',
      'Regulatory compliance checklist',
      'Go-to-market strategy document',
      'Implementation roadmap'
    ],
    prerequisites: [
      'Basic understanding of fintech landscape',
      'Access to company financial data',
      'Commitment to weekly sessions',
      'Executive team availability for interviews'
    ],
    successMetrics: [
      'Clear strategic direction defined',
      'Market entry strategy validated',
      'Regulatory roadmap established',
      'Implementation plan approved'
    ]
  },
  {
    id: 'service2',
    expertId: 'expert2',
    expertName: 'Ahmed Hassan',
    expertProfilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    serviceName: 'Fundraising Strategy & Execution',
    shortDescription: 'End-to-end fundraising support from strategy to closing',
    detailedDescription: 'Complete fundraising program covering investor targeting, pitch deck optimization, due diligence preparation, and negotiation support. Includes access to investor network and ongoing advisory throughout the process.',
    coverPhoto: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    rating: 4.8,
    reviewCount: 32,
    tags: ['Fundraising', 'Venture Capital', 'Pitch Deck', 'Due Diligence'],
    location: 'Riyadh, Saudi Arabia',
    deliveryFormat: 'Online',
    duration: '12 weeks',
    pricing: {
      basePrice: 20000,
      currency: 'USD',
      packageOptions: [
        {
          name: 'Pitch Deck Review',
          price: 5000,
          description: 'Comprehensive pitch deck review and optimization'
        },
        {
          name: 'Fundraising Strategy',
          price: 12000,
          description: 'Strategy development and investor targeting'
        },
        {
          name: 'Full Fundraising Support',
          price: 20000,
          description: 'End-to-end fundraising support with success fee'
        }
      ]
    },
    objectives: [
      'Develop compelling fundraising strategy',
      'Create investor-ready pitch deck',
      'Prepare comprehensive due diligence package',
      'Successfully close funding round'
    ],
    methodology: 'Proven fundraising framework with investor insights, market positioning, and negotiation best practices',
    deliverables: [
      'Investor targeting strategy',
      'Optimized pitch deck',
      'Due diligence checklist',
      'Financial model review',
      'Term sheet negotiation support'
    ],
    prerequisites: [
      'Minimum viable product or clear product roadmap',
      'Financial statements for past 2 years',
      'Clear funding requirements and use of funds',
      'Management team commitment'
    ],
    successMetrics: [
      'Successful funding round closure',
      'Favorable terms negotiated',
      'Strong investor relationships established',
      'Clear growth trajectory defined'
    ]
  },
  {
    id: 'service3',
    expertId: 'expert3',
    expertName: 'Dr. Fatima Al-Zahra',
    expertProfilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    serviceName: 'Healthcare Regulatory Compliance',
    shortDescription: 'Navigate healthcare regulations and compliance requirements',
    detailedDescription: 'Comprehensive regulatory compliance program for healthcare startups and medical device companies. Covers regulatory strategy, submission preparation, and ongoing compliance management.',
    coverPhoto: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    rating: 4.9,
    reviewCount: 28,
    tags: ['Healthcare', 'Regulatory', 'Compliance', 'Medical Devices'],
    location: 'Cairo, Egypt',
    deliveryFormat: 'Online',
    duration: '6 weeks',
    pricing: {
      basePrice: 12000,
      currency: 'USD'
    },
    objectives: [
      'Understand regulatory landscape',
      'Develop compliance strategy',
      'Prepare regulatory submissions',
      'Establish ongoing compliance processes'
    ],
    methodology: 'Regulatory expertise combined with practical implementation guidance and industry best practices',
    deliverables: [
      'Regulatory landscape analysis',
      'Compliance strategy document',
      'Submission templates and guides',
      'Quality management system framework'
    ],
    prerequisites: [
      'Healthcare product or service concept',
      'Basic understanding of target markets',
      'Product development roadmap',
      'Quality assurance processes'
    ],
    successMetrics: [
      'Regulatory strategy approved',
      'Compliance framework implemented',
      'Successful regulatory submissions',
      'Market entry timeline established'
    ]
  }
];

export const sampleWorkshops: Workshop[] = [
  {
    id: 'workshop1',
    workshopName: 'Fintech Innovation Masterclass',
    shortDescription: 'Comprehensive workshop on fintech innovation and market opportunities',
    detailedDescription: 'A 2-day intensive workshop covering the latest trends in fintech, regulatory landscape, and practical strategies for building successful fintech products. Includes case studies, hands-on exercises, and networking opportunities.',
    coverPhoto: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    duration: '2 days',
    location: 'Dubai, UAE',
    format: 'In-person',
    instructors: [
      {
        expertId: 'expert1',
        name: 'Dr. Sarah Al-Rashid',
        profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        title: 'Fintech Strategy Consultant',
        rating: 4.9
      }
    ],
    rating: 4.8,
    reviewCount: 156,
    tags: ['Fintech', 'Innovation', 'Strategy', 'Regulation'],
    learningObjectives: [
      'Understand fintech landscape and opportunities',
      'Learn regulatory compliance requirements',
      'Develop fintech product strategy',
      'Build industry network'
    ],
    agenda: [
      {
        time: '09:00-10:30',
        topic: 'Fintech Landscape Overview',
        description: 'Current state and future trends in fintech'
      },
      {
        time: '11:00-12:30',
        topic: 'Regulatory Framework',
        description: 'Understanding compliance requirements'
      },
      {
        time: '14:00-15:30',
        topic: 'Product Strategy Workshop',
        description: 'Hands-on strategy development'
      },
      {
        time: '16:00-17:00',
        topic: 'Case Studies & Networking',
        description: 'Real-world examples and networking'
      }
    ],
    targetAudience: 'Fintech entrepreneurs, product managers, and innovation professionals',
    pricing: {
      registrationFee: 1500,
      currency: 'USD',
      earlyBirdDiscount: 200,
      groupPricing: {
        minParticipants: 3,
        discountPercentage: 15
      }
    },
    capacity: {
      maxParticipants: 50,
      currentEnrollment: 32,
      minParticipants: 15
    },
    materials: [
      'Workshop handbook',
      'Digital resources library',
      'Templates and frameworks',
      'Industry reports'
    ],
    certificates: true,
    prerequisites: [
      'Basic understanding of financial services',
      'Interest in fintech innovation',
      'Laptop for workshop exercises'
    ]
  },
  {
    id: 'workshop2',
    workshopName: 'Venture Capital Fundamentals',
    shortDescription: 'Learn the fundamentals of venture capital and startup investing',
    detailedDescription: 'Comprehensive workshop covering VC fundamentals, deal evaluation, due diligence, and portfolio management. Perfect for aspiring investors and entrepreneurs seeking funding.',
    coverPhoto: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
    duration: '1 day',
    location: 'Riyadh, Saudi Arabia',
    format: 'Hybrid',
    instructors: [
      {
        expertId: 'expert2',
        name: 'Ahmed Hassan',
        profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
        title: 'Venture Capital Partner',
        rating: 4.8
      }
    ],
    rating: 4.7,
    reviewCount: 89,
    tags: ['Venture Capital', 'Investment', 'Due Diligence', 'Startups'],
    learningObjectives: [
      'Understand VC ecosystem and process',
      'Learn deal evaluation techniques',
      'Master due diligence fundamentals',
      'Develop investment thesis'
    ],
    agenda: [
      {
        time: '09:00-10:30',
        topic: 'VC Ecosystem Overview',
        description: 'Understanding the venture capital landscape'
      },
      {
        time: '11:00-12:30',
        topic: 'Deal Evaluation Framework',
        description: 'How to evaluate startup opportunities'
      },
      {
        time: '14:00-15:30',
        topic: 'Due Diligence Process',
        description: 'Comprehensive due diligence methodology'
      },
      {
        time: '16:00-17:00',
        topic: 'Portfolio Management',
        description: 'Managing and supporting portfolio companies'
      }
    ],
    targetAudience: 'Aspiring investors, entrepreneurs, and finance professionals',
    pricing: {
      registrationFee: 800,
      currency: 'USD',
      earlyBirdDiscount: 100
    },
    capacity: {
      maxParticipants: 40,
      currentEnrollment: 28,
      minParticipants: 12
    },
    materials: [
      'VC fundamentals guide',
      'Due diligence templates',
      'Investment frameworks',
      'Case study materials'
    ],
    certificates: true,
    prerequisites: [
      'Basic finance knowledge',
      'Interest in startup ecosystem',
      'Calculator and notebook'
    ]
  }
];

export const sampleTestimonials: Testimonial[] = [
  {
    id: 'testimonial1',
    clientName: 'Khalid Al-Thani',
    clientTitle: 'CEO',
    clientCompany: 'PayTech Solutions',
    clientProfilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    testimonialText: 'Dr. Sarah\'s fintech strategy consulting was instrumental in our successful market entry. Her deep understanding of regulations and market dynamics helped us avoid costly mistakes and accelerate our growth.',
    serviceType: 'service',
    serviceId: 'service1',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'testimonial2',
    clientName: 'Nadia Boutros',
    clientTitle: 'Founder',
    clientCompany: 'HealthTech Innovations',
    clientProfilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    testimonialText: 'Ahmed\'s fundraising support was exceptional. His investor network and strategic guidance helped us close our Series A round 2 months ahead of schedule with better terms than expected.',
    serviceType: 'service',
    serviceId: 'service2',
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'testimonial3',
    clientName: 'Youssef Mansour',
    clientTitle: 'Product Manager',
    clientCompany: 'MedDevice Corp',
    clientProfilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    rating: 5,
    testimonialText: 'Dr. Fatima\'s regulatory expertise saved us months of delays. Her compliance framework helped us navigate the complex healthcare regulations efficiently.',
    serviceType: 'service',
    serviceId: 'service3',
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
  }
];

export const sampleSavedItems: SavedItem[] = [
  {
    id: 'saved1',
    type: 'expert',
    itemId: 'expert1',
    savedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'saved2',
    type: 'service',
    itemId: 'service2',
    savedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'saved3',
    type: 'workshop',
    itemId: 'workshop1',
    savedDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000)
  }
];

export const sampleSessions: Session[] = [
  {
    id: 'session1',
    expertId: 'expert1',
    serviceId: 'service1',
    clientId: 'current-user',
    status: 'active',
    startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    sessionType: 'service',
    progress: 65,
    nextMilestone: 'Complete market analysis review',
    actionItems: [
      'Review competitive analysis document',
      'Prepare stakeholder interview questions',
      'Schedule regulatory compliance meeting'
    ],
    materials: [
      {
        name: 'Market Analysis Template',
        url: '#',
        type: 'document'
      },
      {
        name: 'Competitive Analysis Framework',
        url: '#',
        type: 'document'
      }
    ],
    notes: 'Good progress on strategy development. Client is engaged and asking the right questions.',
    feedback: {
      rating: 5,
      comment: 'Excellent guidance and practical insights. Very satisfied with the progress.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
  },
  {
    id: 'session2',
    expertId: 'expert2',
    serviceId: 'service2',
    clientId: 'current-user',
    status: 'scheduled',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sessionType: 'service',
    progress: 0,
    nextMilestone: 'Initial strategy session',
    actionItems: [
      'Prepare pitch deck draft',
      'Compile financial statements',
      'Define funding requirements'
    ],
    materials: [],
    notes: 'Upcoming fundraising strategy session. Client has strong traction and clear vision.'
  }
];