"use client";

import React, { useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { authenticated } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!authenticated) {
      router.push("/signup");
    }
  }, [authenticated]);

  return <>{children}</>;
};

export default ProtectedRoute;
