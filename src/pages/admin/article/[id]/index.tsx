import React, {FormEvent, FormEventHandler, useEffect, useState} from 'react'
import {useRouter} from "next/router";
import {Article} from "@prisma/client";
import useArticle from "@/hooks/useArticle";
import Link from "next/link";


export default function Article() {
	const router = useRouter();
	const {getArticle, updateArticle} = useArticle()
	const articleId = router.query.id;
	const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
	const [updatedArticle, setUpdatedArticle] = useState<Article | null>(null);
	const [isModify, setIsModify] = useState<boolean>(false);

	function handleModifyArticle() {
		setIsModify(!isModify)
	}

	const ViewArticle = ({articleData}: { articleData: Article }) => {
		return (
				<div>
					<h1>{articleData?.title}</h1>
					<p>{articleData?.content}</p>
					<p>{`${articleData?.reading_duration} min`}</p>
				</div>
		)
	}

	const ModifyArticle = ({articleData, onChange}: { articleData: Article, onChange }) => {

		const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			console.log(e.currentTarget)

			/// Fetch modifciation

			/// onChange
		}


		return (
				<form onSubmit={handleSubmit}>
					<label>Titre</label>
					<input
							placeholder={articleData.title}
							type="text"
							name={"title"}
					/>
					<label>Contenu</label>
					<input
							placeholder={articleData.content}
							type="text"
							name={"content"}
					/>
					<label>Durée de lecture</label>
					<input
							type="number"
							name={"reading_duration"}
					/>
					<button type="submit">enregistrer les modifications</button>
				</form>
		)
	}

	async function pushUpdateArticle() {
		setUpdatedArticle(prevState => ({...prevState, id: currentArticle?.id}))
	}

	useEffect(() => {
		if (articleId && typeof articleId === 'string') {
			getArticle(articleId).then((article) => {
				setCurrentArticle(article)
			})
		}
	}, [articleId]);
	return (
			<div>
				<Link href="/admin">Retour</Link>
				{currentArticle !== null ? (
						isModify ?
								<ModifyArticle articleData={currentArticle} onChange={(e) => fetch('')}/>
								:
								<ViewArticle articleData={currentArticle}/>
				) : null}
				<button onClick={() => handleModifyArticle()}>{isModify ? 'Fermer' : 'Modifier'}</button>
				<button>Supprimer</button>
			</div>
	)
}
