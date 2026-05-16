import React, { useState } from 'react';
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
  Users
} from 'lucide-react';
import { UserFacts, StudentStatus, Programme, StudentType, IncomeCategory, AidNeed, DisasterCaseType, FamilyMemberType, DocumentStatus, ApplicationStatus } from '../types';

interface WizardProps {
  onComplete: (facts: UserFacts) => void;
}

export default function AssessmentWizard({ onComplete }: WizardProps) {
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
  const prevStep = () => setStep(s => s - 1);

  const updateFact = <K extends keyof UserFacts>(key: K, value: UserFacts[K]) => {
    setFacts(prev => ({ ...prev, [key]: value }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
              <GraduationCap className="text-indigo-600" />
              Basic Academic Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Student Status</label>
                <div className="flex gap-2">
                  {['Active', 'Not Active'].map((v) => (
                    <button
                      key={v}
                      onClick={() => updateFact('studentStatus', v as StudentStatus)}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        facts.studentStatus === v ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Programme</label>
                <select
                  value={facts.programme}
                  onChange={(e) => updateFact('programme', e.target.value as Programme)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="Diploma">Diploma</option>
                  <option value="Degree">Degree</option>
                  <option value="Other">Other (Master/PHD/etc)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Student Type</label>
                <div className="flex gap-2">
                  {['Local', 'International'].map((v) => (
                    <button
                      key={v}
                      onClick={() => updateFact('studentType', v as StudentType)}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all ${
                        facts.studentType === v ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">CGPA (leave unknown if unsure)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="4.0"
                  placeholder="e.g. 3.5"
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  onChange={(e) => updateFact('cgpa', e.target.value ? parseFloat(e.target.value) : 'Unknown')}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
              <Users className="text-emerald-600" />
              Financial Background
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Income Category (SSM/LHDN)</label>
                <select
                  value={facts.incomeCategory}
                  onChange={(e) => updateFact('incomeCategory', e.target.value as IncomeCategory)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="B40">B40 (Low Income)</option>
                  <option value="M40">M40 (Medium Income)</option>
                  <option value="T20">T20 (High Income)</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Monthly Household Income (RM)</label>
                <input
                  type="number"
                  placeholder="e.g. 4500"
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  onChange={(e) => updateFact('householdIncome', e.target.value ? parseInt(e.target.value) : 'Unknown')}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">Primary Support Need</label>
                <select
                  value={facts.aidNeed}
                  onChange={(e) => updateFact('aidNeed', e.target.value as AidNeed)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="None">No specific need</option>
                  <option value="Food">Food / Coupons</option>
                  <option value="Internet">Internet / Data</option>
                  <option value="Special Case">Special Financial Case</option>
                  <option value="Disaster">Disaster Relief</option>
                  <option value="Scholarship">Scholarship Referral</option>
                  <option value="Counseling">Counseling / Emotional Support</option>
                  <option value="Accommodation">Accommodation Issues</option>
                </select>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <input
                   type="checkbox"
                   checked={facts.hasPTPTN}
                   onChange={(e) => updateFact('hasPTPTN', e.target.checked)}
                   className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label className="text-sm font-medium text-slate-700">Has existing PTPTN loan?</label>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <input
                   type="checkbox"
                   checked={facts.hasScholarship}
                   onChange={(e) => updateFact('hasScholarship', e.target.checked)}
                   className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label className="text-sm font-medium text-slate-700">Has existing scholarship?</label>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
              <AlertTriangle className="text-amber-600" />
              Emergency & Special Situations
            </h2>
            <div className="space-y-4">
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-start gap-3">
                 <Info className="text-amber-600 w-5 h-5 mt-0.5 shrink-0" />
                 <p className="text-sm text-amber-800">
                   If you are facing an urgent emergency or disaster, please fill this section carefully.
                 </p>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                   type="checkbox"
                   id="emergency"
                   checked={facts.emergencyCase}
                   onChange={(e) => updateFact('emergencyCase', e.target.checked)}
                   className="w-6 h-6 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="emergency" className="text-lg font-medium text-slate-800">This is an urgent emergency/disaster case</label>
              </div>

              {facts.emergencyCase && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white border border-slate-200 rounded-xl"
                >
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-slate-700">Disaster Category</label>
                    <select
                      value={facts.disasterCaseType}
                      onChange={(e) => updateFact('disasterCaseType', e.target.value as DisasterCaseType)}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                    >
                      <option value="None">None</option>
                      <option value="Death of Student">Death of Student</option>
                      <option value="Death of Family Member">Death of Family Member</option>
                      <option value="Serious Accident">Serious Accident</option>
                      <option value="Natural Disaster">Natural Disaster (Flood/Storm)</option>
                      <option value="Fire">Fire Case</option>
                    </select>
                  </div>

                  {facts.disasterCaseType === 'Death of Family Member' && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-slate-700">Relationship</label>
                      <select
                        value={facts.familyMemberType}
                        onChange={(e) => updateFact('familyMemberType', e.target.value as FamilyMemberType)}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg"
                      >
                        <option value="None">Select...</option>
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Guardian">Guardian</option>
                        <option value="Child">Child</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  )}

                  {(facts.disasterCaseType === 'Natural Disaster' || facts.disasterCaseType === 'Fire') && (
                    <div className="flex items-center gap-2 py-4">
                      <input
                        type="checkbox"
                        checked={facts.propertyLoss}
                        onChange={(e) => updateFact('propertyLoss', e.target.checked)}
                        className="w-5 h-5 rounded"
                      />
                      <label className="text-sm font-medium text-slate-700">Was there significant property loss?</label>
                    </div>
                  )}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="text-rose-500 w-5 h-5" />
                    <span className="font-medium text-slate-800">Support Needs</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={facts.stressOrEmotionalIssue}
                        onChange={(e) => updateFact('stressOrEmotionalIssue', e.target.checked)}
                      />
                      Facing stress/emotional issues?
                    </label>
                    {facts.stressOrEmotionalIssue && (
                      <label className="flex items-center gap-2 text-sm ml-6">
                        <input
                          type="checkbox"
                          checked={facts.academicProblemRelatedToStress}
                          onChange={(e) => updateFact('academicProblemRelatedToStress', e.target.checked)}
                        />
                        Affecting academic performance?
                      </label>
                    )}
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={facts.accommodationIssue}
                        onChange={(e) => updateFact('accommodationIssue', e.target.checked)}
                      />
                      Facing accommodation problems?
                    </label>
                  </div>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-col gap-3">
                   <div className="flex items-center gap-2">
                    <FileText className="text-indigo-600 w-5 h-5" />
                    <span className="font-medium text-slate-800">Application Status</span>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-indigo-600 font-bold">Supporting Documents</label>
                    <select
                      value={facts.supportingDocumentStatus}
                      onChange={(e) => updateFact('supportingDocumentStatus', e.target.value as DocumentStatus)}
                      className="w-full p-1.5 text-sm bg-white border border-indigo-200 rounded-lg"
                    >
                      <option value="Not Submitted">Not Submitted</option>
                      <option value="Incomplete">Incomplete</option>
                      <option value="Complete">Complete (Ready to scan/submit)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs uppercase tracking-wider text-indigo-600 font-bold">Official Application Form</label>
                    <select
                      value={facts.applicationFormStatus}
                      onChange={(e) => updateFact('applicationFormStatus', e.target.value as ApplicationStatus)}
                      className="w-full p-1.5 text-sm bg-white border border-indigo-200 rounded-lg"
                    >
                      <option value="Not Submitted">Not Submitted</option>
                      <option value="Submitted">Already Submitted to TD HEP</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const stepsCount = 3;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="bg-indigo-600 px-8 py-6 flex justify-between items-center text-white">
        <div>
          <h1 className="text-xl font-bold">Eligibility Assessment</h1>
          <p className="text-indigo-100 text-sm">Please answer accurately for correct referral.</p>
        </div>
        <div className="text-indigo-200 text-sm font-medium">
          Step {step} of {stepsCount}
        </div>
      </div>
      
      <div className="p-8 min-h-[400px]">
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

      <div className="p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50/50">
        <button
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
            step === 1 ? 'opacity-0 cursor-default' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        
        {step < stepsCount ? (
          <button
            onClick={nextStep}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Next Step
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => onComplete(facts)}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            Run Expert Inference
            <CheckCircle2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
