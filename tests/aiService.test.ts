import { describe, it, expect } from 'vitest';
import { 
  analyzeDocumentWithAI, 
  askDocumentQuestion, 
  compareDocuments,
  generateCounselPrepSheet 
} from '../server/services/aiService.js';
import { SAMPLE_DOCUMENTS } from '../shared/sampleDocs.js';

describe('NyaySetu AI Service & Analysis Engine', () => {
  const sample = SAMPLE_DOCUMENTS[0]; // Employment v1
  const lines = sample.content.split('\n').map((c, i) => ({ lineNumber: i + 1, content: c }));

  it('should parse employment agreement and categorize key clauses correctly', async () => {
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      'EmploymentAgreement.txt',
      'txt',
      sample.content.length,
      'employee'
    );

    expect(analysis).toBeDefined();
    expect(analysis.documentType).toContain('Employment');
    expect(analysis.userContext).toBe('employee');
    expect(analysis.findings.length).toBeGreaterThan(0);

    // Verify presence of termination clause finding
    const termFinding = analysis.findings.find(f => f.category === 'termination');
    expect(termFinding).toBeDefined();
    expect(termFinding?.personaImpact).toContain('notice period');
  });

  it('should answer questions grounded in the document text', async () => {
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      'EmploymentAgreement.txt',
      'txt',
      sample.content.length,
      'employee'
    );

    const qaResult = await askDocumentQuestion(analysis, 'What is the notice period required for termination?');
    expect(qaResult.isSufficient).toBe(true);
    expect(qaResult.evidenceSnippet).toContain('60');
    expect(qaResult.confidence).toBe('high');
  });

  it('should return insufficient evidence message for questions unrelated to document', async () => {
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      'EmploymentAgreement.txt',
      'txt',
      sample.content.length,
      'employee'
    );

    const qaResult = await askDocumentQuestion(analysis, 'What is the pet policy for dogs in the office building?');
    expect(qaResult.isSufficient).toBe(false);
    expect(qaResult.answer).toContain("couldn't find enough evidence");
  });

  it('should compare Document A and Document B and detect modified notice terms', async () => {
    const linesV2 = sample.v2Content!.split('\n').map((c, i) => ({ lineNumber: i + 1, content: c }));

    const docA = await analyzeDocumentWithAI(
      sample.content,
      lines,
      'Agreement_v1.txt',
      'txt',
      sample.content.length,
      'employee'
    );

    const docB = await analyzeDocumentWithAI(
      sample.v2Content!,
      linesV2,
      'Agreement_v2.txt',
      'txt',
      sample.v2Content!.length,
      'employee'
    );

    const comparison = await compareDocuments(docA, docB);
    expect(comparison.diffs.length).toBeGreaterThan(0);
    expect(comparison.keyRiskChanges.length).toBeGreaterThan(0);
  });

  it('should generate structured counsel preparation sheet', async () => {
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      'EmploymentAgreement.txt',
      'txt',
      sample.content.length,
      'employee'
    );

    const prep = generateCounselPrepSheet(analysis);
    expect(prep.documentTitle).toBe('EmploymentAgreement.txt');
    expect(prep.questionsForLawyer.length).toBeGreaterThan(0);
    expect(prep.documentsToBring.length).toBeGreaterThan(0);
    expect(prep.actionChecklist.length).toBeGreaterThan(0);
  });

  it('should support multilingual translations while keeping original evidence verbatim text intact', async () => {
    const { getTranslation, getLocalizedPersonaImpact } = await import('../src/services/i18n.js');
    
    // Verify translation dictionary for Hindi
    const hiNotice = getTranslation('hi', 'translationNotice');
    expect(hiNotice).toContain('अनुवाद समझने में आसानी के लिए दिए गए हैं');

    // Verify localized persona impact
    const hiImpact = getLocalizedPersonaImpact('hi', 'Term & Termination Conditions', 'Default impact');
    expect(hiImpact).toContain('नोटिस अवधि');

    // Verify original evidence remains untouched
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      'EmploymentAgreement.txt',
      'txt',
      sample.content.length,
      'employee'
    );
    expect(analysis.findings[0].verbatimText.length).toBeGreaterThan(10);
  });
});
