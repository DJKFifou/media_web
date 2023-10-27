import useArticle from "@/hooks/useArticle";
import { Article } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ModifyArticle from "@/components/admin/articles/ModifyArticle";
import { useCallback } from "react";

export default function Article() {
  const router = useRouter();
  const { getArticle } = useArticle();
  const articleId = router.query.id;
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [isModify, setIsModify] = useState<boolean>(false);

  const loadArticle = useCallback(async () => {
    if (articleId && typeof articleId === "string") {
      const a = await getArticle(articleId);
      setCurrentArticle(a);
    }
  }, [articleId, getArticle]);

  useEffect(() => {
    loadArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  return (
    <div>
      <Link href="/admin">Retour</Link>
      {currentArticle !== null ? (
        <ModifyArticle isModify={isModify} articleData={currentArticle} onSuccess={loadArticle} />
      ) : null}
      <button type="button" onClick={() => setIsModify(!isModify)}>
        {isModify ? "Mode visualisation" : "Mode édition"}
      </button>
      <button type="button">Supprimer</button>
    </div>
  );
}
