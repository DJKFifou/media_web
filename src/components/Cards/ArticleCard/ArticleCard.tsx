import { Article } from "@prisma/client";
import Link from "next/link";

export default function ArticleCard({article} : {article: Article}){
  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      {article.image ? (
        //TODO: import article image's into BDD
        <image href={article.image} />
      ) : null}
      <Link href={article.link}>{article.title}</Link>
      <button>{'Enregistrer l\'article'}</button>
    </div>
  )
}
