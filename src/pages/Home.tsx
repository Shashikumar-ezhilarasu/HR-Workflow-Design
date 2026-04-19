import { Link } from 'react-router-dom';
import { Workflow, Zap, PlayCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Premium Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary-600 to-primary-400 rounded-lg shadow-sm">
            <Workflow className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Tredence <span className="font-light">HR Studio</span>
            </h1>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Features</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Templates</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Integrations</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Sign In</button>
          <Link
            to="/designer"
            className="px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-primary-700 hover:shadow-md transition-all flex items-center gap-2"
          >
            Open Designer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <section className="relative px-6 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <motion.div 
            className="relative z-10 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-50 text-primary-600 text-sm font-semibold mb-6 border border-primary-100">
              Introducing Visual Workflow Automation
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Design enterprise HR workflows <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">in minutes.</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Empower your HR teams to build, test, and deploy complex processes visually. No coding required. Scale onboarding, approvals, and automations infinitely.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <Link
                to="/designer"
                className="px-8 py-4 bg-gray-900 text-white text-base font-semibold rounded-xl shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
              >
                Start Designing Free
              </Link>
              <button className="px-8 py-4 bg-white text-gray-700 text-base font-semibold border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" /> View Demo
              </button>
            </div>
          </motion.div>
        </section>

        {/* Features Preview */}
        <section className="bg-white py-24 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <motion.div 
                className="space-y-4"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  <Workflow className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Drag & Drop Editor</h3>
                <p className="text-gray-600 leading-relaxed">
                  Intuitive canvas to map out your processes visually. Connect tasks, approvals, and automated steps seamlessly.
                </p>
              </motion.div>
              
              <motion.div 
                className="space-y-4"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Smart Automations</h3>
                <p className="text-gray-600 leading-relaxed">
                  Integrate with your favorite tools. Trigger emails, update databases, and generate documents automatically.
                </p>
              </motion.div>

              <motion.div 
                className="space-y-4"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Real-time Validation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sandbox environment to simulate workflows before deployment to ensure no circular loops or orphaned steps.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 py-12 px-8 text-center text-gray-400">
        <p>© 2026 Tredence HR Studio. Internal Tools Excellence.</p>
      </footer>
    </div>
  );
}
