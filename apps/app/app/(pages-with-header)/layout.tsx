// import Header from "@/components/Header";
import Header from "@/components/new/Header";
import { getUserId } from "@/draw/server-http";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserId();
  console.log("in the pages with header layout", userId);

  return (
    <div className="bg-[#F8FFF8] dark:bg-[#121212]">
      {/* <Header userId={userId} />
      <div className="lg:px-20 px-10">{children}</div> */}
      <>
        <Header />
        {children}
      </>
    </div>
  );
}
