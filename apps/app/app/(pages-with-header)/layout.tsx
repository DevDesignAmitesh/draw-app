import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="className=flex flex-col min-h-screen">
        <Header />
        <div className="px-20">{children}</div>
      </body>
    </html>
  );
}
