"use client";

import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { WS_URL } from "@/lib/utils";

type CursorData = {
  x: number;
  y: number;
};

export type OthersMap = Record<string, CursorData>;

const MainCanvas = ({
  roomSlug,
  userId,
  token,
}: {
  roomSlug: string;
  userId: string;
  token: string;
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [others, setOthers] = useState<OthersMap>({});

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=Bearer ${token}`);
    ws.onopen = () => {
      console.log("open connection");
      ws.send(
        JSON.stringify({
          type: "join_room",
          payload: { roomSlug, userId },
        })
      );
      setSocket(ws);
    };

    ws.onerror = (e) => {
      console.error("WebSocket error ❌", e);
    };

    ws.onclose = () => {
      console.warn("WebSocket closed 🚪");
    };
  }, [roomSlug]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    const handleMouseMove = (e: MouseEvent) => {
      const data = {
        type: "send_cursor",
        payload: {
          x: e.clientX,
          y: e.clientY,
          roomSlug,
          userId,
        },
      };
      console.log("sending");
      socket.send(JSON.stringify(data));
    };

    window.addEventListener("mousemove", handleMouseMove);

    // return () => {
    //   window.removeEventListener("mousemove", handleMouseMove);
    // };
  }, [socket]);

  if (!socket) {
    return <div>connecting to server...</div>;
  }

  return (
    <>
      <div>
        {Object.entries(others).map(([id, user]) => (
          <div
            key={id}
            style={{
              position: "fixed",
              zIndex: "1000",
              left: user.x,
              top: user.y,
              backgroundColor: "lightgreen",
              padding: "2px 6px",
              borderRadius: "4px",
              pointerEvents: "none",
              transform: "translate(-50%, -50%)", // optional centering tweak
            }}
          >
            {id.slice(0, 10)} 👆
          </div>
        ))}
      </div>
      <Canvas
        socket={socket}
        roomSlug={roomSlug}
        userId={userId}
        setOthers={setOthers}
      />
    </>
  );
};

export default MainCanvas;
