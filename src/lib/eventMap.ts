import type { EventDef } from '../types/domain';

/**
 * Resolves the Google Maps link for an event: an exact `mapUrl` if one was
 * set on the event, otherwise a maps search built from the venue name.
 * Shared between the site (event cards) and the day-of reminder emails
 * (api/send-event-reminders.ts) so both always point to the same place.
 */
export function getEventMapUrl(event: Pick<EventDef, 'mapUrl' | 'venue'>): string | null {
  if (event.mapUrl) return event.mapUrl;
  if (event.venue) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}`;
  return null;
}
