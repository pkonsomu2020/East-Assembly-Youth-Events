import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error('Missing Supabase env vars. Check your .env file (see .env.example).');
}

// Same project, same public anon key as the main site; admin access is
// granted entirely through database-side authorization (see
// supabase/admin-schema.sql), never through a different/elevated key here.
export const supabase = createClient(url, anonKey);
