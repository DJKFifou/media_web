import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import useUser, { UpdateUserPayload } from '@/hooks/useUser';
import { Article_Frequency, Prisma, Theme, User } from '@prisma/client';
import useAuth from '@/hooks/useAuth';
import DropdownInformation from '@/components/user/DropdownInformation/DropdownInformation';
import useTheme from '@/hooks/useTheme';
import UserInformation from '@/components/user/userName/UserInformation';
import Header from '@/components/Header/header';
import styles from '@/styles/userProfil.module.scss';

interface CustomElements extends HTMLFormControlsCollection {
	pseudo?: HTMLInputElement;
	frequency_number?: HTMLInputElement;
	frequency_name?: HTMLSelectElement;
}

interface CustomForm extends HTMLFormElement {
	readonly elements: CustomElements;
}

export default function Parameters() {
	const router = useRouter();
	const { currentUser, updateUser } = useUser();
	const { logOut } = useAuth();
	const { getSaveThemes, getNoSaveThemes } = useTheme();
	const userId = router.query.id as string;
	const [dropDownTheme, setDropDownTheme] = useState({
		personalInformation: false,
		themes: false,
		frequency: false,
	});
	const [saveThemes, setSaveThemes] = useState<Theme[]>([]);
	const [noSaveThemes, setNoSaveThemes] = useState<Theme[]>([]);

	const articleFrequencyList = [
		{
			label: 'jours',
			value: Article_Frequency.DAY,
		},
		{
			label: 'semaines',
			value: Article_Frequency.WEEK,
		},
		{
			label: 'mois',
			value: Article_Frequency.MONTH,
		},
	];

	function onClickSaveTheme(theme: Theme) {
		setNoSaveThemes((prevState: Theme[]) => [...prevState, theme]);
		const newSaveList: Theme[] = saveThemes.filter(
			(saveTheme: Theme) => saveTheme.id !== theme.id,
		);
		setSaveThemes(newSaveList);
	}

	function onClickNoSaveTheme(theme: Theme) {
		setSaveThemes((prevState: Theme[]) => [...prevState, theme]);
		const newNoSaveList: Theme[] = noSaveThemes.filter(
			(noSave: Theme) => noSave.id !== theme.id,
		);
		setNoSaveThemes(newNoSaveList);
	}

	async function handleSubmit(event: FormEvent<CustomForm>) {
		event.preventDefault();
		const target = event.currentTarget.elements;
		const user_name = target.pseudo?.value;
		const frequency_name = target.frequency_name?.value;
		const frequency_number = target.frequency_number?.valueAsNumber;
		const selectedThemes = saveThemes.map((theme) => theme.id);

		if (!currentUser) {
			return;
		}
		let payload: UpdateUserPayload = { id: currentUser.db.id };

		if (user_name) {
			console.log(user_name);
			payload = { ...payload, user_name: user_name };
		}
		if (frequency_name) {
			console.log(frequency_name);
			const article_frequency = frequency_name as Article_Frequency;
			payload = { ...payload, article_frequency: article_frequency };
		}
		if (frequency_number) {
			payload = { ...payload, article_number: frequency_number };
		}
		if (selectedThemes.length > 0) {
			console.log(selectedThemes);
			payload = { ...payload, themes: selectedThemes };
		}

		try {
			await updateUser(payload).then(() => {
				router.replace(`/users/${currentUser.db.id}`);
			});
		} catch (e) {
			console.error(e);
		}
	}

	async function onSignOut() {
		logOut().then(() => {
			router.replace('/');
		});
	}

	useEffect(() => {
		getSaveThemes(userId).then((res) => {
			setSaveThemes(res);
		});
		getNoSaveThemes(userId).then((res) => {
			setNoSaveThemes(res);
		});
	}, [userId]);

	if (!currentUser) {
		return null;
	}

	return (
		<div>
			<Header id={userId} />
			<div className={styles.container}>
				{currentUser.db.user_name ? (
					<UserInformation name={currentUser.db.user_name} />
				) : null}
				<form onSubmit={handleSubmit} className={styles.formContainer}>
					<DropdownInformation
						isOpen={dropDownTheme.personalInformation}
						title={'Mes informations personnelles'}
						onClick={() =>
							setDropDownTheme((prevState) => ({
								...prevState,
								personalInformation: !dropDownTheme.personalInformation,
							}))
						}
					>
						<div className={styles.personalInformationContainer}>
							<label className={styles.label}>Mon pseudo</label>
							<div className={styles.inputContainer}>
								<input
									placeholder={currentUser?.db.user_name || ''}
									name='pseudo'
									id='pseudo'
									type='text'
									className={styles.input}
								/>
								<img src={'/assets/edit.svg'} alt={'icon editing'} />
							</div>
						</div>
					</DropdownInformation>
					<DropdownInformation
						isOpen={dropDownTheme.themes}
						title={'Mes thèmes sélectionnés'}
						onClick={() =>
							setDropDownTheme((prevState) => ({
								...prevState,
								themes: !dropDownTheme.themes,
							}))
						}
					>
						<div>
							<div className={styles.themesContainer}>
								{saveThemes.map((theme, index) => {
									return (
										<button
											key={index}
											className={styles.button}
											onClick={() => onClickSaveTheme(theme)}
										>
											<div className={styles.saveTheme}>{theme.title}</div>
										</button>
									);
								})}
							</div>
							<p style={{ fontWeight: 'bold' }}>Themes disponibles</p>
							<div className={styles.themesContainer}>
								{noSaveThemes.map((theme, index) => {
									return (
										<button
											key={index}
											className={styles.button}
											onClick={() => onClickNoSaveTheme(theme)}
										>
											<div className={styles.noSaveTheme}>{theme.title}</div>
										</button>
									);
								})}
							</div>
						</div>
					</DropdownInformation>
					<DropdownInformation
						isOpen={dropDownTheme.frequency}
						title={'Le nombre et les fréquences'}
						onClick={() =>
							setDropDownTheme((prevState) => ({
								...prevState,
								frequency: !dropDownTheme.frequency,
							}))
						}
					>
						<label>Choisi ta quantité de news</label>
						<input
							type='number'
							id='frequency_number'
							name='frequency_number'
							placeholder={
								currentUser.db.article_number
									? String(currentUser.db.article_number)
									: undefined
							}
						/>
						<label>Choisi ta fréquence</label>
						<select id='frequency_name' name='frequency_name'>
							{articleFrequencyList.map((frequency, index) => {
								return (
									<option
										value={frequency.value}
										key={index}
										selected={
											frequency.value === currentUser.db.article_frequency
										}
									>
										{frequency.label}
									</option>
								);
							})}
						</select>
					</DropdownInformation>
					<button type={'submit'}>Enregistrer les informations</button>
				</form>
				<div className={styles.formContainer}>
					<button onClick={() => onSignOut()}>Me déconnecter</button>
					<button>Supprimer on compte</button>
				</div>
			</div>
		</div>
	);
}
