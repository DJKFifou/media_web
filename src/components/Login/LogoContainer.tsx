import styles from '@/components/Login/Login.module.scss';

export default function LogoContainer() {
	return (
		<div className={styles.containerUpper}>
			<img src='/assets/logoTallSize.svg' alt='Logo Application' />
			<h2 className={styles.titleConnexion}>
				Quand choisir devient son petit plaisir
			</h2>
		</div>
	);
}
