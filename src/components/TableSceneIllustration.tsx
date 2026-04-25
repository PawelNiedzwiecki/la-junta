type Props = { className?: string };

export default function TableSceneIllustration({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 900 480"
      role="img"
      aria-label="Mesa chilena tradicional con vino, empanadas y mantel bordado"
      className={className}
    >
      <defs>
        <linearGradient id="cloth" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e7d9bf" />
          <stop offset="1" stopColor="#d6c39e" />
        </linearGradient>
        <linearGradient id="wood" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#7a5a39" />
          <stop offset="1" stopColor="#5b3f23" />
        </linearGradient>
        <pattern
          id="floral"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <g stroke="#8b5e3c" strokeWidth="1" fill="none" opacity="0.55">
            <circle cx="15" cy="15" r="3" />
            <path d="M15 8 q4 3 0 7 q-4 -4 0 -7 z" />
            <path d="M22 15 q-3 4 -7 0 q4 -4 7 0 z" />
            <path d="M15 22 q-4 -3 0 -7 q4 4 0 7 z" />
            <path d="M8 15 q3 -4 7 0 q-4 4 -7 0 z" />
            <circle cx="45" cy="42" r="2.5" />
            <path d="M45 35 q3 3 0 6" />
            <path d="M51 42 q-3 3 -6 0" />
          </g>
        </pattern>
      </defs>

      {/* Background room */}
      <rect width="900" height="480" fill="#efe3c9" />
      <rect x="0" y="0" width="900" height="180" fill="#e7d6b3" opacity="0.6" />
      {/* Window hint */}
      <rect x="60" y="40" width="200" height="120" fill="#f3e8cd" opacity="0.7" />
      <line x1="160" y1="40" x2="160" y2="160" stroke="#8b5e3c" strokeWidth="1" opacity="0.5" />
      <line x1="60" y1="100" x2="260" y2="100" stroke="#8b5e3c" strokeWidth="1" opacity="0.5" />
      {/* Hanging frames */}
      <rect x="640" y="50" width="80" height="60" fill="none" stroke="#8b5e3c" strokeWidth="1.5" opacity="0.7" />
      <rect x="755" y="70" width="80" height="60" fill="none" stroke="#8b5e3c" strokeWidth="1.5" opacity="0.7" />

      {/* Table */}
      <rect x="0" y="200" width="900" height="220" fill="url(#wood)" />
      {/* Tablecloth draped */}
      <path
        d="M0 220 Q 120 210 250 230 Q 400 240 560 225 Q 700 215 900 230 L900 380 Q 750 400 600 385 Q 420 370 250 390 Q 110 400 0 380 Z"
        fill="url(#cloth)"
      />
      <rect
        x="0"
        y="220"
        width="900"
        height="170"
        fill="url(#floral)"
        opacity="0.45"
      />
      {/* Cloth border lines */}
      <path
        d="M0 232 Q 200 222 450 235 T 900 232"
        stroke="#8b5e3c"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M0 380 Q 200 392 450 380 T 900 380"
        stroke="#8b5e3c"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />

      {/* Wine bottle */}
      <g transform="translate(120 215)">
        <rect x="-9" y="-90" width="18" height="30" fill="#3a2418" />
        <path d="M-9 -60 L-9 -45 Q -22 -30 -22 -10 L-22 60 L22 60 L22 -10 Q 22 -30 9 -45 L 9 -60 Z" fill="#5a2818" />
        <rect x="-22" y="0" width="44" height="22" fill="#e7d9bf" />
        <text x="0" y="15" textAnchor="middle" fontSize="9" fill="#5a3320" fontFamily="serif">Vino</text>
      </g>
      {/* Wine glass */}
      <g transform="translate(190 235)" stroke="#5a3320" strokeWidth="1.2" fill="none">
        <path d="M-18 -25 Q -18 10 0 14 Q 18 10 18 -25 Z" fill="#7a2418" fillOpacity="0.5" />
        <line x1="0" y1="14" x2="0" y2="50" />
        <ellipse cx="0" cy="52" rx="14" ry="3" fill="#5a3320" />
      </g>

      {/* Empanadas plate */}
      <g transform="translate(330 280)">
        <ellipse cx="0" cy="20" rx="80" ry="14" fill="#3a2418" opacity="0.25" />
        <ellipse cx="0" cy="15" rx="80" ry="18" fill="#f1e3c4" stroke="#8b5e3c" strokeWidth="1" />
        {/* Empanadas */}
        <g fill="#c08a4f" stroke="#5a3320" strokeWidth="1">
          <path d="M-50 5 q15 -22 30 0 q -3 10 -15 12 q -12 -2 -15 -12 z" />
          <path d="M-15 0 q15 -22 30 0 q -3 10 -15 12 q -12 -2 -15 -12 z" />
          <path d="M20 5 q15 -22 30 0 q -3 10 -15 12 q -12 -2 -15 -12 z" />
        </g>
        {/* Crimped edge details */}
        <g stroke="#5a3320" strokeWidth="0.8" fill="none">
          <path d="M-50 4 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3" />
          <path d="M-15 -1 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3" />
          <path d="M20 4 l3 -3 l3 3 l3 -3 l3 3 l3 -3 l3 3" />
        </g>
      </g>

      {/* Stew pot */}
      <g transform="translate(560 280)">
        <ellipse cx="0" cy="40" rx="70" ry="10" fill="#3a2418" opacity="0.3" />
        <path d="M-58 -10 Q -58 30 0 35 Q 58 30 58 -10 Z" fill="#3a2418" />
        <ellipse cx="0" cy="-10" rx="58" ry="14" fill="#7a2418" />
        <ellipse cx="0" cy="-13" rx="50" ry="9" fill="#a04522" />
        {/* steam */}
        <g stroke="#8b5e3c" strokeWidth="1" fill="none" opacity="0.5">
          <path d="M-20 -25 q -5 -10 0 -20 q 5 -10 0 -18" />
          <path d="M0 -28 q -5 -10 0 -20 q 5 -10 0 -18" />
          <path d="M20 -25 q -5 -10 0 -20 q 5 -10 0 -18" />
        </g>
        {/* handles */}
        <path d="M-58 -5 q -10 0 -10 10" stroke="#3a2418" strokeWidth="3" fill="none" />
        <path d="M58 -5 q 10 0 10 10" stroke="#3a2418" strokeWidth="3" fill="none" />
      </g>

      {/* Bread basket */}
      <g transform="translate(740 290)">
        <ellipse cx="0" cy="20" rx="60" ry="10" fill="#3a2418" opacity="0.25" />
        <path d="M-55 5 Q 0 -5 55 5 L 50 25 Q 0 32 -50 25 Z" fill="#a87148" stroke="#5a3320" strokeWidth="1" />
        <g stroke="#5a3320" strokeWidth="0.8" opacity="0.6">
          <line x1="-45" y1="10" x2="-40" y2="22" />
          <line x1="-30" y1="6" x2="-25" y2="22" />
          <line x1="-15" y1="4" x2="-10" y2="22" />
          <line x1="0" y1="4" x2="5" y2="22" />
          <line x1="15" y1="4" x2="20" y2="22" />
          <line x1="30" y1="6" x2="35" y2="22" />
        </g>
        {/* breads */}
        <ellipse cx="-20" cy="0" rx="14" ry="6" fill="#d8a86c" stroke="#5a3320" strokeWidth="0.8" />
        <ellipse cx="10" cy="-2" rx="14" ry="6" fill="#d8a86c" stroke="#5a3320" strokeWidth="0.8" />
        <ellipse cx="35" cy="0" rx="11" ry="5" fill="#d8a86c" stroke="#5a3320" strokeWidth="0.8" />
      </g>

      {/* Cutlery hints */}
      <g stroke="#5a3320" strokeWidth="1.2" fill="none" opacity="0.7">
        <line x1="260" y1="320" x2="260" y2="360" />
        <line x1="265" y1="320" x2="265" y2="360" />
        <line x1="430" y1="345" x2="470" y2="345" />
        <path d="M430 340 q 0 -5 5 -5 q 5 0 5 5 z" />
      </g>

      {/* Subtle vignette */}
      <radialGradient id="vig" cx="50%" cy="55%" r="75%">
        <stop offset="60%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.18" />
      </radialGradient>
      <rect width="900" height="480" fill="url(#vig)" />
    </svg>
  );
}
