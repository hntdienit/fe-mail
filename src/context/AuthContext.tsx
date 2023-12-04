"use client";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

// type user = {
//   id: number;
//   email: string;
//   username: string;
//   isAdmin: boolean;
// };

export const AuthProvider = ({ children }: any) => {
  let user: string = "";
  const ISSERVER = typeof window === "undefined";
  if (!ISSERVER) user = localStorage.getItem("user") || "";

  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    localStorage.setItem("user", currentUser);
  }, [currentUser]);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser }}>{children}</AuthContext.Provider>;
};
