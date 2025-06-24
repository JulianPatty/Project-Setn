import React from 'react';
import { Save, Undo2, Redo2, ZoomIn, ZoomOut, Download, Settings, Play } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface TopNavigationProps {
  workflowName: string;
  lastSaved?: Date;
  onSave: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onExport: () => void;
  isAutoSaving: boolean;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  workflowName,
  lastSaved,
  onSave,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onZoomIn,
  onZoomOut,
  onExport,
  isAutoSaving,
}) => {
  const formatLastSaved = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Saved just now';
    if (minutes === 1) return 'Saved 1 minute ago';
    return `Saved ${minutes} minutes ago`;
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-semibold text-gray-900">{workflowName}</h1>
          {lastSaved && (
            <span className="text-sm text-gray-500">
              {isAutoSaving ? 'Saving...' : formatLastSaved(lastSaved)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Tooltip.Provider>
          <div className="flex items-center space-x-1 mr-4">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={onUndo}
                  disabled={!canUndo}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-900 text-white px-2 py-1 rounded text-sm">
                  Undo
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={onRedo}
                  disabled={!canRedo}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Redo2 className="w-4 h-4" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-900 text-white px-2 py-1 rounded text-sm">
                  Redo
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>

          <div className="flex items-center space-x-1 mr-4">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={onZoomOut}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-900 text-white px-2 py-1 rounded text-sm">
                  Zoom Out
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={onZoomIn}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-900 text-white px-2 py-1 rounded text-sm">
                  Zoom In
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onSave}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm font-medium">Save</span>
            </button>

            <button
              onClick={onExport}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
              <Play className="w-4 h-4" />
              <span className="text-sm font-medium">Debug</span>
            </button>
          </div>
        </Tooltip.Provider>
      </div>
    </div>
  );
};