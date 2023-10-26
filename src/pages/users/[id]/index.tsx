import { User } from ".prisma/client";
import Layout from "@/components/user/layout";
import useUser from "@/hooks/useUser";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {Topic} from "@prisma/client";
import useTopic from "@/hooks/useTopic";
import useTheme from "@/hooks/useTheme";
import styles from "@/components/feed/feed.module.scss";
import TopicCard from "@/components/Cards/TopicCard/TopicCard";

export default function User() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [topicsList, setTopicsList] = useState<Topic[] | null>(null);
  const router = useRouter();
  const id = router.query.id as string;
  const { getUser } = useUser();
  const {getTopicsByThemes} = useTopic()
  const {getTheme} = useTheme()

  const title = () => {
    const article_frequency = currentUser?.article_frequency
    const today = dayjs(); //TODO: dayjs in french
    const dayString = today.format("dddd");
    const monthString = today.format("MMMM")
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
    const daysOfWeek = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi"
    ];
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    return daysOfWeek[currentDay];
  }

  function getNextArticles() {
    
  }

  useEffect(() => {
    getUser(id).then((user) => {
      setCurrentUser(user);
    });
    getTopicsByThemes(id).then((topics) => setTopicsList(topics));
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
        <h1 className={styles.title}>sélection du {getCurrentDay()}</h1>
        <label className={styles.labelTitle}>Nouveaux sujets dans {getNextArticles()} </label>
        <p>{title()}</p>
        <div className={styles.topicsList}>
          {topicsList && topicsList.length > 0 ? (
            topicsList.map( (topic, index) => {
              return (
                <div style={{paddingBottom: 20}} key={index}>
                  <TopicCard topic={topic}/>
                </div>
              )
            })
          ) : null}
        </div>
        <div className={styles.bottomNav}>
          <Layout userId={id} />
        </div>
      </div>
    </>
  );
}