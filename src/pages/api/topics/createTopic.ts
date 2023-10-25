import { NextApiRequest, NextApiResponse } from "next"
import { Topic } from "@prisma/client"
import { prisma } from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  const newTopic = await prisma.topic.create({
    data: {
      introduction_text: body.introduction_text,
      is_hot: body.is_hot,
      theme: {
        connect: { id: body.theme_id },
      },
      title: body.title,
      slug: body.slug,
      publish_date: body.publish_date,
    },
  })
  return res.status(200).json(newTopic)
}
