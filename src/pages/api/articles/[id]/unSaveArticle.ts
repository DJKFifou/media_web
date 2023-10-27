import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const articleId = req.query.id as string;
  const userId = req.body.userId;

  const unSaveArticle = await prisma.article.update({
    where: {
      id: articleId
    },
    data:{
      liked_by: {
        disconnect: {id: userId}
      }
    }
  })
  return res.status(200).json(unSaveArticle);
}
