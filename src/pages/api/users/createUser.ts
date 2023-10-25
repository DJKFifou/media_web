import { NextApiRequest, NextApiResponse } from "next";
import { Article_Frequency, Format, Prisma, User } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // @todo refacto
  const body: {
    id: string;
    user_name: string;
    themes: string[];
    formats: Format[];
    article_number: number;
    article_frequency: Article_Frequency;
  } = req.body;
  const newUser = await prisma.user.create({
    data: {
      id: body.id,
      user_name: body.user_name,
      article_frequency: body.article_frequency,
      article_number: body.article_number,
      subscribed_themes: {
        connect: body.themes.map((e) => ({ id: e })),
      },
      subscribed_formats: {
        set: body.formats,
      },
    },
  });
  return res.status(200).json(newUser);
}
