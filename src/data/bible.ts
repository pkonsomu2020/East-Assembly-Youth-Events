// All 66 books of the Bible in canonical order with chapter counts and USFM codes
export interface BibleBook {
  name: string;
  usfm: string;  // USFM 3-letter code for YouVersion API (e.g. "GEN", "JHN")
  abbrev: string; // URL-safe name for fallback APIs (e.g. "genesis", "john")
  chapters: number;
  testament: 'OT' | 'NT';
}

export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament
  { name: 'Genesis',        usfm: 'GEN', abbrev: 'genesis',        chapters: 50, testament: 'OT' },
  { name: 'Exodus',         usfm: 'EXO', abbrev: 'exodus',         chapters: 40, testament: 'OT' },
  { name: 'Leviticus',      usfm: 'LEV', abbrev: 'leviticus',      chapters: 27, testament: 'OT' },
  { name: 'Numbers',        usfm: 'NUM', abbrev: 'numbers',        chapters: 36, testament: 'OT' },
  { name: 'Deuteronomy',    usfm: 'DEU', abbrev: 'deuteronomy',    chapters: 34, testament: 'OT' },
  { name: 'Joshua',         usfm: 'JOS', abbrev: 'joshua',         chapters: 24, testament: 'OT' },
  { name: 'Judges',         usfm: 'JDG', abbrev: 'judges',         chapters: 21, testament: 'OT' },
  { name: 'Ruth',           usfm: 'RUT', abbrev: 'ruth',           chapters: 4,  testament: 'OT' },
  { name: '1 Samuel',       usfm: '1SA', abbrev: '1+samuel',       chapters: 31, testament: 'OT' },
  { name: '2 Samuel',       usfm: '2SA', abbrev: '2+samuel',       chapters: 24, testament: 'OT' },
  { name: '1 Kings',        usfm: '1KI', abbrev: '1+kings',        chapters: 22, testament: 'OT' },
  { name: '2 Kings',        usfm: '2KI', abbrev: '2+kings',        chapters: 25, testament: 'OT' },
  { name: '1 Chronicles',   usfm: '1CH', abbrev: '1+chronicles',   chapters: 29, testament: 'OT' },
  { name: '2 Chronicles',   usfm: '2CH', abbrev: '2+chronicles',   chapters: 36, testament: 'OT' },
  { name: 'Ezra',           usfm: 'EZR', abbrev: 'ezra',           chapters: 10, testament: 'OT' },
  { name: 'Nehemiah',       usfm: 'NEH', abbrev: 'nehemiah',       chapters: 13, testament: 'OT' },
  { name: 'Esther',         usfm: 'EST', abbrev: 'esther',         chapters: 10, testament: 'OT' },
  { name: 'Job',            usfm: 'JOB', abbrev: 'job',            chapters: 42, testament: 'OT' },
  { name: 'Psalms',         usfm: 'PSA', abbrev: 'psalms',         chapters: 150, testament: 'OT' },
  { name: 'Proverbs',       usfm: 'PRO', abbrev: 'proverbs',       chapters: 31, testament: 'OT' },
  { name: 'Ecclesiastes',   usfm: 'ECC', abbrev: 'ecclesiastes',   chapters: 12, testament: 'OT' },
  { name: 'Song of Solomon',usfm: 'SNG', abbrev: 'song+of+solomon',chapters: 8,  testament: 'OT' },
  { name: 'Isaiah',         usfm: 'ISA', abbrev: 'isaiah',         chapters: 66, testament: 'OT' },
  { name: 'Jeremiah',       usfm: 'JER', abbrev: 'jeremiah',       chapters: 52, testament: 'OT' },
  { name: 'Lamentations',   usfm: 'LAM', abbrev: 'lamentations',   chapters: 5,  testament: 'OT' },
  { name: 'Ezekiel',        usfm: 'EZK', abbrev: 'ezekiel',        chapters: 48, testament: 'OT' },
  { name: 'Daniel',         usfm: 'DAN', abbrev: 'daniel',         chapters: 12, testament: 'OT' },
  { name: 'Hosea',          usfm: 'HOS', abbrev: 'hosea',          chapters: 14, testament: 'OT' },
  { name: 'Joel',           usfm: 'JOL', abbrev: 'joel',           chapters: 3,  testament: 'OT' },
  { name: 'Amos',           usfm: 'AMO', abbrev: 'amos',           chapters: 9,  testament: 'OT' },
  { name: 'Obadiah',        usfm: 'OBA', abbrev: 'obadiah',        chapters: 1,  testament: 'OT' },
  { name: 'Jonah',          usfm: 'JON', abbrev: 'jonah',          chapters: 4,  testament: 'OT' },
  { name: 'Micah',          usfm: 'MIC', abbrev: 'micah',          chapters: 7,  testament: 'OT' },
  { name: 'Nahum',          usfm: 'NAM', abbrev: 'nahum',          chapters: 3,  testament: 'OT' },
  { name: 'Habakkuk',       usfm: 'HAB', abbrev: 'habakkuk',       chapters: 3,  testament: 'OT' },
  { name: 'Zephaniah',      usfm: 'ZEP', abbrev: 'zephaniah',      chapters: 3,  testament: 'OT' },
  { name: 'Haggai',         usfm: 'HAG', abbrev: 'haggai',         chapters: 2,  testament: 'OT' },
  { name: 'Zechariah',      usfm: 'ZEC', abbrev: 'zechariah',      chapters: 14, testament: 'OT' },
  { name: 'Malachi',        usfm: 'MAL', abbrev: 'malachi',        chapters: 4,  testament: 'OT' },
  // New Testament
  { name: 'Matthew',        usfm: 'MAT', abbrev: 'matthew',        chapters: 28, testament: 'NT' },
  { name: 'Mark',           usfm: 'MRK', abbrev: 'mark',           chapters: 16, testament: 'NT' },
  { name: 'Luke',           usfm: 'LUK', abbrev: 'luke',           chapters: 24, testament: 'NT' },
  { name: 'John',           usfm: 'JHN', abbrev: 'john',           chapters: 21, testament: 'NT' },
  { name: 'Acts',           usfm: 'ACT', abbrev: 'acts',           chapters: 28, testament: 'NT' },
  { name: 'Romans',         usfm: 'ROM', abbrev: 'romans',         chapters: 16, testament: 'NT' },
  { name: '1 Corinthians',  usfm: '1CO', abbrev: '1+corinthians',  chapters: 16, testament: 'NT' },
  { name: '2 Corinthians',  usfm: '2CO', abbrev: '2+corinthians',  chapters: 13, testament: 'NT' },
  { name: 'Galatians',      usfm: 'GAL', abbrev: 'galatians',      chapters: 6,  testament: 'NT' },
  { name: 'Ephesians',      usfm: 'EPH', abbrev: 'ephesians',      chapters: 6,  testament: 'NT' },
  { name: 'Philippians',    usfm: 'PHP', abbrev: 'philippians',    chapters: 4,  testament: 'NT' },
  { name: 'Colossians',     usfm: 'COL', abbrev: 'colossians',     chapters: 4,  testament: 'NT' },
  { name: '1 Thessalonians',usfm: '1TH', abbrev: '1+thessalonians',chapters: 5,  testament: 'NT' },
  { name: '2 Thessalonians',usfm: '2TH', abbrev: '2+thessalonians',chapters: 3,  testament: 'NT' },
  { name: '1 Timothy',      usfm: '1TI', abbrev: '1+timothy',      chapters: 6,  testament: 'NT' },
  { name: '2 Timothy',      usfm: '2TI', abbrev: '2+timothy',      chapters: 4,  testament: 'NT' },
  { name: 'Titus',          usfm: 'TIT', abbrev: 'titus',          chapters: 3,  testament: 'NT' },
  { name: 'Philemon',       usfm: 'PHM', abbrev: 'philemon',       chapters: 1,  testament: 'NT' },
  { name: 'Hebrews',        usfm: 'HEB', abbrev: 'hebrews',        chapters: 13, testament: 'NT' },
  { name: 'James',          usfm: 'JAS', abbrev: 'james',          chapters: 5,  testament: 'NT' },
  { name: '1 Peter',        usfm: '1PE', abbrev: '1+peter',        chapters: 5,  testament: 'NT' },
  { name: '2 Peter',        usfm: '2PE', abbrev: '2+peter',        chapters: 3,  testament: 'NT' },
  { name: '1 John',         usfm: '1JN', abbrev: '1+john',         chapters: 5,  testament: 'NT' },
  { name: '2 John',         usfm: '2JN', abbrev: '2+john',         chapters: 1,  testament: 'NT' },
  { name: '3 John',         usfm: '3JN', abbrev: '3+john',         chapters: 1,  testament: 'NT' },
  { name: 'Jude',           usfm: 'JUD', abbrev: 'jude',           chapters: 1,  testament: 'NT' },
  { name: 'Revelation',     usfm: 'REV', abbrev: 'revelation',     chapters: 22, testament: 'NT' },
];

