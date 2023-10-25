/* eslint-disable @next/next/no-img-element */
import useArticle from "@/hooks/useArticle"
import useMedia from "@/hooks/useMedia"
import useTopic from "@/hooks/useTopic"
import { Article, Format, Media, Topic } from "@prisma/client"
import { useRouter } from "next/router"
import { FormEvent, useEffect, useState } from "react"

const ModifyArticle = ({
  articleData,
  isModify,
  onSuccess,
}: {
  articleData: Article
  isModify: boolean
  onSuccess: () => void
}) => {
  const { updateArticle } = useArticle()
  const { getTopics } = useTopic()
  const { getMedias } = useMedia()
  const router = useRouter()

  const [topicsList, setTopicsList] = useState<Topic[] | null>(null)
  const [mediasList, setMediasList] = useState<Media[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as unknown as Pick<
      Article,
      "title" | "content" | "reading_duration" | "topic_id" | "media_id" | "image" | "link" | "format"
    >

    console.log("🚀 ~ file: ModifyArticle.tsx:23 ~ data:", data)
    setIsLoading(true)
    await updateArticle(articleData.id, data)
    setIsLoading(false)
    await router.replace("/admin")
    onSuccess()
  }

  useEffect(() => {
    getTopics().then((topics) => setTopicsList(topics))
    getMedias().then((medias) => setMediasList(medias))
  }, [])

  return (
    <div>
      {isLoading && <img height={900} src="https://media.tenor.com/cIAvGYJ6NrAAAAAj/cargando.gif" alt="loading" />}
      <form onSubmit={handleSubmit}>
        <label>Titre</label>
        <input defaultValue={articleData.title} disabled={!isModify} type="text" name={"title"} />
        <label>Contenu</label>
        <textarea defaultValue={articleData.content || ""} disabled={!isModify} name={"content"} />
        <label>Durée de lecture</label>
        <input
          type="number"
          disabled={!isModify}
          defaultValue={articleData.reading_duration}
          name={"reading_duration"}
        />
        <label>Changer de topic</label>
        <select name="topic" disabled={!isModify}>
          {topicsList && topicsList.length > 0
            ? topicsList.map((topic) => {
                return (
                  <option selected={topic.id === articleData.topic_id} value={topic.id} key={topic.id}>
                    {topic.title}
                  </option>
                )
              })
            : null}
        </select>
        <label>Changer de média</label>
        <select name={"media_name"} disabled={!isModify}>
          {mediasList && mediasList.length > 0
            ? mediasList.map((media, index) => {
                return (
                  <option value={media.id} key={index} selected={media.id === articleData.media_id}>
                    {media.title}
                  </option>
                )
              })
            : null}
        </select>
        <label>{"Lien de l'article"}</label>
        <input type="text" name="link" disabled={!isModify} defaultValue={articleData.link} />
        <label>{"Lien de l'image"}</label>
        <input type="text" name={"image"} disabled={!isModify} defaultValue={articleData.image || ""} />
        {/*<label>Changer de fichier audio</label>*/}
        {/*<input type="file" accept=".mp3,audio/*" disabled={!isModify} name={"audio"} defaultValue={articleData.audio}/>*/}
        <label>Changer de format</label>
        <select name={"format"} disabled={!isModify}>
          {Format
            ? Object.keys(Format).map((format) => {
                return (
                  <option key={format} value={format} selected={format === articleData.format}>
                    {format}
                  </option>
                )
              })
            : null}
        </select>
        <button type="submit">enregistrer les modifications</button>
      </form>
    </div>
  )
}

export default ModifyArticle
