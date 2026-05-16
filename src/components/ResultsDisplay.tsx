import React from 'react';
import { motion } from 'motion/react';
import { 
  AlertCircle, 
  CheckCircle2, 
  FileBadge, 
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  HandHelping,
  FileSearch,
  MessageSquare,
  Building2,
  Info,
  History
} from 'lucide-react';
import { InferenceResult, Recommendation, Priority } from '../types';

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
  if (!result.isEligible) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-rose-100 text-center">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Screening Results</h2>
        <p className="text-slate-600 mb-8">{result.eligibilityMessage || "You do not meet the minimum criteria for this welfare screening."}</p>
        <button
          onClick={onReset}
          className="px-8 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-all font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              Expert Recommendation
              <ShieldCheck className="text-indigo-600" />
            </h2>
            <p className="text-slate-500 mt-1 max-w-lg">
              Based on the FSKTM Refined Knowledge Base, the suggested support actions are:
            </p>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center min-w-[200px]">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Final Priority</span>
            <PriorityBadge priority={result.finalPriority} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {result.recommendations.map((rec, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={rec.id}
              className="group relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-50/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="bg-slate-50 p-3 rounded-xl group-hover:bg-indigo-50 transition-colors">
                  {getIconForType(rec.type)}
                </div>
                <PriorityBadge priority={rec.priority} />
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-2">{rec.type}</h3>
              
              {rec.amount && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  Estimated Aid: {rec.amount}
                </div>
              )}

              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {rec.explanation}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Next Action</h4>
                <ul className="space-y-2">
                  {rec.nextAction.map((action, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-indigo-700 font-medium">
                      <ChevronRight className="w-4 h-4 shrink-0" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>

              {rec.requiredDocuments && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Required Proof</h4>
                  <div className="flex flex-wrap gap-2">
                    {rec.requiredDocuments.map((doc, i) => (
                      <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-medium border border-slate-200">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex gap-4 items-start">
            <Info className="text-indigo-600 w-6 h-6 shrink-0 mt-1" />
            <div className="space-y-2">
              <h4 className="font-bold text-indigo-900">Important Disclaimer</h4>
              <p className="text-indigo-800 text-sm leading-relaxed">
                {result.eligibilityMessage}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
                >
                  <FileBadge className="w-4 h-4" />
                  Download Summary (Proof)
                </button>
                <button 
                  onClick={onReset}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-medium border border-indigo-200 hover:bg-indigo-50 transition"
                >
                  <History className="w-4 h-4" />
                  New Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
