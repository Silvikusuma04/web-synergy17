import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const lora = Lora({ subsets: ["latin"], variable: '--font-lora', display: 'swap' });

export const metadata: Metadata = {
  title: "SYNERGY GROUP 17",
  description: "Mangrove Climate Resilience Powerhouse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}