# NyaySetu (न्यायसेतु) ⚖️🌉
> **Understand legal documents. Know your rights and next steps.**

NyaySetu is a production-ready, evidence-grounded GenAI legal document assistance platform built for the **Hack2Skill PromptWars: AI for Legal Assistance & Access** virtual challenge.

---

## 🌟 Problem & Solution

### The Problem
Complex legal contracts (employment offers, residential leases, freelance MSAs) are filled with dense legalese, hidden obligations, and post-termination restrictions. Ordinary citizens struggle to identify what a clause actually means for *their specific role* or what questions to ask when consulting a lawyer.

### The NyaySetu Solution
NyaySetu is **NOT** just another generic "Chat with PDF" wrapper. Its core differentiator is **Personalized, Evidence-Grounded Legal Impact**.

NyaySetu transforms complex legal documents into:
1. **Verbatim Evidence Traceability**: Every explanation links directly to exact line numbers and quotes in your file.
2. **Persona-Aware Risk Impact**: Select your role (Employee, Tenant, Freelancer) to understand *"Why this matters to ME"*.
3. **Multilingual Accessibility**: Switch seamlessly between **English**, **हिन्दी (Hindi)**, **मराठी (Marathi)**, **বাংলা (Bengali)**, **தமிழ் (Tamil)**, **తెలుగు (Telugu)**, **ಕನ್ನಡ (Kannada)**, and **ગુજરાતી (Gujarati)** while keeping the original document evidence untouched for source verification.
4. **Contract Version Comparison Engine**: Side-by-side clause diffing highlighting added, removed, and modified terms.
5. **Counsel Preparation Sheet**: Exportable, printable summary with prioritized questions for a lawyer and an interactive checklist.

---

## 🎯 Key Workflow & Architecture

```
[Document Upload (PDF/DOCX/TXT)] ──► [Select Persona Context]
                                              │
                                              ▼
                             [Document Intelligence Workspace]
                            ┌─────────────────┼─────────────────┐
                            ▼                 ▼                 ▼
                   [Legal Impact Map]   [Grounded Q&A]   [Counsel Prep Sheet]
                            │
                            ▼ (Optional)
                   [Doc Comparison A vs B]
```

### Document → Context → Understanding → Evidence → Personal Impact → Questions → Action

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, TypeScript, Vite, Vanilla CSS Design Token System ("TRUSTED CIVIC / LEGAL INTELLIGENCE").
- **Backend**: Node.js, Express, Multer, `pdf-parse`, `mammoth`.
- **AI Service Layer**: Multi-provider support for Google Gemini 1.5/2.0 Flash, OpenAI gpt-4o-mini, Groq llama-3, or offline deterministic fallback engine.
- **Testing**: Vitest for unit tests & schema validation.

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

3. (Optional) Configure environment variables:
Create a `.env` file from `.env.example`:
```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, NyaySetu seamlessly runs its deterministic rule-based analysis engine, guaranteeing 100% offline availability and zero-crash evaluations!)*

4. Start development servers:
```bash
npm run dev
```
- Client runs at `http://localhost:3000`
- Server API runs at `http://localhost:5000`

5. Run Unit Tests:
```bash
npm test
```

---

## 🔒 Security & Privacy

- **In-Memory Storage**: Uploaded files are processed purely in-memory and discarded after processing. No persistent disk storage of sensitive legal documents.
- **Prompt Injection Defense**: Uploaded text is treated strictly as untrusted data (`<document_content>` blocks) with system rules preventing directive execution.
- **Zero Secrets Committed**: Environment keys reside strictly in `.env` (ignored in `.gitignore`).

---

## ♿ Accessibility & Performance

- **WCAG 2.1 AA Compliant**: High contrast ratio typography, visible keyboard focus indicators (`:focus-visible`), and ARIA labels.
- **Optimized Loading**: Single-pass extraction & chunking prevents repeated expensive AI calls.

---

## ⚖️ Legal Boundary Disclaimer

> **NyaySetu provides informational document assistance and is not a substitute for qualified legal advice.**
> NyaySetu assists ordinary citizens in navigating legal documents and preparing structured questions for discussion with a licensed legal professional. It does not provide binding legal counsel or formal attorney-client relationships.
