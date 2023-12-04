"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Avatar from "./Avatar";

const ProfileCard = () => {
  const { data: session } = useSession();

  return (
    session?.user && (
      <>
        <div className="flex gap-y-6 flex-wrap">
          <div className="flex w-full gap-x-4 items-center">
            <div className="shrink-0 w-20">
              <Avatar img="/Bizzi-Logo-300x103.png" />
            </div>
            <div className="relative">
              <p className="font-bold text-xl w-full mb-1">{session?.user?.username}</p>
              <div className="text-[12px] p-0.5 inline-block rounded-md bg-gradient-to-tr from-primary to-secondary">
                <button className="px-2 rounded-md font-bold bg-white">{session?.user?.is_admin ? "admin" : "user"}</button>
              </div>
            </div>
          </div>
          <div className="bg-gray-200/70 rounded-xl px-8 py-8 w-full flex gap-y-4 flex-wrap">
            <div className="relative w-full">
              <p className="text-sm text-gray-700">Username</p>
              <p className="font-semibold">{session?.user?.username}</p>
            </div>
            <div className="relative w-full">
              <p className="text-sm text-gray-700">Email</p>
              <p className="font-semibold">{session?.user?.email}</p>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Link
              href={"/logout"}
              className="bg-gray-200/70 rounded-xl px-6 py-3 inline-block hover:bg-gray-100 duration-150"
            >
              Logout
            </Link>
          </div>
        </div>
      </>
    )
  );
};

export default ProfileCard;
