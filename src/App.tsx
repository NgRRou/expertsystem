import React, { useState } from 'react';
import { ShieldCheck, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AssessmentWizard from './components/AssessmentWizard';
import ResultsDisplay from './components/ResultsDisplay';
import { UserFacts, InferenceResult } from './types';
import { runInference } from './logic/engine';

export default function App() {
  const [view, setView] = useState<'wizard' | 'results'>('wizard');
  const [inferenceResult, setInferenceResult] = useState<InferenceResult | null>(null);

  const handleComplete = (facts: UserFacts) => {
    const result = runInference(facts);
    setInferenceResult(result);
    setView('results');
  };

  const reset = () => {
    setInferenceResult(null);
    setView('wizard');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Simple Header */}
      <header className="w-full border-b border-slate-200 bg-white py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={reset}>
            <ShieldCheck className="text-indigo-600" size={24} />
            <span className="text-lg font-bold tracking-tight text-slate-800">FSKTM Student Support</span>
          </div>
          {view === 'results' && (
            <button 
              onClick={reset}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
            >
              <RotateCcw size={16} />
              Start New Assessment
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <AnimatePresence mode="wait">
          {view === 'wizard' ? (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AssessmentWizard onComplete={handleComplete} />
            </motion.div>
          ) : inferenceResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ResultsDisplay result={inferenceResult} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
        © 2024 FSKTM Support Advisory • UM
      </footer>
    </div>
  );
}

