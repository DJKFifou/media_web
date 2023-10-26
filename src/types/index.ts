import { User } from "@prisma/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
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
export type UpdateUserSubscribedThemesPayload = {
  id: string;
  themes: string[];
};

export type EnhancedUser = {
  supabase: SupabaseUser;
  db: User;
};

export type TopicThemeArticlePayload = Prisma.TopicGetPayload<{
  include: {
    theme: true;
    articles: true;
  };
}>;

export type SavedArticlePayload = Prisma.ArticleGetPayload<{
  include: {
    topic: {
      include: {
        theme: true;
      };
    };
  };
}>;
