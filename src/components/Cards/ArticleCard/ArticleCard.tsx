import { Article } from "@prisma/client";
import Link from "next/link";
import styles from "./ArticleCard.module.scss";

export default function ArticleCard({article} : {article: Article}){
  let durationArticle = "2";
  let numberReco = "9";
  return (
    <div className={styles.articleCard}>
      {/* {article.image ? (
        //TODO: import article image's into BDD
        <image href={article.image} />
      ) : null} */}
      <img className={styles.imageArticle} src={article.image} />
      <Link className={styles.contentText} href={article.link}>
        <p>{article.title}</p>
        <label>{article.label}</label>
      </Link>
      <div className={styles.containerButton}>
        {/* <button className={styles.buttonLike}>
          <img className={styles.containerLike} src="/assets/containerLike.svg" alt="" />
          <img className={styles.like} src="/assets/emptyLike.svg" alt="" />
        </button> */}
        <button className={styles.buttonReco}>
          <img className={styles.containerReco} src="/assets/containerReco.svg" alt="" />
          <img className={styles.reco} src="/assets/emptyReco.svg" alt="" />
        </button>
      </div>
      <div className={styles.infosArticle}>
        <div className={styles.leftContent}>
          <img src="/assets/durationArticle.svg" alt="" />
          <label>{durationArticle} min</label>
        </div>
        <div className={styles.rightContent}>
          <img src="/assets/numberReco.svg" alt="" />
          <label>{numberReco} recommandations</label>
        </div>
      </div>
    </div>
  )
}
