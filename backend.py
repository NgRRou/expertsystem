import collections
import collections.abc
collections.Mapping = collections.abc.Mapping
collections.MutableMapping = collections.abc.MutableMapping
collections.Sequence = collections.abc.Sequence
collections.MutableSequence = collections.abc.MutableSequence
collections.Iterable = collections.abc.Iterable
collections.Callable = collections.abc.Callable

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union
from experta import *
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FactModel(BaseModel):
    studentStatus: str
    programme: str
    studentType: str
    incomeCategory: str
    householdIncome: Union[float, int, str]
    aidNeed: str
    hasPTPTN: bool
    hasScholarship: bool
    cgpa: Union[float, str]
    emergencyCase: bool
    disasterCaseType: str
    familyMemberType: str
    propertyLoss: bool
    supportingDocumentStatus: str
    applicationFormStatus: str
    stressOrEmotionalIssue: bool
    academicProblemRelatedToStress: bool
    accommodationIssue: bool

class Student(Fact):
    pass

class WelfareEngine(KnowledgeEngine):
    def __init__(self):
        super().__init__()
        self.recommendations = []
        self.eligible = True
        self.eligibility_message = ""

    def add_rec(self, rec_type, priority, explanation, nextAction, rules, amount=None, totalAmount=None, requiredDocuments=None):
        rec = {
            "id": str(uuid.uuid4()),
            "type": rec_type,
            "priority": priority,
            "explanation": explanation,
            "nextAction": nextAction,
            "rulesFired": rules
        }
        if amount: rec["amount"] = amount
        if totalAmount: rec["totalAmount"] = totalAmount
        if requiredDocuments: rec["requiredDocuments"] = requiredDocuments
        self.recommendations.append(rec)

    @Rule(Student(studentStatus='Not Active'))
    def rule_6(self):
        self.eligible = False
        self.eligibility_message = "Not eligible for FSKTM student welfare screening. Student must be active to proceed. (Rule 6 fired)"
    
    @Rule(Student(programme=~L('Diploma') & ~L('Degree')))
    def rule_7(self):
        self.eligible = False
        self.eligibility_message = "Not eligible for this welfare aid screening. This screening is for active Diploma or Degree students. (Rule 7 fired)"
    
    @Rule(Student(studentStatus='Active', studentType='Local', incomeCategory='B40', aidNeed='Food'))
    def rule_10(self):
        self.add_rec("Food Coupon Aid", "High", "B40 students with food support needs are eligible for monthly food coupons.", ["Submit official application form to TD HEP Office (hep_fsktm@um.edu.my)"], [8, 10], "RM150 per month for 4 months", "RM600")
        
    @Rule(Student(studentStatus='Active', studentType='Local', incomeCategory='B40', aidNeed='Internet'))
    def rule_11(self):
        self.add_rec("Internet Aid", "Medium", "B40 students with internet needs can apply for data subscription aid.", ["Submit official application form to TD HEP Office (hep_fsktm@um.edu.my)"], [8, 11], "RM30 per month for 4 months", "RM120")

    @Rule(Student(studentStatus='Active', studentType='Local', incomeCategory='B40', aidNeed='Special Case', supportingDocumentStatus='Complete'))
    def rule_12(self):
        self.add_rec("Special Case Aid", "High", "Special case aid is available for B40 students with complete documentation.", ["Application ready for office verification"], [8, 12], "Up to RM500")

    @Rule(Student(studentStatus='Active', studentType='Local', incomeCategory='B40', aidNeed='Special Case', supportingDocumentStatus='Incomplete'))
    def rule_13(self):
        self.add_rec("Request Supporting Documents", "High", "Special case aid requires missing documents requested by TD HEP / FSKTM.", ["Submit missing supporting documents"], [8, 13])

    @Rule(Student(studentStatus='Active', studentType='International', aidNeed='Food'))
    def rule_9(self):
        self.add_rec("B40 Aid Ineligible", "Low", "B40 financial aid is for local students only. International students may check for disaster relief if applicable.", ["Consult TD HEP for international student specific aid"], [9])

    @Rule(Student(studentStatus='Active', incomeCategory='M40', emergencyCase=False, aidNeed=L('Food') | L('Internet') | L('Special Case')))
    def rule_14(self):
        self.add_rec("Manual Review (M40)", "Medium", "Refer to TD HEP / Deputy Dean Student Affairs Office for manual review. M40 cases may require case-by-case checking.", ["Visit TD HEP Office", "Email: hep_fsktm@um.edu.my"], [14])

    @Rule(Student(studentStatus='Active', incomeCategory='T20', emergencyCase=False, aidNeed=~L('Special Case')))
    def rule_16(self):
        self.add_rec("Low Priority", "Low", "Student does not match the main priority category for standard welfare funds.", ["Check other non-welfare support if needed"], [16])

    @Rule(Student(studentStatus='Active', incomeCategory='Unknown'))
    def rule_18(self):
        self.add_rec("Request Income Information", "Medium", "Income category is needed for financial aid screening. Please fill in application form and provide income documents.", ["Submit official application form", "Provide income-related documents"], [18])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType='Death of Student', supportingDocumentStatus='Complete'))
    def rule_20(self):
        self.add_rec("Student Disaster Relief Fund (Death)", "High", "Aid for student death cases with complete proof.", ["Submit official application form"], [19, 20], "RM500", requiredDocuments=["Death certificate", "Heir bank account copy"])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType='Death of Student', supportingDocumentStatus='Incomplete'))
    def rule_21(self):
        self.add_rec("Document Request (Death)", "High", "Disaster relief cannot be processed without proof of death.", ["Submit death certificate", "Submit heir bank account copy"], [19, 21], requiredDocuments=["Death certificate", "Heir bank account copy"])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType='Death of Family Member', familyMemberType=L('Mother') | L('Father') | L('Guardian') | L('Child') | L('Sibling') | L('Spouse'), supportingDocumentStatus='Complete'))
    def rule_22(self):
        self.add_rec("Student Disaster Relief Fund (Family Death)", "High", "Aid for death of immediate family members (Mother/Father/Guardian/Child).", ["Submit official application form"], [19, 22], "RM250", requiredDocuments=["Death certificate", "Relationship confirmation document"])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType='Death of Family Member', familyMemberType=L('Mother') | L('Father') | L('Guardian') | L('Child') | L('Sibling') | L('Spouse'), supportingDocumentStatus='Incomplete'))
    def rule_23(self):
        self.add_rec("Document Request (Family Death)", "High", "Relationship and death proof are required for processing family disaster relief.", ["Submit death certificate", "Submit relationship confirmation document"], [19, 23])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType='Death of Family Member', familyMemberType='Other'))
    def rule_24(self):
        self.add_rec("Manual Review (Extended Family)", "Medium", "Standard disaster category covers mother, father, guardian, or child. Other cases require manual review.", ["Visit TD HEP Office for special consideration"], [19, 24])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType='Serious Accident', supportingDocumentStatus='Complete'))
    def rule_25(self):
        self.add_rec("Student Disaster Relief Fund (Accident)", "High", "Aid for serious accident cases with complete documentation.", ["Submit official application form"], [19, 25], "RM200", requiredDocuments=["Police report", "Medical report"])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType='Serious Accident', supportingDocumentStatus='Incomplete'))
    def rule_26(self):
        self.add_rec("Document Request (Accident)", "High", "Accident case requires official medical and police reports.", ["Submit police report", "Submit medical report"], [19, 26])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType=L('Natural Disaster') | L('Fire'), propertyLoss=True, supportingDocumentStatus='Complete'))
    def rule_27(self):
        self.add_rec("Student Disaster Relief Fund (Property Loss)", "High", "Aid for property loss due to natural disaster or fire.", ["Submit official application form"], [19, 27], "RM200", requiredDocuments=["Authority report", "Proof such as photo/news clipping"])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType=L('Natural Disaster') | L('Fire'), propertyLoss=True, supportingDocumentStatus='Incomplete'))
    def rule_28(self):
        self.add_rec("Document Request (Property Loss)", "High", "Property loss must be supported with official evidence.", ["Submit authority report", "Provide photographic proof or news clipping"], [19, 28])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType=L('Natural Disaster') | L('Fire'), propertyLoss=False))
    def rule_29(self):
        self.add_rec("Manual Review (Disaster)", "Medium", "Disaster relief for this category usually involves property loss. Manual verification required.", ["Contact TD HEP Office (hep_fsktm@um.edu.my)"], [19, 29])

    @Rule(Student(studentStatus='Active', emergencyCase=True, disasterCaseType='None'))
    def rule_30(self):
        self.add_rec("Manual Review (Urgent Case)", "High", "Emergency case does not match standard disaster categories. Manual review required.", ["Contact TD HEP / FSKTM office immediately"], [30])

    @Rule(Student(studentStatus='Active', hasScholarship=True))
    def rule_45(self):
        self.add_rec("Scholarship & Disaster Note", "High", "As you have an existing scholarship and a current emergency, you may still apply for disaster relief funds.", ["Submit disaster relief application regardless of scholarship status"], [45])

    @Rule(Student(studentStatus='Active', aidNeed='Scholarship', cgpa='Unknown'))
    def rule_36(self):
        self.add_rec("Request CGPA information", "Medium", "CGPA is needed to check scholarship suitability.", ["Provide CGPA information"], [31, 36])

    @Rule(Student(studentStatus='Active', aidNeed='Scholarship', cgpa=P(lambda x: isinstance(x, (float, int)) and float(x) >= 3.0), incomeCategory=L('B40') | L('M40')))
    def rule_32(self):
        self.add_rec("Scholarship Information / Referral", "Medium", "Your CGPA and income condition may meet scholarship requirements. Scholarship depends on sponsor requirements.", ["Check FSKTM Instagram or Gmail announcement and apply through stated channel"], [31, 32])

    @Rule(Student(studentStatus='Active', aidNeed='Scholarship', cgpa=P(lambda x: isinstance(x, (float, int)) and float(x) < 3.0)))
    def rule_33(self):
        self.add_rec("Scholarship Not Recommended", "Low", "Scholarship opportunities usually require students to meet minimum CGPA (usually 3.0 or higher).", ["Improve CGPA for future applications"], [31, 33])

    @Rule(Student(studentStatus='Active', aidNeed='Scholarship'))
    def rule_35(self):
        self.add_rec("Scholarship Policy Note", "Low", "Scholarship criteria may differ depending on sponsor. FSKTM shares latest info via Instagram/Gmail.", ["Monitor FSKTM official announcement channels"], [35])

    @Rule(Student(studentStatus='Active', stressOrEmotionalIssue=True, academicProblemRelatedToStress=False, incomeCategory=~L('B40'), emergencyCase=False))
    def rule_37(self):
        self.add_rec("Counseling Referral", "Medium", "Student may benefit from emotional or personal support.", ["Contact Counseling Unit"], [37])

    @Rule(Student(studentStatus='Active', stressOrEmotionalIssue=True, academicProblemRelatedToStress=True))
    def rule_38(self):
        self.add_rec("Counseling Referral", "High", "Student's well-being issue may be affecting academic performance. High priority referral suggested.", ["Contact Counseling Unit"], [37, 38])

    @Rule(Student(studentStatus='Active', stressOrEmotionalIssue=True, incomeCategory='B40'))
    def rule_39(self):
        self.add_rec("Counseling Referral", "High", "Student may benefit from emotional or personal support. Student may need both financial and emotional support.", ["Contact Counseling Unit"], [37, 39])

    @Rule(Student(studentStatus='Active', stressOrEmotionalIssue=True, emergencyCase=True))
    def rule_40(self):
        self.add_rec("Counseling Referral", "High", "Student may benefit from emotional or personal support. Student may require both urgent aid and emotional support.", ["Contact Counseling Unit"], [37, 40])

    @Rule(Student(studentStatus='Active', accommodationIssue=True, incomeCategory=~L('B40'), emergencyCase=False))
    def rule_41(self):
        self.add_rec("Accommodation Referral", "Medium", "Accommodation support issues should be referred to the relevant faculty/accommodation office.", ["Contact faculty or relevant accommodation office"], [41])

    @Rule(Student(studentStatus='Active', accommodationIssue=True, incomeCategory='B40'))
    def rule_42(self):
        self.add_rec("Accommodation Referral", "High", "Accommodation support issues should be referred to the relevant faculty/accommodation office.", ["Contact faculty or relevant accommodation office"], [41, 42])

    @Rule(Student(studentStatus='Active', accommodationIssue=True, emergencyCase=True))
    def rule_43(self):
        self.add_rec("Accommodation Referral", "High", "Accommodation support issues should be referred to the relevant faculty/accommodation office.", ["Contact faculty or relevant accommodation office"], [41, 43])

    @Rule(Student(studentStatus='Active', hasPTPTN=True, aidNeed=~L('None')))
    def rule_44(self):
        self.add_rec("PTPTN & Additional Aid Note", "Medium", "As you have an existing PTPTN loan and still report financial needs, you may apply for additional welfare funds if eligible.", ["Submit additional welfare application alongside PTPTN records"], [44])

    @Rule(Student(studentStatus='Active', hasScholarship=True, emergencyCase=False, aidNeed='None'))
    def rule_46(self):
        self.add_rec("Low Priority (Existing Support)", "Low", "Student already has financial support and has no additional reported need.", ["Maintain existing support"], [46])

    @Rule(Student(studentStatus='Active', supportingDocumentStatus='Incomplete', aidNeed=~L('None')))
    def rule_47(self):
        self.add_rec("Document Requirement Alert", "High", "Application cannot be processed until required documents are submitted. Please prepare missing files.", ["Submit missing supporting documents"], [47])

@app.post("/infer")
def run_inference(facts: FactModel):
    engine = WelfareEngine()
    engine.reset()
    engine.declare(Student(**facts.dict()))
    engine.run()
    
    finalPriority = 'Low'
    if any(r['priority'] == 'High' for r in engine.recommendations):
        finalPriority = 'High'
    elif any(r['priority'] == 'Medium' for r in engine.recommendations):
        finalPriority = 'Medium'
        
    if not engine.recommendations and engine.eligible:
        engine.add_rec("General Advice", "Low", "No specific aid triggered. Please consult with TD HEP if you believe you have a special case.", ["Consult with FSKTM Office"], [5])

    baseExplanation = "Please note that these are advisory recommendations based on standard FSKTM screening protocols. Final approval is subject to the submission of an official application form and verification of your supporting documents by the TD HEP / FSKTM office."
    
    if not engine.eligible:
        msg = engine.eligibility_message
    else:
        if len(engine.recommendations) > 1:
            msg = "The system has identified multiple support opportunities based on your profile. " + baseExplanation
        else:
            msg = baseExplanation

    return {
        "recommendations": engine.recommendations,
        "finalPriority": finalPriority,
        "isEligible": engine.eligible,
        "eligibilityMessage": msg
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
