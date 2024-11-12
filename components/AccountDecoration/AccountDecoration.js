"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AccountDecoration = ({ welcomeText, accountText, signText, url }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-b-3xl bg-[var(--theme1)] px-8 py-24 shadow-md drop-shadow-md min-[400px]:px-14 min-[800px]:rounded-r-3xl min-[800px]:rounded-bl-none">
      <span className="font-lato text-3xl font-bold text-white">
        {welcomeText}
      </span>
      <span className="font-lato text-sm text-neutral-50">{accountText}</span>
      <button
        type="button"
        onClick={() => router.push(url)}
        className="font-lato rounded-full border-2 border-emerald-50 bg-[var(--hover-theme2)] px-5 py-2.5 text-lg text-[var(--theme1)] outline-none transition-all duration-200 hover:scale-[1.05] hover:bg-[var(--theme1)] hover:text-white"
      >
        {signText}
      </button>
    </div>
  );
};

export default AccountDecoration;
