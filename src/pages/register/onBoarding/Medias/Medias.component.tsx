import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Credentials } from "@/types";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { supabase } from "@/lib/initSupabase";
import styles from "./Medias.module.scss";
import { Media } from "@prisma/client";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import ThemeCard from "@/components/Cards/ThemeCard/ThemeCard.component";
import BackButton from "@/components/Buttons/BackButton/BackButton.component";

const inter = Inter({ subsets: ["latin"] });

const Medias = (props: any) => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [medias, setMedias] = useState<Media[]>([]);
  const [selectedMedias, setSelectedMedias] = useState([]);
  const [userCredentials, setUserCredentials] = useState<Credentials | null>(null);

  async function getMedias() {
    try {
      const medias = await fetch("/api/medias/getMedias", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const mediasJSON = await medias.json();
      setMedias(mediasJSON);
    } catch (e) {
      console.error(e);
    }
  }
  function handleChangeMedia(mediaSelected) {
    console.log(mediaSelected);
    if (selectedMedias.includes(mediaSelected)) {
      const updatedSelectedMedias = selectedMedias.filter((media) => media === mediaSelected);
      setSelectedMedias(updatedSelectedMedias);
    } else {
      setSelectedMedias([...selectedMedias, mediaSelected]);
    }
    console.log(selectedMedias);
  }

  useEffect(() => {
    getMedias();
  }, []);

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
      <div className={styles.containerMedias}>
        <div className={styles.contentMedias}>
          {medias.map((media: Media, index) => (
            <div key={media.id} className={styles.checkboxMedias}>
              <img src="/assets/media.svg" alt="Média Le Monde" />
              <div>
                <label>{media.slug}</label>
                <input
                  data-media-id={media.id}
                  name={media.slug}
                  className="mediaCheckbox"
                  key={index}
                  type="checkbox"
                  onChange={() => handleChangeMedia(media.title)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.containerContinue}>
          <PrimaryButton type="submit" title="Terminer" />
        </div>
      </div>
    </div>
  );
};

export default Medias;
