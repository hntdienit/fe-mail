"use client";
import { ThemeProvider } from "../../context/ThemeContext";
import React from "react";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider>
        <SessionProvider>
          <main className="px-2 py-4 min-h-screen">
            <Header />
            <div className="grid place-content-center pt-10">{children}</div>
          </main>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
};

export default ProtectedLayout;
