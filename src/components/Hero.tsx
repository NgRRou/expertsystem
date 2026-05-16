import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, GraduationCap, HeartPulse, ChevronRight } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl bg-white/70 backdrop-blur-2xl rounded-[50px] p-12 md:p-20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white/60 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 bg-[#9A91ED] text-white rounded-3xl flex items-center justify-center shadow-xl shadow-purple-200 mb-8"
        >
          <ShieldCheck size={40} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight leading-[1.1] mb-6"
        >
          SmartPaddy <br />
          <span className="text-[#9A91ED]">Student Support</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl leading-relaxed mb-12"
        >
          The official FSKTM Expert System for student welfare and financial assistance screening. 
          Get instant recommendations based on university protocols.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row gap-6 w-full max-w-md"
        >
          <button
            onClick={onStart}
            className="flex-1 group flex items-center justify-center gap-3 px-10 py-5 bg-[#9A91ED] text-white rounded-[24px] font-bold text-lg hover:bg-[#8B81DF] transition-all shadow-2xl shadow-purple-200/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Assessment
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-8 md:gap-16 border-t border-slate-100 pt-10 w-full"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
              <HeartPulse size={20} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Well-being</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Welfare</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
