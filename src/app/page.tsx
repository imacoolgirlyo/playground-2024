import Header from "./components/Header";
import styles from "./page.module.css";

const delay = async (ms: number) => setTimeout(() => {}, ms);
const delay2 = async (ms: number) =>
  new Promise((resolve) => setTimeout(() => resolve, ms));

async function getData() {
  await delay2(1000);
  return { data: "data" };
}

export default async function Home() {
  // const data = await getData();
  // console.log("data: ", data);
  return (
    <main className={styles.main}>
      <Header />
    </main>
  );
}
