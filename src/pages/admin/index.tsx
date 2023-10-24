import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {Article} from "@prisma/client";

export default function Admin(){
	const [articlesList, setArticlesList] = useState<Article[] | null>(null);

	async function getArticles(){
		try {
			const data = await fetch('/api/articles/getArticles')
			const articles = await data.json();
			setArticlesList(articles)
		}catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		getArticles()
	}, []);

	return(
			<div>
				<h1>Articles</h1>
				<div>
					{articlesList ? (articlesList.map((article, index) => {
						return(
								<div key={index}>
									<p>{article.title}</p>
									<Link href={`/admin/article/${article.id}`}>{"Voir l'article"}</Link>
									<button>Supprimer</button>
								</div>
						)
					})) : null}
				</div>
				<Link href="/admin/article/createArticle/">Ajouter un article</Link>
				<h1>Sujets</h1>
				<Link href="/admin/topic/createTopic">Ajouter un sujet</Link>
			</div>
	)
}
