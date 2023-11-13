import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import SecondaryButton from "@/components/Buttons/SecondaryButton/SecondaryButton.component";
import { Article_Frequency } from "@prisma/client";
import { useState } from "react";
import styles from "./Frequency.module.scss";
import { useRouter } from "next/router";

const Topics = (props: any) => {
  const [selectedArticleFrequencies, setSelectedArticleFrequencies] = useState<Article_Frequency | null>(null);
  // @todo Add better default value or check for falsy value here #1
  const [numberArticle, setNumberArticle] = useState<number>(0);
  const handleIncrement = () => {
    setNumberArticle(numberArticle + 1);
  };

  const handleDecrement = () => {
    if (numberArticle > 0) {
      setNumberArticle(numberArticle - 1);
    }
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue)) {
      setNumberArticle(newValue);
    }
  };

  function getDaytranslate() {
    if (selectedArticleFrequencies === Article_Frequency.DAY) {
      return "jour";
    } else if (selectedArticleFrequencies === Article_Frequency.WEEK) {
      return "semaine";
    } else if (selectedArticleFrequencies === Article_Frequency.MONTH) {
      return "mois";
    }
    return "";
  }

  const handleSubmit = () => {
    props.onSuccess();
  };

  return (
    <div className={styles.sectionFrequency}>
      <div className={styles.containerBreadcrumb}>
        <div className={styles.breadcrumb}>
          <div className={styles.containerProgress}>
            <div className={styles.contentProgress}></div>
          </div>
        </div>
      </div>
      {/* @todo API COnnect */}
      <form className={styles.containerFrequency}>
        <h2 className={styles.titleFrequency}>Sélectionnez la quantité et la fréquence</h2>
        <div className={styles.contentFrequency}>
          <h5 className={styles.titleNumberArticle}>Quantité de sujets</h5>
          <div className={styles.containerNumberArticle}>
            <button type="button" className={styles.buttonDecrement} onClick={handleDecrement}>
              -
            </button>
            <input id="numberArticle" type="number" min="0" value={numberArticle || ""} onChange={handleNumberChange} />
            <button type="button" className={styles.buttonIncrement} onClick={handleIncrement}>
              +
            </button>
          </div>
          <h5 className={styles.titleFrequency}>Choisis ta fréquence</h5>
          <div className={styles.ButtonFrequencies}>
            {/* @todo Add active state */}
            <SecondaryButton
              title="par jour"
              onClick={(event) => {
                setSelectedArticleFrequencies(Article_Frequency.DAY);
              }}
            />
            {/* @todo Add active state */}
            <SecondaryButton
              title="par semaine"
              onClick={(event) => {
                setSelectedArticleFrequencies(Article_Frequency.WEEK);
              }}
            />
            {/* @todo Add active state */}
            <SecondaryButton
              title="par mois"
              onClick={(event) => {
                setSelectedArticleFrequencies(Article_Frequency.MONTH);
              }}
            />
          </div>
          <div className={styles.containerContinue}>
            <h4>
              {numberArticle >= 2
                ? `${numberArticle} sujets par ${getDaytranslate() || "jour"}`
                : `${numberArticle} sujet par ${getDaytranslate() || "jour"}`}
            </h4>
            <PrimaryButton onClick={handleSubmit} type="button" title="Continuer" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Topics;
