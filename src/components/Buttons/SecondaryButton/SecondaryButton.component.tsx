import { Inter } from 'next/font/google'
import styles from './SecondaryButton.module.scss'

const inter = Inter({ subsets: ['latin'] })

const SecondaryButton = (props: any) => {
        return (
                <button className={styles.secondaryButton}>{props.title}</button>
        );
}

export default SecondaryButton;