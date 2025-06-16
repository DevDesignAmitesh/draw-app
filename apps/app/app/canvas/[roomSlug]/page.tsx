import MainCanvas from "@/components/MainCanvas";
import { getUserId } from "@/draw/http";
import { cookies } from "next/headers";
import React from "react";

const page = async ({ params }: { params: Promise<{ roomSlug: string }> }) => {
  const { roomSlug } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const userId = await getUserId();

  return <MainCanvas roomSlug={roomSlug} userId={userId!} token={token!} />;
};

export default page;
