import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Star, 
  MapPin, 
  Clock,
  DollarSign,
  CheckCircle,
  Calendar,
  CreditCard,
  FileText,
  Brain
} from 'lucide-react';
import { sampleServices, sampleExperts } from '../data/expertsData';
import GlobalNavigation from '../components/GlobalNavigation';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface ServiceDetailsScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
  serviceId: string;
  onExpertSelect: (expertId: string) => void;
  onBack: () => void;
}

function ServiceDetailsScreen({ 
  selectedRole, 
  profileData, 
  toggleAICompanion, 
  serviceId, 
  onExpertSelect, 
  onBack 
}: ServiceDetailsScreenProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const service = sampleServices.find(s => s.id === serviceId);
  const expert = service ? sampleExperts.find(e => e.id === service.expertId) : null;

  if (!service || !expert) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Service not found</h2>
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

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`;
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const handleBooking = () => {
    // In a real app, this would handle the booking process
    alert('Booking functionality would be implemented here');
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <button 
              onClick={onBack}
              className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Discovery</span>
            </button>

            {/* Service Header */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
              <img
                src={service.coverPhoto}
                alt={service.serviceName}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <h1 className="text-3xl font-bold text-white mb-4">{service.serviceName}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{formatRating(service.rating)}</span>
                    <span className="text-white/60">({service.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/60">
                    <MapPin className="h-4 w-4" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/60">
                    <Clock className="h-4 w-4" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                <p className="text-white/80 text-lg leading-relaxed">{service.detailedDescription}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Service Overview */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Service Overview</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Objectives</h4>
                      <ul className="space-y-1">
                        {service.objectives.map((objective, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-white/80">{objective}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Methodology</h4>
                      <p className="text-white/80">{service.methodology}</p>
                    </div>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">What You'll Receive</h3>
                  <ul className="space-y-2">
                    {service.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <FileText className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prerequisites */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {service.prerequisites.map((prerequisite, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-white/80">{prerequisite}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Terms and Conditions</h3>
                  <div className="space-y-4 text-white/80">
                    <p>By booking this service, you agree to the following terms:</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Service delivery will begin within 5 business days of booking confirmation</li>
                      <li>• Cancellation must be made at least 48 hours before the scheduled start time</li>
                      <li>• Refunds are available within the first week if not satisfied</li>
                      <li>• All materials and deliverables remain confidential</li>
                      <li>• Payment is due upon booking confirmation</li>
                    </ul>
                    <div className="flex items-center space-x-2 mt-4">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500"
                      />
                      <label htmlFor="terms" className="text-white/80 text-sm">
                        I accept the terms and conditions
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Expert Profile */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Expert Profile</h3>
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={expert.profilePicture}
                      alt={expert.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{expert.name}</h4>
                      <p className="text-white/70 text-sm">{expert.title}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white/80 text-sm">{formatRating(expert.rating)}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => onExpertSelect(expert.id)}
                    className="w-full bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                  >
                    View Expert Profile
                  </button>
                </div>

                {/* Pricing */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Pricing Options</h3>
                  {service.pricing.packageOptions ? (
                    <div className="space-y-3">
                      {service.pricing.packageOptions.map((pkg, index) => (
                        <div 
                          key={index}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedPackage === pkg.name
                              ? 'border-purple-300 bg-purple-500/20'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                          onClick={() => setSelectedPackage(pkg.name)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-semibold">{pkg.name}</h4>
                            <span className="text-green-400 font-bold">{formatCurrency(pkg.price)}</span>
                          </div>
                          <p className="text-white/70 text-sm">{pkg.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {formatCurrency(service.pricing.basePrice)}
                      </div>
                      <p className="text-white/70">Base price</p>
                    </div>
                  )}
                </div>

                {/* Payment Options */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="credit-card"
                        name="payment"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <label htmlFor="credit-card" className="text-white/80 flex items-center space-x-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Credit Card</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id="bank-transfer"
                        name="payment"
                        value="bank-transfer"
                        checked={paymentMethod === 'bank-transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-purple-600"
                      />
                      <label htmlFor="bank-transfer" className="text-white/80">Bank Transfer</label>
                    </div>
                  </div>
                </div>

                {/* Booking Calendar */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Schedule Session</h3>
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/70 text-sm">Calendar integration will be available after booking</p>
                  </div>
                </div>

                {/* Booking Confirmation */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Book This Service</h3>
                  <button 
                    onClick={handleBooking}
                    disabled={!acceptedTerms}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Book Now
                  </button>
                  <p className="text-white/60 text-xs mt-2 text-center">
                    You'll receive a confirmation email with next steps
                  </p>
                </div>
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

export default ServiceDetailsScreen;