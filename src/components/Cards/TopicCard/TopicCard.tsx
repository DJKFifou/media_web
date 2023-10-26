import ArticleCard from "@/components/Cards/ArticleCard/ArticleCard";
import { Article, Prisma, Topic } from "@prisma/client";

export default function TopicCard({
  topic,
}: {
  topic: Prisma.TopicGetPayload<{ include: { articles: true; theme: true } }>;
}) {
  return (
    <div>
      <h2>{topic.theme.title}</h2>
      <h3>{topic.title}</h3>
      <p>{topic.introduction_text}</p>
      <p>DERNIER ARTICLES</p>
      {topic.articles.length > 0
        ? topic.articles.map((article: Article, index: number) => {
            return (
              <div key={index} style={{ paddingBottom: 20 }}>
                <ArticleCard article={article} />
              </div>
            );
          })
        : null}
    </div>
  );
}
