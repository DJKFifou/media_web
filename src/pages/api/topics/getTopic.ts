import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const id = query.id as string;
  const topic = await prisma.topic.findUnique({
    where: {
      id: id,
    },
  });
  return res.status(200).json(topic);
}
