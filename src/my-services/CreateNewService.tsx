import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  FileText, 
  DollarSign, 
  Layers, 
  Eye, 
  CheckCircle,
  Plus,
  Trash2,
  Clock,
  MapPin,
  Tag
} from 'lucide-react';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface CreateNewServiceProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  onBack: () => void;
}

function CreateNewService({ 
  isAICompanionOpen, 
  aiCompanionWidth, 
  toggleAICompanion, 
  selectedRole, 
  profileData,
  onBack
}: CreateNewServiceProps) {
  const [activeTab, setActiveTab] = useState('service-details');
  const [serviceData, setServiceData] = useState({
    // Service Details
    name: '',
    category: '',
    shortDescription: '',
    detailedDescription: '',
    coverImage: '',
    tags: [] as string[],
    customTag: '',
    
    // Pricing & Delivery
    pricingModel: 'fixed',
    basePrice: '',
    currency: 'USD',
    packages: [
      { name: '', price: '', description: '' }
    ],
    deliveryFormat: 'online',
    duration: '',
    location: '',
    
    // Content Definition
    objectives: [''],
    deliverables: [''],
    prerequisites: [''],
    termsAndConditions: '',
    
    // Preview & Publish
    status: 'draft'
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setServiceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePackageChange = (index: number, field: string, value: string) => {
    const updatedPackages = [...serviceData.packages];
    updatedPackages[index] = {
      ...updatedPackages[index],
      [field]: value
    };
    setServiceData(prev => ({
      ...prev,
      packages: updatedPackages
    }));
  };

  const addPackage = () => {
    setServiceData(prev => ({
      ...prev,
      packages: [...prev.packages, { name: '', price: '', description: '' }]
    }));
  };

  const removePackage = (index: number) => {
    const updatedPackages = [...serviceData.packages];
    updatedPackages.splice(index, 1);
    setServiceData(prev => ({
      ...prev,
      packages: updatedPackages
    }));
  };

  const handleArrayItemChange = (field: string, index: number, value: string) => {
    const updatedArray = [...(serviceData[field as keyof typeof serviceData] as string[])];
    updatedArray[index] = value;
    setServiceData(prev => ({
      ...prev,
      [field]: updatedArray
    }));
  };

  const addArrayItem = (field: string) => {
    const updatedArray = [...(serviceData[field as keyof typeof serviceData] as string[]), ''];
    setServiceData(prev => ({
      ...prev,
      [field]: updatedArray
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    const updatedArray = [...(serviceData[field as keyof typeof serviceData] as string[])];
    updatedArray.splice(index, 1);
    setServiceData(prev => ({
      ...prev,
      [field]: updatedArray
    }));
  };

  const addTag = () => {
    if (serviceData.customTag.trim() && !serviceData.tags.includes(serviceData.customTag.trim())) {
      setServiceData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.customTag.trim()],
        customTag: ''
      }));
    }
  };

  const removeTag = (tag: string) => {
    setServiceData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const tabs = [
    { id: 'service-details', label: 'Service details' },
    { id: 'pricing-delivery', label: 'Pricing & delivery' },
    { id: 'content-definition', label: 'Content definition' },
    { id: 'preview-publish', label: 'Preview & publish' }
  ];

  const categoryOptions = [
    'Consulting', 'Mentoring', 'Training', 'Advisory', 'Coaching', 'Strategy', 'Technical'
  ];

  const suggestedTags = [
    'Startup', 'Fintech', 'Marketing', 'Strategy', 'Growth', 'Fundraising', 
    'Product', 'Technology', 'Leadership', 'Innovation', 'Digital Transformation'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300"
        style={{ 
          marginRight: isAICompanionOpen ? `${aiCompanionWidth}px` : '0px' 
        }}
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Services</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Service</h1>
          <p className="text-white/80">Define your service offering, pricing, and delivery details</p>
        </div>

        {/* Service Creation Tabs */}
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

          <div className="p-6">
            {/* Service Details Tab */}
            {activeTab === 'service-details' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Service Title</label>
                  <input
                    type="text"
                    value={serviceData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="E.g., Strategic Business Consulting, Startup Mentoring Package"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select
                    value={serviceData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="" className="bg-slate-800">Select a category</option>
                    {categoryOptions.map((category) => (
                      <option key={category} value={category} className="bg-slate-800">{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Short Description</label>
                  <textarea
                    value={serviceData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    placeholder="A brief, compelling description of your service (1-2 sentences)"
                    rows={2}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Detailed Description</label>
                  <textarea
                    value={serviceData.detailedDescription}
                    onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
                    placeholder="A comprehensive description of your service, what it includes, and the value it provides to clients"
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Cover Image URL</label>
                  <input
                    type="text"
                    value={serviceData.coverImage}
                    onChange={(e) => handleInputChange('coverImage', e.target.value)}
                    placeholder="Enter URL for your service cover image"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {serviceData.coverImage && (
                    <div className="mt-2 relative w-full h-40 rounded-lg overflow-hidden">
                      <img 
                        src={serviceData.coverImage} 
                        alt="Cover preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {serviceData.tags.map((tag) => (
                      <div 
                        key={tag} 
                        className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                      >
                        <span>{tag}</span>
                        <button 
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-purple-300 hover:text-purple-100"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={serviceData.customTag}
                      onChange={(e) => handleInputChange('customTag', e.target.value)}
                      onKeyPress={handleTagKeyPress}
                      placeholder="Add a tag"
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button 
                      onClick={addTag}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-3">
                    <p className="text-white/70 text-sm mb-2">Suggested tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTags.filter(tag => !serviceData.tags.includes(tag)).map((tag) => (
                        <button 
                          key={tag}
                          onClick={() => setServiceData(prev => ({
                            ...prev,
                            tags: [...prev.tags, tag]
                          }))}
                          className="bg-white/10 text-white/80 hover:bg-white/20 px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing & Delivery Tab */}
            {activeTab === 'pricing-delivery' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Pricing Model</label>
                  <select
                    value={serviceData.pricingModel}
                    onChange={(e) => handleInputChange('pricingModel', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="fixed" className="bg-slate-800">Fixed Price</option>
                    <option value="hourly" className="bg-slate-800">Hourly Rate</option>
                    <option value="tiered" className="bg-slate-800">Tiered Packages</option>
                    <option value="custom" className="bg-slate-800">Custom Pricing</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Base Price</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
                      <input
                        type="text"
                        value={serviceData.basePrice}
                        onChange={(e) => handleInputChange('basePrice', e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Currency</label>
                    <select
                      value={serviceData.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="USD" className="bg-slate-800">USD ($)</option>
                      <option value="EUR" className="bg-slate-800">EUR (€)</option>
                      <option value="GBP" className="bg-slate-800">GBP (£)</option>
                      <option value="AED" className="bg-slate-800">AED (د.إ)</option>
                      <option value="SAR" className="bg-slate-800">SAR (ر.س)</option>
                    </select>
                  </div>
                </div>

                {(serviceData.pricingModel === 'tiered' || serviceData.pricingModel === 'fixed') && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-white font-medium">Package Options</label>
                      <button 
                        onClick={addPackage}
                        className="text-purple-300 hover:text-purple-200 transition-colors flex items-center space-x-1"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Package</span>
                      </button>
                    </div>
                    <div className="space-y-4">
                      {serviceData.packages.map((pkg, index) => (
                        <div key={index} className="bg-white/5 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-medium">Package {index + 1}</h3>
                            {serviceData.packages.length > 1 && (
                              <button 
                                onClick={() => removePackage(index)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-white/70 text-sm mb-1">Package Name</label>
                              <input
                                type="text"
                                value={pkg.name}
                                onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                                placeholder="E.g., Basic, Standard, Premium"
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                            <div>
                              <label className="block text-white/70 text-sm mb-1">Price</label>
                              <div className="relative">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
                                <input
                                  type="text"
                                  value={pkg.price}
                                  onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                                  placeholder="0.00"
                                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-white/70 text-sm mb-1">Description</label>
                              <textarea
                                value={pkg.description}
                                onChange={(e) => handlePackageChange(index, 'description', e.target.value)}
                                placeholder="What's included in this package"
                                rows={2}
                                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-white font-medium mb-2">Delivery Format</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['online', 'in-person', 'hybrid'].map((format) => (
                      <button
                        key={format}
                        onClick={() => handleInputChange('deliveryFormat', format)}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          serviceData.deliveryFormat === format
                            ? 'bg-purple-500/20 border-purple-300 text-white'
                            : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {format.charAt(0).toUpperCase() + format.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Duration</label>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-white/60" />
                      <input
                        type="text"
                        value={serviceData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="E.g., 60 minutes, 2 weeks, 3 months"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  
                  {(serviceData.deliveryFormat === 'in-person' || serviceData.deliveryFormat === 'hybrid') && (
                    <div>
                      <label className="block text-white font-medium mb-2">Location</label>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-white/60" />
                        <input
                          type="text"
                          value={serviceData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="E.g., Dubai, UAE or Client's location"
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content Definition Tab */}
            {activeTab === 'content-definition' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-medium">Service Objectives</label>
                    <button 
                      onClick={() => addArrayItem('objectives')}
                      className="text-purple-300 hover:text-purple-200 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Objective</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {serviceData.objectives.map((objective, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={objective}
                          onChange={(e) => handleArrayItemChange('objectives', index, e.target.value)}
                          placeholder={`Objective ${index + 1}`}
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {serviceData.objectives.length > 1 && (
                          <button 
                            onClick={() => removeArrayItem('objectives', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-white/60 text-xs mt-2">What will clients achieve or learn from this service?</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-medium">Deliverables</label>
                    <button 
                      onClick={() => addArrayItem('deliverables')}
                      className="text-purple-300 hover:text-purple-200 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Deliverable</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {serviceData.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={deliverable}
                          onChange={(e) => handleArrayItemChange('deliverables', index, e.target.value)}
                          placeholder={`Deliverable ${index + 1}`}
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {serviceData.deliverables.length > 1 && (
                          <button 
                            onClick={() => removeArrayItem('deliverables', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-white/60 text-xs mt-2">What tangible items or outcomes will clients receive?</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-medium">Prerequisites</label>
                    <button 
                      onClick={() => addArrayItem('prerequisites')}
                      className="text-purple-300 hover:text-purple-200 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Prerequisite</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {serviceData.prerequisites.map((prerequisite, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={prerequisite}
                          onChange={(e) => handleArrayItemChange('prerequisites', index, e.target.value)}
                          placeholder={`Prerequisite ${index + 1}`}
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {serviceData.prerequisites.length > 1 && (
                          <button 
                            onClick={() => removeArrayItem('prerequisites', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-white/60 text-xs mt-2">What do clients need to have or prepare before starting?</p>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Terms and Conditions</label>
                  <textarea
                    value={serviceData.termsAndConditions}
                    onChange={(e) => handleInputChange('termsAndConditions', e.target.value)}
                    placeholder="Specify your service terms, cancellation policy, refund policy, etc."
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            )}

            {/* Preview & Publish Tab */}
            {activeTab === 'preview-publish' && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-purple-300" />
                    <span>Service Preview</span>
                  </h2>
                  
                  {serviceData.name ? (
                    <div className="space-y-4">
                      {serviceData.coverImage && (
                        <div className="w-full h-48 rounded-lg overflow-hidden">
                          <img 
                            src={serviceData.coverImage} 
                            alt="Service cover" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2';
                            }}
                          />
                        </div>
                      )}
                      
                      <div>
                        <h3 className="text-white font-semibold text-xl mb-1">{serviceData.name}</h3>
                        {serviceData.category && (
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                            {serviceData.category}
                          </span>
                        )}
                      </div>
                      
                      {serviceData.shortDescription && (
                        <p className="text-white/80">{serviceData.shortDescription}</p>
                      )}
                      
                      {serviceData.detailedDescription && (
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">About This Service</h4>
                          <p className="text-white/70 text-sm">{serviceData.detailedDescription}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {serviceData.objectives.filter(o => o.trim()).length > 0 && (
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Service Objectives</h4>
                            <ul className="space-y-1">
                              {serviceData.objectives.filter(o => o.trim()).map((objective, index) => (
                                <li key={index} className="flex items-start space-x-2 text-white/70 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span>{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {serviceData.deliverables.filter(d => d.trim()).length > 0 && (
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">What You'll Get</h4>
                            <ul className="space-y-1">
                              {serviceData.deliverables.filter(d => d.trim()).map((deliverable, index) => (
                                <li key={index} className="flex items-start space-x-2 text-white/70 text-sm">
                                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                  <span>{deliverable}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      {serviceData.pricingModel === 'tiered' && serviceData.packages.some(p => p.name && p.price) && (
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-3">Pricing Options</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {serviceData.packages.filter(p => p.name && p.price).map((pkg, index) => (
                              <div key={index} className="bg-white/10 rounded-lg p-3 border border-white/20">
                                <h5 className="text-white font-medium mb-1">{pkg.name}</h5>
                                <div className="text-white text-lg font-semibold mb-2">${pkg.price}</div>
                                <p className="text-white/70 text-sm">{pkg.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {serviceData.pricingModel !== 'tiered' && serviceData.basePrice && (
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">Pricing</h4>
                          <div className="text-white text-xl font-semibold">${serviceData.basePrice}</div>
                          <p className="text-white/70 text-sm">
                            {serviceData.pricingModel === 'fixed' ? 'Fixed price' : 
                             serviceData.pricingModel === 'hourly' ? 'Per hour' : 'Custom pricing'}
                          </p>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-white/70">
                        {serviceData.deliveryFormat && (
                          <div className="flex items-center space-x-1">
                            {serviceData.deliveryFormat === 'online' ? (
                              <span>Online</span>
                            ) : serviceData.deliveryFormat === 'in-person' ? (
                              <span>In-person</span>
                            ) : (
                              <span>Hybrid</span>
                            )}
                          </div>
                        )}
                        
                        {serviceData.duration && (
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{serviceData.duration}</span>
                          </div>
                        )}
                        
                        {serviceData.location && (
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{serviceData.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {serviceData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {serviceData.tags.map((tag) => (
                            <div key={tag} className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs flex items-center space-x-1">
                              <Tag className="h-3 w-3" />
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Eye className="h-16 w-16 text-white/40 mx-auto mb-4" />
                      <h3 className="text-white font-semibold text-lg mb-2">No preview available</h3>
                      <p className="text-white/70">Complete the service details to see a preview</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-white/5 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Publish Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Service Status</label>
                      <select
                        value={serviceData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="draft" className="bg-slate-800">Draft - Save but don't publish yet</option>
                        <option value="active" className="bg-slate-800">Active - Publish and make available to clients</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex-1 bg-white/10 text-white border border-white/20 px-4 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                        <Save className="h-5 w-5" />
                        <span>Save as Draft</span>
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
                        <CheckCircle className="h-5 w-5" />
                        <span>Publish Service</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
              if (currentIndex > 0) {
                setActiveTab(tabs[currentIndex - 1].id);
              }
            }}
            className={`text-white/60 hover:text-white transition-colors ${activeTab === tabs[0].id ? 'invisible' : ''}`}
          >
            Previous: {tabs.find((tab, index) => index === tabs.findIndex(t => t.id === activeTab) - 1)?.label}
          </button>
          
          {activeTab !== tabs[tabs.length - 1].id && (
            <button
              onClick={() => {
                const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
                if (currentIndex < tabs.length - 1) {
                  setActiveTab(tabs[currentIndex + 1].id);
                }
              }}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
            >
              Continue to {tabs.find((tab, index) => index === tabs.findIndex(t => t.id === activeTab) + 1)?.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateNewService;