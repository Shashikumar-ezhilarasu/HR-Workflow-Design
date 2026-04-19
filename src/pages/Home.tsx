import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Workflow, PlayCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SplitText from "./SplitText";
import Masonry from './Masonry';

const masonryItems = [
  {
    id: "1",
    title: "AI Agentic Platforms",
    description: "Building paradigm-shifting platforms from the ground up with SOTA AI capabilities.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    url: "#",
    height: 600,
  },
  {
    id: "2",
    title: "Elite Engineering",
    description: "Solving complex, real-world architectural and product challenges in the trenches.",
    img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    url: "#",
    height: 400,
  },
  {
    id: "3",
    title: "Scalable UIs",
    description: "Engineering highly responsive, pixel-perfect UI components for elite design systems.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    url: "#",
    height: 700,
  },
  {
    id: "4",
    title: "Real-Time Systems",
    description: "Optimizing instantaneous data delivery using WebSockets and Server-Sent Events.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800",
    url: "#",
    height: 500,
  },
  {
    id: "5",
    title: "Cloud Native",
    description: "Hands-on experience deploying and managing services in Kubernetes environments.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    url: "#",
    height: 600,
  },
  {
    id: "6",
    title: "Clean Architecture",
    description: "Implementing strong typing, modular design, and elite standards of software quality.",
    img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    url: "#",
    height: 450,
  }
];

