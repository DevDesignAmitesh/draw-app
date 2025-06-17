import Header from "@/components/Header";
import { getUserId } from "@/draw/server-http";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserId();
  console.log("in the pages with header layout", userId);

  return (
    <>
      <Header userId={userId} />
      <div className="lg:px-20 px-10">{children}</div>
    </>
  );
}