// Curated encouraging verses shown on homepage & Bible page
export const DAILY_VERSES = [
  { ref: 'Jeremiah 29:11', text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."' },
  { ref: 'Philippians 4:13', text: 'I can do all this through him who gives me strength.' },
  { ref: 'Romans 8:28', text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.' },
  { ref: 'Isaiah 41:10', text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.' },
  { ref: 'Proverbs 3:5-6', text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.' },
  { ref: 'Psalm 23:1', text: 'The Lord is my shepherd, I lack nothing.' },
  { ref: 'John 3:16', text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
  { ref: 'Matthew 6:33', text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.' },
  { ref: 'Colossians 3:23', text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.' },
  { ref: 'Psalm 46:1', text: 'God is our refuge and strength, an ever-present help in trouble.' },
  { ref: 'Romans 12:2', text: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.' },
  { ref: '2 Timothy 1:7', text: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.' },
  { ref: 'Hebrews 11:1', text: 'Now faith is confidence in what we hope for and assurance about what we do not see.' },
  { ref: 'Psalm 119:105', text: 'Your word is a lamp for my feet, a light on my path.' },
  { ref: 'Galatians 2:20', text: 'I have been crucified with Christ and I no longer live, but Christ lives in me.' },
  { ref: '1 Corinthians 13:13', text: 'And now these three remain: faith, hope and love. But the greatest of these is love.' },
  { ref: 'Joshua 1:9', text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.' },
  { ref: 'Psalm 27:1', text: 'The Lord is my light and my salvation: whom shall I fear? The Lord is the stronghold of my life, of whom shall I be afraid?' },
  { ref: 'Ephesians 2:8-9', text: 'For it is by grace you have been saved, through faith, and this is not from yourselves, it is the gift of God, not by works, so that no one can boast.' },
  { ref: 'Philippians 4:7', text: 'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.' },
];

/** Returns today's verse based on day-of-year, cycling through all verses */
export function getTodaysVerse() {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000,
  );
  return DAILY_VERSES[dayOfYear % DAILY_VERSES.length];
}
