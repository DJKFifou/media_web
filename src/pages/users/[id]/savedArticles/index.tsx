import ArticleCard from "@/components/Cards/ArticleCard/ArticleCard";
import useUser from "@/hooks/useUser";
import { SavedArticlePayload } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/components/feed/feed.module.scss";
import BackButton from "@/components/Buttons/BackButton/BackButton.component";
import Header from "@/components/Header/header";


export default function SavedArticles() {
  const router = useRouter();
  const { getSavedArticles } = useUser();
  const userId = router.query.id as string;
  const [savedArticles, setSavedArticles] = useState<SavedArticlePayload[]>([]);

  useEffect(() => {
    getSavedArticles(userId)
      .then((articles) => {
        if (articles) {
          setSavedArticles(articles);
        }
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <div>
      <Header id={userId} />
      <div className={styles.main} style={{ paddingBottom: 20, paddingTop: 80, paddingLeft: 20, paddingRight: 20 }}>
        <BackButton />
        <h1 className={styles.title}>Articles sauvegardés</h1>
        {savedArticles &&
          savedArticles.length > 0 &&
          savedArticles.map((article, index) => {
            return (
              <div key={index}>
                <ArticleCard article={article} isSaveArticle={true}/>
              </div>
            );
          })}
      </div>
    </div>
  );
}
