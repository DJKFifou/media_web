import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  const themes = await prisma.user.findUnique({
    where: {
      id: userId as string,
    },
    include: {
      subscribed_themes: true,
    },
  });
  return res.status(200).json(themes);
}
