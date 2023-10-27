import styles from "@/components/feed/feed.module.scss";
import Link from "next/link";
import ModalBurger from "../Modal/ModalBurger";
import { useEffect, useId, useState } from "react";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import { SavedArticlePayload, TopicThemeArticlePayload } from "@/types";
import useTopic from "@/hooks/useTopic";

export default function Header({ id }: { id: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedArticles, setSavedArticles] = useState<SavedArticlePayload[]>([]);
  const [topicsList, setTopicsList] = useState<TopicThemeArticlePayload[]>([]);
  const { getSavedArticles } = useUser();
  const { getTopicsByThemes } = useTopic();
  const router = useRouter();
  const userId = router.query.id as string;
  const savedArticlesLength = savedArticles.length;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!userId) {
      return;
    }

    console.log({ userId });
    getSavedArticles(userId)
      .then((articles) => {
        if (articles) {
          setSavedArticles(articles);
        }
      })
      .catch((err) => console.log(err));
    getTopicsByThemes(userId)
      .then((topics) => topics && setTopicsList(topics))
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);
  return (
    <div className={styles.header}>
      <nav className={styles.navigation}>
        <button className={styles.buttonOpenModal} onClick={handleOpenModal}>
          <img src="/assets/burgerMenu.svg" alt="" />
        </button>
        <ModalBurger
          isModalOpen={isModalOpen}
          topics={topicsList}
          onCloseModal={handleCloseModal}
          savedArticlesLength={savedArticlesLength}
          userId={userId}
        />
        <img src="/assets/logo.svg" alt="" />
        {/*TODO: parameters page*/}
        <Link href={`/users/${id}/parameters`}>{/*<img src="/assets/settings.svg" alt="" />*/}</Link>
      </nav>
    </div>
  );
}
