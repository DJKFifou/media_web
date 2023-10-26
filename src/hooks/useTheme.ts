import { useEffect, useState } from "react";

export default function useTheme() {
  const [themes, setThemes] = useState([]);

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

  useEffect(() => {
    getThemes()
      .then((themes) => setThemes(themes))
      .catch((e) => console.error(e));
  }, []);

  return { getThemes, getTheme, themes };
}
