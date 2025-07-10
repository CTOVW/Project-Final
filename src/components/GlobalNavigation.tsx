import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Bookmark, 
  Home,
  MessageSquare,
  Search,
  Bell,
  MessageCircle,
  ChevronDown,
  User,
  Settings,
  Building2,
  PieChart,
  Briefcase,
  Eye,
  Menu,
  X,
  Lock,
  Brain,
  Network,
  Award,
  Shield
} from 'lucide-react';

interface GlobalNavigationProps {
  activeMainTab: string;
  setActiveMainTab: (tab: 'dashboard' | 'social-experience' | 'network' | 'messaging' | 'equity-trading' | 'expert-marketplace' | 'intelligence' | 'my-ventures' | 'my-services') => void;
  setInitialTradingTab?: (tab: string | null) => void;
  profileData?: {
    fullName: string;
    email: string;
    phone: string;
    linkedinProfile: string;
    country: string;
    language: string;
    currentOccupation: string;
    yearsExperience: string;
    entrepreneurialExperience: string;
    industryExpertise: string;
    marketExpertise: string;
    keySkills: string;
    company: string;
    companyLinkedin: string;
    companyType: string;
    industryFocus: string;
    origin: string;
    companySize: string;
    portfolioSize: string;
    headquarters: string;
    operatingMarkets: string;
    targetClients: string;
    keyCapabilities: string;
  };
}

