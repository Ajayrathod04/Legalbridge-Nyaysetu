# NyaySetu (न्यायसेतु) ⚖️🌉 — Comprehensive Implementation Plan

## Executive Summary
NyaySetu is a production-ready, evidence-grounded GenAI legal document assistance application built for the **Hack2Skill PromptWars: AI for Legal Assistance & Access** challenge. Its core differentiator is **Personalized, Evidence-Grounded Legal Impact** — transforming complex legal contracts into plain-language explanations, evidence-linked clause maps, user-persona risk highlights, document comparison diffs, and structured preparation sheets for legal counsel.

---

## A. Product Requirements
1. **Target Audience**: Ordinary citizens (employees, tenants, freelancers, consumers, small business owners).
2. **Legal Boundary**: Informational and document-grounded support only. Explicitly disclaims legal advice and prompts consultation with a licensed legal professional.
3. **Core Workflow**:
   - **Upload & Parse**: Support PDF, DOCX, TXT with validation and real-time processing indicators.
   - **User Context Selection**: Personalize impact and guidance based on role (Employee, Tenant, Freelancer, etc.) without altering document facts.
   - **Intelligence Workspace & Impact Map**: Section-by-section breakdown separating verbatim evidence, simple translation, persona impact, related clause links, and action items.
   - **Interactive Q&A**: Grounded Q&A engine with strict evidence verification, citation links, and fallback when evidence is insufficient.
   - **Document Comparison Engine**: Deterministic section diffing combined with AI change-impact analysis between Document A and Document B.
   - **Counsel Preparation Sheet**: Exportable/printable summary with categorized questions, attention areas, and an interactive checklist.

---

## B. User Personas
- **P1: Employee (Rohan)**: Reviewing a 15-page employment contract; wants to know notice periods, non-compete bounds, IP assignment, and severance terms.
- **P2: Tenant (Ananya)**: Reviewing a residential lease; concerned with security deposit refund terms, maintenance clauses, escalation clauses, and lock-in periods.
- **P3: Freelancer / Vendor (Vikram)**: Reviewing a master service agreement; focused on payment schedules, late penalties, IP ownership, and termination liability.

---

## C. User Journeys
```
[Landing Page] ──► [Upload Doc (PDF/DOCX/TXT)] ──► [Select Persona Context]
                         │
                         ▼
        [Document Intelligence Workspace]
       ┌─────────────────┼─────────────────┐
       ▼                 ▼                 ▼
[Legal Impact Map]  [Grounded Q&A]   [Counsel Prep Sheet]
       │
       ▼ (Optional)
[Doc Comparison A vs B]
```

---

## D. Screen Architecture
1. **Screen 1 — Landing Page**: Civic trusted branding, value proposition, quick demo document loaders, privacy commitment.
2. **Screen 2 — Document Upload & Validation**: Dropzone, file integrity checks, extraction stage tracker (Upload → Extract → Segment → Analyze).
3. **Screen 3 — Persona Context Selection**: Interactive role cards with clear explanation of how context shapes guidance.
4. **Screen 4 & 5 — Workspace & Legal Impact Map**:
   - *Left Column*: Dynamic Clause/Section Navigator with status tags.
   - *Center Column*: Interactive Document Viewer with line-level evidence highlighting.
   - *Right Column*: "How This Affects You" Legal Impact Cards (Verbatim text, Simple translation, Personalized risk/impact, Connected clauses, Action checklist).
5. **Screen 6 — Ask NyaySetu (Grounded Q&A)**: Query bar with quick prompts, grounded answer card with strict evidence snippets, line numbers, and confidence flags.
6. **Screen 7 — Document Comparison**: Side-by-side split view highlighting added, removed, and modified clauses with AI explanations of impact.
7. **Screen 8 — Prepare for Counsel**: Printable preparation dossier containing key findings, prioritized questions for a lawyer, and an interactive preparation checklist.

---

