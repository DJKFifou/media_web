import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Article } from "@prisma/client";
import useUser from "@/hooks/useUser";
import ArticleCard from "@/components/Cards/ArticleCard/ArticleCard";

export default function SaveArticles(){
  const router = useRouter()
  const {getSaveArticle} = useUser()
  const userId = router.query.id as string;

  const [saveArticles, setSaveArticles] = useState<Article[] | null>(null);
  useEffect(() => {
    getSaveArticle(userId).then((saveArticles) => setSaveArticles(saveArticles))
  }, []);

  return (
    <div>
      <Link href={`/users/${userId}/`}>Retour</Link>
      <h1>Articles sauvegardés</h1>
      {saveArticles && saveArticles.length > 0 ? (
        saveArticles.map((article, index) => {
          return (
            <div key={index}>
              <ArticleCard article={article} />
            </div>
          )
        })
      ) : null}
    </div>
  )
}
