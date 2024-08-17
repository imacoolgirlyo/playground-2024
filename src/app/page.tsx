import HomeComponent from "./components/HomeComponent";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await fetch("http://localhost:3000/api/hello")
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.error(err);
      return null;
    });

  console.log(data);

  return (
    <main style={{ height: "100vh" }}>
      <HomeComponent />
    </main>
  );
}
