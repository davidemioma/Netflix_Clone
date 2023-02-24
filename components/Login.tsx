import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import BtnSpinner from "./BtnSpinner";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";

interface FormProps {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const [siginingIn, setSigningIn] = useState(true);

  const [loading, setisLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProps>();

  const onSubmitHandler = (formData: FormProps) => {
    setisLoading(true);

    if (siginingIn) {
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then((user) => {
          setisLoading(false);

          router.push("/");
        })
        .catch((err) => {
          setisLoading(false);

          alert(err.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((user) => {
          setisLoading(false);

          router.push("/");
        })
        .catch((err) => {
          setisLoading(false);

          alert(err.message);
        });
    }
  };

  return (
    <div className="relative h-screen w-screen bg-black md:bg-transparent flex flex-col items-center md:justify-center ">
      <Head>
        <title>Netflix Clone - Login</title>

        <link rel="icon" href="/netflix-logo.jpeg" />
      </Head>

      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 hidden opacity-60 sm:inline"
        objectFit="cover"
        alt=""
      />

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
        loading="lazy"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
        alt=""
      />

      <form
        className="w-full mt-24 md:mt-0 z-30 bg-black/75 py-10 px-6 md:px-14 md:max-w-md rounded"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <h1 className="text-3xl font-semibold mb-5">
          {siginingIn ? "Sign in" : "Sign Up"}
        </h1>

        <div className="mb-4">
          <input
            {...register("email", { required: true })}
            className={`formControls input  ${
              errors.email && "border-b-2 border-orange-500"
            }`}
            type="email"
            placeholder="Email"
          />

          {errors.email && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Please enter a valid email.
            </p>
          )}
        </div>

        <div className="mb-8">
          <input
            {...register("password", { required: true })}
            className={`formControls input ${
              errors.email && "border-b-2 border-orange-500"
            }`}
            type="password"
            placeholder="Password"
          />

          {errors.password && (
            <p className="p-1 text-[13px] font-light  text-orange-500">
              Your password must contain between 4 and 60 characters.
            </p>
          )}
        </div>

        <button
          className="flex items-center justify-center formControls bg-[#E50914] text-white"
          type="submit"
        >
          {!loading && <p>{siginingIn ? "Sign in" : "Sign Up"}</p>}

          {loading && <BtnSpinner />}
        </button>

        {siginingIn && (
          <div className="mt-12 flex items-center space-x-2">
            <p className="text-sm text-[gray]">New to Netflix?</p>

            <button className="text-sm" onClick={() => setSigningIn(false)}>
              Sign Up
            </button>
          </div>
        )}

        {!siginingIn && (
          <div className="mt-12 flex items-center space-x-2">
            <p className="text-sm text-[gray]">Already have an account?</p>

            <button className="text-sm" onClick={() => setSigningIn(true)}>
              Sign In
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