function GlobalNavigation({ activeMainTab, setActiveMainTab, setInitialTradingTab, profileData = {} }: GlobalNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Calculate profile completion percentage
  const calculateProfileCompletion = () => {
    const requiredFields = [
      'fullName', 'email', 'phone', 'linkedinProfile', 'country', 
      'currentOccupation', 'yearsExperience', 'industryExpertise'
    ];
    
    let completedFields = 0;
    requiredFields.forEach(field => {
      if (profileData[field] && typeof profileData[field] === 'string' && profileData[field].trim() !== '') {
        completedFields++;
      }
    });
    
    return Math.round((completedFields / requiredFields.length) * 100);
  };
  
  // Calculate profile status based on additional fields
  const calculateProfileStatus = () => {
    const enhancementFields = [
      'entrepreneurialExperience', 'marketExpertise', 'keySkills',
      'company', 'companyLinkedin', 'industryFocus'
    ];
    
    let enhancedFields = 0;
    enhancementFields.forEach(field => {
      if (profileData[field] && typeof profileData[field] === 'string' && profileData[field].trim() !== '') {
        enhancedFields++;
      }
    });
    
    if (enhancedFields >= 5) return { label: 'Verified', color: 'bg-green-500/20 text-green-300', icon: <Shield className="h-3 w-3" /> };
    if (enhancedFields >= 3) return { label: 'Enhanced', color: 'bg-blue-500/20 text-blue-300', icon: <Award className="h-3 w-3" /> };
    return { label: 'Basic', color: 'bg-yellow-500/20 text-yellow-300', icon: <User className="h-3 w-3" /> };
  };
  
  const profileCompletionPercentage = calculateProfileCompletion();
  const profileStatus = calculateProfileStatus();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleMyInvestmentsClick = () => {
    if (setInitialTradingTab) {
      setInitialTradingTab('portfolio-summary');
      setActiveMainTab('equity-trading');
      setIsProfileDropdownOpen(false);
    }
  };

  const handleMyVenturesClick = () => {
    setActiveMainTab('my-ventures');
    setIsProfileDropdownOpen(false);
  };

  const handleMyServicesClick = () => {
    setActiveMainTab('my-services');
    setIsProfileDropdownOpen(false);
  };

  // Navigate to profile page
  const handleProfileClick = () => {
    setActiveMainTab('profile');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="bg-primary">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2" style={{ width: '120px' }}>
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-accent to-highlight p-2 rounded-lg">
                <Network className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          {/* Main Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => setActiveMainTab('social-experience')}
              className={`text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg whitespace-nowrap ${
                activeMainTab === 'social-experience' ? 'bg-secondary text-white' : ''
              }`}
            >
              Social Network
            </button>
            
            <button 
              onClick={() => setActiveMainTab('equity-trading')}
              className={`text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg whitespace-nowrap ${
                activeMainTab === 'equity-trading' ? 'bg-secondary text-white' : ''
              }`}
            >
              Equity Trading
            </button>
            
            <button 
              onClick={() => setActiveMainTab('intelligence')}
              className={`text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg whitespace-nowrap ${
                activeMainTab === 'intelligence' ? 'bg-secondary text-white' : ''
              }`}
            >
              Market Intelligence
            </button>
            
            <button 
              onClick={() => setActiveMainTab('expert-marketplace')}
              className={`text-white/80 hover:text-white transition-colors px-3 py-2 rounded-lg whitespace-nowrap ${
                activeMainTab === 'expert-marketplace' ? 'bg-secondary text-white' : ''
              }`}
            >
              Expert Marketplace
            </button>
          </div>

          {/* Right Side Icons & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Network */}
            <div className="group relative">
              <button 
                onClick={() => setActiveMainTab('network')}
                className={`relative text-white/80 hover:text-white transition-colors p-2 ${
                  activeMainTab === 'network' ? 'text-white' : ''
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs rounded-full h-2 w-2"></span>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-primary-dark text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                My Network
              </div>
            </div>

            {/* Notifications */}
            <div className="group relative">
              <button
                onClick={toggleNotifications}
                className="relative text-white/80 hover:text-white transition-colors p-2"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-primary-dark text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Notifications
              </div>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-primary rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 text-white/80 hover:bg-secondary transition-colors">
                      <p className="text-sm">New connection request from <span className="text-highlight">Ahmed Ali</span></p>
                      <p className="text-xs text-white/50">2 mins ago</p>
                    </div>
                    <div className="px-4 py-2 text-white/80 hover:bg-secondary transition-colors">
                      <p className="text-sm">Deal <span className="text-highlight">PayMENA Series A</span> closes in 7 days</p>
                      <p className="text-xs text-white/50">1 hr ago</p>
                    </div>
                    <div className="px-4 py-2 text-white/80 hover:bg-secondary transition-colors">
                      <p className="text-sm">You have 3 unread messages</p>
                      <p className="text-xs text-white/50">Yesterday</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Messaging */}
            <div className="group relative">
              <button 
                onClick={() => setActiveMainTab('messaging')}
                className={`relative text-white/80 hover:text-white transition-colors p-2 ${
                  activeMainTab === 'messaging' ? 'text-white' : ''
                }`}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
              </button>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-primary-dark text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Messaging
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="hidden lg:block">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{profileData.fullName || 'User Name'}</span>
                    <span className="text-xs text-white/60">{profileData.currentOccupation || 'Professional'}</span>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 hidden lg:block" />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-primary rounded-lg shadow-lg">
                  <div className="py-2">
                     <div className="px-4 py-3 border-b border-white/10">
                       <div className="flex items-center space-x-3">
                         <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                           <span className="text-white font-semibold">
                             {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : 'U'}
                           </span>
                         </div>
                         <div>
                           <h3 className="text-white font-semibold">{profileData.fullName || 'User Name'}</h3>
                           <p className="text-white/70 text-xs">{profileData.currentOccupation || 'Professional'}</p>
                           <div className="flex items-center space-x-2 mt-1">
                             <div className="flex items-center space-x-1">
                               {profileStatus.icon}
                               <span className={`text-xs ${profileStatus.color}`}>{profileStatus.label}</span>
                             </div>
                           </div>
                         </div>
                       </div>
                       
                       <div className="mt-3">
                         <div className="flex items-center justify-between mb-1">
                           <span className="text-white/60 text-xs">Profile Completion</span>
                           <span className="text-white/80 text-xs">{profileCompletionPercentage}%</span>
                         </div>
                         <div className="w-full bg-white/10 rounded-full h-1.5">
                           <div 
                             className={`h-1.5 rounded-full ${
                               profileCompletionPercentage < 50 ? 'bg-red-500' : 
                               profileCompletionPercentage < 80 ? 'bg-yellow-500' : 
                               'bg-green-500'
                             }`} 
                             style={{ width: `${profileCompletionPercentage}%` }}
                           ></div>
                         </div>
                       </div>
                     </div>
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-secondary transition-colors w-full text-left"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View/Edit Profile</span>
                    </button>
                    <button 
                      onClick={handleMyVenturesClick}
                      className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-secondary transition-colors w-full text-left"
                    >
                      <Building2 className="h-4 w-4" />
                      <span>My Ventures</span>
                    </button>
                    <button 
                      onClick={handleMyInvestmentsClick}
                      className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-secondary transition-colors w-full text-left"
                    >
                      <PieChart className="h-4 w-4" />
                      <span>My Investments</span>
                    </button>
                    <button 
                      onClick={handleMyServicesClick}
                      className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-secondary transition-colors w-full text-left"
                    >
                      <Briefcase className="h-4 w-4" />
                      <span>My Services</span>
                    </button>
                    <div className="border-t border-accent/20 my-2"></div>
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-secondary transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Account Settings</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 px-4 py-2 text-white/80 hover:text-white hover:bg-secondary transition-colors">
                      <Lock className="h-4 w-4" />
                      <span>Privacy Controls</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary border-t border-accent/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center space-x-2 px-3 py-2 text-white/80">
                <Search className="h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search VW"
                  className="bg-transparent border-none outline-none text-white placeholder-white/60 flex-1"
                />
              </div>
              <button 
                onClick={() => setActiveMainTab('equity-trading')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
              >
                Equity Trading
              </button>
              <button 
                onClick={() => setActiveMainTab('social-experience')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
              >
                Social Network
              </button>
              <button 
                onClick={() => setActiveMainTab('intelligence')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
              >
                Market Intelligence
              </button>
              <button 
                onClick={() => setActiveMainTab('expert-marketplace')}
                className="block w-full text-left px-3 py-2 text-white/80 hover:text-white"
              >
                Expert Marketplace
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default GlobalNavigation;