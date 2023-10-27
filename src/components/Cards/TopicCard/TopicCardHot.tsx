import styles from "@/components/feed/feed.module.scss";
import Link from "next/link";
import { TopicThemeArticlePayload } from "@/types";
import { useRouter } from "next/router";

export default function TopicCardHot({topic}: {topic: TopicThemeArticlePayload}){
  const router = useRouter();
  const userId = router.query.id as string
  return (
    <Link href={`/users/${userId}/topic/${topic.id}`} className={styles.containerHotNews} >
      <div className={styles.titleHotNews}>
        <img src="/assets/fire.svg" alt="Image de l'actu Hot" />
        <h3>l’actu du jour</h3>
        <img src="/assets/fire.svg" alt="Image de l'actu Hot" />
      </div>
      <h4 className={styles.textHotNews}>{topic.title}</h4>
    </Link>
  )
}
