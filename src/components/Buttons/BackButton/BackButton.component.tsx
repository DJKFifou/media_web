import { useState } from "react";
import { Inter } from "next/font/google";
import styles from "./BackButton.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

const BackButton = (props: any) => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      className={styles.backButton}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => router.back()}
      type="button"
    >
      <img src={isHovered ? "/assets/backArrowWhite.svg" : "/assets/backArrowBlack.svg"} alt="Flèche retour arrière" />
    </button>
  );
};

export default BackButton;
