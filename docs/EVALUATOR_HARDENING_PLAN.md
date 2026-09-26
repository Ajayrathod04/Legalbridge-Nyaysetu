# LegalBridge | न्यायसेतु — Critical Evaluator Hardening Plan

## Executive Summary
This document establishes a production-hardening and evaluator-optimization roadmap for **LegalBridge | न्यायसेतु**.
The objective is to optimize quality across all six evaluation parameters to reach **96+ quality**, while preserving all working functionality, zero breaking changes to existing architecture, and strict memory-only privacy standards.

### Initial Baseline vs. Target Metrics
| Parameter | Baseline Score | Target Score | Primary Hardening Focus |
| :--- | :---: | :---: | :--- |
| **Accessibility** | **10 / 100** | **96+** | Native semantic HTML, WAI-ARIA roles, keyboard nav, screen-reader live regions, focus indicators |
| **Efficiency** | **65 / 100** | **96+** | Route code-splitting, React memoization, request caching, bundle size reduction |
| **Security** | **85 / 100** | **96+** | Magic byte validation, filename sanitization, security headers, prompt injection boundary isolation |
| **Testing** | **85 / 100** | **96+** | 17-point test suite expansion (unit + integration + accessibility + fallback engines) |
| **Code Quality** | **88 / 100** | **96+** | Strict TypeScript typing (zero `any`), dead code cleanup, structured error handling |
| **Problem Alignment** | **95 / 100** | **96+** | Core flow preservation: Document → Understand → Personalize → Evidence → Questions/Actions |

---

## 1. Parameter Analysis & Identified Defect Register

### Parameter 1: Accessibility (Priority: CRITICAL)
- **Current Score**: 10 / 100
- **Root Causes**:
  - Missing native semantic tags (`<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`).
  - Custom `div` click handlers for persona selection and checklist items without keyboard focusability (`tabIndex={0}`) or ARIA attributes (`role="radio"`, `role="checkbox"`).
  - Hidden `<input type="file">` not accessible via keyboard focus on drag-drop container.
  - Tab navigation buttons lack `role="tab"`, `role="tablist"`, `aria-selected`, `aria-controls`.
  - Lack of dynamic `aria-live` announcements for async loading steps and Q&A responses.
  - Absence of explicit `:focus-visible` focus rings and screen-reader `.sr-only` labels.
  - Missing skip-to-content accessibility link.

### Parameter 2: Efficiency (Priority: HIGH)
- **Current Score**: 65 / 100
- **Root Causes**:
  - All 7 screens loaded synchronously in single main client bundle.
  - Absence of `React.lazy` and `Suspense` for non-critical screens (`QAScreen`, `ComparisonScreen`, `PrepSheetScreen`).
  - Unnecessary component re-renders during state updates in workspace document viewer.
  - Unmemoized line mapping and finding search logic.

