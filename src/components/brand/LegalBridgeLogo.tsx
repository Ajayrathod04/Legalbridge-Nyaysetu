import React from 'react';

interface LegalBridgeLogoProps {
  size?: 'sm' | 'md' | 'lg' | number;
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

export const LegalBridgeLogo: React.FC<LegalBridgeLogoProps> = ({
  size = 'md',
  showText = true,
  animated = true,
  className = ''
}) => {
  const pixelSize = typeof size === 'number' ? size : size === 'sm' ? 28 : size === 'lg' ? 44 : 34;

  return (
    <div 
      className={`legal-bridge-logo-container ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
    >
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? 'animated-logo-svg' : ''}
        style={{ flexShrink: 0 }}
      >
        {/* Outer Shield / Circle Glow */}
        <circle cx="32" cy="32" r="30" fill="url(#logo_bg_gradient)" stroke="url(#logo_stroke_gradient)" strokeWidth="2" />
        
        {/* Courthouse Pediment (Roof Triangle) */}
        <path
          d="M20 25L32 17L44 25H20Z"
          fill="#FFFFFF"
          className="logo-pediment"
        />

        {/* Pillars of Justice */}
        <rect x="22" y="27" width="3.5" height="12" rx="1" fill="#E2E8F0" className="logo-pillar" />
        <rect x="28.5" y="27" width="3.5" height="12" rx="1" fill="#E2E8F0" className="logo-pillar" />
        <rect x="35" y="27" width="3.5" height="12" rx="1" fill="#E2E8F0" className="logo-pillar" />
        <rect x="41.5" y="27" width="3.5" height="12" rx="1" fill="#E2E8F0" className="logo-pillar" />

        {/* Base Foundation */}
        <rect x="18" y="39" width="32" height="3" rx="1" fill="#FFFFFF" />

        {/* Bridge Arch Connecting Left & Right Sides */}
        <path
          d="M12 48C18 42 25 39 32 39C39 39 46 42 52 48"
          stroke="url(#bridge_arch_gradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="logo-bridge-arch"
        />

        {/* Central Pathway Nodes (Representing Access & Evidence) */}
        <circle cx="32" cy="44" r="2.5" fill="#D97706" className="logo-center-node" />
        <circle cx="24" cy="46" r="1.8" fill="#3B82F6" className="logo-node-left" />
        <circle cx="40" cy="46" r="1.8" fill="#3B82F6" className="logo-node-right" />

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="logo_bg_gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0B132B" />
            <stop offset="1" stopColor="#1C2541" />
          </linearGradient>
          <linearGradient id="logo_stroke_gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="bridge_arch_gradient" x1="12" y1="48" x2="52" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D97706" />
            <stop offset="0.5" stopColor="#60A5FA" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{
            fontSize: pixelSize >= 36 ? '1.25rem' : '1.1rem',
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            LegalBridge <span style={{ color: '#D97706', fontWeight: 600 }}>| न्यायसेतु</span>
          </span>
          <span style={{
            fontSize: '0.7rem',
            color: '#94A3B8',
            fontWeight: 500,
            letterSpacing: '0.02em',
            marginTop: '1px'
          }}>
            Grounded Legal Document Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
