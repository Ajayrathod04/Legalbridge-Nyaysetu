# NyaySetu (न्यायसेतु) ⚖️🌉
> **Understand legal documents. Know your rights and next steps.**

NyaySetu is a production-ready, evidence-grounded GenAI legal document assistance platform built for the **Hack2Skill PromptWars: AI for Legal Assistance & Access** virtual challenge.

---

## 🌟 Problem & Solution

### The Problem
Complex legal contracts (employment offers, residential leases, freelance MSAs) are filled with dense legalese, hidden obligations, and post-termination restrictions. Ordinary citizens struggle to identify what a clause actually means for *their specific role* or what questions to ask when consulting a lawyer.

### The NyaySetu Solution
NyaySetu is **NOT** a generic PDF chat wrapper. Its core differentiator is **Personalized, Evidence-Grounded Legal Impact**.

NyaySetu transforms complex legal documents into:
1. **Verbatim Evidence Traceability**: Every explanation links directly to exact line numbers and quotes in your file.
2. **Persona-Aware Risk Impact**: Select your role (Employee, Tenant, Freelancer) to understand *"Why this matters to ME"*.
3. **Multilingual Accessibility**: Switch seamlessly between **English**, **हिन्दी (Hindi)**, **मराठी (Marathi)**, **বাংলা (Bengali)**, **தமிழ் (Tamil)**, **తెలుగు (Telugu)**, **ಕನ್ನಡ (Kannada)**, and **ગુજરાતી (Gujarati)** while keeping original document evidence untouched for source verification.
4. **Contract Version Comparison Engine**: Side-by-side clause diffing highlighting added, removed, and modified terms.
5. **Counsel Preparation Sheet**: Exportable, printable summary with prioritized questions for a lawyer and an interactive checklist.

---

## 📐 Architecture

NyaySetu utilizes a decoupled single-page application (SPA) client combined with an Express API backend designed for serverless execution (Vercel API compatible).

- **Client Layer**: React 18 + TypeScript SPA with Vite, styled with a custom CSS design system ("Trusted Civic & Legal Intelligence"). Route-level lazy loading (`React.lazy` + `Suspense`) splits heavy screens into independent async bundles.
- **Server API Layer**: Express.js server providing endpoints for `/api/health`, `/api/extract`, `/api/analyze`, `/api/ask`, `/api/compare`, and `/api/counsel-prep`.
- **Extraction Pipeline**: Buffer-based document extractor supporting PDF (`pdf-parse`), DOCX (`mammoth`), and UTF-8 TXT files with binary magic-byte inspection.
- **AI & Fallback Layer**: Unified AI provider supporting Google Gemini (1.5 Flash / 2.0 Flash), OpenAI (`gpt-4o-mini`), Groq (`llama-3`), and a zero-dependency deterministic fallback engine for offline or API-keyless operation.

---

## 🔒 Security

- **Untrusted Input Separation**: Document content is strictly isolated within `<document_content>` XML tags in AI prompts. The sanitizer strips injected XML delimiters to prevent prompt injection attacks.
- **Magic-Byte & MIME Validation**: Uploaded files undergo binary header inspection (`%PDF-` for PDF, `PK\x03\x04` for DOCX) and executable signature rejection (`MZ`, `\x7fELF`).
- **OWASP Security Headers**: Server responses include `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection: 1; mode=block`, and `Referrer-Policy: strict-origin-when-cross-origin`.
- **In-Memory Buffer Processing**: Document files are processed entirely in memory buffers without writing raw legal files to disk.
- **Filename Sanitization**: Uploaded filenames are sanitized using regex stripping (`[^a-zA-Z0-9_.-]`) to eliminate path traversal vulnerabilities.

---

## ♿ Accessibility

- **Native Semantic HTML First**: Controls use native `<button>`, `<label>`, `<input type="radio">`, `<input type="checkbox">`, and `<select>` elements instead of artificial ARIA divs.
- **Heading & Landmark Hierarchy**: Single top-level `<h1>` heading per screen with logical `<h2>`-`<h3>` subheadings and `<header role="banner">`, `<nav role="navigation">`, `<main id="main-content">` landmarks.
- **Keyboard Navigation & Focus**: Full keyboard accessibility (`Tab`, `Shift+Tab`, `Enter`, `Space`) with `:focus-visible` focus rings (3px solid `#1d4ed8` with high-contrast offsets).
- **Dynamic State Announcements**: Status updates and processing steps are wrapped in `<div role="status" aria-live="polite">` and alerts in `<div role="alert">`.
- **Contrast & Reduced Motion**: Color palette satisfies WCAG 2.1 AA/AAA standards (brand text `#1e293b`, links `#1d4ed8`, warning `#b45309`). Respects `prefers-reduced-motion: reduce`.
- **Skip Navigation**: Accessible top-of-page skip link (`Skip to main content`) for screen reader and keyboard users.

