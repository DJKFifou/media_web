import styles from "./PrimaryButton.module.scss";

const PrimaryButton = (props: any) => {
  return (
    <button type={props.type} className={styles.primaryButton}>
      {props.title}
    </button>
  );
};

export default PrimaryButton;
