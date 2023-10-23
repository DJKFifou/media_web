import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {User} from ".prisma/client";


export default function User(){
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const router = useRouter();
	const id = router.query.id;
	async function getUser(){
		try {
			const getUser = await fetch(`/api/users/getUser?id=${id}`);
			const user = await getUser.json();
			setCurrentUser(user)
		}catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		getUser()
	}, []);

	return (
		<div>
			<p>{`Bienvenue ${currentUser?.user_name}`}</p>
		</div>
	)
}
