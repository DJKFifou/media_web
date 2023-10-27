import { Inter } from "next/font/google";
import styles from "./SecondaryCard.module.scss";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const SecondaryCard = (props: any) => {
  return (
    <Link href={`/users/${props.userId}/topic/${props.topicId}`}>
      <button type="button" key={props.key} className={styles.secondaryCard} onClick={props.onClick}>
        <h4>{props.title}</h4>
        <label>{props.label}</label>
      </button>
    </Link>
  );
};

export default SecondaryCard;
