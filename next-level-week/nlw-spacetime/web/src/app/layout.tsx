import { ReactNode } from "react";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";
import { cookies } from "next/headers";

import { Copyright } from "@/components/Copyright";
import { Hero } from "@/components/Hero";
import { SignIn } from "@/components/SignIn";
import { Profile } from "@/components/Profile";

import "./globals.css";

const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = Bai_Jamjureee({ subsets: ["latin"], weight: '700', variable: '--font-bai-jamjuree' });

export const metadata = {
  title: "NLW Spacetime",
  description: "Sua capsula do tempo",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticate = cookies.has("token");
  return (
    <html lang="en">
        <body className={`${roboto.variable} ${ baiJamjuree.variable} font-sans bg-gray-900 text-gray-900`}>

            <main className="grid min-h-screen grid-cols-2">
              <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 px-28 py-16">
                <div className="rounder-full absolute right-0 top-1/2 h-[280px] w-[526px]  -translate-y-1/2 translate-x-1/2 bg-purple-700 opacity-50 blur-full" />
                <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

                {isAuthenticate ? <Profile /> : <SignIn />}
                <Hero />
                <Copyright />
              </div>

              <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
                {children}
              </div>
            </main>

        </body>
    </html>
  );
}
