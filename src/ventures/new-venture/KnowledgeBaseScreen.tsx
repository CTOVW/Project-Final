import React, { useState } from 'react';
import { 
  Brain, 
  ArrowLeft,
  ArrowRight,
  Upload,
  FileText,
  Trash2,
  Save,
  Database,
  BarChart3
} from 'lucide-react';

interface KnowledgeBaseScreenProps {
  onNext: () => void;
  onBack: () => void;
  toggleAICompanion: () => void;
  isExistingVenture: boolean;
}

function KnowledgeBaseScreen({ 
  onNext, 
  onBack, 
  toggleAICompanion,
  isExistingVenture
}: KnowledgeBaseScreenProps) {
  const [activeTab, setActiveTab] = useState('market-data');
  const [uploadedFiles, setUploadedFiles] = useState<{id: string, name: string, type: string, size: string}[]>([]);
  const [projectCapacity, setProjectCapacity] = useState(15); // Percentage of capacity used

  const handleFileUpload = () => {
    // Simulate file upload
    const newFile = {
      id: `file-${Date.now()}`,
      name: `Document-${uploadedFiles.length + 1}.pdf`,
      type: 'PDF',
      size: '2.4 MB'
    };
    
    setUploadedFiles([...uploadedFiles, newFile]);
    setProjectCapacity(Math.min(projectCapacity + 5, 100)); // Increase capacity used
  };

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
    setProjectCapacity(Math.max(projectCapacity - 5, 0)); // Decrease capacity used
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Venture Knowledge Base
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto">
          Upload relevant documents to enhance your venture's knowledge base. This will help our AI provide more accurate and personalized guidance.
        </p>
        
        {/* AI Companion Button */}
        <div className="mt-6">
          <button 
            onClick={toggleAICompanion}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <Brain className="h-5 w-5" />
            <span>Get AI Assistance</span>
          </button>
        </div>
      </div>

      {/* Knowledge Base Tabs */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden mb-8">
        <div className="border-b border-white/20">
          <div className="flex">
            <button
              onClick={() => setActiveTab('market-data')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'market-data'
                  ? 'bg-white/10 text-white border-b-2 border-purple-300'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Market Data
            </button>
            <button
              onClick={() => setActiveTab('venture-data')}
              className={`flex-1 px-6 py-4 font-medium transition-colors ${
                activeTab === 'venture-data'
                  ? 'bg-white/10 text-white border-b-2 border-purple-300'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Venture Data
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              {activeTab === 'market-data' ? (
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-blue-300" />
                </div>
              ) : (
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Database className="h-6 w-6 text-purple-300" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  {activeTab === 'market-data' ? 'Market Data' : 'Venture Data'}
                </h2>
                <p className="text-white/80 mb-4">
                  {activeTab === 'market-data' 
                    ? 'Upload market research reports, industry analyses, competitor information, and other market-related documents.'
                    : 'Upload business plans, financial models, product specifications, legal documents, and other venture-specific materials.'}
                </p>
              </div>
            </div>

            {/* Upload Section */}
            <div className="bg-white/5 border border-white/20 rounded-xl p-6">
              <div className="text-center py-8">
                <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/70 mb-6">Drag and drop files here, or click to browse</p>
                <button 
                  onClick={handleFileUpload}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2 mx-auto"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Files</span>
                </button>
              </div>
            </div>

            {/* Project Capacity */}
            <div className="bg-white/5 border border-white/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/80">Project Capacity</span>
                <span className="text-white/80">{projectCapacity}% used</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    projectCapacity < 70 ? 'bg-green-500' :
                    projectCapacity < 90 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${projectCapacity}%` }}
                ></div>
              </div>
              <p className="text-white/60 text-xs mt-2">
                {100 - projectCapacity}% of storage capacity remaining
              </p>
            </div>

            {/* Uploaded Documents */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Uploaded Documents</h3>
                <div className="space-y-2">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="bg-white/5 border border-white/20 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-white/60" />
                        <div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-white/60 text-xs">{file.type} • {file.size}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDeleteFile(file.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Analysis Section */}
            {uploadedFiles.length > 0 && (
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Brain className="h-6 w-6 text-purple-300 mt-1" />
                  <div>
                    <h3 className="text-purple-300 font-semibold mb-2">AI Analysis</h3>
                    <p className="text-white/80 mb-4">
                      Our AI has analyzed your uploaded documents and extracted key insights to enhance your venture building process.
                    </p>
                    <button 
                      onClick={toggleAICompanion}
                      className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      View AI Insights
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </button>
        
        <div className="flex space-x-4">
          <button 
            onClick={onNext}
            className="text-white/60 hover:text-white transition-colors"
          >
            Skip for Now
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Save Draft</span>
          </button>
          <button 
            onClick={onNext}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Save & Continue</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default KnowledgeBaseScreen;