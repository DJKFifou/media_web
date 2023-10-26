import { Article } from "@prisma/client";
import Link from "next/link";
import useArticle from "@/hooks/useArticle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ArticleCard({ article }: { article: Article }) {
  const { saveArticle, checkIsArticleSaved } = useArticle();
  const router = useRouter();
  const userId = router.query.id as string;
  const [isSave, setIsSave] = useState<boolean>(false);

  async function getArticleStatus() {
    const status = await checkIsArticleSaved(article.id, userId);
    setIsSave(status);
  }

  useEffect(() => {
    getArticleStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {article.image ? (
        //TODO: import article image's into BDD
        <image href={article.image} />
      ) : null}
      <Link href={article.link}>{article.title}</Link>
      <button type="button" onClick={() => saveArticle(article.id, userId)}>
        {isSave ? "Retirer l'article" : "Enregistrer l'article"}
      </button>
    </div>
  );
}
