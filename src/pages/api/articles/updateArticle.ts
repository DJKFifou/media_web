import {NextApiRequest, NextApiResponse} from "next";
import {Article} from "@prisma/client";
import {prisma} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const body: Article = req.body;
	const {title, content, reading_duration, id} = body;
	const updatedArticle = await prisma.article.update({
		where:{
			id: id
		},
		data: {
			title: title,
			content: content,
			reading_duration: reading_duration
		}
	})
	return res.status(200).json(updatedArticle)
}
