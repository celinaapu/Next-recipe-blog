"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@recipeblog/utils/axios";

type NewUser = {
  username: string;
  email: string;
  password: string;
  gender: string;
};

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationFn: (newUser: NewUser) => {
      console.log("i am here 2", newUser);
      return api.post("/api/auth/register", newUser);
    },
    mutationKey: ["signup"],
    onSuccess: () => {
      return router.push("/profile");
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords don't match.");
      return;
    }
    console.log("i am here 1");
    mutate({ username, email, password, gender });
  };

  return (
    <div className="max-w-3xl  mx-auto mt-6 ">
      <h1 className="text-center font-bold text-[20px] pb-3">Sign Up</h1>
      {error && <p style={{ color: "red" }}>{formError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-2 font-bold border h-14 mb-5 focus:outline-none border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="">Gender</label>
          <input
            type="text"
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-2 font-bold border h-14 mb-5 focus:outline-none border-gray-300 rounded"
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 font-bold  h-14 border mb-5 focus:outline-none border-gray-300 rounded"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 font-bold  h-14 border mb-5 focus:outline-none border-gray-300 rounded"
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 font-bold  h-14 border mb-5 focus:outline-none border-gray-300 rounded"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full h-14 bg-blue-500 mb-5 text-white rounded hover:bg-blue-600"
            disabled={isPending}
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>

      {/* Submission Status */}
      {isPending && (
        <div className="mt-4 text-center text-green-500">
          <p>Loading...</p>
        </div>
      )}

      <div className="text-center flex flex-row justify-center mt-4">
        <p className="pr-2">Already have an account?</p>
        <Link
          href="/signIn"
          className="text-green-700 pr-2 font-bold underline"
        >
          Sign In
        </Link>
        <p>here</p>
      </div>
    </div>
  );
};

export default SignUp;
