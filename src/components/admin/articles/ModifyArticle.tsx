/* eslint-disable @next/next/no-img-element */
import useArticle from "@/hooks/useArticle"
import { Article } from "@prisma/client"
import { FormEvent, useState } from "react"

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

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries()) as unknown as Pick<
      Article,
      "title" | "content" | "reading_duration"
    >

    console.log("🚀 ~ file: ModifyArticle.tsx:23 ~ data:", data)
    setIsLoading(true)
    const updatedArticle = await updateArticle(articleData.id, data)
    setIsLoading(false)
    onSuccess()
  }

  return (
    <div>
      {isLoading && <img height={900} src="https://media.tenor.com/cIAvGYJ6NrAAAAAj/cargando.gif" alt="loading" />}
      <form onSubmit={handleSubmit}>
        <label>Titre</label>
        <input defaultValue={articleData.title} disabled={!isModify} type="text" name={"title"} />
        <label>Contenu</label>
        <input defaultValue={articleData.content} disabled={!isModify} type="text" name={"content"} />
        <label>Durée de lecture</label>
        <input
          type="number"
          disabled={!isModify}
          defaultValue={articleData.reading_duration}
          name={"reading_duration"}
        />
        <button type="submit">enregistrer les modifications</button>
      </form>
    </div>
  )
}

export default ModifyArticle
