import styles from "@/components/feed/feed.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <img src="/assets/logo.svg" alt="" />
      <h2 className={styles.titleFooter}>Quand choisir devient son petit plaisir</h2>
      <div className={styles.containerSocial}>
        <img src="/assets/instagram.svg" alt="" />
        <img src="/assets/tiktok.svg" alt="" />
        <img src="/assets/youtube.svg" alt="" />
      </div>
      <p className={styles.textFooter}>
        Cette plateforme a été réalisée dans le cadre d’un projet étudiant en 3ème année d’un BUT Métiers du Multimédia
        et de l’Internet de l’Université Bordeaux Montaigne.
      </p>
      <div className={styles.containerLinks}>
        <h5>
          <Link href="/legalNotice">Mentions légales</Link>
        </h5>
        {/*<h5><a href="/CGu">Conditions générales d’utilisation</a></h5>*/}
        {/*<h5><a href="/cookies">Gestion des cookies</a></h5>*/}
        {/*<h5><a href="/contact">Contact</a></h5>*/}
      </div>
    </footer>
  );
}
