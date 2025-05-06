"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { IoMdSunny } from "react-icons/io";
import { useState } from "react";
// import { signOut } from "next-auth/react";

export const Header = () => {
  const isUserLoggedIn = true;

  const [toggleDropdown, setToggleDropdown] = useState(false);
  return (
    <div className="w-full p-4 px-10 flex items-center justify-between fixed top-0">
      <div>
        <Logo />
      </div>
      <nav className="py-3 px-8 border-solid border-2 bg-white/80 backdrop-blur-sm text-center border-black rounded-full font-medium capitalize flex items-center">
        <Link href="/" className="mr-2">
          Home
        </Link>
        <Link href="/about" className="mr-2">
          About
        </Link>
        <Link href="/contact" className="mr-2">
          Contact
        </Link>
        <button>
          <IoMdSunny />
        </button>
      </nav>
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex flex-rol">
            <div
              role="button"
              onClick={() => setToggleDropdown((prev) => !prev)}
              className="border-2 boder bg-white/80  hover:bg-white hover:text-black text-gray-600 rounded-full px-4 py-2"
            >
              Menu
            </div>
            {toggleDropdown && (
              <div className=" absolute right-0 top-full mt-3 p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-center items-center">
                <Link
                  href="/profile"
                  className=" hover:border-2 boder  hover:bg-black hover:text-white  bg-white/80 bg- mr-2 rounded-full px-4 py-2"
                >
                  My Profile
                </Link>

                <Link
                  href="/create-post"
                  className=" hover:border-2 boder  hover:bg-black hover:text-white  bg-white/80 bg- mr-2 rounded-full px-4 py-2"
                >
                  <button>Create Post</button>
                </Link>

                <Link
                  href="/sign-out"
                  className=" hover:border-2 boder  hover:bg-black hover:text-white  bg-white/80 bg- mr-2 rounded-full px-4 py-2"
                  onClick={() => setToggleDropdown(false)}
                >
                  <div role="button">Sign Out</div>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              type="button"
              className=" hover:border-2 boder  hover:bg-black hover:text-white  bg-white/80 bg- mr-2 rounded-full px-4 py-2"
            >
              sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};
