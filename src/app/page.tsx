import Header from "./components/Header";
import styles from "./page.module.css";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  return (
    <main className={styles.main}>
      <Header isLogin={searchParams?.login === "true"} />
    </main>
  );
}
