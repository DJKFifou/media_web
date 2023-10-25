import { Inter } from "next/font/google";
import styles from "./OneButton.module.scss";

const inter = Inter({ subsets: ["latin"] });

const OneButton = (props: any) => {
  return (
    <button className={styles.oneButton}>
      <h3>{props.title}</h3>
      <img src={props.img} alt={props.alt} />
    </button>
  );
};

export default OneButton;
