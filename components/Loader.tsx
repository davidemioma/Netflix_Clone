import React from "react";
import Head from "next/head";

const Loader = () => {
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <Head>
        <title>Netflix Clone</title>

        <link rel="icon" href="/netflix-logo.jpeg" />
      </Head>

      <img
        className="w-[300px] h-[300px] object-contain animate-pulse"
        src="/assets/netflixlogo.jpg"
        alt="logo"
      />
    </div>
  );
};

export default Loader;
