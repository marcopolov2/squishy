import { ReactNode } from "react";
import "../styles/global.css";
import Theme from "@/theme-provider";
import Image from "next/image";
import logo from "./public/logo.svg";

export const metadata = {
  title: "Squishi",
  description: "Squish your images smaller",
  icons: { icon: "/public/icon.svg" },
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />

      <body className="bg-white text-black dark:bg-gray-800 dark:text-white flex flex-col min-h-screen">
        <Theme>
          <header className="bg-blue-300 text-white dark:text-blue-300 p-4 text-center dark:bg-gray-800">
            <Image src={logo} alt="logo" className="w-36 m-auto" priority />
          </header>
          <main className="container mx-auto p-4 flex-1">{children}</main>

          <footer className="bg-gray-100 text-gray-500 p-4 mt-16 text-center dark:bg-gray-800">
            <p>© 2025 Squishi</p>
          </footer>
        </Theme>
      </body>
    </html>
  );
}
