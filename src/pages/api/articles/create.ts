import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;
  console.log("/api/articles/create request", body);
  const newArticle = await prisma.article.create({
    data: {
      title: body.title,
      content: body.content,
      reading_duration: body.reading_duration,
      topic: {
        connect: { id: body.topic },
      },
      media: {
        connect: { id: body.media_id },
      },
      image: body.image,
      format: body.format,
      link: body.link,
    },
  });

  return res.status(200).json(newArticle);
}
