import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Link as LinkIcon, 
  HelpCircle, 
  Calendar, 
  UserCheck, 
  ChevronRight, 
  ArrowUpRight,
  Sparkles,
  BookmarkPlus
} from 'lucide-react';
import { DocumentAnalysis, ClauseFinding, ClauseCategory, SupportedLanguage } from '../../shared/types';
import { getTranslation, getLocalizedPersonaImpact } from '../services/i18n';

interface WorkspaceScreenProps {
  analysis: DocumentAnalysis;
  onAskQuestion: (initialQuestion?: string) => void;
  onPrepareCounsel: () => void;
  onCompare: () => void;
  currentLang: SupportedLanguage;
}

export const WorkspaceScreen: React.FC<WorkspaceScreenProps> = ({
  analysis,
  onAskQuestion,
  onPrepareCounsel,
  onCompare,
  currentLang
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFindingId, setActiveFindingId] = useState<string | null>(analysis.findings[0]?.id || null);
  const [highlightLineRange, setHighlightLineRange] = useState<{ start: number; end: number } | null>(
    analysis.findings[0] ? { start: analysis.findings[0].startLine, end: analysis.findings[0].endLine } : null
  );
  const [docSearchQuery, setDocSearchQuery] = useState('');

  const docViewerRef = useRef<HTMLDivElement>(null);

  // Filter findings by selected category
  const filteredFindings = selectedCategory === 'all' 
    ? analysis.findings 
    : analysis.findings.filter(f => f.category === selectedCategory);

  const activeFinding = analysis.findings.find(f => f.id === activeFindingId) || analysis.findings[0];

  // Function to handle clicking "View Evidence"
  const handleViewEvidence = (finding: ClauseFinding) => {
    setActiveFindingId(finding.id);
    setHighlightLineRange({ start: finding.startLine, end: finding.endLine });

    // Scroll document viewer to highlighted line
    if (docViewerRef.current) {
      const lineElement = document.getElementById(`doc-line-${finding.startLine}`);
      if (lineElement) {
        lineElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div style={{ padding: '1.5rem 0', background: 'var(--color-bg-app)', minHeight: 'calc(100vh - 120px)' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        
        {/* Workspace Top Action Bar */}
        <div className="card" style={{ padding: '1rem 1.5rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-low">{analysis.documentType}</span>
              <span style={{ fontSize: '0.825rem', color: 'var(--color-brand-600)' }}>
                User Role: <strong style={{ color: 'var(--color-brand-900)' }}>{analysis.userContext.toUpperCase()}</strong>
              </span>
              <span style={{ fontSize: '0.825rem', color: 'var(--color-brand-500)' }}>• {analysis.fileName}</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
              {analysis.title}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem' }}>
            <button onClick={() => onAskQuestion()} className="btn btn-secondary btn-sm">
              <Search size={15} /> Ask Q&A
            </button>
            <button onClick={onCompare} className="btn btn-secondary btn-sm">
              Compare Doc
            </button>
            <button onClick={onPrepareCounsel} className="btn btn-accent btn-sm">
              Counsel Prep Sheet →
            </button>
          </div>
        </div>

        {/* Executive Summary & Key Highlights */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          marginBottom: '1.25rem'
        }}>
          <div className="card" style={{ padding: '1.15rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brand-700)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
              <Sparkles size={16} color="var(--color-accent-blue)" /> Document Overview
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-brand-700)', lineHeight: 1.5 }}>
              {analysis.summary}
            </p>
          </div>

          <div className="card" style={{ padding: '1.15rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brand-700)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
              <Calendar size={16} color="var(--color-accent-gold)" /> Key Dates & Duration
            </div>
            {analysis.keyDates.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {analysis.keyDates.slice(0, 2).map((kd, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--color-brand-700)', marginBottom: '0.25rem' }}>
                    <strong>{kd.date}</strong> — {kd.event}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: '0.85rem', color: 'var(--color-brand-500)' }}>No specific key dates extracted.</p>
            )}
          </div>

          <div className="card" style={{ padding: '1.15rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brand-700)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.4rem' }}>
              <UserCheck size={16} color="var(--color-success)" /> Contract Parties
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {analysis.parties.map((p, idx) => (
                <span key={idx} className="badge badge-low" style={{ textTransform: 'none', fontSize: '0.775rem' }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3-COLUMN WORKSPACE CONTAINER */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr 420px',
          gap: '1.25rem',
          alignItems: 'start'
        }}>
          {/* COLUMN 1: CLAUSE & CATEGORY NAVIGATOR */}
          <div className="card" style={{ padding: '1rem', position: 'sticky', top: '1.5rem', maxHeight: '780px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Clause Map
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <button
                onClick={() => setSelectedCategory('all')}
                style={{
                  textAlign: 'left',
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: selectedCategory === 'all' ? 700 : 500,
                  background: selectedCategory === 'all' ? 'var(--color-brand-900)' : 'transparent',
                  color: selectedCategory === 'all' ? '#ffffff' : 'var(--color-brand-700)',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>All Clauses</span>
                <span style={{ opacity: 0.75, fontSize: '0.75rem' }}>{analysis.findings.length}</span>
              </button>

              {analysis.findings.map((f) => {
                const isActive = activeFindingId === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => handleViewEvidence(f)}
                    style={{
                      textAlign: 'left',
                      padding: '0.55rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.825rem',
                      fontWeight: isActive ? 700 : 500,
                      background: isActive ? 'var(--color-info-bg)' : 'transparent',
                      color: isActive ? 'var(--color-accent-blue)' : 'var(--color-brand-700)',
                      borderLeft: isActive ? '3px solid var(--color-accent-blue)' : '3px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justify: 'space-between'
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {f.title}
                    </span>
                    {f.severity === 'high' && <span style={{ color: 'var(--color-danger)', fontSize: '0.65rem' }}>●</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLUMN 2: VERBATIM DOCUMENT VIEWER WITH HIGHLIGHTING */}
          <div className="card" style={{ padding: '1.25rem', height: '780px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText size={18} color="var(--color-brand-700)" />
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
                  Verbatim Document Text
                </h3>
              </div>
              <div style={{ position: 'relative', width: '200px' }}>
                <input
                  type="text"
                  placeholder="Search document..."
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.35rem 0.65rem 0.35rem 2rem',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--color-border-medium)'
                  }}
                />
                <Search size={14} style={{ position: 'absolute', left: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-brand-500)' }} />
              </div>
            </div>

            {/* Document Lines Scroll Container */}
            <div 
              ref={docViewerRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.825rem',
                lineHeight: '1.6',
                background: '#fafafa',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-subtle)'
              }}
            >
              {analysis.lines.map((l) => {
                const isHighlighted = highlightLineRange && l.lineNumber >= highlightLineRange.start && l.lineNumber <= highlightLineRange.end;
                const matchesSearch = docSearchQuery && l.content.toLowerCase().includes(docSearchQuery.toLowerCase());

                return (
                  <div
                    key={l.lineNumber}
                    id={`doc-line-${l.lineNumber}`}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      background: isHighlighted 
                        ? '#fef3c7' 
                        : matchesSearch 
                        ? '#e0f2fe' 
                        : 'transparent',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '3px',
                      borderLeft: isHighlighted ? '3px solid var(--color-accent-gold)' : '3px solid transparent'
                    }}
                  >
                    <span style={{
                      color: 'var(--color-brand-500)',
                      userSelect: 'none',
                      width: '32px',
                      textAlign: 'right',
                      flexShrink: 0
                    }}>
                      {l.lineNumber}
                    </span>
                    <span style={{ color: isHighlighted ? '#92400e' : 'var(--color-brand-900)', whiteSpace: 'pre-wrap' }}>
                      {l.content}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COLUMN 3: HERO FEATURE - LEGAL IMPACT CARDS ("How this affects you") */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '780px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-brand-900)' }}>
                {getTranslation(currentLang, 'howItAffectsYou')} 🎯
              </h3>
              <span className="badge badge-medium">{getTranslation(currentLang, 'personaAware')}</span>
            </div>

            {currentLang !== 'en' && (
              <div style={{ background: 'var(--color-info-bg)', border: '1px solid var(--color-info-border)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.775rem', color: 'var(--color-info)' }}>
                {getTranslation(currentLang, 'translationNotice')}
              </div>
            )}

            {filteredFindings.map((finding) => {
              const isSelected = activeFindingId === finding.id;
              const localizedImpact = getLocalizedPersonaImpact(currentLang, finding.title, finding.personaImpact);
              return (
                <div
                  key={finding.id}
                  className="card"
                  style={{
                    padding: '1.25rem',
                    borderColor: isSelected ? 'var(--color-accent-blue)' : 'var(--color-border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                    borderLeft: `4px solid ${
                      finding.severity === 'high' ? 'var(--color-danger)' :
                      finding.severity === 'medium' ? 'var(--color-warning)' : 'var(--color-accent-blue)'
                    }`
                  }}
                >
                  {/* Category & Title */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
                    <div>
                      <span className={`badge badge-${finding.severity}`} style={{ marginBottom: '0.35rem' }}>
                        {finding.category.replace('_', ' ')}
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
                        {finding.title}
                      </h4>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-brand-500)', fontWeight: 600 }}>
                      Lines {finding.startLine}-{finding.endLine}
                    </span>
                  </div>

                  {/* 1. What the document says (Verbatim Excerpt - Kept strictly in original text) */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-brand-500)', textTransform: 'uppercase' }}>
                      {getTranslation(currentLang, 'whatDocSays')}
                    </label>
                    <p style={{
                      fontSize: '0.825rem',
                      color: 'var(--color-brand-800)',
                      fontStyle: 'italic',
                      background: 'var(--color-bg-app)',
                      padding: '0.5rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      marginTop: '0.25rem',
                      borderLeft: '2px solid var(--color-border-medium)'
                    }}>
                      "{finding.verbatimText.length > 180 ? finding.verbatimText.substring(0, 180) + '...' : finding.verbatimText}"
                    </p>
                  </div>

                  {/* 2. In simple words */}
                  <div style={{ marginBottom: '0.85rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-brand-500)', textTransform: 'uppercase' }}>
                      {getTranslation(currentLang, 'inSimpleWords')}
                    </label>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-brand-900)', marginTop: '0.25rem' }}>
                      {finding.simpleExplanation}
                    </p>
                  </div>

                  {/* 3. Why it matters to YOU (Persona Impact - Localized) */}
                  <div style={{
                    background: 'var(--color-warning-bg)',
                    border: '1px solid var(--color-warning-border)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '0.85rem'
                  }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-warning)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <AlertTriangle size={13} /> {getTranslation(currentLang, 'whyItMatters')} ({analysis.userContext}):
                    </label>
                    <p style={{ fontSize: '0.85rem', color: '#92400e', fontWeight: 500, marginTop: '0.25rem' }}>
                      {localizedImpact}
                    </p>
                  </div>

                  {/* Evidence Button */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
                    <button
                      onClick={() => handleViewEvidence(finding)}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.775rem', padding: '0.35rem 0.65rem' }}
                    >
                      <ArrowUpRight size={14} /> {getTranslation(currentLang, 'viewEvidence')}
                    </button>
                    <button
                      onClick={() => onAskQuestion(`What does line ${finding.startLine} say about ${finding.title}?`)}
                      className="btn btn-ghost btn-sm"
                      style={{ fontSize: '0.775rem', padding: '0.35rem 0.65rem' }}
                    >
                      <HelpCircle size={14} /> {getTranslation(currentLang, 'askQA')}
                    </button>
                  </div>

                  {/* 4. Questions to Clarify */}
                  {finding.questionsToClarify.length > 0 && (
                    <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--color-border-subtle)' }}>
                      <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--color-brand-500)', textTransform: 'uppercase' }}>
                        Question for Legal Counsel:
                      </label>
                      <p style={{ fontSize: '0.825rem', color: 'var(--color-accent-blue)', fontWeight: 500, marginTop: '0.15rem' }}>
                        • "{finding.questionsToClarify[0]}"
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
