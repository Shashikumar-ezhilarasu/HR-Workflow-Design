import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Target, 
  Code2, 
  Cpu, 
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
              <Target className="w-3.5 h-3.5" /> 2025 AI Engineering Cohort
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight mb-8">
              SOTA AI Agentic <br/><span className="text-primary-600">Engineering.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Role</p>
                <p className="text-sm font-bold text-gray-900">Full Stack Intern</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Location</p>
                <p className="text-sm font-bold text-gray-900">Bengaluru</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Duration</p>
                <p className="text-sm font-bold text-gray-900">6 - 12 Months</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1 tracking-widest">Stipend</p>
                <p className="text-sm font-bold text-gray-900">30k / Month</p>
              </div>
            </div>
          </motion.div>

          {/* Mission Content */}
          <section className="prose prose-lg max-w-none text-gray-600 mb-20">
            <h3 className="text-3xl font-black text-gray-900 mb-6">About Tredence Studio</h3>
            <p className="leading-relaxed mb-6">
              At Tredence Studio, we are not just following trends; we are building the future of AI. We are developing State-of-the-Art (SOTA) capabilities in AI Agentic Engineering to build a paradigm-shifting platform from the ground up. 
            </p>
            <p className="leading-relaxed font-medium text-gray-900 bg-primary-50 px-6 py-4 rounded-2xl border-l-4 border-primary-600">
              We are looking for an elite Full Stack Engineering Intern who is ready to move beyond coursework and solve complex, real-world problems. This is a zero-to-one role, and you will be a core contributor to a product built to challenge industry leaders.
            </p>
          </section>

          {/* Opportunity Section */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white shadow-xl">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-black text-gray-900">The Opportunity</h3>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed mb-10">
              This is not a typical internship. You will not be on the sidelines. You will be in the trenches with a team of expert engineers, tackling difficult architectural and product challenges. You will gain deep, hands-on mastery of the entire development lifecycle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Frontend Mastery', desc: 'Architecting scalable components in React and TypeScript.' },
                { title: 'Backend Performance', desc: 'Engineering high-performance Python backends.' },
                { title: 'Cloud Native', desc: 'Deploying on robust Kubernetes infrastructure.' },
                { title: 'Relentless Drive', desc: 'We seek passion for building truly exceptional software.' }
              ].map((item, i) => (
                <div key={i} className="p-6 border border-gray-100 rounded-3xl hover:border-primary-200 hover:bg-primary-50/30 transition-all group">
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{item.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Responsibilities Section */}
          <section className="mb-20 bg-gray-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px]" />
            <h3 className="text-3xl font-black mb-12 flex items-center gap-4">
              <Code2 className="w-8 h-8 text-primary-500" /> Core Responsibilities
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Architect and Develop', text: 'Design, build, and scale critical features across React, Next.js, and FastAPI.' },
                { title: 'Master Clean Architecture', text: 'Implement elite standards including strong typing and modular design.' },
                { title: 'Engineer Advanced UIs', text: 'Build highly responsive, reusable, and pixel-perfect components.' },
                { title: 'Build Robust Backends', text: 'Design complex APIs and high-throughput integration workflows (PostgreSQL/Firestore).' },
                { title: 'Implement Real-Time Systems', text: 'Optimize features using WebSockets and Server-Sent Events (SSE).' },
                { title: 'Secure and Deploy', text: 'Manage OAuth/OIDC/JWT with Azure and deploy on cloud-native Kubernetes.' },
                { title: 'Own Code Quality', text: 'Drive quality through Jest/RTL unit tests and Cypress/Playwright E2E tests.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all">
                  <span className="text-primary-500 font-black text-lg">0{i+1}</span>
                  <div>
                    <h5 className="font-bold mb-1 text-primary-400">{item.title}</h5>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Requirements Section */}
          <section className="mb-20">
            <h3 className="text-3xl font-black text-gray-900 mb-10">Required Skills & Qualifications</h3>
            <div className="space-y-6">
              {[
                'Pursuing or completed B.S., M.S., or Ph.D. in Computer Science or quantitative field.',
                'High-level proficiency in React, TypeScript, and Python with a strong portfolio.',
                'Deep understanding of CS fundamentals (DSA, OS, Computer Networks).',
                'Strong foundation in modern web technologies including HTML, CSS (Tailwind).',
                'Provable passion for zero-to-one product development and building from scratch.',
                'Excellent problem-solving abilities and structured, analytical debugging.'
              ].map((skill, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-gray-700 font-medium">{skill}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Case Study Section */}
          <section className="mb-20 border-2 border-primary-100 rounded-[3rem] p-10 md:p-16">
            <div className="inline-block px-4 py-1 bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
              Internship Trial
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-8">Case Study: HR Workflow Designer</h3>
            <p className="text-lg text-gray-500 mb-12 leading-relaxed">
              Design and implement a mini-HR Workflow Designer module where an HR admin can visually create and test internal workflows like onboarding or leave approval.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Workflow className="w-5 h-5 text-primary-600" /> Functional Core
                </h4>
                <ul className="space-y-4 text-gray-600 text-sm font-medium">
                  <li>• React Flow Canvas with drag-and-drop</li>
                  <li>• Start, Task, Approval, Automated, and End Nodes</li>
                  <li>• Edge connection and auto-validation constraints</li>
                  <li>• Node configuration / property editing forms</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Layers className="w-5 h-5 text-primary-600" /> Technical Architecture
                </h4>
                <ul className="space-y-4 text-gray-600 text-sm font-medium">
                  <li>• Modular React architecture with clean separation</li>
                  <li>• Mock API Layer (GET /automations, POST /simulate)</li>
                  <li>• Workflow Sandbox Simulation with execution logs</li>
                  <li>• Type-safe interfaces for graph nodes</li>
                </ul>
              </div>
            </div>

            <div className="mt-16 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
              <h4 className="font-black text-gray-900 mb-4 uppercase tracking-tighter">Assessment Criteria</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {['React Flow Proficiency', 'Hooks & State', 'Form Handling', 'Mock APIs', 'Scalability', 'Delivery Speed'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-600" />
                    <span className="text-sm font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Apply Section */}
          <section className="text-center bg-primary-600 rounded-[3rem] p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400/20 to-transparent" />
            <h3 className="text-4xl font-black mb-6 relative z-10">Ready to build the future?</h3>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto relative z-10">
              If you have the depth, passion, and discipline to work on frontier AI systems, we'd love to see your application.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
              <a href="mailto:shashikumarezhilarasu@gmail.com" className="px-12 py-5 bg-white text-primary-600 text-lg font-black rounded-2xl shadow-2xl hover:bg-gray-50 transition-all flex items-center gap-3">
                <MessageSquare className="w-5 h-5" /> Submit Application
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="px-12 py-5 bg-primary-700 text-white text-lg font-black rounded-2xl hover:bg-primary-800 transition-all flex items-center gap-3 border border-white/20">
                <FileText className="w-5 h-5" /> View Project Code
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
