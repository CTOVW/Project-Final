import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Star, 
  MapPin, 
  Clock,
  Users,
  Award,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Calendar,
  Brain
} from 'lucide-react';
import { sampleExperts, sampleServices, sampleWorkshops, sampleTestimonials } from '../data/expertsData';
import GlobalNavigation from '../components/GlobalNavigation';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface ExpertProfileScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
  expertId: string;
  onServiceSelect: (serviceId: string) => void;
  onWorkshopSelect: (workshopId: string) => void;
  onBack: () => void;
}

function ExpertProfileScreen({ 
  selectedRole, 
  profileData, 
  toggleAICompanion, 
  expertId, 
  onServiceSelect, 
  onWorkshopSelect, 
  onBack 
}: ExpertProfileScreenProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const expert = sampleExperts.find(e => e.id === expertId);
  const expertServices = sampleServices.filter(s => s.expertId === expertId);
  const expertWorkshops = sampleWorkshops.filter(w => 
    w.instructors.some(instructor => instructor.expertId === expertId)
  );
  const expertTestimonials = sampleTestimonials.filter(t => 
    expertServices.some(s => s.id === t.serviceId) || 
    expertWorkshops.some(w => w.id === t.serviceId)
  );

  if (!expert) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Expert not found</h2>
          <button 
            onClick={onBack}
            className="text-purple-300 hover:text-purple-200 transition-colors"
          >
            ← Back to Discovery
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'testimonials', label: 'Testimonials' }
  ];

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Global Navigation */}
      <GlobalNavigation 
        activeMainTab="expert-marketplace"
        setActiveMainTab={() => {}}
        profileData={profileData}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Main Content */}
        <div className="flex-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Discovery</span>
            </button>

            {/* Expert Header */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 mb-8">
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={expert.profilePicture}
                    alt={expert.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  {expert.isOnline && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-400 rounded-full border-4 border-slate-900"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2">{expert.name}</h1>
                  <p className="text-xl text-white/80 mb-3">{expert.title}</p>
                  <p className="text-white/70 mb-4">{expert.company}</p>
                  
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="text-white font-semibold">{formatRating(expert.rating)}</span>
                      <span className="text-white/60">({expert.completedSessions} sessions)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/60">
                      <MapPin className="h-4 w-4" />
                      <span>{expert.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/60">
                      <Clock className="h-4 w-4" />
                      <span>Responds {expert.responseTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {expert.specialities.map((speciality, index) => (
                      <span 
                        key={index}
                        className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                      >
                        {speciality}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
                      <MessageCircle className="h-5 w-5" />
                      <span>Send Message</span>
                    </button>
                    <button className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Book Consultation</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
              <div className="border-b border-white/20">
                <div className="flex">
                  {tabs.map((tab) => (
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
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Bio */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">About</h3>
                      <p className="text-white/80 leading-relaxed">{expert.shortBio}</p>
                    </div>

                    {/* Professional Background */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                        <Briefcase className="h-5 w-5 text-blue-300" />
                        <span>Professional Experience</span>
                      </h3>
                      <div className="space-y-4">
                        {expert.workExperience.map((exp, index) => (
                          <div key={index} className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-semibold">{exp.position}</h4>
                            <p className="text-white/80">{exp.company}</p>
                            <p className="text-white/60 text-sm">{exp.duration}</p>
                            <p className="text-white/70 mt-2">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5 text-green-300" />
                        <span>Education</span>
                      </h3>
                      <div className="space-y-3">
                        {expert.education.map((edu, index) => (
                          <div key={index} className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-semibold">{edu.degree}</h4>
                            <p className="text-white/80">{edu.institution}</p>
                            <p className="text-white/60 text-sm">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications & Awards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                          <Award className="h-5 w-5 text-yellow-300" />
                          <span>Certifications</span>
                        </h3>
                        <div className="space-y-2">
                          {expert.certifications.map((cert, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-3">
                              <span className="text-white/80">{cert}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Awards & Recognition</h3>
                        <div className="space-y-2">
                          {expert.awards.map((award, index) => (
                            <div key={index} className="bg-white/5 rounded-lg p-3">
                              <span className="text-white/80">{award}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Career Highlights */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Career Highlights</h3>
                      <div className="space-y-2">
                        {expert.careerHighlights.map((highlight, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-white/80">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div className="space-y-6">
                    {expertServices.length === 0 ? (
                      <div className="text-center py-12">
                        <Briefcase className="h-16 w-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-xl mb-2">No services available</h3>
                        <p className="text-white/70">This expert hasn't listed any services yet</p>
                      </div>
                    ) : (
                      expertServices.map((service) => (
                        <div key={service.id} className="bg-white/5 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={service.coverPhoto}
                              alt={service.serviceName}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="text-white font-semibold text-lg mb-2">{service.serviceName}</h4>
                              <div className="flex items-center space-x-2 mb-2">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-white/80 text-sm">{formatRating(service.rating)}</span>
                                <span className="text-white/60 text-sm">({service.reviewCount} reviews)</span>
                              </div>
                              <p className="text-white/70 text-sm mb-3">{service.shortDescription}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-white/60">
                                  <span>{service.duration}</span>
                                  <span>{service.deliveryFormat}</span>
                                  <span className="text-green-400 font-semibold">{formatCurrency(service.pricing.basePrice)}</span>
                                </div>
                                <button 
                                  onClick={() => onServiceSelect(service.id)}
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                                >
                                  View Service
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Workshops Tab */}
                {activeTab === 'workshops' && (
                  <div className="space-y-6">
                    {expertWorkshops.length === 0 ? (
                      <div className="text-center py-12">
                        <Calendar className="h-16 w-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-xl mb-2">No workshops available</h3>
                        <p className="text-white/70">This expert hasn't scheduled any workshops yet</p>
                      </div>
                    ) : (
                      expertWorkshops.map((workshop) => (
                        <div key={workshop.id} className="bg-white/5 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={workshop.coverPhoto}
                              alt={workshop.workshopName}
                              className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="text-white font-semibold text-lg mb-2">{workshop.workshopName}</h4>
                              <div className="flex items-center space-x-2 mb-2">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-white/80 text-sm">{formatRating(workshop.rating)}</span>
                                <span className="text-white/60 text-sm">({workshop.reviewCount} reviews)</span>
                              </div>
                              <p className="text-white/70 text-sm mb-3">{workshop.shortDescription}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 text-sm text-white/60">
                                  <span>{workshop.date.toLocaleDateString()}</span>
                                  <span>{workshop.duration}</span>
                                  <span>{workshop.format}</span>
                                  <span className="text-green-400 font-semibold">{formatCurrency(workshop.pricing.registrationFee)}</span>
                                </div>
                                <button 
                                  onClick={() => onWorkshopSelect(workshop.id)}
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
                                >
                                  View Workshop
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Testimonials Tab */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-6">
                    {expertTestimonials.length === 0 ? (
                      <div className="text-center py-12">
                        <Users className="h-16 w-16 text-white/40 mx-auto mb-4" />
                        <h3 className="text-white font-semibold text-xl mb-2">No testimonials yet</h3>
                        <p className="text-white/70">This expert hasn't received any testimonials yet</p>
                      </div>
                    ) : (
                      expertTestimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-white/5 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={testimonial.clientProfilePicture}
                              alt={testimonial.clientName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="text-white font-semibold">{testimonial.clientName}</h4>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-white/70 text-sm mb-2">{testimonial.clientTitle} at {testimonial.clientCompany}</p>
                              <p className="text-white/80 italic">"{testimonial.testimonialText}"</p>
                              <p className="text-white/60 text-sm mt-2">{testimonial.date.toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Companion Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleAICompanion}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
        >
          <Brain className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}

export default ExpertProfileScreen;