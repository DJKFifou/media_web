import styles from "@/components/feed/feed.module.scss";
import Link from "next/link";

export default function Header({id} : {id: string}){
  return (
    <div className={styles.header}>
      <nav className={styles.navigation}>
        <img src="/assets/burgerMenu.svg" alt="" />
        <img src="/assets/logo.svg" alt="" />
        <Link href={`/users/${id}/parameters`}>
          <img src="/assets/settings.svg" alt="" />
        </Link>
      </nav>
    </div>
  )
}
