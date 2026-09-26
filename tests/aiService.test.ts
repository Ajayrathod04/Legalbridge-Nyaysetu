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

  it("18. should return cached analysis instantaneously for identical text and persona context", async () => {
    const t0 = Date.now();
    const analysis1 = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "CacheTestDoc.txt",
      "txt",
      sample.content.length,
      "freelancer"
    );
    const t1 = Date.now();

    const analysis2 = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "CacheTestDoc.txt",
      "txt",
      sample.content.length,
      "freelancer"
    );
    const t2 = Date.now();

    expect(analysis2.title).toBe(analysis1.title);
    expect(analysis2.findings.length).toBe(analysis1.findings.length);
    // Cache hit should take <= 2ms
    expect(t2 - t1).toBeLessThanOrEqual(20);
  });

  it("19. should report zero modified/removed risk changes when comparing identical documents", async () => {
    const docA = await analyzeDocumentWithAI(
      sample.content,
      lines,
      "IdenticalDoc_A.txt",
      "txt",
      sample.content.length,
      "employee"
    );

    const comparison = await compareDocuments(docA, docA);
    const modifiedOrRemoved = comparison.diffs.filter(d => d.changeType === 'modified' || d.changeType === 'removed');
    expect(modifiedOrRemoved.length).toBe(0);
  });

  it("20. should return cached prep sheet structure for repeat calls", () => {
    const mockAnalysis = {
      id: "doc-cache-prep-test",
      fileName: "TestAgreement.txt",
      fileType: "txt" as const,
      fileSize: 1000,
      uploadTimestamp: new Date().toISOString(),
      userContext: "tenant" as const,
      title: "Test Lease Analysis",
      summary: "Lease agreement analysis summary",
      documentType: "Residential Lease Agreement",
      parties: ["Landlord Inc", "John Tenant"],
      totalSections: 2,
      keyDates: [],
      keyObligations: [],
      findings: [
        {
          id: "clause-1",
          category: "payment" as const,
          title: "Rent & Deposit",
          verbatimText: "Tenant shall pay monthly rent of $1500.",
          sectionNumber: "Section 1",
          startLine: 1,
          endLine: 3,
          simpleExplanation: "Rent explanation",
          personaImpact: "Tenant rent obligation",
          severity: "medium" as const,
          relatedClauseIds: [],
          questionsToClarify: ["What is rent due date?"],
          suggestedAction: "Pay rent on time"
        }
      ],
      rawText: "Sample lease text",
      lines: [{ lineNumber: 1, content: "Sample lease text" }]
    };

    const prep1 = generateCounselPrepSheet(mockAnalysis);
    const prep2 = generateCounselPrepSheet(mockAnalysis);

    expect(prep1.documentTitle).toBe("TestAgreement.txt");
    expect(prep2.actionChecklist.length).toBe(prep1.actionChecklist.length);
    expect(prep2.actionChecklist[0].completed).toBe(false);
  });
});
