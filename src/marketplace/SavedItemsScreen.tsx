import React, { useState } from 'react';
import { 
  Bookmark, 
  Star, 
  MapPin, 
  Calendar,
  Clock,
  DollarSign,
  Users,
  Trash2
} from 'lucide-react';
import { sampleSavedItems, sampleExperts, sampleServices, sampleWorkshops } from '../data/expertsData';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface SavedItemsScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
  onExpertSelect: (expertId: string) => void;
  onServiceSelect: (serviceId: string) => void;
  onWorkshopSelect: (workshopId: string) => void;
}

function SavedItemsScreen({ 
  selectedRole, 
  profileData, 
  toggleAICompanion, 
  onExpertSelect, 
  onServiceSelect, 
  onWorkshopSelect 
}: SavedItemsScreenProps) {
  const [activeTab, setActiveTab] = useState('experts');

  const savedItemTabs = [
    { id: 'experts', label: 'Experts' },
    { id: 'services', label: 'Services' },
    { id: 'workshops', label: 'Workshops' }
  ];

  const savedExperts = sampleSavedItems
    .filter(item => item.type === 'expert')
    .map(item => ({
      ...item,
      expert: sampleExperts.find(expert => expert.id === item.itemId)
    }))
    .filter(item => item.expert);

  const savedServices = sampleSavedItems
    .filter(item => item.type === 'service')
    .map(item => ({
      ...item,
      service: sampleServices.find(service => service.id === item.itemId)
    }))
    .filter(item => item.service);

  const savedWorkshops = sampleSavedItems
    .filter(item => item.type === 'workshop')
    .map(item => ({
      ...item,
      workshop: sampleWorkshops.find(workshop => workshop.id === item.itemId)
    }))
    .filter(item => item.workshop);

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatSavedDate = (date: Date) => {
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Saved today';
    if (diffDays === 1) return 'Saved yesterday';
    if (diffDays < 7) return `Saved ${diffDays} days ago`;
    if (diffDays < 30) return `Saved ${Math.floor(diffDays / 7)} weeks ago`;
    return `Saved ${Math.floor(diffDays / 30)} months ago`;
  };

  const handleRemoveItem = (itemId: string) => {
    // In a real app, this would remove the item from saved items
    console.log('Removing saved item:', itemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center space-x-3">
            <Bookmark className="h-8 w-8 text-yellow-400" />
            <span>Saved Items</span>
          </h1>
          <p className="text-white/80">Your personal collection of saved experts, services, and workshops</p>
        </div>

        {/* Saved Items Tabs */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
          <div className="border-b border-white/20">
            <div className="flex">
              {savedItemTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white border-b-2 border-purple-300'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {/* Saved Experts Tab */}
            {activeTab === 'experts' && (
              <div className="space-y-6">
                {savedExperts.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white font-semibold text-xl mb-2">No saved experts</h3>
                    <p className="text-white/70">Start saving experts you're interested in working with</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedExperts.map((item) => (
                      <div key={item.id} className="bg-white/5 rounded-lg p-6">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <img
                              src={item.expert!.profilePicture}
                              alt={item.expert!.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            {item.expert!.isOnline && (
                              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-white font-semibold text-lg">{item.expert!.name}</h3>
                                <div className="flex items-center space-x-2 mb-1">
                                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                  <span className="text-white/80 text-sm">{formatRating(item.expert!.rating)}</span>
                                  <span className="text-white/60 text-sm">({item.expert!.completedSessions} sessions)</span>
                                </div>
                                <p className="text-white/70 text-sm">{item.expert!.title}</p>
                              </div>
                              <button 
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.expert!.specialities.slice(0, 2).map((speciality, index) => (
                                <span 
                                  key={index}
                                  className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs"
                                >
                                  {speciality}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{item.expert!.location}</span>
                              </div>
                              <span>{formatSavedDate(item.savedDate)}</span>
                            </div>

                            <button 
                              onClick={() => onExpertSelect(item.expert!.id)}
                              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                            >
                              View Profile
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Saved Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                {savedServices.length === 0 ? (
                  <div className="text-center py-12">
                    <Bookmark className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white font-semibold text-xl mb-2">No saved services</h3>
                    <p className="text-white/70">Start saving services you're interested in booking</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedServices.map((item) => (
                      <div key={item.id} className="bg-white/5 rounded-lg overflow-hidden">
                        <img
                          src={item.service!.coverPhoto}
                          alt={item.service!.serviceName}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-white font-semibold text-lg mb-1">{item.service!.serviceName}</h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-white/80 text-sm">{formatRating(item.service!.rating)}</span>
                                <span className="text-white/60 text-sm">({item.service!.reviewCount} reviews)</span>
                              </div>
                              <p className="text-purple-300 text-sm">by {item.service!.expertName}</p>
                            </div>
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <p className="text-white/70 text-sm mb-3 line-clamp-2">{item.service!.shortDescription}</p>

                          <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{item.service!.duration}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                <span className="text-green-400 font-semibold">{formatCurrency(item.service!.pricing.basePrice)}</span>
                              </div>
                            </div>
                            <span>{formatSavedDate(item.savedDate)}</span>
                          </div>

                          <button 
                            onClick={() => onServiceSelect(item.service!.id)}
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                          >
                            View Service
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Saved Workshops Tab */}
            {activeTab === 'workshops' && (
              <div className="space-y-6">
                {savedWorkshops.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
                    <h3 className="text-white font-semibold text-xl mb-2">No saved workshops</h3>
                    <p className="text-white/70">Start saving workshops you're interested in attending</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {savedWorkshops.map((item) => (
                      <div key={item.id} className="bg-white/5 rounded-lg overflow-hidden">
                        <img
                          src={item.workshop!.coverPhoto}
                          alt={item.workshop!.workshopName}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="text-white font-semibold text-lg mb-1">{item.workshop!.workshopName}</h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-white/80 text-sm">{formatRating(item.workshop!.rating)}</span>
                                <span className="text-white/60 text-sm">({item.workshop!.reviewCount} reviews)</span>
                              </div>
                            </div>
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <p className="text-white/70 text-sm mb-3 line-clamp-2">{item.workshop!.shortDescription}</p>

                          <div className="flex items-center space-x-4 text-sm text-white/60 mb-3">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(item.workshop!.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{item.workshop!.duration}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                <span className="text-green-400 font-semibold">{formatCurrency(item.workshop!.pricing.registrationFee)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>{item.workshop!.capacity.currentEnrollment}/{item.workshop!.capacity.maxParticipants}</span>
                              </div>
                            </div>
                            <span>{formatSavedDate(item.savedDate)}</span>
                          </div>

                          <button 
                            onClick={() => onWorkshopSelect(item.workshop!.id)}
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                          >
                            View Workshop
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedItemsScreen;