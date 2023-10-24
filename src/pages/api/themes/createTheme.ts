import {NextApiRequest, NextApiResponse} from "next";
import {Theme_Name} from ".prisma/client";
import {prisma} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const data = [
		{
			title: Theme_Name.GEOGRAPHY,
			slug: 'Géopgraphie',
		},
		{
			title: Theme_Name.CULTURE,
			slug: 'Culture,',
		},
		{
			title: Theme_Name.FASHION,
			slug: 'Mode',
		},
		{
			title: Theme_Name.HEALTH,
			slug: 'Santé',
		},
		{
			title: Theme_Name.SPORT,
			slug: 'Sport',
		},
		{
			title: Theme_Name.ENVIRONMENT,
			slug: 'Environnement',
		},
		{
			title: Theme_Name.HISTORY,
			slug: 'Histoire',
		},
		{
			title: Theme_Name.GEOPOLITIC,
			slug: 'Géopolitique',
		},
		{
			title: Theme_Name.INTERNATIONAL,
			slug: 'Internationnal',
		},
		{
			title: Theme_Name.LIFESTYLE,
			slug: 'Lifestyle',
		},
		{
			title: Theme_Name.NATIONAL,
			slug: 'National',
		},
		{
			title: Theme_Name.POLITIC,
			slug: 'Politique',
		},
		{
			title: Theme_Name.TRAVEL,
			slug: 'Voyage',
		}
	]
	const newUser = await prisma.theme.createMany({
		data: data
	});
	return res.status(200).json(newUser)
}
