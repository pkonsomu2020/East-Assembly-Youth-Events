export interface Contact {
  name: string;
  phone: string;
}

export const SITE_CONFIG = {
  tillNumber: '3171352',
  tillName: 'JOAN GATHONI NJAU',
  mainContacts: [
    { name: 'Mary Maina', phone: '+254 713 108746' },
    { name: 'Sheila Njau', phone: '+254 713 438856' },
    { name: 'Philip Arunga', phone: '+254 722 591549' },
  ] satisfies Contact[],
  merchContact: { name: 'Samuel Simiyu', phone: '+254 741 366218' } satisfies Contact,
  campFeeTotal: 12900,
  campVenue: 'Mombasa',
  campStart: '2026-12-27',
  campEnd: '2027-01-02',
} as const;

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s+/g, '')}`;
}
