export default function useTheme() {
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
  return { getThemes, getTheme };
}
