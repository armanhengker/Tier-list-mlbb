import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// gunakan file env khusus backend
dotenv.config({ path: ".env.server" });

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);
