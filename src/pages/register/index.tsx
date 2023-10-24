import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { Credentials } from "@/types";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { supabase } from "@/lib/initSupabase";
import styles from '@/styles/Home.module.scss'
import { Article_Frequency, Format, Theme } from '@prisma/client'
import PrimaryButton from '@/components/Buttons/PrimaryButton/PrimaryButton.component'
import SecondaryButton from '@/components/Buttons/SecondaryButton/SecondaryButton.component'
import PrimaryCard from '@/components/Cards/PrimaryCard/PrimaryCard.component'
import SecondaryCard from '@/components/Cards/SecondaryCard/SecondaryCard.component'


export default function Register() {
  const { signUp } = useAuth()
  const router = useRouter()
  const [userCredentials, setUserCredentials] = useState<Credentials | null>(null);
  const [pseudo, setPseudo] = useState<string | null>(null)
  const [themes, setThemes] = useState<Theme[]>([])
  const [formats, setFormats] = useState<Format[]>([])
  const articleFrequencyList = [
    {
      label: 'jours',
      value: Article_Frequency.DAY,
    },
    {
      label: 'semaines',
      value: Article_Frequency.WEEK,
    },
    {
      label: 'mois',
      value: Article_Frequency.MONTH,
    }
  ]
  const [selectedArticleFrequencies, setSelectedArticleFrequencies] = useState<Article_Frequency | null>(null)
  const [numberArticle, setNumberArticle] = useState<number | null>(null)
  const [selectedThemes, setSelectedThemes] = useState([])
  const [selectedFormats, setSelectedFormats] = useState([])
  async function createUser() {
    console.log(pseudo)
    try {
      await fetch('/api/users/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_name: pseudo,
          theme: selectedThemes,
          format: selectedFormats,
          article_number: parseInt(numberArticle, 10),
          article_frequency: selectedArticleFrequencies
        }),
      })
    } catch (e) {
      console.error(e)
    }
  }
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
  // function handleChangeFormat() {
  //   const checkboxesFormats = document.querySelectorAll('.formatCheckbox');
  //   const selectedFormats = [];
  //   checkboxesFormats.forEach(checkbox => {
  //     if (checkbox.checked) {
  //       const formatId = checkbox.getAttribute('data-format-id');
  //       const format = formats.find(format => format.id === formatId);
  //       selectedFormats.push(format.title);
  //     }
  //   });
  //   console.log(selectedFormats);
  // }
  useEffect(() => {
    getFormats();
    getThemes();
  }, [])


  function handleChange(key: string, value: string) {
    setUserCredentials(prevState => ({ ...prevState, [key]: value }))
  }
  return (
    <>
      <div>
        <form onSubmit={onSignUp}>
          <label>Email</label>
          <input type="text" onChange={(event) => handleChange('email', event.target.value)} />
          <label>Mot de passe</label>
          <input type="password" onChange={(event) => handleChange('password', event.target.value)} />
          <button type="submit">Suivant</button>
        </form>
      </div>
      <div className={`${styles.main} ${inter.className}`}>
        <div className={styles.sectionConnexion}>
          <h1 className={styles.titleConnexion}>S'inscrire</h1>
          <div className={styles.containerConnexion}>
            <form onSubmit={() => createUser()}>
              <div className={styles.contentConnexion}>
                <label htmlFor="">Pseudo</label>
                <input type="text" placeholder='Johnny' onChange={(event) => { setPseudo(event.target.value) }} />
              </div>
              {/* <div className={styles.contentConnexion}>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='john.doe@gmail.com' onChange={(event) => onUpdateUserCredentials('email', event.target.value)}/>
              </div>
              <div className={styles.contentConnexion}>
                <label htmlFor="">Mot de passe</label>
                <input type="password" placeholder='**************'/>
              </div> */}
              <div className={`${styles.contentConnexion} ${styles.flexColumn}`}>
                {themes.map((theme: Theme, index) => (
                  <div key={theme.id} className={styles.checkboxThemes}>
                    <input data-theme-id={theme.id} name={theme.slug} className="themeCheckbox" key={index} type="checkbox" onChange={() => handleChangeTheme(theme.title)} />
                    <label>{theme.slug}</label>
                  </div>
                ))}
              </div>
              <div className={styles.contentConnexion}>
                {formats.map((format: Format, index) => (
                  <div key={format.id} className={styles.checkboxFormats}>
                    <input data-format-id={format.id} name={format.slug} className="formatCheckbox" key={index} type="checkbox" onChange={() => handleChangeFormat(format.title)} />
                    <label>{format.slug}</label>
                  </div>
                ))}
              </div>
              {/* <div className={styles.contentConnexion}>
                <select name="format" id="format" className={styles.selection} multiple>
                  {formats.map((format: Format, index) => (
                    <option value={format.slug} key={index}>{format.slug}</option>
                  ))}
                </select>
              </div> */}
              <div className={styles.contentConnexion}>
                <input id='numberArticle' type="number" min="0" onChange={(event) => { setNumberArticle(event.target.value); console.log(event.target.value) }} />
                <select name="frequency" id="frequency" className={styles.selection} multiple onChange={(event) => { setSelectedArticleFrequencies(event.target.value); console.log(event.target.value) }} >
                  {articleFrequencyList.map((frequency) => (
                    <option key={frequency.value} value={frequency.value}>
                      {frequency.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={`${styles.contentConnexion} ${styles.connexionLinks}`}>
                <Link href="/" className={styles.inscriptionLink}>Se connecter</Link>
                <button type='submit' className={styles.registerButton}>S'inscrire</button>
              </div>
              <div className={`${styles.contentConnexion} ${styles.connexionLinks}`}>
                <PrimaryButton text="Se connecter" />
                <SecondaryButton text="S'inscrire" />
              </div>
              <div className={`${styles.contentConnexion} ${styles.connexionLinks}`}>
                <PrimaryCard titre="Guerre Israélo-Palestinienne" label="International" />
                <SecondaryCard titre="Titre long sur 2 lignes" label="Sport" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>)
}
