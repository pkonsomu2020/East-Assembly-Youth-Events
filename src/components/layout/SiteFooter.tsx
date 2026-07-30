import { Link } from 'react-router-dom';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <img
              src="/assets/logo.png"
              alt="KAG East Assembly Youth Ministry"
              className="footer-logo"
              style={{ marginBottom: 14 }}
            />
            <p style={{ color: '#DCEFFA', maxWidth: 320 }}>
              Raising a generation on fire for Christ &mdash; through worship, fellowship, and service. Follow us and
              stay connected to everything happening in the youth ministry.
            </p>
            <div className="social-row">
              <a href="#" aria-label="Facebook" title="Facebook">
                <svg width="17" height="17" fill="#fff" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" title="Instagram">
                <svg width="17" height="17" fill="#fff" viewBox="0 0 24 24">
                  <path d="M12 2c2.7 0 3.1 0 4.1.1 1 .1 1.7.2 2.3.5.6.2 1.1.6 1.6 1.1.5.5.8 1 1.1 1.6.2.6.4 1.3.5 2.3.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c-.1 1-.2 1.7-.5 2.3a4.6 4.6 0 0 1-2.7 2.7c-.6.2-1.3.4-2.3.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1-.1-1.7-.2-2.3-.5a4.6 4.6 0 0 1-2.7-2.7c-.2-.6-.4-1.3-.5-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c.1-1 .2-1.7.5-2.3a4.6 4.6 0 0 1 2.7-2.7c.6-.2 1.3-.4 2.3-.5C8.9 2 9.3 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" title="YouTube">
                <svg width="17" height="17" fill="#fff" viewBox="0 0 24 24">
                  <path d="M21.8 8.2s-.2-1.5-.8-2.1c-.8-.8-1.7-.8-2.1-.9C15.9 5 12 5 12 5s-3.9 0-6.9.2c-.4 0-1.3.1-2.1.9-.6.6-.8 2.1-.8 2.1S2 10 2 11.7v1.6C2 15 2.2 16.8 2.2 16.8s.2 1.5.8 2.1c.8.8 1.8.8 2.3.9C7.1 20 12 20 12 20s3.9 0 6.9-.2c.4 0 1.3-.1 2.1-.9.6-.6.8-2.1.8-2.1s.2-1.8.2-3.5v-1.6c0-1.7-.2-3.5-.2-3.5ZM9.9 15V9l5.4 3-5.4 3Z" />
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp" title="WhatsApp">
                <svg width="17" height="17" fill="#fff" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1s-.6.8-.8 1c-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.1.2 1.6 2.5 4 3.5.6.2 1 .4 1.3.5.6.2 1.1.1 1.5-.1.5-.2 1.4-.6 1.6-1.1.2-.5.2-.9.1-1l-.4-.2Z" />
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p><Link to="/events">Youth Events</Link></p>
            <p><Link to="/merchandise">Merchandise Store</Link></p>
            <p><Link to="/camp-ignite">Camp Ignite 2026</Link></p>
            <p><Link to="/volunteer">Volunteer</Link></p>
          </div>
          <div>
            <h4>Get In Touch</h4>
            <p>
              Merchandise &amp; general enquiries:
              <br />
              <a href="tel:0741366218">0741 366 218</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} KAG East Assembly Youth Ministry. Raising a generation on fire. 🔥
        </div>
      </div>
    </footer>
  );
}
