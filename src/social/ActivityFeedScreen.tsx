import React, { useState } from 'react';
import { 
  Image, 
  Video, 
  Link, 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark,
  MoreHorizontal,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';
import { samplePosts, sampleTrendingTopics, sampleSuggestedConnections, sampleEvents } from '../data/socialData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface ActivityFeedScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
}

function ActivityFeedScreen({ selectedRole, profileData, toggleAICompanion }: ActivityFeedScreenProps) {
  const [activeFilter, setActiveFilter] = useState('recommended');
  const [postContent, setPostContent] = useState('');

  const feedFilters = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'following', label: 'Following' },
    { id: 'trending', label: 'Trending' },
    { id: 'deals', label: 'Deals' }
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">
                  {profileData.fullName ? profileData.fullName.charAt(0) : 'U'}
                </span>
              </div>
              <div className="flex-1">
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full bg-primary/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  rows={3}
                />
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                      <Image className="h-5 w-5" />
                      <span className="text-sm">Image</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                      <Video className="h-5 w-5" />
                      <span className="text-sm">Video</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
                      <Link className="h-5 w-5" />
                      <span className="text-sm">Link</span>
                    </button>
                  </div>
                  <button className="bg-gradient-to-r from-accent to-highlight text-white px-6 py-2 rounded-lg font-semibold hover:from-accent-dark hover:to-highlight-dark transition-all duration-300">
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Filters */}
          <div className="flex space-x-2">
            {feedFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-accent text-white'
                    : 'bg-primary/40 text-white/70 hover:text-white hover:bg-primary/60'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {samplePosts.map((post) => (
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
                  <button className="text-white/60 hover:text-white transition-colors">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
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
                  <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    post.isSaved 
                      ? 'text-yellow-400 bg-yellow-500/10' 
                      : 'text-white/70 hover:text-white hover:bg-primary/40'
                  }`}>
                    <Bookmark className={`h-5 w-5 ${post.isSaved ? 'fill-current' : ''}`} />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-300" />
              <span>Trending Topics</span>
            </h3>
            <div className="space-y-3">
              {sampleTrendingTopics.map((topic) => (
                <div key={topic.id} className="flex items-center justify-between">
                  <span className="text-purple-300 font-medium">{topic.hashtag}</span>
                  <span className="text-white/60 text-sm">{formatNumber(topic.views)} views</span>
                </div>
              ))}
            </div>
          </div>

          {/* People You Might Know */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-300" />
              <span>People You May Know</span>
            </h3>
            <div className="space-y-4">
              {sampleSuggestedConnections.map((connection) => (
                <div key={connection.id} className="flex items-center space-x-3">
                  <img
                    src={connection.profilePicture}
                    alt={connection.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{connection.name}</h4>
                    <p className="text-white/70 text-xs">{connection.title}</p>
                    <p className="text-white/60 text-xs">{connection.mutualConnections} mutual connections</p>
                  </div>
                  <button className="bg-accent hover:bg-accent-dark text-white px-3 py-1 rounded-lg text-sm transition-colors">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-300" />
              <span>Upcoming Events</span>
            </h3>
            <div className="space-y-4">
              {sampleEvents.slice(0, 2).map((event) => (
                <div key={event.id} className="border border-white/10 bg-primary/20 rounded-lg p-4">
                  <img
                    src={event.coverImage}
                    alt={event.title}
                    className="w-full h-24 object-cover rounded-lg mb-3"
                  />
                  <h4 className="text-white font-medium text-sm mb-1">{event.title}</h4>
                  <p className="text-white/70 text-xs mb-2">{event.date.toLocaleDateString()}</p>
                  <p className="text-white/60 text-xs">{event.attendeeCount} attendees</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityFeedScreen;