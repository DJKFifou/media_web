import { ComponentProps } from "react";
import styles from "./InputButton.module.scss";

const InputButton = (props: ComponentProps<"input">) => {
  return <input className={styles.inputButton} {...props} />;
};

export default InputButton;
