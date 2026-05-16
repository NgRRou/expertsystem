import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Home,
  HeartPulse,
  AlertTriangle,
  Info,
  History,
  FileText,
  Users,
  ShieldCheck
} from 'lucide-react';
import { UserFacts, StudentStatus, Programme, StudentType, IncomeCategory, AidNeed, DisasterCaseType, FamilyMemberType, DocumentStatus, ApplicationStatus } from '../types';

interface WizardProps {
  onComplete: (facts: UserFacts) => void;
  onBack?: () => void;
}

export default function AssessmentWizard({ onComplete, onBack }: WizardProps) {
  const [step, setStep] = useState(1);
  const [facts, setFacts] = useState<UserFacts>({
    studentStatus: 'Active',
    programme: 'Degree',
    studentType: 'Local',
    incomeCategory: 'B40',
    householdIncome: 'Unknown',
    aidNeed: 'None',
    hasPTPTN: false,
    hasScholarship: false,
    cgpa: 'Unknown',
    emergencyCase: false,
    disasterCaseType: 'None',
    familyMemberType: 'None',
    propertyLoss: false,
    supportingDocumentStatus: 'Not Submitted',
    applicationFormStatus: 'Not Submitted',
    stressOrEmotionalIssue: false,
    academicProblemRelatedToStress: false,
    accommodationIssue: false,
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => {
    if (step === 1) {
      onBack?.();
    } else {
      setStep(s => s - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't navigate if user is typing in an input
      const isInput = ['INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName);
      
      if (e.key === 'Enter') {
        if (step < 5) {
          nextStep();
        } else {
          onComplete(facts);
        }
      }
      
      if (e.key === 'Backspace' && !isInput) {
        if (step > 1) {
          prevStep();
        } else {
          onBack?.();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, facts, onComplete]);

  const updateFact = <K extends keyof UserFacts>(key: K, value: UserFacts[K]) => {
    setFacts(prev => ({ ...prev, [key]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <GraduationCap size={24} className="text-slate-400" />
              Basic Academic Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Student Status</label>
                <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1">
                  {['Active', 'Not Active'].map((v) => (
                    <button
                      key={v}
                      onClick={() => updateFact('studentStatus', v as StudentStatus)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${facts.studentStatus === v ? 'bg-[#9A91ED] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Programme</label>
                <div className="relative">
                  <select
                    value={facts.programme}
                    onChange={(e) => updateFact('programme', e.target.value as Programme)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-purple-200 focus:outline-none text-slate-700 font-medium"
                  >
                    <option value="Diploma">Diploma</option>
                    <option value="Degree">Degree</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronRight className="rotate-90" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Student Type</label>
                <div className="flex bg-slate-50 p-1.5 rounded-2xl gap-1">
                  {['Local', 'International'].map((v) => (
                    <button
                      key={v}
                      onClick={() => updateFact('studentType', v as StudentType)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${facts.studentType === v ? 'bg-[#9A91ED] text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                        }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">CGPA (leave unknown if unsure)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="e.g. 3.5"
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-200 focus:outline-none text-slate-700 font-medium placeholder:text-slate-300"
                  onChange={(e) => updateFact('cgpa', e.target.value ? parseFloat(e.target.value) : 'Unknown')}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <Users size={24} className="text-slate-400" />
              Financial Background
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Income Category (SSM/LHDN)</label>
                <div className="relative">
                  <select
                    value={facts.incomeCategory}
                    onChange={(e) => updateFact('incomeCategory', e.target.value as IncomeCategory)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-purple-200 focus:outline-none text-slate-700 font-medium"
                  >
                    <option value="B40">B40 (Low Income)</option>
                    <option value="M40">M40 (Medium Income)</option>
                    <option value="T20">T20 (High Income)</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronRight className="rotate-90" size={16} />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Monthly Household Income (RM)</label>
                <input
                  type="number"
                  placeholder="e.g. 4500"
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-200 focus:outline-none text-slate-700 font-medium placeholder:text-slate-300"
                  onChange={(e) => updateFact('householdIncome', e.target.value ? parseInt(e.target.value) : 'Unknown')}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <HeartPulse size={24} className="text-slate-400" />
              Primary Needs & Current Aid
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Type of Aid Needed</label>
                <div className="relative">
                  <select
                    value={facts.aidNeed}
                    onChange={(e) => updateFact('aidNeed', e.target.value as AidNeed)}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-purple-200 focus:outline-none text-slate-700 font-medium"
                  >
                    <option value="None">None (Just screening)</option>
                    <option value="Food">Food Coupon Assistance</option>
                    <option value="Internet">Internet/Data Subscription</option>
                    <option value="Scholarship">Scholarship Opportunity</option>
                    <option value="Disaster">Disaster/Emergency Relief</option>
                    <option value="Special Case">Special Financial Case</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronRight className="rotate-90" size={16} />
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${facts.hasPTPTN ? 'bg-[#9A91ED] border-[#9A91ED]' : 'bg-white border-slate-200'}`}>
                    {facts.hasPTPTN && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={facts.hasPTPTN}
                    onChange={(e) => updateFact('hasPTPTN', e.target.checked)}
                  />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Already have PTPTN loan?</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${facts.hasScholarship ? 'bg-[#9A91ED] border-[#9A91ED]' : 'bg-white border-slate-200'}`}>
                    {facts.hasScholarship && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={facts.hasScholarship}
                    onChange={(e) => updateFact('hasScholarship', e.target.checked)}
                  />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Already have a scholarship?</span>
                </label>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <AlertTriangle size={24} className="text-slate-400" />
              Urgent & Well-being Status
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-12 h-6 rounded-full transition-all relative ${facts.emergencyCase ? 'bg-[#9A91ED]' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${facts.emergencyCase ? 'left-7' : 'left-1'}`} />
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={facts.emergencyCase}
                      onChange={(e) => updateFact('emergencyCase', e.target.checked)}
                    />
                    <span className="text-sm font-bold text-slate-700">Urgent Emergency Case?</span>
                  </label>

                  {facts.emergencyCase && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pl-4 border-l-2 border-purple-100">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Type of Emergency</label>
                        <select
                          value={facts.disasterCaseType}
                          onChange={(e) => updateFact('disasterCaseType', e.target.value as DisasterCaseType)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:ring-2 focus:ring-purple-100 focus:outline-none"
                        >
                          <option value="None">None</option>
                          <option value="Death of Student">Death of Student</option>
                          <option value="Death of Family Member">Death of Family Member</option>
                          <option value="Serious Accident">Serious Accident</option>
                          <option value="Natural Disaster">Natural Disaster</option>
                          <option value="Fire">Fire Case</option>
                        </select>
                      </div>

                      {facts.disasterCaseType === 'Death of Family Member' && (
                        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
                          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Relationship</label>
                          <select
                            value={facts.familyMemberType}
                            onChange={(e) => updateFact('familyMemberType', e.target.value as FamilyMemberType)}
                            className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-purple-100 focus:outline-none"
                          >
                            <option value="None">Select...</option>
                            <option value="Mother">Mother</option>
                            <option value="Father">Father</option>
                            <option value="Guardian">Guardian</option>
                            <option value="Child">Child</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Other">Other</option>
                          </select>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </div>

                <div className="space-y-6">
                   <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-12 h-6 rounded-full transition-all relative ${facts.stressOrEmotionalIssue ? 'bg-[#9A91ED]' : 'bg-slate-200'}`}>
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${facts.stressOrEmotionalIssue ? 'left-7' : 'left-1'}`} />
                      </div>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={facts.stressOrEmotionalIssue}
                        onChange={(e) => updateFact('stressOrEmotionalIssue', e.target.checked)}
                      />
                      <span className="text-sm font-bold text-slate-700">Stress/Emotional Issue?</span>
                    </label>

                    {facts.stressOrEmotionalIssue && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pl-6 pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className={`w-10 h-5 rounded-full transition-all relative ${facts.academicProblemRelatedToStress ? 'bg-emerald-400' : 'bg-slate-200'}`}>
                              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${facts.academicProblemRelatedToStress ? 'left-5.5' : 'left-0.5'}`} />
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={facts.academicProblemRelatedToStress}
                            onChange={(e) => updateFact('academicProblemRelatedToStress', e.target.checked)}
                          />
                          <span className="text-xs font-bold text-slate-500">Affecting Academic Performance?</span>
                        </label>
                      </motion.div>
                    )}
                  </div>
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-12 h-6 rounded-full transition-all relative ${facts.accommodationIssue ? 'bg-[#9A91ED]' : 'bg-slate-200'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${facts.accommodationIssue ? 'left-7' : 'left-1'}`} />
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={facts.accommodationIssue}
                      onChange={(e) => updateFact('accommodationIssue', e.target.checked)}
                    />
                    <span className="text-sm font-bold text-slate-700">Accommodation Problem?</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
              <FileText size={24} className="text-slate-400" />
              Submission & Final Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Supporting Documents Status</label>
                <div className="grid grid-cols-1 gap-2">
                   {['Not Submitted', 'Incomplete', 'Complete'].map((v) => (
                    <button
                      key={v}
                      onClick={() => updateFact('supportingDocumentStatus', v as DocumentStatus)}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-bold text-left transition-all ${facts.supportingDocumentStatus === v ? 'bg-[#9A91ED] text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest">Official Application Form</label>
                <div className="grid grid-cols-1 gap-2">
                   {['Not Submitted', 'Submitted'].map((v) => (
                    <button
                      key={v}
                      onClick={() => updateFact('applicationFormStatus', v as ApplicationStatus)}
                      className={`w-full py-3 px-4 rounded-xl text-sm font-bold text-left transition-all ${facts.applicationFormStatus === v ? 'bg-[#9A91ED] text-white shadow-md' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                    >
                      {v === 'Submitted' ? 'Already Submitted to Office' : v}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/40 flex flex-col min-h-[500px]">
      {/* Wizard Header (Mockup Style) */}
      <div className="bg-[#9A91ED] px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight">Eligibility Assessment</h2>
          <p className="text-purple-100 text-xs font-medium">Please answer accurately for correct referral.</p>
        </div>
        <div className="text-purple-100 text-xs font-bold uppercase tracking-widest opacity-80">
          Step {step} of 5
        </div>
      </div>

      <div className="flex-1 p-8 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Wizard Footer Actions */}
      <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors text-slate-400 hover:text-slate-600"
        >
          <ChevronLeft size={16} />
          {step === 1 ? 'Back to Main' : 'Back'}
        </button>

        <div className="flex gap-4">
          {step < 5 ? (
            <button
              onClick={nextStep}
              className="px-8 py-3 bg-[#9A91ED] text-white rounded-2xl font-bold hover:bg-[#8B81DF] transition-all flex items-center gap-2 shadow-lg shadow-purple-200/50"
            >
              Next Step
              <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={() => onComplete(facts)}
              className="px-10 py-3 bg-emerald-500 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all flex items-center gap-2 shadow-lg shadow-emerald-200/50"
            >
              Finalize Assessment
              <CheckCircle2 size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
