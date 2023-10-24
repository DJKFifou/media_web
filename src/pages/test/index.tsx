import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss'
import PrimaryButton from '@/components/Buttons/PrimaryButton/PrimaryButton.component'
import SecondaryButton from '@/components/Buttons/SecondaryButton/SecondaryButton.component'
import PrimaryCard from '@/components/Cards/PrimaryCard/PrimaryCard.component'
import SecondaryCard from '@/components/Cards/SecondaryCard/SecondaryCard.component'
import ThemeCard from '@/components/Cards/ThemeCard/ThemeCard.component';
import OneButton from '@/components/Buttons/OneButton/OneButton.component';
import BackButton from '@/components/Buttons/BackButton/BackButton.component';
import InputButton from '@/components/Buttons/InputButton/InputButton.component';

const inter = Inter({ subsets: ['latin'] })

export default function Register() {
    return (
        <>
            <div className={`${styles.main} ${inter.className}`}>
                <div>
                    <div>
                        <div>
                            <PrimaryButton title="Tout afficher (8)" />
                            <SecondaryButton title="Tout afficher (8)" />
                            <PrimaryCard title="Guerre Israélo-Palestinienne" label="International" />
                            <SecondaryCard title="Titre long sur deux lignes" label="Sport" />
                            <ThemeCard img="/assets/geopolitic.svg" alt="Image Géopolitique" label="Géopolitique" />
                            <OneButton title="Le récap en 5 min" img="/assets/play.svg" alt="Image Play" />
                            <BackButton />
                            <InputButton type="text" placeholder="Pseudo" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
