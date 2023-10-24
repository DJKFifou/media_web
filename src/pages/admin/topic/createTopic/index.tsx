import Link from "next/link";
import {useEffect, useState} from "react";
import {Article, Theme, Topic} from "@prisma/client";
import useTheme from "@/hooks/useTheme";

export default function CreateTopic(){
	const {getThemes} = useTheme()
	const [newTopic, setNewTopic] = useState<Topic | null>(null);
	const [themesList, setThemesList] = useState<Theme[] | null>(null);
	const [articlesList, setArticlesList] = useState<Article[] | null>(null);

	function handleChangeTopicValue(key: string, value: string){
		setNewTopic(prevState => ({...prevState, [key]: value}))
	}

	useEffect(() => {
		getThemes().then((themes) => setThemesList(themes))
	}, [])

	return (
			<div>
				<Link href="/admin">Retour</Link>
				<h1>Votre nouveau sujet</h1>
				<form>
					<label>Titre</label>
					<input type="text" onChange={(event) => handleChangeTopicValue('title', event.target.value)}/>
					<label>Résumé</label>
					<input type="text" onChange={(event) => handleChangeTopicValue('introduction_text', event.target.value)}/>
					<label>Themes</label>
					{themesList && themesList?.length > 0 ? (
							<select>
								{themesList.map((theme, index) => {
									return (
											<option key={index}>{theme.slug}</option>
									)
								})}
							</select>
					) : null}
					<label>Sujet hot ?</label>
					<input type="checkbox" onChange={(event) => handleChangeTopicValue('is_hot', event.target.value)}/>
					<label>Articles associé</label>
					<label>Piste audio</label>
					<input type="file"/>
					<button type="submit">Ajouter le sujet</button>
				</form>
			</div>
	)
}
