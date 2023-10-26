import { Article } from "@prisma/client";
import Link from "next/link";
import useArticle from "@/hooks/useArticle";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ArticleCard({ article }: { article: Article }) {
  const { saveArticle, isArticleSave } = useArticle();
  const router = useRouter();
  const userId = router.query.id as string;
  const [isSave, setIsSave] = useState<boolean>(false);
  async function test(){

    const test = await isArticleSave(article.id, userId);
    console.log(test)
    setIsSave(test)
  }

  useEffect(() => {
    test()
  }, []);


  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {article.image ? (
        //TODO: import article image's into BDD
        <image href={article.image} />
      ) : null}
      <Link href={article.link}>{article.title}</Link>
      <button onClick={() => saveArticle(article.id, userId)}>
        {isSave ? "Retirer l'article" : "Enregistrer l'article"}
      </button>
    </div>
  );
}
