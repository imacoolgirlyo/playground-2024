import HomeComponent from "./components/HomeComponent";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <main style={{ border: "1px solid red", height: "100vh" }}>
      <HomeComponent />
    </main>
  );
}
