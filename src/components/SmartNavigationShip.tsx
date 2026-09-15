import React from 'react';

interface SmartNavigationShipProps {
  x?: number;
  y?: number;
  size?: number;
  angle?: number;
  className?: string;
  isAnimated?: boolean;
  label?: string;
}

/**
 * Smart Navigation Vessel (سفينة الملاحة الذكية)
 * A nautical / futuristic navigation craft with sails, compass heading,
 * radar pulse, and animated wake effects for smart routing visualizations.
 */
export const SmartNavigationShip: React.FC<SmartNavigationShipProps> = ({
  x = 0,
  y = 0,
  size = 36,
  angle = 0,
  className = '',
  isAnimated = true,
  label
}) => {
  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Animated Hydrodynamic Wake / Ripples behind the vessel */}
      {isAnimated && (
        <g opacity="0.6">
          <ellipse
            cx="-8"
            cy="0"
            rx={size * 0.75}
            ry={size * 0.35}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="3,3"
            className="animate-pulse"
          />
          <ellipse
            cx="-14"
            cy="0"
            rx={size * 0.5}
            ry={size * 0.25}
            fill="#d97706"
            opacity="0.25"
          />
        </g>
      )}

      {/* Radar Navigation Beacon Wave */}
      {isAnimated && (
        <circle
          cx="0"
          cy="0"
          r={size * 0.8}
          fill="none"
          stroke="#fbbf24"
          strokeWidth="1"
          opacity="0.3"
          className="animate-ping"
        />
      )}

      {/* Main Vessel Group rotated to current heading */}
      <g transform={`rotate(${angle})`}>
        {/* Glow Shadow */}
        <ellipse
          cx="0"
          cy="0"
          rx={size * 0.55}
          ry={size * 0.32}
          fill="#b45309"
          opacity="0.35"
          filter="blur(3px)"
        />

        {/* Vessel Hull (جسم السفينة الأنيق - Bronze/Amber aerodynamic yacht/ship) */}
        <path
          d={`M ${size * 0.52} 0 
             Q ${size * 0.2} ${size * 0.26}, -${size * 0.42} ${size * 0.24} 
             Q -${size * 0.52} ${size * 0.12}, -${size * 0.48} 0 
             Q -${size * 0.52} -${size * 0.12}, -${size * 0.42} -${size * 0.24} 
             Q ${size * 0.2} -${size * 0.26}, ${size * 0.52} 0 Z`}
          fill="#78350f"
          stroke="#f59e0b"
          strokeWidth="2"
        />

        {/* Deck Inlay */}
        <path
          d={`M ${size * 0.36} 0 
             Q ${size * 0.1} ${size * 0.18}, -${size * 0.3} ${size * 0.16} 
             Q -${size * 0.38} 0, -${size * 0.3} -${size * 0.16} 
             Q ${size * 0.1} -${size * 0.18}, ${size * 0.36} 0 Z`}
          fill="#92400e"
          stroke="#d97706"
          strokeWidth="1"
        />

        {/* Sail / Bridge (شراع الملاحة الذكي والبوصلة) */}
        <path
          d={`M ${size * 0.1} 0 
             L -${size * 0.22} -${size * 0.28} 
             L -${size * 0.12} 0 
             L -${size * 0.22} ${size * 0.28} Z`}
          fill="#fef3c7"
          stroke="#fbbf24"
          strokeWidth="1.2"
        />

        {/* Forward Compass Mast / Navigator Point */}
        <polygon
          points={`${size * 0.58},0 ${size * 0.32},-${size * 0.09} ${size * 0.38},0 ${size * 0.32},${size * 0.09}`}
          fill="#fbbf24"
        />

        {/* Core Nav Light / Lantern */}
        <circle cx="0" cy="0" r={size * 0.1} fill="#fbbf24" stroke="#ffffff" strokeWidth="1" />
      </g>

      {/* Optional Caption/District Tag */}
      {label && (
        <g transform={`translate(0, ${size * 0.65 + 4})`}>
          <rect
            x={-(label.length * 4.5 + 8)}
            y="-8"
            width={label.length * 9 + 16}
            height="16"
            rx="4"
            fill="#1c1917"
            stroke="#b45309"
            strokeWidth="1"
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fill="#fef3c7"
            fontSize="9"
            fontWeight="bold"
            fontFamily="Cairo, sans-serif"
          >
            {label}
          </text>
        </g>
      )}
    </g>
  );
};

/**
 * Standalone Icon Version for HTML Cards and Buttons
 */
export const ShipIcon: React.FC<{ className?: string; size?: number }> = ({
  className = 'w-5 h-5 text-amber-400',
  size = 22
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Ship Hull */}
      <path d="M2 17c1.5 0 2.5 1 4 1s2.5-1 4-1 2.5 1 4 1 2.5-1 4-1 2.5 1 4 1" stroke="#fbbf24" />
      <path d="M4 17l1.5-6h13l1.5 6" stroke="#d97706" fill="#78350f" fillOpacity="0.3" />
      {/* Mast & Main Sail */}
      <line x1="12" y1="3" x2="12" y2="11" stroke="#fbbf24" strokeWidth="2" />
      <path d="M12 4l6 4-6 3z" fill="#f59e0b" fillOpacity="0.4" stroke="#fbbf24" />
      {/* Forward Jib Sail */}
      <path d="M12 6L7 9h5z" fill="#fef3c7" fillOpacity="0.3" stroke="#fde68a" />
    </svg>
  );
};
