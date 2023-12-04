"use client";
import { signIn } from "next-auth/react";
import error from "next/error";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useRef, useState } from "react";

const Login = () => {
  const userName = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      username: userName.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/emails",
    });
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className={`mx-auto w-full max-w-lg bg-gray-200/50 rounded-xl p-10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[160px]">
            <Image src="/Bizzi-Logo-300x103.png" alt="logo-bizzi" width={150} height={51.5} />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">Đăng nhập tài khoản</h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Bạn chưa có tài khoản?&nbsp;
          <Link href="/auth/signup" className="font-medium text-primary transition-all duration-200 hover:underline">
            Đăng ký
          </Link>
        </p>

        <div className="mt-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="Username" className="text-base font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  onChange={(e) => (userName.current = e.target.value)}
                  placeholder="Username"
                  id="Username"
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-base font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => (pass.current = e.target.value)}
                  id="password"
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={onSubmit}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-primary/80"
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
