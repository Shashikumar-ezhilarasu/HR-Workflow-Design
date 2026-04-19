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
