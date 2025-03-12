import {
  Gochi_Hand,
  JetBrains_Mono,
  Libre_Franklin,
  Oswald,
} from "next/font/google";

import "./globals.css";

import Header from "@/components/header";

import "@/utils/pwa-handler";
import Link from "next/link";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const gochiHand = Gochi_Hand({
  variable: "--font-gochi-hand",
  subsets: ["latin"],
  weight: ["400"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${libreFranklin.variable} ${jetBrainsMono.variable} ${gochiHand.variable}`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#111111" />
      </head>
      <body className="relative antialiased font-sans text-text flex flex-col items-center w-full min-h-screen bg-background pb-16">
        <div className="w-full py-3 bg-dark flex justify-center text-white text-xs uppercase">
          <div className="w-full max-w-[1260px] flex justify-between flex-wrap py-0 px-6 lg:px-8 gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/cdnkr"
                className="hover:text-tertiary transition-all duration-300"
              >
                github
              </a>
              <a
                href="https://linkedin.com/in/cdnkr"
                className="block hover:text-tertiary transition-all duration-300"
              >
                linkedin
              </a>
              <a
                href="https://x.com/chaddanker"
                className="block hover:text-tertiary transition-all duration-300"
              >
                x
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/about/blog" className="hover:text-tertiary transition-all duration-300">
                About This Blog
              </Link>
              {/* <Me className="block" /> */}
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1260px] flex flex-col items-center py-8 px-6 lg:px-8">
          <Header className="z-[1]" />
          {children}
        </div>
        <div className="absolute bottom-0 w-full py-2 bg-dark flex justify-center text-white text-xs uppercase">
          <div className="w-full max-w-[1260px] flex justify-start items-center flex-wrap py-0 px-6 lg:px-8 gap-4">
            © {new Date().getFullYear()} cdnkr
          </div>
        </div>
      </body>
    </html>
  );
}
