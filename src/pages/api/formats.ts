import {prisma} from '@/lib/prisma';
import {NextApiRequest, NextApiResponse} from "next";
import {Format_Name} from ".prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const data = [
		{title: Format_Name.VIDEO, slug: 'Vidéo'},
		{title: Format_Name.ARTICLE, slug: 'Article'},
		{title: Format_Name.PODCAST, slug: 'Podcast'}
	]
	const newFormat = await prisma.format.createMany({
		data: data
	})
	res.json(newFormat)
}
