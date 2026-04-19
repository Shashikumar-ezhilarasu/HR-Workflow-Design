import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Workflow,
  MessageSquare,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Documentation() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary-100 selection:text-primary-900">
      {/* Premium Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-1.5 bg-primary-600 rounded-lg shadow-sm">
              <Workflow className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              Tredence <span className="text-primary-600 font-medium">Studio</span>
            </h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/designer" className="text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">Designer</Link>
            <span className="text-sm font-bold text-primary-600">Documentation</span>
          </nav>
          <Link to="/designer" className="px-5 py-2 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-black transition-all">
            Launch Platform
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full text-primary-600 text-xs font-bold uppercase tracking-wider mb-6">
              Project Specification
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-8">
              HR Workflow <br/><span className="text-primary-600">Designer Module.</span>
            </h2>
            <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
              <p className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-widest text-[10px] text-gray-400">Project Objective</p>
              <p className="text-gray-600 leading-relaxed font-medium">
                Design and implement a mini–HR Workflow Designer module where an HR admin can visually create and test internal workflows such as onboarding, leave approval, or document verification.
              </p>
            </div>
          </motion.div>

          {/* Core Competencies */}
          <section className="mb-20">
            <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-widest text-primary-600">Proving Capabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Deep knowledge of React and React Flow',
                'Ability to architect modular, scalable systems',
                'Ability to integrate mock API layers',
                'Configurable nodes with custom forms',
                'Simulation / Sandbox testing environment'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-primary-600" />
                  <span className="text-sm font-bold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Functional Requirements */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Workflow className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 uppercase">Functional Requirements</h3>
            </div>
            
            <div className="space-y-12">
              {/* Requirement 1 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black text-primary-500 bg-primary-50 px-3 py-1 rounded-full uppercase">01</span>
                  <h4 className="text-xl font-bold text-gray-900">Workflow Canvas (React Flow)</h4>
                </div>
                <div className="pl-11 space-y-4 text-gray-600">
                  <p className="text-sm font-medium">A drag-and-drop workspace featuring specialized HR node types:</p>
                  <ul className="grid grid-cols-2 gap-3">
                    {['Start Node', 'Task Node', 'Approval Node', 'Automated Step Node', 'End Node'].map(node => (
                      <li key={node} className="text-sm border-l-2 border-gray-200 pl-3 py-1">{node}</li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium pt-2">Supported Actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {['Drag/Drop', 'Edge Connections', 'Selection', 'Deletion', 'Auto-Validation'].map(action => (
                      <span key={action} className="text-[10px] font-black bg-gray-100 px-2 py-1 rounded uppercase">{action}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Requirement 2 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black text-primary-500 bg-primary-50 px-3 py-1 rounded-full uppercase">02</span>
                  <h4 className="text-xl font-bold text-gray-900">Node Configuration Panel</h4>
                </div>
                <div className="pl-11 space-y-6">
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">
                    Integrated property panels appearing on node selection, featuring dynamic forms, controlled components, and clean state handling.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 bg-gray-900 rounded-[2rem] text-white">
                      <p className="text-[10px] font-black text-primary-500 mb-3 tracking-widest uppercase">Required Data Models</p>
                      <ul className="space-y-3 text-[11px] font-medium opacity-80">
                        <li>• Metadata key-values (Start)</li>
                        <li>• Assignee & Due Date (Task)</li>
                        <li>• Role-based Routing (Approval)</li>
                        <li>• Action Parameters (Automated)</li>
                        <li>• End / Summary Toggles (End)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirement 3 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black text-primary-500 bg-primary-50 px-3 py-1 rounded-full uppercase">03</span>
                  <h4 className="text-xl font-bold text-gray-900">Mock API Integration</h4>
                </div>
                <div className="pl-11 space-y-4">
                  <p className="text-sm text-gray-600 font-medium">
                    Lightweight API layer (Mock Service Worker) supporting:
                  </p>
                  <div className="flex flex-col gap-3">
                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                      <p className="text-xs font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-primary-600 font-mono">GET</span> /automations
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1">Retrieves dynamic automated actions (emails, document generation, etc.)</p>
                    </div>
                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl">
                      <p className="text-xs font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-primary-600 font-mono">POST</span> /simulate
                      </p>
                      <p className="text-[11px] text-gray-500 mt-1">Accepts workflow structure and returns execution logs.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirement 4 */}
              <div className="group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black text-primary-500 bg-primary-50 px-3 py-1 rounded-full uppercase">04</span>
                  <h4 className="text-xl font-bold text-gray-900">Sandbox Simulation Panel</h4>
                </div>
                <div className="pl-11 space-y-4 text-gray-600 text-sm font-medium">
                  <p>A testing terminal designed to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">• Serialize entire workflow graph state</li>
                    <li className="flex items-center gap-2">• Display step-by-step execution timeline</li>
                    <li className="flex items-center gap-2">• Validate structure (cycles, missing connections)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Non-Functional / Architecture */}
          <section className="mb-20 bg-gray-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px]" />
            <h3 className="text-3xl font-black mb-12 flex items-center gap-4 uppercase">
              <Layers className="w-8 h-8 text-primary-500" /> Architecture Expectations
            </h3>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Beyond functionality, the prototype will be evaluated on architectural clarity and enterprise-grade patterns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Clean Directory Structure', text: 'Strict separation of canvas, node, and API logic.' },
                { title: 'Scalable Abstractions', text: 'Design that effortlessly accommodates new node types.' },
                { title: 'Type Integrity', text: 'Comprehensive interfaces for every workflow entity.' },
                { title: 'Custom Hooks', text: 'Encapsulating complex sidebar and simulation state.' },
                { title: 'Thoughtful Decomposition', text: 'Modular components following SOLID principles.' }
              ].map((item, i) => (
                <div key={i} className="p-6 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                  <h5 className="font-bold mb-1 text-primary-400">{item.title}</h5>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bonus Potential */}
          <section className="mb-20">
            <h3 className="text-2xl font-black text-gray-900 mb-8 uppercase tracking-tighter">Bonus Features Supported</h3>
            <div className="flex flex-wrap gap-3">
              {['Export/Import JSON', 'Node Templates', 'Undo/Redo', 'Mini-map / Zoom', 'Visual Validation Errors', 'Auto-Layout'].map(bonus => (
                <div key={bonus} className="px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-500 hover:border-primary-600 hover:text-primary-600 transition-all cursor-default">
                  {bonus}
                </div>
              ))}
            </div>
          </section>

          {/* Deliverables Section */}
          <section className="text-center bg-primary-600 rounded-[3rem] p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-transparent" />
            <h3 className="text-4xl font-black mb-6 relative z-10">Project Deliverables</h3>
            <p className="text-lg text-white/80 mb-12 max-w-2xl mx-auto relative z-10">
              The finalized repository includes the React application (Vite), React Flow canvas with custom nodes, dynamic editing forms, mock API integration, and the workflow testing sandbox.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
              <a href="mailto:shashikumarezhilarasu@gmail.com" className="px-12 py-5 bg-white text-primary-600 text-lg font-black rounded-2xl shadow-2xl hover:bg-gray-50 transition-all flex items-center gap-3">
                <MessageSquare className="w-5 h-5" /> Request Full Specs
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="px-12 py-5 bg-primary-700 text-white text-lg font-black rounded-2xl hover:bg-primary-800 transition-all flex items-center gap-3 border border-white/20">
                <FileText className="w-5 h-5" /> Browse Source Code
              </a>
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-white py-12 px-8 border-t border-gray-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Workflow className="w-5 h-5 text-primary-600" />
          <span className="font-bold text-gray-900 uppercase tracking-tighter">Tredence Studio — AI Agents Engineering Team</span>
        </div>
        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">© 2026 Tredence Analytics. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
