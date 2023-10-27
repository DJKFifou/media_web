import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TopicThemeArticlePayload } from "@/types";
import useTopic from "@/hooks/useTopic";
import TopicCard from "@/components/Cards/TopicCard/TopicCard";
import Header from "@/components/Header/header";
import BackButton from "@/components/Buttons/BackButton/BackButton.component";

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
    <div>
      <Header id={userId} />
      <div style={{paddingTop: 80}}>
        <BackButton />
      </div>
      {topic ? (
        <TopicCard topic={topic} isTopicPage={true} />
      ) : null}
    </div>
  );
}
