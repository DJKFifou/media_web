import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/lib/prisma";
import {Topic} from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const body = req.body
	const id = body.id;
	const topicData: Topic = body.topic;
	const updatedTopic = await prisma.topic.update({
		where: {
			id: id
		},
		data: {
			title: topicData.title,
			introduction_text: topicData.introduction_text,
			is_hot: topicData.is_hot,
			theme: {
				connect: {id: topicData.theme}
			}
		}
	})
	return res.status(200).json(updatedTopic)
}
