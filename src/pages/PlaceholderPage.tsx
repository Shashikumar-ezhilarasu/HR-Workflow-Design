import { LeftSidebar } from '../components/layout/LeftSidebar';
import { useWorkflowStore } from '@/store/workflowStore';

interface PlaceholderProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderProps) {
  const theme = useWorkflowStore(state => state.theme);
  
  return (
    <div className={`h-screen w-full flex font-sans overflow-hidden ${theme === 'dark' ? 'bg-[#13131a]' : 'bg-gray-100'}`}>
      <LeftSidebar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className={`text-4xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h1>
        <p className={`mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          This page is under construction. Let's head back to <a href="/designer" className="text-blue-500 hover:underline">Workflows</a>.
        </p>
      </div>
    </div>
  );
}
