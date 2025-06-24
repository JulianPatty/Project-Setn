import { useState, useCallback, useRef } from 'react';
import { Workflow, WorkflowNode, WorkflowEdge } from '../types/workflow';
import { sampleWorkflows } from '../data/sampleWorkflows';

export const useWorkflowState = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>(sampleWorkflows);
  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow>(sampleWorkflows[0]);
  const [history, setHistory] = useState<Workflow[]>([sampleWorkflows[0]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const autoSaveTimer = useRef<NodeJS.Timeout>();

  const saveToHistory = useCallback((workflow: Workflow) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ ...workflow, version: workflow.version + 1 });
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const updateWorkflow = useCallback((updates: Partial<Workflow>) => {
    const updatedWorkflow = {
      ...currentWorkflow,
      ...updates,
      lastModified: new Date(),
    };
    
    setCurrentWorkflow(updatedWorkflow);
    
    // Auto-save with debounce
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }
    
    setIsAutoSaving(true);
    autoSaveTimer.current = setTimeout(() => {
      setWorkflows(prev => 
        prev.map(w => w.id === updatedWorkflow.id ? updatedWorkflow : w)
      );
      setIsAutoSaving(false);
    }, 1000);
    
    saveToHistory(updatedWorkflow);
  }, [currentWorkflow, saveToHistory]);

  const updateNodes = useCallback((nodes: WorkflowNode[]) => {
    updateWorkflow({ nodes });
  }, [updateWorkflow]);

  const updateEdges = useCallback((edges: WorkflowEdge[]) => {
    updateWorkflow({ edges });
  }, [updateWorkflow]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevWorkflow = history[historyIndex - 1];
      setCurrentWorkflow(prevWorkflow);
      setHistoryIndex(prev => prev - 1);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextWorkflow = history[historyIndex + 1];
      setCurrentWorkflow(nextWorkflow);
      setHistoryIndex(prev => prev + 1);
    }
  }, [history, historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return {
    workflows,
    currentWorkflow,
    setCurrentWorkflow,
    updateNodes,
    updateEdges,
    updateWorkflow,
    undo,
    redo,
    canUndo,
    canRedo,
    isAutoSaving,
  };
};