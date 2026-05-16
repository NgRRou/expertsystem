import { UserFacts, Recommendation, Priority, InferenceResult } from '../types';

export function runInference(facts: UserFacts): InferenceResult {
  const recommendations: Recommendation[] = [];
  let isEligible = true;
  let eligibilityMessage = "";

  // Helper to add unique recommendations
  const addRec = (rec: Omit<Recommendation, 'id'>) => {
    if (!recommendations.find(r => r.type === rec.type)) {
      recommendations.push({ ...rec, id: Math.random().toString(36).substr(2, 9) });
    }
  };

  // Rule 5: Active Student Eligible for Screening
  if (facts.studentStatus === 'Active' && (facts.programme === 'Diploma' || facts.programme === 'Degree')) {
      // Basic eligibility satisfied, continue screening.
  } else if (facts.studentStatus === 'Not Active') {
    // Rule 6: Not Active Student
    return {
      recommendations: [],
      finalPriority: 'Low',
      isEligible: false,
      eligibilityMessage: "Not eligible for FSKTM student welfare screening. Student must be active to proceed."
    };
  } else if (facts.programme !== 'Diploma' && facts.programme !== 'Degree') {
    // Rule 7: Programme Not Eligible
    return {
      recommendations: [],
      finalPriority: 'Low',
      isEligible: false,
      eligibilityMessage: "Not eligible for this welfare aid screening. This screening is for active Diploma or Degree students."
    };
  }

  // Rule 1, 2, 3, 4: Application Context (System Boundary)
  const baseExplanation = "Final approval depends on official application form, supporting documents, and office verification. TD HEP / FSKTM office will make the final decision.";

  // Rule 8: Local B40 Student Can Be Screened
  // Handled by the studentType and incomeCategory checks below.

  // Rule 9: International Student B40 restriction
  if (facts.studentType === 'International' && facts.incomeCategory === 'B40') {
    // This is handled implicitly by the Local check below, but explicitly:
    // Recommendation: Not eligible for B40 financial aid.
  }

  // B40 Financial Aid Rules (10, 11, 12, 13)
  if (facts.studentType === 'Local' && facts.incomeCategory === 'B40') {
    if (facts.aidNeed === 'Food') {
      addRec({
        type: "Food Coupon Aid",
        priority: "High",
        amount: "RM150 per month for 4 months",
        totalAmount: "RM600",
        explanation: "B40 students with food support needs are eligible for monthly food coupons.",
        nextAction: ["Submit official application form"]
      });
    }

    if (facts.aidNeed === 'Internet') {
      addRec({
        type: "Internet Aid",
        priority: "Medium",
        amount: "RM30 per month for 4 months",
        totalAmount: "RM120",
        explanation: "B40 students with internet needs can apply for data subscription aid.",
        nextAction: ["Submit official application form"]
      });
    }

    if (facts.aidNeed === 'Special Case') {
      if (facts.supportingDocumentStatus === 'Complete') {
        addRec({
          type: "Special Case Aid",
          priority: "High",
          amount: "Up to RM500",
          explanation: "Special case aid is available for B40 students with complete documentation.",
          nextAction: ["Application ready for office verification"]
        });
      } else {
        // Rule 13: B40 Special Case Aid With Missing Documents
        addRec({
          type: "Request Supporting Documents",
          priority: "High",
          explanation: "Special case aid requires missing documents requested by TD HEP / FSKTM.",
          nextAction: ["Submit missing supporting documents"]
        });
      }
    }
  } else if (facts.studentType === 'International' && facts.aidNeed === 'Food') {
      // Logic for Rule 9 (implied)
  }

  // M40 and T20 Handling (14, 15, 16, 17)
  if (facts.incomeCategory === 'M40') {
    // Rule 15: M40 Student With Emergency Case handled in disaster section
    if (facts.aidNeed === 'Food' || facts.aidNeed === 'Internet' || facts.aidNeed === 'Special Case') {
        // Rule 14: M40 Student Needing Aid
        if (!facts.emergencyCase) {
            addRec({
                type: "Manual Review (M40)",
                priority: "Medium",
                explanation: "Refer to TD HEP / Deputy Dean Student Affairs Office for manual review. M40 cases may require case-by-case checking.",
                nextAction: ["Contact TD HEP / Deputy Dean Student Affairs Office"]
            });
        }
    }
  }

  if (facts.incomeCategory === 'T20' && !facts.emergencyCase && facts.aidNeed !== 'Special Case') {
      // Rule 16: T20 Student Without Emergency or Special Case
      addRec({
          type: "Low Priority",
          priority: "Low",
          explanation: "Student does not match the main priority category for standard welfare funds.",
          nextAction: ["Check other non-welfare support if needed"]
      });
  } else if (facts.incomeCategory === 'T20' && (facts.emergencyCase || facts.aidNeed === 'Special Case')) {
      // Rule 17: T20 Student With Emergency or Special Case
      // Handled in disaster section
  }

  // Rule 18: Unknown Income Category
  if (facts.incomeCategory === 'Unknown') {
      addRec({
          type: "Request Income Information",
          priority: "Medium",
          explanation: "Income category is needed for financial aid screening. Please fill in application form and provide income documents.",
          nextAction: ["Submit official application form", "Provide income-related documents"]
      });
  }

  // Rule 19: Disaster Relief Screening
  // Disaster Relief Fund Rules (20 - 30)
  if (facts.emergencyCase || facts.aidNeed === 'Disaster') {
    if (facts.disasterCaseType === 'Death of Student') {
      if (facts.supportingDocumentStatus === 'Complete') {
        // Rule 20: Death of Student
        addRec({
          type: "Student Disaster Relief Fund (Death)",
          priority: "High",
          amount: "RM500",
          explanation: "Aid for student death cases with complete proof.",
          nextAction: ["Submit official application form"],
          requiredDocuments: ["Death certificate", "Heir bank account copy"]
        });
      } else {
        // Rule 21: Death of Student With Missing Documents
        addRec({
          type: "Document Request (Death)",
          priority: "High",
          explanation: "Disaster relief cannot be processed without proof of death.",
          nextAction: ["Submit death certificate", "Submit heir bank account copy"],
          requiredDocuments: ["Death certificate", "Heir bank account copy"]
        });
      }
    }

    if (facts.disasterCaseType === 'Death of Family Member') {
      const eligibleFamily = ['Mother', 'Father', 'Guardian', 'Child'].includes(facts.familyMemberType);
      if (eligibleFamily) {
        if (facts.supportingDocumentStatus === 'Complete') {
            // Rule 22: Death of Family Member
            addRec({
                type: "Student Disaster Relief Fund (Family Death)",
                priority: "High",
                amount: "RM250",
                explanation: "Aid for death of immediate family members (Mother/Father/Guardian/Child).",
                nextAction: ["Submit official application form"],
                requiredDocuments: ["Death certificate", "Relationship confirmation document"]
            });
        } else {
            // Rule 23: Death of Family Member With Missing Documents
            addRec({
                type: "Document Request (Family Death)",
                priority: "High",
                explanation: "Relationship and death proof are required for processing family disaster relief.",
                nextAction: ["Submit death certificate", "Submit relationship confirmation document"]
            });
        }
      } else if (facts.familyMemberType === 'Other') {
        // Rule 24: Death of Other Family Member
        addRec({
            type: "Manual Review (Extended Family)",
            priority: "Medium",
            explanation: "Standard disaster category covers mother, father, guardian, or child. Other cases require manual review.",
            nextAction: ["Contact TD HEP / FSKTM office for special consideration"]
        });
      }
    }

    if (facts.disasterCaseType === 'Serious Accident') {
        if (facts.supportingDocumentStatus === 'Complete') {
            // Rule 25: Serious Accident
            addRec({
                type: "Student Disaster Relief Fund (Accident)",
                priority: "High",
                amount: "RM200",
                explanation: "Aid for serious accident cases with complete documentation.",
                nextAction: ["Submit official application form"],
                requiredDocuments: ["Police report", "Medical report"]
            });
        } else {
            // Rule 26: Serious Accident With Missing Documents
            addRec({
                type: "Document Request (Accident)",
                priority: "High",
                explanation: "Accident case requires official medical and police reports.",
                nextAction: ["Submit police report", "Submit medical report"]
            });
        }
    }

    if (facts.disasterCaseType === 'Natural Disaster' || facts.disasterCaseType === 'Fire') {
        if (facts.propertyLoss) {
            if (facts.supportingDocumentStatus === 'Complete') {
                // Rule 27: Natural Disaster / Fire With Property Loss
                addRec({
                    type: "Student Disaster Relief Fund (Property Loss)",
                    priority: "High",
                    amount: "RM200",
                    explanation: "Aid for property loss due to natural disaster or fire.",
                    nextAction: ["Submit official application form"],
                    requiredDocuments: ["Authority report", "Proof such as photo/news clipping"]
                });
            } else {
                // Rule 28: Natural Disaster / Fire With Missing Documents
                addRec({
                    type: "Document Request (Property Loss)",
                    priority: "High",
                    explanation: "Property loss must be supported with official evidence.",
                    nextAction: ["Submit authority report", "Provide photographic proof or news clipping"]
                });
            }
        } else {
            // Rule 29: Natural Disaster / Fire Without Property Loss
            addRec({
                type: "Manual Review (Disaster)",
                priority: "Medium",
                explanation: "Disaster relief for this category usually involves property loss. Manual verification required.",
                nextAction: ["Contact TD HEP / FSKTM office"]
            });
        }
    }

    // Rule 30: Emergency Case but No Valid Disaster Type
    if (facts.emergencyCase && facts.disasterCaseType === 'None') {
        addRec({
            type: "Manual Review (Urgent Case)",
            priority: "High",
            explanation: "Emergency case does not match standard disaster categories. Manual review required.",
            nextAction: ["Contact TD HEP / FSKTM office immediately"]
        });
    }
  }

  // Scholarship Referral Rules (31 - 36)
  if (facts.aidNeed === 'Scholarship' || facts.incomeCategory === 'B40') {
    // Rule 31: Scholarship Referral
    if (facts.cgpa === 'Unknown') {
        // Rule 36: Student Interested in Scholarship but CGPA Unknown
        addRec({
            type: "Request CGPA information",
            priority: "Medium",
            explanation: "CGPA is needed to check scholarship suitability.",
            nextAction: ["Provide CGPA information"]
        });
    } else if (typeof facts.cgpa === 'number') {
        const meetCgpa = facts.cgpa >= 3.0; 
        const meetIncome = facts.incomeCategory === 'B40' || facts.incomeCategory === 'M40';

        if (meetCgpa && meetIncome) {
            // Rule 32: B40 Student With Scholarship Potential
            addRec({
                type: "Scholarship Information / Referral",
                priority: "Medium",
                explanation: "Your CGPA and income condition may meet scholarship requirements. Scholarship depends on sponsor requirements.",
                nextAction: ["Check FSKTM Instagram or Gmail announcement and apply through stated channel"]
            });
        } else if (!meetCgpa) {
            // Rule 33: CGPA Does Not Meet Scholarship Requirement
            addRec({
                type: "Scholarship Not Recommended",
                priority: "Low",
                explanation: "Scholarship opportunities usually require students to meet minimum CGPA (usually 3.0 or higher).",
                nextAction: ["Improve CGPA for future applications"]
            });
        } else if (!meetIncome && facts.incomeCategory === 'T20') {
            // Rule 34: Income Does Not Meet Scholarship Requirement (Refined with Household Income)
            const incomeValue = facts.householdIncome === 'Unknown' ? 999999 : facts.householdIncome;
            if (incomeValue > 10000) { // Example threshold for T20 context
                addRec({
                    type: "Scholarship Suitability Check",
                    priority: "Low",
                    explanation: "Some scholarships require both CGPA and income eligibility. Your income category may not meet criteria for welfare-based scholarships.",
                    nextAction: ["Check for merit-only scholarships"]
                });
            }
        }
    }

    // Rule 35: Unknown Scholarship Requirement
    if (facts.aidNeed === 'Scholarship') {
        addRec({
            type: "Scholarship Policy Note",
            priority: "Low",
            explanation: "Scholarship criteria may differ depending on sponsor. FSKTM shares latest info via Instagram/Gmail.",
            nextAction: ["Monitor FSKTM official announcement channels"]
        });
    }
  }

  // Counseling Referral Rules (37 - 40)
  if (facts.stressOrEmotionalIssue) {
    let counselorPriority: Priority = "Medium";
    let explanation = "Student may benefit from emotional or personal support.";
    
    // Rule 38: Counseling Referral Due to Academic Impact
    if (facts.academicProblemRelatedToStress) {
        counselorPriority = "High";
        explanation = "Student's well-being issue may be affecting academic performance. High priority referral suggested.";
    } else {
        // Rule 37: Counseling Referral Due to Stress
    }

    // Rule 39: Financial Aid and Counseling Combination
    if (facts.incomeCategory === 'B40') {
        explanation += " Student may need both financial and emotional support.";
        counselorPriority = "High";
    }

    // Rule 40: Emergency and Counseling Combination
    if (facts.emergencyCase) {
        explanation += " Student may require both urgent aid and emotional support.";
        counselorPriority = "High";
    }

    addRec({
        type: "Counseling Referral",
        priority: counselorPriority,
        explanation: explanation,
        nextAction: ["Contact counseling unit"]
    });
  }

  // Accommodation Referral Rules (41 - 43)
  if (facts.accommodationIssue) {
    let accPriority: Priority = "Medium";
    
    // Rule 41: Accommodation Issue Only
    // Rule 42: Accommodation Issue With B40 Financial Need
    // Rule 43: Accommodation Issue With Emergency Case
    if (facts.incomeCategory === 'B40' || facts.emergencyCase) {
        accPriority = "High";
    }

    addRec({
        type: "Accommodation Referral",
        priority: accPriority,
        explanation: "Accommodation support issues should be referred to the relevant faculty/accommodation office.",
        nextAction: ["Contact faculty or relevant accommodation office"]
    });
  }

  // Rule 44: Student Has PTPTN but Still Needs Aid
  if (facts.hasPTPTN && facts.aidNeed !== 'None') {
      // Logic handled by normal aid flow, but could add a note
  }

  // Rule 45, 46: Priority/Logic combinations
  if (facts.hasScholarship && !facts.emergencyCase && facts.aidNeed === 'None') {
      // Rule 46: Student Has Scholarship and No Other Need
      addRec({
          type: "Low Priority (Existing Support)",
          priority: "Low",
          explanation: "Student already has financial support and has no additional reported need.",
          nextAction: ["Maintain existing support"]
      });
  } else if (facts.hasScholarship && facts.emergencyCase) {
      // Rule 45: Student Has Scholarship but Has Emergency Case
      // Handled by disaster rules flow
  }

  // Rule 47: Supporting Documents Required
  if (facts.supportingDocumentStatus === 'Incomplete' && (facts.aidNeed !== 'None' || facts.emergencyCase)) {
      addRec({
          type: "Document Requirement Alert",
          priority: "High",
          explanation: "Application cannot be processed until required documents are submitted. Please prepare missing files.",
          nextAction: ["Submit missing supporting documents"]
      });
  }

  // Final Priority Calculation (Rule 48: Multiple Recommendations)
  let finalPriority: Priority = 'Low';
  if (recommendations.some(r => r.priority === 'High')) {
    finalPriority = 'High';
  } else if (recommendations.some(r => r.priority === 'Medium')) {
    finalPriority = 'Medium';
  }

  // If no specific recommendations were triggered but student is eligible
  if (recommendations.length === 0) {
      addRec({
          type: "General Advice",
          priority: "Low",
          explanation: "No specific aid triggered. Please consult with TD HEP if you believe you have a special case.",
          nextAction: ["Consult with FSKTM Office"]
      });
  }

  return {
    recommendations,
    finalPriority,
    isEligible,
    eligibilityMessage: recommendations.length > 1 ? "Multiple recommendations generated based on your profile. " + baseExplanation : baseExplanation
  };
}
