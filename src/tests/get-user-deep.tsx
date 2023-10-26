import { prisma } from "@/lib/prisma";

async function main() {
  const article = await prisma.article.findFirst({
    where: {
      id: {
        equals: "clo5uez22001843vgg6rigb4b",
      },
      liked_by: {
        some: {
          user_name: "aure",
        },
      },
    },
    include: {
      _count: true,
    },
  });

  console.log(JSON.stringify(article, null, 2));
}

main();
