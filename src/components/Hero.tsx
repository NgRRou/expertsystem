import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, GraduationCap, HeartPulse, ChevronRight, Info, AlertTriangle, BookOpen, Brain, MousePointer2 } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  return (
    <div className="w-full flex flex-col -mt-12">
      {/* Hero Header Section - Full Width */}
      <section className="relative py-24 md:py-32 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-purple-200 blur-[120px] rounded-full rotate-12" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-blue-100 blur-[120px] rounded-full -rotate-12" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 space-y-10"
        >
          <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center mx-auto shadow-2xl shadow-purple-100 p-4 border border-white">
            <img src="/logo.png" alt="logo" className="w-full h-full object-contain" />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-[1.05]">
              FSKTM Student Aid <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9A91ED] to-[#7C72D9]">
                Expert System
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
              The automated first responder for student financial aid, disaster relief,
              and faculty welfare services.
            </p>
          </div>

          <div className="flex flex-col items-center pt-4">
            <button
              onClick={onStart}
              className="group flex items-center justify-center gap-4 px-8 py-4 bg-[#9A91ED] text-white rounded-full font-black text-base hover:bg-[#8B81DF] transition-all shadow-2xl shadow-purple-200/50 hover:scale-[1.05] active:scale-[0.95]"
            >
              START ELIGIBILITY SCREENING
              <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <div className="mt-8 flex items-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Forward Chaining</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-widest">48 Expert Rules</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Instant Results</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Info Sections - Direct on Page */}
      <div className="max-w-6xl mx-auto px-6 space-y-32 py-20">

        {/* How it Works Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">
              How Your <br /> Screening Works
            </h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "Facts", desc: "You provide basic details about your current situation." },
                { step: "02", title: "Inference", desc: "Our Forward Chaining engine matches facts against faculty rules." },
                { step: "03", title: "Recommendation", desc: "Receive a personalized action plan and document checklist." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="text-4xl font-black text-slate-200 group-hover:text-[#9A91ED]/20 transition-colors">{item.step}</div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                    <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-[#9A91ED]/5 blur-[100px] rounded-full" />
            <div className="relative bg-white/40 backdrop-blur-xl border border-white/60 p-10 rounded-[40px] shadow-xl">
              <p className="text-slate-600 text-lg leading-relaxed font-serif italic mb-8">
                "By analyzing live, current data instead of potentially outdated MAYA portal information,
                we ensure you get the support you need, when you need it most."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Info className="text-indigo-600" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-800">Precision Screening</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Data Verification</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System Architecture Section */}
        <section className="space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight">System Architecture</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">
              Our expert system is built on a standard tri-component architecture, 
              powered by a modern, high-performance tech stack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Knowledge Base */}
            <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/kb_icon.png" alt="KB" className="w-full h-full object-contain p-1" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">Knowledge Base (KB)</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">TypeScript + JSON</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                The core repository containing 48 expert rules. Encoded via <span className="font-bold text-slate-700">TypeScript Data Structures</span> to ensure high logic precision and easy rule maintenance.
              </p>
            </div>

            {/* Inference Engine */}
            <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/ie_icon.png" alt="IE" className="w-full h-full object-contain p-1" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">Inference Engine (IE)</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Recursive Logic Engine</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                Our custom-built <span className="font-bold text-slate-700">Forward Chaining</span> algorithm. It recursively scans facts against the KB until all qualifying aid tracks are derived.
              </p>
            </div>

            {/* User Interface */}
            <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform overflow-hidden">
                <img src="/ui_icon.png" alt="UI" className="w-full h-full object-contain p-1" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 tracking-tight">User Interface (UI)</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">React + Tailwind + Motion</p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                A premium <span className="font-bold text-slate-700">React-based frontend</span>. Uses TailwindCSS for glassmorphism and Motion for smooth, hardware-accelerated transitions.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
