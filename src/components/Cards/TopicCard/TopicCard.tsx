import ArticleCard from "@/components/Cards/ArticleCard/ArticleCard";
import { Article, Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { TopicThemeArticlePayload } from "@/types";
import styles from "@/components/feed/feed.module.scss";
import OneButton from "@/components/Buttons/OneButton/OneButton.component";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import { useState } from "react";

export default function TopicCard({
  topic,
  isTopicPage
}: {
  topic: TopicThemeArticlePayload;
  isTopicPage: boolean
}) {
  const router = useRouter();
  const userId = router.query.id
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
  return (
    <div>
      {topic.is_hot ? (
        <Link href="" className={styles.containerHotNews} >
          <div className={styles.titleHotNews}>
            <img src="/assets/fire.svg" alt="Image de l'actu Hot" />
            <h3>l’actu du jour</h3>
            <img src="/assets/fire.svg" alt="Image de l'actu Hot" />
          </div>
          <h4 className={styles.textHotNews}>{topic.title}</h4>
        </Link>
      ) : (
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
            <OneButton title="00:35" img="/assets/play.svg" alt="Bouton de lecture" />
          </div>
          <p className={styles.textHat}>{topic.introduction_text}</p>
          <div id="containerArticles" className={styles.containerArticles} style={{ display: isVisible ? 'block' : 'none' }}>
            <h3 className={styles.titleLastArticles}>les derniers articles<img src="/assets/iconBarTitle.svg" alt="" /></h3>
            {articleList.length > 0 ? (
              articleList.map((article, index) => {
                return(
                  <ArticleCard article={article} key={index} />
                )
              })
            ) : null}
          </div>
          {!isTopicPage ? (
            <PrimaryButton title="Voir les articles" onClick={() => router.push(`/users/${userId}/topic/${topic.id}`)}/>
          ) : null }
        </div>
      )}
    </div>
  );
}
