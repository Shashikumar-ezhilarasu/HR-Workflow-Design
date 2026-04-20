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
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🎯 Overview

The **HR Workflow Designer** is a sophisticated visual workflow builder that enables HR administrators to architect, configure, and simulate complex internal workflows such as employee onboarding, leave approvals, and automated document verification. Built as a technical showcase, this platform demonstrates expertise in React architecture, advanced graph algorithms, and modular frontend design.

### What Makes This Special?

- **Graph Theory at its Core**: Real DAG (Directed Acyclic Graph) validation with cycle detection using depth-first search (DFS).
- **Execution Engine**: Topological sort-based simulation using **Kahn's Algorithm** for deterministic workflow execution paths.
- **Production-Ready Prototype**: MSW (Mock Service Worker) enabled in production for a functional demo, Zustand for state management, and full TypeScript coverage.
- **Extensible Registry**: Modular node pattern for seamless addition of new node types (Start, Task, Approval, Automated, End).

---

## 🌟 Vision & Principles

### 1. Architectural Scalability
Utilizing a modular pattern for nodes and configuration forms allows for easy extension. New node types can be integrated by updating the node factory and type definitions without rewriting core canvas logic.

### 2. Algorithmic Integrity
Moving beyond simple UI drag-and-drop to true Graph Theory application. The system enforces DAG constraints, performs reachability analysis (Forward/Backward BFS), and executes workflows using proven computer science algorithms.

### 3. Simulation-First Design
A sandbox that doesn't just "show" steps but executes a logical model of the workflow, complete with conditional branching, approval thresholds, and automated action simulation.

---

## ✨ Features

### Canvas & Visual Design
- ✅ **Visual Workflow Designer** - Drag-and-drop interface powered by React Flow
- ✅ **Custom Node Types** - specialized Start, Task, Approval, Automated, and End nodes
- ✅ **Auto-Layout Engine** - Intelligent positioning using Dagre graph layout
- ✅ **Undo/Redo** - Full history management with state snapshots in Zustand

### Advanced Graph Validation
- ✅ **Cycle Detection** - DFS-based algorithm that traces the exact path of circular dependencies
- ✅ **Reachability Analysis** - Forward BFS from Start node and Backward BFS from End nodes to find orphans and dead-ends
- ✅ **Workflow Health Score** - Real-time weighted metric (0-100%) for structural integrity

### Execution Engine
- ✅ **Topological Sort** - Kahn's Algorithm used to determine valid linear execution order
- ✅ **Conditional Branching** - Resolves approval paths based on thresholds and edge labels
- ✅ **Simulation Sandbox** - Real-time execution timeline with collapsible detail logs

### Configuration & State
- ✅ **Dynamic Node Forms** - Context-aware configuration panels with auto-save (onBlur)
- ✅ **JSON Import/Export** - Full serialization for workflow persistence and portability
- ✅ **Dark/Light Mode** - Polished Zinc design system with theme persistence

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Presentation Layer                         │
│  Designer.tsx • WorkflowCanvas • Node Forms • SandboxPanel  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Business Logic Layer                        │
│  graphValidator.ts • handlers.ts (Exec Engine) • Zustand     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 Data & Integration Layer                     │
│  MSW browser.ts • serializer.ts • Dagre Layout              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 18** | UI framework with concurrent features |
| **TypeScript** | Strict type safety across the entire graph engine |
| **React Flow** | Node-graph visualization engine |
| **Zustand** | Lightweight state management with History (Undo/Redo) |
| **MSW** | API mocking at the network layer (Production-enabled) |
| **Tailwind CSS** | Premium Zinc styling system |
| **Dagre** | Graph layout algorithms |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
HR-workflow/
├── public/                      # Static assets & MSW Worker
├── src/
│   ├── api/                    # Mock API Layer (MSW)
│   │   ├── browser.ts          # Worker setup
│   │   ├── handlers.ts         # Simulation Engine & API Logic
│   │   └── mockData.ts         # Initial templates
│   ├── components/             # React Components
│   │   ├── canvas/             # Flow canvas & layout
│   │   ├── forms/              # Dynamic configuration forms
│   │   ├── layout/             # Sidebar & structure
│   │   ├── nodes/              # Custom node templates
│   │   ├── sandbox/            # Timeline & simulation panel
│   │   ├── sidebar/            # Node palette
│   │   └── ui/                 # Reusable primitives
│   ├── hooks/                  # Custom React hooks
│   │   ├── useSimulate.ts      # Simulation orchestration
│   │   └── useAutomations.ts   # Action fetching
│   ├── pages/                  # Top-level views (Designer, Home)
│   ├── store/                  # Zustand state (workflowStore.ts)
│   ├── types/                  # Unified TS types (workflow.ts)
│   ├── utils/                  # Core Algorithms & Utilities
│   │   ├── graphValidator.ts   # DFS/BFS Validation logic
│   │   ├── layout.ts           # Dagre layout logic
│   │   ├── nodeFactory.ts      # Component registry
│   │   └── serializer.ts       # JSON Import/Export
│   ├── App.tsx                 # Routing
│   ├── main.tsx               # Entry & MSW Initialization
│   └── index.css              # Global styles & Zinc theme
└── package.json
```

---

## 🧮 Core Algorithms

### 1. Cycle Detection & Path Tracking
**Location**: `src/utils/graphValidator.ts`

Uses an iterative DFS with a color-coding scheme (WHITE/GRAY/BLACK) to not only detect cycles but reconstruct the exact path causing the circular dependency.

### 2. Topological Sort (Kahn's Algorithm)
**Location**: `src/api/handlers.ts`

The execution engine determines the correct execution sequence by calculating in-degrees of all nodes and processing them via a queue-based BFS.

### 3. Reachability Analysis
**Location**: `src/utils/graphValidator.ts`

- **Forward BFS**: Identifies nodes unreachable from the "Start" node.
- **Backward BFS**: Identifies nodes that can never reach an "End" node (dead-ends).

### 4. Workflow Health Score
**Location**: `src/utils/graphValidator.ts`

Calculates a weighted 0-100 score based on total errors (cycles, missing starts) and warnings (orphans, dead-ends) to provide instant user feedback.

---

## 📡 API Documentation

The application uses **Mock Service Worker (MSW)** to handle logic as if a backend were present.

#### POST `/api/simulate`
Takes a `WorkflowGraph` and returns a `SimulationResult` containing:
- `steps`: Array of execution updates with duration and status.
- `branchDecisions`: Record of which paths were taken at approval forks.
- `executionPath`: Sequential IDs of traversed nodes.

---

## 🗺 Roadmap

1.  **Persistence**: Integration with Supabase/PostgreSQL.
2.  **Templates**: Pre-defined onboarding patterns.
3.  **Action Hooks**: Real webhook integration (Slack/Discord notifications).
4.  **AI Insights**: Auto-suggestion for workflow optimization.

---

**Built by Shashikumar Ezhilarasu**  
*AI Agentic Engineering - Tredence Studio*
