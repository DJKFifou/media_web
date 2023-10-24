import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/lib/prisma";

export default async function getThemes(req: NextApiRequest, res: NextApiResponse){
	const themes = await prisma.theme.findMany()
	return res.status(200).json(themes)
}
