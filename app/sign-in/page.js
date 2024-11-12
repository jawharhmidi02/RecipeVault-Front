"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import "./page.css";
import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [check, setCheck] = useState(false);
  return (
    <div className="mx-auto mt-10 flex h-full w-full items-center justify-center">
      <div
        className={cn(
          "mx-4 grid h-[900px] w-full max-w-[580px] grid-cols-1 xsm:mx-10 min-[800px]:h-[500px] min-[800px]:max-w-[1200px] min-[800px]:grid-cols-2",
        )}
      >
        <div className="flex flex-col justify-center rounded-t-3xl bg-white px-8 py-10 shadow-md drop-shadow-md min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none lg:py-14 xl:py-20">
          {/* Sign In */}
          <div
            className={cn("flex flex-col items-center justify-center gap-5")}
          >
            <span className="font-lato text-xl font-semibold text-neutral-900">
              Sign In
            </span>
            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="email" className="font-lato text-sm font-bold">
                {" "}
                EMAIL
              </label>
              <input
                type="email"
                placeholder="Example@domain.com"
                id="email"
                className="rounded-full bg-[var(--bg2)] py-3 pl-4 outline-[var(--theme1)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="password" className="font-lato text-sm font-bold">
                {" "}
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="rounded-full bg-[var(--bg2)] py-3 pl-4 outline-[var(--theme1)]"
              />
            </div>

            <button
              type="button"
              className="w-full max-w-[400px] rounded-full border-2 border-[#ffffff] border-[var(--theme1)] bg-[var(--theme1)] py-3 font-lato text-[#ffffff] outline-none transition-colors duration-200 hover:bg-[var(--hover-theme2)] hover:text-[var(--theme1)]"
            >
              Sign In
            </button>
            <div className="flex w-full max-w-[400px] flex-col-reverse justify-between gap-2 min-[380px]:flex-row min-[380px]:gap-0">
              <div className="checkbox-wrapper-21">
                <label
                  className={cn(
                    "control control--checkbox",
                    check && "text-[var(--theme1)]",
                  )}
                >
                  Remember Me
                  <input
                    type="checkbox"
                    onChange={() => {
                      setCheck(!check);
                    }}
                  />
                  <div className="control__indicator"></div>
                </label>
              </div>

              <span
                className="mt-[2px] font-lato font-semibold text-neutral-500 transition-colors duration-200 hover:cursor-pointer hover:text-neutral-700"
                onClick={() => {
                  router.push("./reset-password");
                }}
              >
                Forgot Password?
              </span>
            </div>
          </div>
        </div>
        <AccountDecoration
          welcomeText="Welcome Back!"
          accountText="Don't have an account?"
          signText="Sign Up"
          url="./sign-up"
        />
      </div>
    </div>
  );
};

export default page;
