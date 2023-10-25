import {Article, Format, Media, Topic} from "@prisma/client"
import Link from "next/link"
import {FormEvent, useEffect, useState} from "react"
import useTopic from "@/hooks/useTopic";
import {useRouter} from "next/router";
import useMedia from "@/hooks/useMedia";
import useFormat from "@/hooks/useFormat";

export default function CreateArticle() {
  const {getTopics} = useTopic();
  const {getMedias} = useMedia();
  const {getFormats} = useFormat();
  const router = useRouter()
  const [article, setArticle] = useState<any>(null)
  const [topicsList, setTopicsList] = useState<Topic[] | null>(null);
  const [mediasList, setMediasList] = useState<Media[] | null>(null);
  const [formatsList, setFormatsList] = useState<Format[] | null>(null);

  function handleArticleChange(key: string, value: string) {
    setArticle((prevState) => ({ ...prevState, [key]: value }))
  }
  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      if (article && typeof article.reading_duration === "string") {
        console.log(article)
        await fetch("/api/articles/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: article.title,
            content: article.content,
            reading_duration: parseInt(article.reading_duration, 10),
            topic: article.topic,
            media_name: article.media_name,
            image: article.image,
            audio: article.audio,
            format: article.format,
            link: article.link
          }),
        })
        await router.replace('/admin');
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getTopics().then((topics) => setTopicsList(topics))
    getMedias().then((medias) => setMediasList(medias))
    getFormats().then((formats) => setFormatsList(formats))
  }, []);

  return (
    <div>
      <Link href="/admin">Retour</Link>
      <h1>Votre nouvel article</h1>
      <form onSubmit={handleFormSubmit}>
        <label>Titre</label>
        <input type="text" onChange={(event) => handleArticleChange("title", event.target.value)} />
        <label>Contenu</label>
        <textarea onChange={(event) => handleArticleChange("content", event.target.value)} />
        <label>Durée de lecture</label>
        <input
          type="number"
          min={0}
          onChange={(event) => handleArticleChange("reading_duration", event.target.value)}
        />
        <label>Associer à un topic</label>
        <select onChange={(event) => handleArticleChange("topic", event.target.value)}>
          {topicsList && topicsList.length > 0 ? (
            topicsList.map((topic, index) => {
              return(
                <option key={index} value={topic.id}>{topic.title}</option>
              )
            })
          ) : null}
        </select>
        <label>Choisir un média</label>
        <select onChange={(event) => handleArticleChange("media_name", event.target.value)}>
          {mediasList && mediasList.length > 0 ? (
            mediasList.map((media, index) => {
              return(
                <option value={media.id} key={index}>{media.title}</option>
              )
            })
          ) : null}
        </select>
        <label>{"Lien de l'article"}</label>
        <input type="text" onChange={(event) => handleArticleChange("link", event.target.value)}/>
        <label>{"Lien de l'image"}</label>
        <input type="text" onChange={(event) => handleArticleChange("image", event.target.value)}/>
        <label>Importer un fichier audio</label>
        <input type="file" accept=".mp3,audio/*" onChange={(event) => handleArticleChange("audio", event.target.value)}/>
        <label>Choisir un format</label>
        <select onChange={(event) => handleArticleChange("format", event.target.value)}>
          {formatsList && formatsList.length > 0 ? (
            formatsList.map((format, index) => {
              return (
                <option key={index} value={format.id}>{format.slug}</option>
              )
            })
          ) : null}
        </select>
        <button type="submit">Créer</button>
      </form>
    </div>
  )
}
