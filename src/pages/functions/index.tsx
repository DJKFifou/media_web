import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Credentials } from "@/types";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { supabase } from "@/lib/initSupabase";
import styles from "@/styles/Home.module.scss";
import { Article_Frequency, Format, Theme } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [userCredentials, setUserCredentials] = useState<Credentials | null>(null);
  const [pseudo, setPseudo] = useState<string | null>(null);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [formats, setFormats] = useState<Format[]>([]);
  const articleFrequencyList = [
    {
      label: "jours",
      value: Article_Frequency.DAY,
    },
    {
      label: "semaines",
      value: Article_Frequency.WEEK,
    },
    {
      label: "mois",
      value: Article_Frequency.MONTH,
    },
  ];
  const [selectedArticleFrequencies, setSelectedArticleFrequencies] = useState<Article_Frequency | null>(null);
  const [numberArticle, setNumberArticle] = useState<number | null>(null);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  async function createUser() {
    console.log(pseudo);
    try {
      await fetch("/api/users/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: pseudo,
          theme: selectedThemes,
          format: selectedFormats,
          article_number: parseInt(numberArticle, 10),
          article_frequency: selectedArticleFrequencies,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }
  async function getThemes() {
    try {
      const themes = await fetch("/api/themes", {
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
  async function onSignUp(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      if (userCredentials) {
        await signUp(userCredentials).then(async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            await router.push(`register/onBoarding/${user.id}`);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  function handleChangeTheme(themeSelected) {
    console.log(themeSelected);
    if (selectedThemes.includes(themeSelected)) {
      const updatedSelectedThemes = selectedThemes.filter((theme) => theme === themeSelected);
      setSelectedThemes(updatedSelectedThemes);
    } else {
      setSelectedThemes([...selectedThemes, themeSelected]);
    }
    console.log(selectedThemes);
  }
  function handleChangeFormat(formatSelected) {
    console.log(formatSelected);
    if (selectedFormats.includes(formatSelected)) {
      const updatedSelectedFormats = selectedFormats.filter((format) => format === formatSelected);
      setSelectedFormats(updatedSelectedFormats);
    } else {
      setSelectedFormats([...selectedFormats, formatSelected]);
    }
    console.log(selectedFormats);
  }
  function handleChange(key: string, value: string) {
    setUserCredentials((prevState) => ({ ...prevState, [key]: value }));
  }
  useEffect(() => {
    getFormats();
    getThemes();
  }, []);
  return (
    <>
      <div className={`${styles.main} ${inter.className}`}>
        <div className={styles.sectionConnexion}>
          <h1 className={styles.titleConnexion}>S'inscrire</h1>
          <div className={styles.containerConnexion}>
            <div>
              <form onSubmit={onSignUp}>
                <label>Email</label>
                <input type="email" onChange={(event) => handleChange("email", event.target.value)} />
                <label>Mot de passe</label>
                <input type="password" onChange={(event) => handleChange("password", event.target.value)} />
                <button type="submit">Continuez</button>
              </form>
            </div>
            <form onSubmit={() => createUser()}>
              <div className={styles.contentConnexion}>
                <label htmlFor="">Pseudo</label>
                <input
                  type="text"
                  placeholder="Johnny"
                  onChange={(event) => {
                    setPseudo(event.target.value);
                  }}
                />
              </div>
              <div className={`${styles.contentConnexion} ${styles.flexColumn}`}>
                {themes.map((theme: Theme, index) => (
                  <div key={theme.id} className={styles.checkboxThemes}>
                    <input
                      data-theme-id={theme.id}
                      name={theme.slug}
                      className="themeCheckbox"
                      key={index}
                      type="checkbox"
                      onChange={() => handleChangeTheme(theme.title)}
                    />
                    <label>{theme.slug}</label>
                  </div>
                ))}
              </div>
              <div className={styles.contentConnexion}>
                {Object.keys(Format).map((format, index) => (
                  <div key={format} className={styles.checkboxFormats}>
                    <input
                      name={format.slug}
                      className="formatCheckbox"
                      key={index}
                      type="checkbox"
                      onChange={() => handleChangeFormat(format.title)}
                    />
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
                <input
                  id="numberArticle"
                  type="number"
                  min="0"
                  onChange={(event) => {
                    setNumberArticle(event.target.value);
                    console.log(event.target.value);
                  }}
                />
                <select
                  name="frequency"
                  id="frequency"
                  className={styles.selection}
                  multiple
                  onChange={(event) => {
                    setSelectedArticleFrequencies(event.target.value);
                    console.log(event.target.value);
                  }}
                >
                  {articleFrequencyList.map((frequency) => (
                    <option key={frequency.value} value={frequency.value}>
                      {frequency.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className={`${styles.contentConnexion} ${styles.connexionLinks}`}>
                <Link href="/" className={styles.inscriptionLink}>
                  Se connecter
                </Link>
                <button type="submit" className={styles.registerButton}>
                  S'inscrire
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
