import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import useSubscription from "../hooks/useSubscription";
import Membership from "../components/Membership";
import { GetStaticProps } from "next";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments, { goToBillingPortal } from "../lib/stripe";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";

interface Props {
  products: Product[];
}

const Account = ({ products }: Props) => {
  const subscription = useSubscription();

  const [loading, setLoading] = useState(false);

  const cancelSubscription = async () => {
    setLoading(true);

    try {
      await goToBillingPortal();

      setLoading(false);
    } catch (err) {
      console.log(err);

      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>

        <link rel="icon" href="/netflix-logo.jpeg" />
      </Head>

      <header className="bg-[#141414] fixed top-0 w-screen z-40">
        <div className="flex items-center justify-between space-x-4 py-3 px-5 md:py-5 md:px-8">
          <Link href="/">
            <img
              className="w-24 h-8 cursor-pointer"
              src="https://rb.gy/ulxxee"
              loading="lazy"
              alt=""
            />
          </Link>

          <Link href="/account">
            <img
              className="w-7 h-7 cursor-pointer"
              src="https://rb.gy/g1pwyx"
              loading="lazy"
              alt=""
            />
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto pt-24 pb-12 px-5 md:px-10 transition-all">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-2xl md:text-3xl font-medium">Account</h1>

          <div className="flex items-center space-x-1.5">
            <img
              className="w-7 h-7 object-cover"
              src="https://rb.gy/4vfk4r"
              alt=""
            />

            <p className="text-xs font-semibold text-[#555]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>

        <Membership />

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0 text-sm md:text-base">
          <h4 className="text-lg text-[gray]">Plan Details</h4>

          <div className="col-span-2 font-medium">
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>

          <button
            className="w-fit text-blue-500 hover:underline md:text-right disabled:cursor-not-allowed"
            disabled={loading || !subscription}
            onClick={cancelSubscription}
          >
            {loading ? "Loading..." : "Change plan"}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 text-sm md:text-base">
          <h4 className="text-lg text-[gray]">Settings</h4>

          <button
            className="text-blue-500 w-fit text-left hover:underline"
            onClick={() => signOut(auth)}
          >
            Sign out of all devices
          </button>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  });

  return {
    props: {
      products,
    },
  };
};

export default Account;
