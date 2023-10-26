import { supabase } from "@/lib/initSupabase";
import { Credentials } from "@/types";

export default function useAuth() {
  async function signUp(credentials: Credentials) {
    try {
      const result = await supabase.auth.signUp({ email: credentials.email, password: credentials.password });
      if (result.error) throw result.error;
      return result.data;
    } catch (e) {
      console.error(e);
    }
  }

  async function signIn(credentials: Credentials) {
    try {
      await supabase.auth.signInWithPassword({ email: credentials.email, password: credentials.password });
    } catch (e) {
      console.error(e);
    }
  }

  async function logOut() {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.log(e);
    }
  }

  return { signUp, signIn, logOut };
}
