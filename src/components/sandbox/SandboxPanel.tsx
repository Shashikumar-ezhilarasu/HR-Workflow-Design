import { useState, useMemo } from 'react';
import {
  PlayCircle, X, CheckCircle, XCircle, AlertCircle, ShieldCheck,
  Zap, Clock, Activity, GitBranch, AlertTriangle, ChevronDown,
  ChevronUp, SkipForward
} from 'lucide-react';
import { useWorkflowStore } from '@/store/workflowStore';
import { useSimulate } from '@/hooks/useSimulate';
import { serializeWorkflow, downloadWorkflowJSON } from '@/utils/serializer';
import { buildReport } from '@/utils/graphValidator';
import { SimulationStep } from '@/types/workflow';

// ─── Health-score colour helper ─────────────────────────────────

function scoreColors(score: number) {
  if (score >= 80) return { ring: 'text-emerald-500', bg: 'bg-emerald-400', label: 'Healthy' };
  if (score >= 50) return { ring: 'text-amber-500',   bg: 'bg-amber-400',   label: 'Needs Work' };
  return              { ring: 'text-red-500',         bg: 'bg-red-400',     label: 'Critical' };
}

// ─── Step icon helper ───────────────────────────────────────────

function StepIcon({ type, status }: { type: SimulationStep['type']; status: SimulationStep['status'] }) {
  const base = 'w-5 h-5';
  if (status === 'failed')  return <XCircle    className={`${base} text-red-500`}   />;
  if (status === 'skipped') return <SkipForward className={`${base} text-gray-400`} />;
  if (type === 'start')     return <PlayCircle  className={base} />;
  if (type === 'task')      return <AlertCircle className={base} />;
  if (type === 'approval')  return <ShieldCheck className={base} />;
  if (type === 'automated') return <Zap         className={base} />;
  if (type === 'end')       return <CheckCircle className={base} />;
  return <Activity className={base} />;
}

// ─── Step card ──────────────────────────────────────────────────

function stepBadgeStyle(type: SimulationStep['type']) {
  const map: Record<string, string> = {
    start:     'bg-blue-100 text-blue-700',
    task:      'bg-orange-100 text-orange-700',
    approval:  'bg-purple-100 text-purple-700',
    automated: 'bg-emerald-100 text-emerald-700',
    end:       'bg-gray-200 text-gray-700',
  };
  return map[type] ?? 'bg-gray-100 text-gray-600';
}

function stepRingStyle(status: SimulationStep['status'], type: SimulationStep['type']) {
  if (status === 'failed')  return 'bg-red-50  border-red-400   text-red-500';
  if (status === 'skipped') return 'bg-gray-50 border-gray-300  text-gray-400';
  const map: Record<string, string> = {
    start:     'bg-blue-50   border-blue-400   text-blue-500',
    task:      'bg-orange-50 border-orange-400 text-orange-500',
    approval:  'bg-purple-50 border-purple-400 text-purple-500',
    automated: 'bg-emerald-50 border-emerald-400 text-emerald-500',
    end:       'bg-gray-50   border-gray-400   text-gray-500',
  };
  return map[type] ?? 'bg-white border-gray-200 text-gray-500';
}

// ─── Collapsible step card ──────────────────────────────────────

