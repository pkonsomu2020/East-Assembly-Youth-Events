import { useState } from 'react';
import type { FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import type { AlertState } from '../../types/domain';
import { Alert } from '../common/Alert';
import { Button } from '../common/Button';
import { DepartmentPicker } from './DepartmentPicker';

export function VolunteerForm() {
  const [departments, setDepartments] = useState<string[]>([]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<AlertState | null>(null);

  function toggleDept(dept: string) {
    setDepartments((prev) => (prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (departments.length === 0) {
      setAlert({ message: 'Please select at least one team to serve in.', type: 'error' });
      return;
    }

    const payload = {
      full_name: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || null,
      departments,
      availability_notes: notes.trim() || null,
    };

    setSubmitting(true);
    const { error } = await supabase.from('volunteers').insert(payload);
    setSubmitting(false);

    if (error) {
      setAlert({ message: 'Something went wrong. Please try again.', type: 'error' });
      console.error(error);
      return;
    }

    setAlert({ message: 'Thank you! Someone from the team will reach out to you soon.', type: 'success' });
    setDepartments([]);
    setFullName('');
    setPhone('');
    setEmail('');
    setNotes('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <DepartmentPicker selected={departments} onToggle={toggleDept} />
      <div className="field">
        <label>Full Name</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
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
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="field">
        <label>Anything we should know about your availability?</label>
        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>
      <Alert state={alert} />
      <Button type="submit" variant="flame" block disabled={submitting}>
        {submitting ? 'Submitting...' : 'Sign Up To Volunteer'}
      </Button>
    </form>
  );
}
