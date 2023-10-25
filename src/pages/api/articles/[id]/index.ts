import { prisma } from "@/lib/prisma"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  switch (req.method) {
    case "GET":
      const article = await prisma.article.findUnique({
        where: {
          id: id as string,
        },
      })
      return res.status(200).json(article)

    case "DELETE":
      const deletedArticle = await prisma.article.delete({
        where: {
          id: id as string,
        },
      })
      return res.status(200).json(deletedArticle)
    case "PUT":
      const modifiedArticle = await prisma.article.update({
        where: {
          id: id as string,
        },
        data: {
          title: req.body.title,
          content: req.body.content,
          reading_duration: Number(req.body.reading_duration),
          topic: {
            connect: { id: req.body.topic },
          },
          media: {
            connect: { id: req.body.media_id },
          },
          image: req.body.image,
          link: req.body.link,
          format: {
            set: req.body.format,
          },
        },
      })
      return res.status(200).json(modifiedArticle)

    default:
      return res.status(404)
  }
}
