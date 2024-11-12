import AccountDecoration from "@/components/AccountDecoration/AccountDecoration";
import React from "react";
import { cn } from "@/lib/utils";

const page = () => {
  return (
    <div className="mx-auto mt-10 flex h-full w-full items-center justify-center">
      <div
        className={cn(
          "xsm:mx-10 mx-4 grid w-full max-w-[580px] grid-cols-1 min-[800px]:max-w-[1200px] min-[800px]:grid-cols-2",
        )}
      >
        <div className="flex flex-col justify-center rounded-t-3xl bg-white px-8 py-10 shadow-md drop-shadow-md min-[800px]:rounded-l-3xl min-[800px]:rounded-tr-none lg:py-14 xl:py-20">
          <div
            className={cn("flex flex-col items-center justify-center gap-5")}
          >
            <span className="font-lato text-xl font-semibold text-neutral-900">
              Sign Up
            </span>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="fullName" className="font-lato text-sm font-bold">
                {" "}
                FULL NAME
              </label>
              <input
                type="text"
                placeholder="Full Name"
                id="fullName"
                className="rounded-full bg-[var(--bg2)] py-3 pl-4 outline-[var(--theme1)]"
              />
            </div>

            <div className="flex w-full max-w-[400px] flex-col gap-1">
              <label htmlFor="phone" className="font-lato text-sm font-bold">
                {" "}
                PHONE
              </label>
              <input
                type="tel"
                placeholder="+216 12 345 678"
                id="phone"
                className="rounded-full bg-[var(--bg2)] py-3 pl-4 outline-[var(--theme1)]"
              />
            </div>

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
              className="font-lato w-full max-w-[400px] rounded-full border-2 border-[#ffffff] border-[var(--theme1)] bg-[var(--theme1)] py-3 text-[#ffffff] outline-none transition-colors duration-200 hover:bg-[var(--hover-theme2)] hover:text-[var(--theme1)]"
            >
              Sign Up
            </button>
          </div>
        </div>
        <AccountDecoration
          welcomeText="Welcome Aboard!"
          accountText="Already have an account?"
          signText="Sign In"
          url="./sign-in"
        />
      </div>
    </div>
  );
};

export default page;
