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
  Tag,
  Calendar,
  Users,
  Settings
} from 'lucide-react';

interface ProfileData {
  fullName: string;
  currentOccupation: string;
  [key: string]: string;
}

interface CreateNewWorkshopProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  toggleAICompanion: () => void;
  selectedRole: 'founder' | 'investor' | 'expert';
  profileData: ProfileData;
  onBack: () => void;
}

function CreateNewWorkshop({ 
  isAICompanionOpen, 
  aiCompanionWidth, 
  toggleAICompanion, 
  selectedRole, 
  profileData,
  onBack
}: CreateNewWorkshopProps) {
  const [activeTab, setActiveTab] = useState('workshop-details');
  const [workshopData, setWorkshopData] = useState({
    // Workshop Details
    name: '',
    category: '',
    shortDescription: '',
    detailedDescription: '',
    coverImage: '',
    tags: [] as string[],
    customTag: '',
    learningObjectives: [''],
    
    // Settings & Logistics
    date: '',
    duration: '',
    capacity: {
      maxParticipants: '',
      minParticipants: ''
    },
    deliveryFormat: 'online',
    location: '',
    pricing: {
      registrationFee: '',
      currency: 'USD',
      earlyBirdDiscount: '',
      groupDiscount: ''
    },
    
    // Content Management
    agenda: [
      { time: '', title: '', description: '' }
    ],
    materials: [''],
    prerequisites: [''],
    
    // Preview & Publish
    status: 'draft'
  });

  const handleInputChange = (field: string, value: string | string[] | any) => {
    setWorkshopData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: string) => {
    setWorkshopData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleArrayItemChange = (field: string, index: number, value: string) => {
    const updatedArray = [...(workshopData[field as keyof typeof workshopData] as string[])];
    updatedArray[index] = value;
    setWorkshopData(prev => ({
      ...prev,
      [field]: updatedArray
    }));
  };

  const addArrayItem = (field: string) => {
    const updatedArray = [...(workshopData[field as keyof typeof workshopData] as string[]), ''];
    setWorkshopData(prev => ({
      ...prev,
      [field]: updatedArray
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    const updatedArray = [...(workshopData[field as keyof typeof workshopData] as string[])];
    updatedArray.splice(index, 1);
    setWorkshopData(prev => ({
      ...prev,
      [field]: updatedArray
    }));
  };

  const handleAgendaItemChange = (index: number, field: string, value: string) => {
    const updatedAgenda = [...workshopData.agenda];
    updatedAgenda[index] = {
      ...updatedAgenda[index],
      [field]: value
    };
    setWorkshopData(prev => ({
      ...prev,
      agenda: updatedAgenda
    }));
  };

  const addAgendaItem = () => {
    setWorkshopData(prev => ({
      ...prev,
      agenda: [...prev.agenda, { time: '', title: '', description: '' }]
    }));
  };

  const removeAgendaItem = (index: number) => {
    const updatedAgenda = [...workshopData.agenda];
    updatedAgenda.splice(index, 1);
    setWorkshopData(prev => ({
      ...prev,
      agenda: updatedAgenda
    }));
  };

  const addTag = () => {
    if (workshopData.customTag.trim() && !workshopData.tags.includes(workshopData.customTag.trim())) {
      setWorkshopData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.customTag.trim()],
        customTag: ''
      }));
    }
  };

  const removeTag = (tag: string) => {
    setWorkshopData(prev => ({
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
    { id: 'workshop-details', label: 'Workshop details form' },
    { id: 'settings-logistics', label: 'Settings & logistics' },
    { id: 'content-management', label: 'Content management' },
    { id: 'preview-publish', label: 'Preview & publish' }
  ];

  const categoryOptions = [
    'Fundraising', 'Product Development', 'Marketing', 'Strategy', 'Leadership', 
    'Technology', 'Finance', 'Operations', 'Sales', 'Innovation'
  ];

  const suggestedTags = [
    'Workshop', 'Training', 'Hands-on', 'Interactive', 'Startup', 'Fintech', 
    'Marketing', 'Strategy', 'Leadership', 'Innovation', 'Digital Transformation'
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
          <h1 className="text-3xl font-bold text-white mb-2">Create New Workshop</h1>
          <p className="text-white/80">Design an engaging workshop experience for your audience</p>
        </div>

        {/* Workshop Creation Tabs */}
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
            {/* Workshop Details Tab */}
            {activeTab === 'workshop-details' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white font-medium mb-2">Workshop Title</label>
                  <input
                    type="text"
                    value={workshopData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="E.g., Venture Capital Masterclass, Product-Market Fit Workshop"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select
                    value={workshopData.category}
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
                    value={workshopData.shortDescription}
                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                    placeholder="A brief, compelling description of your workshop (1-2 sentences)"
                    rows={2}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Detailed Description</label>
                  <textarea
                    value={workshopData.detailedDescription}
                    onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
                    placeholder="A comprehensive description of your workshop, what participants will experience, and the value they will receive"
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Cover Image URL</label>
                  <input
                    type="text"
                    value={workshopData.coverImage}
                    onChange={(e) => handleInputChange('coverImage', e.target.value)}
                    placeholder="Enter URL for your workshop cover image"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {workshopData.coverImage && (
                    <div className="mt-2 relative w-full h-40 rounded-lg overflow-hidden">
                      <img 
                        src={workshopData.coverImage} 
                        alt="Cover preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/7666429/pexels-photo-7666429.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {workshopData.tags.map((tag) => (
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
                      value={workshopData.customTag}
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
                      {suggestedTags.filter(tag => !workshopData.tags.includes(tag)).map((tag) => (
                        <button 
                          key={tag}
                          onClick={() => setWorkshopData(prev => ({
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

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-medium">Learning Objectives</label>
                    <button 
                      onClick={() => addArrayItem('learningObjectives')}
                      className="text-purple-300 hover:text-purple-200 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Objective</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {workshopData.learningObjectives.map((objective, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={objective}
                          onChange={(e) => handleArrayItemChange('learningObjectives', index, e.target.value)}
                          placeholder={`Learning objective ${index + 1}`}
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {workshopData.learningObjectives.length > 1 && (
                          <button 
                            onClick={() => removeArrayItem('learningObjectives', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-white/60 text-xs mt-2">What will participants learn or be able to do after the workshop?</p>
                </div>
              </div>
            )}

            {/* Settings & Logistics Tab */}
            {activeTab === 'settings-logistics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Workshop Date</label>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-white/60" />
                      <input
                        type="date"
                        value={workshopData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white font-medium mb-2">Duration</label>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-white/60" />
                      <input
                        type="text"
                        value={workshopData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        placeholder="E.g., 2 hours, Half day, 2 days"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Participant Capacity</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Maximum Participants</label>
                      <input
                        type="number"
                        value={workshopData.capacity.maxParticipants}
                        onChange={(e) => handleNestedInputChange('capacity', 'maxParticipants', e.target.value)}
                        placeholder="E.g., 20"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Minimum Participants</label>
                      <input
                        type="number"
                        value={workshopData.capacity.minParticipants}
                        onChange={(e) => handleNestedInputChange('capacity', 'minParticipants', e.target.value)}
                        placeholder="E.g., 5"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Delivery Format</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['online', 'in-person', 'hybrid'].map((format) => (
                      <button
                        key={format}
                        onClick={() => handleInputChange('deliveryFormat', format)}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          workshopData.deliveryFormat === format
                            ? 'bg-purple-500/20 border-purple-300 text-white'
                            : 'bg-white/5 border-white/20 text-white/80 hover:bg-white/10'
                        }`}
                      >
                        {format.charAt(0).toUpperCase() + format.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {(workshopData.deliveryFormat === 'in-person' || workshopData.deliveryFormat === 'hybrid') && (
                  <div>
                    <label className="block text-white font-medium mb-2">Location</label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-white/60" />
                      <input
                        type="text"
                        value={workshopData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="E.g., Dubai, UAE or Online via Zoom"
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-white font-medium mb-3">Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Registration Fee</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
                        <input
                          type="text"
                          value={workshopData.pricing.registrationFee}
                          onChange={(e) => handleNestedInputChange('pricing', 'registrationFee', e.target.value)}
                          placeholder="0.00"
                          className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Currency</label>
                      <select
                        value={workshopData.pricing.currency}
                        onChange={(e) => handleNestedInputChange('pricing', 'currency', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="USD" className="bg-slate-800">USD ($)</option>
                        <option value="EUR" className="bg-slate-800">EUR (€)</option>
                        <option value="GBP" className="bg-slate-800">GBP (£)</option>
                        <option value="AED" className="bg-slate-800">AED (د.إ)</option>
                        <option value="SAR" className="bg-slate-800">SAR (ر.س)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Early Bird Discount</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
                        <input
                          type="text"
                          value={workshopData.pricing.earlyBirdDiscount}
                          onChange={(e) => handleNestedInputChange('pricing', 'earlyBirdDiscount', e.target.value)}
                          placeholder="0.00 (optional)"
                          className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-1">Group Discount (per person)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60">$</span>
                        <input
                          type="text"
                          value={workshopData.pricing.groupDiscount}
                          onChange={(e) => handleNestedInputChange('pricing', 'groupDiscount', e.target.value)}
                          placeholder="0.00 (optional)"
                          className="w-full bg-white/10 border border-white/20 rounded-lg pl-8 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Content Management Tab */}
            {activeTab === 'content-management' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-medium">Workshop Agenda</label>
                    <button 
                      onClick={addAgendaItem}
                      className="text-purple-300 hover:text-purple-200 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Agenda Item</span>
                    </button>
                  </div>
                  <div className="space-y-4">
                    {workshopData.agenda.map((item, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-medium">Agenda Item {index + 1}</h3>
                          {workshopData.agenda.length > 1 && (
                            <button 
                              onClick={() => removeAgendaItem(index)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-white/70 text-sm mb-1">Time Slot</label>
                            <input
                              type="text"
                              value={item.time}
                              onChange={(e) => handleAgendaItemChange(index, 'time', e.target.value)}
                              placeholder="E.g., 9:00 - 10:30 AM"
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-white/70 text-sm mb-1">Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => handleAgendaItemChange(index, 'title', e.target.value)}
                              placeholder="E.g., Introduction to Key Concepts"
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-white/70 text-sm mb-1">Description</label>
                            <textarea
                              value={item.description}
                              onChange={(e) => handleAgendaItemChange(index, 'description', e.target.value)}
                              placeholder="Brief description of this agenda item"
                              rows={2}
                              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white font-medium">Workshop Materials</label>
                    <button 
                      onClick={() => addArrayItem('materials')}
                      className="text-purple-300 hover:text-purple-200 transition-colors flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Material</span>
                    </button>
                  </div>
                  <div className="space-y-3">
                    {workshopData.materials.map((material, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={material}
                          onChange={(e) => handleArrayItemChange('materials', index, e.target.value)}
                          placeholder={`Material ${index + 1} (e.g., Workbook, Slides, Templates)`}
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {workshopData.materials.length > 1 && (
                          <button 
                            onClick={() => removeArrayItem('materials', index)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-white/60 text-xs mt-2">What materials will participants receive?</p>
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
                    {workshopData.prerequisites.map((prerequisite, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={prerequisite}
                          onChange={(e) => handleArrayItemChange('prerequisites', index, e.target.value)}
                          placeholder={`Prerequisite ${index + 1}`}
                          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {workshopData.prerequisites.length > 1 && (
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
                  <p className="text-white/60 text-xs mt-2">What do participants need to have or know before attending?</p>
                </div>
              </div>
            )}

            {/* Preview & Publish Tab */}
            {activeTab === 'preview-publish' && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Eye className="h-5 w-5 text-purple-300" />
                    <span>Workshop Preview</span>
                  </h2>
                  
                  {workshopData.name ? (
                    <div className="space-y-4">
                      {workshopData.coverImage && (
                        <div className="w-full h-48 rounded-lg overflow-hidden">
                          <img 
                            src={workshopData.coverImage} 
                            alt="Workshop cover" 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/7666429/pexels-photo-7666429.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2';
                            }}
                          />
                        </div>
                      )}
                      
                      <div>
                        <h3 className="text-white font-semibold text-xl mb-1">{workshopData.name}</h3>
                        {workshopData.category && (
                          <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                            {workshopData.category}
                          </span>
                        )}
                      </div>
                      
                      {workshopData.shortDescription && (
                        <p className="text-white/80">{workshopData.shortDescription}</p>
                      )}
                      
                      {workshopData.detailedDescription && (
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-2">About This Workshop</h4>
                          <p className="text-white/70 text-sm">{workshopData.detailedDescription}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {workshopData.learningObjectives.filter(o => o.trim()).length > 0 && (
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Learning Objectives</h4>
                            <ul className="space-y-1">
                              {workshopData.learningObjectives.filter(o => o.trim()).map((objective, index) => (
                                <li key={index} className="flex items-start space-x-2 text-white/70 text-sm">
                                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span>{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {workshopData.materials.filter(m => m.trim()).length > 0 && (
                          <div className="bg-white/5 rounded-lg p-4">
                            <h4 className="text-white font-medium mb-2">Workshop Materials</h4>
                            <ul className="space-y-1">
                              {workshopData.materials.filter(m => m.trim()).map((material, index) => (
                                <li key={index} className="flex items-start space-x-2 text-white/70 text-sm">
                                  <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                  <span>{material}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      {workshopData.agenda.some(item => item.time && item.title) && (
                        <div className="bg-white/5 rounded-lg p-4">
                          <h4 className="text-white font-medium mb-3">Workshop Agenda</h4>
                          <div className="space-y-3">
                            {workshopData.agenda.filter(item => item.time && item.title).map((item, index) => (
                              <div key={index} className="bg-white/10 rounded-lg p-3">
                                <div className="flex items-start space-x-3">
                                  <div className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg text-sm whitespace-nowrap">
                                    {item.time}
                                  </div>
                                  <div>
                                    <h5 className="text-white font-medium">{item.title}</h5>
                                    {item.description && (
                                      <p className="text-white/70 text-sm mt-1">{item.description}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">Workshop Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {workshopData.date && (
                            <div className="flex items-center space-x-2 text-white/70 text-sm">
                              <Calendar className="h-4 w-4 text-purple-300" />
                              <span>Date: {new Date(workshopData.date).toLocaleDateString()}</span>
                            </div>
                          )}
                          
                          {workshopData.duration && (
                            <div className="flex items-center space-x-2 text-white/70 text-sm">
                              <Clock className="h-4 w-4 text-blue-300" />
                              <span>Duration: {workshopData.duration}</span>
                            </div>
                          )}
                          
                          {workshopData.location && (
                            <div className="flex items-center space-x-2 text-white/70 text-sm">
                              <MapPin className="h-4 w-4 text-red-300" />
                              <span>Location: {workshopData.location}</span>
                            </div>
                          )}
                          
                          {workshopData.deliveryFormat && (
                            <div className="flex items-center space-x-2 text-white/70 text-sm">
                              <Settings className="h-4 w-4 text-yellow-300" />
                              <span>Format: {workshopData.deliveryFormat.charAt(0).toUpperCase() + workshopData.deliveryFormat.slice(1)}</span>
                            </div>
                          )}
                          
                          {workshopData.capacity.maxParticipants && (
                            <div className="flex items-center space-x-2 text-white/70 text-sm">
                              <Users className="h-4 w-4 text-green-300" />
                              <span>Capacity: {workshopData.capacity.maxParticipants} participants</span>
                            </div>
                          )}
                          
                          {workshopData.pricing.registrationFee && (
                            <div className="flex items-center space-x-2 text-white/70 text-sm">
                              <DollarSign className="h-4 w-4 text-green-300" />
                              <span>Price: ${workshopData.pricing.registrationFee}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {workshopData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {workshopData.tags.map((tag) => (
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
                      <p className="text-white/70">Complete the workshop details to see a preview</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-white/5 rounded-lg p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Publish Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Workshop Status</label>
                      <select
                        value={workshopData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="draft" className="bg-slate-800">Draft - Save but don't publish yet</option>
                        <option value="scheduled" className="bg-slate-800">Scheduled - Publish and open for registration</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex-1 bg-white/10 text-white border border-white/20 px-4 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-2">
                        <Save className="h-5 w-5" />
                        <span>Save as Draft</span>
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>Schedule Workshop</span>
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

export default CreateNewWorkshop;