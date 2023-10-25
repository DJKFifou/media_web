import {NextApiRequest, NextApiResponse} from "next";
import {User} from "@prisma/client";
import {prisma} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const body: User = req.body;
	const {user_name, article_frequency, theme, format, article_number, id} = body
	const newUser = await prisma.user.create({
		data: {
			id: id,
			user_name: user_name,
			article_frequency: article_frequency,
			article_number: article_number,
			subscribed_themes: {
				connect: theme
			},
			subscribed_formats: {
				connect: format
			}
		}
	})
	return res.status(200).json(newUser)
}
