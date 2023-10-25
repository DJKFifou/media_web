import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import { Credentials } from "@/types";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { supabase } from "@/lib/initSupabase";
import styles from './Topics.module.scss';
import PrimaryButton from '@/components/Buttons/PrimaryButton/PrimaryButton.component';
import ThemeCard from '@/components/Cards/ThemeCard/ThemeCard.component';
import BackButton from '@/components/Buttons/BackButton/BackButton.component';

const inter = Inter({ subsets: ['latin'] });

const Medias = (props: any) => {
  const { signUp } = useAuth()
  const router = useRouter()
  const [formats, setFormats] = useState<Format[]>([])
  const [selectedFormats, setSelectedFormats] = useState([])
  const [userCredentials, setUserCredentials] = useState<Credentials | null>(null);
  
  async function getFormats() {
    try {
        const formats = await fetch('/api/formats', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const formatsJSON = await formats.json()
        setFormats(formatsJSON)
    } catch (e) {
        console.error(e)
    }
  }
  function handleChangeFormat(formatSelected) {
    console.log(formatSelected)
    if (selectedFormats.includes(formatSelected)) {
        const updatedSelectedFormats = selectedFormats.filter(format => format === formatSelected);
        setSelectedFormats(updatedSelectedFormats)
    } else {
        setSelectedFormats([...selectedFormats, formatSelected])
    }
    console.log(selectedFormats)
}
  async function onSignUp(event: FormEvent<HTMLFormElement>) {
    props.onSuccess()
    try {
      event.preventDefault()
      if (userCredentials) {
        await signUp(userCredentials).then(async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await router.push(`register/onBoarding/${user.id}`)
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  function handleChangeTheme(themeSelected) {
    console.log(themeSelected)
    if (selectedThemes.includes(themeSelected)) {
        const updatedSelectedThemes = selectedThemes.filter(theme => theme === themeSelected);
        setSelectedThemes(updatedSelectedThemes)
    } else {
        setSelectedThemes([...selectedThemes, themeSelected])
    }
    console.log(selectedThemes)
}
// type Step = "step1" | "step2" | "step3";
// const [currentStep, setCurrentStep] = useState<Step>('step2');
  useEffect(() => {
    getFormats();
  }, [])

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
          <form className={styles.contentMedias} onSubmit={onSignUp}>
            <div className={styles.containerGridMedias}>
              {formats.map((format: Format, index) => (
                  <div key={format.id} className={styles.checkboxFormats}>
                      <input data-format-id={format.id} name={format.slug} className="formatCheckbox" key={index} type="checkbox" onChange={() => handleChangeFormat(format.title)} />
                      <label>{format.slug}</label>
                  </div>
              ))}
            </div>
            <div className={styles.containerContinue}>
              <PrimaryButton type="submit" title='Terminer' />
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default Medias;