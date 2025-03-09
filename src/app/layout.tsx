import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import "./globals.css";
import { cookieToInitialState } from "wagmi";
import { config } from "@/config";
import Web3ModalProvider from "@/context";
import { Providers } from "./providers";

const inter = Mitr({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galaxy Spin - fastest way to get rich in the galaxy",
  description:
    "Daily winner gets the entire prize pool! The first FIAT and WEB3 integrated lottery game in the galaxy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config);

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {" "}
        <Providers>
          <Web3ModalProvider initialState={initialState}>
            {children}
          </Web3ModalProvider>
        </Providers>
      </body>
    </html>
  );
}
