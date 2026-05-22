import { createClient } from "@supabase/supabase-js";

function readEnv(key: string) {
  return process.env[key];
}

export function getSupabaseServerClient() {
  const supabaseUrl =
    readEnv("SUPABASE_URL") || readEnv("NEXT_PUBLIC_SUPABASE_URL");
  const supabaseServiceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
