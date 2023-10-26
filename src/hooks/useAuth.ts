import { supabase } from "@/lib/initSupabase";
import { Credentials } from "@/types";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export default function useAuth() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
      return await supabase.auth.signInWithPassword({ email: credentials.email, password: credentials.password });
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

  return { signUp, signIn, logOut, session };
}
