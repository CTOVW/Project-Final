import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock,
  Users,
  CheckCircle
} from 'lucide-react';
import { sampleExperts } from '../data/expertsData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface ExpertDiscoveryScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
  onExpertSelect: (expertId: string) => void;
}

function ExpertDiscoveryScreen({ selectedRole, profileData, toggleAICompanion, onExpertSelect }: ExpertDiscoveryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('recommended');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [specialityFilter, setSpecialityFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const filterTabs = [
    { id: 'recommended', label: 'Recommended Experts' },
    { id: 'trending', label: 'Trending Experts' },
    { id: 'new', label: 'New Experts' },
    { id: 'co-founders', label: 'Co-founders' },
    { id: 'all', label: 'All Experts' }
  ];

  const industryOptions = [
    { id: 'all', label: 'All Industries' },
    { id: 'fintech', label: 'Fintech' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'edtech', label: 'EdTech' },
    { id: 'proptech', label: 'PropTech' }
  ];

  const specialityOptions = [
    { id: 'all', label: 'All Specialities' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'fundraising', label: 'Fundraising' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'technology', label: 'Technology' },
    { id: 'operations', label: 'Operations' }
  ];

  const locationOptions = [
    { id: 'all', label: 'All Locations' },
    { id: 'uae', label: 'UAE' },
    { id: 'saudi', label: 'Saudi Arabia' },
    { id: 'egypt', label: 'Egypt' },
    { id: 'jordan', label: 'Jordan' }
  ];

  const sortOptions = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'joining-date', label: 'Joining Date' },
    { id: 'rating', label: 'Rating' },
    { id: 'first-name', label: 'First Name' }
  ];

  const filteredExperts = sampleExperts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expert.specialities.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Experts Discovery</h1>
          <p className="text-white/80">Explore the marketplace for top industry mentors</p>
        </div>

        {/* Search Bar */}
        <div className="bg-secondary backdrop-blur-sm border border-accent/20 rounded-xl p-6 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Experts"
              className="w-full bg-primary border border-accent/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-accent text-white'
                    : 'bg-primary text-white/70 hover:text-white hover:bg-primary-light'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Industry</label>
              <select
                value={industryFilter}
                onChange={(e) => setIndustryFilter(e.target.value)}
                className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-highlight"
              >
                {industryOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-primary-dark">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Speciality</label>
              <select
                value={specialityFilter}
                onChange={(e) => setSpecialityFilter(e.target.value)}
                className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-highlight"
              >
                {specialityOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-primary-dark">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Location</label>
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-highlight"
              >
                {locationOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-primary-dark">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white/70 text-sm mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-primary border border-accent/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-highlight"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-primary-dark">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperts.map((expert) => (
            <div key={expert.id} className="bg-secondary backdrop-blur-sm border border-accent/20 rounded-xl p-6 hover:bg-secondary-light transition-all duration-300">
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <img
                    src={expert.profilePicture}
                    alt={expert.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {expert.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-highlight rounded-full border-2 border-secondary"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg">{expert.name}</h3>
                  <div className="flex items-center space-x-2 mb-1">
                    <Star className="h-4 w-4 text-highlight fill-current" />
                    <span className="text-white/80 text-sm">{formatRating(expert.rating)}</span>
                    <span className="text-white/60 text-sm">({expert.completedSessions} sessions)</span>
                  </div>
                  <p className="text-white/70 text-sm">{expert.title}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  {expert.specialities.slice(0, 3).map((speciality, index) => (
                    <span 
                      key={index}
                      className="bg-accent/20 text-accent px-2 py-1 rounded text-xs"
                    >
                      {speciality}
                    </span>
                  ))}
                </div>
                <p className="text-white/70 text-sm line-clamp-2">{expert.shortBio}</p>
              </div>

              <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{expert.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{expert.responseTime}</span>
                </div>
              </div>

              <button 
                onClick={() => onExpertSelect(expert.id)}
                className="w-full bg-gradient-to-r from-accent to-highlight text-white px-4 py-2 rounded-lg font-medium hover:from-accent-dark hover:to-highlight-dark transition-all duration-300"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>

        {filteredExperts.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-xl mb-2">No experts found</h3>
            <p className="text-white/70">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpertDiscoveryScreen;