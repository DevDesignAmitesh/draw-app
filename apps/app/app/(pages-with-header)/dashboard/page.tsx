import Dashboard from "@/components/Dashboard";
import React from "react";
import ProtectedRoute from "@/context/ProtectedRoute";

const page = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default page;
