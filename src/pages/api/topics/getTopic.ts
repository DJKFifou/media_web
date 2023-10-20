import {NextApiRequest, NextApiResponse} from "next";
import  {Topic} from "@prisma/client";
import {prisma} from "@/lib/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const body: Topic = req.body;
	const id = body.id
	const topic = await prisma.topic.findUnique({
		where: {
			id: id
		}
	})
	res.status(200).json(topic)
}
