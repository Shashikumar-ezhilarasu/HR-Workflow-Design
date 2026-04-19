import { create } from 'zustand';
import {
  Edge,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import { WorkflowNodeData, WorkflowNode } from '@/types/workflow';

interface HistoryState {
  nodes: WorkflowNode[];
  edges: Edge[];
}

interface WorkflowStore {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNodeId: string | null;

  // History bounds
  past: HistoryState[];
  future: HistoryState[];

  // Node operations
  setNodes: (nodes: WorkflowNode[]) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  addNode: (node: WorkflowNode) => void;
  updateNodeData: (id: string, data: Partial<WorkflowNodeData>) => void;
  deleteNode: (id: string) => void;

  // Edge operations
  setEdges: (edges: Edge[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;

  // Selection
  selectNode: (id: string | null) => void;

  // Utilities
  resetWorkflow: () => void;
  undo: () => void;
  redo: () => void;
  takeSnapshot: () => void;

  // UI State
  theme: 'light' | 'dark';
  isRightSidebarOpen: boolean;
  toggleTheme: () => void;
  toggleRightSidebar: () => void;

  // Auto Layout
  applyAutoLayout: (nodes: WorkflowNode[], edges: Edge[]) => void;
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  past: [],
  future: [],
  theme: 'light',
  isRightSidebarOpen: false,

  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme: newTheme });
  },

  toggleRightSidebar: () => set({ isRightSidebarOpen: !get().isRightSidebarOpen }),


  takeSnapshot: () => {
    const { nodes, edges, past } = get();
    // Keep last 50 states to avoid memory bloat
    const newPast = [...past, { nodes, edges }].slice(-50);
    set({ past: newPast, future: [] });
  },

  undo: () => {
    const { past, future, nodes, edges } = get();
    if (past.length === 0) return;
    
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    
    set({
      nodes: previous.nodes,
      edges: previous.edges,
      past: newPast,
      future: [{ nodes, edges }, ...future]
    });
  },

  redo: () => {
    const { past, future, nodes, edges } = get();
    if (future.length === 0) return;
    
    const next = future[0];
    const newFuture = future.slice(1);
    
    set({
      nodes: next.nodes,
      edges: next.edges,
      past: [...past, { nodes, edges }],
      future: newFuture
    });
  },

  setNodes: (nodes) => {
    get().takeSnapshot();
    set({ nodes });
  },

  onNodesChange: (changes) => {
    // Only snapshot on actual structural changes or position edits (drag stop)
    // React Flow fires many changes; taking snapshot on every position change causes issues
    const isImportantChange = changes.some(c => c.type === 'remove' || c.type === 'add');
    if (isImportantChange) {
       get().takeSnapshot();
    }
    
    set({
      nodes: applyNodeChanges(changes, get().nodes) as WorkflowNode[],
    });
  },

  addNode: (node) => {
    get().takeSnapshot();
    set({ nodes: [...get().nodes, node] });
  },

  updateNodeData: (id, data) => {
    get().takeSnapshot();
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === id) {
          const updatedData = {
            ...node.data,
            ...data,
            label: (data as any).title || node.data.label,
          } as WorkflowNodeData;

          return {
            ...node,
            data: updatedData,
          };
        }
        return node;
      }),
    });
  },

  deleteNode: (id) => {
    get().takeSnapshot();
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
      selectedNodeId: get().selectedNodeId === id ? null : get().selectedNodeId,
    });
  },

  setEdges: (edges) => {
    get().takeSnapshot();
    set({ edges });
  },

  onEdgesChange: (changes) => {
    const isImportantChange = changes.some(c => c.type === 'remove');
    if (isImportantChange) {
      get().takeSnapshot();
    }
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    get().takeSnapshot();
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  selectNode: (id) => set({ selectedNodeId: id }),

  resetWorkflow: () => {
    get().takeSnapshot();
    set({
      nodes: [],
      edges: [],
      selectedNodeId: null,
    });
  },

  applyAutoLayout: (nodes, edges) => {
    get().takeSnapshot();
    set({ nodes, edges });
  }
}));
