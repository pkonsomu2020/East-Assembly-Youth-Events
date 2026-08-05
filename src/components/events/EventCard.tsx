import { useState } from 'react';
import type { EventDef } from '../../types/domain';
import { Modal } from '../common/Modal';
import { EventRegistrationForm } from './EventRegistrationForm';

export function EventCard({ event, onOpenPoster }: { event: EventDef; onOpenPoster: (src: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card card-fill card-media">
      {event.poster ? (
        <img
          src={event.poster}
          alt={`${event.name} poster`}
          className="card-banner"
          onClick={() => onOpenPoster(event.poster!)}
        />
      ) : (
        <div className={`card-banner-fallback ${event.requiresPayment ? 'event-card-cap-flame' : 'event-card-cap-free'}`}>
          {event.requiresPayment ? '🎟️' : '🎉'}
        </div>
      )}
      <div className="card-body">
        <span className="card-date">📅 {event.dateLabel}</span>
        <h3>{event.name}</h3>
        {event.subtitle && <p className="small-note" style={{ margin: '-8px 0 10px' }}>{event.subtitle}</p>}
        <p>{event.blurb}</p>
        {(event.venue || event.time) && (
          <p className="small-note">
            {event.venue && `📍 ${event.venue}`}
            {event.venue && event.time && ' · '}
            {event.time && `🕑 ${event.time}`}
          </p>
        )}
        <button
          type="button"
          className="btn btn-flame btn-sm card-fill-cta"
          onClick={() => setOpen(true)}
        >
          {event.requiresPayment ? 'Get Ticket' : 'Register My Spot'}
        </button>

        <Modal open={open} onClose={() => setOpen(false)} title={event.name}>
          <EventRegistrationForm event={event} />
        </Modal>
      </div>
    </div>
  );
}
