import useTheme from "@/hooks/useTheme"
import useUser from "@/hooks/useUser"
import styles from "@/styles/Home.module.scss"
import { Article_Frequency, Format, Theme } from "@prisma/client"
import { Inter } from "next/font/google"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
const inter = Inter({ subsets: ["latin"] })

export default function OnBoarding() {
  const { createUser } = useUser()
  const { getThemes } = useTheme()
  const router = useRouter()
  const userId = router.query.id
  const [pseudo, setPseudo] = useState<string | null>(null)
  const [themes, setThemes] = useState<Theme[]>([])
  const [formats, setFormats] = useState<Format[]>([])
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
  ]
  const [selectedArticleFrequencies, setSelectedArticleFrequencies] = useState<Article_Frequency | null>(null)
  const [numberArticle, setNumberArticle] = useState<string | null>(null)
  const [selectedThemes, setSelectedThemes] = useState<{ id: string }[]>([])
  const [selectedFormats, setSelectedFormats] = useState<{ id: string }[]>([])

  const userInformation = () => {
    if (numberArticle != null) {
      return {
        id: userId,
        user_name: pseudo,
        theme: selectedThemes,
        format: selectedFormats,
        article_number: parseInt(numberArticle, 10),
        article_frequency: selectedArticleFrequencies,
      }
    }
  }

  function handleChangeTheme(themeSelectedId: string) {
    const isInclude = selectedThemes.some((theme) => theme.id === themeSelectedId)
    if (isInclude) {
      const updatedSelectedThemes = selectedThemes.filter((theme) => theme.id !== themeSelectedId)
      setSelectedThemes(updatedSelectedThemes)
    } else {
      setSelectedThemes([...selectedThemes, { id: themeSelectedId }])
    }
  }
  function handleChangeFormat(formatSelectedId: string) {
    const isInclude = selectedFormats.some((format) => format.id === formatSelectedId)
    if (isInclude) {
      const updatedSelectedFormats = selectedFormats.filter((format) => format.id !== formatSelectedId)
      setSelectedFormats(updatedSelectedFormats)
    } else {
      setSelectedFormats([...selectedFormats, { id: formatSelectedId }])
    }
  }

  async function onSignUp() {
    createUser(userInformation()).then(() => {
      router.replace(`/users/${userId}`)
    })
  }

  useEffect(() => {
    getThemes().then((themes) => setThemes(themes))
  }, [])

  return (
    <div className={`${styles.main} ${inter.className}`}>
      <div className={styles.sectionConnexion}>
        <h1 className={styles.titleConnexion}>S'inscrire</h1>
        <div className={styles.containerConnexion}>
          <div className={styles.contentConnexion}>
            <label htmlFor="">Pseudo</label>
            <input
              type="text"
              placeholder="Johnny"
              onChange={(event) => {
                setPseudo(event.target.value)
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
                  onChange={() => handleChangeTheme(theme.id)}
                />
                <label>{theme.slug}</label>
              </div>
            ))}
          </div>
          <div className={styles.contentConnexion}>
            {Object.keys(Format).map((format, index) => (
              <div key={format} className={styles.checkboxFormats}>
                <input
                  name={format}
                  className="formatCheckbox"
                  key={index}
                  type="checkbox"
                  onChange={() => handleChangeFormat(format)}
                />
                <label>{format}</label>
              </div>
            ))}
          </div>
          <div className={styles.contentConnexion}>
            <input
              id="numberArticle"
              type="number"
              min="0"
              onChange={(event) => {
                setNumberArticle(event.target.value)
              }}
            />
            <select
              name="frequency"
              id="frequency"
              className={styles.selection}
              multiple
              onChange={(event) => {
                setSelectedArticleFrequencies(event.target.value)
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
            <button onClick={() => onSignUp()} className={styles.registerButton}>
              S'inscrire
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
