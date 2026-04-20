# HR Workflow Designer

<div align="center">

![HR Workflow Designer](https://github.com/user-attachments/assets/0633f5b8-f3ab-48b0-92b3-ab15b456c941)

**A sophisticated, production-grade HR Workflow Designer built with React, TypeScript, and advanced graph algorithms**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Flow](https://img.shields.io/badge/React_Flow-11.11-FF0072)](https://reactflow.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-4.5-F3EFF5)](https://github.com/pmndrs/zustand)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Demo](#-live-demo) • [Features](#-features) • [Installation](#-quick-start) • [Documentation](#-documentation) • [Architecture](#-architecture)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Vision & Principles](#-vision--principles)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Core Algorithms](#-core-algorithms)
- [API Documentation](#-api-documentation)
- [Usage Guide](#-usage-guide)
- [Development Guide](#-development-guide)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

---

## 🎯 Overview

The **HR Workflow Designer** is a sophisticated visual workflow builder that enables HR administrators to architect, configure, and simulate complex internal workflows such as employee onboarding, leave approvals, and automated document verification. Built as a technical showcase, this platform demonstrates expertise in React architecture, advanced graph algorithms, and modular frontend design.

### What Makes This Special?

- **Graph Theory at its Core**: Real DAG (Directed Acyclic Graph) validation with cycle detection using depth-first search
- **Execution Engine**: Topological sort-based simulation using Kahn's Algorithm for deterministic workflow execution
- **Production-Ready**: MSW (Mock Service Worker) for API mocking, Zustand for state management, and full TypeScript coverage
- **Extensible Architecture**: Registry-based patterns for seamless addition of new node types and business logic

---

## 🌟 Vision & Principles

This prototype was built with three core principles:

### 1. Architectural Scalability
Registry-based patterns allow seamless extension of business logic without modifying core systems. New node types can be added by simply registering them in the NodeRegistry with their component and configuration schema.

### 2. Algorithmic Integrity
Moving beyond simple UI drag-and-drop to true Graph Theory application. The system enforces DAG constraints, performs reachability analysis, and executes workflows using proven computer science algorithms.

### 3. Simulation-First Design
A sandbox that doesn't just "show" steps but executes a logical model of the workflow, complete with conditional branching, approval thresholds, and failure state handling.

---

## ✨ Features

### Canvas & Visual Design
- ✅ **Visual Workflow Designer** - Drag-and-drop interface powered by React Flow
- ✅ **Custom Node Types** - Start, Task, Approval, Automated Step, and End nodes
- ✅ **Auto-Layout Engine** - Intelligent positioning using Dagre graph layout
- ✅ **Mini-map & Controls** - Navigation aids for complex workflows
- ✅ **Snap to Grid** - Precise node positioning

### Advanced Graph Validation
- ✅ **Cycle Detection** - DFS-based algorithm with color-coding (White/Gray/Black)
- ✅ **Reachability Analysis** - Forward BFS from Start, backward BFS from End nodes
- ✅ **Node Degree Validation** - Ensures proper in/out connections based on node type
- ✅ **Workflow Health Score** - Weighted metric for structural integrity

### Execution Engine
- ✅ **Topological Sort** - Kahn's Algorithm for valid execution order
- ✅ **Conditional Branching** - Approval nodes evaluate thresholds
- ✅ **Failure Simulation** - Proper handling of approval rejections
- ✅ **Step-by-Step Execution** - Visual trace of workflow progression

### Configuration & State
- ✅ **Dynamic Node Forms** - Context-aware configuration panels
- ✅ **Type-Safe Inputs** - Full TypeScript coverage
- ✅ **Auto-Save** - Debounced form persistence
- ✅ **Undo/Redo** - Complete history management with snapshots

### Data & Integration
- ✅ **Mock API Layer** - MSW for production-grade mocking
- ✅ **JSON Import/Export** - Full workflow serialization
- ✅ **Workflow Templates** - Pre-built workflow patterns

### UI/UX
- ✅ **Dark/Light Mode** - Zinc design system
- ✅ **Responsive Design** - Mobile-friendly interface
- ✅ **Keyboard Shortcuts** - Power user features
- ✅ **Accessibility** - ARIA labels and screen reader support

---

## 🏗 Architecture

The application follows a layered architecture pattern with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                   Presentation Layer                         │
│  Designer.tsx • WorkflowCanvas • Node Forms • Sandbox       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Business Logic Layer                        │
│  NodeRegistry • GraphEngine • ExecEngine • Zustand Store    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 Data & Integration Layer                     │
│  MSW Handlers • Serialization • Dagre Layout                │
└─────────────────────────────────────────────────────────────┘
```

### Component Breakdown

#### Presentation Layer
- **Designer.tsx**: Main orchestrator managing layout, toolbar, and workspace state
- **WorkflowCanvas.tsx**: Pure React Flow integration handling node rendering and connections
- **Node Forms**: Dynamic configuration panels with type-safe inputs
- **Sandbox Panel**: Workflow testing and simulation interface

#### Business Logic Layer
- **NodeRegistry**: Maps node types to components and configuration schemas
- **GraphEngine**: DAG validation, cycle detection, and reachability analysis
- **ExecutionEngine**: Topological sort and workflow simulation
- **WorkflowStore**: Centralized Zustand store for nodes, edges, and history

#### Data Layer
- **MSW Handlers**: Mock API endpoints for automations and simulation
- **Serialization**: JSON import/export with schema validation
- **Dagre Layout**: Auto-positioning engine for workflow graphs

---

## 🛠 Tech Stack

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI framework with concurrent features |
| **TypeScript** | 5.5.3 | Type safety and developer experience |
| **Vite** | 5.3.1 | Build tool and dev server |

### State & Data Flow
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Zustand** | 4.5.2 | Lightweight state management |
| **React Flow** | 11.11.4 | Node-graph visualization engine |
| **MSW** | 2.3.1 | API mocking at network layer |

### Styling & UI
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Tailwind CSS** | 3.4.1 | Utility-first styling |
| **Lucide React** | 0.383.0 | Icon library |
| **clsx** | 2.1.1 | Conditional className utility |

### Graph & Layout
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Dagre** | 0.8.5 | Graph layout algorithms |
| **@xyflow/react** | 12.0.0 | React Flow ecosystem |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later (or yarn/pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/Shashikumar-ezhilarasu/HR-Workflow-Design.git
cd HR-workflow

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

### Linting & Type Checking

```bash
# Run ESLint
npm run lint

# Type check with TypeScript
npm run type-check
```

---

## 📁 Project Structure

```
HR-workflow/
├── public/                      # Static assets
├── src/
│   ├── components/              # React components
│   │   ├── canvas/             # Workflow canvas components
│   │   │   ├── WorkflowCanvas.tsx
│   │   │   ├── CustomEdge.tsx
│   │   │   └── MiniMap.tsx
│   │   ├── nodes/              # Custom node components
│   │   │   ├── StartNode.tsx
│   │   │   ├── TaskNode.tsx
│   │   │   ├── ApprovalNode.tsx
│   │   │   ├── AutomatedNode.tsx
│   │   │   └── EndNode.tsx
│   │   ├── forms/              # Node configuration forms
│   │   │   ├── StartNodeForm.tsx
│   │   │   ├── TaskNodeForm.tsx
│   │   │   ├── ApprovalNodeForm.tsx
│   │   │   ├── AutomatedNodeForm.tsx
│   │   │   └── EndNodeForm.tsx
│   │   ├── sidebar/            # Sidebar components
│   │   │   ├── NodePalette.tsx
│   │   │   └── ConfigPanel.tsx
│   │   ├── simulation/         # Simulation components
│   │   │   ├── SandboxPanel.tsx
│   │   │   └── ExecutionLog.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       └── Toggle.tsx
│   ├── core/                   # Core business logic
│   │   ├── registry/           # Node registry
│   │   │   └── NodeRegistry.ts
│   │   ├── validation/         # Graph validation
│   │   │   ├── dagValidator.ts
│   │   │   ├── cycleDetector.ts
│   │   │   └── reachability.ts
│   │   ├── execution/          # Execution engine
│   │   │   ├── ExecutionEngine.ts
│   │   │   └── topologicalSort.ts
│   │   └── layout/             # Auto-layout
│   │       └── dagreLayout.ts
│   ├── store/                  # State management
│   │   ├── workflowStore.ts
│   │   └── middleware/
│   │       ├── historyMiddleware.ts
│   │       └── persistenceMiddleware.ts
│   ├── api/                    # API layer
│   │   ├── mocks/              # MSW handlers
│   │   │   ├── handlers.ts
│   │   │   └── browser.ts
│   │   └── services/           # API services
│   │       ├── automationService.ts
│   │       └── simulationService.ts
│   ├── types/                  # TypeScript definitions
│   │   ├── node.types.ts
│   │   ├── workflow.types.ts
│   │   └── api.types.ts
│   ├── hooks/                  # Custom React hooks
│   │   ├── useWorkflow.ts
│   │   ├── useValidation.ts
│   │   └── useSimulation.ts
│   ├── utils/                  # Utility functions
│   │   ├── serialization.ts
│   │   ├── validation.ts
│   │   └── formatting.ts
│   ├── constants/              # Application constants
│   │   └── nodeTypes.ts
│   ├── App.tsx                 # Root component
│   ├── main.tsx               # Application entry
│   └── index.css              # Global styles
├── .eslintrc.cjs              # ESLint configuration
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

### Key Directories Explained

- **`components/`**: All React components organized by feature
- **`core/`**: Business logic, algorithms, and core functionality
- **`store/`**: Zustand store and middleware
- **`api/`**: MSW mocks and API service layer
- **`types/`**: TypeScript type definitions and interfaces
- **`hooks/`**: Custom React hooks for reusable logic
- **`utils/`**: Pure utility functions

---

## 🧮 Core Algorithms

### 1. Cycle Detection (DFS with Color Coding)

The workflow enforces a strict DAG structure. Cycles are detected using a depth-first search with three-color marking:

```typescript
enum NodeColor {
  WHITE = 'white',  // Unvisited
  GRAY = 'gray',    // Currently visiting
  BLACK = 'black'   // Visited
}

function detectCycle(nodes: Node[], edges: Edge[]): boolean {
  const colors = new Map<string, NodeColor>();
  const adjList = buildAdjacencyList(edges);
  
  // Initialize all nodes as white
  nodes.forEach(node => colors.set(node.id, NodeColor.WHITE));
  
  // DFS from each white node
  for (const node of nodes) {
    if (colors.get(node.id) === NodeColor.WHITE) {
      if (dfsVisit(node.id, colors, adjList)) {
        return true; // Cycle detected
      }
    }
  }
  
  return false;
}

function dfsVisit(
  nodeId: string, 
  colors: Map<string, NodeColor>,
  adjList: Map<string, string[]>
): boolean {
  // Mark current node as being visited
  colors.set(nodeId, NodeColor.GRAY);
  
  // Visit all neighbors
  const neighbors = adjList.get(nodeId) || [];
  for (const neighbor of neighbors) {
    const neighborColor = colors.get(neighbor);
    
    if (neighborColor === NodeColor.GRAY) {
      return true; // Back edge found - cycle exists
    }
    
    if (neighborColor === NodeColor.WHITE) {
      if (dfsVisit(neighbor, colors, adjList)) {
        return true;
      }
    }
  }
  
  // Mark as completely visited
  colors.set(nodeId, NodeColor.BLACK);
  return false;
}
```

**Time Complexity**: O(V + E) where V is nodes and E is edges

### 2. Topological Sort (Kahn's Algorithm)

The execution engine uses Kahn's Algorithm to determine valid execution order:

```typescript
function topologicalSort(nodes: Node[], edges: Edge[]): Node[] | null {
  const inDegree = new Map<string, number>();
  const adjList = new Map<string, string[]>();
  const result: Node[] = [];
  const queue: string[] = [];
  
  // Initialize in-degrees and adjacency list
  nodes.forEach(node => {
    inDegree.set(node.id, 0);
    adjList.set(node.id, []);
  });
  
  edges.forEach(edge => {
    adjList.get(edge.source)?.push(edge.target);
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
  });
  
  // Find all nodes with in-degree 0
  inDegree.forEach((degree, nodeId) => {
    if (degree === 0) {
      queue.push(nodeId);
    }
  });
  
  // Process queue
  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    const node = nodes.find(n => n.id === nodeId)!;
    result.push(node);
    
    // Reduce in-degree for neighbors
    const neighbors = adjList.get(nodeId) || [];
    neighbors.forEach(neighbor => {
      const newDegree = inDegree.get(neighbor)! - 1;
      inDegree.set(neighbor, newDegree);
      
      if (newDegree === 0) {
        queue.push(neighbor);
      }
    });
  }
  
  // If not all nodes processed, graph has cycle
  return result.length === nodes.length ? result : null;
}
```

**Time Complexity**: O(V + E)

### 3. Reachability Analysis (BFS)

Identifies orphaned nodes and dead-ends using bidirectional BFS:

```typescript
interface ReachabilityResult {
  reachableFromStart: Set<string>;
  canReachEnd: Set<string>;
  orphanedNodes: string[];
  deadEnds: string[];
}

function analyzeReachability(
  nodes: Node[], 
  edges: Edge[]
): ReachabilityResult {
  const startNode = nodes.find(n => n.type === 'start');
  const endNodes = nodes.filter(n => n.type === 'end');
  
  // Forward BFS from start
  const reachableFromStart = bfsForward(
    startNode?.id || '', 
    edges
  );
  
  // Backward BFS from all end nodes
  const canReachEnd = bfsBackward(
    endNodes.map(n => n.id), 
    edges
  );
  
  // Find orphaned nodes (not reachable from start)
  const orphanedNodes = nodes
    .filter(n => !reachableFromStart.has(n.id))
    .map(n => n.id);
  
  // Find dead ends (cannot reach any end node)
  const deadEnds = nodes
    .filter(n => !canReachEnd.has(n.id) && n.type !== 'end')
    .map(n => n.id);
  
  return {
    reachableFromStart,
    canReachEnd,
    orphanedNodes,
    deadEnds
  };
}
```

### 4. Workflow Health Score

Calculates a weighted metric for structural integrity:

```typescript
function calculateHealthScore(workflow: Workflow): number {
  let score = 100;
  const weights = {
    hasCycle: -40,
    orphanedNode: -10,
    deadEnd: -15,
    missingStart: -30,
    missingEnd: -20,
    disconnectedNodes: -5
  };
  
  const validation = validateWorkflow(workflow);
  
  if (validation.hasCycle) score += weights.hasCycle;
  if (!validation.hasStart) score += weights.missingStart;
  if (!validation.hasEnd) score += weights.missingEnd;
  
  score += validation.orphanedNodes.length * weights.orphanedNode;
  score += validation.deadEnds.length * weights.deadEnd;
  score += validation.disconnected.length * weights.disconnectedNodes;
  
  return Math.max(0, Math.min(100, score));
}
```

---

## 📡 API Documentation

### Mock API Endpoints

The application uses MSW (Mock Service Worker) to intercept network requests and provide realistic API responses.

#### GET `/api/automations`

Returns available automated actions for the Automated Step node.

**Response:**
```typescript
{
  data: Array<{
    id: string;
    label: string;
    params: string[];
    description?: string;
  }>;
}
```

**Example:**
```json
{
  "data": [
    {
      "id": "send_email",
      "label": "Send Email",
      "params": ["to", "subject", "body"],
      "description": "Send automated email notification"
    },
    {
      "id": "generate_doc",
      "label": "Generate Document",
      "params": ["template", "recipient"],
      "description": "Generate PDF document from template"
    },
    {
      "id": "create_ticket",
      "label": "Create Support Ticket",
      "params": ["category", "priority", "assignee"],
      "description": "Create ticket in support system"
    }
  ]
}
```

#### POST `/api/simulate`

Executes workflow simulation and returns step-by-step execution log.

**Request Body:**
```typescript
{
  nodes: Node[];
  edges: Edge[];
  context?: Record<string, any>;
}
```

**Response:**
```typescript
{
  success: boolean;
  executionOrder: string[];
  steps: Array<{
    nodeId: string;
    nodeName: string;
    nodeType: string;
    status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
    timestamp: number;
    duration: number;
    output?: any;
    error?: string;
  }>;
  errors: Array<{
    nodeId: string;
    message: string;
  }>;
}
```

**Example Response:**
```json
{
  "success": true,
  "executionOrder": ["start-1", "task-1", "approval-1", "automated-1", "end-1"],
  "steps": [
    {
      "nodeId": "start-1",
      "nodeName": "Start Onboarding",
      "nodeType": "start",
      "status": "completed",
      "timestamp": 1704067200000,
      "duration": 100
    },
    {
      "nodeId": "task-1",
      "nodeName": "Collect Documents",
      "nodeType": "task",
      "status": "completed",
      "timestamp": 1704067200100,
      "duration": 2500,
      "output": { "documentsCollected": 5 }
    }
  ],
  "errors": []
}
```

---

## 📖 Usage Guide

### Creating Your First Workflow

1. **Add Start Node**
   - Drag the "Start" node from the sidebar onto the canvas
   - Click to select and configure the start title

2. **Add Task Nodes**
   - Drag "Task" nodes for human actions
   - Configure title, description, assignee, and due date
   - Add custom fields as key-value pairs

3. **Add Approval Node**
   - Drag "Approval" node for manager approval steps
   - Set approver role and auto-approve threshold
   - Configure conditional logic

4. **Add Automated Steps**
   - Drag "Automated Step" node for system actions
   - Select action from dropdown (populated via API)
   - Fill in required parameters

5. **Add End Node**
   - Drag "End" node to mark workflow completion
   - Configure end message and summary flag

6. **Connect Nodes**
   - Click and drag from output handle to input handle
   - System validates connections in real-time

7. **Test Workflow**
   - Click "Simulate" in the toolbar
   - Review step-by-step execution in sandbox panel
   - Check for validation errors

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |
| `Delete` | Delete selected node/edge |
| `Ctrl/Cmd + S` | Save workflow |
| `Ctrl/Cmd + E` | Export as JSON |
| `Ctrl/Cmd + I` | Import from JSON |
| `Ctrl/Cmd + L` | Auto-layout |
| `Space + Drag` | Pan canvas |
| `Ctrl/Cmd + Scroll` | Zoom |

### Node Configuration Examples

#### Task Node Configuration
```typescript
{
  title: "Collect Employee Documents",
  description: "Gather ID proof, address proof, and educational certificates",
  assignee: "hr.admin@company.com",
  dueDate: "2024-01-15",
  customFields: {
    department: "HR",
    priority: "high",
    documentTypes: "ID, Address, Education"
  }
}
```

#### Approval Node Configuration
```typescript
{
  title: "Manager Approval",
  approverRole: "Department Manager",
  autoApproveThreshold: 5000,
  description: "Approve if expense < $5000, else require manual approval"
}
```

#### Automated Step Configuration
```typescript
{
  title: "Send Welcome Email",
  actionId: "send_email",
  parameters: {
    to: "{{employee.email}}",
    subject: "Welcome to Company",
    body: "Welcome template content"
  }
}
```

---

## 👨💻 Development Guide

### Adding a New Node Type

1. **Create Node Component**

```typescript
// src/components/nodes/CustomNode.tsx
import { FC } from 'react';
import { NodeProps } from 'reactflow';

export const CustomNode: FC<NodeProps> = ({ data, selected }) => {
  return (
    <div className={`custom-node ${selected ? 'selected' : ''}`}>
      <div className="node-header">{data.label}</div>
      <div className="node-body">{data.description}</div>
    </div>
  );
};
```

2. **Create Configuration Form**

```typescript
// src/components/forms/CustomNodeForm.tsx
import { FC } from 'react';
import { NodeFormProps } from '@/types/node.types';

export const CustomNodeForm: FC<NodeFormProps> = ({ 
  node, 
  onUpdate 
}) => {
  return (
    <form>
      <input
        type="text"
        value={node.data.customField}
        onChange={(e) => onUpdate({
          ...node,
          data: { ...node.data, customField: e.target.value }
        })}
      />
    </form>
  );
};
```

3. **Register in NodeRegistry**

```typescript
// src/core/registry/NodeRegistry.ts
import { CustomNode } from '@/components/nodes/CustomNode';
import { CustomNodeForm } from '@/components/forms/CustomNodeForm';

export const NodeRegistry = {
  // ... existing nodes
  custom: {
    component: CustomNode,
    form: CustomNodeForm,
    defaultData: {
      label: 'Custom Node',
      customField: ''
    },
    validation: {
      maxInputs: 1,
      maxOutputs: 1,
      requiredFields: ['customField']
    }
  }
};
```

### Custom Hooks

#### useWorkflow

```typescript
import { useWorkflow } from '@/hooks/useWorkflow';

function MyComponent() {
  const {
    nodes,
    edges,
    addNode,
    updateNode,
    deleteNode,
    connectNodes,
    validateWorkflow,
    healthScore
  } = useWorkflow();
  
  // Use workflow operations
}
```

#### useSimulation

```typescript
import { useSimulation } from '@/hooks/useSimulation';

function SimulationPanel() {
  const {
    isSimulating,
    executionLog,
    startSimulation,
    stopSimulation,
    resetSimulation
  } = useSimulation();
  
  return (
    <div>
      <button onClick={startSimulation}>Run</button>
      {executionLog.map(step => (
        <div key={step.nodeId}>{step.nodeName}</div>
      ))}
    </div>
  );
}
```

### State Management

The application uses Zustand with middleware for history management:

```typescript
// src/store/workflowStore.ts
import create from 'zustand';
import { temporal } from 'zundo';

interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: string | null;
  // ... other state
  
  // Actions
  addNode: (node: Node) => void;
  updateNode: (id: string, updates: Partial<Node>) => void;
  deleteNode: (id: string) => void;
  // ... other actions
}

export const useWorkflowStore = create<WorkflowState>()(
  temporal((set, get) => ({
    nodes: [],
    edges: [],
    selectedNode: null,
    
    addNode: (node) => set((state) => ({
      nodes: [...state.nodes, node]
    })),
    
    updateNode: (id, updates) => set((state) => ({
      nodes: state.nodes.map(n => 
        n.id === id ? { ...n, ...updates } : n
      )
    })),
    
    // ... other implementations
  }))
);

// Undo/Redo
export const { undo, redo, clear } = useWorkflowStore.temporal;
```

---

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

```typescript
// src/core/validation/__tests__/cycleDetector.test.ts
import { describe, it, expect } from 'vitest';
import { detectCycle } from '../cycleDetector';

describe('Cycle Detection', () => {
  it('should detect cycle in graph', () => {
    const nodes = [
      { id: '1', type: 'start' },
      { id: '2', type: 'task' },
      { id: '3', type: 'end' }
    ];
    
    const edges = [
      { source: '1', target: '2' },
      { source: '2', target: '3' },
      { source: '3', target: '1' } // Creates cycle
    ];
    
    expect(detectCycle(nodes, edges)).toBe(true);
  });
  
  it('should not detect cycle in DAG', () => {
    const nodes = [
      { id: '1', type: 'start' },
      { id: '2', type: 'task' },
      { id: '3', type: 'end' }
    ];
    
    const edges = [
      { source: '1', target: '2' },
      { source: '2', target: '3' }
    ];
    
    expect(detectCycle(nodes, edges)).toBe(false);
  });
});
```

### E2E Tests (Planned)

E2E tests using Playwright will be added to test complete user workflows:
- Creating workflows
- Node configuration
- Workflow simulation
- Import/Export functionality

---

## 🚢 Deployment

### Build Configuration

The project uses Vite for building. Configuration is in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
```

### Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_ENABLE_MSW=true
VITE_ENABLE_ANALYTICS=false
```

### Deployment Platforms

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

#### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Development Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow TypeScript best practices
- Use functional components and hooks
- Write tests for new features
- Update documentation
- Follow existing code style

### Pull Request Guidelines

- Provide clear description of changes
- Reference related issues
- Include screenshots for UI changes
- Ensure tests pass
- Update CHANGELOG.md

---

## 🗺 Roadmap

### Phase 1: Core Features (Completed ✅)
- [x] Visual workflow designer
- [x] Custom node types
- [x] Graph validation algorithms
- [x] Execution simulation
- [x] Undo/Redo functionality
- [x] JSON import/export

### Phase 2: Enhanced Features (In Progress 🚧)
- [ ] Real-time collaboration (WebSockets)
- [ ] Workflow templates library
- [ ] Advanced analytics dashboard
- [ ] Workflow versioning
- [ ] Role-based access control

### Phase 3: Enterprise Features (Planned 📋)
- [ ] PostgreSQL/Supabase integration
- [ ] RESTful API backend
- [ ] Authentication (OAuth 2.0)
- [ ] Audit logging
- [ ] Webhook triggers
- [ ] Custom node SDK
- [ ] Workflow marketplace

### Phase 4: Advanced Capabilities (Future 🔮)
- [ ] AI-powered workflow suggestions
- [ ] Natural language workflow creation
- [ ] Performance optimization tools
- [ ] Mobile app (React Native)
- [ ] Integration with HR systems (SAP, Workday)

---

## ❓ Troubleshooting

### Common Issues

#### Issue: Nodes not rendering
**Solution:** Ensure React Flow CSS is imported in your main file:
```typescript
import 'reactflow/dist/style.css';
```

#### Issue: MSW not intercepting requests
**Solution:** Check that MSW is initialized in development:
```typescript
// src/main.tsx
if (import.meta.env.DEV) {
  const { worker } = await import('./api/mocks/browser');
  await worker.start();
}
```

#### Issue: Type errors with Zustand
**Solution:** Ensure you're using the correct store hooks:
```typescript
import { useWorkflowStore } from '@/store/workflowStore';

// Correct
const nodes = useWorkflowStore((state) => state.nodes);

// Incorrect
const { nodes } = useWorkflowStore(); // This won't work
```

#### Issue: Canvas performance degradation
**Solution:** Enable React Flow performance optimizations:
```typescript
<ReactFlow
  nodes={nodes}
  edges={edges}
  fitView
  attributionPosition="bottom-left"
  // Performance optimizations
  nodesDraggable={true}
  nodesConnectable={true}
  elementsSelectable={true}
  selectNodesOnDrag={false}
  panOnDrag={[1, 2]} // Middle and right mouse button
/>
```

### Debug Mode

Enable debug logging:
```typescript
// src/utils/debug.ts
export const DEBUG = import.meta.env.DEV;

export const debugLog = (...args: any[]) => {
  if (DEBUG) {
    console.log('[DEBUG]', ...args);
  }
};
```

### Performance Monitoring

Add performance marks:
```typescript
performance.mark('workflow-validate-start');
const result = validateWorkflow(workflow);
performance.mark('workflow-validate-end');
performance.measure(
  'workflow-validation',
  'workflow-validate-start',
  'workflow-validate-end'
);
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Shashikumar Ezhilarasu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- [React Flow](https://reactflow.dev/) for the excellent graph visualization library
- [Zustand](https://github.com/pmndrs/zustand) for lightweight state management
- [MSW](https://mswjs.io/) for API mocking capabilities
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons

---

## 📬 Contact

**Shashikumar Ezhilarasu**  
AI Agentic Engineering - Tredence Studio

- GitHub: [@Shashikumar-ezhilarasu](https://github.com/Shashikumar-ezhilarasu)
- Project Link: [https://github.com/Shashikumar-ezhilarasu/HR-Workflow-Design](https://github.com/Shashikumar-ezhilarasu/HR-Workflow-Design)

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Graph Theory**

⭐ Star this repo if you find it useful!

</div>

