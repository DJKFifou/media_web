import TopicCard from "@/components/Cards/TopicCard/TopicCard";
import Layout from "@/components/user/layout";
import useTheme from "@/hooks/useTheme";
import useTopic from "@/hooks/useTopic";
import useUser from "@/hooks/useUser";
import { Prisma, User } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Topics = Prisma.TopicGetPayload<{ include: { articles: true; theme: true } }>[];

export default function User() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [topicsList, setTopicsList] = useState<Topics>([]);
  const router = useRouter();
  const id = router.query.id as string;
  const { getUser } = useUser();
  const { getTopicsByThemes } = useTopic();
  const { getTheme } = useTheme();

  const title = () => {
    const article_frequency = currentUser?.article_frequency;
    const today = dayjs(); //TODO: dayjs in french
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

  useEffect(() => {
    getUser(id).then((user) => {
      setCurrentUser(user);
    });
    getTopicsByThemes(id).then((topics) => setTopicsList(topics));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Layout userId={id}>
      <h1>{`Bienvenue ${currentUser?.user_name}`}</h1>
      <p>{title()}</p>
      <Link href={`/users/${id}/parameters`}>Mes Parametres</Link>
      {topicsList && topicsList.length > 0
        ? topicsList.map((topic, index) => {
            return (
              <div style={{ paddingBottom: 20 }} key={index}>
                <TopicCard topic={topic} />
              </div>
            );
          })
        : null}
    </Layout>
  );
}
