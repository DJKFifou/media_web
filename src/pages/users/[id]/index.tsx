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
import styles from "@/components/feed/feed.module.scss";
import OneButton from "@/components/Buttons/OneButton/OneButton.component";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import ArticleCard from "@/components/Cards/ArticleCard/ArticleCard";

type Topics = Prisma.TopicGetPayload<{ include: { articles: true; theme: true } }>[];
export default function User() {
  const [timeRemaining, setTimeRemaining] = useState("...");
  const [topicsList, setTopicsList] = useState<TopicThemeArticlePayload[] | null>(null);
  const [savedArticles, setSavedArticles] = useState<SavedArticlePayload[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

export default function User() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [topicsList, setTopicsList] = useState<Topics>([]);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemainingUntilNextDay());
  const [isVisible, setIsVisible] = useState(true);
  const [turnOff, setTurnOff] = useState(true);
  const router = useRouter();
  const id = router.query.id as string;
  const { getSavedArticles, currentUser } = useUser();
  const { getTopicsByThemes } = useTopic();

  const title = () => {
    const article_frequency = currentUser?.db.article_frequency;
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

    const timeDifference = nextDay.getTime() - now.getTime();

    const hours = Math.floor(timeDifference / 3600000);
    const minutes = Math.floor((timeDifference % 3600000) / 60000);
    const seconds = Math.floor((timeDifference % 60000) / 1000);

    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  }

  function padZero(number: number) {
    return number.toString().padStart(2, "0");
  }

  const containerArticles = () => {
    setIsVisible(!isVisible);
    setTurnOff(!turnOff);
  };

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

  const firstArticle = {
    title: "Emmanuel Macron surprend en proposant de mobiliser la coalition internationale contre l’EI pour - lutter contre le Hamas",
    image: "/assets/exempleImage.png",
    link: "",
    label: "Nom du média"
  };
  const secondArticle = {
    title: "Comment un libéral peut penser la guerre israélo-palestinienne ?",
    link: "",
    label: "Nom du média"
  };
  const thirdArticle = {
    title: "Article réservé à nos abonnés « Nous sommes pour un cessez-le-feu immédiat ! Pour la libération des otages ! »",
    link: "",
    label: "Nom du média"
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <img src="/assets/burgerMenu.svg" alt="" />
          <img src="/assets/logo.svg" alt="" />
          <Link href={`/users/${id}/parameters`}>
            <img src="/assets/settings.svg" alt="" />
          </Link>
        </nav>
      </header>
      <div className={styles.main}>
        {/* <h1>{`Bienvenue ${currentUser?.user_name}`}</h1> */}
        <div className={styles.containerEmptyNav}></div>
        <h1 className={styles.title}>sélection du {getCurrentDay()}</h1>
        <h5 className={styles.subTitle}>Nouveaux sujets dans {timeRemaining}</h5>
        <div className={styles.containerOneButton}>
          <OneButton title="le récap en 5 min " img="/assets/play.svg" alt="Bouton de lecture" />
        </div>
        <Link href="" className={styles.containerHotNews} >
          <div className={styles.titleHotNews}>
            <img src="/assets/fire.svg" alt="Image de l'actu Hot" />
            <h3>l’actu du jour</h3>
            <img src="/assets/fire.svg" alt="Image de l'actu Hot" />
          </div>
          <h4 className={styles.textHotNews}>L'expulsion de Tchétchènes "dangereux": un retour à une politique ancienne</h4>
        </Link>
        <div className={styles.containerTopicsList}>
          <button className={styles.contentTopic} onClick={containerArticles}>
            <div>
              <h4>International</h4>
              <img src="/assets/arrowContainerArticlesList.svg" alt="" style={{ transform: turnOff ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </div>
            <img className={styles.loopedArrow} src="/assets/loopedArrow.svg" alt="" />
          </button>
          <div className={styles.containerTitleTimer}>
            <h2>guerre israélo-palestienienne</h2>
            <OneButton title="00:35" img="/assets/play.svg" alt="Bouton de lecture" />
          </div>
          <p className={styles.textHat}>Le conflit israélo-palestinien oppose depuis 1948 Israël et les Palestiniens pour le contrôle de la terre historique de Palestine, menant à de nombreux affrontements armés et tentatives de paix sans succès.</p>
          <div id="containerArticles" className={styles.containerArticles} style={{ display: isVisible ? 'block' : 'none' }}>
            <h3 className={styles.titleLastArticles}>les derniers articles<img src="/assets/iconBarTitle.svg" alt="" /></h3>
            <ArticleCard article={firstArticle} />
            <ArticleCard article={secondArticle} />
            <ArticleCard article={thirdArticle} />
          </div>
          <PrimaryButton title="Voir les articles" />
        </div>
        <p>{title()}</p>
        <div>
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
        <Layout userId={id} />
        <footer className={styles.footer}>
            <img src="/assets/logo.svg" alt="" />
            <h2 className={styles.titleFooter}>Quand choisir devient son petit plaisir</h2>
            <div className={styles.containerSocial}>
              <img src="/assets/instagram.svg" alt="" />
              <img src="/assets/tiktok.svg" alt="" />
              <img src="/assets/youtube.svg" alt="" />
            </div>
            <p className={styles.textFooter}>Cette plateforme a été réalisée dans le cadre d’un projet étudiant en 3ème année d’un BUT Métiers du Multimédia et de l’Internet de l’Université Bordeaux Montaigne.</p>
            <div className={styles.containerLinks}>
              <h5><a href="/mentions-legales">Mentions légales</a></h5>
              <h5><a href="/CGu">Conditions générales d’utilisation</a></h5>
              <h5><a href="/cookies">Gestion des cookies</a></h5>
              <h5><a href="/contact">Contact</a></h5>
            </div>
        </footer>
      </div>
    </>
  );
}
