type Props = { className?: string };

export default function KitchenSceneIllustration({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 900 480"
      role="img"
      aria-label="Cocina rústica chilena con productos frescos, ollas de cobre y pizarra"
      className={className}
    >
      <defs>
        <linearGradient id="counter" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#8b6a44" />
          <stop offset="1" stopColor="#6b4d2e" />
        </linearGradient>
        <linearGradient id="wall" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ede0c5" />
          <stop offset="1" stopColor="#dccba5" />
        </linearGradient>
        <linearGradient id="copper" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c97a3e" />
          <stop offset="1" stopColor="#8b4a22" />
        </linearGradient>
      </defs>

      {/* Wall */}
      <rect width="900" height="480" fill="url(#wall)" />

      {/* Wall planks */}
      <g stroke="#a8896a" strokeWidth="1" opacity="0.45">
        <line x1="0" y1="80" x2="900" y2="80" />
        <line x1="0" y1="160" x2="900" y2="160" />
        <line x1="0" y1="240" x2="900" y2="240" />
      </g>

      {/* Shelf */}
      <rect x="60" y="80" width="780" height="6" fill="#5a3a1f" />
      <rect x="60" y="86" width="780" height="2" fill="#3a2418" />

      {/* Chalkboard with fish drawing */}
      <g transform="translate(110 100)">
        <rect width="180" height="120" fill="#2d2416" stroke="#5a3a1f" strokeWidth="6" rx="2" />
        <g stroke="#f5f0e8" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.9">
          {/* fish */}
          <path d="M30 60 Q 70 30 110 60 Q 70 90 30 60 Z" />
          <path d="M110 60 L 145 40 L 145 80 Z" />
          <circle cx="50" cy="55" r="2" fill="#f5f0e8" />
          {/* gills */}
          <path d="M70 50 Q 75 60 70 70" />
          {/* scales */}
          <path d="M75 55 q 5 5 0 10" />
          <path d="M85 53 q 5 5 0 12" />
          <path d="M95 55 q 4 4 0 10" />
          {/* underline word */}
          <line x1="20" y1="100" x2="160" y2="100" opacity="0.5" />
        </g>
      </g>

      {/* Hanging copper pots from shelf */}
      <g transform="translate(360 86)">
        <line x1="20" y1="0" x2="20" y2="20" stroke="#3a2418" strokeWidth="1.2" />
        <ellipse cx="20" cy="55" rx="38" ry="8" fill="#3a2418" opacity="0.3" />
        <path d="M-20 20 Q -20 60 20 65 Q 60 60 60 20 Z" fill="url(#copper)" stroke="#5a2818" strokeWidth="1" />
        <path d="M-25 20 L 65 20" stroke="#5a2818" strokeWidth="2" />
        <path d="M-30 22 q -8 -2 -8 6 q 0 8 8 6" fill="none" stroke="#5a2818" strokeWidth="2" />
      </g>
      <g transform="translate(460 86)">
        <line x1="25" y1="0" x2="25" y2="30" stroke="#3a2418" strokeWidth="1.2" />
        <ellipse cx="25" cy="80" rx="32" ry="6" fill="#3a2418" opacity="0.3" />
        <path d="M-10 30 Q -10 75 25 80 Q 60 75 60 30 Z" fill="url(#copper)" stroke="#5a2818" strokeWidth="1" />
        <path d="M-15 30 L 65 30" stroke="#5a2818" strokeWidth="2" />
        <path d="M65 32 q 12 0 12 8 q 0 8 -12 8" fill="none" stroke="#5a2818" strokeWidth="2" />
      </g>
      <g transform="translate(560 86)">
        <line x1="22" y1="0" x2="22" y2="14" stroke="#3a2418" strokeWidth="1.2" />
        <ellipse cx="22" cy="40" rx="28" ry="5" fill="#3a2418" opacity="0.3" />
        <path d="M-6 14 Q -6 38 22 42 Q 50 38 50 14 Z" fill="url(#copper)" stroke="#5a2818" strokeWidth="1" />
        <path d="M-10 14 L 54 14" stroke="#5a2818" strokeWidth="2" />
      </g>
      {/* Hanging garlic & herbs */}
      <g transform="translate(680 86)" stroke="#5a3a1f" strokeWidth="1" fill="none">
        <line x1="0" y1="0" x2="0" y2="40" />
        <ellipse cx="0" cy="48" rx="10" ry="14" fill="#efe3c9" stroke="#8b5e3c" />
        <path d="M-5 40 q 5 -8 10 0" />
        <ellipse cx="-12" cy="58" rx="8" ry="12" fill="#efe3c9" stroke="#8b5e3c" />
        <ellipse cx="12" cy="58" rx="8" ry="12" fill="#efe3c9" stroke="#8b5e3c" />
      </g>
      <g transform="translate(750 86)" stroke="#4a6a35" strokeWidth="1" fill="none">
        <line x1="0" y1="0" x2="0" y2="20" stroke="#5a3a1f" />
        <path d="M0 20 q -10 30 -5 60" />
        <path d="M0 20 q 10 30 5 60" />
        <path d="M-2 30 l -8 6 M -3 45 l -10 6 M -4 60 l -10 6" />
        <path d="M2 30 l 8 6 M 3 45 l 10 6 M 4 60 l 10 6" />
      </g>

      {/* Counter */}
      <rect x="0" y="320" width="900" height="160" fill="url(#counter)" />
      <rect x="0" y="316" width="900" height="6" fill="#3a2418" />

      {/* Cutting board */}
      <g transform="translate(80 320)">
        <rect x="0" y="0" width="220" height="14" fill="#5a3a1f" />
        <rect x="0" y="-12" width="220" height="14" fill="#a87148" stroke="#5a3a1f" strokeWidth="1" />
        {/* tomatoes */}
        <circle cx="40" cy="-22" r="14" fill="#b6492a" stroke="#5a2818" strokeWidth="1" />
        <path d="M30 -32 q 10 -4 20 0 q -3 6 -10 6 q -7 0 -10 -6" fill="#4a6a35" />
        <circle cx="80" cy="-20" r="13" fill="#b6492a" stroke="#5a2818" strokeWidth="1" />
        <path d="M71 -29 q 9 -4 18 0 q -3 5 -9 5 q -6 0 -9 -5" fill="#4a6a35" />
        {/* herbs */}
        <g stroke="#4a6a35" strokeWidth="1" fill="none">
          <path d="M130 -10 q 5 -20 20 -25" />
          <path d="M140 -12 q 5 -22 25 -28" />
          <path d="M150 -10 q 8 -22 30 -28" />
        </g>
      </g>

      {/* Bread loaf */}
      <g transform="translate(360 320)">
        <ellipse cx="55" cy="-10" rx="60" ry="22" fill="#c08a4f" stroke="#5a2818" strokeWidth="1" />
        <g stroke="#5a2818" strokeWidth="1" opacity="0.6">
          <path d="M10 -10 q 45 -10 90 0" />
          <path d="M15 -2 q 40 -8 80 0" />
        </g>
      </g>

      {/* Bowl with corn */}
      <g transform="translate(540 310)">
        <ellipse cx="0" cy="20" rx="70" ry="14" fill="#3a2418" opacity="0.3" />
        <path d="M-65 0 Q -65 25 0 30 Q 65 25 65 0 Z" fill="#efe3c9" stroke="#5a3a1f" strokeWidth="1" />
        {/* corn cobs */}
        <g>
          <ellipse cx="-30" cy="-2" rx="22" ry="9" fill="#e8b75a" stroke="#5a3a1f" strokeWidth="0.8" />
          <ellipse cx="10" cy="-4" rx="22" ry="9" fill="#e8b75a" stroke="#5a3a1f" strokeWidth="0.8" />
          <ellipse cx="40" cy="-2" rx="20" ry="8" fill="#e8b75a" stroke="#5a3a1f" strokeWidth="0.8" />
          <g stroke="#5a3a1f" strokeWidth="0.5" opacity="0.7">
            {[-44, -36, -28, -20, -8, 0, 8, 16, 30, 38, 46].map((x, i) => (
              <line key={i} x1={x} y1={-9} x2={x} y2={5} />
            ))}
          </g>
        </g>
      </g>

      {/* Pisco bottle */}
      <g transform="translate(720 240)">
        <rect x="-9" y="0" width="18" height="20" fill="#3a2418" />
        <path d="M-9 20 L-9 35 Q -22 50 -22 70 L-22 110 L22 110 L22 70 Q 22 50 9 35 L 9 20 Z" fill="#a87148" stroke="#5a3320" strokeWidth="1" />
        <rect x="-22" y="60" width="44" height="22" fill="#efe3c9" />
        <text x="0" y="76" textAnchor="middle" fontSize="9" fill="#5a3320" fontFamily="serif">Pisco</text>
      </g>

      {/* Vignette */}
      <radialGradient id="vigK" cx="50%" cy="55%" r="75%">
        <stop offset="60%" stopColor="#000" stopOpacity="0" />
        <stop offset="100%" stopColor="#000" stopOpacity="0.2" />
      </radialGradient>
      <rect width="900" height="480" fill="url(#vigK)" />
    </svg>
  );
}