function StepCard({ step }: { step: SimulationStep }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = step.details && Object.keys(step.details).length > 0;

  return (
    <div className="relative flex items-start group">
      {/* Icon */}
      <div className="flex flex-col items-center mr-4 flex-shrink-0">
        <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-2xl shadow-sm border-2 transition-transform group-hover:scale-110 ${stepRingStyle(step.status, step.type)}`}>
          <StepIcon type={step.type} status={step.status} />
        </div>
      </div>

      {/* Card body */}
      <div
        className={`flex-1 min-w-0 rounded-2xl p-4 border transition-all duration-300 cursor-pointer
          ${step.status === 'failed'  ? 'bg-red-50/60  border-red-200  hover:border-red-400' :
            step.status === 'skipped' ? 'bg-gray-50/40 border-gray-200 hover:border-gray-300' :
            'bg-gray-50/50 border-transparent hover:border-gray-200 hover:bg-white hover:shadow-lg'}`}
        onClick={() => hasDetails && setExpanded(!expanded)}
      >
        {/* Top row */}
        <div className="flex items-center justify-between gap-3 mb-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${stepBadgeStyle(step.type)}`}>
              {step.type}
            </span>
            {step.durationMs !== undefined && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-gray-400">
                <Clock className="w-3 h-3" />{step.durationMs}ms
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <time className="text-[10px] font-bold text-gray-400 whitespace-nowrap">
              {new Date(step.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </time>
            {hasDetails && (
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>

        {/* Step name */}
        <h4 className={`text-sm font-black transition-colors
          ${step.status === 'failed'  ? 'text-red-700' :
            step.status === 'skipped' ? 'text-gray-400' :
            'text-gray-900 group-hover:text-primary-600'}`}>
          {step.nodeName}
        </h4>

        {/* Message */}
        <p className={`text-xs mt-1.5 italic leading-relaxed
          ${step.status === 'failed' ? 'text-red-600' : 'text-gray-500'}`}>
          {step.message}
        </p>

        {/* Expandable details */}
        {expanded && hasDetails && (
          <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-x-6 gap-y-2">
            {Object.entries(step.details!).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-[9px] font-black uppercase text-gray-400 tracking-wider font-mono">{key}</span>
                <span className="text-[11px] font-bold text-gray-800 truncate">{value || 'N/A'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  Main SandboxPanel
// ─────────────────────────────────────────────

export function SandboxPanel() {
  const [isOpen, setIsOpen]     = useState(false);
  const [filter, setFilter]     = useState<'all' | 'failed' | 'skipped'>('all');

  const nodes = useWorkflowStore((state) => state.nodes);
  const edges = useWorkflowStore((state) => state.edges);
  const { simulate, result, loading, error, reset } = useSimulate();

  const report = useMemo(() => buildReport(nodes, edges), [nodes, edges]);
  const { errors: valErrors, warnings: valWarnings, healthScore } = report;
  const sc = scoreColors(healthScore);

  const hasBlockingErrors = valErrors.length > 0;

  const handleSimulate = async () => {
    const workflow = serializeWorkflow(nodes, edges);
    await simulate(workflow);
  };

  const handleExport = () => downloadWorkflowJSON(nodes, edges);

  const filteredSteps = result?.steps.filter((s) => {
    if (filter === 'all')     return true;
    if (filter === 'failed')  return s.status === 'failed';
    if (filter === 'skipped') return s.status === 'skipped';
    return true;
  }) ?? [];

  const totalDuration = result?.steps.reduce((acc, s) => acc + (s.durationMs ?? 0), 0) ?? 0;

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 px-6 py-3 bg-primary-600 text-white rounded-xl shadow-xl hover:bg-primary-700 flex items-center gap-2 font-medium z-10 transition-all hover:scale-105 hover:shadow-2xl"
      >
        <PlayCircle className="w-5 h-5" />
        Test Workflow
        {!hasBlockingErrors && nodes.length > 0 && (
          <span className="ml-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[88vh] flex flex-col border border-gray-100">

            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-50 rounded-xl">
                  <Activity className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Workflow Sandbox</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Test, validate, and trace execution paths</p>
                </div>
              </div>
              <button
                onClick={() => { setIsOpen(false); reset(); setFilter('all'); }}
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">

              {/* ── Health Score Card ────────────────────────────────────── */}
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 flex items-center gap-5">
                {/* Ring */}
                <div className="flex-shrink-0 relative w-16 h-16">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" strokeWidth="6" stroke="#e5e7eb" fill="none" />
                    <circle
                      cx="32" cy="32" r="26" strokeWidth="6" fill="none"
                      stroke="currentColor"
                      className={sc.ring}
                      strokeDasharray={`${2 * Math.PI * 26}`}
                      strokeDashoffset={`${2 * Math.PI * 26 * (1 - healthScore / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-black text-gray-800">{healthScore}</span>
                </div>
                {/* Summary */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-bold ${sc.ring}`}>{sc.label}</span>
                    <span className="text-xs text-gray-400">Workflow Health Score</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5 text-red-500" />
                      <strong className="text-red-600">{valErrors.length}</strong> errors
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      <strong className="text-amber-600">{valWarnings.length}</strong> warnings
                    </span>
                    <span className="flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5 text-blue-500" />
                      {nodes.length} nodes / {edges.length} edges
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Validation Issues ────────────────────────────────────── */}
              {(valErrors.length > 0 || valWarnings.length > 0) && (
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    Validation Issues
                  </h3>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                    {[...valErrors, ...valWarnings].map((err, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl text-xs flex items-start gap-2 border
                          ${err.severity === 'error'
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-amber-50 border-amber-200 text-amber-800'}`}
                      >
                        {err.severity === 'error'
                          ? <XCircle className="w-3.5 h-3.5 flex-shrink-0 mt-px text-red-500" />
                          : <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-px text-amber-500" />}
                        <span className="leading-snug">{err.message}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Simulation Result Banner ─────────────────────────────── */}
              {result && (
                <div className="space-y-4">
                  {/* Banner */}
                  <div className={`p-4 rounded-2xl flex items-center gap-3 border
                    ${result.success
                      ? 'bg-emerald-50  border-emerald-200'
                      : 'bg-red-50      border-red-200'}`}>
                    {result.success
                      ? <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      : <XCircle     className="w-6 h-6 text-red-600     flex-shrink-0" />}
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${result.success ? 'text-emerald-800' : 'text-red-800'}`}>
                        {result.success ? 'Simulation Successful' : 'Simulation Failed'}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />{result.durationMs ?? 0}ms total
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />{result.steps.length} steps
                        </span>
                        {(result.branchDecisions?.length ?? 0) > 0 && (
                          <span className="flex items-center gap-1">
                            <GitBranch className="w-3 h-3" />{result.branchDecisions!.length} branch{result.branchDecisions!.length > 1 ? 'es' : ''}
                          </span>
                        )}
                        <span>~{totalDuration}ms nodes</span>
                      </div>
                    </div>
                  </div>

                  {/* Runtime errors */}
                  {result.errors.length > 0 && (
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-sm text-gray-900">Runtime Errors</h3>
                      {result.errors.map((err, idx) => (
                        <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 leading-snug">
                          {err}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Branch decisions */}
                  {(result.branchDecisions?.length ?? 0) > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                        <GitBranch className="w-4 h-4 text-purple-500" />
                        Branch Decisions
                      </h3>
                      {result.branchDecisions!.map((d, idx) => (
                        <div key={idx} className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs">
                          <p className="font-bold text-purple-800">{d.nodeName}</p>
                          <p className="text-purple-700 mt-0.5">→ <strong>{d.chosenTargetName}</strong></p>
                          <p className="text-purple-500 italic mt-0.5">{d.reason}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Timeline */}
                  {result.steps.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary-500" />
                          Execution Timeline
                        </h3>
                        {/* Filter tabs */}
                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5 text-xs font-semibold">
                          {(['all', 'failed', 'skipped'] as const).map((f) => (
                            <button
                              key={f}
                              onClick={() => setFilter(f)}
                              className={`px-2.5 py-1 rounded-md capitalize transition-colors
                                ${filter === f ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="relative space-y-3 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-200 before:via-gray-100 before:to-transparent">
                        {filteredSteps.map((step, idx) => (
                          <StepCard key={`${step.nodeId}-${idx}`} step={step} />
                        ))}
                        {filteredSteps.length === 0 && (
                          <p className="text-xs text-gray-400 italic pl-14">No steps match this filter.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* API / network error */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-red-800">
                  <p className="font-bold text-sm">Execution Error</p>
                  <p className="text-xs mt-1">{error}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-gray-100 flex gap-3">
              <button
                onClick={handleSimulate}
                disabled={loading || nodes.length === 0 || hasBlockingErrors}
                title={hasBlockingErrors ? 'Fix validation errors before running' : 'Run simulation'}
                className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Simulating…
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    Run Simulation
                  </>
                )}
              </button>
              <button
                onClick={handleExport}
                disabled={nodes.length === 0}
                className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm transition-all"
              >
                Export JSON
              </button>
              {result && (
                <button
                  onClick={() => { reset(); setFilter('all'); }}
                  className="px-3 py-2.5 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 font-semibold text-sm transition-all flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
