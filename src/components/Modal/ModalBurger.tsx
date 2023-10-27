import Link from "next/link";
import { TopicThemeArticlePayload } from "@/types";
import styles from "@/components/feed/feed.module.scss";
import SecondaryCard from "@/components/Cards/SecondaryCard/SecondaryCard.component";

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
  // function extractFirstHotObject(arr: TopicThemeArticlePayload[]) {
  //   if(!arr){
  //     return
  //   }
  //   return arr.find(item => item.is_hot === true);
  // }
  // const hotTopic = topics ? extractFirstHotObject(topics) : false;
  return (
    <dialog className={styles.dialog} open={isModalOpen}>
      <div className={styles.header}>
        <nav className={styles.navigation}>
          <button className={styles.buttonCloseModal} type="button" onClick={() => onCloseModal()}>
            <img src="/assets/modalClose.svg" alt="" />
          </button>
          <img src="/assets/logo.svg" alt="" />
          <div className={styles.noneContent}></div>
        </nav>
      </div>
      <div className={styles.containerMenuBurger} >
        <Link className={styles.contentReco} href={`/users/${userId}/savedArticles/`} style={{marginBottom: 10}}>
          <img src="/assets/fullReco.svg" alt="" />
          <p>{`Mes articles enregistrés (${savedArticlesLength})`}</p>
        </Link>
        {/*{hotTopic ? (*/}
        {/*  <TopicCardHot topic={hotTopic} />*/}
        {/*) : null}*/}
        {/*<Link href="" className={styles.containerHotNews} >*/}
        {/*  <div className={styles.titleHotNews}>*/}
        {/*    <img src="/assets/fire.svg" alt="Image de l'actu Hot" />*/}
        {/*    <h3>l’actu du jour</h3>*/}
        {/*    <img src="/assets/fire.svg" alt="Image de l'actu Hot" />*/}
        {/*  </div>*/}
        {/*  <h4 className={styles.textHotNews}>L'expulsion de Tchétchènes "dangereux": un retour à une politique ancienne</h4>*/}
        {/*</Link>*/}
        <div className={styles.containerGridTopics}>
          {topics && topics.length > 0
            ? topics.map((topic, index) => {
                return (
                  <SecondaryCard key={index} title={topic.title} label={topic.theme.title} userId={userId} topicId={topic.id} />
                );
              })
            : null}
        </div>
      </div>
    </dialog>
  );
}
