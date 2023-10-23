import {NextApiRequest, NextApiResponse} from "next";
import {Article} from "@prisma/client";
import {prisma} from "@/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse){
	const body: Article = req.body;
	const {title, content, reading_duration} = body;
	const newArticle = await prisma.article.create({
		data: {
			title: title,
			content: content,
			reading_duration: reading_duration,
			publish_date: new Date()
		}
	})
		return res.status(200).json(newArticle)
}
