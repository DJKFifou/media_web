import Link from "next/link";
import {FormEvent, useEffect, useState} from "react";
import {Article, Theme, Topic} from "@prisma/client";
import useTheme from "@/hooks/useTheme";

export default function CreateTopic(){
	const {getThemes} = useTheme()
	const [newTopic, setNewTopic] = useState<Topic | null>(null);
	const [themesList, setThemesList] = useState<Theme[] | null>(null);
	const [articlesList, setArticlesList] = useState<Article[] | null>(null);

	function onSubmit(event: FormEvent<HTMLFormElement>){
		console.log(event)
	}

	useEffect(() => {
		getThemes().then((themes) => setThemesList(themes))
	}, [])

	return (
			<div>
				<Link href="/admin">Retour</Link>
				<h1>Votre nouveau sujet</h1>
				<form onSubmit={onSubmit}>
					<label>Titre</label>
					<input type="text" name="title"/>
					<label>Résumé</label>
					<input type="text" name="introduction_text"/>
					<label>Themes</label>
					{themesList && themesList?.length > 0 ? (
							<select name="theme">
								{themesList.map((theme, index) => {
									return (
											<option value={theme.title} key={index}>{theme.slug}</option>
									)
								})}
							</select>
					) : null}
					<label>Sujet hot ?</label>
					<input type="checkbox"/>
					<label>Articles associé</label>
					<label>Piste audio</label>
					<input type="file"/>
					<button type="submit">Ajouter le sujet</button>
				</form>
			</div>
	)
}
