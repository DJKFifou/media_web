import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TopicThemeArticlePayload } from "@/types";
import useTopic from "@/hooks/useTopic";
import TopicCard from "@/components/Cards/TopicCard/TopicCard";
import Header from "@/components/Header/header";
import BackButton from "@/components/Buttons/BackButton/BackButton.component";
import styles from "@/components/feed/feed.module.scss";
import Footer from "@/components/Footer/footer";

export default function Topic() {
  const router = useRouter();
  const { getTopic } = useTopic();
  const topicId = router.query.topicId as string;
  const userId = router.query.id as string;
  const [topic, setTopic] = useState<TopicThemeArticlePayload | null>(null);

  useEffect(() => {
    getTopic(topicId).then((topic : TopicThemeArticlePayload) => {
      setTopic(topic)
    }).catch((e) => console.log(e));
  }, [topicId]);

  return (
    <div className={styles.main}>
      <Header id={userId} />
      <div style={{paddingTop: 80, paddingBottom: 80, paddingLeft: 20}}>
        <BackButton />
      </div>
      {topic ? (
        <TopicCard topic={topic} isTopicPage={true} />
      ) : null}
      <Footer />
    </div>
  );
}
