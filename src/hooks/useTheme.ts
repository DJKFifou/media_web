export default function useTheme(){
	async function getThemes() {
		try {
			const themes = await fetch('/api/themes', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			})
			return await themes.json();
		} catch(e) {
			console.error(e)
		}
	}
	return {getThemes}
}
