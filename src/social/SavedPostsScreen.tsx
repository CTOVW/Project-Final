import React, { useState } from 'react';
import { 
  Bookmark, 
  Search, 
  Filter,
  Heart, 
  MessageCircle, 
  Share,
  MoreHorizontal,
  Tag,
  Calendar
} from 'lucide-react';
import { samplePosts } from '../data/socialData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface SavedPostsScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
}

function SavedPostsScreen({ selectedRole, profileData, toggleAICompanion }: SavedPostsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter to show only saved posts (for demo, we'll mark some as saved)
  const savedPosts = samplePosts.map((post, index) => ({
    ...post,
    isSaved: index % 2 === 0, // Mark every other post as saved for demo
    savedDate: new Date(Date.now() - index * 24 * 60 * 60 * 1000) // Saved on different days
  })).filter(post => post.isSaved);

  const filterOptions = [
    { id: 'all', label: 'All Saved' },
    { id: 'recent', label: 'Recently Saved' },
    { id: 'popular', label: 'Most Popular' },
    { id: 'founders', label: 'From Founders' },
    { id: 'investors', label: 'From Investors' },
    { id: 'experts', label: 'From Experts' }
  ];

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
          <Bookmark className="h-8 w-8 text-yellow-400" />
          <span>Saved Posts</span>
        </h1>
        <p className="text-white/80">Your personal library of valuable content and insights</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved posts..."
                className="w-full bg-primary/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-white/60" />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="bg-primary/40 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {filterOptions.map((option) => (
                <option key={option.id} value={option.id} className="bg-slate-800">
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {savedPosts.length === 0 ? (
            <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-12 text-center shadow-lg">
              <Bookmark className="h-16 w-16 text-white/40 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-xl mb-2">No saved posts yet</h3>
              <p className="text-white/70">Start saving posts that interest you to build your personal library</p>
            </div>
          ) : (
            <div className="space-y-6">
              {savedPosts.map((post) => (
                <div key={post.id} className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={post.user.profilePicture}
                        alt={post.user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-white font-semibold">{post.user.name}</h3>
                        <p className="text-white/70 text-sm">{post.user.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            post.user.role === 'founder' ? 'bg-purple-500/20 text-purple-300' :
                            post.user.role === 'investor' ? 'bg-accent/20 text-accent' :
                            'bg-highlight/20 text-highlight'
                          }`}>
                            {post.user.role}
                          </span>
                          <span className="text-white/60 text-xs">{formatTimeAgo(post.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1 text-yellow-400 text-xs">
                        <Bookmark className="h-4 w-4 fill-current" />
                        <span>Saved {formatTimeAgo(post.savedDate)}</span>
                      </div>
                      <button className="text-white/60 hover:text-white transition-colors">
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-white leading-relaxed">{post.content}</p>
                  </div>

                  {/* Post Stats */}
                  <div className="flex items-center justify-between text-white/60 text-sm mb-4">
                    <div className="flex items-center space-x-4">
                      <span>{formatNumber(post.stats.likes)} likes</span>
                      <span>{formatNumber(post.stats.comments)} comments</span>
                      <span>{formatNumber(post.stats.shares)} shares</span>
                    </div>
                    <span>{formatNumber(post.stats.views)} views</span>
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      post.isLiked 
                        ? 'text-red-400 bg-red-500/10' 
                        : 'text-white/70 hover:text-white hover:bg-primary/40'
                    }`}>
                      <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-primary/40 px-4 py-2 rounded-lg transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      <span>Comment</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-primary/40 px-4 py-2 rounded-lg transition-colors">
                      <Share className="h-5 w-5" />
                      <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-2 text-yellow-400 bg-yellow-500/10 px-4 py-2 rounded-lg transition-colors">
                      <Bookmark className="h-5 w-5 fill-current" />
                      <span>Saved</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Saved Stats */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4">Your Library</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{savedPosts.length}</div>
                <div className="text-white/70 text-sm">Saved Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-white/70 text-sm">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-white/70 text-sm">Relevance Score</div>
              </div>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Tag className="h-5 w-5 text-purple-300" />
              <span>Popular Tags</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                '#Fintech', '#SeriesA', '#HealthTech', '#Investment', 
                '#Startup', '#MENA', '#Innovation', '#AI'
              ].map((tag) => (
                <span 
                  key={tag}
                  className="bg-highlight/20 text-highlight px-3 py-1 rounded-full text-sm border border-highlight/30 hover:bg-highlight/30 cursor-pointer transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-300" />
              <span>Recent Activity</span>
            </h3>
            <div className="space-y-3">
              {[
                { action: 'Saved post', author: 'Sarah Al-Rashid', time: '2h ago' },
                { action: 'Saved post', author: 'Ahmed Hassan', time: '1d ago' },
                { action: 'Created collection', name: 'Fintech Insights', time: '3d ago' },
                { action: 'Saved post', author: 'Dr. Fatima Al-Zahra', time: '5d ago' }
              ].map((activity, index) => (
                <div key={index} className="text-sm">
                  <span className="text-white/80">{activity.action}</span>
                  {activity.author && (
                    <span className="text-white/60"> from {activity.author}</span>
                  )}
                  {activity.name && (
                    <span className="text-purple-300"> "{activity.name}"</span>
                  )}
                  <div className="text-white/50 text-xs">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedPostsScreen;