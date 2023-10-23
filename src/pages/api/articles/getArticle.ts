import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/lib/prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse){
	const body = req.body;
	const id = body.id;
	const article = await prisma.article.findUnique({
		where:{
			id: id
		}
	});
	res.status(200).json(article)
}
