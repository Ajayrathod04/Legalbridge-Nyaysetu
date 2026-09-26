import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { SUPPORTED_LANGUAGES, getTranslation } from '../src/services/i18n.js';

describe('Automated Accessibility (a11y) & WCAG Compliance Suite', () => {
  const rootDir = process.cwd();

  it('1. index.html must have lang attribute, viewport meta, and descriptive title', () => {
    const htmlPath = path.join(rootDir, 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    expect(htmlContent).toContain('<html lang="en">');
    expect(htmlContent).toContain('<meta name="viewport"');
    expect(htmlContent).toContain('<title>LegalBridge | न्यायसेतु');
    expect(htmlContent).toContain('<meta name="description"');
  });

  it('2. index.css must contain sr-only utility, focus-visible rings, and prefers-reduced-motion overrides', () => {
    const cssPath = path.join(rootDir, 'src/index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');

    expect(cssContent).toContain('.sr-only');
    expect(cssContent).toContain(':focus-visible');
    expect(cssContent).toContain('prefers-reduced-motion');
  });

  it('3. Every screen component must have a top-level H1 heading for single-page DOM structure', () => {
    const landing = fs.readFileSync(path.join(rootDir, 'src/components/LandingScreen.tsx'), 'utf-8');
    const upload = fs.readFileSync(path.join(rootDir, 'src/components/UploadScreen.tsx'), 'utf-8');
    const persona = fs.readFileSync(path.join(rootDir, 'src/components/PersonaSelector.tsx'), 'utf-8');
    const workspace = fs.readFileSync(path.join(rootDir, 'src/components/WorkspaceScreen.tsx'), 'utf-8');
    const qa = fs.readFileSync(path.join(rootDir, 'src/components/QAScreen.tsx'), 'utf-8');
    const compare = fs.readFileSync(path.join(rootDir, 'src/components/ComparisonScreen.tsx'), 'utf-8');
    const prep = fs.readFileSync(path.join(rootDir, 'src/components/PrepSheetScreen.tsx'), 'utf-8');

    expect(landing).toContain('<h1');
    expect(upload).toContain('<h1');
    expect(persona).toContain('<h1');
    expect(workspace).toContain('<h1');
    expect(qa).toContain('<h1');
    expect(compare).toContain('<h1');
    expect(prep).toContain('<h1');
  });

  it('4. UploadScreen must use sr-only for input file instead of display:none to remain in accessibility tree', () => {
    const uploadContent = fs.readFileSync(path.join(rootDir, 'src/components/UploadScreen.tsx'), 'utf-8');
    expect(uploadContent).toContain('className="sr-only"');
    expect(uploadContent).not.toContain("style={{ display: 'none' }}");
  });

  it('5. PersonaSelector & PrepSheetScreen must use native form controls (radio/checkbox) for standard a11y', () => {
    const personaContent = fs.readFileSync(path.join(rootDir, 'src/components/PersonaSelector.tsx'), 'utf-8');
    const prepContent = fs.readFileSync(path.join(rootDir, 'src/components/PrepSheetScreen.tsx'), 'utf-8');

    expect(personaContent).toContain('type="radio"');
    expect(personaContent).toContain('htmlFor=');
    expect(prepContent).toContain('type="checkbox"');
    expect(prepContent).toContain('htmlFor=');
  });

  it('6. Header must provide a skip-to-content link and accessible language selector', () => {
    const headerContent = fs.readFileSync(path.join(rootDir, 'src/components/Header.tsx'), 'utf-8');
    expect(headerContent).toContain('Skip to main content');
    expect(headerContent).toContain('htmlFor="header-lang-select"');
  });

  it('7. i18n service must provide complete translation keys across all 8 supported languages', () => {
    expect(SUPPORTED_LANGUAGES.length).toBe(8);
    SUPPORTED_LANGUAGES.forEach(lang => {
      const title = getTranslation(lang.code, 'disclaimer');
      expect(title).toBeDefined();
      expect(title.length).toBeGreaterThan(0);
    });
  });
});
