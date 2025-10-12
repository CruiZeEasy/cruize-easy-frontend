import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Load Inter font from Google
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-poppins",
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
      <body className={`${inter.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
