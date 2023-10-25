import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { topicId } = req.query;
  if (topicId !== undefined && typeof topicId === "string") {
    const articles = await prisma.article.findMany({
      where: {
        topic_id: {
          equals: topicId,
        },
      },
    });
    return res.status(200).json(articles);
  }
}
