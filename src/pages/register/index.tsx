import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import useAuth from "@/hooks/useAuth";
import {useState} from "react";
import {Credentials} from "@/types";
import {supabase} from "@/lib/initSupabase";
import {useRouter} from "next/router";

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
  const {signUp} = useAuth();
  const router = useRouter()
  const [userCredentials, setUserCredentials] = useState<Credentials | null>(null);
  const [userPseudo, setUserPseudo] = useState<string | null>(null);

  function onUpdateUserCredentials(key: string, value: string){
    setUserCredentials(prevState => ({...prevState, [key]: value}))
  }

  function onSignUp(){
    if(userCredentials){
      signUp(userCredentials).then(async() => {
        const { data: { user } } = await supabase.auth.getUser();
        if(user){
          router.push(`/users/${user.id}`)
        }
      })
    }
  }

  return (
        <>
        <div className={`${styles.main} ${inter.className}`}>
          <div className={styles.sectionConnexion}>
            <h1 className={styles.titleConnexion}>{"S'inscrire"}</h1>
            <div className={styles.containerConnexion}>
              <div className={styles.contentConnexion}>
                <label htmlFor="">Pseudo</label>
                <input type="text" placeholder='Johnny' onChange={(event) => setUserPseudo(event.target.value)}/>
              </div>
              <div className={styles.contentConnexion}>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='john.doe@gmail.com' onChange={(event) => onUpdateUserCredentials('email', event.target.value)}/>
              </div>
              <div className={styles.contentConnexion}>
                <label htmlFor="">Mot de passe</label>
                <input type="password" placeholder='**************' onChange={(event) => onUpdateUserCredentials('password', event.target.value)}/>
              </div>
              <div className={`${styles.contentConnexion} ${styles.connexionLinks}`}>
                <Link href="/" className={styles.inscriptionLink}>Se connecter</Link>
                <button className={styles.registerButton} onClick={() => onSignUp()}>S'inscrire</button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}
