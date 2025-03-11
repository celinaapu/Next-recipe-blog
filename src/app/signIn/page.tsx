"use client";

import { useState } from "react";
import PageLogo from "../../../public/assets/images/blogLogo.jpeg";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex flex-row h-screen px-10">
      <div className="flex w-[57%] bg-mainBackground h-full bg-cover">
        <Link
          href="/"
          className="text-center pointer-events-none  relative w-full inset-0 flex items-center justify-center"
        >
          <div className="absolute  z-0">
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
          <div>
            <input
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
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
            className="w-full h-16 mb-4 py-2  mt-5 text-xl bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Sign In
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
