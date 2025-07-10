import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Users, 
  MapPin, 
  Share,
  Clock,
  TrendingUp
} from 'lucide-react';
import { sampleEvents } from '../../data/socialData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface EventsScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
}

function EventsScreen({ selectedRole, profileData, toggleAICompanion }: EventsScreenProps) {
  const [activeFilter, setActiveFilter] = useState('recommended');

  const eventFilters = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'trending', label: 'Trending' },
    { id: 'all', label: 'All Events' }
  ];

  const userEvents = sampleEvents.filter(event => event.isAttending);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getDaysUntilEvent = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 0) return `${diffDays} days`;
    return 'Past event';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
          <p className="text-white/80">Discover networking opportunities and industry events</p>
        </div>
        <button className="bg-gradient-to-r from-accent to-highlight text-white px-6 py-3 rounded-lg font-semibold hover:from-accent-dark hover:to-highlight-dark transition-all duration-300 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Create Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Your Events */}
          {userEvents.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-highlight" />
                <span>Your Events</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {userEvents.map((event) => (
                  <div key={event.id} className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-purple-300 text-sm font-medium">
                          {getDaysUntilEvent(event.date)}
                        </div>
                        <span className="bg-highlight/20 text-highlight px-2 py-1 rounded-full text-xs">
                          Attending
                        </span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">{event.title}</h3>
                      <div className="flex items-center space-x-2 text-white/70 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Event Filters */}
          <div className="flex space-x-2 mb-6">
            {eventFilters.map((filter) => (
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

          {/* Events List */}
          <div className="space-y-6">
            {sampleEvents.map((event) => (
              <div key={event.id} className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-primary/40 transition-all duration-300 shadow-lg">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-purple-300 text-sm font-medium mb-1">
                          {getDaysUntilEvent(event.date)}
                        </div>
                        <h3 className="text-white font-semibold text-xl mb-2">{event.title}</h3>
                        <p className="text-white/70 text-sm mb-3">{event.description}</p>
                      </div>
                      {event.isAttending && (
                        <span className="bg-highlight/20 text-highlight px-3 py-1 rounded-full text-sm">
                          Attending
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-white/70 text-sm">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/70 text-sm">
                        <Users className="h-4 w-4" />
                        <span>{formatNumber(event.attendeeCount)} attendees</span>
                        {event.networkAttendees > 0 && (
                          <span className="text-blue-300">• {event.networkAttendees} from your network</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                        event.isAttending
                          ? 'bg-highlight/20 text-highlight border border-highlight/30'
                          : 'bg-gradient-to-r from-accent to-highlight text-white hover:from-accent-dark hover:to-highlight-dark'
                      }`}>
                        {event.isAttending ? 'Attending' : 'Attend Event'}
                      </button>
                      <button className="flex items-center space-x-2 text-white/70 hover:text-white hover:bg-primary/40 px-4 py-2 rounded-lg transition-colors">
                        <Share className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Event Categories */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-300" />
              <span>Popular Categories</span>
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Networking', count: 24 },
                { name: 'Pitch Events', count: 18 },
                { name: 'Workshops', count: 15 },
                { name: 'Conferences', count: 12 },
                { name: 'Webinars', count: 9 }
              ].map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <span className="text-white/80">{category.name}</span>
                  <span className="text-white/60 text-sm">{category.count} events</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming This Week */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-300" />
              <span>This Week</span>
            </h3>
            <div className="space-y-4">
              {sampleEvents.slice(0, 3).map((event) => (
                <div key={event.id} className="border border-white/10 bg-primary/20 rounded-lg p-3">
                  <h4 className="text-white font-medium text-sm mb-1">{event.title}</h4>
                  <p className="text-white/70 text-xs mb-2">{formatDate(event.date)}</p>
                  <p className="text-white/60 text-xs">{event.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Event Stats */}
          <div className="bg-primary/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-white font-semibold mb-4">Event Insights</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">156</div>
                <div className="text-white/70 text-sm">Total Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12K+</div>
                <div className="text-white/70 text-sm">Total Attendees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">89%</div>
                <div className="text-white/70 text-sm">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsScreen;