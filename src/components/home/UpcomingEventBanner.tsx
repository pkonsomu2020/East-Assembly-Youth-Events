import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MdLocationOn } from 'react-icons/md';
import { useCountdown } from '../../hooks/useCountdown';
import { Modal } from '../common/Modal';
import { EventRegistrationGate } from '../events/EventRegistrationGate';
import { getEventMapUrl } from '../../lib/eventMap';
import type { EventDef } from '../../types/domain';

export function UpcomingEventBanner({ event }: { event: EventDef }) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { days, hours, minutes, seconds, reached } = useCountdown(event.dateISO ?? '');
  const mapUrl = getEventMapUrl(event);

  const units = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Mins' },
    { value: seconds, label: 'Secs' },
  ];

  return (
    <div className="event-countdown-banner">
      <div className="event-countdown-grid">
        <motion.div
          className="event-countdown-content"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <span className="event-countdown-meta">
            {event.dateLabel}
            {event.venue && (
              <>
                {' · '}
                {mapUrl ? (
                  <a href={mapUrl} target="_blank" rel="noreferrer" className="event-countdown-map-link">
                    <MdLocationOn size={14} /> {event.venue}
                  </a>
                ) : (
                  event.venue
                )}
              </>
            )}
          </span>
          <h2>
            {event.name}
            {event.subtitle ? `: ${event.subtitle}` : ''}
          </h2>

          {reached ? (
            <p className="countdown-reached">It's happening!</p>
          ) : (
            <div className="event-countdown-timer">
              {units.map((unit) => (
                <div className="event-countdown-unit" key={unit.label}>
                  <span className="event-countdown-num">{String(unit.value).padStart(2, '0')}</span>
                  <small>{unit.label}</small>
                </div>
              ))}
            </div>
          )}

          <button type="button" className="btn btn-flame" onClick={() => setOpen(true)}>
            Get Ticket Now
          </button>
        </motion.div>

        {event.poster && (
          <motion.div
            className="event-countdown-poster"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src={event.poster} alt={`${event.name} poster`} />
          </motion.div>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={event.name}>
        <EventRegistrationGate event={event} />
      </Modal>
    </div>
  );
}
