import { Article } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";

export default function useArticle() {
  async function getArticle(id: string) {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  async function updateArticle(
    id: string,
    article: Pick<
      Article,
      "title" | "content" | "reading_duration" | "topic_id" | "media_id" | "image" | "link" | "format"
    >
  ) {
    try {
      await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: article.title,
          content: article.content,
          reading_duration: article.reading_duration,
          topic: article.topic_id,
          media_name: article.media_id,
          image: article.image,
          link: article.link,
          format: article.format,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function getArticles() {
    try {
      const data = await fetch("/api/articles");
      return await data.json();
    } catch (e) {
      console.error(e);
    }
  }

  async function getArticlesByTopicId(topicId: string) {
    try {
      const articles = await fetch(`/api/articles/getArticlesByTopic?topicId=${topicId}`);
      return await articles.json();
    } catch (e) {
      console.error(e);
    }
  }

  async function saveArticle(articleId: string, userId: string){
    try{
      await fetcher({url: `/api/articles/${articleId}/saveArticle`, method: 'POST', body:{userId: userId}})
    }catch (e) {
      console.error(e)
    }
  }

  return { getArticle, updateArticle, getArticles, getArticlesByTopicId, saveArticle };
}
