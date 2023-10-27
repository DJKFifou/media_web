import useTopic from "@/hooks/useTopic";
import useUser from "@/hooks/useUser";
import { SavedArticlePayload, TopicThemeArticlePayload } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/Header/header";
import styles from "@/components/feed/feed.module.scss";
import OneButton from "@/components/Buttons/OneButton/OneButton.component";
import TopicCard from "@/components/Cards/TopicCard/TopicCard";
import Footer from "@/components/Footer/footer";

export default function User() {
  const [topicsList, setTopicsList] = useState<TopicThemeArticlePayload[]>([]);
  const [timeRemaining, setTimeRemaining] = useState("...");
  const [isVisible, setIsVisible] = useState(true);
  const [turnOff, setTurnOff] = useState(true);
  const router = useRouter();
  const id = router.query.id as string;
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
        <h1 className={styles.title}>sélection du {getCurrentDay()}</h1>
        <h5 className={styles.subTitle}>Nouveaux sujets dans {timeRemaining}</h5>
        <div className={styles.containerOneButton}>
          <OneButton title="le récap en 5 min " img="/assets/play.svg" alt="Bouton de lecture" />
        </div>
        {topicsList && topicsList.length > 0 ? (
          topicsList.map((topic, index) => {
            const hasArticle = topic.articles.length > 0 ? true : false;
            console.log(hasArticle, 'hasArticle')
            return (
              hasArticle ? (
                <div key={index} style={{ borderTop: "solid", borderTopWidth: 2  }}>
                  <TopicCard topic={topic} isTopicPage={false} />
                </div>
              ) : null
            );
          })
        ) : null}
        <Footer />
      </div>
    </>
  );
}
