import type { Metadata } from "next";
import "./globals.css";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";

export const metadata: Metadata = {
  title: "The Shack Chapin",
  description:
    "the shack chapin is a restaurant in Chapin, SC, serving delicious food with a laid-back vibe.",
  icons: {
    icon: "/images/home/logo.png", // ✅ Start from root
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
