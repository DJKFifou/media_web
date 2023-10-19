import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
    return (
        <>
        <div className={`${styles.main} ${inter.className}`}>
          <div className={styles.sectionConnexion}>
            <h1 className={styles.titleConnexion}>S'inscrire</h1>
            <div className={styles.containerConnexion}>
              <div className={styles.contentConnexion}>
                <label htmlFor="">Pseudo</label>
                <input type="text" placeholder='Johnny'/>
              </div>
              <div className={styles.contentConnexion}>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='john.doe@gmail.com'/>
              </div>
              <div className={styles.contentConnexion}>
                <label htmlFor="">Mot de passe</label>
                <input type="password" placeholder='**************'/>
              </div>
              <div className={`${styles.contentConnexion} ${styles.connexionLinks}`}>
                <Link href="/" className={styles.inscriptionLink}>Se connecter</Link>
                <button className={styles.registerButton}>S'inscrire</button>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}