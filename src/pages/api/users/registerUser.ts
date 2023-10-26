import { prisma } from "@/lib/prisma";
import { RegisterUserPayload } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // @todo check method
  
  const body = req.body as RegisterUserPayload;
  const newUser = await prisma.user.create({
    data: {
      id: body.id,
      user_name: body.username,
    },
  });
  return res.status(200).json(newUser);
}
