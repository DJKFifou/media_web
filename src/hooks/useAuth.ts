import { supabase } from "@/lib/initSupabase";
import { Credentials } from "@/types";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

export default function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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

  async function getCurrentUser(){
    try{
      return await supabase.auth.getUser()
    }catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getCurrentUser().then((user) => setCurrentUser(user.data.user))
  }, []);


  return { signUp, signIn, logOut, currentUser };
}
