import { FormEvent } from 'react';
import useAuth from '@/hooks/useAuth';
import styles from '@/components/Login/Login.module.scss';
import LogoContainer from '@/components/Login/LogoContainer';
import InputButton from '@/components/Buttons/InputButton/InputButton.component';
import PrimaryButton from '@/components/Buttons/PrimaryButton/PrimaryButton.component';
import SecondaryButton from '@/components/Buttons/SecondaryButton/SecondaryButton.component';
import Link from 'next/link';

interface CustomElements extends HTMLFormControlsCollection {
	email: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
	readonly elements: CustomElements;
}

export default function ForgotPassword() {
	const { forgotPassword } = useAuth();
	async function resetPassword(event: FormEvent<CustomForm>) {
		event.preventDefault();
		const target = event.currentTarget.elements;
		const email = target.email.value;

		try {
			await forgotPassword(email);
		} catch (e) {
			console.error(e);
		}
	}
	return (
		<div className={styles.sectionConnexion}>
			<LogoContainer />
			<div className={styles.containerFirstStep}>
				<div>
					<h4>Mot de passe oublié</h4>
					<img src='/assets/loopedArrow.svg' alt='' />
				</div>
			</div>
			<form onSubmit={resetPassword} className={styles.containerConnexion}>
				<div className={styles.contentConnexion}>
					<div className={styles.contentEmail}>
						<label>email</label>
						<InputButton
							type='text'
							id='email'
							placeholder={'jeanne.doe@mail.fr'}
						/>
					</div>
					<div className={styles.contentButton}>
						<PrimaryButton
							type='submit'
							title='Envoyer un mail réintialisation'
						/>
						<Link href='/login'>
							<SecondaryButton type='button' title='Se connecter' />
						</Link>
					</div>
				</div>
			</form>
		</div>
	);
}
