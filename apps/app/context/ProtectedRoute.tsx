"use client";

import React, { useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.replace("/signup");
    }
  }, [authenticated]);

  return <>{authenticated ? children : null}</>;
};

export default ProtectedRoute;
