import { useState } from "react";
import { Inter } from "next/font/google";
import styles from "./Frequency.module.scss";
import { Article_Frequency } from "@prisma/client";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import SecondaryButton from "@/components/Buttons/SecondaryButton/SecondaryButton.component";

const inter = Inter({ subsets: ["latin"] });

const Topics = (props: any) => {

  const [selectedArticleFrequencies, setSelectedArticleFrequencies] = useState<Article_Frequency | null>(null);
  const [numberArticle, setNumberArticle] = useState<number | null>(null);

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

  return (
    <div className={styles.sectionFrequency}>
      <div className={styles.containerBreadcrumb}>
        <div className={styles.breadcrumb}>
          <div className={styles.containerProgress}>
            <div className={styles.contentProgress}></div>
          </div>
        </div>
      </div>
      <div className={styles.containerFrequency}>
        <h2 className={styles.titleFrequency}>Sélectionnez la quantité et la fréquence</h2>
        <div className={styles.contentFrequency}>
          <h5 className={styles.titleNumberArticle}>Quantité de sujets</h5>
          <div className={styles.containerNumberArticle}>
            <button className={styles.buttonDecrement} onClick={handleDecrement}>-</button>
            <input
              id="numberArticle"
              type="number"
              min="0"
              value={numberArticle || ""}
              onChange={handleNumberChange}
            />
            <button className={styles.buttonIncrement} onClick={handleIncrement}>+</button>
          </div>
          <h5 className={styles.titleFrequency}>Choisis ta fréquence</h5>
          <div className={styles.ButtonFrequencies}>
            <SecondaryButton title="par jour" onClick={(event) => { setSelectedArticleFrequencies(event.target.value); console.log(event.target.value); }}/>
            <SecondaryButton title="par semaine" onClick={(event) => { setSelectedArticleFrequencies(event.target.value); console.log(event.target.value); }}/>
            <SecondaryButton title="par mois" onClick={(event) => { setSelectedArticleFrequencies(event.target.value); console.log(event.target.value); }}/>
          </div>
          <div className={styles.containerContinue}>
            <h4>
              {numberArticle >= 2
                ? `${numberArticle ? numberArticle : "0"} sujets par ${selectedArticleFrequencies ? selectedArticleFrequencies : "jour"}`
                : `${numberArticle ? numberArticle : "0"} sujet par ${selectedArticleFrequencies ? selectedArticleFrequencies : "jour"}`}
            </h4>
            <PrimaryButton type="submit" title="Continuer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topics;
