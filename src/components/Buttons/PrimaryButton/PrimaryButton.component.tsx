import { Inter } from 'next/font/google'
import styles from './PrimaryButton.module.scss'

const inter = Inter({ subsets: ['latin'] })

const PrimaryButton = (props: any) => {
        return (
                <button className={styles.primaryButton}>
                        {props.title}
                </button>
        );
}

export default PrimaryButton;