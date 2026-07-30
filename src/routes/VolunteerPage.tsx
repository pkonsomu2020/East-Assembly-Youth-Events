import { Eyebrow } from '../components/common/Eyebrow';
import { VolunteerForm } from '../components/volunteer/VolunteerForm';

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
        <div className="container" style={{ maxWidth: 560 }}>
          <div className="card">
            <VolunteerForm />
          </div>
        </div>
      </section>
    </>
  );
}
