import { motion, useReducedMotion } from 'motion/react';
import { Eyebrow } from '../components/common/Eyebrow';
import { Heading } from '../components/common/Heading';
import { TillBox } from '../components/common/TillBox';
import { MerchCard } from '../components/merchandise/MerchCard';
import { ITEMS } from '../data/merchandise';
import { SITE_CONFIG, telHref } from '../data/siteConfig';

const ORDER_STEPS = [
  { step: '01', title: 'Pick Your Item', blurb: 'Choose a product, then select your size and color.' },
  { step: '02', title: 'Pay The Till Number', blurb: 'Send payment via M-Pesa to the till number shown.' },
  { step: '03', title: 'Paste Your M-Pesa Message', blurb: 'Submit the order form with your confirmation message.' },
  { step: '04', title: "We'll Confirm Your Order", blurb: 'Our team verifies your payment and prepares your item.' },
];

export function MerchandisePage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="section-tight">
        <div className="container center">
          <Eyebrow>Merchandise</Eyebrow>
          <h1>Youth Ministry Store</h1>
          <p style={{ maxWidth: 560, margin: '0 auto' }}>
            Rep the youth ministry. Pick an item, choose your size and color, then pay via Till Number and paste
            your M-Pesa message so we can confirm your order.
          </p>
          <p className="small-note">
            Need help with sizing or an order? Call/WhatsApp <b>{SITE_CONFIG.merchContact.name}</b>:{' '}
            <a href={telHref(SITE_CONFIG.merchContact.phone)}>{SITE_CONFIG.merchContact.phone}</a>.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <motion.div
            className="grid grid-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {ITEMS.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
              >
                <MerchCard item={item} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-tight section-alt">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'start', gap: 40 }}>
            <div>
              <Eyebrow>How Ordering Works</Eyebrow>
              <Heading underline>From Pick To Pickup</Heading>
              <div className="grid grid-2" style={{ marginTop: 24 }}>
                {ORDER_STEPS.map((s) => (
                  <div key={s.step}>
                    <span className="pinned-card-step" style={{ fontSize: '1.3rem' }}>{s.step}</span>
                    <h3 style={{ marginBottom: 4 }}>{s.title}</h3>
                    <p className="small-note">{s.blurb}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <h3>Need Help Ordering?</h3>
              <p>
                Call or WhatsApp <b>{SITE_CONFIG.merchContact.name}</b> for sizing help or order questions.
              </p>
              <a href={telHref(SITE_CONFIG.merchContact.phone)} className="btn btn-outline btn-sm">
                📞 {SITE_CONFIG.merchContact.phone}
              </a>
              <TillBox />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
