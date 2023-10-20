import {prisma} from '@/lib/prisma';
import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const body = req.body;
	const id = body.id;
	const updatedUser = await prisma.user.update({
		where: {
			id: id
		},
		data: {
			hasAccess: true
		}
	})
	res.status(200).json(updatedUser)
}