export function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => setLoading(false), 1200);
    
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
    }
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    console.log('Headline animation complete');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mb-4"
            >
              <Workflow className="w-12 h-12 text-primary-600" />
            </motion.div>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 200 }}
              className="h-1 bg-gray-100 rounded-full overflow-hidden"
            >
              <motion.div 
                initial={{ x: -200 }}
                animate={{ x: 200 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-full bg-primary-600"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Premium Navbar */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, type: "spring" }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6"
      >
        <header className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] px-6 py-3 rounded-2xl flex items-center justify-between w-full max-w-5xl">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-gradient-to-br from-primary-600 to-primary-400 rounded-lg shadow-sm">
              <Workflow className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900 hidden sm:block">
              Tredence <span className="text-primary-600 font-medium">Studio</span>
            </h1>
          </div>
          
          <nav className="flex items-center gap-1 sm:gap-2">
            {['Product', 'Solutions', 'Documentation', 'Pricing'].map((item) => (
              item === 'Documentation' ? (
                <Link 
                  key={item} 
                  to="/documentation" 
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                >
                  {item}
                </Link>
              ) : (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                >
                  {item}
                </a>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/designer"
              className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-black transition-all flex items-center gap-2"
            >
              Sign In
            </Link>
          </div>
        </header>
      </motion.div>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col pt-12">
        <section className="relative px-6 py-6 md:py-10 flex flex-col items-center text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1400px] pointer-events-none">
            <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-primary-100/50 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob"></div>
            <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-purple-100/50 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
          </div>

          <div className="relative z-10 max-w-7xl w-full">
            {/* Enlarged Video Showcase with Deep Shadows */}
            <motion.div 
              className="relative mb-12 sm:mb-20 px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
            >
              <div className="absolute inset-0 -m-12 bg-primary-500/5 blur-[120px] rounded-full animate-pulse-slow"></div>
              
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_48px_100px_-24px_rgba(0,0,0,0.3)] border-[12px] border-white bg-gray-900 aspect-video group mx-auto z-10 transition-transform duration-700 hover:scale-[1.005]">
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/hero-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 via-transparent to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-0"></div>
              </div>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
              >
                <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-gray-50 text-gray-900 text-sm font-bold mb-8 border border-gray-100 shadow-sm transition-all hover:bg-white hover:shadow-md cursor-default">
                  <span className="flex h-2 w-2 rounded-full bg-primary-500 animate-pulse"></span>
                  v2.4: Real-time Workflow Collaboration
                </span>
              </motion.div>

              <SplitText
                text="Design flows faster than thought."
                className="text-3xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-none mb-10 whitespace-nowrap"
                delay={40}
                duration={1.2}
                ease="power4.out"
                splitType="chars"
                from={{ opacity: 0, y: 50, rotateX: -90 }}
                to={{ opacity: 1, y: 0, rotateX: 0 }}
                onLetterAnimationComplete={handleAnimationComplete}
                showCallback
              />

              <motion.p 
                className="text-lg md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed font-medium px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 0.8 }}
              >
                The ultimate visual engine for enterprise HR teams. Map complex processes, automate redundant tasks, and deploy with one click.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row items-center gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
              >
                <Link
                  to="/designer"
                  className="px-12 py-5 bg-gray-900 text-white text-lg font-bold rounded-2xl shadow-2xl hover:bg-black hover:shadow-primary-500/20 hover:-translate-y-1 active:scale-95 transition-all w-full sm:w-auto"
                >
                  Start Building Now
                </Link>
                <button className="px-12 py-5 bg-white text-gray-900 text-lg font-bold border-2 border-gray-100 rounded-2xl shadow-xl hover:bg-gray-50 hover:border-gray-200 hover:-translate-y-1 active:scale-95 transition-all w-full sm:w-auto flex items-center justify-center gap-3">
                  <PlayCircle className="w-6 h-6 text-primary-600" /> Watch Demo
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Masonry Showcase Section */}
        <section className="pb-32 pt-12 px-6">
          <div className="max-w-7xl mx-auto">
            <Masonry
              items={masonryItems}
              ease="power3.out"
              duration={0.8}
              stagger={0.08}
              animateFrom="bottom"
              scaleOnHover={true}
              hoverScale={0.98}
              blurToFocus={true}
              colorShiftOnHover={true}
            />
          </div>
        </section>

        {/* Tredence Studio Case Study / Documentation Section */}
        <section id="documentation" className="py-32 bg-gray-900 text-white rounded-[4rem] mx-4 mb-32 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-500 rounded-full blur-[200px]"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-10 relative z-10">
            <div className="mb-20">
              <span className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-4 block">Case Study: HR Workflow Designer</span>
              <h3 className="text-5xl md:text-7xl font-black mb-8 leading-tight">State-of-the-Art <br/><span className="text-primary-500">Agentic Engineering.</span></h3>
              <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                Developed as a core module for the Tredence Studio AI platform, this HR Workflow Designer empowers administrators to visually architect complex people operations through a zero-to-one engineering approach.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              <div className="space-y-12">
                <div>
                  <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-sm">01</span>
                    Architectural Foundation
                  </h4>
                  <ul className="space-y-4 text-gray-400 font-medium ml-11">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                      React Flow with custom node-type abstractions for Task, Approval, and System Nodes.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                      Modular Zustand store for centralized graph state and undo/redo capabilities.
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                      Strict TypeScript implementation ensuring type-safe node properties and edge validations.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-sm">02</span>
                    Dynamic Configuration
                  </h4>
                  <ul className="space-y-4 text-gray-400 font-medium ml-11">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                      Context-aware property panels that adapt per node type (Start, Task, Approval, Automated).
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0"></div>
                      Mock API integration for real-time automation parameters and system-triggered actions.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-sm">03</span>
                    Sandbox Simulation
                  </h4>
                  <p className="text-gray-400 font-medium ml-11 leading-relaxed">
                    Integrated real-time validation and step-by-step execution logging. Admins can serialize the entire graph structure and simulate multi-path workflows before deployment to production environments.
                  </p>
                </div>
                
                <div className="pt-8">
                  <a href="#designer" className="px-10 py-5 bg-white text-gray-900 text-lg font-bold rounded-2xl hover:bg-primary-50 flex items-center justify-center gap-3 transition-all">
                    Access Technical Specs <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="sticky top-32">
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-4 shadow-2xl overflow-hidden group">
                  <video 
                    className="w-full rounded-[2.5rem] shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
                    autoPlay loop muted playsInline
                  >
                    <source src="/hero-video.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute top-6 left-6 px-4 py-2 bg-primary-600/90 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase">
                    Live Prototype v1.0
                  </div>
                </div>
                <div className="mt-12 p-8 bg-white/5 border border-white/10 rounded-3xl">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-primary-500 text-sm font-bold uppercase mb-2">Platform</p>
                      <p className="text-xl font-bold">Tredence AI</p>
                    </div>
                    <div>
                      <p className="text-primary-500 text-sm font-bold uppercase mb-2">Stack</p>
                      <p className="text-xl font-bold">React + TS + Flow</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-white/10 mt-8">
                    <Link to="/documentation" className="inline-flex items-center gap-2 text-primary-400 font-bold hover:text-primary-300 transition-colors group/btn">
                      View Full Documentation <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-white py-12 px-8 border-t border-gray-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Workflow className="w-5 h-5 text-primary-600" />
          <span className="font-bold text-gray-900">Tredence Studio</span>
        </div>
        <p className="text-gray-400 text-sm font-medium">© 2026 Tredence HR Studio. Precision Engineering for People Operations.</p>
      </footer>
    </div>
  );
}
