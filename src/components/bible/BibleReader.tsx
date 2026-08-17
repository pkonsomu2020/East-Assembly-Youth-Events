import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MdSearch,
  MdChevronLeft,
  MdChevronRight,
  MdBookmark,
  MdMenuBook,
} from 'react-icons/md';
import { BIBLE_BOOKS } from '../../data/bible';

// ── Translation definitions ───────────────────────────────────────────────────
export type TranslationKey =
  | 'NIV'
  | 'AMP'
  | 'ESV'
  | 'KJV'
  | 'NKJV'
  | 'NLT'
  | 'MSG'
  | 'GNT'
  | 'TLB'
  | 'SWAHILI'
  | 'NASB'
  | 'BSB';

interface TranslationDef {
  label: string;
  code: string;
  note?: string;
}

const TRANSLATIONS: Record<TranslationKey, TranslationDef> = {
  NIV: {
    label: 'NIV - New International Version (2011)',
    code: 'NIV2011',
  },
  AMP: {
    label: 'AMP - Amplified Bible (2015)',
    code: 'AMP',
  },
  ESV: {
    label: 'ESV - English Standard Version',
    code: 'ESV',
  },
  KJV: {
    label: 'KJV - King James Version (1769)',
    code: 'KJV',
  },
  NKJV: {
    label: 'NKJV - New King James Version',
    code: 'NKJV',
  },
  NLT: {
    label: 'NLT - New Living Translation',
    code: 'NLT',
  },
  MSG: {
    label: 'MSG - The Message (2002)',
    code: 'MSG',
  },
  GNT: {
    label: 'GNT - Good News Translation',
    code: 'GNT',
  },
  TLB: {
    label: 'TLB - The Living Bible (NLV Edition)',
    code: 'NLV',
    note: 'Showing New Life Version (NLV), the standard open simplified-language edition.',
  },
  SWAHILI: {
    label: 'Kiswahili - Swahili Union Version (Biblia Takatifu)',
    code: 'SUV',
  },
  NASB: {
    label: 'NASB - New American Standard Bible (2020)',
    code: 'NASB',
  },
  BSB: {
    label: 'BSB - Berean Standard Bible',
    code: 'BSB',
  },
};

const TRANSLATION_ORDER: TranslationKey[] = [
  'NIV',
  'AMP',
  'ESV',
  'KJV',
  'NKJV',
  'NLT',
  'MSG',
  'GNT',
  'TLB',
  'SWAHILI',
  'NASB',
  'BSB',
];

// ── Types ─────────────────────────────────────────────────────────────────────
export interface DisplayVerse {
  num: number;
  text: string;
}

interface BollsRawVerse {
  pk?: number;
  verse: number | string;
  text?: string;
  verse_text?: string;
}

// ── Verse Cleaner ─────────────────────────────────────────────────────────────
function cleanVerseText(raw: string): string {
  return raw
    // Remove Strong's concordance tags like <S>1161</S>
    .replace(/<S>.*?<\/S>/gi, '')
    // Remove any remaining HTML tags
    .replace(/<.*?>/g, '')
    // Clean up extra whitespace
    .replace(/\s+/g, ' ')
    .trim();
}

