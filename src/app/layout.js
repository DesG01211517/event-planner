import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Planner App",
  description: "An app designed to allow you to organize any upcoming events",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={inter.className}>
        <header className="w-100">
          <nav className="flex justify-center w-100 font-bold">
            <link
              className="m-1 text-red-400 hover:text-red-600"
              href="/src/app/page.jsx"
            >
              Home
            </link>
            <link
              className="m-1 text-red-400 hover:text-red-600"
              href="/src/app/management/page.jsx"
            >
              Management
            </link>
          </nav>
        </header>
        {children}
        <footer className="text-center">&copy; Codex January Cohort</footer>
      </body>
    </html>
  );
}
