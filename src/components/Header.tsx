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
    <header style={{ background: 'var(--color-brand-900)', color: '#ffffff' }}>
      {/* Top Disclaimer & Translation Notice Banner */}
      <div className="disclaimer-banner">
        <ShieldAlert size={14} />
        <span>
          <strong>{getTranslation(currentLang, 'disclaimer')}</strong>
        </span>
      </div>

      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Custom Brand Logo - LegalBridge | न्यायसेतु */}
        <div onClick={() => setCurrentTab('home')}>
          <LegalBridgeLogo size="md" showText={true} animated={true} />
        </div>

        {/* Navigation Tabs */}
        {currentAnalysis && (
          <nav style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              onClick={() => setCurrentTab('workspace')}
              className={`btn btn-sm ${currentTab === 'workspace' ? 'btn-accent' : 'btn-ghost'}`}
              style={{ color: currentTab === 'workspace' ? '#ffffff' : '#cbd5e1' }}
            >
              <FileText size={15} /> {getTranslation(currentLang, 'impactMap')}
            </button>
            <button
              onClick={() => setCurrentTab('qa')}
              className={`btn btn-sm ${currentTab === 'qa' ? 'btn-accent' : 'btn-ghost'}`}
              style={{ color: currentTab === 'qa' ? '#ffffff' : '#cbd5e1' }}
            >
              <HelpCircle size={15} /> {getTranslation(currentLang, 'askQA')}
            </button>
            <button
              onClick={() => setCurrentTab('compare')}
              className={`btn btn-sm ${currentTab === 'compare' ? 'btn-accent' : 'btn-ghost'}`}
              style={{ color: currentTab === 'compare' ? '#ffffff' : '#cbd5e1' }}
            >
              <GitCompare size={15} /> {getTranslation(currentLang, 'compareDoc')}
            </button>
            <button
              onClick={() => setCurrentTab('prep')}
              className={`btn btn-sm ${currentTab === 'prep' ? 'btn-accent' : 'btn-ghost'}`}
              style={{ color: currentTab === 'prep' ? '#ffffff' : '#cbd5e1' }}
            >
              <ClipboardList size={15} /> {getTranslation(currentLang, 'counselPrep')}
            </button>
          </nav>
        )}

        {/* Language Selector Dropdown & Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Multilingual Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'var(--color-brand-800)', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-brand-700)' }}>
            <Globe size={15} color="#94a3b8" />
            <select
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
              title="Select Accessibility Language"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.code} value={lang.code} style={{ background: 'var(--color-brand-900)', color: '#ffffff' }}>
                  {lang.nativeName} ({lang.name})
                </option>
              ))}
            </select>
          </div>

          {currentAnalysis ? (
            <button onClick={onNewUpload} className="btn btn-secondary btn-sm">
              {getTranslation(currentLang, 'newDoc')}
            </button>
          ) : (
            <button onClick={() => setCurrentTab('home')} className="btn btn-accent btn-sm">
              {getTranslation(currentLang, 'analyzeDoc')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
