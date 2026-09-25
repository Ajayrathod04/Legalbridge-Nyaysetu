import React from 'react';
import { UserCheck, Briefcase, Home, Code, ShoppingCart, Building, HelpCircle, ArrowRight } from 'lucide-react';
import { UserContext } from '../../shared/types';

interface PersonaSelectorProps {
  selectedContext: UserContext;
  onSelectContext: (context: UserContext) => void;
  onConfirm: () => void;
}

interface PersonaOption {
  id: UserContext;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PERSONA_OPTIONS: PersonaOption[] = [
  {
    id: 'employee',
    title: 'Employee',
    description: 'Reviewing a job offer or employment contract (notice period, CTC, non-compete, IP).',
    icon: <Briefcase size={22} color="var(--color-accent-blue)" />
  },
  {
    id: 'tenant',
    title: 'Tenant',
    description: 'Renting a residential or commercial property (rent, deposit, lock-in, repairs).',
    icon: <Home size={22} color="var(--color-accent-gold)" />
  },
  {
    id: 'freelancer',
    title: 'Freelancer / Contractor',
    description: 'Providing independent services (payment milestones, IP transfer, liability limits).',
    icon: <Code size={22} color="var(--color-success)" />
  },
  {
    id: 'customer',
    title: 'Consumer / Client',
    description: 'Buying products or subscribing to services (cancellation terms, refund policy).',
    icon: <ShoppingCart size={22} color="var(--color-info)" />
  },
  {
    id: 'business_owner',
    title: 'Business Owner',
    description: 'Partnering or executing B2B vendor/commercial agreements.',
    icon: <Building size={22} color="var(--color-brand-700)" />
  },
  {
    id: 'other',
    title: 'General Citizen',
    description: 'General legal document review without a specific role preset.',
    icon: <HelpCircle size={22} color="var(--color-brand-500)" />
  }
];

export const PersonaSelector: React.FC<PersonaSelectorProps> = ({
  selectedContext,
  onSelectContext,
  onConfirm
}) => {
  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="card" style={{ padding: '2.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="badge badge-low" style={{ marginBottom: '0.85rem' }}>
              <UserCheck size={14} /> Differentiator Feature
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.5rem' }}>
              Who are you in this document?
            </h2>
            <p style={{ color: 'var(--color-brand-600)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
              Your role helps LegalBridge | न्यायसेतु highlight risks and practical questions that matter specifically to YOU. It does not alter the document's actual wording.
            </p>
          </div>

          {/* Grid of Role Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {PERSONA_OPTIONS.map((opt) => {
              const isSelected = selectedContext === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => onSelectContext(opt.id)}
                  style={{
                    border: `2px solid ${isSelected ? 'var(--color-accent-blue)' : 'var(--color-border-subtle)'}`,
                    background: isSelected ? 'var(--color-info-bg)' : '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
                  }}
                >
                  <div style={{ marginBottom: '0.75rem' }}>{opt.icon}</div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.35rem' }}>
                    {opt.title}
                  </h4>
                  <p style={{ fontSize: '0.825rem', color: 'var(--color-brand-600)', lineHeight: 1.4 }}>
                    {opt.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button 
              onClick={() => {
                onSelectContext('none');
                onConfirm();
              }}
              className="btn btn-ghost"
            >
              Skip for now
            </button>

            <button onClick={onConfirm} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>
              Analyze for My Role <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
