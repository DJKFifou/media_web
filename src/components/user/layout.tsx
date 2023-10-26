import Link from "next/link";
import React from "react";
import styles from "@/components/feed/feed.module.scss";

type LayoutType = {
  userId: string;
  children: React.ReactNode;
};

export default function Layout({ userId, children }: LayoutType) {
  return (
    <div className={styles.bottomNav}>
      {children}
      <Link href={`/users/${userId}/`}>Vos actualité</Link>
      <Link href={`/users/${userId}/friends/`}>Vos amis</Link>
    </div>
  );
}
