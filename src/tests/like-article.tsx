import { prisma } from "@/lib/prisma";

async function main() {
  const likedArticle = await prisma.article.update({
    where: {
      id: "clo5uez22001843vgg6rigb4b",
    },
    select: {
      liked_by: true,
    },
    data: {
      liked_by: {
        connect: {
          user_name: "matteo.gauthier@gmail.com",
        },
      },
    },
  });

  console.log(likedArticle);
}

main();
