import { MdPersonAdd, MdFavorite, MdPhone } from 'react-icons/md';
import { MdLocalFireDepartment } from 'react-icons/md';
import type { IconType } from 'react-icons';
import { Eyebrow } from '../components/common/Eyebrow';
import { MemberRegistrationForm } from '../components/members/MemberRegistrationForm';
import { SITE_CONFIG, telHref } from '../data/siteConfig';

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

const INFO_CARDS: { Icon: IconType; title: string; body: string }[] = [
  {
    Icon: MdPersonAdd,
    title: 'New to the Youth Ministry?',
    body: 'Fill in the form and we will personally reach out to welcome you, connect you with the community, and help you find your footing here.',
  },
  {
    Icon: MdFavorite,
    title: 'Born Again & Discipleship',
    body: 'If you gave your life to Christ recently, at camp, a service, or anywhere, we want to walk that journey with you through discipleship and prayer.',
  },
  {
    Icon: MdPhone,
    title: 'We Follow Up Personally',
    body: 'Every registration goes directly to our team. Someone will reach out within a few days to check in, pray with you, and answer any questions.',
  },
];

export function MembersPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="section-tight">
        <div className="container center">
          <Eyebrow>You Are Welcome Here</Eyebrow>
          <h1>New &amp; Existing Members</h1>
          <p style={{ maxWidth: 580, margin: '0 auto' }}>
            Whether you are walking through our doors for the very first time or you just gave your life to Christ and
            want someone to walk with you, this is your place. Register below and our team will personally reach out
            to you.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="section-tight section-alt">
        <div className="container">
          <div className="grid grid-3">
            {INFO_CARDS.map((card) => (
              <div className="card center" key={card.title}>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 52,
                    height: 52,
                    background: 'var(--sky-pale)',
                    border: 'var(--border)',
                    marginBottom: 14,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  <card.Icon size={26} color="var(--sky)" />
                </span>
                <h3>{card.title}</h3>
                <p style={{ fontSize: '0.9rem' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Contact Sidebar */}
      <section className="section-tight">
        <div className="container">
          <div className="grid grid-sidebar" style={{ alignItems: 'start' }}>
            {/* Sidebar */}
            <div className="card">
              <h3>Need to Talk First?</h3>
              <p className="small-note">Reach out directly to any of our team contacts below.</p>
              <div className="contact-card-list">
                {SITE_CONFIG.mainContacts.map((contact) => (
                  <a key={contact.phone} href={telHref(contact.phone)} className="contact-card-item">
                    <span className="contact-card-avatar">{initials(contact.name)}</span>
                    <span>
                      <b>{contact.name}</b>
                      <small>{contact.phone}</small>
                    </span>
                  </a>
                ))}
              </div>

              <div style={{ marginTop: 24, padding: '16px', background: 'var(--sky-mist)', border: 'var(--border)' }}>
                <p className="small-note" style={{ marginBottom: 8, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MdLocalFireDepartment size={16} color="var(--flame)" />
                  On Fire For Christ
                </p>
                <p className="small-note" style={{ margin: 0 }}>
                  "For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you,
                  plans to give you hope and a future." - Jeremiah 29:11
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="card">
              <div style={{ marginBottom: 20 }}>
                <Eyebrow>Registration Form</Eyebrow>
                <h2 style={{ marginTop: 6 }}>Tell Us About Yourself</h2>
                <p className="small-note">
                  Fill in as much as you are comfortable with. Only your name and phone number are required, the rest
                  helps us reach out to you better.
                </p>
              </div>
              <MemberRegistrationForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