// ── Fetcher ───────────────────────────────────────────────────────────────────
async function fetchChapterVerses(
  code: string,
  bookNum: number,
  chapter: number,
): Promise<DisplayVerse[]> {
  const url = `https://bolls.life/get-text/${code}/${bookNum}/${chapter}/`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to load chapter (HTTP ${res.status})`);
  }

  const data: BollsRawVerse[] = await res.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No verses returned for this chapter.');
  }

  return data.map((v, idx) => {
    let vNum = idx + 1;
    if (typeof v.verse === 'number') {
      vNum = v.verse;
    } else if (typeof v.verse === 'string' && !isNaN(parseInt(v.verse, 10))) {
      vNum = parseInt(v.verse, 10);
    }

    let rawText = '';
    if (typeof v.text === 'string') {
      rawText = v.text;
    } else if (typeof v.verse_text === 'string') {
      rawText = v.verse_text;
    } else if (typeof v.verse === 'string') {
      rawText = v.verse;
    }

    return {
      num: vNum,
      text: cleanVerseText(rawText),
    };
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export function BibleReader() {
  const [bookIdx, setBookIdx]         = useState(43); // John (0-indexed)
  const [chapter, setChapter]         = useState(3);
  const [translation, setTranslation] = useState<TranslationKey>('NIV');
  const [verses, setVerses]           = useState<DisplayVerse[]>([]);
  const [refLabel, setRefLabel]       = useState('');
  const [fetching, setFetching]       = useState(false);
  const [error, setError]             = useState('');
  const [searchRef, setSearchRef]     = useState('');
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const verseRefs = useRef<Record<number, HTMLParagraphElement | null>>({});

  const book       = BIBLE_BOOKS[bookIdx] || BIBLE_BOOKS[0];
  const maxChapter = book.chapters;
  const def        = TRANSLATIONS[translation];

  // ── Loader ──
  const load = useCallback(
    async (
      bIdx: number,
      ch: number,
      trans: TranslationKey,
    ) => {
      setFetching(true);
      setError('');
      setVerses([]);

      const curBook = BIBLE_BOOKS[bIdx];
      const curDef  = TRANSLATIONS[trans];
      const bNumber = bIdx + 1;

      setRefLabel(`${curBook.name} ${ch}`);

      try {
        const loadedVerses = await fetchChapterVerses(curDef.code, bNumber, ch);
        setVerses(loadedVerses);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error loading chapter.';
        setError(message);
      } finally {
        setFetching(false);
      }
    },
    [],
  );

  useEffect(() => {
    load(bookIdx, chapter, translation);
  }, [bookIdx, chapter, translation, load]);

  // ── Navigation ──
  function prevChapter() {
    setHighlighted(null);
    if (chapter > 1) {
      setChapter((c) => c - 1);
    } else if (bookIdx > 0) {
      const prevBookIdx = bookIdx - 1;
      setBookIdx(prevBookIdx);
      setChapter(BIBLE_BOOKS[prevBookIdx].chapters);
    }
  }

  function nextChapter() {
    setHighlighted(null);
    if (chapter < maxChapter) {
      setChapter((c) => c + 1);
    } else if (bookIdx < BIBLE_BOOKS.length - 1) {
      setBookIdx((b) => b + 1);
      setChapter(1);
    }
  }

  // ── Search ──
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchRef.trim();
    if (!q) return;

    const match = q.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
    if (!match) {
      setError('Try a reference like "John 3", "Romans 8:28", or "Exodus 5"');
      return;
    }

    const bookName = match[1].trim().toLowerCase();
    const chNum    = parseInt(match[2], 10);
    const verseNum = match[3] ? parseInt(match[3], 10) : null;

    const found = BIBLE_BOOKS.findIndex(
      (b) =>
        b.name.toLowerCase().startsWith(bookName) ||
        b.usfm.toLowerCase() === bookName ||
        b.abbrev.replace(/\+/g, ' ').toLowerCase().startsWith(bookName),
    );

    if (found === -1) {
      setError(`Book "${match[1]}" not found. Try the full name (e.g. Genesis, Matthew).`);
      return;
    }

    setBookIdx(found);
    setChapter(Math.min(chNum, BIBLE_BOOKS[found].chapters));
    setHighlighted(verseNum);
    setError('');
    setSearchRef('');
  }

  // Scroll to highlighted verse when loaded
  useEffect(() => {
    if (highlighted && verseRefs.current[highlighted]) {
      setTimeout(
        () =>
          verseRefs.current[highlighted]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          }),
        300,
      );
    }
  }, [highlighted, verses]);

  return (
    <div className="bible-reader">
      {/* ── Controls ── */}
      <div className="bible-controls">
        <div className="bible-controls-group bible-controls-passage">
          {/* Book */}
          <select
            className="bible-select bible-select-book"
            value={bookIdx}
            onChange={(e) => {
              setBookIdx(Number(e.target.value));
              setChapter(1);
              setHighlighted(null);
            }}
            aria-label="Select book"
          >
            <optgroup label="Old Testament">
              {BIBLE_BOOKS.filter((b) => b.testament === 'OT').map((b) => (
                <option key={b.usfm} value={BIBLE_BOOKS.indexOf(b)}>
                  {b.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="New Testament">
              {BIBLE_BOOKS.filter((b) => b.testament === 'NT').map((b) => (
                <option key={b.usfm} value={BIBLE_BOOKS.indexOf(b)}>
                  {b.name}
                </option>
              ))}
            </optgroup>
          </select>

          {/* Chapter */}
          <select
            className="bible-select bible-select-chapter"
            value={chapter}
            onChange={(e) => {
              setChapter(Number(e.target.value));
              setHighlighted(null);
            }}
            aria-label="Select chapter"
          >
            {Array.from({ length: maxChapter }, (_, i) => i + 1).map((ch) => (
              <option key={ch} value={ch}>
                Ch. {ch}
              </option>
            ))}
          </select>
        </div>

        <div className="bible-controls-group bible-controls-version">
          {/* Translation */}
          <select
            className="bible-select bible-select-trans"
            value={translation}
            onChange={(e) => {
              setTranslation(e.target.value as TranslationKey);
            }}
            aria-label="Select translation"
          >
            {TRANSLATION_ORDER.map((key) => (
              <option key={key} value={key}>
                {TRANSLATIONS[key].label}
              </option>
            ))}
          </select>

          {/* Navigation Arrows */}
          <div className="bible-nav-arrows">
            <button
              type="button"
              className="bible-arrow"
              onClick={prevChapter}
              aria-label="Previous chapter"
              disabled={bookIdx === 0 && chapter === 1}
            >
              <MdChevronLeft size={20} />
            </button>
            <button
              type="button"
              className="bible-arrow"
              onClick={nextChapter}
              aria-label="Next chapter"
              disabled={bookIdx === BIBLE_BOOKS.length - 1 && chapter === maxChapter}
            >
              <MdChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Notice banner if applicable ── */}
      {def.note && (
        <div className="bible-translation-notice">{def.note}</div>
      )}

      {/* ── Search Bar ── */}
      <form className="bible-search-row" onSubmit={handleSearch}>
        <MdSearch size={18} style={{ color: 'var(--ink-soft)', flexShrink: 0 }} />
        <input
          className="bible-search-input"
          placeholder='Jump to reference: e.g. "John 3:16", "Romans 8", "Exodus 5"'
          value={searchRef}
          onChange={(e) => setSearchRef(e.target.value)}
        />
        <button type="submit" className="btn btn-primary btn-sm bible-search-btn">
          Go
        </button>
      </form>

      {/* ── Chapter Heading ── */}
      {refLabel && (
        <div className="bible-chapter-heading">
          <MdBookmark size={16} style={{ color: 'var(--flame)', flexShrink: 0 }} />
          <span>{refLabel}</span>
          <span className="bible-translation-tag">{translation}</span>
        </div>
      )}

      {/* ── Bible Verses Display ── */}
      <div className="bible-text-area">
        {fetching && (
          <div className="bible-loading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <MdMenuBook size={20} color="var(--sky)" />
            <span>Loading scripture...</span>
          </div>
        )}

        {error && <p className="bible-error">{error}</p>}

        {!fetching && !error && verses.length > 0 && (
          <div className="bible-verses-container">
            {verses.map((v) => (
              <p
                key={v.num}
                ref={(el) => {
                  verseRefs.current[v.num] = el;
                }}
                className={`bible-verse${highlighted === v.num ? ' highlighted' : ''}`}
              >
                <sup className="bible-verse-num">{v.num}</sup>
                <span className="bible-verse-body">{v.text}</span>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
