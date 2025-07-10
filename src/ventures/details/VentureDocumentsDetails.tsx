import React from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Trash2, 
  Upload, 
  Search, 
  Filter 
} from 'lucide-react';
import { DetailedVentureData } from '../../data/myVenturesData';

interface VentureDocumentsDetailsProps {
  venture: DetailedVentureData;
}

function VentureDocumentsDetails({ venture }: VentureDocumentsDetailsProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <FileText className="h-5 w-5 text-red-300" />;
      case 'Spreadsheet':
        return <FileText className="h-5 w-5 text-green-300" />;
      case 'Presentation':
        return <FileText className="h-5 w-5 text-blue-300" />;
      case 'Document':
        return <FileText className="h-5 w-5 text-purple-300" />;
      case 'Design File':
        return <FileText className="h-5 w-5 text-yellow-300" />;
      default:
        return <FileText className="h-5 w-5 text-white/60" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'legal':
        return 'bg-red-500/20 text-red-300';
      case 'financial':
        return 'bg-green-500/20 text-green-300';
      case 'product':
        return 'bg-blue-500/20 text-blue-300';
      case 'marketing':
        return 'bg-purple-500/20 text-purple-300';
      default:
        return 'bg-yellow-500/20 text-yellow-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Document Management Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Document Management</h2>
        <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/5 rounded-lg p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-white/60" />
          <select className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="all" className="bg-slate-800">All Categories</option>
            <option value="legal" className="bg-slate-800">Legal</option>
            <option value="financial" className="bg-slate-800">Financial</option>
            <option value="product" className="bg-slate-800">Product</option>
            <option value="marketing" className="bg-slate-800">Marketing</option>
            <option value="other" className="bg-slate-800">Other</option>
          </select>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white/5 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Uploaded Documents ({venture.uploadedDocuments.length})</h3>
        
        {venture.uploadedDocuments.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-16 w-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-white font-semibold text-lg mb-2">No documents yet</h3>
            <p className="text-white/70">Upload documents to build your venture's knowledge base</p>
          </div>
        ) : (
          <div className="space-y-4">
            {venture.uploadedDocuments.map((doc) => (
              <div key={doc.id} className="bg-white/10 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getDocumentIcon(doc.type)}
                  <div>
                    <h4 className="text-white font-medium">{doc.name}</h4>
                    <div className="flex items-center space-x-3 text-sm">
                      <span className="text-white/60">{doc.type}</span>
                      <span className="text-white/60">{formatDate(doc.dateUploaded)}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getCategoryColor(doc.category)}`}>
                        {doc.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
            <h3 className="text-white font-semibold">Legal</h3>
          </div>
          <p className="text-white/70 text-sm">
            {venture.uploadedDocuments.filter(doc => doc.category === 'legal').length} documents
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <h3 className="text-white font-semibold">Financial</h3>
          </div>
          <p className="text-white/70 text-sm">
            {venture.uploadedDocuments.filter(doc => doc.category === 'financial').length} documents
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
            <h3 className="text-white font-semibold">Product</h3>
          </div>
          <p className="text-white/70 text-sm">
            {venture.uploadedDocuments.filter(doc => doc.category === 'product').length} documents
          </p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
            <h3 className="text-white font-semibold">Marketing</h3>
          </div>
          <p className="text-white/70 text-sm">
            {venture.uploadedDocuments.filter(doc => doc.category === 'marketing').length} documents
          </p>
        </div>
      </div>

      {/* Document Storage */}
      <div className="bg-white/5 rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">Document Storage</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80">Storage Used</span>
          <span className="text-white/80">15% (45 MB of 300 MB)</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default VentureDocumentsDetails;