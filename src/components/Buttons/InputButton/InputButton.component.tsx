import { Inter } from "next/font/google";
import styles from "./InputButton.module.scss";

const inter = Inter({ subsets: ["latin"] });

const InputButton = (props: any) => {
  return (
    <input className={styles.inputButton} type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
  );
};

export default InputButton;
