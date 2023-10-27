import { NextApiRequest, NextApiResponse } from "next";
import { Article_Frequency } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const body: {
    id: string,
    user_name?: string,
    themes?: string[],
    article_number?: number,
    article_frequency?: Article_Frequency
  } = req.body

  const updatedUser = await prisma.user.update({
    where: {
      id: body.id
    },
    data: {
      user_name: body.user_name,
      article_frequency: body.article_frequency,
      article_number: body.article_number,
      subscribed_themes: {
        connect: body.themes?.map((theme) => ({id: theme}))
      }
    }
  });
  return res.status(200).json(updatedUser)
}
