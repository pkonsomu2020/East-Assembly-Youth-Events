import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export function VerifyStatusButton({
  table,
  id,
  column,
  targetStatus,
  label,
  onChanged,
}: {
  table: string;
  id: string;
  column: string;
  targetStatus: string;
  label: string;
  onChanged: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (!confirm(`Mark this as "${targetStatus}"?`)) return;
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.from(table).update({ [column]: targetStatus }).eq('id', id);
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    onChanged();
  }

  return (
    <div className="flex items-center gap-8">
      <button type="button" className="btn btn-flame btn-sm" onClick={handleClick} disabled={submitting}>
        {submitting ? 'Saving...' : label}
      </button>
      {error && <span className="small-note" style={{ color: 'var(--danger)' }}>{error}</span>}
    </div>
  );
}
