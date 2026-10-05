export interface Contact {
  name: string;
  phone: string;
}

export const SITE_CONFIG = {
  tillNumber: '3171352',
  tillName: 'JOAN GATHONI NJAU',
  mainContacts: [
    { name: 'Rev. Philip Arunga (Jomba)', phone: '(+254) 722 591549' },
    { name: 'East Assembly Church', phone: '(+254) 721 467 846' },
  ] satisfies Contact[],
  merchContact: { name: 'Samuel Simiyu', phone: '+254 741 366218' } satisfies Contact,
  campFeeTotal: 12900,
  campVenue: 'Mombasa',
  campStart: '2026-12-27',
  campEnd: '2027-01-02',
} as const;

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^0-9+]/g, '')}`;
}
