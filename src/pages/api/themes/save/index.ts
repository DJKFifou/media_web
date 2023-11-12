import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const userId = req.query.userId as string;

  const saveThemes = await prisma.theme.findMany({
    where: {
      subscribers: {
        some: {
          id: userId
        }
      }
    }
  })
  return res.status(200).json(saveThemes)
}
