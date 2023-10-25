import { prisma } from "@/lib/prisma"
import { Format, Prisma } from "@prisma/client"

async function main() {
  const newUser = await prisma.user.create({
    data: {
      type: "USER",
      user_name: "Matt",
      subscribed_themes: {
        connect: {
          slug: "geopolitique",
        },
      },
      subscribed_formats: {
        set: [Format.ARTICLE],
      },
    },
  })

  console.log(newUser)
}

main()
