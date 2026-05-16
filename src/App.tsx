import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Hero from './components/Hero';
import AssessmentWizard from './components/AssessmentWizard';
import ResultsDisplay from './components/ResultsDisplay';
import { UserFacts, InferenceResult } from './types';
import { runInference } from './logic/engine';

export default function App() {
  const [view, setView] = useState<'hero' | 'wizard' | 'results'>('hero');
  const [inferenceResult, setInferenceResult] = useState<InferenceResult | null>(null);

  const handleComplete = (facts: UserFacts) => {
    const result = runInference(facts);
    setInferenceResult(result);
    setView('results');
  };

  const startAssessment = () => {
    setView('wizard');
  };

  const reset = () => {
    setInferenceResult(null);
    setView('wizard');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden">

      <main className="w-full pt-12 pb-20">
        <AnimatePresence mode="wait">
          {view === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Hero onStart={startAssessment} />
            </motion.div>
          )}

          {view === 'wizard' && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto px-6"
            >
              <AssessmentWizard onComplete={handleComplete} onBack={() => setView('hero')} />
            </motion.div>
          )}

          {view === 'results' && inferenceResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-6"
            >
              <ResultsDisplay result={inferenceResult} onReset={reset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

