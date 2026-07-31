import type { GarmentIconId } from '../../types/domain';

// Camp Ignite flame logo image (flame graphic only, no text), used as a small
// "printed logo" mark on merchandise icons. Aspect ratio is 213:365.
const FLAME_ASPECT = 213 / 365;

function FlameTag({ x, y, w }: { x: number; y: number; w: number }) {
  const h = Math.round(w / FLAME_ASPECT);
  return <image href="/assets/camp-ignite-flame-icon.png" x={x} y={y} width={w} height={h} />;
}

function TshirtIcon() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M70 22 C82 12 118 12 130 22 L168 46 L150 74 L136 62 L136 182 L64 182 L64 62 L50 74 L32 46 Z"
        fill="#FFFFFF"
        stroke="#BFE3F5"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M84 24 Q100 40 116 24" fill="none" stroke="#BFE3F5" strokeWidth="3" strokeLinecap="round" />
      <FlameTag x={72} y={68} w={24} />
    </svg>
  );
}

function HoodieIcon() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M70 40 Q60 10 100 8 Q140 10 130 40" fill="#FFFFFF" stroke="#BFE3F5" strokeWidth="3" />
      <path
        d="M66 30 C80 18 120 18 134 30 L172 54 L154 82 L140 70 L140 185 L60 185 L60 70 L46 82 L28 54 Z"
        fill="#FFFFFF"
        stroke="#BFE3F5"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line x1="100" y1="35" x2="100" y2="185" stroke="#9AA5AD" strokeWidth="2.5" />
      <circle cx="100" cy="45" r="3.5" fill="#9AA5AD" />
      <path d="M72 145 Q100 158 128 145" fill="none" stroke="#BFE3F5" strokeWidth="2.5" />
      <FlameTag x={74} y={76} w={22} />
    </svg>
  );
}

function CapIcon() {
  return (
    <svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
      <path d="M40 95 Q55 42 100 42 Q145 42 160 95 Z" fill="#FFFFFF" stroke="#BFE3F5" strokeWidth="3" />
      <path
        d="M38 95 Q100 112 168 92 Q162 104 145 105 L58 105 Q42 104 38 95 Z"
        fill="#EAF6FD"
        stroke="#BFE3F5"
        strokeWidth="2"
      />
      <circle cx="100" cy="44" r="4" fill="#BFE3F5" />
      <FlameTag x={87} y={60} w={15} />
    </svg>
  );
}

function ToteIcon() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M72 68 Q72 25 100 25 Q128 25 128 68" fill="none" stroke="#BFE3F5" strokeWidth="6" strokeLinecap="round" />
      <rect x="45" y="68" width="110" height="105" rx="8" fill="#FFFFFF" stroke="#BFE3F5" strokeWidth="3" />
      <FlameTag x={63} y={92} w={22} />
    </svg>
  );
}

function PenIcon() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g transform="rotate(45 100 100)">
        <rect x="90" y="30" width="20" height="120" rx="6" fill="#FFFFFF" stroke="#BFE3F5" strokeWidth="3" />
        <polygon points="90,150 110,150 100,175" fill="#9AA5AD" />
        <rect x="90" y="30" width="20" height="18" rx="4" fill="#EAF6FD" />
      </g>
      <FlameTag x={86} y={90} w={13} />
    </svg>
  );
}

function SweatshirtIcon() {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M68 26 C80 14 120 14 132 26 L170 50 L150 78 L138 66 L138 184 L62 184 L62 66 L50 78 L30 50 Z"
        fill="#FFFFFF"
        stroke="#BFE3F5"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="80" y="18" width="40" height="10" rx="5" fill="#EAF6FD" stroke="#BFE3F5" strokeWidth="2" />
      <rect x="60" y="170" width="18" height="14" rx="3" fill="#EAF6FD" stroke="#BFE3F5" strokeWidth="2" />
      <rect x="122" y="170" width="18" height="14" rx="3" fill="#EAF6FD" stroke="#BFE3F5" strokeWidth="2" />
      <FlameTag x={74} y={72} w={24} />
    </svg>
  );
}

function SweatsuitIcon() {
  return (
    <svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M35 26 C45 16 75 16 85 26 L112 46 L98 68 L88 58 L88 150 L32 150 L32 58 L22 68 L8 46 Z"
        fill="#FFFFFF"
        stroke="#BFE3F5"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="48" y="18" width="24" height="8" rx="4" fill="#EAF6FD" stroke="#BFE3F5" strokeWidth="2" />
      <FlameTag x={46} y={64} w={16} />
      <rect x="150" y="30" width="60" height="16" rx="6" fill="#FFFFFF" stroke="#BFE3F5" strokeWidth="3" />
      <path
        d="M150 46 L146 178 L172 178 L180 96 L188 178 L214 178 L210 46 Z"
        fill="#FFFFFF"
        stroke="#BFE3F5"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <FlameTag x={158} y={96} w={14} />
    </svg>
  );
}

// Note: 'jersey' intentionally has no icon here, matching the original site
// (jersey cards render without a merch-icon-box).
export const GARMENT_ICONS: Partial<Record<GarmentIconId, () => React.JSX.Element>> = {
  tshirt: TshirtIcon,
  hoodie: HoodieIcon,
  cap: CapIcon,
  tote: ToteIcon,
  pen: PenIcon,
  sweatshirt: SweatshirtIcon,
  sweatsuit: SweatsuitIcon,
};
