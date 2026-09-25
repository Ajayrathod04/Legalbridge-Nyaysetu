export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'bn' | 'ta' | 'te' | 'kn' | 'gu';

export type UserContext = 
  | 'employee' 
  | 'tenant' 
  | 'freelancer' 
  | 'customer' 
  | 'business_owner' 
  | 'other' 
  | 'none';

export type ClauseCategory = 
  | 'parties' 
  | 'payment' 
  | 'term' 
  | 'termination' 
  | 'confidentiality' 
  | 'intellectual_property' 
  | 'restrictions' 
  | 'liability' 
  | 'dispute_resolution' 
  | 'general';

export type ImpactSeverity = 'high' | 'medium' | 'low' | 'neutral';

export interface ClauseFinding {
  id: string;
  category: ClauseCategory;
  title: string;
  verbatimText: string;
  sectionNumber: string;
  startLine: number;
  endLine: number;
  simpleExplanation: string;
  personaImpact: string;
  severity: ImpactSeverity;
  relatedClauseIds: string[];
  questionsToClarify: string[];
  suggestedAction: string;
}

export interface KeyDate {
  event: string;
  date: string;
  sectionNumber?: string;
}

export interface KeyObligation {
  party: string;
  obligation: string;
  sectionNumber?: string;
}

export interface DocumentAnalysis {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'docx' | 'txt';
  fileSize: number;
  uploadTimestamp: string;
  userContext: UserContext;
  title: string;
  summary: string;
  documentType: string;
  parties: string[];
  totalSections: number;
  keyDates: KeyDate[];
  keyObligations: KeyObligation[];
  findings: ClauseFinding[];
  rawText: string;
  lines: { lineNumber: number; content: string }[];
}

export interface QAItem {
  id: string;
  question: string;
  answer: string;
  evidenceSnippet: string;
  sectionNumber?: string;
  startLine?: number;
  endLine?: number;
  confidence: 'high' | 'medium' | 'low';
  isSufficient: boolean;
}

export interface ClauseDiff {
  id: string;
  sectionTitle: string;
  changeType: 'added' | 'removed' | 'modified' | 'unchanged';
  docAExcerpt?: string;
  docBExcerpt?: string;
  explanation: string;
  personaImpact: string;
}

export interface ComparisonResult {
  docATitle: string;
  docBTitle: string;
  summary: string;
  userContext: UserContext;
  diffs: ClauseDiff[];
  keyRiskChanges: string[];
}

export interface ChecklistItem {
  id: string;
  item: string;
  category: string;
  completed: boolean;
}

export interface CounselPrepSheet {
  documentTitle: string;
  userContext: UserContext;
  generatedAt: string;
  keyPoints: string[];
  obligations: string[];
  attentionAreas: { title: string; risk: string; severity: ImpactSeverity }[];
  questionsForLawyer: string[];
  documentsToBring: string[];
  actionChecklist: ChecklistItem[];
}
