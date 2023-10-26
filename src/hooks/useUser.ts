import { fetcher } from "@/lib/fetcher";
import { RegisterUserPayload } from "@/types";
import { Article_Frequency } from "@prisma/client";

type UpdateUserPayload = {
  id: string,
  user_name?: string,
  themes?: string[],
  article_number?: number,
  article_frequency?: Article_Frequency
}

export default function useUser() {
  async function getUser(id: string) {
    try {
      const getUser = await fetch(`/api/users/getUser?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await getUser.json();
    } catch (e) {
      console.error(e);
    }
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
  return { getUser, createUser, registerUser, getUserThemes, updateUser };
}
