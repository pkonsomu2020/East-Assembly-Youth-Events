import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export interface SermonNote {
  id: string;
  user_id: string;
  title: string;
  reference: string | null;
  content: string;
  created_at: string;
  updated_at: string;
}

export function useSermonNotes(userId: string | null) {
  const [notes, setNotes] = useState<SermonNote[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    if (!userId) { setNotes([]); return; }
    setLoading(true);
    const { data } = await supabase
      .from('sermon_notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });
    setNotes((data ?? []) as SermonNote[]);
    setLoading(false);
  }, [userId]);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  async function createNote(): Promise<SermonNote | null> {
    if (!userId) return null;
    const { data, error } = await supabase
      .from('sermon_notes')
      .insert({ user_id: userId, title: 'Untitled Note', content: '' })
      .select()
      .single();
    if (error || !data) return null;
    await fetchNotes();
    return data as SermonNote;
  }

  async function saveNote(id: string, updates: Partial<Pick<SermonNote, 'title' | 'reference' | 'content'>>) {
    await supabase.from('sermon_notes').update(updates).eq('id', id);
    // Optimistic update in local state
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates, updated_at: new Date().toISOString() } : n)),
    );
  }

  async function deleteNote(id: string) {
    await supabase.from('sermon_notes').delete().eq('id', id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  return { notes, loading, createNote, saveNote, deleteNote, refetch: fetchNotes };
}
