const TALL_INDEXES = new Set([0, 3, 6, 9]);

export function MasonryGrid({ images, onSelect }: { images: string[]; onSelect: (src: string) => void }) {
  return (
    <div className="masonry-grid">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Camp Ignite gallery"
          loading="lazy"
          className={TALL_INDEXES.has(i) ? 'masonry-span-2' : undefined}
          onClick={() => onSelect(src)}
        />
      ))}
    </div>
  );
}
