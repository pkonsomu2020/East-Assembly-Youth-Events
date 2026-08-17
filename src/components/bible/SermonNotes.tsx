import { useCallback, useEffect, useRef, useState } from 'react';
import { MdAdd, MdDelete, MdCheck, MdEdit, MdLock, MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { useSermonNotes } from '../../hooks/useSermonNotes';
import type { SermonNote } from '../../hooks/useSermonNotes';
import { Button } from '../common/Button';

const AUTOSAVE_DELAY = 1200; // ms

export function SermonNotes() {
  const [userId, setUserId] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const { notes, loading, createNote, saveNote, deleteNote } = useSermonNotes(userId);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftRef, setDraftRef] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [mobileEditing, setMobileEditing] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auth
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load note into draft when switching
  const openNote = useCallback((note: SermonNote) => {
    setActiveId(note.id);
    setDraftTitle(note.title);
    setDraftRef(note.reference ?? '');
    setDraftContent(note.content);
    setSaved(false);
    setMobileEditing(true);
  }, []);

  // Auto-open first note when list loads (on larger screens)
  useEffect(() => {
    if (!activeId && notes.length > 0 && window.innerWidth > 768) {
      openNote(notes[0]);
    }
  }, [notes, activeId, openNote]);

  // Debounced autosave
  function scheduleAutosave(id: string, updates: Partial<Pick<SermonNote, 'title' | 'reference' | 'content'>>) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setSaved(false);
    saveTimer.current = setTimeout(async () => {
      await saveNote(id, updates);
      setSaved(true);
    }, AUTOSAVE_DELAY);
  }

  function handleTitleChange(val: string) {
    setDraftTitle(val);
    if (activeId) scheduleAutosave(activeId, { title: val, reference: draftRef || null, content: draftContent });
  }
  function handleRefChange(val: string) {
    setDraftRef(val);
    if (activeId) scheduleAutosave(activeId, { title: draftTitle, reference: val || null, content: draftContent });
  }
  function handleContentChange(val: string) {
    setDraftContent(val);
    if (activeId) scheduleAutosave(activeId, { title: draftTitle, reference: draftRef || null, content: val });
  }

  async function handleNew() {
    const note = await createNote();
    if (note) {
      openNote(note);
      setMobileEditing(true);
    }
  }

  async function handleDelete(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm('Delete this note?')) return;
    await deleteNote(id);
    if (activeId === id) {
      setActiveId(null);
      setDraftTitle('');
      setDraftRef('');
      setDraftContent('');
      setMobileEditing(false);
    }
  }

  // --- Unauthenticated state ---
  if (authLoading) return <div className="notes-placeholder"><p className="small-note">Loading…</p></div>;

  if (!userId) {
    return (
      <div className="notes-locked">
        <MdLock size={36} style={{ color: 'var(--ink-soft)', marginBottom: 12 }} />
        <h3>Save Your Sermon Notes</h3>
        <p className="small-note">
          Log in with your Camp Ignite account to create, edit, and keep your personal sermon notes. Saved securely and accessible any time.
        </p>
        <Link to="/camp-account" className="btn btn-primary btn-sm" style={{ marginTop: 8 }}>
          Log In / Create Account
        </Link>
      </div>
    );
  }

  // --- Authenticated state ---
  return (
    <div className={`notes-panel${mobileEditing ? ' mobile-editing' : ''}`}>
      {/* Sidebar: list of notes */}
      <div className="notes-sidebar">
        <div className="notes-sidebar-header">
          <span className="notes-sidebar-title">My Notes</span>
          <button type="button" className="notes-new-btn" onClick={handleNew} title="New note" aria-label="New note">
            <MdAdd size={18} />
          </button>
        </div>
        {loading && <p className="small-note" style={{ padding: '8px 12px' }}>Loading…</p>}
        {!loading && notes.length === 0 && (
          <div style={{ padding: '24px 16px', textAlign: 'center' }}>
            <p className="small-note" style={{ color: 'var(--ink-soft)', marginBottom: 12 }}>No notes yet.</p>
            <Button variant="outline" size="sm" onClick={handleNew}>+ Create First Note</Button>
          </div>
        )}
        <ul className="notes-list">
          {notes.map((n) => (
            <li key={n.id} className={`notes-list-item${activeId === n.id ? ' active' : ''}`}>
              <button type="button" className="notes-list-btn" onClick={() => openNote(n)}>
                <span className="notes-list-title">{n.title || 'Untitled Note'}</span>
                {n.reference && <span className="notes-list-ref">{n.reference}</span>}
                <span className="notes-list-date">{new Date(n.updated_at).toLocaleDateString()}</span>
              </button>
              <button
                type="button"
                className="notes-delete-btn"
                onClick={(e) => handleDelete(n.id, e)}
                aria-label="Delete note"
              >
                <MdDelete size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Editor */}
      <div className="notes-editor">
        {/* Mobile top bar with Back button */}
        <div className="notes-mobile-bar">
          <button
            type="button"
            className="notes-back-btn"
            onClick={() => setMobileEditing(false)}
          >
            <MdArrowBack size={18} />
            <span>All Notes</span>
          </button>
          <div className="notes-save-indicator">
            {saved
              ? <><MdCheck size={14} style={{ color: 'var(--success)' }} /> Saved</>
              : <span style={{ color: 'var(--ink-soft)' }}>Saving…</span>
            }
          </div>
        </div>

        {!activeId ? (
          <div className="notes-empty-state">
            <MdEdit size={36} style={{ color: 'var(--ink-soft)', marginBottom: 10 }} />
            <p className="small-note">Select a note or create a new one.</p>
            <Button variant="primary" size="sm" onClick={handleNew}>New Note</Button>
          </div>
        ) : (
          <>
            <div className="notes-editor-header">
              <input
                className="notes-title-input"
                value={draftTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Note title…"
                aria-label="Note title"
              />
              <div className="notes-save-indicator desktop-only">
                {saved
                  ? <><MdCheck size={14} style={{ color: 'var(--success)' }} /> Saved</>
                  : <span style={{ color: 'var(--ink-soft)' }}>Saving…</span>
                }
              </div>
            </div>
            <input
              className="notes-ref-input"
              value={draftRef}
              onChange={(e) => handleRefChange(e.target.value)}
              placeholder="Scripture reference: e.g. Romans 8:28..."
              aria-label="Scripture reference"
            />
            <textarea
              className="notes-content-area"
              value={draftContent}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Type your sermon notes here… Notes save automatically."
              aria-label="Sermon notes content"
            />
          </>
        )}
      </div>
    </div>
  );
}
