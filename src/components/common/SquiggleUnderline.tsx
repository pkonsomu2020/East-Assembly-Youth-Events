export function SquiggleUnderline() {
  return (
    <svg
      className="squiggle-underline"
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 C 14 2, 26 2, 38 8 S 62 14, 74 8 S 98 2, 110 8"
        fill="none"
        stroke="var(--flame)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
