import styles from "@/components/feed/feed.module.scss";
import Link from "next/link";
import ModalBurger from "../Modal/ModalBurger";
import { useState } from "react";

export default function Header({id} : {id: string}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = "12345";
  const savedArticlesLength = 10; // Remplacez par la longueur réelle des articles enregistrés
  const topics = [
    {
      title: "Sujet 1",
      theme: { title: "Thème 1" },
    },
    {
      title: "Sujet 2",
      theme: { title: "Thème 2" },
    },
    // ... Ajoutez d'autres sujets si nécessaire
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.header}>
      <nav className={styles.navigation}>
        <button className={styles.buttonOpenModal}
         onClick={handleOpenModal}>
          <img src="/assets/burgerMenu.svg" alt="" />
        </button>
        <ModalBurger
        isModalOpen={isModalOpen}
        topics={topics}
        onCloseModal={handleCloseModal}
        savedArticlesLength={savedArticlesLength}
        userId={userId}
      />
        <img src="/assets/logo.svg" alt="" />
        <Link href={`/users/${id}/parameters`}>
          <img src="/assets/settings.svg" alt="" />
        </Link>
      </nav>
    </div>
  )
}
