import {NextApiRequest, NextApiResponse} from "next";
import {Topic} from "@prisma/client";
import {prisma} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const body = req.body;
	const {introduction_text, is_hot, articles}: Topic = body
	const newTopic = await prisma.topic.create({
		data: {
			introduction_text: introduction_text,
			is_hot: is_hot,
			articles: articles
		}
	})
	res.status(200).json(newTopic)
}
