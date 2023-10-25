import Layout from "@/components/user/layout";
import { useRouter } from "next/router";

export default function Friends() {
  const router = useRouter();
  const userId = router.query.id as string;
  return (
    <Layout userId={userId}>
      <h1>Recommendation de vos amis</h1>
      <p>Toutes les infos recommandés par votre cercle d'amis</p>
    </Layout>
  );
}
