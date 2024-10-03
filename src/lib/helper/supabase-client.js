import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_APP_SUPABASE_SERVICE_ROLE_API_KEY,
);

export const SupabaseRpc = {
  checkEmail: "check_email_exists",
  getUsers: "get_users",
};
