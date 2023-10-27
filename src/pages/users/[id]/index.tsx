import TopicCard from "@/components/Cards/TopicCard/TopicCard";
import ModalBurger from "@/components/Modal/ModalBurger";
import styles from "@/components/feed/feed.module.scss";
import useTheme from "@/hooks/useTheme";
import useTopic from "@/hooks/useTopic";
import useUser from "@/hooks/useUser";
import { SavedArticlePayload, TopicThemeArticlePayload } from "@/types";
import { Article, Prisma, User } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header/header";

export default function User() {
  const [timeRemaining, setTimeRemaining] = useState("...");
  const [topicsList, setTopicsList] = useState<TopicThemeArticlePayload[] | null>(null);
  const [savedArticles, setSavedArticles] = useState<SavedArticlePayload[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const router = useRouter();
  const id = router.query.id as string;
  const { getSavedArticles, currentUser } = useUser();
  const { getTopicsByThemes } = useTopic();

  function getCurrentDay() {
    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    return daysOfWeek[currentDay];
  }

  function getTimeRemainingUntilNextDay() {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(now.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    const timeDifference = nextDay.getTime() - now.getTime();

    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  }

  function padZero(number: number) {
    return number.toString().padStart(2, "0");
  }

  useEffect(() => {
    if (!id) {
      return;
    }

    getTopicsByThemes(id)
      .then((topics) => topics && setTopicsList(topics))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemainingUntilNextDay());
    }, 1000);

    getSavedArticles(id)
      .then((articles) => {
        if (articles) {
          setSavedArticles(articles);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <Header id={id} />
      <div className={styles.main}>
        <div className={styles.containerEmptyNav}></div>
        <h1 className={styles.title}>
          sélection du <span>{getCurrentDay()}</span>
        </h1>
        <label className={styles.labelTitle}>Nouveaux sujets dans {timeRemaining} </label>
        <div className={styles.containerTopicsList}>
          {topicsList && topicsList.length > 0
            ? topicsList.map((topic, index) => {
                return (
                  <div style={{ paddingBottom: 20 }} key={index}>
                    <TopicCard topic={topic} isTopicPage={false} />
                  </div>
                );
              })
            : null}
        </div>
        {topicsList && topicsList.length > 0 && (
          <ModalBurger
            isModalOpen={isModalOpen}
            topics={topicsList}
            onCloseModal={() => setIsModalOpen(false)}
            savedArticlesLength={savedArticles ? savedArticles.length : 0}
            userId={id}
          />
        )}
      </div>
    </>
  );
}
