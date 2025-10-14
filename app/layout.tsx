import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ffffff",
};

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

const source_sans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
  variable: "--font-source-sans",
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
      <body
        className={`${inter.variable} ${poppins.variable} ${source_sans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
