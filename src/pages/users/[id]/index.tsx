import { User } from ".prisma/client";
import Layout from "@/components/user/layout";
import useUser from "@/hooks/useUser";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Article, Topic } from "@prisma/client";
import useTopic from "@/hooks/useTopic";
import TopicCard from "@/components/Cards/TopicCard/TopicCard";
import ModalBurger from "@/components/Modal/ModalBurger";
import { TopicThemeArticlePayload } from "@/types";


export default function User() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [topicsList, setTopicsList] = useState<TopicThemeArticlePayload[] | null>(null);
  const [saveArticles, setSaveArticles] = useState<Article[] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const id = router.query.id as string;
  const { getUser, getSaveArticle } = useUser();
  const {getTopicsByThemes} = useTopic()

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

  useEffect(() => {
    getUser(id).then((user) => {
      setCurrentUser(user);
    });
    getTopicsByThemes(id).then((topics) => setTopicsList(topics));
    getSaveArticle(id).then((saveArticles) => setSaveArticles(saveArticles))
  }, [id]);


  return (
    <Layout userId={id}>
      <button onClick={() => setIsModalOpen(true)}>Menu burger</button>
      <h1>{`Bienvenue ${currentUser?.user_name}`}</h1>
      <p>{title()}</p>
      <Link href={`/users/${id}/parameters`}>Mes Parametres</Link>
      {topicsList && topicsList.length > 0 ? (
        topicsList.map( (topic, index) => {
          return (
            <div style={{paddingBottom: 20}} key={index}>
              <TopicCard topic={topic}/>
            </div>
          )
        })
      ) : null}
      <ModalBurger
        isModalOpen={isModalOpen}
        topics={topicsList}
        onCloseModal={() => setIsModalOpen(false)}
        saveArticlesLength={saveArticles ? saveArticles.length : 0}
        userId={id}
      />
    </Layout>
  );
}
