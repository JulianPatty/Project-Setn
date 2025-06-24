import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Plus, FileText, BookOpen, Settings, Users } from 'lucide-react';
import * as Collapsible from '@radix-ui/react-collapsible';
import { Workflow } from '../types/workflow';

interface PrimarySidebarProps {
  workflows: Workflow[];
  currentWorkflow: Workflow;
  onWorkflowSelect: (workflow: Workflow) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const PrimarySidebar: React.FC<PrimarySidebarProps> = ({
  workflows,
  currentWorkflow,
  onWorkflowSelect,
  collapsed,
  onToggleCollapse,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWorkflows = workflows.filter(workflow =>
    workflow.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getWorkflowIcon = (workflow: Workflow) => {
    if (workflow.name === 'Workflow 1 (Copy)') return '🟡';
    if (workflow.name === 'Workflow 2') return '🟣';
    if (workflow.name === 'Workflow 1') return '🔵';
    return '🟢';
  };

  return (
    <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-72'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900">Workflows</span>
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
            <div className="p-4 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workflows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* New Workflow Button */}
              <button className="w-full flex items-center space-x-3 p-3 border border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                <span className="text-sm text-gray-600 group-hover:text-purple-600">New Workflow</span>
              </button>

              {/* Workflows List */}
              <div className="space-y-1">
                {filteredWorkflows.map((workflow) => (
                  <button
                    key={workflow.id}
                    onClick={() => onWorkflowSelect(workflow)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors text-left ${
                      currentWorkflow.id === workflow.id
                        ? 'bg-purple-100 text-purple-900'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="text-sm">{getWorkflowIcon(workflow)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{workflow.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        Modified {new Date(workflow.lastModified).toLocaleDateString()}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>

        {/* Navigation Items */}
        <Collapsible.Root open={!collapsed}>
          <Collapsible.Content>
            <div className="px-4 pb-4 space-y-1">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">Logs</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <BookOpen className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">Knowledge</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Settings className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">Settings</span>
              </button>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>

        {/* Collapsed Navigation */}
        {collapsed && (
          <div className="px-2 py-4 space-y-2">
            <button className="w-full p-3 rounded-lg hover:bg-gray-50 transition-colors flex justify-center">
              <FileText className="w-5 h-5 text-gray-500" />
            </button>
            <button className="w-full p-3 rounded-lg hover:bg-gray-50 transition-colors flex justify-center">
              <BookOpen className="w-5 h-5 text-gray-500" />
            </button>
            <button className="w-full p-3 rounded-lg hover:bg-gray-50 transition-colors flex justify-center">
              <Settings className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        )}

        {/* Invite Members */}
        <Collapsible.Root open={!collapsed}>
          <Collapsible.Content>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700">Invite members</span>
              </button>
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    </div>
  );
};