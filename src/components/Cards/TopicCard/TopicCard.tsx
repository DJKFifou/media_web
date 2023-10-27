import ArticleCard from "@/components/Cards/ArticleCard/ArticleCard";
import { Article, Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { TopicThemeArticlePayload } from "@/types";

export default function TopicCard({
  topic,
  isTopicPage
}: {
  topic: TopicThemeArticlePayload;
  isTopicPage: boolean
}) {
  const router = useRouter();
  const userId = router.query.id
  function getFirstThreeElements(arr: Article[]) {
    return arr.slice(0, 3);
  }
  const articleList = topic.articles.length > 4 ? getFirstThreeElements(topic.articles) : topic.articles

  return (
    <div>
      <h2>{topic.theme.title}</h2>
      <h3>{topic.title}</h3>
      <p>{topic.introduction_text}</p>
      {!isTopicPage ? (
        <p>DERNIER ARTICLES</p>
      ) : null}
      {articleList.length > 0
        ? articleList.map((article: Article, index: number) => {
            return (
              <div key={index} style={{ paddingBottom: 20 }}>
                <ArticleCard article={article} />
              </div>
            );
          })
        : null}
      {!isTopicPage ? (
        <Link href={`/users/${userId}/topic/${topic.id}`}>Voir les articles</Link>
      ) : null}
    </div>
  );
}
