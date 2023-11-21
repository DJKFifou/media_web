import styles from '@/components/user/userName/UserName.module.scss';

interface UserInformation {
	name: string;
}

function UserName({ name }: UserInformation) {
	return (
		<div className={styles.userNameContainer}>
			<p className={styles.text}>{name}</p>
		</div>
	);
}

export default function UserInformation({ name }: UserInformation) {
	return (
		<div className={styles.userInformationContainer}>
			<div className={styles.profilePicture}></div>
			<div className={styles.textContainer}>
				<UserName name={name} />
				<p className={styles.articleText}>63 ARTICLES RECOMMANDÉS</p>
			</div>
		</div>
	);
}
