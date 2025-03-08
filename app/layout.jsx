import {
  Gochi_Hand,
  JetBrains_Mono,
  Libre_Franklin,
  Oswald,
} from "next/font/google";

import "./globals.css";

import Header from "@/components/header";

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
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased font-sans text-text flex flex-col items-center w-full min-h-screen bg-background">
        <div className="w-full py-4 bg-dark flex justify-center">
          <div className="w-full max-w-[1260px] flex justify-start flex-wrap py-0 px-6 lg:px-8 gap-4">
            <a
              href="https://github.com/cdnkr"
              className="uppercase text-white text-xs hover:text-primary transition-all duration-300"
            >
              github.com/cdnkr
            </a>
            <a
              href="https://linkedin.com/in/cdnkr"
              className="uppercase text-white text-xs hover:text-primary transition-all duration-300"
            >
              linkedin.com/in/cdnkr
            </a>
          </div>
        </div>
        <div className="w-full max-w-[1260px] flex flex-col gap-12 items-center py-8 px-6 lg:px-8">
          <Header className="z-[1]" />
          {children}
        </div>
        <div className="w-full py-2 bg-dark flex justify-center">
          <div className="w-full max-w-[1260px] flex justify-start items-center flex-wrap py-0 px-6 lg:px-8 gap-4">
            <span className="text-white text-xs uppercase">
              © {new Date().getFullYear()} cdnkr
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}
