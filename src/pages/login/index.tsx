import InputButton from "@/components/Buttons/InputButton/InputButton.component";
import PrimaryButton from "@/components/Buttons/PrimaryButton/PrimaryButton.component";
import SecondaryButton from "@/components/Buttons/SecondaryButton/SecondaryButton.component";
import styles from "@/components/Login/Login.module.scss";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent } from "react";

interface CustomElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<CustomForm>) => {
    event.preventDefault();
    const target = event.currentTarget.elements;

    const payload = {
      email: target.email.value,
      password: target.password.value,
    };

    try {
      const result = await signIn(payload);
      if (result?.data.user) {
        const user = result.data.user
        console.log("Succesfully logged in");
        await router.replace(`/users/${user.id}`)
        return;
      }

      // @todo Handle error (toast ?)

      console.log("Error, failed to sign in");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={styles.sectionConnexion}>
      <div className={styles.containerUpper}>
        <img src="/assets/logoTallSize.svg" alt="Logo Application" />
        <h2 className={styles.titleConnexion}>Quand choisir devient son petit plaisir</h2>
      </div>
      <div className={styles.containerFirstStep}>
        <div>
          <h4>Faites le premier pas</h4>
          <img src="/assets/loopedArrow.svg" alt="" />
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.containerConnexion}>
        <div className={styles.contentConnexion}>
          <div className={styles.contentEmail}>
            <label htmlFor="email">Identifiant</label>
            <InputButton required type="email" name="email" id="email" placeholder="Adresse mail" />
          </div>
          <div className={styles.contentPassword}>
            <label htmlFor="password">Mot de passe</label>
            <InputButton required type="password" name="password" id="password" placeholder="Mot de passe" />
          </div>
        </div>
        <div className={styles.contentButton}>
          <PrimaryButton title="Connexion" type="submit" />
          <Link href="/register">
            <SecondaryButton type="button" title="Créer un compte" />
          </Link>
          {/* @todo Add Password Reset */}
          <a href="" className={styles.forgottenPasswordLink}>
            Mot de passe oublié ?
          </a>
        </div>
      </form>
    </section>
  );
}
