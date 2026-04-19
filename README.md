# Tredence Studio - AI Agentic Engineering

A production-ready, full-stack HR workflow designer built with React, TypeScript, and React Flow. This application allows HR admins to visually design, configure, and test internal workflows such as onboarding, leave approval, and document verification.

## 🚀 Live Demo

[Add your deployed URL here]

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)
- [What's Completed](#whats-completed)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Core Functionality

- **Visual Workflow Canvas**: Drag-and-drop interface powered by React Flow
- **5 Node Types**: Start, Task, Approval, Automated Step, and End nodes
- **Dynamic Node Configuration**: Editable forms for each node type with validation
- **Mock API Integration**: Simulated backend with MSW (Mock Service Worker)
- **Workflow Testing**: Built-in sandbox for simulating workflow execution
- **Graph Validation**: Real-time validation for cycles, orphaned nodes, and structure
- **Export/Import**: Download workflows as JSON for persistence

### Node Types

1. **Start Node** - Workflow entry point with metadata support
2. **Task Node** - Human task assignment with assignee, due dates, and custom fields
3. **Approval Node** - Manager/HR approval with role-based routing and auto-approval thresholds
4. **Automated Step Node** - System-triggered actions (emails, document generation, etc.)
5. **End Node** - Workflow completion with custom messages and summary options

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | React 18 + TypeScript | Type-safe UI components |
| **Build Tool** | Vite | Lightning-fast development |
| **Canvas** | React Flow v11 | Node graph visualization |
| **State** | Zustand | Lightweight global state |
| **Styling** | Tailwind CSS | Utility-first styling |
| **Forms** | React Hook Form | Performant form handling |
| **Validation** | Zod | Type-safe schema validation |
| **Mock API** | MSW v2 | Service worker-based mocking |
| **Icons** | Lucide React | Modern icon library |

## 🏗 Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────┐
│                      User Interface                      │
├─────────────┬──────────────────────┬───────────────────┤
│   Sidebar   │    Canvas (React     │   Configuration   │
│  (Palette)  │         Flow)        │      Panel        │
└─────────────┴──────────────────────┴───────────────────┘
                          ↓
                  Zustand Store
                  (Global State)
                          ↓
        ┌─────────────────┴─────────────────┐
        ↓                                    ↓
    Mock API (MSW)                      Utilities
    - /automations                      - Validators
    - /simulate                         - Serializers
    - /nodeFactory
```

### State Management

The application uses **Zustand** for clean, minimal state management:

```typescript
interface WorkflowStore {
  nodes: WorkflowNode[];           // All nodes in the canvas
  edges: Edge[];                   // Connections between nodes
  selectedNodeId: string | null;   // Currently selected node for editing
  
  // Operations
  addNode, updateNodeData, deleteNode
  onNodesChange, onEdgesChange, onConnect
  selectNode, resetWorkflow
}
```

### Component Architecture

**Registry Pattern** for extensibility - adding a new node type requires only:
1. Add type to `types/workflow.ts`
2. Create node component in `components/nodes/`
3. Create form component in `components/forms/`
4. Register in node types object

**Separation of Concerns**:
- `/components/nodes/` - Visual node representations
- `/components/forms/` - Node configuration forms
- `/components/canvas/` - React Flow integration
- `/components/sidebar/` - Node palette
- `/components/sandbox/` - Testing panel
- `/store/` - Global state
- `/utils/` - Pure functions (validation, serialization)
- `/api/` - Mock backend

### Data Flow

```
1. User drags node from palette
   → onDrop handler
   → nodeFactory creates default node
   → Zustand addNode
   → React Flow renders

2. User clicks node
   → selectNode(id)
   → NodeFormPanel renders correct form
   → Form changes trigger updateNodeData
   → Node re-renders with new data

3. User clicks "Test Workflow"
   → serializeWorkflow(nodes, edges)
   → POST /api/simulate (MSW intercepts)
   → Returns execution steps
   → SandboxPanel displays results
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd hr-workflow-designer

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### Building for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
hr-workflow-designer/
├── src/
│   ├── api/
│   │   ├── browser.ts           # MSW browser setup
│   │   ├── handlers.ts          # API route handlers
│   │   └── mockData.ts          # Mock automation actions
│   ├── components/
│   │   ├── canvas/
│   │   │   └── WorkflowCanvas.tsx
│   │   ├── nodes/               # Custom node components
│   │   │   ├── StartNode.tsx
│   │   │   ├── TaskNode.tsx
│   │   │   ├── ApprovalNode.tsx
│   │   │   ├── AutomatedStepNode.tsx
│   │   │   └── EndNode.tsx
│   │   ├── forms/               # Node configuration forms
│   │   │   ├── NodeFormPanel.tsx
│   │   │   ├── StartNodeForm.tsx
│   │   │   ├── TaskNodeForm.tsx
│   │   │   ├── ApprovalNodeForm.tsx
│   │   │   ├── AutomatedStepForm.tsx
│   │   │   └── EndNodeForm.tsx
│   │   ├── sidebar/
│   │   │   └── NodePalette.tsx
│   │   └── sandbox/
│   │       └── SandboxPanel.tsx
│   ├── hooks/
│   │   ├── useAutomations.ts    # Fetch automation actions
│   │   └── useSimulate.ts       # Workflow simulation
│   ├── store/
│   │   └── workflowStore.ts     # Zustand state management
│   ├── types/
│   │   └── workflow.ts          # TypeScript interfaces
│   ├── utils/
│   │   ├── nodeFactory.ts       # Create default nodes
│   │   ├── graphValidator.ts    # Cycle detection, validation
│   │   └── serializer.ts        # JSON export
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 💡 Design Decisions

### Why Zustand over Redux/Context?

- **Simplicity**: No boilerplate, no providers, no reducers
- **Performance**: Minimal re-renders with selective subscriptions
- **DevEx**: Clean API, excellent TypeScript support
- **Bundle Size**: ~1KB vs Redux's ~10KB

### Why MSW for Mocking?

- **Realistic**: Intercepts actual fetch calls, not import-time mocks
- **Reusable**: Same handlers work in development, testing, and Storybook
- **Network-agnostic**: Works with any HTTP client (fetch, axios, etc.)

### Why React Hook Form?

- **Performance**: Uncontrolled components reduce re-renders
- **DX**: Simple API, built-in validation
- **Bundle Size**: Lightweight compared to Formik

### Validation Strategy

**Two-tier validation**:
1. **Form-level**: React Hook Form + Zod for field validation
2. **Graph-level**: Custom validators for workflow structure (cycles, orphans, start/end nodes)

### Node Component Pattern

Each node is a **controlled component** that:
- Receives data via props
- Displays visually distinct styles based on type
- Uses React Flow's Handle components for connections
- Responds to selection state

## ✅ What's Completed

### Core Requirements

- [x] React Flow canvas with drag-and-drop
- [x] 5 custom node types with visual differentiation
- [x] Node configuration forms with dynamic fields
- [x] Mock API layer (GET /automations, POST /simulate)
- [x] Workflow testing sandbox with execution visualization
- [x] Graph validation (cycles, orphans, structure)
- [x] Clean folder structure and architecture
- [x] TypeScript throughout with strict types
- [x] Responsive design with Tailwind CSS

### Bonus Features Implemented

- [x] Export workflow as JSON
- [x] Real-time validation feedback
- [x] MiniMap for canvas navigation
- [x] Zoom controls and pan
- [x] Delete node functionality
- [x] Visual execution step log
- [x] Metadata and custom fields support
- [x] Auto-save form changes (onBlur)

## 🚀 Future Enhancements

If given more time, I would add:

### High Priority

- **Undo/Redo**: Command pattern for action history
- **Import JSON**: Load saved workflows from file
- **Node Templates**: Pre-configured node presets
- **Auto-layout**: Dagre/ELK for automatic node positioning
- **Keyboard Shortcuts**: Delete (Backspace), Select All (Cmd+A)

### Medium Priority

- **Backend Integration**: Replace MSW with real API
- **Database Persistence**: Save workflows to PostgreSQL
- **User Authentication**: OAuth/JWT integration
- **Workflow Versioning**: Git-like version control
- **Collaboration**: Real-time multi-user editing (Socket.io)

### Low Priority

- **Theme Switching**: Dark mode support
- **Node Search**: Filter/search nodes in large workflows
- **Accessibility**: ARIA labels, keyboard navigation
- **Unit Tests**: Vitest + React Testing Library
- **E2E Tests**: Playwright for critical paths

## 🐛 Known Limitations

- No backend persistence (state resets on refresh)
- No authentication system
- Simulation is simplistic (doesn't handle complex branching logic)
- No file upload for imports
- Limited mobile responsiveness

## 📝 Notes on Implementation

### Time Management (4-6 hours)

**Time Breakdown**:
- Architecture planning: 30 min
- Setup & config: 30 min
- Core components (nodes, canvas): 90 min
- Forms and state: 90 min
- Mock API and simulation: 45 min
- Testing & refinement: 45 min

### Code Quality

- **TypeScript Strict Mode**: Catch errors at compile time
- **Functional Components**: Hooks-based, no class components
- **Pure Functions**: Utils are side-effect free and testable
- **Controlled Components**: Forms are fully controlled for predictability
- **Error Boundaries**: Would add in production

## 🙏 Acknowledgments

- React Flow for the excellent canvas library
- Zustand for simple state management
- MSW for realistic API mocking
- Tailwind CSS for rapid styling

## 📧 Contact

Shashikumarezhil
shashikumarezhilarasu@gmail.com

---

**Built with ❤️ for Tredence Studio**
