import { Inter } from "next/font/google";
import styles from "./ThemeCard.module.scss";

const inter = Inter({ subsets: ["latin"] });

const ThemeCard = (props: any) => {
  return (
    <button className={styles.themeCard}>
      <img src={props.img} alt={props.alt} />
      <label>{props.label}</label>
    </button>
  );
};

export default ThemeCard;
