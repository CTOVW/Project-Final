import React, { useRef, useEffect } from 'react';
import { 
  Brain, 
  GripVertical, 
  Paperclip, 
  Send,
  Sparkles
} from 'lucide-react';

interface Message {
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

interface AICompanionProps {
  isOpen: boolean;
  width: number;
  selectedAgent: string;
  chatMessage: string;
  chatHistory: Message[];
  onToggle: () => void;
  onWidthChange: (width: number) => void;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  onAgentChange: (agent: string) => void;
  agentOptions: { value: string; label: string }[];
  profileData?: any;
  preferences?: any;
  selectedRole?: 'founder' | 'investor' | 'expert' | null;
  isOnboarding?: boolean;
}

function AICompanion({
  isOpen,
  width,
  selectedAgent,
  chatMessage,
  chatHistory,
  onToggle,
  onWidthChange,
  onMessageChange,
  onSendMessage,
  onAgentChange,
  agentOptions,
  profileData,
  preferences,
  selectedRole,
  isOnboarding
}: AICompanionProps) {
  const resizeRef = useRef(null);
  const isResizing = useRef(false);

  // Handle resize functionality
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth >= 300 && newWidth <= 800) {
        onWidthChange(newWidth);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isResizing.current) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [onWidthChange]);

  const handleResizeStart = () => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={onToggle}
          className="bg-gradient-to-r from-accent to-highlight text-white p-4 rounded-full shadow-lg hover:from-accent-dark hover:to-highlight-dark transition-all duration-300 transform hover:scale-110"
        >
          <Brain className="h-6 w-6" />
          {isOnboarding && (
            <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              <Sparkles className="h-3 w-3" />
            </div>
          )}
        </button>
      </div>
    );
  }

  return (
    <div 
      className="fixed right-0 top-16 h-[calc(100vh-4rem)] bg-primary border-l border-accent/20 flex flex-col z-40"
      style={{ width: `${width}px` }}
    >
      {/* Resize Handle */}
      <div
        ref={resizeRef}
        onMouseDown={handleResizeStart}
        className="absolute left-0 top-0 w-1 h-full cursor-col-resize hover:bg-highlight/50 transition-colors"
      >
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <GripVertical className="h-4 w-4 text-white/30" />
        </div>
      </div>

      {/* AI Companion Selection (5%) */}
      <div className="p-4 border-b border-accent/20" style={{ height: '5%' }}>
        <select 
          value={selectedAgent}
          onChange={(e) => {
            onAgentChange(e.target.value);
          }}
          className="w-full bg-secondary border border-accent/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-highlight"
        >
          {agentOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-secondary">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Chat History Area (80%) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-primary-dark" style={{ height: '80%' }} id="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-accent text-white' 
                : 'bg-secondary text-white border border-accent/20'
            }`}>
              <p className="text-sm">{message.message}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input Area (15%) */}
      <div className="p-4 border-t border-accent/20 bg-secondary" style={{ height: '15%' }}>
        <div className="flex items-center space-x-2">
          <button className="text-white/60 hover:text-white transition-colors">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about the venture ecosystem..."
            className="flex-1 bg-primary border border-accent/20 rounded-lg px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-highlight"
          />
          <button 
            onClick={onSendMessage}
            className="bg-highlight hover:bg-highlight-dark text-white p-2 rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AICompanion;