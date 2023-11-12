import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const userId = req.query.userId as string;

  const noSaveThemes = await prisma.theme.findMany({
    where: {
      subscribers: {
        every: {
          id: {
            not: userId
          }
        }
      }
    }
  })
  return res.status(200).json(noSaveThemes)
}
