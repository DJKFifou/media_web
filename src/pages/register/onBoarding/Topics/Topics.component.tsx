import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Credentials } from "@/types";
import styles from "./Topics.module.scss";
import { Theme } from "@prisma/client";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import ThemeCard from "@/components/Cards/ThemeCard/ThemeCard.component";
import BackButton from "@/components/Buttons/BackButton/BackButton.component";

const inter = Inter({ subsets: ["latin"] });

const Topics = (props: any) => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  async function getThemes() {
    try {
      const themes = await fetch("/api/themes/getThemes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const themesJSON = await themes.json();
      setThemes(themesJSON);
    } catch (e) {
      console.error(e);
    }
  }
  function handleChangeTheme(themeSelected: string) {
    console.log(themeSelected);
    if (selectedThemes.includes(themeSelected)) {
      const updatedSelectedThemes = selectedThemes.filter((theme) => theme === themeSelected);
      setSelectedThemes(updatedSelectedThemes);
    } else {
      setSelectedThemes([...selectedThemes, themeSelected]);
    }
    console.log(selectedThemes);
  }
  // type Step = "step1" | "step2" | "step3";
  // const [currentStep, setCurrentStep] = useState<Step>('step2');
  useEffect(() => {
    getThemes();
  }, []);

  return (
    <div className={styles.sectionTopics}>
      <div className={styles.containerBreadcrumb}>
        <div className={styles.breadcrumb}>
          {/* <BackButton onClick={() => { setCurrentStep("step1"); props.onBack(); }} /> */}
          <div className={styles.containerProgress}>
            <div className={styles.contentProgress}></div>
          </div>
        </div>
      </div>
      <div className={styles.containerTopics}>
        <h2 className={styles.titleTopics}>Sélectionnez les thèmes</h2>
        <h5 className={styles.subTitleTopics}>Personnalisez votre expérience médiatique grâce à nos filtres</h5>
        <div className={styles.contentTopics}>
          <div className={styles.containerGridTopics}>
            {themes.map((theme: Theme) => (
              <div key={theme.id}>
                <ThemeCard
                  label={theme.slug}
                  img="/assets/geopolitic.svg"
                  alt="Géopolitique"
                  onChange={() => handleChangeTheme(theme.title)}
                />
              </div>
            ))}
          </div>
          <div className={styles.containerContinue}>
            <PrimaryButton type="submit" title={`Continuer (${selectedThemes.length})`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;
