import {
  Gochi_Hand,
  JetBrains_Mono,
  Libre_Franklin,
  Oswald,
} from "next/font/google";

import "./globals.css";

import Header from "@/components/header";

import "@/utils/pwa-handler";
import ThemeToggle from "@/components/themetoggle";

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
        <div className="w-full py-3 bg-background flex justify-center text-dark text-xs uppercase">
          <div className="w-full max-w-[1260px] flex justify-center flex-wrap py-0 px-6 lg:px-8 gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/cdnkr"
                className="hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>
              <a
                href="https://linkedin.com/in/cdnkr"
                className="block hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </a>
              <a
                href="https://x.com/chaddanker"
                className="block hover:text-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                x
              </a>
            </div>
            {/* <div className="flex items-center gap-4">
              <Link href="/about/blog" className="hover:text-tertiary transition-all duration-300">
                About This Blog
              </Link>
            </div> */}
            <ThemeToggle />
          </div>
        </div>
        <div className="w-full max-w-[1260px] flex flex-col items-center py-8 px-6 lg:px-8">
          <Header className="z-[1]" />
          {children}
        </div>
        <div className="absolute bottom-0 w-full py-2 bg-background flex justify-center text-dark text-xs uppercase">
          <div className="w-full max-w-[1260px] flex justify-center items-center flex-wrap py-0 px-6 lg:px-8 gap-4">
            © {new Date().getFullYear()} cdnkr
          </div>
        </div>
      </body>
    </html>
  );
}
