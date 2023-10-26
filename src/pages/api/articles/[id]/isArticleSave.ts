import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse){
  const articleId = req.query.id as string;
  const userId = req.body.userId
  const article = await prisma.article.findUnique({
    where: {
      id: articleId,
      liked_by: {
        some: {
          id: userId
        }
      }
    },
  })
  const isSave = article ? true : false;
  return res.status(200).json({isSave: isSave})
}
