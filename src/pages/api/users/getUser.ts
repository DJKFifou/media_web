import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const data = req.body;
	const id = data.id;
	const user = await prisma.user.findUnique({
		where: {
			id: id
		}
	})
	return res.status(200).json(user);
}
