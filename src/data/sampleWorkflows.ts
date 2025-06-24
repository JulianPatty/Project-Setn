import { Workflow } from '../types/workflow';

export const sampleWorkflows: Workflow[] = [
  {
    id: 'workflow-3',
    name: 'Workflow 3',
    description: 'Advanced automation workflow',
    nodes: [
      {
        id: 'start-1',
        type: 'start',
        position: { x: 250, y: 50 },
        data: {
          label: 'Start',
          description: 'Start Workflow',
        },
      },
    ],
    edges: [],
    lastModified: new Date(Date.now() - 60000),
    version: 1,
  },
  {
    id: 'workflow-1-copy',
    name: 'Workflow 1 (Copy)',
    description: 'Copy of the original workflow',
    nodes: [],
    edges: [],
    lastModified: new Date(Date.now() - 3600000),
    version: 1,
  },
  {
    id: 'workflow-2',
    name: 'Workflow 2',
    description: 'Secondary workflow for testing',
    nodes: [],
    edges: [],
    lastModified: new Date(Date.now() - 7200000),
    version: 1,
  },
  {
    id: 'workflow-1',
    name: 'Workflow 1',
    description: 'Primary workflow template',
    nodes: [],
    edges: [],
    lastModified: new Date(Date.now() - 86400000),
    version: 1,
  },
];