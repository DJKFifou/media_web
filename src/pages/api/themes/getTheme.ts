import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const id = query.id as string;
  const theme = await prisma.theme.findUnique({
    where: {
      id: id,
    },
  });
  return res.status(200).json(theme);
}
