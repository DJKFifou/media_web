export default function useUser(){
	async function getUser(id: string){
		try {
			const getUser = await fetch(`/api/users/getUser?id=${id}`, {
				method: 'GET',
				headers: {
					"Content-Type": "application/json"
				},
			});
			return await getUser.json();
		}catch (e) {
			console.error(e)
		}
	}

	async function createUser(body: any) {
		try {
			await fetch('/api/users/createUser', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body),
			})
		} catch(e) {
			console.error(e)
		}
	}
	return {getUser, createUser}
}
