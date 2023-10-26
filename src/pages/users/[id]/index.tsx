import TopicCard from "@/components/Cards/TopicCard/TopicCard";
import ModalBurger from "@/components/Modal/ModalBurger";
import styles from "@/components/feed/feed.module.scss";
import useTheme from "@/hooks/useTheme";
import useTopic from "@/hooks/useTopic";
import useUser from "@/hooks/useUser";
import { Article, Prisma, User } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Topics = Prisma.TopicGetPayload<{ include: { articles: true; theme: true } }>[];
export default function User() {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemainingUntilNextDay());
  const { getTheme } = useTheme();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [topicsList, setTopicsList] = useState<Topics[] | null>(null);
  const [saveArticles, setSaveArticles] = useState<Article[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const id = router.query.id as string;
  const { getUser, getSaveArticle } = useUser();
  const { getTopicsByThemes } = useTopic();

  const title = () => {
    const article_frequency = currentUser?.article_frequency;
    const today = dayjs();
    const dayString = today.format("dddd");
    const monthString = today.format("MMMM");
    switch (article_frequency) {
      case "DAY":
        return `Selection du ${dayString}`;
      case "WEEK":
        return "Selection de la semaine";
      case "MONTH":
        return `Selection du ${monthString}`;
    }
  };
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

    const timeDifference = nextDay - now;

    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  }

  function padZero(number) {
    return number.toString().padStart(2, "0");
  }

  useEffect(() => {
    getUser(id).then((user) => {
      if (user) setCurrentUser(user);
    });
    getTopicsByThemes(id).then((topics) => setTopicsList(topics));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemainingUntilNextDay());
    }, 1000);

    getSaveArticle(id).then((saveArticles) => setSaveArticles(saveArticles));
    return () => {
      clearInterval(interval);
    };
  }, [id]);

  return (
    <>
      <div className={styles.header}>
        <nav className={styles.navigation}>
          <img src="/assets/burgerMenu.svg" alt="" />
          <img src="/assets/logo.svg" alt="" />
          <Link href={`/users/${id}/parameters`}>
            <img src="/assets/settings.svg" alt="" />
          </Link>
        </nav>
      </div>
      <div className={styles.main}>
        {/* <h1>{`Bienvenue ${currentUser?.user_name}`}</h1> */}
        <div className={styles.containerEmptyNav}></div>
        <h1 className={styles.title}>sélection du {getCurrentDay()}</h1>
        <label className={styles.labelTitle}>Nouveaux sujets dans {timeRemaining} </label>
        <p>{title()}</p>
        <div className={styles.containerTopicsList}>
          {topicsList && topicsList.length > 0
            ? topicsList.map((topic, index) => {
                return (
                  <div style={{ paddingBottom: 20 }} key={index}>
                    {/* @todo */}
                    <TopicCard topic={topic} />
                  </div>
                );
              })
            : null}
        </div>
        <ModalBurger
          isModalOpen={isModalOpen}
          topics={topicsList}
          onCloseModal={() => setIsModalOpen(false)}
          saveArticlesLength={saveArticles ? saveArticles.length : 0}
          userId={id}
        />
      </div>
    </>
  );
}
