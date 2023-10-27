import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id as string;
  const articles = await prisma.article.findMany({
    where: {
      liked_by: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      topic: {
        include: {
          theme: true,
        },
      },
    },
  });
  return res.status(200).json(articles);
}
