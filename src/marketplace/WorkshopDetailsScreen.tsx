import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Star, 
  MapPin, 
  Calendar,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  CreditCard,
  FileText,
  Brain
} from 'lucide-react';
import { sampleWorkshops } from '../data/expertsData';
import GlobalNavigation from '../components/GlobalNavigation';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface WorkshopDetailsScreenProps {
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  toggleAICompanion: () => void;
  workshopId: string;
  onExpertSelect: (expertId: string) => void;
  onBack: () => void;
}

function WorkshopDetailsScreen({ 
  selectedRole, 
  profileData, 
  toggleAICompanion, 
  workshopId, 
  onExpertSelect, 
  onBack 
}: WorkshopDetailsScreenProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const workshop = sampleWorkshops.find(w => w.id === workshopId);

  if (!workshop) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Workshop not found</h2>
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  const getEnrollmentPercentage = () => {
    return (workshop.capacity.currentEnrollment / workshop.capacity.maxParticipants) * 100;
  };

  const handleRegistration = () => {
    // In a real app, this would handle the registration process
    alert('Registration functionality would be implemented here');
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

            {/* Workshop Header */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
              <img
                src={workshop.coverPhoto}
                alt={workshop.workshopName}
                className="w-full h-64 object-cover"
              />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white mb-4">{workshop.workshopName}</h1>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-white font-semibold">{formatRating(workshop.rating)}</span>
                        <span className="text-white/60">({workshop.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60">
                        <MapPin className="h-4 w-4" />
                        <span>{workshop.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/60">
                        <Clock className="h-4 w-4" />
                        <span>{workshop.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-purple-300 font-semibold text-lg mb-1">
                      {getDaysUntil(workshop.date)}
                    </div>
                    <div className="text-white/60 text-sm">
                      {formatDate(workshop.date)}
                    </div>
                  </div>
                </div>
                <p className="text-white/80 text-lg leading-relaxed">{workshop.detailedDescription}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Workshop Overview */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Learning Objectives</h3>
                  <ul className="space-y-2">
                    {workshop.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Agenda */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Workshop Agenda</h3>
                  <div className="space-y-4">
                    {workshop.agenda.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg text-sm font-medium">
                          {item.time}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{item.topic}</h4>
                          <p className="text-white/70 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials & Deliverables */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {workshop.materials.map((material, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <FileText className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{material}</span>
                      </li>
                    ))}
                    {workshop.certificates && (
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">Certificate of completion</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* Prerequisites */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {workshop.prerequisites.map((prerequisite, index) => (
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
                    <p>By registering for this workshop, you agree to the following terms:</p>
                    <ul className="space-y-2 text-sm">
                      <li>• Registration must be completed at least 24 hours before the workshop</li>
                      <li>• Cancellation with full refund available up to 7 days before the workshop</li>
                      <li>• Workshop materials are for personal use only</li>
                      <li>• Attendance is required for certificate eligibility</li>
                      <li>• Recording or sharing of workshop content is prohibited</li>
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
                {/* Instructors */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Instructors</h3>
                  <div className="space-y-4">
                    {workshop.instructors.map((instructor, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img
                          src={instructor.profilePicture}
                          alt={instructor.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{instructor.name}</h4>
                          <p className="text-white/70 text-sm">{instructor.title}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-white/80 text-sm">{formatRating(instructor.rating)}</span>
                          </div>
                        </div>
                        <button 
                          onClick={() => onExpertSelect(instructor.expertId)}
                          className="text-purple-300 hover:text-purple-200 text-sm transition-colors"
                        >
                          View Profile
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Pricing</h3>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {formatCurrency(workshop.pricing.registrationFee)}
                    </div>
                    {workshop.pricing.earlyBirdDiscount && (
                      <div className="text-green-300 text-sm">
                        Save ${workshop.pricing.earlyBirdDiscount} with early bird pricing
                      </div>
                    )}
                  </div>
                  {workshop.pricing.groupPricing && (
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-3 text-center">
                      <p className="text-blue-300 text-sm">
                        {workshop.pricing.groupPricing.discountPercentage}% discount for groups of {workshop.pricing.groupPricing.minParticipants}+
                      </p>
                    </div>
                  )}
                </div>

                {/* Capacity */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Enrollment</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Enrolled</span>
                      <span className="text-white">{workshop.capacity.currentEnrollment}/{workshop.capacity.maxParticipants}</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" 
                        style={{ width: `${getEnrollmentPercentage()}%` }}
                      ></div>
                    </div>
                    <div className="text-center">
                      <span className="text-white/60 text-sm">
                        {workshop.capacity.maxParticipants - workshop.capacity.currentEnrollment} spots remaining
                      </span>
                    </div>
                  </div>
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

                {/* Registration */}
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-4">Register Now</h3>
                  <button 
                    onClick={handleRegistration}
                    disabled={!acceptedTerms || workshop.capacity.currentEnrollment >= workshop.capacity.maxParticipants}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {workshop.capacity.currentEnrollment >= workshop.capacity.maxParticipants ? 'Workshop Full' : 'Register Now'}
                  </button>
                  <p className="text-white/60 text-xs mt-2 text-center">
                    You'll receive a confirmation email with workshop details
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

export default WorkshopDetailsScreen;