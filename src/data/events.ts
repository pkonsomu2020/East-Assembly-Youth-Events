import type { EventDef } from '../types/domain';

export const EVENTS: EventDef[] = [
  {
    slug: 'youth-dinner',
    name: 'Youth Dinner',
    dateLabel: '10th October 2026',
    dateISO: '2026-10-10',
    blurb: 'An evening of great food, fun, and fellowship as a youth family.',
    requiresPayment: true,
  },
  {
    slug: 'youth-retreat',
    name: 'Youth Retreat / Hiking',
    dateLabel: 'Date to be communicated',
    dateISO: null,
    blurb:
      'A weekend away to reconnect with God and each other. Details on the date coming soon — reserve your spot early.',
    requiresPayment: true,
  },
  {
    slug: 'worship-experience',
    name: 'Youth Worship Experience',
    subtitle: 'Neema Yako — by Ezesha Worship',
    dateLabel: '16th August 2026',
    dateISO: '2026-08-16',
    venue: 'KAG Buruburu, Youth Sanctuary',
    time: '2:00 PM – 5:00 PM',
    blurb:
      '"Let us then approach God\'s throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need." — Hebrews 4:16',
    requiresPayment: false,
    poster: '/assets/posters/worship-experience.jpg',
  },
  {
    slug: 'chill-out',
    name: 'Chill Out',
    dateLabel: 'Date to be communicated',
    dateISO: null,
    blurb: 'A relaxed hangout for the youth to connect outside the usual program.',
    requiresPayment: false,
  },
];
