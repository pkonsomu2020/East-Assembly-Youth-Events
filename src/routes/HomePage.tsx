import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import {
  MdCameraAlt,
  MdMic,
  MdVolunteerActivism,
  MdMusicNote,
  MdCampaign,
  MdSportsSoccer,
  MdPhone,
  MdLocalFireDepartment,
  MdHandshake,
  MdContactPhone,
} from 'react-icons/md';
import { Eyebrow } from '../components/common/Eyebrow';
import { Heading } from '../components/common/Heading';
import { HeroPhotoShowcase } from '../components/hero/HeroPhotoShowcase';
import { PhotoMarquee } from '../components/hero/PhotoMarquee';
import { FlameToggleCTA } from '../components/home/FlameToggleCTA';
import { UpcomingEventBanner } from '../components/home/UpcomingEventBanner';
import { VerseOfTheDay } from '../components/bible/VerseOfTheDay';
import { SITE_CONFIG, telHref } from '../data/siteConfig';
import { EVENTS } from '../data/events';

const UPCOMING_EVENT = EVENTS.find((e) => e.slug === 'youth-dinner');

const FEATURE_CARDS = [
  { title: 'Youth Events', blurb: 'Dinner, retreats, worship nights & hangouts.', to: '/events', cta: 'View Events' },
  { title: 'Merchandise', blurb: 'Hoodies, tees, jerseys, caps & more.', to: '/merchandise', cta: 'Shop Now' },
  { title: 'Camp Ignite 2026', blurb: 'Mombasa · 27 Dec 2026 – 2 Jan 2027', to: '/camp-ignite', cta: 'Register' },
  { title: 'Volunteer', blurb: 'Media, Worship, Ushers & more.', to: '/volunteer', cta: 'Serve With Us' },
];

const TEAMS = [
  { icon: MdCameraAlt,        label: 'Media & Marketing Ministry' },
  { icon: MdMic,              label: 'Master of Ceremonies' },
  { icon: MdVolunteerActivism,label: 'Prayer Ministry' },
  { icon: MdMusicNote,        label: 'Ezesha Worship Team' },
  { icon: MdCampaign,         label: 'Outreach Ministry' },
  { icon: MdSportsSoccer,     label: 'Sports Ministry' },
];

export function HomePage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Eyebrow><MdLocalFireDepartment size={14} /> On Fire For Christ</Eyebrow>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="wt-regular">KAG East</span>{' '}
              <span className="wt-bold-italic">Assembly</span>
              <br />
              <span className="wt-black">Youth Ministry</span>
            </motion.h1>
            <motion.p
              style={{ fontSize: '1.1rem', maxWidth: 520 }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              A community of young people growing in faith, worship, and purpose. Find out what's coming up, get
              your gear, register for Camp Ignite 2026, and find a place to serve.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link to="/events" className="btn btn-primary">See Youth Events</Link>
              <Link to="/camp-ignite" className="btn btn-flame">Camp Ignite 2026</Link>
              <Link to="/#join" className="btn btn-outline">Join Us</Link>
            </motion.div>
          </motion.div>
          <HeroPhotoShowcase />
        </div>
      </section>

      {UPCOMING_EVENT && (
        <section className="section-tight">
          <div className="container">
            <UpcomingEventBanner event={UPCOMING_EVENT} />
          </div>
        </section>
      )}

      <section className="section-tight">
        <PhotoMarquee />
      </section>

      {/* Verse of the Day */}
      <section className="section-tight section-alt">
        <div className="container">
          <div className="center" style={{ marginBottom: 20 }}>
            <Eyebrow>The Living Word</Eyebrow>
            <Heading underline>Verse of the Day</Heading>
          </div>
          <VerseOfTheDay compact />
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="center" style={{ marginBottom: 36 }}>
            <Eyebrow>What's Happening</Eyebrow>
            <Heading underline>Everything In One Place</Heading>
          </div>
          <motion.div
            className="grid grid-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          >
            {FEATURE_CARDS.map((card) => (
              <motion.div
                key={card.title}
                className="card center"
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
              >
                <h3>{card.title}</h3>
                <p style={{ fontSize: '.9rem' }}>{card.blurb}</p>
                <Link to={card.to} className="btn btn-outline btn-sm">{card.cta}</Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="center" style={{ marginBottom: 30 }}>
            <Eyebrow>Where to Serve</Eyebrow>
            <Heading underline>Serve On A Team</Heading>
          </div>
          <div className="team-strip">
            {TEAMS.map((team) => (
              <div className="team-strip-item" key={team.label}>
                <span className="team-strip-icon">
                  <team.icon size={28} />
                </span>
                <span>{team.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div id="join" className="cta-banner">
            <span className="cta-banner-decor cta-banner-decor-1" />
            <span className="cta-banner-decor cta-banner-decor-2" />
            <div className="cta-banner-grid">
              <div>
                <span className="cta-eyebrow">New Here?</span>
                <h2>Join The Youth Ministry</h2>
                <p>
                  We meet every week for worship, teaching, and fellowship. Whether it's your first time or
                  you've been part of the family for years, there's a place for you here.
                </p>
                <div className="cta-tags">
                  <span className="cta-tag"><MdLocalFireDepartment size={14} /> On Fire For Christ</span>
                  <span className="cta-tag"><MdHandshake size={14} /> New & Existing Members Welcome</span>
                  <span className="cta-tag"><MdContactPhone size={14} /> 3 Team Contacts Below</span>
                </div>
                <div style={{ marginTop: 28 }}>
                  <FlameToggleCTA />
                </div>
              </div>
              <div className="cta-banner-action">
                <p className="cta-caption" style={{ marginTop: 0 }}>
                  Reach out and someone from our team will connect with you personally.
                </p>
                <div className="contact-chip-list">
                  {SITE_CONFIG.mainContacts.map((contact) => (
                    <a key={contact.phone} href={telHref(contact.phone)} className="contact-chip">
                      <span className="contact-chip-icon"><MdPhone size={16} /></span>
                      <span>
                        <b>{contact.name}</b>
                        <small>{contact.phone}</small>
                      </span>
                    </a>
                  ))}
                </div>
                <Link to="/volunteer" className="cta-secondary-link">See Volunteer Teams →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
