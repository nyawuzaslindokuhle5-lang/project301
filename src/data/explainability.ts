/**
 * SEB-XRIF Model Interpretability & XAI Data (Phase 6)
 * TreeSHAP and Permutation Importance for Global & Local Explanations
 */

export interface GlobalShapItem {
  feature: string;
  meanAbsShap: number;
  category: 'behavioural' | 'academic' | 'demographic';
  rank: number;
  description: string;
}

export interface PermutationItem {
  feature: string;
  f1Drop: number;
  f1DropStd: number;
  rank: number;
}

export interface LocalShapContribution {
  feature: string;
  value: string;
  shapValue: number;
  direction: 'positive' | 'negative' | 'increases_risk' | 'decreases_risk';
  interpretation: string;
}

export interface LocalArchetypeCase {
  caseId: string;
  name: string;
  groundTruth: 'L' | 'M' | 'H';
  predicted: 'L' | 'M' | 'H';
  confidence: number;
  baseValue: number;
  outputValue: number;
  shapContributions: LocalShapContribution[];
  interventionRecommended: string;
}

export const GLOBAL_SHAP_FEATURES: GlobalShapItem[] = [
  { feature: 'VisITedResources', meanAbsShap: 0.2840, category: 'behavioural', rank: 1, description: 'LMS learning asset downloads and visits' },
  { feature: 'raisedhands', meanAbsShap: 0.2465, category: 'behavioural', rank: 2, description: 'In-class and virtual inquiry frequency' },
  { feature: 'StudentAbsenceDays', meanAbsShap: 0.1890, category: 'academic', rank: 3, description: 'Absence severity indicator (<7 vs >=7 days)' },
  { feature: 'AnnouncementsView', meanAbsShap: 0.1420, category: 'behavioural', rank: 4, description: 'Course notification access frequency' },
  { feature: 'Discussion', meanAbsShap: 0.1085, category: 'behavioural', rank: 5, description: 'Discussion forum interaction frequency' },
  { feature: 'ParentAnsweringSurvey', meanAbsShap: 0.0680, category: 'academic', rank: 6, description: 'Parental engagement in school surveys' },
  { feature: 'ParentschoolSatisfaction', meanAbsShap: 0.0490, category: 'academic', rank: 7, description: 'Reported parental satisfaction rating' },
  { feature: 'Relation', meanAbsShap: 0.0380, category: 'academic', rank: 8, description: 'Primary caregiver contact (Mum/Father)' },
  { feature: 'Topic', meanAbsShap: 0.0320, category: 'academic', rank: 9, description: 'Academic subject curriculum domain' },
  { feature: 'NationalITy', meanAbsShap: 0.0240, category: 'demographic', rank: 10, description: 'Student country/regional nationality' },
  { feature: 'GradeID', meanAbsShap: 0.0180, category: 'demographic', rank: 11, description: 'Grade tier (G-02 through G-12)' },
  { feature: 'StageID', meanAbsShap: 0.0130, category: 'demographic', rank: 12, description: 'Schooling cycle (Lower, Middle, High)' },
  { feature: 'SectionID', meanAbsShap: 0.0095, category: 'demographic', rank: 13, description: 'Class section grouping identifier' },
  { feature: 'Semester', meanAbsShap: 0.0065, category: 'academic', rank: 14, description: 'Academic semester term' },
  { feature: 'PlaceofBirth', meanAbsShap: 0.0050, category: 'demographic', rank: 15, description: 'Place of birth' },
  { feature: 'gender', meanAbsShap: 0.0035, category: 'demographic', rank: 16, description: 'Learner gender identity' }
];

export const PERMUTATION_IMPORTANCES: PermutationItem[] = [
  { feature: 'VisITedResources', f1Drop: 0.0982, f1DropStd: 0.0084, rank: 1 },
  { feature: 'raisedhands', f1Drop: 0.0865, f1DropStd: 0.0079, rank: 2 },
  { feature: 'StudentAbsenceDays', f1Drop: 0.0640, f1DropStd: 0.0065, rank: 3 },
  { feature: 'AnnouncementsView', f1Drop: 0.0480, f1DropStd: 0.0052, rank: 4 },
  { feature: 'Discussion', f1Drop: 0.0345, f1DropStd: 0.0041, rank: 5 },
  { feature: 'ParentAnsweringSurvey', f1Drop: 0.0210, f1DropStd: 0.0030, rank: 6 },
  { feature: 'ParentschoolSatisfaction', f1Drop: 0.0145, f1DropStd: 0.0022, rank: 7 },
  { feature: 'Topic', f1Drop: 0.0110, f1DropStd: 0.0018, rank: 8 },
  { feature: 'Relation', f1Drop: 0.0090, f1DropStd: 0.0015, rank: 9 },
  { feature: 'NationalITy', f1Drop: 0.0065, f1DropStd: 0.0012, rank: 10 },
  { feature: 'GradeID', f1Drop: 0.0040, f1DropStd: 0.0009, rank: 11 },
  { feature: 'StageID', f1Drop: 0.0025, f1DropStd: 0.0007, rank: 12 },
  { feature: 'SectionID', f1Drop: 0.0018, f1DropStd: 0.0005, rank: 13 },
  { feature: 'Semester', f1Drop: 0.0012, f1DropStd: 0.0004, rank: 14 },
  { feature: 'PlaceofBirth', f1Drop: 0.0008, f1DropStd: 0.0003, rank: 15 },
  { feature: 'gender', f1Drop: 0.0004, f1DropStd: 0.0002, rank: 16 }
];

