import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  HandHelping,
  FileSearch,
  MessageSquare,
  Building2,
  Info,
  History,
  X,
  Zap
} from 'lucide-react';
import { InferenceResult, Recommendation, Priority } from '../types';
import { RULES_DATA, RuleDefinition } from '../logic/rulesData';

interface ResultsProps {
  result: InferenceResult;
  onReset: () => void;
}

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const styles = {
    High: 'bg-rose-100 text-rose-700 border-rose-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    Low: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full border text-xs font-bold uppercase tracking-wider ${styles[priority]}`}>
      {priority} Priority
    </span>
  );
};

const getIconForType = (type: string) => {
  const t = type.toLowerCase();
  if (t.includes('food')) return <HandHelping className="text-emerald-500" />;
  if (t.includes('internet')) return <ExternalLink className="text-sky-500" />;
  if (t.includes('special case')) return <AlertCircle className="text-indigo-500" />;
  if (t.includes('disaster')) return <AlertTriangleIcon className="text-rose-500" />;
  if (t.includes('counseling')) return <MessageSquare className="text-pink-500" />;
  if (t.includes('accommodation')) return <Building2 className="text-amber-500" />;
  if (t.includes('document')) return <FileSearch className="text-indigo-500" />;
  if (t.includes('scholarship')) return <CheckCircle2 className="text-indigo-500" />;
  return <Info className="text-slate-400" />;
};

export default function ResultsDisplay({ result, onReset }: ResultsProps) {
  const [activeRule, setActiveRule] = useState<RuleDefinition | null>(null);

  if (!result.isEligible) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-white/40">
        <div className="bg-[#9A91ED] px-8 py-10 text-center">
           <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl backdrop-blur-md">
              <AlertCircle size={40} />
           </div>
           <h2 className="text-3xl font-bold text-white tracking-tight">Screening Result</h2>
        </div>
        <div className="p-12 text-center space-y-8">
           <p className="text-slate-500 text-lg leading-relaxed max-w-md mx-auto italic font-serif">
              "{result.eligibilityMessage || "You do not meet the minimum criteria for this welfare screening."}"
           </p>
           <button
             onClick={onReset}
             className="px-10 py-4 bg-[#9A91ED] text-white rounded-2xl hover:bg-[#8B81DF] transition-all font-bold shadow-xl shadow-purple-200/50"
           >
             Return to Assessment
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/70 backdrop-blur-2xl rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden flex flex-col">
      
      {/* Aligned Purple Header */}
      <div className="bg-[#9A91ED] px-8 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
           <div className="p-2 bg-white/20 rounded-xl shadow-inner backdrop-blur-md">
              <img 
                src="/expert_icon.png" 
                alt="expert icon" 
                className="w-8 h-8 object-contain brightness-0 invert" 
              />
           </div>
           <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Expert Recommendation</h2>
              <p className="text-purple-100 text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Finalized Assessment Result</p>
           </div>
        </div>
        <div className="bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 flex items-center gap-2 shadow-sm">
            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] opacity-80">Final Priority:</span>
            <span className="text-sm font-bold text-white">{result.finalPriority}</span>
        </div>
      </div>

      <div className="flex-1 p-8 md:p-12 space-y-12">
        {/* Recommendations List */}
        <div className="space-y-6">
          {result.recommendations.map((rec, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={rec.id}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-start gap-5">
                   <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0 shadow-inner">
                      {getIconForType(rec.type)}
                   </div>
                   <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">{rec.type}</h3>
                        {rec.amount && <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1 rounded-lg">Est: {rec.amount}</span>}
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed max-w-2xl font-medium">
                        {rec.explanation}
                      </p>
                      
                      <div className="pt-3">
                        {rec.nextAction.map((action, i) => (
                          <button key={i} className="text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors flex items-center gap-2 group mb-1">
                            {action}
                            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        ))}
                      </div>
                   </div>
                </div>
              </div>

              {/* Reasoning Footer */}
              {rec.rulesFired && (
                <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Zap size={12} className="text-amber-400" />
                    Expert Reasoning Trace:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {rec.rulesFired.map((ruleId, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveRule(RULES_DATA[ruleId])}
                        className="px-3 py-1 bg-white text-slate-400 rounded-full text-[10px] font-bold border border-slate-200 hover:border-[#9A91ED] hover:text-[#9A91ED] transition-all shadow-sm"
                      >
                        Rule {ruleId}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="bg-[#E9F5FB] rounded-3xl p-8 border border-[#D5E9F4] flex gap-5 shadow-sm">
          <img 
            src="/disclaimer.png" 
            alt="disclaimer seal" 
            className="w-8 h-8 object-contain shrink-0" 
          />
          <div className="space-y-2">
            <h4 className="font-bold text-sky-900 tracking-tight">Important Disclaimer</h4>
            <p className="text-[#4A7D94] text-sm leading-relaxed font-medium">
              Please note that these are advisory recommendations based on standard FSKTM screening protocols. 
              Final approval is subject to the submission of an official application form and verification of 
              your supporting documents by the TD HEP / FSKTM office.
            </p>
          </div>
        </div>

        {/* Start New Assessment Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={onReset}
            className="flex items-center gap-3 px-12 py-4 bg-[#9A91ED] text-white rounded-2xl font-bold hover:bg-[#8B81DF] transition-all shadow-2xl shadow-purple-200/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <History className="w-5 h-5" />
            Start New Assessment
          </button>
        </div>
      </div>

      {/* Rule Modal - Rendered via Portal to escape parent transforms */}
      {createPortal(
        <AnimatePresence>
        {activeRule && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRule(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-indigo-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Expert Rule {activeRule.id}</h3>
                    <p className="text-indigo-100 text-xs font-medium uppercase tracking-widest">Forward Chaining Trace</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveRule(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <div className="px-2 py-0.5 bg-indigo-100 rounded text-[10px] font-black uppercase tracking-tighter">IF</div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Condition met</span>
                  </div>
                  <p className="text-slate-700 font-medium text-base leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner italic">
                    "{activeRule.condition}"
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <div className="px-2 py-0.5 bg-emerald-100 rounded text-[10px] font-black uppercase tracking-tighter">THEN</div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Inferred conclusion</span>
                  </div>
                  <p className="text-slate-800 font-medium leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                    {activeRule.conclusion}
                  </p>
                </div>
              </div>
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActiveRule(null)}
                  className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold text-sm hover:bg-slate-900 transition-all shadow-lg shadow-slate-200"
                >
                  Close Trace
                </button>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

function AlertTriangleIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
