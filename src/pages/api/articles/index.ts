import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const articles = await prisma.article.findMany({});
  return res.status(200).json(articles);
}
