import { FormEvent, useState } from 'react'
import { Inter } from 'next/font/google'
import { Credentials } from "@/types";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { supabase } from "@/lib/initSupabase";
import styles from '@/styles/Home.module.scss'
import { Article_Frequency } from '@prisma/client'
import PrimaryButton from '@/components/Buttons/PrimaryButton/PrimaryButton.component'
import BackButton from '@/components/Buttons/BackButton/BackButton.component';
import OneButton from '@/components/Buttons/OneButton/OneButton.component';
import InputButton from '@/components/Buttons/InputButton/InputButton.component';

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
  const { signUp } = useAuth()
  const router = useRouter()
  const [userCredentials, setUserCredentials] = useState<Credentials | null>(null);
  const [pseudo, setPseudo] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState('');
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
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(event.target.files[0]);
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
  return (
    <>
      <div className={`${styles.main} ${inter.className}`}>
        <section className={styles.sectionRegister}>
          <div className={styles.containerBreadcrumb}>
            <div className={styles.breadcrumb}>
              <BackButton />
              <div className={styles.containerProgress}>
                <div className={styles.contentProgress}></div>
              </div>
            </div>
          </div>
          <div className={styles.containerRegister}>
            <h2 className={styles.titleRegister}>Créer un compte</h2>
            <div className={styles.contentRegister}>
              <form onSubmit={onSignUp}>
                <div className={styles.profilePicture}>
                  {/* <img src={selectedImage} alt="" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="imageInput"
                  /> */}
                  <img src="/assets/profilePicture.png" alt="" className={styles.pp} />
                  <OneButton title="Sélectionner une photo" />
                  {/* <label htmlFor="imageInput">
                    <button>Sélectionner une photo</button>
                  </label> */}
                </div>
                <div className={styles.containerInput}>
                  <div className={styles.containerPseudo}>
                    <p>Pseudo</p>
                    <InputButton type="text" placeholder='Pseudo' onChange={(event) => { setPseudo(event.target.value) }} />
                  </div>
                  <div className={styles.containerEmail}>
                    <p>Adresse mail</p>
                    <InputButton type="email" placeholder='Adresse mail' onChange={(event) => handleChange('email', event.target.value)} />
                  </div>
                  <div className={styles.containerPassword}>
                    <p>Mot de passe</p>
                    <InputButton type="password" placeholder='Mot de passe' onChange={(event) => handleChange('password', event.target.value)} />
                  </div>
                  <div className={styles.containerCheckbox}>
                    <input type="checkbox" />
                    <p>Je confirme avoir lu et être en accord avec les <a href="/">conditions générales d’utilisation</a>.</p>
                  </div>
                </div>
                <div className={styles.containerContinue}>
                  <PrimaryButton type="submit" title="Continuer" />
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>)
}