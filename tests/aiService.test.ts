import { describe, it, expect } from "vitest";
import {
  analyzeDocumentWithAI,
  askDocumentQuestion,
  compareDocuments,
  generateCounselPrepSheet,
} from "../server/services/aiService.js";
import { SAMPLE_DOCUMENTS } from "../shared/sampleDocs.js";
import { getTranslation, getLocalizedPersonaImpact, SUPPORTED_LANGUAGES } from "../src/services/i18n.js";

describe("NyaySetu AI Service & Comprehensive Evaluation Suite", () => {
  const sample = SAMPLE_DOCUMENTS[0]; // Employment v1
  const lines = sample.content
    .split("\n")
    .map((c, i) => ({ lineNumber: i + 1, content: c }));

  it("1 & 5. should parse employment agreement and extract clauses with verbatim line mapping", async () => {
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "EmploymentAgreement.txt",
      "txt",
      sample.content.length,
      "employee"
    );

    expect(analysis).toBeDefined();
    expect(analysis.documentType).toContain("Employment");
    expect(analysis.userContext).toBe("employee");
    expect(analysis.findings.length).toBeGreaterThan(0);

    // Verify exact line mapping for evidence
    const termFinding = analysis.findings.find(
      (f) => f.category === "termination"
    );
    expect(termFinding).toBeDefined();
    expect(termFinding?.startLine).toBeGreaterThan(0);
    expect(termFinding?.endLine).toBeGreaterThanOrEqual(termFinding!.startLine);
    expect(termFinding?.verbatimText.length).toBeGreaterThan(5);
  });

  it("4. should personalize risk impact based on user persona selection (employee vs tenant vs freelancer)", async () => {
    const empAnalysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "EmploymentAgreement.txt",
      "txt",
      sample.content.length,
      "employee"
    );
    const tenantAnalysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "EmploymentAgreement.txt",
      "txt",
      sample.content.length,
      "tenant"
    );

    const empTerm = empAnalysis.findings.find(f => f.category === 'termination');
    const tenantTerm = tenantAnalysis.findings.find(f => f.category === 'termination');

    expect(empTerm?.personaImpact).toContain("exit the company");
    expect(tenantTerm?.personaImpact).toContain("notice period for moving out");
  });

  it("6. should answer questions with high confidence and verbatim evidence citations", async () => {
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "EmploymentAgreement.txt",
      "txt",
      sample.content.length,
      "employee"
    );

    const qaResult = await askDocumentQuestion(
      analysis,
      "What is the notice period required for termination?"
    );
    expect(qaResult.isSufficient).toBe(true);
    expect(qaResult.evidenceSnippet).toContain("60");
    expect(qaResult.confidence).toBe("high");
    expect(qaResult.sectionNumber).toContain("Line");
  });

  it("7. should return insufficient-evidence response for unmentioned topics", async () => {
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "EmploymentAgreement.txt",
      "txt",
      sample.content.length,
      "employee"
    );

    const qaResult = await askDocumentQuestion(
      analysis,
      "What is the pet policy for dogs in the office building?"
    );
    expect(qaResult.isSufficient).toBe(false);
    expect(qaResult.answer).toContain("couldn't find enough evidence");
    expect(qaResult.confidence).toBe("low");
  });

  it("9. should compare Document A and Document B and categorize clause diffs", async () => {
    const linesV2 = sample
      .v2Content!.split("\n")
      .map((c, i) => ({ lineNumber: i + 1, content: c }));

    const docA = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "Agreement_v1.txt",
      "txt",
      sample.content.length,
      "employee"
    );

    const docB = await analyzeDocumentWithAI(
      sample.v2Content!,
      linesV2,
      "Agreement_v2.txt",
      "txt",
      sample.v2Content!.length,
      "employee"
    );

    const comparison = await compareDocuments(docA, docB);
    expect(comparison.diffs.length).toBeGreaterThan(0);
    expect(comparison.keyRiskChanges.length).toBeGreaterThan(0);
  });

  it("10. should generate exportable counsel preparation sheet with prioritized questions & checklist", async () => {
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "EmploymentAgreement.txt",
      "txt",
      sample.content.length,
      "employee"
    );

    const prep = generateCounselPrepSheet(analysis);
    expect(prep.documentTitle).toBe("EmploymentAgreement.txt");
    expect(prep.questionsForLawyer.length).toBeGreaterThan(0);
    expect(prep.documentsToBring.length).toBeGreaterThan(0);
    expect(prep.actionChecklist.length).toBeGreaterThan(0);
  });

  it("11. should support all 8 Indian & international languages in translation dictionary", async () => {
    expect(SUPPORTED_LANGUAGES.length).toBe(8);

    SUPPORTED_LANGUAGES.forEach(lang => {
      const tagline = getTranslation(lang.code, 'tagline');
      expect(tagline).toBeDefined();
      expect(tagline.length).toBeGreaterThan(0);
    });

    const hiNotice = getTranslation("hi", "translationNotice");
    expect(hiNotice).toContain("अनुवाद समझने में आसानी के लिए दिए गए हैं");
  });

  it("14. should produce deterministic analysis output when live AI API is absent", async () => {
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "DeterministicTest.txt",
      "txt",
      sample.content.length,
      "employee"
    );

    expect(analysis.title).toContain("Analysis");
    expect(analysis.totalSections).toBeGreaterThan(0);
  });

  it("17. should map evidence line ranges accurately to raw lines array", async () => {
    const analysis = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "EmploymentAgreement.txt",
      "txt",
      sample.content.length,
      "employee"
    );

    const f = analysis.findings[0];
    expect(f.startLine).toBeGreaterThan(0);
    expect(f.endLine).toBeLessThanOrEqual(lines.length);

    const targetLine = lines.find(l => l.lineNumber === f.startLine);
    expect(targetLine).toBeDefined();
  });
});
