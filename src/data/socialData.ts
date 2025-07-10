export interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    title: string;
    profilePicture: string;
    role: 'founder' | 'investor' | 'expert';
  };
  content: string;
  timestamp: Date;
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  isLiked: boolean;
  isSaved: boolean;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  isJoined: boolean;
  recentActivity: string;
  coverImage: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  attendeeCount: number;
  networkAttendees: number;
  coverImage: string;
  organizer: {
    name: string;
    title: string;
  };
  isAttending: boolean;
}

export interface TrendingTopic {
  id: string;
  hashtag: string;
  views: number;
}

export interface SuggestedConnection {
  id: string;
  name: string;
  title: string;
  company: string;
  profilePicture: string;
  mutualConnections: number;
  role: 'founder' | 'investor' | 'expert';
}

// Sample data
export const samplePosts: Post[] = [
  {
    id: '1',
    user: {
      id: 'u1',
      name: 'Sarah Al-Rashid',
      title: 'CEO at FinTech Innovations',
      profilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      role: 'founder'
    },
    content: 'Excited to announce our Series A funding round! 🚀 We raised $12M to revolutionize digital payments in the MENA region. Special thanks to our investors and the amazing team that made this possible. #Fintech #SeriesA #MENA',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    stats: {
      likes: 234,
      comments: 45,
      shares: 23,
      views: 1200
    },
    isLiked: false,
    isSaved: false
  },
  {
    id: '2',
    user: {
      id: 'u2',
      name: 'Ahmed Hassan',
      title: 'Partner at MENA Ventures',
      profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      role: 'investor'
    },
    content: 'The healthtech sector in MENA is showing incredible growth potential. We\'re seeing 340% increase in telemedicine adoption. Looking for innovative startups in this space. DM me if you\'re building something interesting! #HealthTech #Investment',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    stats: {
      likes: 156,
      comments: 28,
      shares: 15,
      views: 890
    },
    isLiked: true,
    isSaved: true
  },
  {
    id: '3',
    user: {
      id: 'u3',
      name: 'Dr. Fatima Al-Zahra',
      title: 'Healthcare Innovation Consultant',
      profilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      role: 'expert'
    },
    content: 'Just wrapped up an amazing workshop on digital health regulations in the GCC. The regulatory landscape is evolving rapidly to support innovation while ensuring patient safety. Key takeaways in the comments below 👇',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    stats: {
      likes: 89,
      comments: 12,
      shares: 8,
      views: 456
    },
    isLiked: false,
    isSaved: false
  }
];

export const sampleCommunities: Community[] = [
  {
    id: 'c1',
    name: 'MENA Fintech Founders',
    description: 'A community for fintech entrepreneurs in the Middle East and North Africa',
    memberCount: 2847,
    category: 'Industry',
    isJoined: true,
    recentActivity: '15 new posts today',
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
  },
  {
    id: 'c2',
    name: 'UAE Startup Ecosystem',
    description: 'Connecting startups, investors, and supporters in the UAE',
    memberCount: 5234,
    category: 'Regional',
    isJoined: false,
    recentActivity: '23 new posts today',
    coverImage: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
  },
  {
    id: 'c3',
    name: 'Women in Tech MENA',
    description: 'Empowering women entrepreneurs and professionals in technology',
    memberCount: 1892,
    category: 'Interest',
    isJoined: true,
    recentActivity: '8 new posts today',
    coverImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2'
  }
];

export const sampleEvents: Event[] = [
  {
    id: 'e1',
    title: 'MENA Fintech Summit 2025',
    description: 'The largest fintech conference in the Middle East',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    location: 'Dubai, UAE',
    attendeeCount: 1250,
    networkAttendees: 23,
    coverImage: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    organizer: {
      name: 'MENA Tech Events',
      title: 'Event Organizer'
    },
    isAttending: false
  },
  {
    id: 'e2',
    title: 'Startup Pitch Night',
    description: 'Monthly pitch event for early-stage startups',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    location: 'Riyadh, Saudi Arabia',
    attendeeCount: 180,
    networkAttendees: 12,
    coverImage: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    organizer: {
      name: 'Riyadh Entrepreneurs',
      title: 'Community Organizer'
    },
    isAttending: true
  }
];

export const sampleTrendingTopics: TrendingTopic[] = [
  { id: 't1', hashtag: '#MENAFintech', views: 12500 },
  { id: 't2', hashtag: '#SeriesA', views: 8900 },
  { id: 't3', hashtag: '#HealthTech', views: 7600 },
  { id: 't4', hashtag: '#AIInnovation', views: 6800 },
  { id: 't5', hashtag: '#SustainableTech', views: 5400 }
];

export const sampleSuggestedConnections: SuggestedConnection[] = [
  {
    id: 'sc1',
    name: 'Omar Al-Mansouri',
    title: 'VP of Innovation',
    company: 'Emirates NBD',
    profilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    mutualConnections: 15,
    role: 'expert'
  },
  {
    id: 'sc2',
    name: 'Layla Kassem',
    title: 'Founder & CEO',
    company: 'EduTech Solutions',
    profilePicture: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    mutualConnections: 8,
    role: 'founder'
  },
  {
    id: 'sc3',
    name: 'Khalid Al-Thani',
    title: 'Investment Director',
    company: 'Qatar Development Bank',
    profilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    mutualConnections: 22,
    role: 'investor'
  }
];