import { ComponentProps } from "react";
import styles from "./OneButton.module.scss";

const OneButton = (
  props: ComponentProps<"button"> & {
    title: string;
  }
) => {
  return (
    <button className={styles.oneButton} {...props}>
      <h3>{props.title}</h3>
    </button>
  );
};

export default OneButton;