## E. Frontend Architecture (React + Vite + TypeScript)
- **Design Token System**: CSS variables enforcing "TRUSTED CIVIC / LEGAL INTELLIGENCE" aesthetic (slate/navy tones, warm gold accents, high-contrast readable typography, subtle micro-interactions).
- **Component Breakdown**:
  - `components/ui/`: Button, Card, Badge, Modal, Tabs, Progress, Alert, Dropzone.
  - `components/layout/`: Header, Navigation, Footer, WorkspaceLayout.
  - `components/upload/`: FileUploader, ProcessingStepper, PersonaSelector.
  - `components/workspace/`: ClauseNavigator, DocumentViewer, ImpactCard, EvidenceHighlighter.
  - `components/assistant/`: QAPanel, PromptSuggestions, EvidenceBadge.
  - `components/comparison/`: DiffViewer, ChangeImpactSummary.
  - `components/counsel/`: PrepSheet, ChecklistItem, ExportPdfButton.

---

## F. Backend & API Architecture (Express.js / Node.js)
- **REST Endpoints**:
  - `POST /api/documents/upload`: Multipart file upload, validation, extraction (PDF/DOCX/TXT).
  - `POST /api/documents/analyze`: Structured clause extraction & persona-based impact analysis.
  - `POST /api/documents/qa`: Evidence-grounded document Q&A.
  - `POST /api/documents/compare`: Side-by-side diff extraction & AI change analysis.
  - `GET /api/health`: Healthcheck endpoint.
- **Middleware**: File size limiters (10MB max), sanitization against prompt injection, error handler, CORS headers.

---

## G. AI Architecture & Prompt Engineering
- **Multi-Provider LLM Integration**: Supports Google Gemini, OpenAI, Groq, Anthropic, or an offline deterministic fallback engine if no API key is provided.
- **Structured JSON Schema Output**: All LLM calls enforce strict JSON outputs validated with Zod/schema checkers.
- **Prompt Injection Defense**: Uploaded document text is strictly wrapped as untrusted data (`<document_content>` block) with strict system instructions prohibiting directive execution.
- **Deterministic Chunking & Evidence Grounding**: Documents are sectioned with line numbers and character offsets so every AI finding is tied to exact verbatim evidence.

---

## H. Data Flow
1. File uploaded → Server extracts raw text & line map.
2. Text chunked by headings/clauses → Sent to AI Service with Persona Context.
3. AI returns structured JSON containing summary, clauses, personalized impact, connected clauses, and suggested questions.
4. Server validates evidence quotes against actual document text.
5. Frontend renders interactive workspace with clickable evidence links.

---

## I. Security & Privacy Plan
- **Zero Key Leakage**: Secrets reside purely in `.env`. No frontend exposure.
- **In-Memory Storage**: Uploaded files processed in memory/temp storage and cleaned immediately.
- **Input Sanitization**: User queries sanitized against XSS and prompt injection.
- **Safe HTML Rendering**: No `dangerouslySetInnerHTML` without HTML escaping.

---

## J. Testing Strategy
- **Unit Tests (Vitest)**:
  - Document extraction & chunking algorithms.
  - Structured AI response schema validation.
  - Persona context filtering rules.
  - Document diff engine logic.
  - Security sanitizer checks.
- **Integration Tests**: API endpoints validation & fallback behavior.

---

## K. Accessibility (a11y) & Performance Plan
- WAI-ARIA compliant tabs, modals, dropzones, and live regions.
- Keyboard navigation verified (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`).
- High-contrast colors adhering to WCAG 2.1 AA standards.
- Reduced motion support via `@media (prefers-reduced-motion)`.
- Efficient chunking, lazy loading, and virtualized document viewer for fast UI response.

---

## L. Deployment & Repository Hygiene
- Clean single-branch GitHub structure (<10MB repository size without `node_modules`).
- Cross-environment startup (`npm start` starts Express server serving static Vite build).
- Environment variable configuration for `PORT`, `NODE_ENV`, `GEMINI_API_KEY`, etc.
