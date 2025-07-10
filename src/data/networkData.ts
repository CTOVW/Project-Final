export interface Connection {
  id: string;
  name: string;
  title: string;
  company: string;
  profilePicture: string;
  role: 'founder' | 'investor' | 'expert';
  connectionDate: Date;
  location: string;
  mutualConnections?: number;
}

export interface ConnectionRequest {
  id: string;
  name: string;
  title: string;
  company: string;
  profilePicture: string;
  role: 'founder' | 'investor' | 'expert';
  mutualConnections: number;
  requestDate: Date;
  message?: string;
  location: string;
}

export interface DiscoverProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  profilePicture: string;
  role: 'founder' | 'investor' | 'expert';
  mutualConnections: number;
  location: string;
  expertise?: string[];
}

// Sample data
export const sampleConnections: Connection[] = [
  {
    id: 'conn1',
    name: 'Sarah Al-Rashid',
    title: 'CEO & Founder',
    company: 'FinTech Innovations',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'founder',
    connectionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    location: 'Dubai, UAE'
  },
  {
    id: 'conn2',
    name: 'Ahmed Hassan',
    title: 'Partner',
    company: 'MENA Ventures',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'investor',
    connectionDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    location: 'Riyadh, Saudi Arabia'
  },
  {
    id: 'conn3',
    name: 'Dr. Fatima Al-Zahra',
    title: 'Healthcare Innovation Consultant',
    company: 'MedTech Advisory',
    profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'expert',
    connectionDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    location: 'Cairo, Egypt'
  },
  {
    id: 'conn4',
    name: 'Omar Al-Mansouri',
    title: 'VP of Innovation',
    company: 'Emirates NBD',
    profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'expert',
    connectionDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), // 45 days ago
    location: 'Abu Dhabi, UAE'
  },
  {
    id: 'conn5',
    name: 'Layla Kassem',
    title: 'Founder & CEO',
    company: 'EduTech Solutions',
    profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'founder',
    connectionDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    location: 'Amman, Jordan'
  }
];

export const sampleConnectionRequests: ConnectionRequest[] = [
  {
    id: 'req1',
    name: 'Khalid Al-Thani',
    title: 'Investment Director',
    company: 'Qatar Development Bank',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'investor',
    mutualConnections: 12,
    requestDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    message: 'Hi! I\'d love to connect and discuss potential investment opportunities in the fintech space.',
    location: 'Doha, Qatar'
  },
  {
    id: 'req2',
    name: 'Nadia Boutros',
    title: 'Co-founder',
    company: 'GreenTech MENA',
    profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'founder',
    mutualConnections: 8,
    requestDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    location: 'Beirut, Lebanon'
  },
  {
    id: 'req3',
    name: 'Youssef Mansour',
    title: 'Senior Consultant',
    company: 'McKinsey & Company',
    profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'expert',
    mutualConnections: 15,
    requestDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    message: 'I noticed we have several mutual connections and would like to expand my network in the startup ecosystem.',
    location: 'Dubai, UAE'
  }
];

export const sampleDiscoverProfiles: DiscoverProfile[] = [
  {
    id: 'disc1',
    name: 'Rania Al-Abdullah',
    title: 'Managing Partner',
    company: 'Jordan Innovation Fund',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'investor',
    mutualConnections: 18,
    location: 'Amman, Jordan',
    expertise: ['Early-stage investing', 'Tech startups', 'MENA markets']
  },
  {
    id: 'disc2',
    name: 'Hassan Al-Rashid',
    title: 'Founder & CTO',
    company: 'AI Solutions MENA',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'founder',
    mutualConnections: 7,
    location: 'Kuwait City, Kuwait',
    expertise: ['Artificial Intelligence', 'Machine Learning', 'B2B SaaS']
  },
  {
    id: 'disc3',
    name: 'Dr. Amira Farouk',
    title: 'Digital Health Strategist',
    company: 'HealthTech Consulting',
    profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'expert',
    mutualConnections: 11,
    location: 'Cairo, Egypt',
    expertise: ['Digital Health', 'Regulatory Affairs', 'Healthcare Innovation']
  },
  {
    id: 'disc4',
    name: 'Mohammed Al-Sabah',
    title: 'Serial Entrepreneur',
    company: 'Multiple Ventures',
    profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'founder',
    mutualConnections: 25,
    location: 'Kuwait City, Kuwait',
    expertise: ['E-commerce', 'Logistics', 'Marketplace platforms']
  },
  {
    id: 'disc5',
    name: 'Leila Benali',
    title: 'Investment Principal',
    company: 'North Africa Ventures',
    profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'investor',
    mutualConnections: 14,
    location: 'Casablanca, Morocco',
    expertise: ['Growth investing', 'North Africa', 'Fintech']
  },
  {
    id: 'disc6',
    name: 'Tariq Al-Zahra',
    title: 'Blockchain Consultant',
    company: 'Crypto Advisory MENA',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    role: 'expert',
    mutualConnections: 9,
    location: 'Dubai, UAE',
    expertise: ['Blockchain', 'Cryptocurrency', 'DeFi']
  }
];