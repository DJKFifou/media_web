import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
	const data = [
		{title: "Le Monde"},
		{title: "Libération"},
		{title: "Le Figaro"},
		{title: "Les Echos"},
		{title: "L'Opinion"},
		{title: "Le Parisien"},
		{title: "Agefi"},
		{title: "La Croix"},
		{title: "Médiapart"},
		{title: "Sud-Ouest"},
		{title: "Le Télégramme"},
		{title: "Le Point"},
		{title: "L'Express"},
		{title: "Le Nouvel observateur"},
		{title: "L'Epansion"},
		{title: "Paris Match"},
		{title: "Elle"},
		{title: "Société Générale de Presse"},
		{title: "Le Courrier de l'Europe"},
		{title: "Contexte"},
		{title: "Paris-Berlin"},
		{title: "Bruxelles2"},
		{title: "Agra Europe"},
	];
	const createMedia = await prisma.media.createMany({
		data: data
	})
	return res.status(200).json(createMedia)
}
