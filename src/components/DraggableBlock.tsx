import React from 'react';
import * as LucideIcons from 'lucide-react';
import { BlockType } from '../types/workflow';

interface DraggableBlockProps {
  block: BlockType;
}

export const DraggableBlock: React.FC<DraggableBlockProps> = ({ block }) => {
  const IconComponent = (LucideIcons as any)[block.icon] || LucideIcons.Square;

  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: block.id,
      data: {
        label: block.name,
        description: block.description,
        ...block.defaultData,
      },
    }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing group"
    >
      <div className={`w-8 h-8 rounded-lg ${block.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
        <IconComponent className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-gray-900">{block.name}</div>
        <div className="text-xs text-gray-500 truncate">{block.description}</div>
      </div>
    </div>
  );
};