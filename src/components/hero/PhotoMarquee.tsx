const IMAGES = Array.from(
  { length: 12 },
  (_, i) => `/assets/gallery/gallery-${String(i + 1).padStart(2, '0')}.jpg`,
);

function MarqueeRow({ direction }: { direction: 'left' | 'right' }) {
  const cells = [...IMAGES, ...IMAGES];
  return (
    <div className={`marquee-row marquee-row-${direction}`}>
      {cells.map((src, i) => (
        <div className="marquee-cell" key={`${src}-${i}`}>
          <img src={src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export function PhotoMarquee() {
  return (
    <div className="marquee">
      <MarqueeRow direction="left" />
      <MarqueeRow direction="right" />
    </div>
  );
}
