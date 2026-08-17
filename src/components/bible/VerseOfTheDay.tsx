import { getTodaysVerse } from '../../data/bible';
import { MdFormatQuote } from 'react-icons/md';
import { Link } from 'react-router-dom';

export function VerseOfTheDay({ compact = false }: { compact?: boolean }) {
  const verse = getTodaysVerse();

  if (compact) {
    // Homepage snippet version
    return (
      <div className="votd-compact">
        <div className="votd-compact-icon">
          <MdFormatQuote size={28} style={{ color: 'var(--sky)', transform: 'scaleX(-1)' }} />
        </div>
        <div className="votd-compact-body">
          <p className="votd-compact-text">"{verse.text}"</p>
          <p className="votd-compact-ref">- {verse.ref}</p>
        </div>
        <Link to="/bible" className="btn btn-outline btn-sm votd-compact-cta">
          Open Bible &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="votd-full">
      <div className="votd-full-quote-mark">
        <MdFormatQuote size={40} style={{ color: 'var(--sky-pale)', transform: 'scaleX(-1)' }} />
      </div>
      <p className="votd-full-text">"{verse.text}"</p>
      <p className="votd-full-ref">- {verse.ref}</p>
    </div>
  );
}
