import { ComponentProps } from "react";
import styles from "./OneButton.module.scss";
import Link from "next/link";

const OneButton = (
  props: ComponentProps<"button"> & {
    title: string;
    img?: string;
    alt?: string;
  }
) => {
  return (
    <button type="button" className={styles.oneButton} {...props}>
      <h3>{props.title}</h3>
      <img src={props.img} alt={props.alt} />
    </button>
  );
};

export default OneButton;
