import Link from "next/link";
import {FormEvent, useEffect, useState} from "react";
import {Article, Theme, Topic} from "@prisma/client";
import useTheme from "@/hooks/useTheme";
import useTopic from "@/hooks/useTopic";
import {useRouter} from "next/router";

export default function CreateTopic(){
	const {getThemes} = useTheme();
	const {createTopic} = useTopic();
	const router = useRouter()
	const [themesList, setThemesList] = useState<Theme[] | null>(null);
	const [articlesList, setArticlesList] = useState<Article[] | null>(null);

	function onSubmit(event: FormEvent<HTMLFormElement>){
		event.preventDefault()
		const newTopic: Topic = {
			title: event.currentTarget.title.value,
			introduction_text: event.currentTarget.introduction_text.value,
			theme: event.currentTarget.theme.value,
			is_hot: event.currentTarget.is_hot.checked,
		}
		createTopic(newTopic).then(() => {
			router.push('/admin')
		})
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
					<input type="text" name="title" id="title"/>
					<label>Résumé</label>
					<input type="text" name="introduction_text" id="introduction_text"/>
					<label>Themes</label>
					{themesList && themesList?.length > 0 ? (
							<select name="theme" id="theme">
								{themesList.map((theme, index) => {
									return (
											<option value={theme.id} key={index}>{theme.slug}</option>
									)
								})}
							</select>
					) : null}
					<label>Sujet hot ?</label>
					<input type="checkbox" name="is_hot" id="is_hot"/>
					<label>Articles associé</label>
					{/*//TODO: get article per theme*/}
					<label>Piste audio</label>
					<input type="file" name="audio" id="audio"/>
					<button type="submit">Ajouter le sujet</button>
				</form>
			</div>
	)
}
