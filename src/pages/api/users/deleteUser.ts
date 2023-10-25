import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;
  const id = data.id;
  const deleteUser = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return res.json(deleteUser);
}
