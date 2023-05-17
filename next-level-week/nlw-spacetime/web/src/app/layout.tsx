import { ReactNode } from "react";
import "./globals.css";
import { Roboto_Flex, Bai_Jamjuree } from "next/font/google";

const roboto = Roboto_Flex({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = Bai_Jamjureee({ subsets: ["latin"], weight: '700', variable: '--font-bai-jamjuree' });

export const metadata = {
  title: "NLW Spacetime",
  description: "Sua capsula do tempo",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <body className={`${roboto.variable} ${ baiJamjuree.variable} font-sans bg-gray-900 text-gray-900`}>{children}</body>
    </html>
  );
}
