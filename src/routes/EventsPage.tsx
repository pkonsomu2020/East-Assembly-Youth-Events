import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Eyebrow } from '../components/common/Eyebrow';
import { Lightbox } from '../components/common/Lightbox';
import { EventCard } from '../components/events/EventCard';
import { EventCalendar } from '../components/events/EventCalendar';
import { EVENTS } from '../data/events';

export function EventsPage() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="section-tight">
        <motion.div
          className="container center"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Eyebrow>🎉 Youth Events</Eyebrow>
          <h1>
            <span className="wt-black">What's</span>{' '}
            <span className="wt-bold-italic">Coming</span>{' '}
            <span className="wt-regular">Up</span>
          </h1>
          <p style={{ fontSize: '1.05rem', maxWidth: 560, margin: '0 auto' }}>
            Tap an event below to reserve your spot. Dinner and the Retreat need a ticket; Worship Experience
            and Chill Out are completely free.
          </p>
          <div className="hero-actions" style={{ justifyContent: 'center' }}>
            <a href="#events-grid" className="btn btn-primary">See Events</a>
            <a href="#calendar" className="btn btn-outline">View Calendar</a>
          </div>
        </motion.div>
      </section>

      <section id="events-grid" className="anchor-target section-tight">
        <div className="container">
          <div className="events-layout">
            <motion.div
              className="grid grid-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            >
              {EVENTS.map((event) => (
                <motion.div
                  key={event.slug}
                  variants={{
                    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                  }}
                >
                  <EventCard event={event} onOpenPoster={setLightboxSrc} />
                </motion.div>
              ))}
            </motion.div>

            <aside id="calendar" className="anchor-target events-sidebar">
              <Eyebrow>Plan Ahead</Eyebrow>
              <h3 style={{ marginBottom: 4 }}>Event Calendar</h3>
              <p className="small-note" style={{ marginBottom: 16 }}>
                Tap a highlighted date to mark it as one you're interested in. It'll be saved on this device.
              </p>
              <EventCalendar />
            </aside>
          </div>
        </div>
      </section>

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </>
  );
}
