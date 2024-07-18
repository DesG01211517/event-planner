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
            <h1>Home</h1>
          </nav>
        </header>
        {children}
        <footer className="text-center">&copy; Codex January Cohort</footer>
      </body>
    </html>
  );
}
