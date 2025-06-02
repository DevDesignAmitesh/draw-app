"use client";

import { HTTP_URL } from "@/lib/utils";
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextProps {
  authenticated: boolean;
  userId: string;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true); // loading while checking token

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setAuthenticated(false);
        setUserId("");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${HTTP_URL}/who`, {
          headers: {
            Authorization: token,
          },
        });

        if (res.status === 201) {
          setAuthenticated(true);
          setUserId(res.data.message.userId);
        } else {
          setAuthenticated(false);
          setUserId("");
        }
      } catch (err) {
        setAuthenticated(false);
        setUserId("");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []); // ✅ only run once on mount

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ authenticated, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
