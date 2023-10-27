import ArticleCard from "@/components/Cards/ArticleCard/ArticleCard";
import { Article } from "@prisma/client";
import { useRouter } from "next/router";
import { SavedArticlePayload, TopicThemeArticlePayload } from "@/types";
import styles from "@/components/feed/feed.module.scss";
import OneButton from "@/components/Buttons/OneButton/OneButton.component";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";

export default function TopicCard({
  topic,
  isTopicPage
}: {
  topic: TopicThemeArticlePayload;
  isTopicPage: boolean
}) {
  const router = useRouter();
  const { getSavedArticles } = useUser();
  const userId = router.query.id as string
  const [savedArticles, setSavedArticles] = useState<SavedArticlePayload[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [turnOff, setTurnOff] = useState(true);
  function getFirstThreeElements(arr: Article[]) {
    return arr.slice(0, 3);
  }
  const articleList = isTopicPage ? getFirstThreeElements(topic.articles) : topic.articles
  const containerArticles = () => {
    setIsVisible(!isVisible);
    setTurnOff(!turnOff);
  };
  function isOdd(number: number) {
    return number % 2 !== 0;
  }

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
      {/*{topic.is_hot ? (*/}
      {/*  <TopicCardHot topic={topic} />*/}
      {/*) : (*/}
        <div className={styles.containerTopicsList}>
          <button className={styles.contentTopic} onClick={containerArticles}>
            <div>
              <h4>{topic.theme.slug}</h4>
              <img src="/assets/arrowContainerArticlesList.svg" alt="" style={{ transform: turnOff ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            <img className={styles.loopedArrow} src="/assets/loopedArrow.svg" alt="" />
          </button>
          <div className={styles.containerTitleTimer}>
            <h2>{topic.title}</h2>
            {topic.audio ? (
              <OneButton title="00:35" img="/assets/play.svg" alt="Bouton de lecture" audioLink={topic.audio} />
            ) : null}
          </div>
          <p className={styles.textHat}>{topic.introduction_text}</p>
          <div id="containerArticles" className={styles.containerArticles} style={{ display: isVisible ? 'block' : 'none' }}>
            <h3 className={styles.titleLastArticles}>les derniers articles<img src="/assets/iconBarTitle.svg" alt="" /></h3>
            {articleList.length > 0 ? (
              articleList.map((article, index) => {
                const isSaveArticle = savedArticles.some(saveArticle => saveArticle.id === article.id)
                return(
                  <ArticleCard article={article} key={index} isSaveArticle={isSaveArticle} />
                )
              })
            ) : null}
          </div>
          {!isTopicPage ? (
            <PrimaryButton title="Voir les articles" onClick={() => router.push(`/users/${userId}/topic/${topic.id}`)}/>
          ) : null }
        </div>
      {/*)}*/}
    </div>
  );
}
