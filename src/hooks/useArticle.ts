import { Article } from "@prisma/client"

export default function useArticle() {
  async function getArticle(id: string) {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      return await response.json()
    } catch (e) {
      console.error(e)
    }
  }

  async function updateArticle(id: string, article: Pick<Article, "title" | "content" | "reading_duration">) {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: article.title,
          content: article.content,
          reading_duration: article.reading_duration,
        }),
      })
    } catch (e) {
      console.error(e)
    }
  }

  async function getArticles() {
    try {
      const data = await fetch("/api/articles")
      return await data.json()
    } catch (e) {
      console.error(e)
    }
  }

  return { getArticle, updateArticle, getArticles }
}
