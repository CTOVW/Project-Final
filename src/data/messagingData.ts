export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: 'text' | 'image' | 'file';
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantTitle: string;
  participantProfilePicture: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

// Sample data
export const sampleConversations: Conversation[] = [
  {
    id: 'conv1',
    participantId: 'u1',
    participantName: 'Sarah Al-Rashid',
    participantTitle: 'CEO at FinTech Innovations',
    participantProfilePicture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastMessage: 'Thanks for the introduction! Looking forward to our call next week.',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    unreadCount: 2,
    isOnline: true
  },
  {
    id: 'conv2',
    participantId: 'u2',
    participantName: 'Ahmed Hassan',
    participantTitle: 'Partner at MENA Ventures',
    participantProfilePicture: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastMessage: 'The due diligence documents look great. Let\'s schedule a follow-up.',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    unreadCount: 0,
    isOnline: false
  },
  {
    id: 'conv3',
    participantId: 'u3',
    participantName: 'Dr. Fatima Al-Zahra',
    participantTitle: 'Healthcare Innovation Consultant',
    participantProfilePicture: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastMessage: 'I\'d be happy to review your healthcare compliance strategy.',
    lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    unreadCount: 1,
    isOnline: true
  },
  {
    id: 'conv4',
    participantId: 'u4',
    participantName: 'Omar Al-Mansouri',
    participantTitle: 'VP of Innovation at Emirates NBD',
    participantProfilePicture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    lastMessage: 'Great meeting you at the fintech summit!',
    lastMessageTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    unreadCount: 0,
    isOnline: false
  }
];

export const sampleMessages: { [conversationId: string]: Message[] } = {
  conv1: [
    {
      id: 'msg1',
      senderId: 'u1',
      receiverId: 'current-user',
      content: 'Hi! I saw your post about the new fintech regulations. Very insightful!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      type: 'text'
    },
    {
      id: 'msg2',
      senderId: 'current-user',
      receiverId: 'u1',
      content: 'Thank you! I\'d be happy to discuss this further. Are you available for a call this week?',
      timestamp: new Date(Date.now() - 90 * 60 * 1000),
      isRead: true,
      type: 'text'
    },
    {
      id: 'msg3',
      senderId: 'u1',
      receiverId: 'current-user',
      content: 'Absolutely! How about Wednesday at 2 PM UAE time?',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      isRead: true,
      type: 'text'
    },
    {
      id: 'msg4',
      senderId: 'u1',
      receiverId: 'current-user',
      content: 'Thanks for the introduction! Looking forward to our call next week.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      type: 'text'
    }
  ],
  conv2: [
    {
      id: 'msg5',
      senderId: 'u2',
      receiverId: 'current-user',
      content: 'I reviewed your pitch deck. Very impressive traction numbers!',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRead: true,
      type: 'text'
    },
    {
      id: 'msg6',
      senderId: 'current-user',
      receiverId: 'u2',
      content: 'Thank you! We\'ve been working hard on product-market fit.',
      timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
      isRead: true,
      type: 'text'
    },
    {
      id: 'msg7',
      senderId: 'u2',
      receiverId: 'current-user',
      content: 'The due diligence documents look great. Let\'s schedule a follow-up.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      type: 'text'
    }
  ]
};