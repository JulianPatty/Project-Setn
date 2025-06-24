import React, { useCallback, useRef, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { StartNode } from './CustomNodes';
import { WorkflowNode, WorkflowEdge } from '../types/workflow';

const nodeTypes = {
  start: StartNode,
};

interface WorkflowCanvasProps {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  onNodesChange: (nodes: WorkflowNode[]) => void;
  onEdgesChange: (edges: WorkflowEdge[]) => void;
}

const WorkflowCanvasInner: React.FC<WorkflowCanvasProps> = ({
  nodes: initialNodes,
  edges: initialEdges,
  onNodesChange,
  onEdgesChange,
}) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(initialEdges);
  const { project } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
      onEdgesChange(newEdges);
    },
    [edges, setEdges, onEdgesChange]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const blockData = JSON.parse(type);
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `${blockData.type}-${Date.now()}`,
        type: blockData.type === 'start' ? 'start' : 'default',
        position,
        data: blockData.data,
      };

      const newNodes = [...nodes, newNode];
      setNodes(newNodes);
      onNodesChange(newNodes);
    },
    [project, nodes, setNodes, onNodesChange]
  );

  const handleNodesChange = useCallback((changes: any) => {
    onNodesChangeInternal(changes);
    // Also update parent component
    setNodes((nds) => {
      onNodesChange(nds);
      return nds;
    });
  }, [onNodesChangeInternal, onNodesChange, setNodes]);

  const handleEdgesChange = useCallback((changes: any) => {
    onEdgesChangeInternal(changes);
    // Also update parent component
    setEdges((eds) => {
      onEdgesChange(eds);
      return eds;
    });
  }, [onEdgesChangeInternal, onEdgesChange, setEdges]);

  return (
    <div className="flex-1 h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Background color="#e5e7eb" gap={20} />
        <Controls className="bg-white shadow-lg border border-gray-200" />
        <MiniMap 
          className="bg-white shadow-lg border border-gray-200"
          nodeColor="#8b5cf6"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
};

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <WorkflowCanvasInner {...props} />
    </ReactFlowProvider>
  );
};