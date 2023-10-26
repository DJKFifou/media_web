import { ComponentProps } from "react";
import styles from "./PrimaryButton.module.scss";

const PrimaryButton = (
  props: ComponentProps<"button"> & {
    title: string;
  }
) => {
  return (
    <button className={styles.primaryButton} {...props}>
      {props.title}
    </button>
  );
};

export default PrimaryButton;
