import { fetcher } from "@/lib/fetcher";
import { Article_Frequency } from "@prisma/client";

type UpdateUserPayload = {
  id: string,
  user_name?: string,
  themes?: string[],
  article_number?: number,
  article_frequency?: Article_Frequency
}
import { supabase } from "@/lib/initSupabase";
import { EnhancedUser, RegisterUserPayload, SavedArticlePayload, UpdateUserSubscribedThemesPayload } from "@/types";
import { Prisma, User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function useUser() {
  const [currentUser, setCurrentUser] = useState<EnhancedUser | null>(null);

  async function getUser(id: string) {
    try {
      const getUser = await fetch(`/api/users/getUser?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return (await getUser.json()) as User;
    } catch (e) {
      console.error(e);
    }
  }

  async function getCurrentUser() {
    const result = await supabase.auth.getUser();

    if (!result || !result.data.user) {
      console.log("Failed to get user from supabase");
      return;
    }

    const dbUser = await getUser(result.data.user.id);

    if (!dbUser) {
      console.log("Failed to get user from db");
      return;
    }

    const user = {
      supabase: result.data.user,
      db: dbUser,
    };

    setCurrentUser(user);
  }

  async function createUser(body: any) {
    try {
      await fetch("/api/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function registerUser(payload: RegisterUserPayload) {
    await fetcher({
      url: "/api/users/registerUser",
      method: "POST",
      body: payload,
    });
  }

  async function getUserThemes(userId: string){
    try{
      const response = await fetch(`/api/users/getUserThemes?userId=${userId}`)
      return await response.json()
    }catch (e) {
      console.error(e)
    }
  }

  async function updateUser(payload: UpdateUserPayload){
    try{
      await fetcher({
        url: "/api/users/updateUser",
        method: 'PUT',
        body: payload
      })
    }catch (e) {
      console.error(e)
    }
  }

  async function updateUserSubscribedThemes(payload: UpdateUserSubscribedThemesPayload) {
    await fetcher({
      url: "/api/users/updateUserSubscribedThemes",
      method: "POST",
      body: payload,
    });
  }

  async function getSavedArticles(userId: string) {
    const saveArticles = await fetch(`/api/users/getSavedArticles?id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = (await saveArticles.json()) as SavedArticlePayload[];
    return result;
  }

  useEffect(() => {
    (async () => {
      await getCurrentUser();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    getUser,
    createUser,
    registerUser,
    updateUserSubscribedThemes,
    currentUser,
    getCurrentUser,
    getSavedArticles,
    getUserThemes,
    updateUser
  };
}
