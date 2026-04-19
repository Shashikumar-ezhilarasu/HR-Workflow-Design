import { AutomationAction } from '@/types/workflow';

export const mockAutomations: AutomationAction[] = [
  {
    id: 'send_email',
    label: 'Send Email',
    params: ['to', 'subject', 'body'],
  },
  {
    id: 'generate_doc',
    label: 'Generate Document',
    params: ['template', 'recipient'],
  },
  {
    id: 'create_ticket',
    label: 'Create Support Ticket',
    params: ['priority', 'category', 'description'],
  },
  {
    id: 'send_slack',
    label: 'Send Slack Message',
    params: ['channel', 'message'],
  },
  {
    id: 'update_database',
    label: 'Update Database Record',
    params: ['table', 'recordId', 'fields'],
  },
  {
    id: 'trigger_webhook',
    label: 'Trigger Webhook',
    params: ['url', 'payload'],
  },
];

export const sampleWorkflow = {
  nodes: [
    {
      id: '1',
      type: 'start',
      position: { x: 250, y: 0 },
      data: { label: 'New Hire Onboarding', type: 'start' },
    },
    {
      id: '2',
      type: 'task',
      position: { x: 250, y: 150 },
      data: {
        label: 'Collect Documents',
        type: 'task',
        title: 'Collect ID and Tax Docs',
        assignee: 'HR Operations',
        dueDate: 'Day 1',
        customFields: {},
      },
    },
    {
      id: '3',
      type: 'approval',
      position: { x: 250, y: 300 },
      data: {
        label: 'IT Provisioning Approval',
        type: 'approval',
        title: 'Laptop & Access Approval',
        approverRole: 'IT Manager',
        autoApproveThreshold: 80,
      },
    },
    {
      id: '4',
      type: 'automated',
      position: { x: 250, y: 450 },
      data: {
        label: 'Send Welcome Email',
        type: 'automated',
        title: 'Welcome to Tredence',
        actionId: 'send_email',
      },
    },
    {
      id: '5',
      type: 'end',
      position: { x: 250, y: 600 },
      data: {
        label: 'Onboarding Complete',
        type: 'end',
        endMessage: 'Welcome aboard!',
        showSummary: true,
      },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5' },
  ],
};
