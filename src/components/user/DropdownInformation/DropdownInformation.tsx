import React, { ReactNode, Dispatch, SetStateAction } from 'react';
import styles from './DropdownInformation.module.scss';

type DropdownType = {
	isOpen: boolean;
	children: ReactNode | ReactNode[];
	title: string;
	onClick: () => void;
};

export default function DropdownInformation({
	isOpen,
	children,
	title,
	onClick,
}: DropdownType) {
	const buttonSvg = isOpen ? '/assets/-.svg' : '/assets/+.svg';
	return (
		<div>
			<div className={styles.containerTitle}>
				<p className={styles.title}>{title}</p>
				<button
					className={styles.button}
					type='button'
					onClick={() => onClick()}
				>
					<img src={buttonSvg} alt={'icon'} />
				</button>
			</div>
			{isOpen ? <div>{children}</div> : null}
		</div>
	);
}
