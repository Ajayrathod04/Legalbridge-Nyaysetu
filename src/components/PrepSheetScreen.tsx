import React, { useState, useEffect } from 'react';
import { ClipboardList, Printer, ShieldAlert } from 'lucide-react';
import { DocumentAnalysis, CounselPrepSheet, ChecklistItem } from '../../shared/types';

interface PrepSheetScreenProps {
  analysis: DocumentAnalysis;
}

export const PrepSheetScreen: React.FC<PrepSheetScreenProps> = ({ analysis }) => {
  const [prepSheet, setPrepSheet] = useState<CounselPrepSheet | null>(null);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    fetch('/api/documents/prep-sheet', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysis })
    })
      .then(res => res.json())
      .then((data: CounselPrepSheet) => {
        setPrepSheet(data);
        setChecklist(data.actionChecklist || []);
      })
      .catch(err => console.error('Failed to load prep sheet:', err));
  }, [analysis]);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handlePrint = () => {
    window.print();
  };

  if (!prepSheet) {
    return (
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <p>Generating your Legal Counsel Preparation Sheet...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0', background: 'var(--color-bg-app)', minHeight: 'calc(100vh - 120px)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Top Control Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <span className="badge badge-low" style={{ marginBottom: '0.35rem' }}>
              <ClipboardList size={14} aria-hidden="true" /> Exportable Dossier
            </span>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-brand-900)' }}>
              Legal Preparation Sheet
            </h1>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="btn btn-secondary"
            aria-label="Print or save legal preparation sheet as PDF"
          >
            <Printer size={16} aria-hidden="true" /> Print / Save PDF
          </button>
        </div>

        {/* Legal Disclaimer Box */}
        <div role="region" aria-label="Legal Disclaimer Notice" style={{ background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning-border)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <ShieldAlert size={20} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
          <div>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#92400e' }}>
              Informational Support Notice
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#92400e', lineHeight: 1.4 }}>
              This preparation sheet organizes key facts, evidence citations, and practical questions extracted from your document. It is designed to maximize the efficiency of your consultation with a licensed legal professional and does not constitute formal legal advice.
            </p>
          </div>
        </div>

        {/* PREPARATION SHEET DOSSIER CARD */}
        <div className="card" style={{ padding: '2.5rem', background: '#ffffff' }}>
          {/* Header */}
          <div style={{ borderBottom: '2px solid var(--color-brand-900)', paddingBottom: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-brand-900)', marginBottom: '0.25rem' }}>
                {prepSheet.documentTitle}
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-brand-600)' }}>
                Target Persona Role: <strong>{prepSheet.userContext.toUpperCase()}</strong> | Prepared: {prepSheet.generatedAt}
              </p>
            </div>
            <span className="badge badge-medium">LegalBridge | न्यायसेतु Verified</span>
          </div>

          {/* Section 1: Key Points */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.65rem' }}>
              1. Document Key Summary
            </h3>
            <ul style={{ paddingLeft: '1.25rem' }}>
              {prepSheet.keyPoints.map((kp, idx) => (
                <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--color-brand-800)', marginBottom: '0.35rem' }}>
                  {kp}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Important Obligations */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.65rem' }}>
              2. Key Contractual Obligations
            </h3>
            <ul style={{ paddingLeft: '1.25rem' }}>
              {prepSheet.obligations.map((ob, idx) => (
                <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--color-brand-800)', marginBottom: '0.35rem' }}>
                  {ob}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: High Attention Areas */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.65rem' }}>
              3. Attention & High Risk Areas
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {prepSheet.attentionAreas.map((aa, idx) => (
                <div key={idx} style={{ background: 'var(--color-bg-app)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${aa.severity === 'high' ? 'var(--color-danger)' : 'var(--color-warning)'}` }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-brand-900)' }}>
                    {aa.title}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-brand-700)', marginTop: '0.2rem' }}>
                    {aa.risk}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Questions to Ask Legal Professional */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.65rem' }}>
              4. Questions to Ask Your Lawyer
            </h3>
            <div style={{ background: 'var(--color-info-bg)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-info-border)' }}>
              {prepSheet.questionsForLawyer.map((q, idx) => (
                <p key={idx} style={{ fontSize: '0.9rem', color: 'var(--color-brand-900)', fontWeight: 500, marginBottom: '0.4rem' }}>
                  • {q}
                </p>
              ))}
            </div>
          </div>

          {/* Section 5: Documents to Bring */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.65rem' }}>
              5. Documents / Information to Bring to Consultation
            </h3>
            <ul style={{ paddingLeft: '1.25rem' }}>
              {prepSheet.documentsToBring.map((docItem, idx) => (
                <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--color-brand-800)', marginBottom: '0.35rem' }}>
                  {docItem}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: Action Checklist */}
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.65rem' }}>
              6. Practical Action Checklist
            </h3>
            <div role="group" aria-label="Action Checklist Items" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {checklist.map((item) => (
                <label
                  key={item.id}
                  htmlFor={`chk-input-${item.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: item.completed ? 'var(--color-success-bg)' : 'var(--color-bg-app)',
                    border: `1px solid ${item.completed ? 'var(--color-success-border)' : 'var(--color-border-subtle)'}`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <input
                    id={`chk-input-${item.id}`}
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleChecklistItem(item.id)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--color-success)' }}
                    aria-label={`Checklist item: ${item.item}`}
                  />
                  <span style={{ fontSize: '0.875rem', textDecoration: item.completed ? 'line-through' : 'none', color: item.completed ? 'var(--color-success)' : 'var(--color-brand-900)' }}>
                    {item.item}
                  </span>
                </label>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
