import { ComponentProps } from "react";
import styles from "./SecondaryButton.module.scss";

const SecondaryButton = (
  props: ComponentProps<"button"> & {
    title: string;
  }
) => {
  return (
    <button type="button" className={styles.secondaryButton} {...props}>
      {props.title}
    </button>
  );
};

export default SecondaryButton;
