import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {User} from ".prisma/client";
import useUser from "@/hooks/useUser.ts";


export default function User(){
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const router = useRouter();
	const id = router.query.id;
	const {getUser} = useUser()

	useEffect(() => {
		if(id && typeof id === 'string'){
			getUser(id).then((user) => {
				console.log('user', user)
				setCurrentUser(user)
			})
		}
	}, [id]);

	return (
		<div>
			<p>{`Bienvenue ${currentUser?.user_name}`}</p>
		</div>
	)
}
