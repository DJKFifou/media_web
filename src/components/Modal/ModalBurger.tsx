import Link from "next/link";
import { TopicThemeArticlePayload } from "@/types";

type ModalBurgerType = {
  isModalOpen: boolean;
  topics: TopicThemeArticlePayload[] | null;
  onCloseModal: () => void;
  savedArticlesLength: number;
  userId: string;
};

export default function ModalBurger({
  isModalOpen,
  topics,
  onCloseModal,
  savedArticlesLength,
  userId,
}: ModalBurgerType) {
  return (
    <dialog open={isModalOpen}>
      <Link href={`/users/${userId}/savedArticles/`}>{`Mes articles enregistrer (${savedArticlesLength})`}</Link>
      {topics && topics.length > 0
        ? topics.map((topic, index) => {
            return (
              <div key={index}>
                <p>{topic.title}</p>
                <p>{topic.theme.title}</p>
              </div>
            );
          })
        : null}
      <button onClick={() => onCloseModal()}>Fermer</button>
    </dialog>
  );
}
