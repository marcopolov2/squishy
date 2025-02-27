// app/layout.tsx
import { ReactNode } from "react";
import "../styles/global.css"; // Global styles

export const metadata = {
  title: "Squishy",
  description: "An app for uploading and compressing images",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-gray-800 dark:text-white">
        <header className="bg-blue-300 text-white p-4 text-center">
          <h1>Squishy</h1>
        </header>

        <main className="container mx-auto p-4">{children}</main>

        <footer className="bg-gray-100 text-blue-300 p-4 text-center mt-8">
          <p>© 2025 Squishy</p>
        </footer>
      </body>
    </html>
  );
}
