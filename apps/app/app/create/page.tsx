import CreateRoom from "@/components/CreateRoom";
import ProtectedRoute from "@/context/ProtectedRoute";
import React from "react";

const page = () => {
  return (
    <ProtectedRoute>
      <CreateRoom />
    </ProtectedRoute>
  );
};

export default page;
