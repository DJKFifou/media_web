import { NextApiRequest, NextApiResponse } from "next"
import { Article_Frequency, Format, Prisma, User } from "@prisma/client"
import { prisma } from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // @todo refacto
  const body: {
    id: string
    user_name: string
    theme: {
      id: string
    }[]
    format: {
      id: string
    }[]
    article_number: number
    article_frequency: Article_Frequency
  } = req.body
  const newUser = await prisma.user.create({
    data: {
      id: body.id,
      user_name: body.user_name,
      article_frequency: body.article_frequency,
      article_number: body.article_number,
      subscribed_themes: {
        connect: body.theme,
      },
      subscribed_formats: {
        set: body.format.map((e) => e.id as Format),
      },
    },
  })
  return res.status(200).json(newUser)
}
