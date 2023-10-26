import useMedia from "@/hooks/useMedia";
import useTopic from "@/hooks/useTopic";
import { Format, Media, Topic } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function CreateArticle() {
  const { getTopics } = useTopic();
  const { getMedias } = useMedia();
  const router = useRouter();
  const [article, setArticle] = useState<any>(null);
  const [topicsList, setTopicsList] = useState<Topic[] | null>(null);
  const [mediasList, setMediasList] = useState<Media[] | null>(null);

  function handleArticleChange(key: string, value: string) {
    // @todo better type this ⬇️
    setArticle((prevState: any) => ({ ...prevState, [key]: value }));
  }
  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (article && typeof article.reading_duration === "string") {
        console.log(article);
        await fetch("/api/articles/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: article.title,
            content: article.content,
            reading_duration: parseInt(article.reading_duration, 10),
            topic: article.topic_id,
            media_id: article.media_id,
            image: article.image,
            audio: article.audio,
            format: article.format_id,
            link: article.link,
          }),
        });
        await router.replace("/admin");
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getTopics().then((topics) => setTopicsList(topics));
    getMedias().then((medias) => setMediasList(medias));
  }, []);

  return (
    <div>
      <Link href="/admin">Retour</Link>
      <h1>Votre nouvel article</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Titre</label>
        <input type="text" onChange={(event) => handleArticleChange("title", event.target.value)} />
        <label>Durée de lecture</label>
        <input
          type="number"
          min={0}
          onChange={(event) => handleArticleChange("reading_duration", event.target.value)}
        />
        <label>Associer à un topic</label>
        <select onChange={(event) => handleArticleChange("topic_id", event.target.value)}>
          {topicsList && topicsList.length > 0
            ? topicsList.map((topic, index) => {
                return (
                  <option key={index} value={topic.id}>
                    {topic.title}
                  </option>
                );
              })
            : null}
        </select>
        <label>Choisir un média</label>
        <select onChange={(event) => handleArticleChange("media_id", event.target.value)}>
          {mediasList && mediasList.length > 0
            ? mediasList.map((media, index) => {
                return (
                  <option value={media.id} key={index}>
                    {media.title}
                  </option>
                );
              })
            : null}
        </select>
        <label>{"Lien de l'article"}</label>
        <input type="text" onChange={(event) => handleArticleChange("link", event.target.value)} />
        <label>{"Lien de l'image"}</label>
        <input type="text" onChange={(event) => handleArticleChange("image", event.target.value)} />

        <label>Choisir un format</label>
        <select onChange={(event) => handleArticleChange("format_id", event.target.value)}>
          {Format
            ? Object.keys(Format).map((format, index) => {
                return (
                  <option key={index} value={format}>
                    {format}
                  </option>
                );
              })
            : null}
        </select>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}
