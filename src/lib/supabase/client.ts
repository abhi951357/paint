import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xjnillasaxtwwxoolnzc.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbmlsbGFzYXh0d3d4b29sbnpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5NjAwNjUsImV4cCI6MjEwNzUzNjA2NX0.V8njQeeuZaAIdTlnlyAryBkjFF5e5Y5uzjXybBXAtGM";

let browserClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseBrowserClient() {
  if (!browserClient) {
    browserClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return browserClient;
}

export const supabase = getSupabaseBrowserClient();
