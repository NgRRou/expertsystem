export type StudentStatus = 'Active' | 'Not Active';
export type Programme = 'Diploma' | 'Degree' | 'Other';
export type StudentType = 'Local' | 'International';
export type IncomeCategory = 'B40' | 'M40' | 'T20' | 'Unknown';
export type AidNeed = 'Food' | 'Internet' | 'Special Case' | 'Disaster' | 'Scholarship' | 'Counseling' | 'Accommodation' | 'None';
export type DisasterCaseType = 'Death of Student' | 'Death of Family Member' | 'Serious Accident' | 'Natural Disaster' | 'Fire' | 'None';
export type FamilyMemberType = 'Mother' | 'Father' | 'Guardian' | 'Child' | 'Other' | 'None';
export type DocumentStatus = 'Complete' | 'Incomplete' | 'Not Submitted';
export type ApplicationStatus = 'Submitted' | 'Not Submitted';

export interface UserFacts {
  studentStatus: StudentStatus;
  programme: Programme;
  studentType: StudentType;
  incomeCategory: IncomeCategory;
  householdIncome: number | 'Unknown';
  aidNeed: AidNeed;
  hasPTPTN: boolean;
  hasScholarship: boolean;
  cgpa: number | 'Unknown';
  emergencyCase: boolean;
  disasterCaseType: DisasterCaseType;
  familyMemberType: FamilyMemberType;
  propertyLoss: boolean;
  supportingDocumentStatus: DocumentStatus;
  applicationFormStatus: ApplicationStatus;
  stressOrEmotionalIssue: boolean;
  academicProblemRelatedToStress: boolean;
  accommodationIssue: boolean;
}

export type Priority = 'High' | 'Medium' | 'Low';

export interface Recommendation {
  id: string;
  type: string;
  priority: Priority;
  amount?: string;
  totalAmount?: string;
  explanation: string;
  nextAction: string[];
  requiredDocuments?: string[];
}

export interface InferenceResult {
  recommendations: Recommendation[];
  finalPriority: Priority;
  isEligible: boolean;
  eligibilityMessage?: string;
}
