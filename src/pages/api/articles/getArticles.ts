import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const articles = await prisma.article.findMany();
  res.status(200).json(articles);
}
