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

const Topics = (props: any) => {
  const { signUp } = useAuth()
  const router = useRouter()
  const [themes, setThemes] = useState<Theme[]>([])
  const [selectedThemes, setSelectedThemes] = useState([])
  const [userCredentials, setUserCredentials] = useState<Credentials | null>(null);
  async function getThemes() {
      try {
          const themes = await fetch('/api/themes', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          const themesJSON = await themes.json()
          setThemes(themesJSON)
      } catch (e) {
          console.error(e)
      }
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
      getThemes();
  }, [])

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
          <form className={styles.contentTopics} onSubmit={onSignUp}>
            <div className={styles.containerGridTopics}>
              {themes.map((theme: Theme) => (
                <div key={theme.id}>
                    <ThemeCard label={theme.slug} img="/assets/geopolitic.svg" alt="Géopolitique" onChange={() => handleChangeTheme(theme.title)} />
                </div>
              ))}
            </div>
            <div className={styles.containerContinue}>
              <PrimaryButton type="submit" title={`Continuer (${selectedThemes.length})`} />
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default Topics;