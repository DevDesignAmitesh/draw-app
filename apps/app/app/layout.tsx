import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/ThemeProvider";

export const metadata: Metadata = {
  title: "Collaborating Drawing App",
  description: "Hand-drawn look & feel • Collaborative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#121212]">
        <ThemeProvider>{children}</ThemeProvider> 
      </body>
    </html>
  );
}
