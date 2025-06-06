"use client";

import { FormEvent, useState } from "react";
import PageLogo from "../../../public/assets/images/blogLogo.jpeg";
import Image from "next/image";
import Link from "next/link";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@recipeblog/utils/axios";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: (loginData: LoginData) => {
      return api.post("/api/auth/login", loginData, {
        withCredentials: true,
      });
    },

    mutationKey: ["signin"],
    onSuccess: () => {
      return router.push("/");
    },
    onError: () => {
      setFormError("Invalid email or password.");
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("Both fields are required");
      return;
    }

    mutate({ email, password });
  };

  return (
    <div className="w-full flex flex-row h-[100vh] px-10">
      <div className="flex w-[57%] bg-mainBackground sm:hidden md:block h-full bg-cover">
        <Link
          href="/"
          className="text-center pointer-events-none h-full relative w-full inset-0 flex items-center justify-center"
        >
          <div className="absolute items-center ">
            <Image
              src={PageLogo}
              alt="blogLogo"
              className="w-56 h-auto pointer-events-auto flex justify-center text-center items-center "
            />
          </div>
        </Link>
      </div>
      <div className="w-[40%] h-full max-w-3xl mx-auto flex flex-col pt-4">
        <div className="flex text-end items-end w-full  justify-end">
          <Image
            src={PageLogo}
            alt="blogLogo"
            className="w-32 h-auto mb-4 flex items-end text-end justify-end"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="justify-center pt-10  flex flex-col"
        >
          {formError && <p className="text-red-600">{formError}</p>}
          <div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your Eamil "
              className="w-full h-16 text-xl mb-4 p-2 focus:outline-none border border-gray-300 rounded"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full h-16 mb-4 text-xl p-2 border focus:outline-none border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full h-16 mb-4 py-2  mt-5 text-xl bg-blue-500 text-white rounded hover:bg-green-600"
          >
            {isPending ? "Logging In..." : "Login"}
          </button>
          <div className="flex flex-col justify-center text-center w-full mt-4">
            <Link href="/signUp" className="text-blue-800 underline mb-3">
              Create Account
            </Link>
            <Link href="/signUp" className="text-gray-500 underline ">
              Forget Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
