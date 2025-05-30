"use client";

import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { WS_URL } from "@/lib/utils";

const MainCanvas = ({ roomSlug }: { roomSlug: string }) => {
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const ws = new WebSocket(`${WS_URL}?token=${token.split("Bearer ")[1]}`);
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join_room",
          payload: { roomSlug },
        })
      );
      setSocket(ws);
    };
  }, [roomSlug]);

  if (!socket) {
    return <div>connecting to server...</div>;
  }

  return <Canvas socket={socket} roomSlug={roomSlug} />;
};

export default MainCanvas;
