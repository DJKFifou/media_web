import { Article } from "@prisma/client";
import Link from "next/link";
import useArticle from "@/hooks/useArticle";
import { useRouter } from "next/router";

export default function ArticleCard({article} : {article: Article}){
  const {saveArticle} = useArticle();
  const router = useRouter()
  const userId = router.query.id as string;

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      {article.image ? (
        //TODO: import article image's into BDD
        <image href={article.image} />
      ) : null}
      <Link href={article.link}>{article.title}</Link>
      <button onClick={() => saveArticle(article.id, userId)}>{'Enregistrer l\'article'}</button>
    </div>
  )
}
