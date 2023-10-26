import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const articleId = req.query.id as string;
  const userId = req.body.userId;

  if (!userId || !articleId) {
    return res.status(400).json({ message: "Missing userId or articleId" });
  }

  const article = await prisma.article.findFirst({
    where: {
      id: {
        equals: articleId,
      },
      liked_by: {
        some: {
          id: userId,
        },
      },
    },
    include: {
      _count: true,
    },
  });

  return res.status(200).json({ isSave: !!article });
}
