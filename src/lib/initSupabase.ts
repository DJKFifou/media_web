import { createClient } from "@supabase/supabase-js";

import { setCookie, getCookie, deleteCookie } from "cookies-next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: {
      getItem: (key) => {
        return String(getCookie(key));
      },
      setItem: (key, value) => {
        // globalThis.localStorage.setItem(key, value);
        setCookie(key, value);
      },
      removeItem: (key) => {
        // globalThis.localStorage.removeItem(key);
        deleteCookie(key);
      },
    },
  },
});
