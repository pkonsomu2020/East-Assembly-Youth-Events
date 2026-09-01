import { useState } from 'react';
import { MdCalendarToday, MdLocationOn, MdAccessTime, MdConfirmationNumber, MdCelebration } from 'react-icons/md';
import type { EventDef } from '../../types/domain';
import { Modal } from '../common/Modal';
import { EventRegistrationGate } from './EventRegistrationGate';
import { getEventMapUrl } from '../../lib/eventMap';

export function EventCard({ event, onOpenPoster }: { event: EventDef; onOpenPoster: (src: string) => void }) {
  const [open, setOpen] = useState(false);
  const mapUrl = getEventMapUrl(event);

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
          {event.requiresPayment ? <MdConfirmationNumber size={36} /> : <MdCelebration size={36} />}
        </div>
      )}
      <div className="card-body">
        <span className="card-date"><MdCalendarToday size={14} /> {event.dateLabel}</span>
        <h3>{event.name}</h3>
        {event.subtitle && <p className="small-note" style={{ margin: '-8px 0 10px' }}>{event.subtitle}</p>}
        <p>{event.blurb}</p>
        {(event.venue || event.time) && (
          <p className="small-note event-meta-line">
            {event.venue && (
              mapUrl ? (
                <a href={mapUrl} target="_blank" rel="noreferrer" className="event-meta-item event-meta-link">
                  <MdLocationOn size={14} /> {event.venue}
                </a>
              ) : (
                <span className="event-meta-item"><MdLocationOn size={14} /> {event.venue}</span>
              )
            )}
            {event.venue && event.time && <span className="event-meta-sep">·</span>}
            {event.time && (
              <span className="event-meta-item"><MdAccessTime size={14} /> {event.time}</span>
            )}
          </p>
        )}
        {event.feeAmount && <p className="card-price">Ksh {event.feeAmount.toLocaleString()}</p>}
        <button
          type="button"
          className="btn btn-flame btn-sm card-fill-cta"
          onClick={() => setOpen(true)}
        >
          {event.requiresPayment ? 'Get Ticket' : 'Register My Spot'}
        </button>

        <Modal open={open} onClose={() => setOpen(false)} title={event.name}>
          <EventRegistrationGate event={event} />
        </Modal>
      </div>
    </div>
  );
}
