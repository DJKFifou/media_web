import { NextApiRequest, NextApiResponse } from "next"
import { Article } from "@prisma/client"
import { prisma } from "@/lib/prisma"

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  const newArticle = await prisma.article.create({
    data: {
      title: body.title,
      content: body.content,
      reading_duration: body.reading_duration,
      publish_date: new Date(),
    },
  })
  return res.status(200).json(newArticle)
}
