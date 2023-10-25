import React, {ReactNode, Dispatch, SetStateAction} from 'react'

type DropdownType = {
	isOpen: boolean,
	children: ReactNode,
	title: string,
	setFunction: Dispatch<SetStateAction<boolean>>
}

export default function DropdownInformation({isOpen, children, title}: DropdownType){
	return(
			<div>
				<p>{title}</p>
				{isOpen ? (
						<div>
							{children}
						</div>
				) : null}
			</div>
	)
}
