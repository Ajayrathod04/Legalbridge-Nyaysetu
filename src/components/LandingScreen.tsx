import React from 'react';
import { ShieldCheck, FileCheck, Search, Users, ArrowRight, Sparkles, FileText, CheckCircle2, ChevronRight, Eye, Layers } from 'lucide-react';
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
    <div style={{ padding: '3.5rem 0 5rem 0', background: 'var(--color-bg-app)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* HERO SECTION — Cinematic Editorial First Impression */}
        <div style={{
          textAlign: 'center',
          maxWidth: '920px',
          margin: '0 auto 4.5rem auto'
        }}>
          <div style={{ display: 'inline-flex', marginBottom: '1.75rem', transform: 'scale(1.1)' }}>
            <LegalBridgeLogo size="lg" showText={false} animated={true} />
          </div>

          <h1 style={{
            fontSize: ' clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            color: 'var(--color-brand-900)',
            lineHeight: 1.1,
            marginBottom: '1.25rem',
            letterSpacing: '-0.03em'
          }}>
            LegalBridge <span style={{ color: 'var(--color-accent-gold)', fontWeight: 600 }}>| न्यायसेतु</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1.2rem, 2.5vw, 1.65rem)',
            fontWeight: 600,
            color: 'var(--color-accent-blue)',
            lineHeight: 1.35,
            marginBottom: '1.25rem',
            letterSpacing: '-0.01em'
          }}>
            Understand legal documents. Know your rights and next steps.
          </p>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--color-brand-600)',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
            maxWidth: '760px',
            margin: '0 auto 2.5rem auto'
          }}>
            Turn complex legal documents into clear, evidence-grounded explanations, personalized insights, and practical questions for a legal professional.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={onStartUpload} 
              className="btn btn-primary" 
              style={{ padding: '0.95rem 2.5rem', fontSize: '1.1rem', borderRadius: 'var(--radius-md)' }}
            >
              Analyze a Document <ArrowRight size={20} />
            </button>
            <a 
              href="#journey" 
              className="btn btn-secondary" 
              style={{ padding: '0.95rem 2rem', fontSize: '1.1rem', borderRadius: 'var(--radius-md)' }}
            >
              See How It Works
            </a>
          </div>

          {/* Hero Interactive Document Flow Visual */}
          <HeroDocumentFlow />
        </div>

        {/* EDITORIAL SCROLL-DRIVEN NARRATIVE JOURNEY (01 to 05) */}
        <div id="journey" style={{ marginBottom: '5rem', paddingTop: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-low" style={{ marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
              EDITORIAL PRODUCT JOURNEY
            </span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--color-brand-900)', letterSpacing: '-0.02em' }}>
              How LegalBridge Works For You
            </h2>
            <p style={{ color: 'var(--color-brand-600)', fontSize: '1.05rem', maxWidth: '600px', margin: '0.5rem auto 0 auto' }}>
              A guided 5-step experience transforming raw legalese into grounded understanding and action.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Step 01 — UPLOAD */}
            <div className="card" style={{ padding: '2.25rem', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-accent-blue)', opacity: 0.8, lineHeight: 1 }}>
                01
              </span>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.5rem' }}>
                  UPLOAD — Your Document Enters LegalBridge
                </h3>
                <p style={{ color: 'var(--color-brand-600)', fontSize: '0.975rem', lineHeight: 1.6 }}>
                  Upload any PDF, DOCX, or TXT agreement. Text is extracted in-memory with strict privacy guarantees and instant structure mapping.
                </p>
              </div>
            </div>

            {/* Step 02 — UNDERSTAND */}
            <div className="card" style={{ padding: '2.25rem', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-accent-gold)', opacity: 0.8, lineHeight: 1 }}>
                02
              </span>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.5rem' }}>
                  UNDERSTAND — Complex Clauses Become Plain Language
                </h3>
                <p style={{ color: 'var(--color-brand-600)', fontSize: '0.975rem', lineHeight: 1.6 }}>
                  LegalBridge automatically breaks down dense legalese into plain-language translations across payment, termination, IP, and restrictive covenants.
                </p>
              </div>
            </div>

            {/* Step 03 — SEE WHAT MATTERS */}
            <div className="card" style={{ padding: '2.25rem', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', alignItems: 'flex-start', borderLeft: '4px solid var(--color-warning)' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-warning)', opacity: 0.9, lineHeight: 1 }}>
                03
              </span>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.5rem' }}>
                  SEE WHAT MATTERS — Personalized Impact Based on Your Role
                </h3>
                <p style={{ color: 'var(--color-brand-600)', fontSize: '0.975rem', lineHeight: 1.6 }}>
                  Select your role (Employee, Tenant, Freelancer) to instantly view <strong>"Why this matters to YOU"</strong> risk highlights without changing original document facts.
                </p>
              </div>
            </div>

            {/* Step 04 — VERIFY */}
            <div className="card" style={{ padding: '2.25rem', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-success)', opacity: 0.8, lineHeight: 1 }}>
                04
              </span>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.5rem' }}>
                  VERIFY — Every Explanation Connects Back to Original Evidence
                </h3>
                <p style={{ color: 'var(--color-brand-600)', fontSize: '0.975rem', lineHeight: 1.6 }}>
                  Click <em>"View Evidence in Doc"</em> to highlight exact verbatim quotes and line numbers. Nothing is fabricated.
                </p>
              </div>
            </div>

            {/* Step 05 — PREPARE */}
            <div className="card" style={{ padding: '2.25rem', display: 'grid', gridTemplateColumns: '80px 1fr', gap: '1.5rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-info)', opacity: 0.8, lineHeight: 1 }}>
                05
              </span>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.5rem' }}>
                  PREPARE — Leave With Questions & Next Steps for Your Lawyer
                </h3>
                <p style={{ color: 'var(--color-brand-600)', fontSize: '0.975rem', lineHeight: 1.6 }}>
                  Generate an exportable Counsel Preparation Sheet with prioritized legal questions, items to bring, and an interactive checklist.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* 1-CLICK SAMPLE DEMO DOCUMENTS SECTION */}
        <div id="samples" style={{ background: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '3rem 2.5rem', border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
            <span className="badge badge-low" style={{ marginBottom: '0.5rem' }}>INSTANT DEMO</span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-brand-900)' }}>
              Try 1-Click Sample Legal Documents
            </h2>
            <p style={{ color: 'var(--color-brand-600)', fontSize: '1rem' }}>
              Test LegalBridge | न्यायसेतु instantly with synthetic, legally-safe sample agreements.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {SAMPLE_DOCUMENTS.map((sample) => (
              <div 
                key={sample.id}
                style={{
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justify: 'space-between',
                  background: 'var(--color-bg-app)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-low">{sample.category}</span>
                    <FileText size={18} color="var(--color-brand-500)" />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-brand-900)' }}>
                    {sample.title}
                  </h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-brand-600)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                    {sample.description}
                  </p>
                </div>

                <button 
                  onClick={() => onSelectSample(sample)}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', padding: '0.6rem' }}
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
