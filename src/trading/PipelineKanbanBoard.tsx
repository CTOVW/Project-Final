import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  ChevronRight,
  Clock,
  Users,
  Calendar,
  AlertCircle,
  DollarSign,
  Building2,
  MapPin,
  BarChart3
} from 'lucide-react';
import { PipelineDeal } from '../data/myInvestmentsData';

interface PipelineKanbanBoardProps {
  isAICompanionOpen: boolean;
  aiCompanionWidth: number;
  onDealSelect: (dealId: string) => void;
  selectedDealId: string | null;
  filteredStages: {
    id: string;
    name: string;
    count: number;
    deals: PipelineDeal[];
  }[];
}

function PipelineKanbanBoard({
  isAICompanionOpen,
  aiCompanionWidth,
  onDealSelect,
  selectedDealId,
  filteredStages
}: PipelineKanbanBoardProps) {
  // Handle drag end
  const onDragEnd = (result: any) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }
    
    // For now, we're just implementing the UI without actual state updates
    // In a real app, you would update the deal's stage here
    console.log('Moved deal from', result.source, 'to', result.destination);
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount.toFixed(0)}`;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex h-[calc(100vh-22rem)] overflow-x-auto pb-6 gap-6">
        {filteredStages.map((stage) => (
          <div 
            key={stage.id} 
            className="flex-shrink-0 w-80 flex flex-col bg-white/5 rounded-xl overflow-hidden shadow-lg"
          >
            {/* Stage Header */}
            <div className="p-4 bg-white/10 border-b border-white/20">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  {stage.name}
                </h3>
                <div className="bg-white/10 text-white px-2 py-1 rounded-full text-sm font-medium">
                  {stage.deals.length}
                </div>
              </div>
            </div>
            
            {/* Stage Deals */}
            <Droppable droppableId={stage.id}>
              {(provided) => (
                <div 
                  className="flex-1 overflow-y-auto p-3 space-y-3"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {stage.deals.length === 0 ? (
                    <div className="text-center py-8 bg-white/5 rounded-lg border border-dashed border-white/20">
                      <p className="text-white/50">No deals in this stage</p>
                    </div>
                  ) : (
                    stage.deals.map((deal, index) => (
                      <Draggable key={deal.id} draggableId={deal.id} index={index}>
                        {(provided, snapshot) => (
                          <div 
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white/10 rounded-lg p-4 hover:bg-white/15 transition-all duration-300 cursor-pointer border ${
                              selectedDealId === deal.id ? 'border-purple-300' : 'border-transparent'
                            } ${snapshot.isDragging ? 'shadow-xl opacity-90 scale-105' : ''}`}
                            onClick={() => onDealSelect(deal.id)}
                          >
                            <div className="flex items-start space-x-3 mb-3">
                              <img
                                src={deal.logo}
                                alt={deal.ventureName}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-sm truncate">{deal.ventureName}</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="flex items-center space-x-1 text-white/60 text-xs">
                                    <Building2 className="h-3 w-3" />
                                    <span className="truncate">{deal.industry}</span>
                                  </div>
                                  <div className="flex items-center space-x-1 text-white/60 text-xs">
                                    <BarChart3 className="h-3 w-3" />
                                    <span>{deal.stage}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-1 text-white/70 text-xs">
                                <DollarSign className="h-3 w-3" />
                                <span>{formatCurrency(deal.amount)}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded-full text-xs ${
                                deal.status === 'New' ? 'bg-green-500/20 text-green-300' :
                                deal.status === 'In Review' ? 'bg-blue-500/20 text-blue-300' :
                                deal.status === 'Active' ? 'bg-purple-500/20 text-purple-300' :
                                deal.status === 'Negotiating' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-red-500/20 text-red-300'
                              }`}>
                                {deal.status}
                              </span>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <div className="text-white/60">Progress</div>
                                <div className="text-white/80">{deal.progress}%</div>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-1.5">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full" 
                                  style={{ width: `${deal.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-white/60">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{formatTimeAgo(deal.lastActivity)}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>{deal.assignedTo.join(', ')}</span>
                              </div>
                            </div>
                            
                            {deal.dueDate && (
                              <div className="mt-2 flex items-center space-x-1 text-xs text-white/60 bg-white/5 p-1 rounded">
                                <Calendar className="h-3 w-3 text-yellow-300" />
                                <span>Due: {formatDate(deal.dueDate)}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            
            {/* Add Deal Button */}
            <div className="p-3 border-t border-white/20">
              <button className="w-full bg-white/10 hover:bg-white/15 text-white/70 hover:text-white text-sm py-2 rounded-lg transition-colors flex items-center justify-center space-x-1">
                <span>+</span>
                <span>Add Deal</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

export default PipelineKanbanBoard;