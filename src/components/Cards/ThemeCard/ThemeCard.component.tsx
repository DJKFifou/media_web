import { Inter } from "next/font/google";
import styles from "./ThemeCard.module.scss";
import clsx from "clsx";

const ThemeCard = (props: { img: string; alt: string; label: string; active?: boolean; onClick: () => void }) => {
  return (
    <button className={clsx([styles.themeCard, props.active && styles.active])} onClick={props.onClick}>
      <img src={props.img} alt={props.alt} />
      <label>{props.label}</label>
    </button>
  );
};

export default ThemeCard;
