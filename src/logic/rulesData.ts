export interface RuleDefinition {
  id: number;
  condition: string;
  conclusion: string;
}

export interface RuleDefinition {
  id: number;
  condition: string;
  conclusion: string;
}

export const RULES_DATA: Record<number, RuleDefinition> = {
  1: {
    id: 1,
    condition: "The screening process is started by the student.",
    conclusion: "Official application form is required for final verification."
  },
  2: {
    id: 2,
    condition: "A student expresses a need for financial assistance.",
    conclusion: "Submit official application form to TD HEP office."
  },
  3: {
    id: 3,
    condition: "The student's official records are incomplete or have not been verified yet.",
    conclusion: "Faculty cannot rely solely on MAYA/student database; manual submission required."
  },
  4: {
    id: 4,
    condition: "The system identifies a potential aid match for the student.",
    conclusion: "Status is 'Recommendation Pending Verification' by FSKTM office."
  },
  5: {
    id: 5,
    condition: "The student is currently active and enrolled in either a Diploma or Degree programme.",
    conclusion: "Eligible for initial welfare screening."
  },
  6: {
    id: 6,
    condition: "The student is currently not active in their studies.",
    conclusion: "Not eligible for FSKTM student welfare screening."
  },
  7: {
    id: 7,
    condition: "The student is enrolled in a programme other than Diploma or Degree.",
    conclusion: "Not eligible for this specific welfare aid screening."
  },
  8: {
    id: 8,
    condition: "The student is a Local student and belongs to the B40 income group.",
    conclusion: "Proceed with B40 FSKTM Student Financial Aid Screening."
  },
  9: {
    id: 9,
    condition: "The student is an International student and belongs to the B40 income group.",
    conclusion: "B40 financial aid is for local students only."
  },
  10: {
    id: 10,
    condition: "The student is in the B40 group and specifically needs assistance with food costs.",
    conclusion: "Recommend Food Coupon Aid (RM150 x 4 months)."
  },
  11: {
    id: 11,
    condition: "The student is in the B40 group and specifically needs assistance with internet or data costs.",
    conclusion: "Recommend Internet Aid (RM30 x 4 months)."
  },
  12: {
    id: 12,
    condition: "The student is in the B40 group, has a special financial case, and has provided all required documents.",
    conclusion: "Recommend Special Case Aid (Up to RM500)."
  },
  13: {
    id: 13,
    condition: "The student is in the B40 group and has a special financial case, but some documents are still missing.",
    conclusion: "Request missing documents for Special Case Aid."
  },
  14: {
    id: 14,
    condition: "The student belongs to the M40 income group and needs standard financial assistance.",
    conclusion: "Refer for Manual Review by TD HEP / Deputy Dean."
  },
  15: {
    id: 15,
    condition: "The student is in the M40 group but is facing an urgent emergency situation.",
    conclusion: "Proceed with Disaster/Emergency screening regardless of M40 status."
  },
  16: {
    id: 16,
    condition: "The student belongs to the T20 income group and has no emergency or special case.",
    conclusion: "Assigned Low Priority for welfare funds."
  },
  17: {
    id: 17,
    condition: "The student belongs to the T20 income group but is facing an emergency or a special financial case.",
    conclusion: "Proceed with Emergency/Special Case screening for T20."
  },
  18: {
    id: 18,
    condition: "The student's income category is currently unknown or not provided.",
    conclusion: "Request income information and documents for screening."
  },
  19: {
    id: 19,
    condition: "The student is facing an urgent emergency or disaster situation.",
    conclusion: "Proceed with Student Disaster Relief Fund Screening."
  },
  20: {
    id: 20,
    condition: "The case involves the death of a student and all proof has been provided.",
    conclusion: "Recommend Disaster Relief (Death) - RM500."
  },
  21: {
    id: 21,
    condition: "The case involves the death of a student but the death certificate or bank details are missing.",
    conclusion: "Request Death Certificate and Heir Bank Account copy."
  },
  22: {
    id: 22,
    condition: "The case involves the death of an immediate family member and all proof is complete.",
    conclusion: "Recommend Disaster Relief (Family Death) - RM250."
  },
  23: {
    id: 23,
    condition: "The case involves the death of an immediate family member but proof of relationship or death is missing.",
    conclusion: "Request Death Certificate and Relationship Proof."
  },
  24: {
    id: 24,
    condition: "The case involves the death of an extended family member (not parents, guardians, or children).",
    conclusion: "Refer for Manual Review (Extended Family Case)."
  },
  25: {
    id: 25,
    condition: "The student has been involved in a serious accident and has all official reports ready.",
    conclusion: "Recommend Disaster Relief (Accident) - RM200."
  },
  26: {
    id: 26,
    condition: "The student has been involved in a serious accident but police or medical reports are missing.",
    conclusion: "Request Police and Medical Reports."
  },
  27: {
    id: 27,
    condition: "The student is a victim of a natural disaster or fire with property loss, and has proof.",
    conclusion: "Recommend Disaster Relief (Property Loss) - RM200."
  },
  28: {
    id: 28,
    condition: "The student is a victim of a natural disaster or fire with property loss, but official reports are missing.",
    conclusion: "Request Authority Report and Photographic Proof."
  },
  29: {
    id: 29,
    condition: "The student is a victim of a natural disaster or fire but has not reported significant property loss.",
    conclusion: "Refer for Manual Verification of disaster impact."
  },
  30: {
    id: 30,
    condition: "An emergency is reported but it does not fit into the standard disaster categories.",
    conclusion: "Manual Review required for non-standard emergency."
  },
  31: {
    id: 31,
    condition: "A student asks about scholarships or belongs to the B40 income group.",
    conclusion: "Proceed with Scholarship Suitability Screening."
  },
  32: {
    id: 32,
    condition: "The student has a CGPA of 3.0 or higher and belongs to the B40 or M40 income group.",
    conclusion: "Recommend Scholarship referral (Check Instagram/Gmail)."
  },
  33: {
    id: 33,
    condition: "The student's CGPA is currently below 3.0.",
    conclusion: "Scholarship not recommended; focus on improving CGPA."
  },
  34: {
    id: 34,
    condition: "The household income exceeds the threshold for welfare-based support (T20).",
    conclusion: "May not meet welfare-based scholarship requirements."
  },
  35: {
    id: 35,
    condition: "The specific requirements for a scholarship sponsor are currently unknown.",
    conclusion: "Check latest FSKTM official announcements (Sponsor criteria vary)."
  },
  36: {
    id: 36,
    condition: "A student is interested in a scholarship but has not provided their CGPA.",
    conclusion: "Request CGPA information for suitability check."
  },
  37: {
    id: 37,
    condition: "The student reports experiencing stress or emotional issues.",
    conclusion: "Recommend Counseling Referral (Medium Priority)."
  },
  38: {
    id: 38,
    condition: "The student's stress or emotional issues are directly affecting their academic performance.",
    conclusion: "Recommend Counseling Referral (High Priority)."
  },
  39: {
    id: 39,
    condition: "A student from the B40 group is experiencing emotional stress.",
    conclusion: "High Priority Counseling + Financial Aid combination."
  },
  40: {
    id: 40,
    condition: "A student facing an emergency situation is also experiencing emotional stress.",
    conclusion: "High Priority Counseling + Urgent Aid combination."
  },
  41: {
    id: 41,
    condition: "The student is facing issues with their living accommodations.",
    conclusion: "Recommend Accommodation Referral (Medium Priority)."
  },
  42: {
    id: 42,
    condition: "A student from the B40 group is facing issues with their living accommodations.",
    conclusion: "Recommend Accommodation Referral (High Priority)."
  },
  43: {
    id: 43,
    condition: "A student facing an emergency is also having issues with their living accommodations.",
    conclusion: "Recommend Accommodation Referral (High Priority)."
  },
  44: {
    id: 44,
    condition: "The student already has a PTPTN loan but still reports needing additional aid.",
    conclusion: "Student may apply for additional welfare funds if eligible."
  },
  45: {
    id: 45,
    condition: "The student already has a scholarship but is now facing an emergency or disaster.",
    conclusion: "Student may still apply for disaster relief funds."
  },
  46: {
    id: 46,
    condition: "The student already has a scholarship and reports no other financial needs.",
    conclusion: "No additional aid recommended (Existing support sufficient)."
  },
  47: {
    id: 47,
    condition: "The application is for a specific aid but required supporting documents are missing.",
    conclusion: "Application cannot be processed until documents are submitted."
  },
  48: {
    id: 48,
    condition: "The system identifies that more than one support condition has been met by the student.",
    conclusion: "Generate multiple recommendations and assign highest priority."
  }
};
