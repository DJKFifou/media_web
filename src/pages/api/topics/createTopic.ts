import {NextApiRequest, NextApiResponse} from "next";
import {Topic} from "@prisma/client";
import {prisma} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const body: Topic = req.body;
	const {introduction_text, is_hot, theme, title} = body
	const newTopic = await prisma.topic.create({
		data: {
			introduction_text: introduction_text,
			is_hot: is_hot,
			theme: {
				connect: {id: theme}
			},
			title: title,
		}
	})
	return res.status(200).json(newTopic)
}
