import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MdMenuBook, MdEditNote } from 'react-icons/md';
import { Eyebrow } from '../components/common/Eyebrow';
import { Heading } from '../components/common/Heading';
import { BibleReader } from '../components/bible/BibleReader';
import { SermonNotes } from '../components/bible/SermonNotes';
import { VerseOfTheDay } from '../components/bible/VerseOfTheDay';
import { DAILY_VERSES } from '../data/bible';

type Tab = 'read' | 'notes';

export function BiblePage() {
  const [tab, setTab] = useState<Tab>('read');
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section className="hero-dark bible-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <Eyebrow>The Living Word</Eyebrow>
            <h1>Read. Reflect. Remember.</h1>
            <p style={{ fontSize: '1.05rem', maxWidth: 520, margin: '0 auto 24px' }}>
              Open any book of the Bible, search a passage, and write your sermon notes, all in one place. Your notes
              save automatically when you are signed in.
            </p>
          </motion.div>

          {/* Verse of the Day banner */}
          <VerseOfTheDay />
        </div>
      </section>

      {/* Tab switcher */}
      <section className="section-tight" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="bible-tabs">
            <button
              type="button"
              className={`bible-tab${tab === 'read' ? ' active' : ''}`}
              onClick={() => setTab('read')}
            >
              <MdMenuBook size={18} />
              Read the Bible
            </button>
            <button
              type="button"
              className={`bible-tab${tab === 'notes' ? ' active' : ''}`}
              onClick={() => setTab('notes')}
            >
              <MdEditNote size={18} />
              Sermon Notes
            </button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="section-tight">
        <div className="container">
          {tab === 'read' && (
            <motion.div
              key="read"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <BibleReader />
            </motion.div>
          )}
          {tab === 'notes' && (
            <motion.div
              key="notes"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <SermonNotes />
            </motion.div>
          )}
        </div>
      </section>

      {/* Encouraging words section */}
      <section className="section-tight section-alt">
        <div className="container">
          <div className="center" style={{ marginBottom: 32 }}>
            <Eyebrow>Daily Encouragement</Eyebrow>
            <Heading underline>Words From The Word</Heading>
          </div>
          <motion.div
            className="grid grid-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          >
            {DAILY_VERSES.slice(0, 6).map((v) => (
              <motion.div
                key={v.ref}
                className="bible-enc-card"
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
              >
                <p className="bible-enc-text">"{v.text}"</p>
                <span className="bible-enc-ref">- {v.ref}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
