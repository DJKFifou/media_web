import { Prisma } from "@prisma/client";

export type Credentials = {
  email: string;
  password: string;
};

export type RegisterUserPayload = {
  id: string;
  email: string;
  username: string;
};

export type TopicThemeArticlePayload = Prisma.TopicGetPayload<{
  include: {
    theme: true,
    articles: true
  }
}>;
