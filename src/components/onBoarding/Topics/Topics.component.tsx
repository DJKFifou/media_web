import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import ThemeCard from "@/components/Cards/ThemeCard/ThemeCard.component";
import useTheme from "@/hooks/useTheme";
import { $Enums, Theme } from "@prisma/client";
import { useState } from "react";
import styles from "./Topics.module.scss";
import useUser from "@/hooks/useUser";

const Topics = (props: { onSuccess: () => void }) => {
  const { themes } = useTheme();
  const { updateUserSubscribedThemes, currentUser } = useUser();
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const handleChangeTheme = (id: string) => {
    if (selectedThemes.includes(id)) {
      setSelectedThemes(selectedThemes.filter((theme) => theme !== id));
    } else {
      setSelectedThemes([...selectedThemes, id]);
    }
  };

  const handleSubmit = async () => {
    if (selectedThemes.length <= 1 || !currentUser) {
      // @todo Display error message
      return;
    }

    try {
      await updateUserSubscribedThemes({
        id: currentUser?.db.id,
        themes: selectedThemes,
      });

      props.onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

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
                  active={selectedThemes.includes(theme.id)}
                  onClick={() => handleChangeTheme(theme.id)}
                />
              </div>
            ))}
          </div>
          <div className={styles.containerContinue}>
            <PrimaryButton onClick={handleSubmit} title={`Continuer (${selectedThemes.length})`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;
