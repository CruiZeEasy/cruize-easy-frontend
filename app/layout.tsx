import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Load Inter font from Google
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Cruize Easy",
  description: "Cruize Easy car rental platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
