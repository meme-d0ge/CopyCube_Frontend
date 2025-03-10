import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header/Header";
import { Chakra_Petch } from 'next/font/google'
import './globals.css'
import {Initializer} from "@/components/Initializer/Initializer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const chakraPetch = Chakra_Petch({
    variable: '--chakra-petch',
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${chakraPetch.className} min-h-[100vh] bg-neutral-900`}>
        <Initializer/>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
