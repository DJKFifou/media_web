import { prisma } from "@/lib/prisma";
import { UpdateUserSubscribedThemesPayload } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as UpdateUserSubscribedThemesPayload;
  try {
    const newUser = await prisma.user.create({
      data: {
        id: body.id,
        subscribed_themes: { connect: body.themes.map((theme) => ({ id: theme })) },
      },
    });
    return res.status(200).json(newUser);
  } catch (error) {
    console.error("[API]:updateUserSubscribedThemes error", error);
  }
}
