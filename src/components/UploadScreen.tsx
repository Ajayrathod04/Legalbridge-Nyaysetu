import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { UserContext } from '../../shared/types';

interface UploadScreenProps {
  onBack: () => void;
  onFileUpload: (file: File) => void;
  isLoading: boolean;
  loadingStep: string;
  error: string | null;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
  onBack,
  onFileUpload,
  isLoading,
  loadingStep,
  error
}) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div style={{ padding: '3rem 0' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>
          <ArrowLeft size={16} /> Back
        </button>

        <div className="card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-brand-900)', marginBottom: '0.5rem' }}>
            Upload Legal Document
          </h2>
          <p style={{ color: 'var(--color-brand-600)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Supports PDF, DOCX, and TXT files up to 10 MB.
          </p>

          {/* Error Banner */}
          {error && (
            <div style={{
              background: 'var(--color-danger-bg)',
              border: '1px solid var(--color-danger-border)',
              color: 'var(--color-danger)',
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textAlign: 'left',
              fontSize: '0.9rem'
            }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Processing Loading Stepper */}
          {isLoading ? (
            <div style={{ padding: '2rem 0' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--color-info-bg)',
                color: 'var(--color-accent-blue)',
                marginBottom: '1.5rem'
              }}>
                <Loader2 size={32} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-brand-900)' }}>
                Analyzing Your Document...
              </h3>
              <p style={{ color: 'var(--color-accent-blue)', fontWeight: 600, fontSize: '0.95rem' }}>
                {loadingStep}
              </p>
              <style>{`
                @keyframes spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : (
            /* Upload Dragzone */
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${dragActive ? 'var(--color-accent-blue)' : 'var(--color-border-medium)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '3rem 2rem',
                background: dragActive ? 'var(--color-info-bg)' : 'var(--color-bg-app)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid var(--color-border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <UploadCloud size={28} color="var(--color-accent-blue)" />
              </div>

              <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-brand-900)', marginBottom: '0.35rem' }}>
                Drop your legal document here
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-brand-500)', marginBottom: '1.25rem' }}>
                or <span style={{ color: 'var(--color-accent-blue)', fontWeight: 600 }}>browse file from your computer</span>
              </p>

              <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                <span className="badge badge-low"><FileText size={12} /> PDF</span>
                <span className="badge badge-low"><FileText size={12} /> DOCX</span>
                <span className="badge badge-low"><FileText size={12} /> TXT</span>
              </div>
            </div>
          )}

          {/* Privacy Note */}
          <div style={{
            marginTop: '2rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--color-border-subtle)',
            fontSize: '0.825rem',
            color: 'var(--color-brand-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={15} color="var(--color-success)" />
            <span>Files are processed in memory with strict privacy protection. No persistent disk storage.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
