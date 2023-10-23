import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {User} from ".prisma/client";


export default function User(){
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const router = useRouter();
	const id = router.query.id;
	async function getUser(){
		try {
			const getUser = await fetch('/api/users/getUser' + new URLSearchParams({
				id: id
			}))
			const user = getUser.json();
			console.log(user)
		}catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		getUser()
	}, []);

	return (
		<div>
			<p>{`Home ${id}`}</p>
		</div>
	)
}
