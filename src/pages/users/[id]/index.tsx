import OneButton from "@/components/Buttons/OneButton/OneButton.component";
import TopicCard from "@/components/Cards/TopicCard/TopicCard";
import Footer from "@/components/Footer/footer";
import Header from "@/components/Header/header";
import styles from "@/components/feed/feed.module.scss";
import useTopic from "@/hooks/useTopic";
import { TopicThemeArticlePayload } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";

export default function User() {
  const {logOut} = useAuth()
  const [topicsList, setTopicsList] = useState<TopicThemeArticlePayload[]>([]);
  const [timeRemaining, setTimeRemaining] = useState("...");
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
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemainingUntilNextDay());
    }, 1000);
    getTopicsByThemes(id)
    .then((topics) => topics && setTopicsList(topics))
    .catch((err) => console.log(err));
    clearInterval(interval);
  }, []);

  async function onLogOut(){
    try{
      await logOut().then(() => {
        router.replace('/login')
      })
    }catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <Header id={id} />
      <div className={styles.main}>
        <div className={styles.containerEmptyNav}></div>
        <h1 className={styles.title}>sélection du {getCurrentDay()}</h1>
        <h5 className={styles.subTitle}>Nouveaux sujets dans {timeRemaining}</h5>
        <div className={styles.containerOneButton}>
          <a
            target="_blank"
            href="https://pub-9ad95f0fa0634c2792ac941e97a2ed8c.r2.dev/active-users-widget-bucket/avatars/recap.mp3"
          >
            <OneButton title="le récap en 5 min " img="/assets/play.svg" alt="Bouton de lecture" />
          </a>
          <button onClick={() => onLogOut()}>deconnexion</button>
        </div>
        {topicsList && topicsList.length > 0
          ? topicsList.map((topic, index) => {
              const hasArticle = topic.articles && topic.articles.length > 0 ? true : false;
              return hasArticle ? (
                <div key={index} style={{ borderTop: "solid", borderTopWidth: 2 }}>
                  <TopicCard topic={topic} isTopicPage={false} />
                </div>
              ) : null;
            })
          : null}
        <Footer />
      </div>
    </>
  );
}