import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { BlockType } from '../types/workflow';
import { blockTypes, categories } from '../data/blockTypes';
import { DraggableBlock } from './DraggableBlock';

interface SecondarySidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const SecondarySidebar: React.FC<SecondarySidebarProps> = ({
  collapsed,
  onToggleCollapse,
}) => {
  const [activeTab, setActiveTab] = useState<'blocks' | 'tools'>('blocks');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredBlocks = blockTypes.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || block.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 ${
      collapsed ? 'w-14' : 'w-60'
    }`}>
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-white">
        {!collapsed && (
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('blocks')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'blocks'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Blocks
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'tools'
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tools
            </button>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <Collapsible.Root open={!collapsed}>
          <Collapsible.Content className="data-[state=closed]:animate-[collapsible-up_300ms_ease-out] data-[state=open]:animate-[collapsible-down_300ms_ease-out]">
            {activeTab === 'blocks' && (
              <div className="p-3 space-y-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search blocks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm bg-white"
                  />
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        selectedCategory === category
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Blocks List */}
                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {filteredBlocks.map((block) => (
                    <DraggableBlock key={block.id} block={block} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="p-3">
                <div className="text-sm text-gray-500 text-center py-8">
                  Tools panel coming soon
                </div>
              </div>
            )}
          </Collapsible.Content>
        </Collapsible.Root>

        {/* Collapsed state */}
        {collapsed && (
          <div className="p-2 space-y-2">
            {blockTypes.slice(0, 6).map((block) => (
              <div
                key={block.id}
                className="w-10 h-10 rounded-lg bg-white shadow-sm border border-gray-200 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                title={block.name}
              >
                <div className={`w-6 h-6 rounded ${block.color} opacity-80`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};