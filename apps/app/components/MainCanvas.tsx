"use client";

import React, { useEffect, useState } from "react";
import Canvas from "./Canvas";

const MainCanvas = ({ roomSlug }: { roomSlug: string }) => {
  const [socket, setSocket] = useState<WebSocket>();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const ws = new WebSocket(`http://localhost:8080?token${token}`);
  //   ws.onopen = () => {
  //     ws.send(
  //       JSON.stringify({
  //         type: "join_room",
  //         payload: JSON.stringify({ roomSlug }),
  //       })
  //     );
  //     setSocket(ws);
  //   };

  //   return () => {
  //     ws.send(
  //       JSON.stringify({
  //         type: "leave_room",
  //       })
  //     );
  //     ws.close();
  //   };
  // }, [roomSlug]);

  // if (!socket) {
  //   return <div>connecting to server...</div>;
  // }

  return <Canvas socket={socket!} roomSlug={roomSlug} />;
};

export default MainCanvas;
