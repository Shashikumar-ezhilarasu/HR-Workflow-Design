import {
  LayoutDashboard,
  ShieldCheck,
  CalendarDays,
  Bot,
  Blocks,
  Database,
  GitMerge,
  Box,
  Users,
  MessageSquare,
  Settings
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navGroups = [
  {
    title: 'General',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { name: 'Compliance', path: '/compliance', icon: <ShieldCheck className="w-4 h-4" /> },
      { name: 'Scheduler', path: '/scheduler', icon: <CalendarDays className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { name: 'Automation', path: '/automation', icon: <Bot className="w-4 h-4" /> },
      { name: 'Integrations', path: '/integrations', icon: <Blocks className="w-4 h-4" /> },
      { name: 'Repository', path: '/repository', icon: <Database className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Operations',
    items: [
      { name: 'Workflows', path: '/designer', icon: <GitMerge className="w-4 h-4" /> },
      { name: 'Resources', path: '/resources', icon: <Box className="w-4 h-4" /> },
      { name: 'Member', path: '/member', icon: <Users className="w-4 h-4" /> },
    ],
  },
  {
    title: 'Inbox',
    items: [
      { name: 'Messages', path: '/messages', icon: <MessageSquare className="w-4 h-4" /> },
    ],
  },
];

export function LeftSidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white dark:bg-[#1e1e2d] text-gray-700 dark:text-gray-300 h-full flex flex-col border-r border-gray-200 dark:border-[#2a2a3c] transition-colors duration-200 shrink-0">
      <div className="p-5 flex items-center gap-3 border-b border-gray-200 dark:border-[#2a2a3c]">
        <div className="w-8 h-8 rounded bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg">
          C
        </div>
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-wide">CodeAuto</h2>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {navGroups.map((group, idx) => (
          <div key={idx} className="mb-6 px-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'hover:bg-gray-100 dark:hover:bg-[#2a2a3c] hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.name === 'Messages' && (
                        <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          13
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-[#2a2a3c] p-4">
        <Link to="/settings" className={`flex items-center gap-3 px-3 py-2 w-full rounded-lg transition-all ${location.pathname === '/settings' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#2a2a3c] hover:text-gray-900 dark:hover:text-white'}`}>
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
}