### Parameter 3: Security (Priority: HIGH)
- **Current Score**: 85 / 100
- **Root Causes**:
  - File extension validation only; missing binary magic byte header verification for uploaded files (`%PDF-`, `PK\x03\x04`).
  - Filenames passed to response headers without strict sanitization against path traversal or script injection.
  - Missing HTTP security headers (`X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, `Content-Security-Policy`).
  - Risk of nested `<document_content>` delimiter injection in uploaded text.

### Parameter 4: Testing (Priority: HIGH)
- **Current Score**: 85 / 100
- **Root Causes**:
  - Test suite currently only covers basic `aiService.ts` calls (6 unit tests).
  - Missing explicit tests for document parser, magic byte validation, invalid files, empty files, persona mapping, prompt injection defense, comparison diffs, counsel prep generation, and UI i18n helpers.

### Parameter 5: Code Quality (Priority: MEDIUM)
- **Current Score**: 88 / 100
- **Root Causes**:
  - Occasional `any` types in client fallback state logic in `App.tsx`.
  - Duplicate inline style objects instead of shared CSS design tokens.
  - Missing centralized error handling boundary wrapper around full application.

### Parameter 6: Problem Statement Alignment (Priority: PRESERVE)
- **Current Score**: 95 / 100
- **Strategy**: Preserve exact LegalBridge | न्यायसेतु user flow, evidence grounding, persona impact cards, side-by-side contract comparison, counsel prep sheet, and multilingual capabilities.

---

## 2. Action Plan Matrix

| File | Current Problem | Evaluator Risk | Proposed Fix | Expected Benefit | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `index.html` | Missing `lang` attribute and standard accessibility meta | Low contrast / a11y penalty | Add `lang="en"`, viewport meta, meta description | Full WCAG compliance | HTML validator / Lighthouse |
| `src/App.tsx` | Synchronous import of all screens; `any` type in fallback | High bundle size / Type safety penalty | `React.lazy` + `Suspense`, strict TS typing | 40%+ initial bundle reduction | `npm run build` audit |
| `src/index.css` | Missing `:focus-visible` ring, `.sr-only` class | Keyboard navigation failure | Add high-contrast focus rings, `.sr-only` utility, motion reduction | WCAG 2.1 AA compliant keyboard focus | Keyboard Tab navigation |
| `src/components/Header.tsx` | Nav buttons lack `role="tab"`, logo click unaccessible | Screen reader navigation fail | Semantic `<header>`, `<nav>`, `role="tablist"`, `aria-label` | Accessible header navigation | NVDA / VoiceOver check |
| `src/components/UploadScreen.tsx` | File dropzone not keyboard focusable; missing live region | Accessibility score loss | Add `tabIndex={0}`, `onKeyDown` (Enter/Space), `aria-live="polite"` | Full keyboard upload support | Keyboard-only test |
| `src/components/PersonaSelector.tsx` | Cards are `div` with `onClick`; unaccessible | Screen reader trap | Use `<button role="radio">`, `aria-checked`, `role="radiogroup"` | Accessible role selection | Keyboard Tab + Space check |
| `src/components/WorkspaceScreen.tsx` | Clause navigator buttons unlinked to document viewer | Keyboard/Screen reader disconnect | `role="tablist"`, `aria-controls`, `aria-selected`, `aria-live` | Accessible multi-column workspace | Keyboard navigation test |
| `src/components/QAScreen.tsx` | Missing input labels and live answer announcements | Screen reader failure | `<label htmlFor="..." className="sr-only">`, `aria-live="polite"` | Screen reader Q&A flow | Keyboard & screen reader test |
| `src/components/PrepSheetScreen.tsx` | Checklist items are `div`; print button lacks aria | Keyboard inability to toggle | `<button type="button" role="checkbox" aria-checked={...}>` | Full keyboard checklist interaction | Keyboard Space key toggle |
| `server/services/documentExtractor.ts` | File type checked only by extension | Security / MIME spoofing vulnerability | Add binary magic byte signature verification (`%PDF-`, `PK\x03\x04`) | Prevents malicious file uploads | Unit tests with fake extensions |
| `server/index.ts` | Missing security headers; filename path traversal risk | OWASP Security penalty | Add security response headers, `path.basename` sanitization | OWASP Top 10 security compliance | Security header audit |
| `server/services/aiService.ts` | Raw document text could contain delimiter injection | Prompt injection risk | Escape `<document_content>` tags inside raw text | Robust prompt injection defense | Injection unit tests |
| `tests/` | Only 6 unit tests in single test file | Low coverage / Testing score drop | Expand test suite to 17+ comprehensive unit & integration tests | 95%+ test coverage across core flows | `npm test` (Vitest) |

---

## 3. Verification & Acceptance Criteria
1. `npm test`: All tests pass cleanly (100% pass rate).
2. `npm run build`: Production build compiles with zero TypeScript or Vite errors.
3. `npx tsc --noEmit`: Zero compilation warnings or type mismatches.
4. **Keyboard Navigation**: Complete flow (Landing → Upload → Persona → Workspace → Q&A → Compare → Prep) navigable via `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`.
5. **Security Audit**: Zero unhandled exceptions, magic byte verification active, security headers attached to response.
6. **Performance Audit**: Code-split chunks created, fast execution time.
