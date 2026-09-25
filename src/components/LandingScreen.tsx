import React from 'react';
import { ShieldCheck, FileCheck, Search, Users, ArrowRight, Sparkles, FileText } from 'lucide-react';
import { SAMPLE_DOCUMENTS, SampleDocument } from '../../shared/sampleDocs';
import { LegalBridgeLogo } from './brand/LegalBridgeLogo';
import { HeroDocumentFlow } from './brand/HeroDocumentFlow';

interface LandingScreenProps {
  onStartUpload: () => void;
  onSelectSample: (sample: SampleDocument) => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartUpload,
  onSelectSample
}) => {
  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container">
        {/* Hero Banner */}
        <div style={{
          textAlign: 'center',
          maxWidth: '850px',
          margin: '0 auto 3.5rem auto'
        }}>
          <div style={{ display: 'inline-flex', marginBottom: '1.5rem' }}>
            <LegalBridgeLogo size="lg" showText={false} animated={true} />
          </div>

          <h1 style={{
            fontSize: '2.85rem',
            fontWeight: 800,
            color: 'var(--color-brand-900)',
            lineHeight: 1.15,
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            LegalBridge | <span style={{ color: 'var(--color-accent-gold)' }}>न्यायसेतु</span>
          </h1>

          <p style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--color-accent-blue)',
            marginBottom: '0.75rem'
          }}>
            Understand legal documents. Know your rights and next steps.
          </p>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--color-brand-600)',
            lineHeight: 1.6,
            marginBottom: '2rem',
            maxWidth: '720px',
            margin: '0 auto 2rem auto'
          }}>
            Turn complex legal documents into clear, evidence-grounded explanations, personalized insights, and practical questions for a legal professional.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onStartUpload} className="btn btn-primary" style={{ padding: '0.85rem 2.25rem', fontSize: '1.05rem' }}>
              Analyze a Document <ArrowRight size={18} />
            </button>
            <a href="#samples" className="btn btn-secondary" style={{ padding: '0.85rem 1.75rem', fontSize: '1.05rem' }}>
              See How It Works
            </a>
          </div>

          {/* Section 6: Hero Visual Flow */}
          <HeroDocumentFlow />

          {/* Trust Indicators */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--color-border-subtle)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brand-700)', fontSize: '0.875rem' }}>
              <ShieldCheck size={18} color="var(--color-success)" /> Evidence-Grounded
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brand-700)', fontSize: '0.875rem' }}>
              <FileCheck size={18} color="var(--color-accent-blue)" /> Privacy-Conscious
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brand-700)', fontSize: '0.875rem' }}>
              <Search size={18} color="var(--color-accent-gold)" /> Persona Impact Map
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-brand-700)', fontSize: '0.875rem' }}>
              <Users size={18} color="var(--color-info)" /> Prepared for Counsel
            </div>
          </div>
        </div>

        {/* Core Value Proposition Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '4rem'
        }}>
          <div className="card">
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Search size={22} color="var(--color-accent-blue)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>1. Verbatim Evidence Traceability</h3>
            <p style={{ color: 'var(--color-brand-600)', fontSize: '0.925rem' }}>
              Every explanation links directly to exact line numbers and quotes in your uploaded file. Never guess what the document actually says.
            </p>
          </div>

          <div className="card">
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Users size={22} color="var(--color-accent-gold)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>2. Role-Personalized Legal Impact</h3>
            <p style={{ color: 'var(--color-brand-600)', fontSize: '0.925rem' }}>
              Select your role (Employee, Tenant, Freelancer) to see "Why this matters to ME" risk highlights and customized action items.
            </p>
          </div>

          <div className="card">
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <FileCheck size={22} color="var(--color-success)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>3. Prepare for Legal Counsel</h3>
            <p style={{ color: 'var(--color-brand-600)', fontSize: '0.925rem' }}>
              Generate a structured preparation sheet with prioritized questions for your lawyer, key obligations, and a practical checklist.
            </p>
          </div>
        </div>

        {/* 1-Click Interactive Demo Loaders */}
        <div id="samples" style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '2.5rem', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
              Try 1-Click Sample Legal Documents
            </h2>
            <p style={{ color: 'var(--color-brand-600)', fontSize: '0.95rem' }}>
              Test LegalBridge | न्यायसेतु instantly with synthetic, legally-safe sample agreements.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {SAMPLE_DOCUMENTS.map((sample) => (
              <div 
                key={sample.id}
                style={{
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  background: 'var(--color-bg-app)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge badge-low">{sample.category}</span>
                    <FileText size={16} color="var(--color-brand-500)" />
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--color-brand-900)' }}>
                    {sample.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-brand-600)', marginBottom: '1.25rem' }}>
                    {sample.description}
                  </p>
                </div>

                <button 
                  onClick={() => onSelectSample(sample)}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                >
                  Analyze This Document →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
