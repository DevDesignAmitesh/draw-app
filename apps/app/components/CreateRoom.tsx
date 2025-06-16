"use client";

import React, { useState, useEffect } from "react";
import InputBox from "./InputBox";
import SuperBtn from "./SuperBtn";
import axios from "axios";
import { HTTP_URL } from "@/lib/utils";
import { useRouter } from "next/navigation";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState<string>("");
  const [roomUrl, setRoomUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const generatedUrl = roomName.trim().replace(/\s+/g, "-").toLowerCase();
    setRoomUrl(generatedUrl);
  }, [roomName]);

  const handleRoomCreation = async () => {
    if (!roomName.trim() || !roomUrl.trim()) {
      alert("fill up all the details");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${HTTP_URL}/create-room`,
        {
          name: roomName,
          slug: roomUrl,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        router.push(`/canvas/${res.data.slug}`);
      }
    } catch (err: any) {
      alert("Room creation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center p-10">
      <h1 className="text-3xl font-bold text-center capitalize dark:text-white text-black">
        Create a new board
      </h1>
      <p className="text-[15px] capitalize mt-2 text-center text-neutral-600 dark:text-neutral-300">
        collaborative board for enjoying with friends
      </p>
      <div className="p-5 rounded-md border-2 border-neutral-600 dark:border-neutral-300 w-[450px] mt-4 flex flex-col justify-center items-center gap-4">
        <InputBox
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          label="room name"
        />
        <InputBox value={roomUrl} onChange={() => {}} label="room URL" />
        <SuperBtn
          variant="primary"
          className="w-full mt-2"
          label={loading ? "processing.." : "create board"}
          disabled={loading}
          onClick={handleRoomCreation}
        />
      </div>
    </div>
  );
};

export default CreateRoom;
