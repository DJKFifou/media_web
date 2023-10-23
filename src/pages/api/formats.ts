import {prisma} from '@/lib/prisma';
import {NextApiRequest, NextApiResponse} from "next";
import {Format_Name}  from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const method = req.method;
	if(method){
		switch (method){
			case 'POST' : return createFormats(req, res)
			case 'GET' : return getFormats(req, res)
		}
	}
	return res.json(method)
}

async function getFormats(req: NextApiRequest, res: NextApiResponse){
	const formats = await prisma.format.findMany()
	res.status(200).json(formats)
}

async function createFormats(req: NextApiRequest, res: NextApiResponse){
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
