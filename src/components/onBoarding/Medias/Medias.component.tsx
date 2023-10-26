import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import useMedia from "@/hooks/useMedia";
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
      <div className={styles.containerMedias}>
        <h2 className={styles.titleMedias}>Sélectionnez les thèmes</h2>
        <form className={styles.contentMedias} onSubmit={handleSubmit}>
          <div className={styles.containerGridMedias}>
            {medias &&
              medias.map((media) => (
                <label htmlFor="" key={media.id} className={styles.checkboxFormats}>
                  <input
                    id={`custom-checkbox-${media.id}`}
                    name={media.id}
                    checked={checkedState.includes(media.id)}
                    onChange={() => handleCheckboxChange(media.id)}
                    type="checkbox"
                  />
                  <span>{media.title}</span>
                </label>
              ))}
          </div>
          <div className={styles.containerContinue}>
            <PrimaryButton type="submit" title="Terminer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Medias;
