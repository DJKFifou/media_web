import { useState } from 'react';
import { Inter } from 'next/font/google';
import styles from './BackButton.module.scss';

const inter = Inter({ subsets: ['latin'] });

const BackButton = (props: any) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button className={styles.backButton} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={isHovered ? '/assets/backArrowWhite.svg' : '/assets/backArrowBlack.svg'} alt="Flèche retour arrière"/>
    </button>
  );
};

export default BackButton;
