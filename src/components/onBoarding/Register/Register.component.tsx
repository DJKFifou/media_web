import { FormEvent, useState } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Credentials } from "@/types";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { supabase } from "@/lib/initSupabase";
import styles from "./Register.module.scss";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import OneButton from "@/components/Buttons/OneButton/OneButton.component";
import InputButton from "@/components/Buttons/InputButton/InputButton.component";
import BackButton from "@/components/Buttons/BackButton/BackButton.component";
import useUser from "@/hooks/useUser";

const inter = Inter({ subsets: ["latin"] });

interface CustomElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  accept_cgu: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

type Props = {
  onSuccess: () => void;
};

const Register = (props: Props) => {
  const { signUp } = useAuth();
  const { registerUser } = useUser();
  const router = useRouter();

  const handleSubmitRegisterForm = async (event: FormEvent<CustomForm>) => {
    event.preventDefault();
    const target = event.currentTarget.elements;

    const payload = {
      username: target.username.value,
      email: target.email.value,
      password: target.password.value,
      accept_cgu: target.accept_cgu.checked,
    };

    if (!payload.accept_cgu) {
      return null;
    }

    const result = await signUp(payload);

    if (!result || !result.user) {
      // @todo Handle error
      console.log("Error");
      return;
    }

    const user = result.user;

    await registerUser({
      email: payload.email,
      id: user.id,
      username: payload.username,
    });

    props.onSuccess();
  };

  return (
    <>
      <section className={styles.sectionRegister}>
        <div className={styles.containerBreadcrumb}>
          <div className={styles.breadcrumb}>
            <BackButton link="/" />
            <div className={styles.containerProgress}>
              <div className={styles.contentProgress}></div>
            </div>
          </div>
        </div>
        <div className={styles.containerRegister}>
          <h2 className={styles.titleRegister}>Créer un compte</h2>
          <div className={styles.contentRegister}>
            <form onSubmit={handleSubmitRegisterForm}>
              <div className={styles.profilePicture}>
                {/* @todo Make upload interactive */}
                {/* @todo Save image in S3 */}
                <img src="/assets/profilePicture.png" alt="" className={styles.pp} />
                <OneButton title="Sélectionner une photo" />
              </div>
              <div className={styles.containerInput}>
                <div className={styles.containerPseudo}>
                  <p>Pseudo</p>
                  <InputButton
                    type="text"
                    autoComplete="username"
                    id="username"
                    required
                    placeholder="Pseudo"
                    name="username"
                  />
                </div>
                <div className={styles.containerEmail}>
                  <p>Adresse mail</p>
                  <InputButton type="email" autoComplete="email" required placeholder="Adresse mail" name="email" />
                </div>
                <div className={styles.containerPassword}>
                  <p>Mot de passe</p>
                  <InputButton
                    type="password"
                    autoComplete="new-password"
                    required
                    placeholder="Mot de passe"
                    name="password"
                  />
                </div>
                <div className={styles.containerCheckbox}>
                  <input name="accept_cgu" required type="checkbox" />
                  <p>
                    Je confirme avoir lu et être en accord avec les{" "}
                    <Link href="/">conditions générales d’utilisation</Link>.
                  </p>
                </div>
              </div>
              <div className={styles.containerContinue}>
                <PrimaryButton type="submit" title="Continuer" />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
