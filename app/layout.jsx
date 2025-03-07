import { JetBrains_Mono, Lexend } from "next/font/google";

import "./globals.css";

import Background from "@/components/background";
import Header from "@/components/header";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lexend.variable} ${jetBrainsMono.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased font-sans text-text flex flex-col items-center w-full min-h-screen py-8 bg-background">
        <Background />
        <div className="w-full max-w-[1260px] flex flex-col gap-8 items-center px-6 lg:px-8">
          <Header className="rounded-lg z-[1]" />
          {children}
        </div>
      </body>
    </html>
  );
}
