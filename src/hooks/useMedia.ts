export default function useMedia() {
  async function getMedias() {
    const response = await fetch("/api/medias/getMedias");
    return await response.json();
  }

  return { getMedias };
}
