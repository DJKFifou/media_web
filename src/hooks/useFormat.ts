export default function useFormat(){
	async function getFormats() {
		try {
			const formats = await fetch('/api/formats', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			return await formats.json()
		} catch(e) {
			console.error(e)
		}
	}
	return {getFormats}
}
