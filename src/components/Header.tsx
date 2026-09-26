import React from 'react';
import { FileText, GitCompare, HelpCircle, ClipboardList, ShieldAlert, Globe } from 'lucide-react';
import { DocumentAnalysis, SupportedLanguage } from '../../shared/types';
import { SUPPORTED_LANGUAGES, getTranslation } from '../services/i18n';
import { LegalBridgeLogo } from './brand/LegalBridgeLogo';

interface HeaderProps {
  currentTab: 'home' | 'workspace' | 'qa' | 'compare' | 'prep';
  setCurrentTab: (tab: 'home' | 'workspace' | 'qa' | 'compare' | 'prep') => void;
  currentAnalysis: DocumentAnalysis | null;
  onNewUpload: () => void;
  currentLang: SupportedLanguage;
  onSelectLang: (lang: SupportedLanguage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  currentAnalysis,
  onNewUpload,
  currentLang,
  onSelectLang
}) => {
  return (
    <header role="banner" style={{ background: 'var(--color-brand-900)', color: '#ffffff', position: 'relative' }}>
      {/* Skip to Main Content Link for Screen Readers & Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only sr-only-focusable btn btn-accent btn-sm"
        style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 9999 }}
      >
        Skip to main content
      </a>

      {/* Top Disclaimer & Translation Notice Banner */}
      <div className="disclaimer-banner" role="region" aria-label="Informational Disclaimer Banner">
        <ShieldAlert size={14} aria-hidden="true" />
        <span>
          <strong>{getTranslation(currentLang, 'disclaimer')}</strong>
        </span>
      </div>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Custom Brand Logo - LegalBridge | न्यायसेतु */}
        <button
          type="button"
          onClick={() => setCurrentTab('home')}
          aria-label="LegalBridge Home Page"
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textAlign: 'left' }}
        >
          <LegalBridgeLogo size="md" showText={true} animated={true} />
        </button>

        {/* Navigation Tabs */}
        {currentAnalysis && (
          <nav role="navigation" aria-label="Main Navigation">
            <div role="tablist" aria-label="Workspace views" style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                type="button"
                role="tab"
                id="tab-workspace"
                aria-selected={currentTab === 'workspace'}
                aria-controls="main-content"
                aria-label="View Impact Map workspace"
                onClick={() => setCurrentTab('workspace')}
                className={`btn btn-sm ${currentTab === 'workspace' ? 'btn-accent' : 'btn-ghost'}`}
                style={{ color: currentTab === 'workspace' ? '#ffffff' : '#cbd5e1' }}
              >
                <FileText size={15} aria-hidden="true" /> {getTranslation(currentLang, 'impactMap')}
              </button>
              <button
                type="button"
                role="tab"
                id="tab-qa"
                aria-selected={currentTab === 'qa'}
                aria-controls="main-content"
                aria-label="Ask questions about document"
                onClick={() => setCurrentTab('qa')}
                className={`btn btn-sm ${currentTab === 'qa' ? 'btn-accent' : 'btn-ghost'}`}
                style={{ color: currentTab === 'qa' ? '#ffffff' : '#cbd5e1' }}
              >
                <HelpCircle size={15} aria-hidden="true" /> {getTranslation(currentLang, 'askQA')}
              </button>
              <button
                type="button"
                role="tab"
                id="tab-compare"
                aria-selected={currentTab === 'compare'}
                aria-controls="main-content"
                aria-label="Compare document versions"
                onClick={() => setCurrentTab('compare')}
                className={`btn btn-sm ${currentTab === 'compare' ? 'btn-accent' : 'btn-ghost'}`}
                style={{ color: currentTab === 'compare' ? '#ffffff' : '#cbd5e1' }}
              >
                <GitCompare size={15} aria-hidden="true" /> {getTranslation(currentLang, 'compareDoc')}
              </button>
              <button
                type="button"
                role="tab"
                id="tab-prep"
                aria-selected={currentTab === 'prep'}
                aria-controls="main-content"
                aria-label="View counsel preparation sheet"
                onClick={() => setCurrentTab('prep')}
                className={`btn btn-sm ${currentTab === 'prep' ? 'btn-accent' : 'btn-ghost'}`}
                style={{ color: currentTab === 'prep' ? '#ffffff' : '#cbd5e1' }}
              >
                <ClipboardList size={15} aria-hidden="true" /> {getTranslation(currentLang, 'counselPrep')}
              </button>
            </div>
          </nav>
        )}

        {/* Language Selector Dropdown & Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Multilingual Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--color-brand-800)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-brand-700)' }}>
            <Globe size={15} color="#94a3b8" aria-hidden="true" />
            <label htmlFor="header-lang-select" className="sr-only">
              Select Language
            </label>
            <select
              id="header-lang-select"
              value={currentLang}
              onChange={(e) => onSelectLang(e.target.value as SupportedLanguage)}
              style={{
                background: 'transparent',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none'
              }}
              aria-label="Select Accessibility Language"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code} style={{ background: 'var(--color-brand-900)', color: '#ffffff' }}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {currentAnalysis ? (
            <button type="button" onClick={onNewUpload} className="btn btn-secondary btn-sm" aria-label="Upload a new document">
              {getTranslation(currentLang, 'newDoc')}
            </button>
          ) : (
            <button type="button" onClick={() => setCurrentTab('home')} className="btn btn-accent btn-sm" aria-label="Start document analysis">
              {getTranslation(currentLang, 'analyzeDoc')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
