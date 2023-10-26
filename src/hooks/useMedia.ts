import { Media } from "@prisma/client";
import { useEffect, useState } from "react";

export default function useMedia() {
  const [medias, setMedias] = useState<Media[]>([]);

  async function getMedias() {
    const response = await fetch("/api/medias/getMedias");
    return await response.json();
  }

  useEffect(() => {
    getMedias()
      .then((e) => setMedias(e))
      .catch((e) => console.error(e));
  }, []);

  return { getMedias, medias };
}
