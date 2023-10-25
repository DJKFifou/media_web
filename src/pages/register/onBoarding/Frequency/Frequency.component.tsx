import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Credentials } from "@/types";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { supabase } from "@/lib/initSupabase";
import styles from "./Frequency.module.scss";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";

const inter = Inter({ subsets: ["latin"] });

const Topics = (props: any) => {
  const { signUp } = useAuth();
  const router = useRouter();
  const [userCredentials, setUserCredentials] = useState<Credentials | null>(null);
  async function onSignUp(event: FormEvent<HTMLFormElement>) {
    props.onSuccess();
    try {
      event.preventDefault();
      if (userCredentials) {
        await signUp(userCredentials).then(async () => {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user) {
            // await router.push(`register/onBoarding/${user.id}`);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles.sectionFrequency}>
      <div className={styles.containerBreadcrumb}>
        <div className={styles.breadcrumb}>
          {/* <BackButton onClick={() => { setCurrentStep("step1"); props.onBack(); }} /> */}
          <div className={styles.containerProgress}>
            <div className={styles.contentProgress}></div>
          </div>
        </div>
      </div>
      <div className={styles.containerFrequency}>
        <h2 className={styles.titleFrequency}>Sélectionnez
         la quantité et la fréquence</h2>
        <h5 className={styles.subTitleFrequency}>Quantité de sujets</h5>
        <form className={styles.contentFrequency} onSubmit={onSignUp}>
          <div className={styles.containerContinue}>
            <PrimaryButton type="submit" title="Continuer" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Topics;
