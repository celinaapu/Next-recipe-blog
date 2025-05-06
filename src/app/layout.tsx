// "use client";

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/navbar";

import axios from "axios";
import { Providers } from "@recipeblog/components/provider";

//import { getServerSession } from "next-auth";
//import { useSession } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Trusted Recipes",
//   description: "well tasted and trsuted recipes ",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  axios.defaults.baseURL = "http://localhost:5000";
  axios.defaults.headers.post["Content-Type"] = "application/json";
  //const { data: session } = useSession();
  return (
    <html lang="en">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
