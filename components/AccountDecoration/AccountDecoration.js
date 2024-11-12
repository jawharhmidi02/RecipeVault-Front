"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AccountDecoration = ({ welcomeText, accountText, signText, url}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-5 justify-center items-center bg-[var(--theme1)] px-8 py-24 min-[400px]:px-14 rounded-b-3xl min-[800px]:rounded-r-3xl min-[800px]:rounded-bl-none drop-shadow-md shadow-md">
      <span className="text-white font-lato text-3xl font-bold">
        {welcomeText}
      </span>
      <span className="text-neutral-50 font-lato text-sm">{accountText}</span>
      <button
        type="button"
        onClick={() => 
          router.push(url)
        }
        className="outline-none  font-lato text-lg px-5 py-2.5  rounded-full bg-[var(--hover-theme2)] text-[var(--theme1)] border-2 border-emerald-50 transition-all duration-200 hover:scale-[1.05] hover:text-white hover:bg-[var(--theme1)] "
      >
        {signText}
      </button>
    </div>
  );
};

export default AccountDecoration;
