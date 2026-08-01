import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Eyebrow } from '../components/common/Eyebrow';
import { Heading } from '../components/common/Heading';
import { PinnedCard } from '../components/common/PinnedCard';
import { Slideshow } from '../components/gallery/Slideshow';
import { CountdownTimer } from '../components/camp/CountdownTimer';
import { SITE_CONFIG } from '../data/siteConfig';

const GALLERY_IMAGES = Array.from(
  { length: 12 },
  (_, i) => `/assets/gallery/gallery-${String(i + 1).padStart(2, '0')}.jpg`,
);

export function CampIgnitePage() {
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
            <div className="camp-logo-badge">
              <img src="/assets/camp-ignite-flame-icon.png" alt="Camp Ignite 2026" />
            </div>
            <Eyebrow>Mombasa &middot; 27 Dec &ndash; 2 Jan</Eyebrow>
            <h1>Camp Ignite 2026</h1>
            <p style={{ fontSize: '1.05rem', maxWidth: 480 }}>
              Total camp fee: <b>Ksh {SITE_CONFIG.campFeeTotal.toLocaleString()}</b>. Pay in installments at your
              own pace, then create your account to track your payments and watch your progress toward camp.
            </p>
            <div className="hero-actions">
              <Link to="/camp-account" className="btn btn-flame">Create My Camp Account</Link>
              <a href="#how-it-works" className="btn btn-outline">See How It Works</a>
            </div>
            <CountdownTimer targetDate={SITE_CONFIG.campStart} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <Slideshow images={GALLERY_IMAGES} />
          </motion.div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="theme-block">
            <div className="theme-label">🔥 This Year's Theme</div>
            <Heading underline>Live His Life: Do His Work</Heading>
            <blockquote>
              "Whatever you do, work heartily, as for the Lord and not for men, knowing that from the Lord you will
              receive the inheritance as your reward. You are serving the Lord Christ."
              <cite>Colossians 3:23&ndash;24</cite>
            </blockquote>
          </div>

          <div id="how-it-works" className="anchor-target center" style={{ marginBottom: 18 }}>
            <Eyebrow>How It Works</Eyebrow>
            <h2>Getting To Camp, One Step At A Time</h2>
          </div>
          <motion.div
            className="grid grid-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          >
            <PinnedCard index={0} step="01" title="Sign Up">
              Create your free account below with your name and phone number. It takes less than a minute.
            </PinnedCard>
            <PinnedCard index={1} step="02" title="Pay In Installments">
              Send whatever you can via Till {SITE_CONFIG.tillNumber}, whenever you can, and paste the M-Pesa
              message so we can match it to your account.
            </PinnedCard>
            <PinnedCard index={2} step="03" title="Track Your Flame Meter">
              Once we verify a payment against the till statement, your flame fills up, so you can watch your
              progress toward the full Ksh {SITE_CONFIG.campFeeTotal.toLocaleString()}.
            </PinnedCard>
          </motion.div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 560 }}>
          <div className="card center">
            <Eyebrow>Your Account</Eyebrow>
            <h2>Track Your Camp Ignite Progress</h2>
            <p>
              Log in or create your free account to submit payments, see your payment history, and watch your
              flame meter fill up as your installments get verified.
            </p>
            <Link to="/camp-account" className="btn btn-flame">Log In / Create Account</Link>
          </div>
        </div>
      </section>
    </>
  );
}
