import React, {useState} from 'react'
import {Article} from "@prisma/client";
import Link from "next/link";


export default function CreateArticle(){
	const [article, setArticle] = useState<Article | null>(null);
	function handleArticleChange(key: string, value: string){
		setArticle(prevState => ({...prevState, [key]: value}))
	}
	async function createArticle(){
		try{
			if(article && typeof article.reading_duration === "string"){
				await fetch('/api/articles/createArticle', {
					method:'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						title: article.title,
						content: article.content,
						reading_duration: parseInt(article.reading_duration, 10)
					})
				})
			}
		}catch (e) {
			console.error(e)
		}
	}
	return(
			<div>
				<Link href="/admin">Retour</Link>
				<h1>Votre nouvel article</h1>
				<form onSubmit={() => createArticle()}>
					<label>Titre</label>
					<input type="text" onChange={(event) => handleArticleChange('title', event.target.value)}/>
					<label>Contenu</label>
					<textarea onChange={(event) => handleArticleChange('content', event.target.value)}/>
					<label>Durée de lecture</label>
					<input type="number" min={0} onChange={(event) => handleArticleChange('readingDuration', event.target.value)}/>
					<button type="submit">Créer</button>
				</form>
			</div>
	)
}
