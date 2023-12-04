"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "./Logo";

const menuItems = [
  {
    name: "Home",
    href: "/",
  },
  // {
  //   name: "Emails",
  //   href: "/emails",
  // },
];

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="relative w-full bg-white py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <div className="inline-block w-full max-w-[150px]">
            <Logo />
          </div>
        </div>
        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="inline-flex items-center text-sm font-semibold text-gray-800 hover:text-primary"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="pr-4">
          <DarkModeToggle />
        </div>
        <div className="hidden space-x-2 lg:block">
          <Link
            href={session?.user ? "/profile" : "/auth/signup"}
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {session?.user ? session?.user?.username : "Sign up"}
          </Link>
          {session?.user ? (
            <Link
              href={"#"}
              onClick={() => signOut()}
              className="rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Logout
            </Link>
          ) : (
            <Link
              href={"/auth/login"}
              className="rounded-md border border-primary px-3 py-2 text-sm font-semibold text-primary shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              LogIn
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
