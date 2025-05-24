import MainCanvas from "@/components/MainCanvas";
import React from "react";

const page = async ({ params }: { params: { roomSlug: string } }) => {
  const roomSlug = await params.roomSlug;

  return <MainCanvas roomSlug={roomSlug} />;
};

export default page;
