import React from "react";
import Head from "next/head";
import FileUpload from "../components/FileUpload";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Expense Tracker</title>
        <meta
          name="description"
          content="Upload and categorize your transactions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Expense Tracker</h1>
        <FileUpload />
      </main>
    </div>
  );
};

export default Home;
