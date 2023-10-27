import { Article } from "@prisma/client";
import Link from "next/link";
import styles from "./ArticleCard.module.scss";
import useArticle from "@/hooks/useArticle";
import { useRouter } from "next/router";

export default function ArticleCard({article, isSaveArticle} : {article: Article, isSaveArticle: boolean}){
  const {saveArticle, unSaveArticle} = useArticle()
  const router = useRouter()
  const userId = router.query.id as string
  let durationArticle = "2";
  const handlerSaveArticle = () => {
    if(isSaveArticle){
      return unSaveArticle(article.id, userId)
    }else{
      return saveArticle(article.id, userId)
    }
  }
  return (
    <div className={styles.articleCard}>
      {article.image ? (
        <img className={styles.imageArticle} src={article.image} alt={"image article"} />
      ) : null}
      <Link className={styles.contentText} href={article.link}>
        <p>{article.title}</p>
        {/*<label>{article}</label>*/}
      </Link>
      <div className={styles.containerButton}>
        {/* <button className={styles.buttonLike}>
          <img className={styles.containerLike} src="/assets/containerLike.svg" alt="" />
          <img className={styles.like} src="/assets/emptyLike.svg" alt="" />
        </button> */}
        <button className={styles.buttonReco} onClick={() => {
          handlerSaveArticle().then(() => router.reload());
        }}>
          <img className={styles.containerReco} src="/assets/containerReco.svg" alt="" />
          {isSaveArticle ? (
            <img className={styles.reco} src={"/assets/fullReco.svg"} alt="icon enregistrer un article"/>
          ) : (
            <img className={styles.reco} src="/assets/emptyReco.svg" alt="icon enregistrer un article" />
          )}
        </button>
      </div>
      <div className={styles.infosArticle}>
        <div className={styles.leftContent}>
          <img src="/assets/durationArticle.svg" alt="" />
          <label>{durationArticle} min</label>
        </div>
        {/*<div className={styles.rightContent}>*/}
        {/*  <img src="/assets/numberReco.svg" alt="" />*/}
        {/*  <label>{numberReco} recommandations</label>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
