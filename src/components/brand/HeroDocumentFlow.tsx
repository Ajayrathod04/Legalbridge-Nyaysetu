import React from 'react';
import { FileText, Search, UserCheck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HeroDocumentFlow: React.FC = () => {
  return (
    <div 
      className="hero-document-flow-container"
      style={{
        background: '#ffffff',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-subtle)',
        padding: '2rem 1.5rem',
        boxShadow: 'var(--shadow-md)',
        marginTop: '2.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <span className="badge badge-medium" style={{ marginBottom: '0.35rem' }}>
          Interactive Evidence Pipeline
        </span>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
          From Complex Contract to Actionable Legal Clarity
        </h3>
      </div>

      {/* Node Pipeline Flow */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
        gap: '1rem',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Node 1: Document */}
        <div className="flow-node-card">
          <div className="flow-node-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
            <FileText size={20} />
          </div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
            1. DOCUMENT
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-brand-600)' }}>
            PDF, DOCX, TXT raw text extraction
          </p>
        </div>

        {/* Node 2: Understand */}
        <div className="flow-node-card">
          <div className="flow-node-icon" style={{ background: '#f0f9ff', color: '#0284c7' }}>
            <Search size={20} />
          </div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
            2. UNDERSTAND
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-brand-600)' }}>
            Clause & section segmentation
          </p>
        </div>

        {/* Node 3: What Matters To You */}
        <div className="flow-node-card flow-node-hero">
          <div className="flow-node-icon" style={{ background: '#fffbeb', color: '#d97706' }}>
            <UserCheck size={20} />
          </div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#92400e' }}>
            3. WHAT MATTERS TO YOU
          </h4>
          <p style={{ fontSize: '0.75rem', color: '#b45309' }}>
            Role-personalized risk impact
          </p>
        </div>

        {/* Node 4: Evidence */}
        <div className="flow-node-card">
          <div className="flow-node-icon" style={{ background: '#f0fdf4', color: '#059669' }}>
            <ShieldCheck size={20} />
          </div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
            4. EVIDENCE
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-brand-600)' }}>
            Verbatim line citations
          </p>
        </div>

        {/* Node 5: Next Steps */}
        <div className="flow-node-card">
          <div className="flow-node-icon" style={{ background: '#faf5ff', color: '#7e22ce' }}>
            <CheckCircle2 size={20} />
          </div>
          <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
            5. NEXT STEPS
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-brand-600)' }}>
            Counsel prep sheet & checklist
          </p>
        </div>
      </div>
    </div>
  );
};
