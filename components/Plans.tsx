import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { signOut } from "@firebase/auth";
import { auth } from "../firebase";
import { CheckIcon } from "@heroicons/react/outline";
import { Product } from "@stripe/firestore-stripe-payments";
import Table from "./Table";
import BtnSpinner from "./BtnSpinner";
import { useAuthState } from "react-firebase-hooks/auth";
import { loadCheckout } from "../lib/stripe";

interface Props {
  products: Product[];
}

const Plans = ({ products }: Props) => {
  const [user] = useAuthState(auth);

  const [selectedPlan, setSeletedPlan] = useState<Product | null>(products[2]);

  const [loading, setLoading] = useState(false);

  const subscribeHandler = async () => {
    setLoading(true);

    try {
      await loadCheckout(selectedPlan?.prices[0]?.id!);

      setLoading(false);
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  return (
    <div>
      <Head>
        <title>Netflix - Plans</title>

        <link rel="icon" href="/netflix-logo.jpeg" />
      </Head>

      <header className="flex items-center justify-between py-3 px-5 md:py-5 md:px-8 border-b-[0.3px] border-gray-600">
        <Link href="/">
          <img
            className="cursor-pointer object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
            alt="logo"
            width={150}
            height={90}
          />
        </Link>

        <button className="hover:underline" onClick={() => signOut(auth)}>
          Sign Out
        </button>
      </header>

      <main className="py-10 px-5 md:px-10 mx-auto max-w-5xl transition-all">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">
          Choose the plan that is right for you
        </h1>

        <ul>
          <li className="plansBenefits">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>

          <li className="plansBenefits">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>

          <li className="plansBenefits">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        <div className="w-full mt-7 flex flex-col">
          <div className="w-full md:w-3/5 flex items-center self-end justify-end">
            {products.map((product) => (
              <div
                key={product.id}
                className={`${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                } planBox`}
                onClick={() => setSeletedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          <button
            className="bg-[#E50914] flex items-center justify-center mt-6 hover:bg-[#f6121d] py-3 mx-auto w-11/12 sm:w-[420px] shadow-md text-white rounded disabled:cursor-not-allowed"
            disabled={loading || !selectedPlan || !user}
            onClick={subscribeHandler}
          >
            {loading ? <BtnSpinner /> : <p>Subscribe</p>}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;
