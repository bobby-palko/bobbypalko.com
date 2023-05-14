import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const db = createClient('https://pcmxisweezukigsomtrs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjbXhpc3dlZXp1a2lnc29tdHJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwMTQ4OTEsImV4cCI6MTk5OTU5MDg5MX0.MepUXXokngF4b_5f9sn0Q3sGe2VAtWGXeoNxbOkmcDM');
