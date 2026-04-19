import { ReactFlowProvider } from 'reactflow';
import { NodePalette } from '../components/sidebar/NodePalette';
import { WorkflowCanvas } from '../components/canvas/WorkflowCanvas';
import { NodeFormPanel } from '../components/forms/NodeFormPanel';
import { SandboxPanel } from '../components/sandbox/SandboxPanel';
import { Workflow, Undo2, Redo2, LayoutDashboard, Save, ArrowLeft, Sun, Moon, PanelRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWorkflowStore } from '@/store/workflowStore';
import { getLayoutedElements } from '@/utils/layout';
import { LeftSidebar } from '../components/layout/LeftSidebar';
import { RightSidebar } from '../components/layout/RightSidebar';
import { downloadWorkflowJSON, importWorkflowFromJSON } from '@/utils/serializer';
import { useRef } from 'react';
import { WorkflowNode, Edge } from 'reactflow';
import { sampleWorkflow } from '@/api/mockData';

export function Designer() {
  const undo = useWorkflowStore(state => state.undo);
  const redo = useWorkflowStore(state => state.redo);
  const past = useWorkflowStore(state => state.past);
  const future = useWorkflowStore(state => state.future);
  const nodes = useWorkflowStore(state => state.nodes);
  const edges = useWorkflowStore(state => state.edges);
  const applyAutoLayout = useWorkflowStore(state => state.applyAutoLayout);
  
  const theme = useWorkflowStore(state => state.theme);
  const toggleTheme = useWorkflowStore(state => state.toggleTheme);
  const isRightSidebarOpen = useWorkflowStore(state => state.isRightSidebarOpen);
  const toggleRightSidebar = useWorkflowStore(state => state.toggleRightSidebar);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const setNodes = useWorkflowStore(state => state.setNodes);
  const setEdges = useWorkflowStore(state => state.setEdges);
  const resetWorkflow = useWorkflowStore(state => state.resetWorkflow);

  const handleAutoLayout = () => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
    applyAutoLayout(layoutedNodes, layoutedEdges);
  };

  const handleExport = () => {
    downloadWorkflowJSON(nodes, edges, 'hr-workflow-export.json');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      try {
        const { nodes, edges } = importWorkflowFromJSON(content);
        setNodes(nodes);
        setEdges(edges);
      } catch (err) {
        alert('Failed to import workflow. Please check the file format.');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const handleReset = () => {
    if (confirm('Clear entire workflow canvas? This action cannot be undone.')) {
      resetWorkflow();
    }
  };

  const loadSample = () => {
    if (confirm('Load sample onboarding workflow? This will replace your current work.')) {
      setNodes(sampleWorkflow.nodes as WorkflowNode[]);
      setEdges(sampleWorkflow.edges as Edge[]);
    }
  };


  return (
    <div className={`h-screen w-full flex font-sans overflow-hidden ${theme === 'dark' ? 'bg-[#13131a]' : 'bg-gray-100'}`}>
      {/* Left Application Navigation */}
      <LeftSidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Workspace Top Toolbar */}
        <header className={`${theme === 'dark' ? 'bg-[#1e1e2d] border-[#2a2a3c]' : 'bg-white border-gray-200'} border-b px-6 py-3 flex items-center justify-between shadow-sm z-10 w-full h-[60px] transition-colors duration-200`}>
          <div className="flex items-center gap-4">
            <Link to="/" className={`p-2 rounded-full transition-colors hidden sm:block ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#2a2a3c]' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}>
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className={`flex items-center gap-3 border-l pl-4 ${theme === 'dark' ? 'border-[#2a2a3c]' : 'border-gray-200'}`}>
              <div className="p-1.5 bg-gradient-to-br from-primary-600 to-primary-400 rounded shadow-sm">
                <Workflow className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className={`text-[15px] font-semibold leading-tight ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Automation Flow</h1>
                <span className={`text-xs font-medium px-2 py-0.5 rounded uppercase tracking-wider ${theme === 'dark' ? 'text-gray-500 bg-[#2a2a3c]' : 'text-gray-600 bg-gray-100'}`}>
                  Draft
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme & Sidebar Toggles */}
            <div className="flex items-center gap-1 mr-2">
              <button 
                onClick={toggleTheme}
                className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-warning hover:bg-[#2a2a3c]' : 'text-gray-500 hover:text-primary-600 hover:bg-gray-100'}`}
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
              </button>
              <button 
                onClick={toggleRightSidebar}
                className={`p-1.5 rounded-md transition-colors ${isRightSidebarOpen ? (theme === 'dark' ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-50 text-blue-600') : (theme === 'dark' ? 'text-gray-400 hover:bg-[#2a2a3c]' : 'text-gray-500 hover:bg-gray-100')}`}
                title="Toggle Right Sidebar"
              >
                <PanelRight className="w-4 h-4" />
              </button>
            </div>

            <div className={`flex items-center rounded-lg border p-0.5 ${theme === 'dark' ? 'bg-[#2a2a3c] border-[#3f3f5a]' : 'bg-gray-50 border-gray-200'}`}>
              <button 
                onClick={undo}
                disabled={past.length === 0}
                className={`p-1.5 rounded shadow-sm disabled:opacity-40 disabled:hover:bg-transparent transition-all ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#3f3f5a]' : 'text-gray-600 hover:text-primary-600 hover:bg-white'}`}
                title="Undo"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button 
                onClick={redo}
                disabled={future.length === 0}
                className={`p-1.5 rounded shadow-sm disabled:opacity-40 disabled:hover:bg-transparent transition-all ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#3f3f5a]' : 'text-gray-600 hover:text-primary-600 hover:bg-white'}`}
                title="Redo"
              >
                <Redo2 className="w-4 h-4" />
              </button>
              <div className={`w-px h-4 mx-1 ${theme === 'dark' ? 'bg-[#3f3f5a]' : 'bg-gray-300'}`}></div>
              <button 
                onClick={handleAutoLayout}
                className={`p-1.5 rounded shadow-sm transition-all flex items-center gap-1 px-3 ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#3f3f5a]' : 'text-gray-600 hover:text-primary-600 hover:bg-white'}`}
                title="Auto Layout"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="text-xs font-semibold">Organize</span>
              </button>
            </div>

            <div className={`flex items-center rounded-lg border p-0.5 ${theme === 'dark' ? 'bg-[#2a2a3c] border-[#3f3f5a]' : 'bg-gray-50 border-gray-200'}`}>
              <button 
                onClick={handleExport}
                className={`p-1.5 rounded shadow-sm transition-all flex items-center gap-1 px-3 ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#3f3f5a]' : 'text-gray-600 hover:text-primary-600 hover:bg-white'}`}
                title="Export JSON"
              >
                <Save className="w-4 h-4" />
                <span className="text-xs font-semibold">Export</span>
              </button>
              <button 
                onClick={handleImportClick}
                className={`p-1.5 rounded shadow-sm transition-all flex items-center gap-1 px-3 ${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-[#3f3f5a]' : 'text-gray-600 hover:text-primary-600 hover:bg-white'}`}
                title="Import JSON"
              >
                <div className="rotate-180"><Save className="w-4 h-4" /></div>
                <span className="text-xs font-semibold">Import</span>
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".json"
              />
            </div>

            <button 
              onClick={loadSample}
              className={`px-4 py-1.5 text-xs font-semibold border rounded-lg shadow-sm transition-all flex items-center gap-2 ${theme === 'dark' ? 'bg-[#2a2a3c] text-white border-[#3f3f5a] hover:bg-[#3f3f5a]' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" /> Sample
            </button>
            <button 
              onClick={handleReset}
              className="px-4 py-1.5 bg-red-600/10 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg shadow-sm hover:bg-red-600/20 transition-all flex items-center gap-2 border border-red-600/20"
            >
              Reset
            </button>
            <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-all flex items-center gap-2 border border-blue-500">
              Publish
            </button>
          </div>
        </header>

        {/* Canvas & Modals Area */}
        <div className={`flex-1 flex overflow-hidden relative ${theme === 'dark' ? 'bg-[#13131a]' : 'bg-[#f9fafb]'}`}>
          <ReactFlowProvider>
            <NodePalette />
            <WorkflowCanvas />
            <NodeFormPanel />
            <SandboxPanel />
          </ReactFlowProvider>
        </div>
      </div>

      {/* Right Analytical View */}
      {isRightSidebarOpen && <RightSidebar />}
    </div>
  );
}
