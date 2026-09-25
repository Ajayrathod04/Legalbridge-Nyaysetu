import React, { useState } from 'react';
import { Send, HelpCircle, ShieldCheck, AlertCircle, FileText, Sparkles, Loader2 } from 'lucide-react';
import { DocumentAnalysis, QAItem } from '../../shared/types';

interface QAScreenProps {
  analysis: DocumentAnalysis;
  initialQuestion?: string;
}

const PREDEFINED_PROMPTS = [
  "What happens if I leave or terminate this agreement early?",
  "What are my main financial and payment obligations?",
  "Which notice periods or deadlines are specified?",
  "Does this contract restrict working for competitors or subletting?",
  "Who owns the intellectual property and deliverables created?"
];

export const QAScreen: React.FC<QAScreenProps> = ({ analysis, initialQuestion = '' }) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [history, setHistory] = useState<QAItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async (queryText?: string) => {
    const qText = queryText || question;
    if (!qText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/documents/qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis, question: qText })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Q&A answer from server.');
      }

      const data: QAItem = await response.json();
      setHistory(prev => [data, ...prev]);
      setQuestion('');
    } catch (err) {
      setError((err as Error).message || 'An error occurred while answering your question.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem 0', background: 'var(--color-bg-app)', minHeight: 'calc(100vh - 120px)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="badge badge-low" style={{ marginBottom: '0.75rem' }}>
            <ShieldCheck size={14} /> 100% Evidence Grounded Q&A
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-brand-900)' }}>
            Ask LegalBridge | न्यायसेतु About Your Document
          </h2>
          <p style={{ color: 'var(--color-brand-600)', fontSize: '0.95rem' }}>
            Ask anything about <strong style={{ color: 'var(--color-brand-900)' }}>{analysis.fileName}</strong>. Every answer is strictly grounded with verbatim evidence quotes and line citations.
          </p>
        </div>

        {/* Input Bar */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="e.g. What notice period is required if I want to resign?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                fontSize: '0.95rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-medium)'
              }}
            />
            <button
              onClick={() => handleAsk()}
              disabled={isLoading || !question.trim()}
              className="btn btn-accent"
              style={{ padding: '0.75rem 1.5rem' }}
            >
              {isLoading ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <><Send size={16} /> Ask</>}
            </button>
          </div>

          {/* Quick Prompts */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-brand-500)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              Suggested Questions:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {PREDEFINED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuestion(prompt);
                    handleAsk(prompt);
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.775rem', background: 'var(--color-bg-app)' }}
                >
                  <Sparkles size={13} color="var(--color-accent-blue)" /> {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)', border: '1px solid var(--color-danger-border)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* Q&A Response History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {history.map((item) => (
            <div key={item.id} className="card" style={{ padding: '1.5rem', borderLeft: item.isSufficient ? '4px solid var(--color-success)' : '4px solid var(--color-warning)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
                  Q: {item.question}
                </h4>
                <span className={`badge badge-${item.confidence === 'high' ? 'low' : 'medium'}`}>
                  Confidence: {item.confidence.toUpperCase()}
                </span>
              </div>

              {/* Answer */}
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-brand-900)', lineHeight: 1.6 }}>
                  {item.answer}
                </p>
              </div>

              {/* Evidence Box */}
              {item.isSufficient ? (
                <div style={{ background: 'var(--color-bg-app)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--color-accent-blue)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-brand-500)', marginBottom: '0.35rem' }}>
                    <span>VERBATIM EVIDENCE QUOTE</span>
                    <span>{item.sectionNumber}</span>
                  </div>
                  <pre style={{ fontFamily: 'monospace', fontSize: '0.825rem', color: 'var(--color-brand-800)', whiteSpace: 'pre-wrap' }}>
                    "{item.evidenceSnippet}"
                  </pre>
                </div>
              ) : (
                <div style={{ background: 'var(--color-warning-bg)', color: '#92400e', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem' }}>
                  <AlertCircle size={15} style={{ verticalAlign: 'middle', marginRight: '0.35rem' }} />
                  LegalBridge | न्यायसेतु adheres to strict evidence grounding. No facts or clauses were fabricated.
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
