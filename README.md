# HR Workflow Designer - Production Prototype

<img width="1582" height="959" alt="Designer Screenshot" src="https://github.com/user-attachments/assets/0633f5b8-f3ab-48b0-92b3-ab15b456c941" />

A sophisticated, production-grade HR Workflow Designer module built as a technical showcase. This platform enables HR administrators to visually architect, configure, and simulate complex internal workflows such as onboarding, leave approvals, and automated document verification.

- **Objective**: Demonstrate expertise in React, Advanced Graph Algorithms, and modular frontend architecture.
- **Demo Highlights**: Real-time DAG validation, Topologicalsort-based simulation, and high-fidelity Zinc aesthetics.
- **Tech Stack**: React 18, TypeScript, React Flow, Zustand, Tailwind CSS, MSW (Production-ready mocks).

---

## 🚀 Vision and Values

This prototype was built with three core principles in mind:
1.  **Architectural Scalability**: Registry-based patterns for nodes/forms allow for seamless extension of business logic.
2.  **Algorithmic Integrity**: Moving beyond simple UI drag-and-drop to true Graph Theory application (DAG enforcement, path analysis).
3.  **Simulation-First Design**: A sandbox that doesn't just "show" steps but executes a logical model of the workflow.

---

## ✅ Feature Implementation & Status

| Category | Feature | Status | Engineering Detail |
| :--- | :--- | :---: | :--- |
| **Canvas** | Visual Workflow Designer | ✅ | React Flow integration with custom edge logic and snap-to-grid. |
| **Logic** | **Advanced Graph Validation** | ✅ | Cycle detection (DFS), Reachability analysis, and Node Degree validation. |
| **Engine** | **Execution Simulation** | ✅ | **Kahn's Algorithm (Topological Sort)** based BFS traversal. |
| **Analytics**| **Workflow Health Score** | ✅ | Weighted metric calculating structural integrity and path completeness. |
| **UI/UX** | Dynamic Configuration | ✅ | Context-aware forms with auto-save and complex field validation. |
| **Utility** | Auto-Layout Engine | ✅ | Directed acyclic graph positioning using the Dagre engine. |
| **DevOps** | Mock API (MSW) | ✅ | Production-grade interceptors for `/automations` and `/simulate`. |
| **State** | Undo/Redo & Snapshots | ✅ | Chronology management with state serialization in Zustand. |
| **Data** | JSON Persistence | ✅ | Full schema serialization for Workflow Import/Export. |
| **Theming** | Professional Aesthetics| ✅ | Polished Zinc system with fluid Dark/Light mode support. |

---

## 🧠 Core Logic & Algorithms

### 1. Graph Validation (DAG Enforcement)
The designer implements a strict **Directed Acyclic Graph (DAG)** model. The validation engine performs:
- **Cycle Detection**: Uses iterative DFS with color-coding (White/Gray/Black) to identify and trace back-edges.
- **Reachability Analysis**: Forward BFS from the "Start" node to identify orphaned nodes, and Backward BFS from "End" nodes to identify logical dead-ends.
- **Integrity Checks**: Validates in-degree/out-degree constraints based on node type (e.g., End nodes cannot have outgoing connections).

### 2. Workflow Execution Engine
The simulation sandbox is powered by a custom execution engine:
- **Topological Sorting**: Uses **Kahn's Algorithm** to determine a valid linear execution order, ensuring all dependencies are met before a node "fires".
- **Branching & Decisions**: Implements logical resolution for "Approval" nodes. The engine evaluates thresholds and edge labels to determine which path (Approve vs. Reject) the simulator should follow.
- **Failure Simulation**: Nodes can trigger failure states (e.g., approval below threshold), causing the engine to skip downstream branches or halt execution path-wise.

---

## 🏗 Modular Architecture

### Component Breakdown
- **`Designer.tsx`**: The orchestrator. Manages layout, global toolbar, and workspace state.
- **`WorkflowCanvas.tsx`**: Pure React Flow integration. Handles node rendering, connections, and drag logic.
- **`NodeRegistry`**: A pattern where each node type is mapped to its visual component and configuration form.
- **`WorkflowStore`**: Centralized state management using Zustand, handling nodes, edges, history, and simulation results.

---

## 🛠 Tech Stack Deep Dive

- **React Flow**: High-performance node-graph engine.
- **Zustand**: Minimalist state management with middleware for state snapshots (Undo/Redo).
- **MSW (Mock Service Worker)**: Intercepts network requests at the browser level, allowing the prototype to function in production without a live backend.
- **Tailwind CSS**: Utility-first styling for the "Zinc" design system.
- **Dagre**: Handles complex graph layout mathematics.

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Shashikumar-ezhilarasu/HR-Workflow-Design.git
cd HR-workflow

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## 🔮 Roadmap

1.  **Persistence**: Integration with PostgreSQL/Supabase for real-time cloud storage.
2.  **Templates**: A library of pre-defined workflow templates (Standard Onboarding, Annual Review, etc.).
3.  **Real-time Collaboration**: WebSocket integration for multi-user canvas editing.
4.  **Action Hooks**: Ability to trigger real webhooks (e.g., Slack notifications) during simulation.

---

**Built by Shashikumar Ezhilarasu**  
*AI Agentic Engineering - Tredence Studio*
