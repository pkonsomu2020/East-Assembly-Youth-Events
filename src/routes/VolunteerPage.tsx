import { Eyebrow } from '../components/common/Eyebrow';
import { VolunteerForm } from '../components/volunteer/VolunteerForm';
import { SITE_CONFIG, telHref } from '../data/siteConfig';

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

export function VolunteerPage() {
  return (
    <>
      <section className="section-tight">
        <div className="container center">
          <Eyebrow>Serve With Us</Eyebrow>
          <h1>Volunteer Management</h1>
          <p style={{ maxWidth: 560, margin: '0 auto' }}>
            Every ministry needs hands and hearts. Pick the team(s) you'd love to serve in and we'll reach out with
            next steps.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="grid grid-sidebar" style={{ alignItems: 'start' }}>
            <div className="card">
              <h3>Have Questions?</h3>
              <p className="small-note">Reach out to any of our team contacts directly.</p>
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
            </div>
            <div className="card">
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