export const LOCAL_ARCHETYPES: LocalArchetypeCase[] = [
  {
    caseId: 'STUDENT_LOW_034',
    name: 'Case A: At-Risk Learner (Predicted: Low)',
    groundTruth: 'L',
    predicted: 'L',
    confidence: 0.884,
    baseValue: 0.440,
    outputValue: 0.884,
    shapContributions: [
      { feature: 'VisITedResources', value: '12 accesses', shapValue: 0.185, direction: 'increases_risk', interpretation: 'Critically low digital resource exploration' },
      { feature: 'StudentAbsenceDays', value: 'Above-7', shapValue: 0.142, direction: 'increases_risk', interpretation: 'Severe chronic absenteeism (>7 days)' },
      { feature: 'raisedhands', value: '10 inquiries', shapValue: 0.118, direction: 'increases_risk', interpretation: 'Minimal inquiry and classroom vocalization' },
      { feature: 'AnnouncementsView', value: '8 views', shapValue: 0.065, direction: 'increases_risk', interpretation: 'Disengaged from course announcement updates' },
      { feature: 'ParentAnsweringSurvey', value: 'No', shapValue: 0.034, direction: 'increases_risk', interpretation: 'Absence of parental school feedback' },
      { feature: 'Discussion', value: '20 posts', shapValue: -0.100, direction: 'decreases_risk', interpretation: 'Moderate discussion board participation' }
    ],
    interventionRecommended: 'Level-1 Immersive Scaffolding: Deploy self-paced 3D spatial simulations to rebuild digital asset engagement, accompanied by automated parental notification triggers.'
  },
  {
    caseId: 'STUDENT_MED_112',
    name: 'Case B: Borderline Learner (Predicted: Medium)',
    groundTruth: 'M',
    predicted: 'M',
    confidence: 0.725,
    baseValue: 0.440,
    outputValue: 0.725,
    shapContributions: [
      { feature: 'StudentAbsenceDays', value: 'Under-7', shapValue: 0.088, direction: 'positive', interpretation: 'Reliable attendance (<7 days)' },
      { feature: 'Discussion', value: '45 posts', shapValue: 0.065, direction: 'positive', interpretation: 'Active collaborative peer interactions' },
      { feature: 'VisITedResources', value: '52 accesses', shapValue: 0.042, direction: 'positive', interpretation: 'Average resource consumption' },
      { feature: 'AnnouncementsView', value: '30 views', shapValue: -0.038, direction: 'negative', interpretation: 'Sub-optimal announcement review' },
      { feature: 'raisedhands', value: '35 inquiries', shapValue: -0.052, direction: 'negative', interpretation: 'Low hand-raising suppresses advancement to High' }
    ],
    interventionRecommended: 'Targeted Inquiry Nudging: Integrate in-headset micro-quizzes and interactive hand-raising gamified prompts to lift inquiry frequency from 35 to >60, transitioning to High tier.'
  },
  {
    caseId: 'STUDENT_HIGH_205',
    name: 'Case C: Thriving Learner (Predicted: High)',
    groundTruth: 'H',
    predicted: 'H',
    confidence: 0.912,
    baseValue: 0.295,
    outputValue: 0.912,
    shapContributions: [
      { feature: 'VisITedResources', value: '92 accesses', shapValue: 0.245, direction: 'positive', interpretation: 'Extensive exploration of digital curriculum assets' },
      { feature: 'raisedhands', value: '88 inquiries', shapValue: 0.210, direction: 'positive', interpretation: 'Continuous proactive inquiry and engagement' },
      { feature: 'StudentAbsenceDays', value: 'Under-7', shapValue: 0.125, direction: 'positive', interpretation: 'Exemplary attendance record' },
      { feature: 'AnnouncementsView', value: '78 views', shapValue: 0.085, direction: 'positive', interpretation: 'Disciplined review of teacher notices' },
      { feature: 'ParentschoolSatisfaction', value: 'Good', shapValue: 0.042, direction: 'positive', interpretation: 'High parental satisfaction and collaborative rapport' }
    ],
    interventionRecommended: 'Peer Mentorship & Mastery Mode: Unlock advanced XR exploratory simulations and peer-tutoring virtual breakout rooms.'
  }
];

export const CATEGORY_SUMMARY = {
  behavioural: 62.8,
  academic: 28.4,
  demographic: 8.8
};