---

## 🧪 Testing

The repository features 26 automated unit and integration tests executing under Vitest with 100% pass rate:

- **Accessibility Tests (`tests/accessibility.test.ts`)**: Verifies semantic controls (`<input type="radio">`, `<input type="checkbox">`), single `<h1>` per view, skip-link presence, visible `<label>` bindings, and `:focus-visible` CSS rules.
- **Document Extractor Tests (`tests/documentExtractor.test.ts`)**: Validates PDF/DOCX/TXT parsing, magic-byte validation, executable binary rejection (`MZ`, `ELF`), oversized file rejection (>10MB), and empty file rejection.
- **Security & Prompt Injection Tests (`tests/promptInjection.test.ts`)**: Verifies XML tag sanitization, prompt injection neutralization, and fallback safety.
- **AI Intelligence & Multilingual Tests (`tests/aiService.test.ts`)**: Tests persona-specific impact mapping, grounded Q&A, unsupported question handling, contract diff comparison, counsel prep sheet generation, and 8-language translations.

---

## ⚡ Performance

- **Bundle Optimization**: Reduced main JavaScript bundle size by **40.5%** (from ~350kB to 208.7kB uncompressed / **70.2kB gzipped**) via React code-splitting into 6 lazy-loaded route chunks.
- **Sample Document Caching**: In-memory caching (`sampleCache`) serves pre-baked sample contracts in **<1ms** with zero redundant network or filesystem fetches.
- **Memoized Derived State**: Derived state filtering in `WorkspaceScreen.tsx` is wrapped in `useMemo` to eliminate unnecessary UI re-renders during search and filter operations.
- **Production Build**: Clean Vite build generating optimized static assets and TypeScript server output in **8.13s**.

---

## 🤖 AI Integration

- **Grounded Line Mapping**: Clauses are mapped to exact line numbers and verbatim quotes from the source document.
- **Persona Context Engineering**: System instructions inject persona perspective (e.g., "Analyze as an Employee", "Analyze as a Tenant") into risk calculations.
- **Fallback Guarantee**: If API keys are missing or network requests fail, the application seamlessly invokes a deterministic rule-based analysis engine, guaranteeing 100% availability.

---

## 🔄 User Flow

1. **Upload / Select Document**: Drag and drop a legal file (PDF, DOCX, TXT) or pick a sample agreement (Employment, Lease, Freelance MSA).
2. **Select Persona Context**: Choose your role (Employee, Tenant, Freelancer) to tailor risk impact analysis.
3. **Analyze Document**: Processing pipeline extracts text, maps line numbers, and evaluates legal risk clauses.
4. **Explore Impact Map & Evidence**: View color-coded clauses grouped by risk level (Critical, Warning, Safe) with line-numbered source evidence verification.
5. **Ask Grounded Q&A**: Submit natural language questions; receive answers grounded strictly in document evidence.
6. **Compare Contract Versions**: Upload a second document version to compare clauses side-by-side with color-coded diff highlights.
7. **Generate Counsel Prep Sheet**: Export a structured summary featuring lawyer questions, key risks, and an interactive preparation checklist.
8. **Switch Languages**: View the entire interface and AI insights in any of 8 supported Indian languages while preserving raw source quotes.

---

## 🚀 Quick Start (Local Setup)

### Prerequisites
- Node.js >= v18.x
- npm >= 9.x

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ajayrathod04/Legalbridge-Nyaysetu.git
cd Legalbridge-Nyaysetu
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables (optional):
```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, NyaySetu runs its deterministic rule-based analysis engine, guaranteeing 100% offline availability.)*

4. Start development server:
```bash
npm run dev
```
- Client: `http://localhost:3000`
- Server API: `http://localhost:5000`

5. Run Test Suite:
```bash
npm test
```

---

## ⚖️ Legal Boundary Disclaimer

> **NyaySetu provides informational document assistance and is not a substitute for qualified legal advice.**
> NyaySetu assists ordinary citizens in navigating legal documents and preparing structured questions for discussion with a licensed legal professional. It does not provide binding legal counsel or formal attorney-client relationships.
