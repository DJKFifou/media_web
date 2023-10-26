import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import styles from "./Frequency.module.scss";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import ThemeCard from "@/components/Cards/ThemeCard/ThemeCard.component";
import BackButton from "@/components/Buttons/BackButton/BackButton.component";

const inter = Inter({ subsets: ["latin"] });

const Frequency = (props: any) => {
  return (
    <section className={styles.sectionFrequency}>
      <div className={styles.containerBreadcrumb}>
        <div className={styles.breadcrumb}>
          {/* <BackButton onClick={() => { setCurrentStep("step1"); props.onBack(); }} /> */}
          <div className={styles.containerProgress}>
            <div className={styles.contentProgress}></div>
          </div>
        </div>
      </div>
      <h2 className={styles.titleFrequency}>Sélectionnez les médias</h2>
      <h5 className={styles.subTitleFrequency}>Personnalisez votre expérience médiatique grâce à nos filtres</h5>
      <form className={styles.contentFrequency} onSubmit={() => {}}></form>
    </section>
  );
};

export default Frequency;
