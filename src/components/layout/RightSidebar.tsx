import { Search, TrendingUp, Target, Activity, CheckCircle2 } from 'lucide-react';

export function RightSidebar() {
  return (
    <div className="w-80 bg-white dark:bg-[#1e1e2d] text-gray-700 dark:text-gray-300 h-full flex flex-col border-l border-gray-200 dark:border-[#2a2a3c] overflow-y-auto custom-scrollbar transition-colors duration-200">
      {/* Top Search & Profile Bar */}
      <div className="p-4 border-b border-gray-200 dark:border-[#2a2a3c] flex items-center justify-between">
        <div className="relative flex-1 mr-4">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search Here..."
            className="w-full bg-gray-100 dark:bg-[#2a2a3c] border-none rounded-md py-1.5 pl-9 pr-3 text-sm focus:ring-1 focus:ring-blue-500 text-gray-900 dark:text-gray-200 placeholder:text-gray-500 outline-none transition-colors duration-200"
          />
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 border-2 border-white dark:border-[#1e1e2d] shadow-sm flex-shrink-0 cursor-pointer transition-colors duration-200"></div>
      </div>

      <div className="p-5 space-y-6">
        {/* Performance Overview */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Performance Overview</h3>
            <Activity className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          </div>
          <div className="bg-gray-50 dark:bg-[#2a2a3c] border border-gray-100 dark:border-transparent rounded-xl p-4 shadow-inner transition-colors duration-200">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Execution</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1,972</p>
              </div>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-400/10 px-2 py-1 rounded text-xs font-semibold">
                <TrendingUp className="w-3 h-3" />
                <span>12%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Insight Metrics */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Insight Metrics</h3>
            <Target className="w-4 h-4 text-purple-500 dark:text-purple-400" />
          </div>
          
          <div className="space-y-4">
            {/* Coverage Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-600/20 dark:to-purple-600/20 rounded-xl p-4 border border-blue-200 dark:border-blue-500/20 transition-colors duration-200">
              <h4 className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">Automation Coverage</h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-3">Your last week is better 72%</p>
              
              <div className="w-full bg-gray-200 dark:bg-[#1e1e2d] rounded-full h-1.5 mb-2 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>

            {/* Workflow A Stats */}
            <div className="bg-gray-50 dark:bg-[#2a2a3c] border border-gray-100 dark:border-transparent rounded-xl p-4 transition-colors duration-200">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Workflow A</h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-3">Triggered by User Actions</p>
              <div className="grid grid-cols-3 gap-2 text-center divide-x divide-gray-200 dark:divide-[#1e1e2d]">
                <div>
                  <p className="text-[10px] text-gray-500">Tasks</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">20</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Exec</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">10</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Done</p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">13</p>
                </div>
              </div>
            </div>

            {/* Workflow B Stats */}
            <div className="bg-gray-50 dark:bg-[#2a2a3c] border border-gray-100 dark:border-transparent rounded-xl p-4 transition-colors duration-200">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Workflow B</h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-3">Scheduled Automation</p>
              <div className="grid grid-cols-3 gap-2 text-center divide-x divide-gray-200 dark:divide-[#1e1e2d]">
                <div>
                  <p className="text-[10px] text-gray-500">Tasks</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">10</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Exec</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">33</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Done</p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">17</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Flow Objectives */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Flow Objectives</h3>
            <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
          </div>
          <div className="bg-gray-50 dark:bg-[#2a2a3c] border border-gray-100 dark:border-transparent rounded-xl p-4 space-y-3 shadow-inner transition-colors duration-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">Data Validation</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">100%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-[#1e1e2d] rounded-full h-1 overflow-hidden">
              <div className="bg-blue-500 dark:bg-blue-400 h-1 rounded-full w-full"></div>
            </div>
            
            <div className="flex items-center justify-between text-sm pt-2">
              <span className="text-gray-700 dark:text-gray-300">Action Execution</span>
              <span className="font-semibold text-purple-600 dark:text-purple-400">85%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-[#1e1e2d] rounded-full h-1 overflow-hidden">
              <div className="bg-purple-500 dark:bg-purple-400 h-1 rounded-full w-[85%]"></div>
            </div>
            
            <div className="flex items-center justify-between text-sm pt-2">
              <span className="text-gray-700 dark:text-gray-300">Output Delivery</span>
              <span className="font-semibold text-orange-500 dark:text-orange-400">60%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-[#1e1e2d] rounded-full h-1 overflow-hidden">
              <div className="bg-orange-500 dark:bg-orange-400 h-1 rounded-full w-[60%]"></div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
