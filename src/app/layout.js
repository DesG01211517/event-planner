import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Planner App",
  description: "An app designed to allow you to organize any upcoming events",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="w-100">
          <nav className="flex justify-center w-90 font-bold">
            <Link className="m-0 text-red-400 hover:text-red-600" href="/">
              Home
            </Link>
            <Link
              className="m-0 text-red-400 hover:text-red-600"
              href="/management"
            >
              Management
            </Link>
          </nav>
        </header>
        {children}
        <footer className="text-center">&copy; Codex January Cohort</footer>
      </body>
    </html>
  );
}
