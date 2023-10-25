import { prisma } from "@/lib/prisma";
import {NextApiRequest, NextApiResponse} from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {
	const {userId} = req.query;
	const user = await prisma.user.findUnique({
		where: {
			id: userId as string,
		},
	});
	if (!user) return;

	const topics = await prisma.topic.findMany({
		where: {
			theme: {
				subscribers: {
					some: {
						id: user.id,
					},
				},
			},
			publish_date: {
				equals: "01-10-2023",
			},
		},
		include: {
			articles: {
				where: {
					format: {
						in: user.subscribed_formats,
					},
				},
			},
			theme: true,
		},
		take: user.article_number as number
	});
	return res.status(200).json(topics)

}
