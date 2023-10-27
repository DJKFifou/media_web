import ArticleCard from "@/components/Cards/ArticleCard/ArticleCard";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { SavedArticlePayload } from "@/types";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SavedArticles() {
  const router = useRouter();
  const { getSavedArticles } = useUser();
  const userId = router.query.id as string;
  const [savedArticles, setSavedArticles] = useState<SavedArticlePayload[]>([]);

  useEffect(() => {
    (async () => {
      if (userId) {
        const result = await getSavedArticles(userId);
        console.log("🚀 ~ file: index.tsx:20 ~ result:", result);

        if (result) {
          setSavedArticles(result);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <div>
      <Link href={`/users/${userId}/`}>Retour</Link>
      <h1>Articles sauvegardés</h1>
      {savedArticles &&
        savedArticles.length > 0 &&
        savedArticles.map((article, index) => {
          return (
            <div key={index}>
              <ArticleCard article={article} />
            </div>
          );
        })}
    </div>
  );
}
