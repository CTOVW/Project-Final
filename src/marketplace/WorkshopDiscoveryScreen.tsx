import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Calendar,
  Clock,
  DollarSign,
  Users,
  Tag
} from 'lucide-react';
import { sampleWorkshops } from '../data/expertsData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface WorkshopDiscoveryScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
  onWorkshopSelect: (workshopId: string) => void;
  onExpertSelect: (expertId: string) => void;
}

function WorkshopDiscoveryScreen({ selectedRole, profileData, toggleAICompanion, onWorkshopSelect, onExpertSelect }: WorkshopDiscoveryScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('recommended');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [specialityFilter, setSpecialityFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  const filterTabs = [
    { id: 'recommended', label: 'Recommended Workshops' },
    { id: 'trending', label: 'Trending Workshops' },
    { id: 'upcoming', label: 'Upcoming Workshops' },
    { id: 'popular', label: 'Popular Workshops' },
    { id: 'all', label: 'All Workshops' }
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
    { id: 'date', label: 'Date' },
    { id: 'rating', label: 'Rating' },
    { id: 'price', label: 'Price' }
  ];

  const filteredWorkshops = sampleWorkshops.filter(workshop => {
    const matchesSearch = workshop.workshopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workshop.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workshop.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays > 0) return `${diffDays} days`;
    return 'Past';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Workshops Discovery</h1>
          <p className="text-white/80">Join expert-led workshops to accelerate your learning</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Workshops"
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/70 hover:text-white hover:bg-white/20'
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
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {industryOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
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
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {specialityOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
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
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {locationOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
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
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id} className="bg-slate-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWorkshops.map((workshop) => (
            <div key={workshop.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300">
              <img
                src={workshop.coverPhoto}
                alt={workshop.workshopName}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg mb-2">{workshop.workshopName}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white/80 text-sm">{formatRating(workshop.rating)}</span>
                      <span className="text-white/60 text-sm">({workshop.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-300 font-semibold text-sm">
                      {getDaysUntil(workshop.date)}
                    </div>
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-2">{workshop.shortDescription}</p>

                <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(workshop.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{workshop.duration}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-sm text-white/60 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{workshop.location}</span>
                  <span className="text-white/40">•</span>
                  <span>{workshop.format}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {workshop.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs flex items-center space-x-1"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{workshop.capacity.currentEnrollment}/{workshop.capacity.maxParticipants} enrolled</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-green-400" />
                    <span className="text-white font-semibold">{formatCurrency(workshop.pricing.registrationFee)}</span>
                    {workshop.pricing.earlyBirdDiscount && (
                      <span className="text-green-300 text-sm">(-${workshop.pricing.earlyBirdDiscount} early bird)</span>
                    )}
                  </div>
                  <button 
                    onClick={() => onWorkshopSelect(workshop.id)}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                  >
                    View Workshop
                  </button>
                </div>

                {/* Instructors */}
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex items-center space-x-2">
                    <span className="text-white/60 text-sm">Instructors:</span>
                    <div className="flex items-center space-x-2">
                      {workshop.instructors.map((instructor, index) => (
                        <button
                          key={index}
                          onClick={() => onExpertSelect(instructor.expertId)}
                          className="flex items-center space-x-2 text-purple-300 hover:text-purple-200 text-sm transition-colors"
                        >
                          <img
                            src={instructor.profilePicture}
                            alt={instructor.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span>{instructor.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredWorkshops.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-xl mb-2">No workshops found</h3>
            <p className="text-white/70">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WorkshopDiscoveryScreen;