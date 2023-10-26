import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function main(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const user = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
  });
  console.log("🚀 ~ file: getTopicsByThemes.ts:11 ~ user:", user);
  if (!user) return res.status(400).json({});

  const topics = await prisma.topic.findMany({
    where: {
      theme: {
        subscribers: {
          some: {
            id: user.id,
          },
        },
      },
      publish_date: {
        equals: "01-10-2023",
      },
    },
    include: {
      articles: {
        where: {
          format: {
            in: user.subscribed_formats,
          },
        },
      },
      theme: true,
    },
    take: user.article_number || undefined,
  });
  return res.status(200).json(topics);
}
