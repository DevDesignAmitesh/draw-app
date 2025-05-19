import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
