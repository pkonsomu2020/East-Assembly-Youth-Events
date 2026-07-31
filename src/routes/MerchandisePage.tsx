import { motion, useReducedMotion } from 'motion/react';
import { Eyebrow } from '../components/common/Eyebrow';
import { MerchCard } from '../components/merchandise/MerchCard';
import { ITEMS } from '../data/merchandise';
import { SITE_CONFIG, telHref } from '../data/siteConfig';

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
    </>
  );
}
