type Props = { className?: string };

export default function PergolaIllustration({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 600 280"
      role="img"
      aria-label="Ilustración de una pérgola con enredaderas"
      className={className}
      fill="none"
      stroke="#5a4630"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Pergola posts */}
      <line x1="80" y1="60" x2="80" y2="260" />
      <line x1="520" y1="60" x2="520" y2="260" />
      {/* Top arch */}
      <path d="M60 70 Q300 -10 540 70" />
      <path d="M70 80 Q300 10 530 80" opacity="0.55" />
      {/* Cross beams */}
      <line x1="55" y1="70" x2="105" y2="70" />
      <line x1="495" y1="70" x2="545" y2="70" />
      {/* Ground line */}
      <line x1="40" y1="262" x2="560" y2="262" opacity="0.5" />

      {/* Vines along arch */}
      <path d="M90 75 C 110 60, 130 90, 150 70 S 190 60, 215 75 S 270 50, 300 60 S 380 50, 420 70 S 480 60, 510 75" />
      <path
        d="M120 65 C 140 50, 165 80, 195 65 S 250 45, 295 55 S 360 45, 410 60 S 470 50, 500 65"
        opacity="0.45"
      />

      {/* Leaves clusters scattered along the arch */}
      <g stroke="#5a4630" fill="none">
        {/* leaf set 1 */}
        <path d="M115 74 q -7 -10 -2 -18 q 10 4 8 16 z" />
        <path d="M118 74 q 9 -6 18 -3 q -3 12 -16 9 z" />
        {/* leaf set 2 */}
        <path d="M170 70 q -8 -10 -2 -19 q 11 4 9 17 z" />
        <path d="M174 70 q 9 -7 19 -4 q -3 12 -17 10 z" />
        {/* leaf set 3 */}
        <path d="M235 60 q -7 -11 -1 -19 q 10 4 8 17 z" />
        <path d="M240 60 q 9 -6 18 -3 q -3 12 -17 10 z" />
        {/* leaf set 4 */}
        <path d="M300 55 q -8 -11 -2 -20 q 11 4 9 18 z" />
        <path d="M304 55 q 10 -7 19 -3 q -3 12 -17 10 z" />
        {/* leaf set 5 */}
        <path d="M365 60 q -8 -10 -2 -19 q 11 4 9 17 z" />
        <path d="M369 60 q 9 -6 19 -3 q -3 12 -17 10 z" />
        {/* leaf set 6 */}
        <path d="M430 70 q -7 -10 -1 -19 q 10 4 8 17 z" />
        <path d="M434 70 q 9 -6 18 -3 q -3 12 -16 9 z" />
        {/* leaf set 7 */}
        <path d="M485 76 q -7 -10 -1 -18 q 10 4 8 16 z" />
      </g>

      {/* Hanging vines down each post */}
      <path d="M80 70 C 70 110, 92 140, 78 175 S 90 230, 80 258" />
      <path
        d="M85 78 C 95 112, 75 145, 88 180 S 78 230, 86 258"
        opacity="0.5"
      />
      <path d="M520 70 C 530 110, 510 140, 522 175 S 510 230, 520 258" />
      <path
        d="M515 78 C 505 112, 525 145, 512 180 S 522 230, 514 258"
        opacity="0.5"
      />

      {/* Hanging cluster grapes/leaves on left */}
      <g>
        <path d="M76 110 q -8 -8 -1 -16 q 9 3 7 14 z" />
        <path d="M82 130 q 9 -4 16 1 q -3 10 -15 6 z" />
        <path d="M74 165 q -9 -7 -2 -16 q 10 3 8 14 z" />
        <path d="M82 200 q 9 -4 16 1 q -3 10 -15 6 z" />
        <path d="M76 235 q -8 -7 -1 -15 q 9 3 7 13 z" />
      </g>
      {/* Hanging cluster on right */}
      <g>
        <path d="M524 110 q 8 -8 1 -16 q -9 3 -7 14 z" />
        <path d="M518 130 q -9 -4 -16 1 q 3 10 15 6 z" />
        <path d="M526 165 q 9 -7 2 -16 q -10 3 -8 14 z" />
        <path d="M518 200 q -9 -4 -16 1 q 3 10 15 6 z" />
        <path d="M524 235 q 8 -7 1 -15 q -9 3 -7 13 z" />
      </g>

      {/* Small flower hints */}
      <g stroke="#8b5e3c">
        <circle cx="200" cy="55" r="2" />
        <circle cx="340" cy="48" r="2" />
        <circle cx="450" cy="55" r="2" />
        <circle cx="260" cy="50" r="1.5" />
        <circle cx="395" cy="52" r="1.5" />
      </g>
    </svg>
  );
}
