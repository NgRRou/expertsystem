import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen font-sans selection:bg-purple-100 selection:text-purple-900">
      {/* Floating Mockup Header */}
      <div className="pt-8 px-6 flex justify-center">
        <nav className="w-full max-w-4xl bg-white/60 backdrop-blur-md border border-white/40 px-6 py-3 rounded-2xl shadow-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="w-8 h-8 object-contain" />
            <span className="text-sm font-bold text-slate-800">FSKTM Student Support</span>
          </div>
        </nav>
      </div>

      <main className="mx-auto max-w-4xl px-6 pt-12 pb-20">
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
    </div>
  );
}

