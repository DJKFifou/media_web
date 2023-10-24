import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {Article} from "@prisma/client";


export default function Article(){
	const router = useRouter();
	const articleId = router.query.id;
	const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
	async function getArticle(){
		try {
			const response = await fetch(`/api/article/getArticle?id=${articleId}`)
			const article = await response.json();
			setCurrentArticle(article)
		}catch (e) {
			console.error(e)
		}
	}

	useEffect(() => {
		getArticle()
	}, []);

	return(
			<div>
				<h1>{currentArticle?.title}</h1>
				<p>{currentArticle?.content}</p>
				<p>{`${currentArticle?.reading_duration} min`}</p>
				<button>Modifier</button>
			</div>
	)
}
