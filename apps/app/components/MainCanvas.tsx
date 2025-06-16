"use client";

import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { WS_URL } from "@/lib/utils";

const MainCanvas = ({
  roomSlug,
  userId,
  token,
}: {
  roomSlug: string;
  userId: string;
  token: string;
}) => {
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=Bearer ${token}`);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join_room",
          payload: { roomSlug, userId },
        })
      );
      setSocket(ws);
    };
  }, [roomSlug]);

  if (!socket) {
    return <div>connecting to server...</div>;
  }

  return <Canvas socket={socket} roomSlug={roomSlug} userId={userId} />;
};

export default MainCanvas;
