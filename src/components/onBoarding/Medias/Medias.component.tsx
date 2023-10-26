import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import useMedia from "@/hooks/useMedia";
import { Media } from "@prisma/client";
import { FormEvent, useState } from "react";
import styles from "./Medias.module.scss";

const Medias = (props: any) => {
  const { medias } = useMedia();
  const [checkedState, setCheckedState] = useState<string[]>([]);

  const handleCheckboxChange = (id: string) => {
    if (checkedState.includes(id)) {
      setCheckedState(checkedState.filter((theme) => theme !== id));
    } else {
      setCheckedState([...checkedState, id]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(checkedState);
    // @todo Save Topics choice on the API
    props.onSuccess();
  };

  return (
    <div className={styles.sectionMedias}>
      <div className={styles.containerBreadcrumb}>
        <div className={styles.breadcrumb}>
          {/* <BackButton onClick={() => { setCurrentStep("step1"); props.onBack(); }} /> */}
          <div className={styles.containerProgress}>
            <div className={styles.contentProgress}></div>
          </div>
        </div>
      </div>
      <h2 className={styles.titleMedias}>Sélectionnez les médias</h2>
      <div className={styles.researchMedias}>
        <img src="/assets/search.svg" alt="Loupe" />
        <input type="search" />
      </div>
      <form onSubmit={handleSubmit} className={styles.containerMedias}>
        <div className={styles.contentMedias}>
          {medias.map((media: Media) => (
            <label htmlFor={media.slug} key={media.id} className={styles.checkboxMedias}>
              <img src="/assets/media.svg" alt="Média Le Monde" />
              <div className={styles.inputContainer}>
                <span>{media.title}</span>
                <input
                  name={media.slug}
                  id={media.slug}
                  type="checkbox"
                  checked={checkedState.includes(media.id)}
                  onChange={() => handleCheckboxChange(media.id)}
                />
              </div>
            </label>
          ))}
        </div>
        <div className={styles.containerContinue}>
          <PrimaryButton type="submit" title="Terminer" />
        </div>
      </form>
    </div>
  );
};

export default Medias;
