import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { ShopProvider } from "./context/ShopContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FurniHome - Nội Thất Cao Cấp",
  description:
    "Khám phá bộ sưu tập nội thất hiện đại, sang trọng cho không gian sống hoàn hảo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ShopProvider>
          <Header />
          {children}
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
