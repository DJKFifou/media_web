import { useEffect, useState } from "react";
import { Prisma } from "@prisma/client";
type Theme = Prisma.ThemeGetPayload<{include: {subscribers: true}}>

export default function useTheme() {
  const [themes, setThemes] = useState<Theme[]>([]);

  async function getThemes() {
    try {
      const themes = await fetch("/api/themes/getThemes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await themes.json();
    } catch (e) {
      console.error(e);
    }
  }
  async function getTheme(id: string) {
    try {
      const theme = await fetch(`/api/themes/getTheme?id=${id}`);
      return await theme.json();
    } catch (e) {
      console.error(e);
    }
  }

  async function getSaveThemes(userId: string){
    try{
      const saveThemes = await fetch(`/api/themes/save?userId=${userId}`)
      return await saveThemes.json()
    }catch (e) {
      console.error(e)
    }
  }

  async function getNoSaveThemes(userId: string){
    try{
      const noSaveThemes = await fetch(`/api/themes/noSave?userId=${userId}`)
      return await noSaveThemes.json()
    }catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getThemes()
      .then((themes: Theme[]) => setThemes(themes))
      .catch((e) => console.error(e));
  }, []);

  return { getThemes, getTheme, themes, getSaveThemes, getNoSaveThemes };
}
