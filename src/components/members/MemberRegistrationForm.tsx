import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { AlertState } from '../../types/domain';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';

type MemberType = 'new' | 'born-again' | '';

export function MemberRegistrationForm() {
  const [memberType, setMemberType] = useState<MemberType>('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [residence, setResidence] = useState('');
  const [age, setAge] = useState('');
  const [howYouHeard, setHowYouHeard] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!memberType) {
      setAlert({ message: 'Please select whether you are a new member or were recently born again.', type: 'error' });
      return;
    }

    const payload = {
      member_type: memberType,
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      residence: residence.trim(),
      age: Number(age),
      how_you_heard: howYouHeard.trim(),
      prayer_request: prayerRequest.trim() || null,
    };

    setSubmitting(true);
    const { error } = await supabase.from('member_registrations').insert(payload);
    setSubmitting(false);

    if (error) {
      setAlert({ message: 'Something went wrong. Please try again.', type: 'error' });
      console.error(error);
      return;
    }

    setAlert({
      message:
        memberType === 'born-again'
          ? 'Praise God! Welcome to the family. Someone from our team will reach out to you soon.'
          : 'Welcome! We are so excited to have you. Someone from our team will be in touch.',
      type: 'success',
    });
    setMemberType('');
    setFullName('');
    setPhone('');
    setEmail('');
    setResidence('');
    setAge('');
    setHowYouHeard('');
    setPrayerRequest('');
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Member type selector */}
      <div className="field">
        <label>I am registering as a…</label>
        <div className="flex gap-8" style={{ flexWrap: 'wrap' }}>
          {[
            { value: 'new' as MemberType, label: 'New Member', desc: 'First time joining the youth ministry' },
            { value: 'born-again' as MemberType, label: 'Born Again', desc: 'I recently gave my life to Christ' },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`badge-dept${memberType === opt.value ? ' selected' : ''}`}
              style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '10px 16px', gap: 2, cursor: 'pointer' }}
            >
              <input
                type="radio"
                name="member_type"
                value={opt.value}
                checked={memberType === opt.value}
                onChange={() => setMemberType(opt.value)}
                style={{ display: 'none' }}
              />
              <span style={{ fontWeight: 700 }}>{opt.label}</span>
              <span style={{ fontSize: '0.78rem', opacity: 0.75 }}>{opt.desc}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="field">
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          placeholder="Your full name"
        />
      </div>

      <div className="field">
        <label>Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="07XXXXXXXX"
        />
      </div>

      <div className="field">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
        />
      </div>

      <div className="field">
        <label>Where do you reside?</label>
        <input
          type="text"
          value={residence}
          onChange={(e) => setResidence(e.target.value)}
          required
          placeholder="e.g. Buruburu, Eastleigh, Kayole…"
        />
      </div>

      <div className="field">
        <label>Age</label>
        <input
          type="number"
          min={10}
          max={45}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          placeholder="e.g. 22"
        />
      </div>

      <div className="field">
        <label>How did you hear about us?</label>
        <input
          type="text"
          value={howYouHeard}
          onChange={(e) => setHowYouHeard(e.target.value)}
          required
          placeholder="e.g. A friend, social media, Sunday service…"
        />
      </div>

      <div className="field">
        <label>
          {memberType === 'born-again'
            ? 'Share your testimony or a prayer request (optional)'
            : 'Any prayer request or message for us? (optional)'}
        </label>
        <textarea
          rows={3}
          value={prayerRequest}
          onChange={(e) => setPrayerRequest(e.target.value)}
          placeholder="We would love to pray with you…"
        />
      </div>

      <Alert state={alert} />
      <Button type="submit" variant="primary" block disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Registration'}
      </Button>
    </form>
  );
}
