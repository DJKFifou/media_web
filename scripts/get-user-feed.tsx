import { prisma } from "@/lib/prisma";

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      user_name: "Matt",
    },
  });
  if (!user) return;

  const topics = await prisma.topic.findMany({
    where: {
      theme: {
        subscribers: {
          some: {
            user_name: "Matt",
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
  });

  console.log(topics);
}

main();
