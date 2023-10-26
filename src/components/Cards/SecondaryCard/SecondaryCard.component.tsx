import { Inter } from "next/font/google";
import styles from "./SecondaryCard.module.scss";

const inter = Inter({ subsets: ["latin"] });

const SecondaryCard = (props: any) => {
  return (
    <button type="button" className={styles.secondaryCard} onClick={props.onClick}>
      <h4>{props.title}</h4>
      <label>{props.label}</label>
    </button>
  );
};

export default SecondaryCard;
