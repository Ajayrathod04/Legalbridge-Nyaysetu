import React, { useState } from 'react';
import { GitCompare, Plus, Minus, RefreshCw, AlertTriangle, ArrowRight, Loader2, FileText } from 'lucide-react';
import { DocumentAnalysis, ComparisonResult } from '../../shared/types';
import { SAMPLE_DOCUMENTS } from '../../shared/sampleDocs';

interface ComparisonScreenProps {
  currentAnalysis: DocumentAnalysis;
  onSelectDocB: (docB: DocumentAnalysis) => void;
}

export const ComparisonScreen: React.FC<ComparisonScreenProps> = ({
  currentAnalysis,
  onSelectDocB
}) => {
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSampleV2, setSelectedSampleV2] = useState<string>('sample-employment-v1');

  const handleRunComparison = async (docBAnalysis: DocumentAnalysis) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/documents/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docA: currentAnalysis, docB: docBAnalysis })
      });
      if (response.ok) {
        const data: ComparisonResult = await response.json();
        setComparisonResult(data);
      }
    } catch (err) {
      console.error('Comparison error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompareWithV2Sample = async () => {
    setIsLoading(true);
    try {
      // Fetch V2 document analysis
      const uploadRes = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sampleId: selectedSampleV2, useV2: true })
      });
      const uploadData = await uploadRes.json();

      const analyzeRes = await fetch('/api/documents/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: uploadData.text,
          lines: uploadData.lines,
          fileName: `${selectedSampleV2}_v2.txt`,
          fileType: 'txt',
          fileSize: uploadData.fileSize,
          userContext: currentAnalysis.userContext
        })
      });
      const docBData: DocumentAnalysis = await analyzeRes.json();
      onSelectDocB(docBData);

      await handleRunComparison(docBData);
    } catch (err) {
      console.error('Failed to load doc B for comparison:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem 0', background: 'var(--color-bg-app)', minHeight: 'calc(100vh - 120px)' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="badge badge-low" style={{ marginBottom: '0.75rem' }}>
            <GitCompare size={14} /> Side-By-Side Contract Diff Engine
          </div>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-brand-900)' }}>
            Document Version Comparison
          </h2>
          <p style={{ color: 'var(--color-brand-600)', fontSize: '0.95rem' }}>
            Compare <strong style={{ color: 'var(--color-brand-900)' }}>{currentAnalysis.fileName}</strong> against an updated or revised draft to instantly detect added, removed, or modified terms.
          </p>
        </div>

        {/* Comparison Control Card */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
          <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Select Second Document (Document B) to Compare:
          </h4>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              value={selectedSampleV2}
              onChange={(e) => setSelectedSampleV2(e.target.value)}
              style={{ padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-medium)', fontSize: '0.9rem' }}
            >
              {SAMPLE_DOCUMENTS.map(s => (
                <option key={s.id} value={s.id}>{s.title} (Amended Version 2)</option>
              ))}
            </select>

            <button
              onClick={handleCompareWithV2Sample}
              disabled={isLoading}
              className="btn btn-primary"
            >
              {isLoading ? <Loader2 size={16} className="spin-animation" /> : <><RefreshCw size={16} /> Run Clause Comparison</>}
            </button>
          </div>
        </div>

        {/* Comparison Results Render */}
        {comparisonResult && (
          <div>
            {/* Risk Changes Summary */}
            <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-warning)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.5rem' }}>
                Key Risk & Obligation Changes ({comparisonResult.diffs.filter(d => d.changeType !== 'unchanged').length} Changes Found)
              </h3>
              <ul style={{ paddingLeft: '1.2rem' }}>
                {comparisonResult.keyRiskChanges.map((rc, idx) => (
                  <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--color-brand-800)', marginBottom: '0.25rem' }}>
                    {rc}
                  </li>
                ))}
              </ul>
            </div>

            {/* Side by Side Diff List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {comparisonResult.diffs.map((diff) => (
                <div key={diff.id} className="card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-brand-900)' }}>
                      {diff.sectionTitle}
                    </h4>
                    <span className={`badge badge-${
                      diff.changeType === 'modified' ? 'high' :
                      diff.changeType === 'added' ? 'medium' :
                      diff.changeType === 'removed' ? 'high' : 'low'
                    }`}>
                      {diff.changeType.toUpperCase()}
                    </span>
                  </div>

                  {/* Split View Excerpts */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    {/* Doc A */}
                    <div style={{ background: 'var(--color-bg-app)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-subtle)' }}>
                      <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--color-brand-500)', textTransform: 'uppercase' }}>
                        Document A (Original)
                      </label>
                      <p style={{ fontSize: '0.825rem', color: 'var(--color-brand-800)', marginTop: '0.25rem', fontStyle: diff.docAExcerpt ? 'normal' : 'italic' }}>
                        {diff.docAExcerpt || '[Section not present in Document A]'}
                      </p>
                    </div>

                    {/* Doc B */}
                    <div style={{ background: '#f0fdf4', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-success-border)' }}>
                      <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--color-success)', textTransform: 'uppercase' }}>
                        Document B (Revised)
                      </label>
                      <p style={{ fontSize: '0.825rem', color: '#166534', marginTop: '0.25rem', fontStyle: diff.docBExcerpt ? 'normal' : 'italic' }}>
                        {diff.docBExcerpt || '[Section removed in Document B]'}
                      </p>
                    </div>
                  </div>

                  {/* AI Explanation of Impact */}
                  <div style={{ background: 'var(--color-info-bg)', border: '1px solid var(--color-info-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                    <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--color-info)', textTransform: 'uppercase' }}>
                      What Changed & Persona Impact:
                    </label>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-brand-900)', marginTop: '0.25rem' }}>
                      {diff.personaImpact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
