import React, {useEffect, useState} from 'react'
import Link from "next/link";
import {Article, Topic} from "@prisma/client";
import useArticle from "@/hooks/useArticle";
import useTopic from "@/hooks/useTopic";
import {useRouter} from "next/router";

export default function Admin(){
	const {getArticles} = useArticle()
	const {getTopics, deleteTopic} = useTopic()
	const router = useRouter()
	const [articlesList, setArticlesList] = useState<Article[] | null>(null);
	const [topicsList, setTopicsList] = useState<Topic[] | null>(null);


	useEffect(() => {
		getArticles().then((articles) => setArticlesList(articles));
		getTopics().then((topics) => setTopicsList(topics))
	}, []);

	function onDeleteTopic(id: string){
		deleteTopic(id).then(() => {
			router.reload()
		})
	}

	return(
			<div>
				<h1>Articles</h1>
				<div>
					{articlesList && articlesList.length > 0 ? (articlesList.map((article, index) => {
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
				{topicsList && topicsList.length > 0 ? (
						topicsList.map((topic, index) => {
							return (
									<div key={index}>
										<p>{topic.title}</p>
										<Link href={`/admin/topic/${topic.id}`}>{"Voir le sujet"}</Link>
										<button onClick={() => onDeleteTopic(topic.id)}>supprimer</button>
									</div>
							)
						})
				) : null}
				<Link href="/admin/topic/createTopic">Ajouter un sujet</Link>
			</div>
	)
}
