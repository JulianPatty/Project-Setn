import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { Play, MoreHorizontal, Trash2, ChevronDown } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface StartNodeProps {
  data: {
    label: string;
    description?: string;
  };
  selected?: boolean;
}

export const StartNode: React.FC<StartNodeProps> = ({ data, selected }) => {
  const [triggerType, setTriggerType] = useState('Run manually');

  const triggerOptions = [
    'Run manually',
    'On Webhook Call',
    'On Schedule'
  ];

  return (
    <div className={`bg-white rounded-lg border-2 shadow-sm min-w-[200px] ${
      selected ? 'border-purple-500 shadow-lg' : 'border-gray-200'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Play className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{data.label}</div>
            {data.description && (
              <div className="text-sm text-gray-500">{data.description}</div>
            )}
          </div>
        </div>
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-1 rounded hover:bg-gray-100 transition-colors">
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[120px]">
              <DropdownMenu.Item className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Workflow
          </label>
          
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent hover:border-gray-300 transition-colors bg-white">
                <span className="text-sm text-gray-900">{triggerType}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="bg-white rounded-lg shadow-lg border border-gray-200 p-1 min-w-[200px] z-50">
                {triggerOptions.map((option) => (
                  <DropdownMenu.Item
                    key={option}
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer focus:outline-none focus:bg-gray-50"
                    onSelect={() => setTriggerType(option)}
                  >
                    <span>{option}</span>
                    {triggerType === option && (
                      <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full" />
                    )}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className="border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Input Format (for API calls)</span>
          </div>
          <div className="text-center py-4 text-gray-500">
            <div className="text-sm">No input fields defined</div>
            <button className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
              + Add Field
            </button>
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-purple-500 border-2 border-white"
      />
    </div>
  );
};