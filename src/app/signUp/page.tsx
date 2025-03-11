"use client";

import Link from "next/link";
import { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      setIsSubmitting(false);
      return;
    }

    // Simulating form submission (replace this with actual form submission logic)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionStatus("You have successfully registered!");
    }, 1000); // Added a delay for simulating submission
  };

  return (
    <div className="max-w-3xl  mx-auto mt-24 ">
      <h1 className="text-center font-bold text-[20px] pb-3">Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>

      {/* Submission Status */}
      {submissionStatus && (
        <div className="mt-4 text-center text-green-500">
          {submissionStatus}
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
