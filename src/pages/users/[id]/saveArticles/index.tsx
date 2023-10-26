import ArticleCard from "@/components/Cards/ArticleCard/ArticleCard";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SaveArticles() {
  const router = useRouter();
  const { currentUser } = useAuth();
  const userId = router.query.id as string;

  const savedArticles = ["hey"];

  return (
    <div>
      <Link href={`/users/${userId}/`}>Retour</Link>
      <h1>Articles sauvegardés</h1>
      {savedArticles && savedArticles.length > 0
        ? savedArticles.map((article, index) => {
            return <div key={index}>{/* <ArticleCard article={article} /> */}</div>;
          })
        : null}
    </div>
  );
}
