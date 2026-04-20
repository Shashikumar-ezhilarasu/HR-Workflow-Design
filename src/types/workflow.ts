import { Node, Edge } from 'reactflow';

export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

// Base node data interface
export interface BaseNodeData {
  label: string;
  type: NodeType;
}

// Start Node Data
export interface StartNodeData extends BaseNodeData {
  type: 'start';
  title: string;
  metadata: Record<string, string>;
}

// Task Node Data
export interface TaskNodeData extends BaseNodeData {
  type: 'task';
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  customFields: Record<string, string>;
}

// Approval Node Data
export interface ApprovalNodeData extends BaseNodeData {
  type: 'approval';
  title: string;
  approverRole: string;
  autoApproveThreshold: number;
}

// Automated Step Node Data
export interface AutomatedStepNodeData extends BaseNodeData {
  type: 'automated';
  title: string;
  actionId: string;
  actionParams: Record<string, string>;
}

// End Node Data
export interface EndNodeData extends BaseNodeData {
  type: 'end';
  endMessage: string;
  showSummary: boolean;
}

// Union type for all node data
export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData;

// Workflow node type
export type WorkflowNode = Node<WorkflowNodeData>;

// Automation action from API
export interface AutomationAction {
  id: string;
  label: string;
  params: string[];
}

// Simulation step result
export interface SimulationStep {
  nodeId: string;
  nodeName: string;
  type: NodeType;
  status: 'pending' | 'completed' | 'failed' | 'skipped';
  message: string;
  timestamp: string;
  /** Step-level execution duration in ms */
  durationMs?: number;
  /** Zero-based order in execution */
  stepIndex: number;
  details?: Record<string, string>;
}

/** A branch decision taken during execution (e.g. approval path) */
export interface BranchDecision {
  nodeId: string;
  nodeName: string;
  chosenTargetId: string;
  chosenTargetName: string;
  reason: string;
}

// Simulation result
export interface SimulationResult {
  success: boolean;
  steps: SimulationStep[];
  errors: string[];
  /** Total wall-clock duration in ms */
  durationMs?: number;
  /** Ordered list of node IDs in the critical path */
  executionPath?: string[];
  /** Branching decisions made during execution */
  branchDecisions?: BranchDecision[];
}

// Validation error
export interface ValidationError {
  nodeId?: string;
  message: string;
  severity: 'error' | 'warning';
}

// Workflow graph for serialization
export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: Edge[];
}
