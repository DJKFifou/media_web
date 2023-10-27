import { Inter } from "next/font/google";
import styles from "./PrimaryCard.module.scss";

const inter = Inter({ subsets: ["latin"] });

const PrimaryCard = (props: any) => {
  return (
    <button type="button" className={styles.primaryCard}>
      <h4>{props.title}</h4>
      <label>{props.label}</label>
    </button>
  );
};

export default PrimaryCard;
