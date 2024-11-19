import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Luis Lozoya",
  description: "Portfolio Page",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-gray-900`}>
        <Navbar />
        <main className="pt-20">{children}</main>{" "}
        {/* Added padding to avoid overlap with fixed navbar */}
        <Footer />
      </body>
    </html>
  );
}
