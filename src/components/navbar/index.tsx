"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@recipeblog/utils/axios";

export const Header = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await api.get("/api/auth/checkauth", {
          withCredentials: true,
        });

        console.log("auth response:", res.data);

        // if (res.data && res.data.isLoggedIn) {

        if (res.data?.isLoggedIn) {
          setIsUserLoggedIn(true);
        } else {
          setIsUserLoggedIn(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsUserLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const handleRedirect = () => {
    router.push("/signUp");
  };

  const handleSignOut = async () => {
    try {
      await api.post("/api/auth/signout");
      setIsUserLoggedIn(false);
      setToggleDropdown(false);
      router.push("/");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return (
    <div className="w-full p-4 px-4 flex items-center justify-between top-0 bg-white/90 backdrop-blur-sm">
      <div className="w-[20%]">
        <Logo />
      </div>
      <nav className="py-3 px-8 border-2 bg-white/80 backdrop-blur-sm text-center border-black rounded-full font-medium capitalize flex items-center">
        <Link href="/" className="mr-4 hover:text-blue-500 transition-colors">
          Home
        </Link>
        <Link
          href="/about"
          className="mr-4 hover:text-blue-500 transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="mr-4 hover:text-blue-500 transition-colors"
        >
          Contact
        </Link>
      </nav>
      {!loading && (
        <div className="sm:flex hidden w-[10%] relative">
          {isUserLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setToggleDropdown((prev) => !prev)}
                className="border-2 border-gray-300 bg-white/80 hover:bg-white hover:text-black text-gray-600 rounded-full px-4 py-2 transition-colors"
              >
                Menu
              </button>
              {toggleDropdown && (
                <div className="absolute right-0 top-full mt-3 p-5 rounded-lg bg-white shadow-lg min-w-[210px] flex flex-col gap-2">
                  <Link
                    href="/profile"
                    className="w-full text-center hover:bg-black hover:text-white bg-white/80 border-2 border-transparent hover:border-black rounded-full px-4 py-2 transition-colors"
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create-recipe"
                    className="w-full text-center hover:bg-black hover:text-white bg-white/80 border-2 border-transparent hover:border-black rounded-full px-4 py-2 transition-colors"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Recipe
                  </Link>
                  <div>
                    <button
                      className="w-full text-center hover:bg-black hover:text-white bg-white/80 border-2 border-transparent hover:border-black rounded-full px-4 py-2 transition-colors"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={handleRedirect}
              className="hover:bg-black  justify-end hover:text-white bg-white/80 border-2 border-gray-300 rounded-full px-4 py-2 transition-colors"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </div>
  );
};
