import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/lib/prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse){
	const data = req.query;
	const id = data.id;
	const article = await prisma.article.findUnique({
		where:{
			id: id
		}
	});
	return res.status(200).json(article)
}
