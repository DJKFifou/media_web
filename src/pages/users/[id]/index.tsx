import { User } from ".prisma/client";
import Layout from "@/components/user/layout";
import useUser from "@/hooks/useUser";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function User() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const id = router.query.id as string;
  const { getUser } = useUser();

  useEffect(() => {
    getUser(id).then((user) => {
      setCurrentUser(user);
    });
  }, [id]);

  const title = (article_frequency: string) => {
    // const article_frequency = currentUser?.article_frequency
    const today = dayjs();
    const dayString = today.format("dddd");
    const monthString = today.format("MMMM");
    switch (article_frequency) {
      case "DAY":
        return `Selection du ${dayString}`;
      case "WEEK":
        return "Selection de la semaine";
      case "MONTH":
        return `Selection du ${monthString}`;
    }
  };

  return (
    <Layout userId={id}>
      <h1>{`Bienvenue ${currentUser?.user_name}`}</h1>
      <p>{title("WEEK")}</p>
      <Link href={`/users/${id}/parameters`}>Mes Parametres</Link>
    </Layout>
  );
}
