# HR Workflow Designer - Production Prototype

<img width="1582" height="959" alt="Screenshot 2026-04-19 at 1 28 28 PM" src="https://github.com/user-attachments/assets/0633f5b8-f3ab-48b0-92b3-ab15b456c941" />


A sophisticated, production-grade HR Workflow Designer module built as a technical showcase. This platform enables HR administrators to visually architect, configure, and simulate complex internal workflows such as onboarding, leave approvals, and automated document verification.

- **Objective**: Demonstrate expertise in React, React Flow, and modular frontend architecture.
- **Tech Stack**: React 18, TypeScript, React Flow, Zustand, Tailwind CSS, MSW.

---

## 🚀 Vision and Values

This prototype was built with three core principles in mind:
1.  **Architectural Scalability**: Utilizing a registry-based pattern for nodes and forms to allow easy extension.
2.  **User Experience**: A fluid, interactive canvas with real-time feedback and state-of-the-art aesthetics.
3.  **Robustness**: Strict type safety, real-time graph validation, and a simulated backend layer for realistic testing.

---

## ✅ What's Completed (Functional Comparison)

| Requirement | Status | Implementation Details |
| :--- | :---: | :--- |
| **Visual Workflow Canvas** | ✅ | Drag-and-drop powered by React Flow with custom edge logic. |
| **5 Standard Node Types** | ✅ | Start, Task, Approval, Automated Step, and End nodes. |
| **Node Configuration** | ✅ | Dynamic forms with auto-save (onBlur) and complex field validation. |
| **Mock API Layer** | ✅ | MSW integration for `/automations` and `/simulate` endpoints. |
| **Simulation Sandbox** | ✅ | Step-by-step execution timeline with status tracking and detail logs. |
| **Graph Validation** | ✅ | Real-time detection of cycles, orphaned nodes, and structure errors. |
| **Auto-Layout** | ✅ | Intelligent node positioning using the Dagre engine. |
| **Undo/Redo** | ✅ | Command-pattern history management in Zustand. |
| **Export/Import** | ✅ | Full JSON serialization for workflow persistence and portability. |
| **Sample Workflow** | ✅ | One-click "Onboarding Sample" loader for instant demonstration. |
| **Dark Mode** | ✅ | Comprehensive theme support with polished Zinc aesthetics. |

---

## 🏗 Modular Architecture

### Component Breakdown
- **`Designer.tsx`**: The orchestrator. Manages the layout, global toolbar, and workspace state.
- **`WorkflowCanvas.tsx`**: Pure React Flow integration. Handles node rendering, connections, and drag logic.
- **`NodeRegistry`**: A pattern where each node type is mapped to its visual component and configuration form.
- **`WorkflowStore`**: Centralized state management using Zustand, handling nodes, edges, history, and simulation results.

### Data Flow
1.  **Selection**: Clicking a node updates `selectedNodeId` in the store.
2.  **Configuration**: The `NodeFormPanel` detects the type, renders the matching form, and syncs changes via `updateNodeData`.
3.  **Simulation**: The `SandboxPanel` serializes the current graph and sends it to the MSW mock backend, which performs a breadth-first traversal to return execution steps.

---

## 🛠 Tech Stack Deep Dive

- **React Flow**: Used for its mature node-graph capabilities and extensibility.
- **Zustand**: Chosen over Redux for its minimal boilerplate and superior performance with complex objects like nodes.
- **MSW (Mock Service Worker)**: Provides a realistic network layer, making the prototype "API-ready" for real backend integration.
- **Tailwind CSS**: Enables a premium, responsive design with consistent typography and spacing.
- **Dagre**: Handles the complex mathematics of automatic layouting.

---

## 🚦 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [your-repo-link]
cd HR-workflow

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Usage Tips
- **Dragging**: Grab nodes from the left palette and drop them anywhere on the canvas.
- **Connecting**: Drag handles from one node to another to create a dependency.
- **Testing**: Click the **"Sandbox"** tab on the right (if closed, use the toggle in the header) and run the simulation.
- **Exporting**: Use the **"Export"** button in the header to save your work as a JSON file.

---

## 🔮 Roadmap (Next Steps)

If this project were to move into a full production environment:
1.  **Persistence**: Integration with a PostgreSQL database and a Node.js/Python backend.
2.  **Templates**: A library of pre-defined workflow templates for different HR departments.
3.  **Collaboration**: Real-time multi-user editing using WebSockets (yjs or similar).
4.  **Complex Branching**: Implementation of "Split" and "Merge" nodes for non-linear logic.
5.  **A/B Testing**: Testing different workflow versions to optimize HR efficiency.

---

**Built by Shashikumar Ezhilarasu**  
for
*AI Agentic Engineering - Tredence Studio*
