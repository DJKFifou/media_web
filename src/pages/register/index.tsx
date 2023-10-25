import { useState } from 'react'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.scss';
import Register from './onBoarding/Register/Register.component';
import Topics from './onBoarding/Topics/Topics.component';
import Frequency from './onBoarding/Frequency/Frequency.component';

const inter = Inter({ subsets: ['latin'] })

export default function RegisterPage() {
  type Step = "step1" | "step2" | "step3" | "step4" | "step5";
  const [currentStep, setCurrentStep] = useState<Step>('step1');
  return (
    <>
      <div className={`${styles.main} ${inter.className}`}>
        {currentStep == "step1" ? <Register onSuccess={() => setCurrentStep("step2")} /> : null}
        {currentStep == "step2" ? <Topics onSuccess={() => setCurrentStep("step3")} /> : null}
        {/* {currentStep == "step2" ? <Topics onBack={() => setCurrentStep("step1")} /> : null} */}
        {currentStep == "step3" ? <Frequency onSuccess={() => setCurrentStep("step4")} /> : null}
        {currentStep == "step4" ? <Medias onSuccess={() => setCurrentStep("step5")} /> : null}
      </div>
    </>)
}
