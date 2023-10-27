import { TopicThemeArticlePayload } from "@/types";

export default function useTopic() {
  async function createTopic(body: any) {
    try {
      await fetch("/api/topics/createTopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function getTopics() {
    try {
      const topics = await fetch("/api/topics/getTopics");
      return await topics.json();
    } catch (e) {
      console.error(e);
    }
  }

  async function getTopic(id: string) {
    try {
      const topic = await fetch(`/api/topics/getTopic?id=${id}`);
      return await topic.json();
    } catch (e) {
      console.error(e);
    }
  }

  async function updateTopic(id: string, body: any) {
    try {
      await fetch("/api/topics/updateTopic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, topic: body }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteTopic(id: string) {
    try {
      await fetch(`/api/topics/deleteTopic?id=${id}`);
    } catch (e) {
      console.error(e);
    }
  }

  async function getTopicsByThemes(userId: string) {
    try {
      const topics = await fetch(`/api/topics/getTopicsByThemes?userId=${userId}`);
      const result = await topics.json();
      return result as TopicThemeArticlePayload[];
    } catch (e) {
      console.error(e);
    }
  }

  return { createTopic, getTopics, getTopic, updateTopic, deleteTopic, getTopicsByThemes };
}
