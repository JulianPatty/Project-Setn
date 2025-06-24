export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    config?: Record<string, any>;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  lastModified: Date;
  version: number;
}

export interface BlockType {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  color: string;
  defaultData?: Record<string, any>;
}

export interface SidebarState {
  primaryCollapsed: boolean;
  secondaryCollapsed: boolean;
}