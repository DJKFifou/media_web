import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/lib/prisma";
import {Topic} from "@prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const query = req.query;
	const id = query.id
	const topics = await prisma.topic.delete({
		where:{
			id: id
		}
	})
	res.status(200).json(topics)
}
